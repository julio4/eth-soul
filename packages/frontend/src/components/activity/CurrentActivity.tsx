
import { Box, Button, Card, CardBody, CardHeader, Heading, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, StackDivider, useDisclosure, Icon, Collapse, TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot, Avatar } from "@chakra-ui/react"
import { use, useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { cropTextInTheMiddle } from "../../utils/stringUtils";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { CONTRACT_ADDRESS, THE_GRAPH_URL } from "@utils/const";
import { Offer, Author, RawOffer, PopulatedOffer } from '../../types/app';
import { offerDTOToOfferObject } from "@mapping/OfferMapping";
import { useAccount, useContractWrite } from "wagmi";
import contractABI from '@assets/abi/sel.json'

const ACCOUNT_OFFER_QUERY = `
query ($offerer: Bytes)
{
  offers(where: { offerer: $offerer, isActive: true }) {
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
    offerId: number,
    proposer: string,
    date: number,
}

type currentActivityProps = {
}


export const CurrentActivity = (props: currentActivityProps) => {
    const { address, isConnected } = useAccount();

    const client = new ApolloClient({
        uri: THE_GRAPH_URL,
        cache: new InMemoryCache()
    });

    const [rawOffers, setRawOffers] = useState<RawOffer[]>([])
    const [populatedOffers, setPopulatedOffers] = useState<PopulatedOffer[]>([])
    const [proposals, setProposals] = useState<{
        [key: number]: Proposition[]
    }>({})

    // Call makeProposition function
    const { data, isLoading, isSuccess, write: acceptOffer } = useContractWrite({
        address: CONTRACT_ADDRESS,
        abi: contractABI,
        functionName: 'acceptOffer',
    });

    const acceptOfferClick = async (offerId: number, proposer: string) => {
        acceptOffer({
            args: [offerId, proposer]
        });
    }

    const queryOffers = async () => {
        await client
            .query({
                query: gql(ACCOUNT_OFFER_QUERY),
                variables: {
                    offerer: address
                }
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
                    offerId: offerId
                }
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
        if (isConnected && address)
            queryOffers()
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
        <Stack divider={<StackDivider />} spacing='4' zIndex={9000} >
            {populatedOffers.map((offer) => {
                const propositions = proposals[offer.id] ?? [];
                return (
                    <Box key={offer.id}> {/* Add key prop here */}
                        <Card>
                            <CardBody>
                                <Heading size={'md'}>
                                    {offer.title} - {offer.price} tokens
                                </Heading>
                            </CardBody>
                            <TableContainer>
                                <Table variant='simple'>
                                    <Tbody>
                                        {propositions.length > 0 ? (
                                            propositions.map((proposition) => {
                                                return (
                                                    <Tr key={proposition.offerId}>
                                                        <Td>
                                                            <Avatar name='Ryan Florence' src='https://bit.ly/ryan-florence' />
                                                        </Td>
                                                        <Td>Tob</Td>
                                                        <Td>{cropTextInTheMiddle(proposition.proposer, 25)}</Td>
                                                        <Td>
                                                            <Button onClick={() => acceptOfferClick(offer.id, proposition.proposer)}>
                                                                Deal!
                                                            </Button>
                                                        </Td>
                                                    </Tr>
                                                );
                                            })
                                        ) : (
                                            <Tr>
                                                <Td>No propositions yet</Td>
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
