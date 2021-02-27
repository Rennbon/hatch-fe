import {IChainData} from "./types";

export const SUPPORTED_CHAINS: IChainData[] = [
    {
        name: "Ethereum Mainnet",
        short_name: "eth",
        chain: "ETH",
        network: "mainnet",
        chain_id: 1,
        network_id: 1,
        rpc_url: "https://mainnet.infura.io/v3/%API_KEY%",
        native_currency: {
            symbol: "ETH",
            name: "Ether",
            decimals: "18",
            contractAddress: "",
            balance: "",
        },
    },
    {
        name: "Local Chain",
        short_name: "ETH",
        chain: "callisto",
        network: "mainnet",
        chain_id: 999,
        network_id: 999,
        rpc_url: "http://192.168.1.5:8545/",
        native_currency: {
            symbol: "ETH",
            name: "Ether",
            decimals: "18",
            contractAddress: "",
            balance: "",
        },
    }
];
