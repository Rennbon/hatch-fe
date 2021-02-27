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
    Funds: string
}

export enum SubmitType {
    Save,
    WithDraw,
    Invest,
    Sell,

}

