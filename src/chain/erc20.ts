import {Contract, ethers, utils} from "ethers";
import {Abi} from "./abis"
import {Interface} from 'ethers/lib/utils';
import {ApiManager} from "./api";
import {sanitizeHex} from "./utilities";
import {
    convertAmountToCommon,
    convertAmountToRawNumber,
    convertHexToString,
    convertNumberToString,
    convertStringToHex,
    subtract
} from "./bignumber";
import {ITxData} from "./types";
import {IForkFundParam, IMyAsset, ISetProjectParam} from "@/pgcommon/common";

interface INumberAndAddress {
    Number: string;
    Address: string[];
}


export const FundsToken: string = String(process.env.VUE_APP_CHAIN_URL)

export class ContractManager {
    provider: ethers.providers.JsonRpcProvider;
    dreamMakeAbi: Interface = new utils.Interface(Abi.DreamMake)
    dreamTokenAbi: Interface = new utils.Interface(Abi.DreamToken)
    dreamMakeContract: Contract;
    dreamTokenContract: Contract;
    token: string;
    chainId: number;


    constructor(fundsAddr?: string) {
        if (fundsAddr == undefined || fundsAddr === "") {
            fundsAddr = String(process.env.VUE_APP_DREAM_MAKE)
        }
        console.log(process.env.VUE_APP_CHAIN_URL)
        this.provider = new ethers.providers.JsonRpcProvider(String(process.env.VUE_APP_CHAIN_URL))
        //String(process.env.VUE_APP_DREAM_MAKE)
        this.dreamMakeContract = new Contract(fundsAddr, Abi.DreamMake, this.provider)
        this.dreamTokenContract = new Contract(String(process.env.VUE_APP_DREAM_TOKEN), Abi.DreamToken, this.provider)
        this.chainId = Number(process.env.VUE_APP_CHAIN_ID)
        //String(process.env.VUE_APP_DREAM_MAKE)
        this.token = fundsAddr;
    }


