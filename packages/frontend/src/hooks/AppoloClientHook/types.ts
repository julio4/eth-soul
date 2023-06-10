export type useAppoloClientReturnType = {
    queries: Queries,
}

export enum QueriesTypes {
    OfferProposals = "OfferProposals",
    Offers = "Offers",
}

export type OfferProposalsQueryVariables = {
    first: number,
    offerId: number,
}

export type OffersQueryVariables = {
    first: number,
}

export type Queries = {
    [QueriesTypes.OfferProposals]: (variables: OfferProposalsQueryVariables) => Promise<any>,
    [QueriesTypes.Offers]: (variables: OffersQueryVariables) => Promise<any>,
}
