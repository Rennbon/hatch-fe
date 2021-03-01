export interface IPageParam {
    Name: string,
    Title: string,
    NewPage?: boolean,
    Args: IPageArgs

}

export interface IPageArgs {
}

export class NavArg implements IPageArgs {
    public Account: string | undefined
}

export interface IFundArgs extends IPageArgs {
    FundAddress: string
}

export interface IOperationSlot {
    Type: SubmitType
    Project: string
    Fund: string
    Limit: string
}


export interface IMyAsset {
    All: string
    Unlock: string
    Lock: string
    Withdraw: string
    Decimals: number
    Symbol: string
}
export interface ISetProjectParam{
    From:string
    Token:string
    SellPrice:string
    SoftCap:string
    HardCap:string
    TargetPrice:string
    SetupHeight:string
    WhitePaper:string
    Web: string,
}

export enum SubmitType {
    Save,
    WithDraw,
    WithDrawFundToken,
    Invest,
    Sell,

}

