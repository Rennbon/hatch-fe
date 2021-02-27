export interface IPageParam {
    Name: string,
    Title: string,
    NewPage?: boolean,
    Args: IPageArgs

}

export interface IPageArgs {
}

export interface IFundArgs extends IPageArgs {
    FundAddress: string
}


let DefaultPage: IPageParam = {
    Name: "DreamDAO-Nav",
    Title: "Nav",
    Args: {},
}
