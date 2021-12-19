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

export interface IProjectArgs extends IFundArgs {
    ProjectAddress: string
}

export interface IList extends IPageArgs {
    Type: ListType
    Project: string
    Symbol: string
}

export interface IProject {
    State: number
    Symbol: string
    SoftCap: number
    HardCap: number
    Uint: string

}

export interface IOperationSlot {
    Type: SubmitType
    Project: string
    Fund: string
    Limit: string
    Tips: string
}

export interface IDialogSlot {
    Title: string
    Content: string
}


export interface IMyAsset {
    All: string
    Unlock: string
    Lock: string
    Withdraw: string
    Decimals: number
    Symbol: string
}

export interface ISetProjectParam {
    From: string
    Token: string
    SellPrice: string
    SoftCap: string
    HardCap: string
    TargetPrice: string
    SetupHeight: string
    WhitePaper: string
    Web: string,
}


export interface IForkFundParam {
    From: string
    FundSymbols: string
    FundIntroduction: string
    PerAmount: string
    Durations: string //half life
    TokenAmount: string
    GuaranteeReward: string
    GuaranteeFee: string
    ProjectTime: string
    InvestTime: string
    SellTime: string
    DonateFee: string
}

export enum SubmitType {
    Save,
    WithDraw,
    WithDrawFundToken,
    Guarantee,
    DisGuarantee,
    Invest,
    DisInvest,
    Sell,

}


export enum ProjectStatus {
    Guarantee = 1,
    Invest = 2,
    GuaranteeAndInvest = 3,
    FullQuota = 4,
    Sell = 5,
    End = 6,
}

export enum ListType {
    GuaranteeLog = 1,
    InvestLog = 2,
    SellLog = 3,
    Guarantor = 4,
    Investor = 5,
}

