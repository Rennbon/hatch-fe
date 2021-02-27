import {Contract, ethers, utils} from "ethers";
import {ContractInterface} from "@ethersproject/contracts/src.ts/index";
import {Abi} from "./abis"
import {Interface} from 'ethers/lib/utils';
import {ApiManager} from "./api";
import {sanitizeHex} from "./utilities";
import {convertAmountToRawNumber, convertHexToString, convertStringToHex} from "./bignumber";
import {ITxData} from "./types";

class DreamContract {
    Abi: ContractInterface;
    Address: string;

    constructor(address: string, abi: ContractInterface) {
        this.Abi = abi
        this.Address = address
    }
}

interface INumberAndAddress {
    Number: string;
    Address: string[];
}

export class ContractManager {
    provider: ethers.providers.JsonRpcProvider;
    dreamMakeAbi: Interface = new utils.Interface(Abi.DreamMake)
    dreamTokenAbi: Interface = new utils.Interface(Abi.DreamToken)
    dreamMakeContract: Contract;
    dreamTokenContract: Contract;
    token: string;
    chainId: number;

    constructor() {
        console.log(process.env.VUE_APP_CHAIN_URL)
        this.provider = new ethers.providers.JsonRpcProvider(String(process.env.VUE_APP_CHAIN_URL))
        this.dreamMakeContract = new Contract(String(process.env.VUE_APP_DREAM_MAKE), Abi.DreamMake, this.provider)
        this.dreamTokenContract = new Contract(String(process.env.VUE_APP_DREAM_TOKEN), Abi.DreamToken, this.provider)
        this.chainId = Number(process.env.VUE_APP_CHAIN_ID)
        this.token = String(process.env.VUE_APP_DREAM_MAKE);
    }

    public async Stake(from: string, val: string): Promise<ITxData> {

        const nonce = await ApiManager.GetAccountNonce(from, this.chainId);
        const gasPrice = await ApiManager.GetGasPrice(this.chainId);


        const _gasLimit = 21000;
        const gasLimit = sanitizeHex(convertStringToHex(_gasLimit));

        const _value = convertAmountToRawNumber(val);
        const value = sanitizeHex(convertStringToHex(_value));

        const data = this.dreamMakeAbi.encodeFunctionData("stake")
        const to = this.token
        const tx = {
            from,
            to,
            nonce,
            gasPrice,
            gasLimit,
            value,
            data,
        }
        return tx
    }

    public async WithdrawProject(from: string, token: string): Promise<ITxData> {
        const nonce = await ApiManager.GetAccountNonce(from, this.chainId);
        const gasPrice = await ApiManager.GetGasPrice(this.chainId);
        const _gasLimit = 21000;
        const gasLimit = sanitizeHex(convertStringToHex(_gasLimit));

        const _value = 0;
        const value = sanitizeHex(convertStringToHex(_value));

        const data = this.dreamMakeAbi.encodeFunctionData("withdrawProject", [token])
        const tx = {
            from,
            to: this.token,
            nonce,
            gasPrice,
            gasLimit,
            value,
            data,
        }
        return tx
    }

    public async Withdraw(from: string, amount: string): Promise<ITxData> {
        const nonce = "0x35"//await ApiManager.GetAccountNonce(from, this.chainId);
        const gasPrice = "0X222"//await ApiManager.GetGasPrice(this.chainId);
        const _gasLimit = 21000;
        const gasLimit = sanitizeHex(convertStringToHex(_gasLimit));

        const _value = 0;
        const value = sanitizeHex(convertStringToHex(_value));

        const _input = convertAmountToRawNumber(amount)
        const input = sanitizeHex(convertStringToHex(_input));
        const data = this.dreamMakeAbi.encodeFunctionData("withdraw", [input])
        const tx = {
            from,
            to: this.token,
            nonce,
            gasPrice,
            gasLimit,
            value,
            data,
        }
        return tx
    }

