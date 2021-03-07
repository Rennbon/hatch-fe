import { ITxData} from '../chain/types'
import {ApiManager} from "../chain/api";
import {sanitizeHex} from "../chain/utilities";
import {convertAmountToRawNumber, convertStringToHex} from "../chain/bignumber";
import {Interface} from "ethers/lib/utils";
import {utils} from "ethers";
import {Abi} from "@/chain/abis";


export async function GetTx (address:string):Promise<ITxData> {
    const from = address;
    //0x300B0975B6F277515AD7a7B32a1eC2da1bE27F7B
    // to 0x4EC23f94d26cA32d7529AfdAe24433AaEd24d5bf
    const to = "0x1aD76125f61c974ebdD7471E0D8498eb967e6565";
    // nonce
    const nonce = await ApiManager.GetAccountNonce(address);

    // gasPrice
    const gasPrice = await ApiManager.GetGasPrice();

    // gasLimit
    const _gasLimit = 210000;
    const gasLimit = sanitizeHex(convertStringToHex(_gasLimit));

    // value
    const _value = 1000000000000000000;
    const value = sanitizeHex(convertStringToHex(_value));

    // data
    //const data = "0x";

    let iface = new utils.Interface(Abi.DreamMake)
    //let _data = iface.encodeFunctionData("stake",[100000])
    let _data = iface.encodeFunctionData("stake")
    const data = _data

    // test transaction
    const tx = {
        from,
        to,
        nonce,
        gasPrice,
        gasLimit,
        value,
        data, //这里放合约转成的hex
    };
    console.log("tx=> from",from)
    console.log("tx=> to",to)
    console.log("tx=> nonce",nonce)
    console.log("tx=> gasPrice",gasPrice)
    console.log("tx=> value",value)
    console.log("tx=> data",data)
    return tx
}