    public async Deposit(from: string, val: string): Promise<ITxData> {

        const nonce = await ApiManager.GetAccountNonce(from);
        const gasPrice = await ApiManager.GetGasPrice();


        const _gasLimit = 210000;
        const gasLimit = sanitizeHex(convertStringToHex(_gasLimit));

        const _value = convertAmountToRawNumber(val);
        const value = sanitizeHex(convertStringToHex(_value));

        const data = this.dreamMakeAbi.encodeFunctionData("deposit")
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

    public async Withdraw(from: string, amount: string): Promise<ITxData> {
        const nonce = await ApiManager.GetAccountNonce(from);
        const gasPrice = await ApiManager.GetGasPrice();

        const _gasLimit = 210000;
        const gasLimit = sanitizeHex(convertStringToHex(_gasLimit));

        const _value = 0;
        const value = sanitizeHex(convertStringToHex(_value));

        const _input = convertAmountToRawNumber(amount)
        const input = sanitizeHex(convertStringToHex(_input));

        const data = this.dreamMakeAbi.encodeFunctionData("withdrawal", [input])
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


    public async WithdrawFundToken(from: string, amount: string): Promise<ITxData> {
        const nonce = await ApiManager.GetAccountNonce(from);
        const gasPrice = await ApiManager.GetGasPrice();

        const _gasLimit = 210000;
        const gasLimit = sanitizeHex(convertStringToHex(_gasLimit));

        const _value = 0;
        const value = sanitizeHex(convertStringToHex(_value));

        const _input = convertAmountToRawNumber(amount)
        const input = sanitizeHex(convertStringToHex(_input));

        const data = this.dreamMakeAbi.encodeFunctionData("withdrawalFundToken", [input])
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

    public async TotalDeposit(): Promise<string> {
        let res = await this.dreamMakeContract.functions.totlaDeposit()
        return convertAmountToCommon(res)
    }

    public async CountUsers(): Promise<string> {
        let res = await this.dreamMakeContract.functions.totalUser()
        return convertHexToString(res)
    }

    public async CountInvests(): Promise<string> {
        let res = await this.dreamMakeContract.functions.totalInvests()
        return convertHexToString(res)
    }

    public async CountProjects(): Promise<string> {
        let res = await this.dreamMakeContract.functions.projectAmount()
        return convertHexToString(res)
    }

    public async TotalFundToken(): Promise<string> {
        let res = await this.dreamMakeContract.functions.totalFundToken()
        return convertAmountToCommon(res)
    }

    public async MyFundDeposit(account: string): Promise<string> {
        let contract = this.dreamMakeContract
        let overrides = {
            from: account,
        }
        let res = await contract.functions.myDepositValue(overrides)
        return convertAmountToCommon(res)
    }

    public async MyDeposit(account: string): Promise<IMyAsset> {
        let contract = this.dreamMakeContract
        let overrides = {
            from: account,
        }
        let _all = await contract.functions.myDepositValue(overrides)
        let _unloc = await contract.functions.myCirculateValue(overrides)
        let all = convertHexToString(_all)
        let unloc = convertHexToString(_unloc)
        let loc = subtract(all, unloc)
        return {
            All: all,
            Unlock: unloc,
            Lock: loc,
            Decimals: 18,
            Symbol: "ETH"
        } as IMyAsset
    }

    public async MyFundTokenAmount(account: string): Promise<IMyAsset> {
        let contract = this.dreamMakeContract
        let overrides = {
            from: account,
        }
        let _all = await contract.functions.myFundTokenAmount(overrides)
        let _unloc = await contract.functions.myFreeFundTokenAmount(overrides)
        let _withdraw = await contract.functions.myCirculateFundTokenAmount(overrides)
        let all = convertHexToString(_all)
        let unloc = convertHexToString(_unloc)
        let withdraw = convertHexToString(_withdraw)

        return {
            All: all,
            Unlock: unloc,
            Lock: "0",
            Withdraw: withdraw,
            Decimals: 18,
            Symbol: "DDD"
        } as IMyAsset
    }

    public async SetProject(param: ISetProjectParam): Promise<ITxData> {
        const nonce = await ApiManager.GetAccountNonce(param.From,);
        const gasPrice = await ApiManager.GetGasPrice();
        const _gasLimit = 21000;
        const gasLimit = sanitizeHex(convertStringToHex(_gasLimit));

        const _value = 0;
        const value = sanitizeHex(convertStringToHex(_value));

        const input1 = param.Token

        const input2 = utils.parseEther(param.SellPrice)
        const input3 = utils.parseEther(param.SoftCap)
        const input4 = utils.parseEther(param.HardCap)
        const input5 = utils.parseEther(param.TargetPrice)
        const input6 = convertNumberToString(param.SetupHeight)
        const input7 = [param.Web, param.WhitePaper]

        const data = this.dreamMakeAbi.encodeFunctionData("setProject", [input1, input2, input3, input4, input5, input6, input7])
        const tx = {
            from: param.From,
            to: this.token,
            nonce,
            gasPrice,
            gasLimit,
            value,
            data,
        }
        return tx
    }

    public async SellProject(from: string, token: string, amount: string): Promise<ITxData> {
        const nonce = await ApiManager.GetAccountNonce(from);
        const gasPrice = await ApiManager.GetGasPrice();
        const _gasLimit = 21000;
        const gasLimit = sanitizeHex(convertStringToHex(_gasLimit));

        const _value = 0;
        const value = sanitizeHex(convertStringToHex(_value));

        const input = convertStringToHex(amount)
        const data = this.dreamMakeAbi.encodeFunctionData("sellProject", [token, input])
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
        const nonce = await ApiManager.GetAccountNonce(from,);
        const gasPrice = await ApiManager.GetGasPrice();
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
        const nonce = await ApiManager.GetAccountNonce(from);
        const gasPrice = await ApiManager.GetGasPrice();
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

    // get one's guarantee of project
    public async GuaranteeProjectValue(account: string, project: string): Promise<string> {
        let contract = this.dreamMakeContract
        let overrides = {
            from: account,
        }
        let res = await contract.functions.guaranteeProjectValue(project, overrides)
        return convertAmountToCommon(res)
    }

    // get one's invest amount of the project
    public async InvestProjectValue(account: string, project: string): Promise<string> {
        let contract = this.dreamMakeContract
        let overrides = {
            from: account,
        }
        let res = await contract.functions.investProjectValue(project, overrides)
        return convertAmountToCommon(res)
    }

    // earn token profit from the project
    public async InvestProjectTokenAmount(account: string, project: string): Promise<string> {
        let contract = this.dreamMakeContract
        let overrides = {
            from: account,
        }
        let res = await contract.functions.investProjectTokenAmount(project, overrides)
        return convertAmountToCommon(res)
    }

    // earn eth profit from the project
    public async InvestProjectIncome(account: string, project: string): Promise<string> {
        let contract = this.dreamMakeContract
        let overrides = {
            from: account,
        }
        let res = await contract.functions.investProjectIncome(project, overrides)
        return convertAmountToCommon(res)
    }

    public async ForkFund(param: IForkFundParam): Promise<ITxData> {

        const tx = {} as ITxData
        return tx
    }


    public async UnlockDream(from: string, amount: string): Promise<ITxData> {
        const nonce = await ApiManager.GetAccountNonce(from);
        const gasPrice = await ApiManager.GetGasPrice();
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


    public async ClearOut(from: string, token: string): Promise<ITxData> {
        const nonce = await ApiManager.GetAccountNonce(from);
        const gasPrice = await ApiManager.GetGasPrice();
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


