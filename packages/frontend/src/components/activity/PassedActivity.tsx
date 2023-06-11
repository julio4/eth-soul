import {
	Box,
	Button,
	Card,
	CardBody,
	Text,
	Heading,
	Input,
	Stack,
	StackDivider,
	TableContainer,
	Table,
	Tr,
	Tbody,
	Td,
	Avatar,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { cropTextInTheMiddle } from '../../utils/stringUtils'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { CONTRACT_ADDRESS, THE_GRAPH_URL } from '@utils/const'
import { Offer, RawOffer, PopulatedOffer } from '../../types/app'
import { offerDTOToOfferObject } from '@mapping/OfferMapping'
import { useAccount, useContractWrite } from 'wagmi'
import contractABI from '@assets/abi/sel.json'

const ACCOUNT_OFFER_QUERY = `
query ($offerer: Bytes)
{
  offers(where: { offerer: $offerer, isActive: false }) {
    id
    offerId
    offerer
    isActive
    hash
    tokens
  }
}
`

const PROPOSITION_MADE_QUERY = `
    query ($offerId: BigInt)
    {
    propositionMades(where: { offerId: $offerId }) {
        id
        offerId
        proposer
        tokens
        hash
    }
    }
`

export type Proposition = {
	offerId: number
	proposer: string
	date: number
}

export const PassedActivity = () => {
	const { address, isConnected } = useAccount()
	const [isRating, setIsRating] = useState(false)
	const [rating, setRating] = useState('')

	const client = new ApolloClient({
		uri: THE_GRAPH_URL,
		cache: new InMemoryCache(),
	})

	const [rawOffers, setRawOffers] = useState<RawOffer[]>([])
	const [populatedOffers, setPopulatedOffers] = useState<PopulatedOffer[]>([])
	const [proposals, setProposals] = useState<{
		[key: number]: Proposition[]
	}>({})

	// Call makeProposition function
	const { write: acceptOffer } = useContractWrite({
		address: CONTRACT_ADDRESS,
		abi: contractABI.abi,
		functionName: 'acceptOffer',
	})

	const { write: rateUser } = useContractWrite({
		address: CONTRACT_ADDRESS,
		abi: contractABI.abi,
		functionName: 'rateUser',
	})

	const sendRate = async (target) => {
		rateUser({
			args: [target, rating],
		})
	}

	const handleRate = async (offerId: number, targetAddress: string) => {
		if (isNaN(parseInt(rating))) {
			alert('Please enter a number')
			return
		}
		if (rating === '') {
			alert('Please enter a rating')
			return
		}
		else if (parseInt(rating) < 1 || parseInt(rating) > 5) {
			alert('Please enter a rating between 1 and 5')
			return
		}
		else {
			sendRate(targetAddress)
		}
	}


	const queryOffers = async () => {
		await client
			.query({
				query: gql(ACCOUNT_OFFER_QUERY),
				variables: {
					offerer: address,
				},
			})
			.then((data) => {
				setRawOffers(data.data.offers)
			})
			.catch((err) => {
				console.log('Error fetching data: ', err)
			})
	}

	const queryProposalsForOffer = async (offerId: number) => {
		let proposals: any[] = []
		await client
			.query({
				query: gql(PROPOSITION_MADE_QUERY),
				variables: {
					offerId: offerId,
				},
			})
			.then((data) => {
				proposals = data.data.propositionMades
			})
			.catch((err) => {
				console.log('Error fetching data: ', err)
			})
		return proposals
	}

	useEffect(() => {
		if (isConnected && address) queryOffers()
	}, [address])

	useEffect(() => {
		async function setOffers(offers: RawOffer[]) {
			const populatedOffers = await Promise.all(offers.map(offerDTOToOfferObject))
			const filteredOffers = populatedOffers.filter((offer) => offer) as Offer[]

			setPopulatedOffers(filteredOffers)
		}
		if (rawOffers && rawOffers.length > 0) {
			setOffers(rawOffers)
		}
	}, [rawOffers])

	useEffect(() => {
		async function getProposers(offers: PopulatedOffer[]) {
			const results = {}
			for (let i = 0; i < offers.length; i++) {
				const result = await queryProposalsForOffer(offers[i].id)
				results[offers[i].id] = result
			}
			setProposals(results)
		}
		if (populatedOffers && populatedOffers.length > 0) {
			getProposers(populatedOffers)
		}
	}, [populatedOffers])

	return (
		<Stack spacing="3" zIndex={9000}>
			{populatedOffers.map((offer) => {
				const propositions = proposals[offer.id] ?? [];
				const uniquePropositions = [...new Set(propositions)]; // Élimine les duplicatas des propositions

				return (
					<Box key={offer.id}>
						<Card backgroundColor="#B1FBCE">
							<CardBody px={6} py={2}>
								<Heading size={'md'}>
									{offer.title} - {offer.price} tokens
								</Heading>
							</CardBody>
							<TableContainer>
								<Table variant="simple">
									<Tbody>
										{uniquePropositions.length > 0 ? (
											uniquePropositions.map((proposition) => {
												return (
													<Tr key={proposition.offerId}>
														<Td pb={2} pt={0}>
															<Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
														</Td>
														<Td pb={2} pt={0} px={0}>
															<Text fontSize="md" fontWeight="bold" color="gray.800">
																Armald
															</Text>
														</Td>
														<Td pb={2} pt={0}>
															{cropTextInTheMiddle(proposition.proposer, 10)}
														</Td>
														{isRating ? (
															<>
																<Input
																	value={rating}
																	onChange={(e) => setRating(e.target.value)}
																	placeholder="/5"
																	backgroundColor={"white"}
																	width={"50px"}
																	borderRadius={"lg"}
																	mr={2}
																/>

																<Button
																	backgroundColor={"yellow.100"}
																	_hover={{ backgroundColor: "yellow.200" }}
																	onClick={() => handleRate(rating, proposition.proposer)}
																>
																	Rate
																</Button>
															</>
														) : (
															<Td>
																<Button
																	backgroundColor={"yellow.100"}
																	_hover={{ backgroundColor: "yellow.200" }}
																	onClick={() => setIsRating(true)}
																>
																	⭐ Rate It
																</Button>
															</Td>
														)}
													</Tr>
												);
											})
										) : (
											<Tr>
												<Td pb={2} pt={0}>
													No propositions yet
												</Td>
											</Tr>
										)}
									</Tbody>
								</Table>
							</TableContainer>
						</Card>
					</Box>
				);
			})}
		</Stack>
	)
}
