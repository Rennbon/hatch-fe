import axios, {AxiosInstance} from "axios";
import {convertAmountFromRawNumber} from "@/chain/bignumber";
import {ITxData} from "@/chain/types";

const api: AxiosInstance = axios.create({
    baseURL: process.env.VUE_APP_CHAIN_URL,
    timeout: 30000, // 30 secs
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});


async function GetAccountBalance(address: string): Promise<string> {
    const response = await api.post("",
        {
            "jsonrpc": "2.0",
            "method": "eth_getBalance",
            "params": [
                address,
                "latest"
            ],
            "id": Number(process.env.VUE_APP_CHAIN_ID)
        }
    );
    const {result} = response.data;
    return result;
}

async function GetAccountNonce(address: string): Promise<string> {
    const response = await api.post("",
        {
            "jsonrpc": "2.0",
            "method": "eth_getTransactionCount",
            "params": [
                address,
                "latest"
            ],
            "id": Number(process.env.VUE_APP_CHAIN_ID)
        }
    )
    const {result} = response.data
    return result
}

async function GetGasPrice(): Promise<string> {
    const response = await api.post("",
        {
            "jsonrpc": "2.0",
            "method": "eth_gasPrice",
            "params": [],
            "id": Number(process.env.VUE_APP_CHAIN_ID)
        }
    );
    const {result} = response.data;
    return result;
}

async function GetEstimateGas(tx: ITxData): Promise<string> {
    const response = await api.post("",
        {
            "jsonrpc": "2.0",
            "method": "eth_estimateGas",
            "params": [tx],
            "id": Number(process.env.VUE_APP_CHAIN_ID)
        }
    );
    const {result} = response.data;
    return result;
}

async function GetGasLimit(tx: ITxData): Promise<string> {
    const response = await api.post("",
        {
            "jsonrpc": "2.0",
            "method": "eth_gasPrice",
            "params": [tx],
            "id": Number(process.env.VUE_APP_CHAIN_ID)
        }
    );
    const {result} = response.data;
    return result;
}

async function GetBlockNumber(): Promise<number> {
    const response = await api.post("",
        {
            "jsonrpc": "2.0",
            "method": "eth_blockNumber",
            "params": [],
            "id": Number(process.env.VUE_APP_CHAIN_ID)
        }
    );
    const {result} = response.data;
    return Number(convertAmountFromRawNumber(result, 0))
}

export const ApiManager = {
    GetAccountBalance,
    GetAccountNonce,
    GetGasPrice,
    GetBlockNumber,
    GetEstimateGas
}




