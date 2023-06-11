import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { OfferProposalsQueryVariables, OffersQueryVariables, useAppoloClientReturnType } from './types'
import OfferProposalQuery from '../../queries/OfferProposals.graphql'
import OffersQuery from '../../queries/Offers.graphql'

export const useAppoloClient: () => useAppoloClientReturnType = () => {
	const client = new ApolloClient({
		uri: process.env.GRAPHQL_ENDPOINT,
		cache: new InMemoryCache(),
	})

	const query = async (query: any, variables: any) => {
		client
			.query({
				query: gql(query),
				variables,
			})
			.then((data) => console.log('Subgraph data: ', JSON.stringify(data)))
			.catch((err) => {
				console.log('Error fetching data: ', err)
			})
	}

	const queryOfferProposals = async (variables: OfferProposalsQueryVariables) => {
		return query(OfferProposalQuery.loc?.source.body ?? '', variables)
	}

	const queryOffers = async (variables: OffersQueryVariables) => {
		return query(OffersQuery.loc?.source.body ?? '', variables)
	}

	const queries = {
		OfferProposals: queryOfferProposals,
		Offers: queryOffers,
	}

	return {
		queries,
	}
}
