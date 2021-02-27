import axios, {AxiosInstance} from "axios";

const api: AxiosInstance = axios.create({
    baseURL: process.env.VUE_APP_CHAIN_URL,
    timeout: 30000, // 30 secs
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});


async function GetAccountBalance(address: string, chainId: number): Promise<string> {
    const response = await api.post("",
        {
            "jsonrpc": "2.0",
            "method": "eth_getBalance",
            "params": [
                address,
                "latest"
            ],
            "id": chainId
        }
    );
    const {result} = response.data;
    return result;
}

async function GetAccountNonce(address: string, chainId: number): Promise<string> {
    const response = await api.post("",
        {
            "jsonrpc": "2.0",
            "method": "eth_getTransactionCount",
            "params": [
                address,
                "latest"
            ],
            "id": chainId
        }
    )
    const {result} = response.data
    return result
}

async function GetGasPrice(chainId: number): Promise<string> {
    const response = await api.post("",
        {
            "jsonrpc": "2.0",
            "method": "eth_gasPrice",
            "params": [],
            "id": chainId
        }
    );
    const {result} = response.data;
    return result;
}

async function GetGasLimit(chainId: number): Promise<string> {
    const response = await api.post("",
        {
            "jsonrpc": "2.0",
            "method": "eth_gasPrice",
            "params": [],
            "id": chainId
        }
    );
    const {result} = response.data;
    return result;
}

export const ApiManager = {
    GetAccountBalance,
    GetAccountNonce,
    GetGasPrice
}




