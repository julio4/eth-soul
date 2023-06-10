export type useAppoloClientReturnType = {
    queries: Queries,
}

export enum QueriesTypes {
    OfferProposals = "OfferProposals",
}

export type OfferProposalsQueryVariables = {
    first: number,
    offerId: number,
}

export type Queries = {
    [QueriesTypes.OfferProposals]: (variables: OfferProposalsQueryVariables) => Promise<any>,
}