    public async UnlockDream(from: string, amount: string): Promise<ITxData> {
        const nonce = await ApiManager.GetAccountNonce(from, this.chainId);
        const gasPrice = await ApiManager.GetGasPrice(this.chainId);
        const _gasLimit = 21000;
        const gasLimit = sanitizeHex(convertStringToHex(_gasLimit));

        const _value = 0;
        const value = sanitizeHex(convertStringToHex(_value));

        const input = convertStringToHex(amount)
        const data = this.dreamMakeAbi.encodeFunctionData("unlockDream", [input])
        const tx = {
            from,
            to: this.token,
            nonce,
            gasPrice,
            gasLimit,
            value,
            data,
        }
        return tx
    }

    public async SetProject(from: string, token: string, sellPrice: string, softCap: string, hardCap: string, targetPrice: string, startNumber: number): Promise<ITxData> {
        const nonce = await ApiManager.GetAccountNonce(from, this.chainId);
        const gasPrice = await ApiManager.GetGasPrice(this.chainId);
        const _gasLimit = 21000;
        const gasLimit = sanitizeHex(convertStringToHex(_gasLimit));

        const _value = 0;
        const value = sanitizeHex(convertStringToHex(_value));

        const input2 = convertStringToHex(sellPrice)
        const input3 = convertStringToHex(softCap)
        const input4 = convertStringToHex(hardCap)
        const input5 = convertStringToHex(targetPrice)
        const input6 = convertStringToHex(startNumber)

        const data = this.dreamMakeAbi.encodeFunctionData("setProject", [token, input2, input3, input4, input5, input6])
        const tx = {
            from,
            to: this.token,
            nonce,
            gasPrice,
            gasLimit,
            value,
            data,
        }
        return tx
    }

    public async SellMyProject(from: string, token: string, amount: string): Promise<ITxData> {
        const nonce = await ApiManager.GetAccountNonce(from, this.chainId);
        const gasPrice = await ApiManager.GetGasPrice(this.chainId);
        const _gasLimit = 21000;
        const gasLimit = sanitizeHex(convertStringToHex(_gasLimit));

        const _value = 0;
        const value = sanitizeHex(convertStringToHex(_value));

        const input = convertStringToHex(amount)
        const data = this.dreamMakeAbi.encodeFunctionData("sellMyProject", [token, input])
        const tx = {
            from,
            to: this.token,
            nonce,
            gasPrice,
            gasLimit,
            value,
            data,
        }
        return tx
    }

    public async InvestProject(from: string, token: string, amount: string): Promise<ITxData> {
        const nonce = await ApiManager.GetAccountNonce(from, this.chainId);
        const gasPrice = await ApiManager.GetGasPrice(this.chainId);
        const _gasLimit = 21000;
        const gasLimit = sanitizeHex(convertStringToHex(_gasLimit));

        const _value = 0;
        const value = sanitizeHex(convertStringToHex(_value));

        const input = convertStringToHex(amount)
        const data = this.dreamMakeAbi.encodeFunctionData("investProject", [token, input])
        const tx = {
            from,
            to: this.token,
            nonce,
            gasPrice,
            gasLimit,
            value,
            data,
        }
        return tx
    }

    public async GuaranteeProject(from: string, token: string, amount: string): Promise<ITxData> {
        const nonce = await ApiManager.GetAccountNonce(from, this.chainId);
        const gasPrice = await ApiManager.GetGasPrice(this.chainId);
        const _gasLimit = 21000;
        const gasLimit = sanitizeHex(convertStringToHex(_gasLimit));

        const _value = 0;
        const value = sanitizeHex(convertStringToHex(_value));

        const input = convertStringToHex(amount)
        const data = this.dreamMakeAbi.encodeFunctionData("guaranteeProject", [token, input])
        const tx = {
            from,
            to: this.token,
            nonce,
            gasPrice,
            gasLimit,
            value,
            data,
        }
        return tx
    }

