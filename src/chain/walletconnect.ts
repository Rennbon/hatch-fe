import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import {IInternalEvent, IJsonRpcRequest} from "@walletconnect/types";
import {Contract} from "ethers";
import {ApiManager} from "./api";
import {convertAmountFromRawNumber} from "@/chain/bignumber";
// @ts-ignore
import {store} from "@/store";

interface ContactMap {
    [index: string]: Contract
}

interface IAppState {
    connector: WalletConnect | null;
    contacts: ContactMap;
    fetching: boolean;
    connected: boolean;
    chainId: number;
    showModal: boolean;
    pendingRequest: boolean;
    uri: string;
    accounts: string[];
    address: string;
    result: any | null;
    asset: string;
}

const INITIAL_STATE: IAppState = {
    connector: null,
    contacts: {},
    fetching: false,
    connected: false,
    chainId: 1,
    showModal: false,
    pendingRequest: false,
    uri: "",
    accounts: [],
    address: "",
    result: null,
    asset: "0",
};


export class WClient {
    public state: IAppState = {
        ...INITIAL_STATE
    }
    heartCheck: NodeJS.Timeout | undefined

    public walletConnectInit = async () => {
        const bridge = "https://bridge.walletconnect.org"

        let session = store.getters.getSession
        let connector: WalletConnect
        if (session != null) {
            connector = new WalletConnect({session: session})
        } else {
            connector = new WalletConnect({bridge, qrcodeModal: QRCodeModal})
        }

        this.state.connector = connector
        if (!connector.connected) {
            console.log("wallet ws retry")
            await connector.createSession()
        }
        await this.subscribeToEvents()
    }

    public async heartbeat() {
        if (this.heartCheck) {
            clearInterval(this.heartCheck)
        }
        this.heartCheck = setInterval(() => {
            if (this.state.connector != null && this.state.connector.connected) {
                this.state.connector.unsafeSend({
                    method: "ping"
                } as IJsonRpcRequest)
            }
        }, 5000);
    }

    private subscribeToEvents = async () => {
        const {connector} = this.state
        if (!connector) {
            return
        }
        this.heartbeat()
        connector.on("session_update", async (error, payload) => {
            console.log(`connector.on("session_update")`);
            if (error) {
                throw error;
            }
            const {chainId, accounts} = payload.params[0];
            await this.onSessionUpdate(accounts, chainId);
        })
        connector.on("connect", (error, payload) => {
            console.log(`connector.on("connect")`);
            if (error) {
                throw error;
            }
            this.onConnect(payload);
        })

        connector.on("disconnect", (error, payload) => {
            console.log(`connector.on("disconnect")`);
            if (error) {
                throw error;
            }
            this.onDisconnect();
        })

        if (connector.connected) {
            const {chainId, accounts} = connector;
            const address = accounts[0];
            this.state.connected = true
            this.state.chainId = chainId
            this.state.accounts = accounts
            this.state.address = address
            await this.onSessionUpdate(accounts, chainId)
        }
        this.state.connector = connector
    }

    private async fillState(connector: WalletConnect) {
        let {chainId, accounts} = connector
        let address = accounts[0];
        this.state.connected = true
        this.state.chainId = chainId
        this.state.accounts = accounts
        this.state.address = address
        await this.onSessionUpdate(accounts, chainId)
    }

    private onConnect = async (payload: IInternalEvent) => {
        const {chainId, accounts} = payload.params[0];
        const address = accounts[0];
        this.state.connected = true
        this.state.chainId = chainId
        this.state.accounts = accounts
        this.state.address = address
        await this.getAccountBalance()
        store.commit("updateAccount", address)
        store.commit("updateConnected", true)
        store.commit("updateSession", this.state.connector?.session)
    }
    private onSessionUpdate = async (accounts: string[], chainId: number) => {
        const address = accounts[0];
        this.state.chainId = chainId
        this.state.accounts = accounts
        this.state.address = address
        await this.getAccountBalance();
        store.commit("updateAccount", address)
    }

    public getAccountBalance = async () => {
        const {address, chainId} = this.state;
        this.state.fetching = true
        try {
            // get account balances
            const assets = await ApiManager.GetAccountBalance(address);
            let balance = convertAmountFromRawNumber(assets)
            this.state.fetching = false
            this.state.address = address
            // @ts-ignore
            this.state.asset = balance.match(/^\d+(?:\.\d{0,5})?/)[0]
            store.commit("updateBalance", this.state.asset)
        } catch (error) {
            console.error(error)
            this.state.fetching = false
        }
    }
    private onDisconnect = () => {
        this.resetApp();
        store.commit("updateConnected", false)
        store.commit("updateAccount", "")
    }
    public killSession = async () => {
        const {connector} = this.state;
        if (connector) {
            await connector.killSession();
        }
        this.resetApp();
    }
    private resetApp = () => {
        this.state = {...INITIAL_STATE}
    }
}