    public async ClearOut(from: string, token: string): Promise<ITxData> {
        const nonce = await ApiManager.GetAccountNonce(from, this.chainId);
        const gasPrice = await ApiManager.GetGasPrice(this.chainId);
        const _gasLimit = 21000;
        const gasLimit = sanitizeHex(convertStringToHex(_gasLimit));

        const _value = 0;
        const value = sanitizeHex(convertStringToHex(_value));
        const data = this.dreamMakeAbi.encodeFunctionData("Clearout", [token])
        const tx = {
            from,
            to: this.token,
            nonce,
            gasPrice,
            gasLimit,
            value,
            data,
        }
        return tx
    }


    public async ViewTotalAmount(): Promise<string> {
        let res = await this.dreamMakeContract.functions.ViewTotalAmount()
        return convertHexToString(res)
    }

    public async ViewProjectPrice(token: string): Promise<string> {
        let res = await this.dreamMakeContract.functions.ViewProjectPrice(token)
        return convertHexToString(res)
    }

    public async ViewProjectInvest(token: string): Promise<INumberAndAddress> {
        let res = await this.dreamMakeContract.ViewProjectinvest(token)
        return {
            Number: convertHexToString(res[0]),
            Address: res[1]
        }
    }

    public async ViewProjectGuarantee(token: string): Promise<INumberAndAddress> {
        let res = await this.dreamMakeContract.ViewProjectGuarantee(token)
        return {
            Number: convertHexToString(res[0]),
            Address: res[1]
        }
    }

    public async ViewOwnerProjects(account: string): Promise<INumberAndAddress> {
        let res = await this.dreamMakeContract.ViewOnwerProjects(account)
        return {
            Number: convertHexToString(res[0]),
            Address: res[1]
        }
    }

    public async ViewMyInvests(account: string): Promise<INumberAndAddress> {
        let res = await this.dreamMakeContract.Viewmyinvests(account)
        return {
            Number: convertHexToString(res[0]),
            Address: res[1]
        }
    }

    public async ViewMyGuarantees(account: string): Promise<INumberAndAddress> {
        let res = await this.dreamMakeContract.ViewmyGuarantees(account)
        return {
            Number: convertHexToString(res[0]),
            Address: res[1]
        }
    }

    public async ViewMyETH(account: string): Promise<string> {
        let res = await this.dreamMakeContract.ViewMyETH(account)
        return convertHexToString(res)
    }

    public async ViewMyDreamToken(account: string): Promise<string> {
        let res = await this.dreamMakeContract.ViewMyDreamToken(account)
        return convertHexToString(res)
    }

    public async ViewInvestAmount(account: string, token: string): Promise<string> {
        let res = await this.dreamMakeContract.ViewInvestAmount(account, token)
        return convertHexToString(res)
    }

    public async ViewGuaranteeAmount(account: string, token: string): Promise<string> {
        let res = await this.dreamMakeContract.ViewGuaranteeAmount(account, token)
        return convertHexToString(res)
    }

    public async ViewDreamDaoSTART(): Promise<string> {
        let res = await this.dreamMakeContract.ViewDreamDaoSTART()
        return convertHexToString(res)
    }

    public async ViewAllProjects(): Promise<INumberAndAddress> {
        let res = await this.dreamMakeContract.ViewAllProjects()
        return {
            Number: convertHexToString(res[0]),
            Address: res[1]
        }
    }

    public async VieProjectInfo(token: string): Promise<INumberAndAddress> {
        let res = await this.dreamMakeContract.VieProjectInfo(token)
        return {
            Number: convertHexToString(res[0]),
            Address: res[1]
        }
    }

    public async TotalDreamTokenAmount(): Promise<string> {
        let res = await this.dreamMakeContract.totalDreamTokenAmount()
        return convertHexToString(res)
    }
}
