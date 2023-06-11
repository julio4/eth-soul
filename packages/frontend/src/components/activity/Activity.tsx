import { Box, Button, Card, CardBody, CardHeader, Heading, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, StackDivider, useDisclosure, Icon, Collapse, TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot, Avatar } from "@chakra-ui/react"
import { use, useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { cropTextInTheMiddle } from "../../utils/stringUtils";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { THE_GRAPH_URL } from "@utils/const";
import Web3 from "web3";
import { Offer, Author, RawOffer, PopulatedOffer } from '../types/app'
import map from "@components/map";
import { offerDTOToOfferObject } from "@mapping/OfferMapping";

export type ActivityProps = {

}

const ACCOUNT_OFFER_QUERY = `
query ($offerer: Bytes)
{
  offers(where: { offerer: $offerer, isActive: true }, first: 1) {
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
    date: Number,
}

export const Activity = (props: ActivityProps) => {
    const [show, setShow] = useState(false);

    const handleToggle = () => setShow(!show);

    const client = new ApolloClient({
        uri: THE_GRAPH_URL,
        cache: new InMemoryCache()
    });

    const [rawOffers, setRawOffers] = useState<RawOffer[]>([])
    const [populatedOffers, setPopulatedOffers] = useState<PopulatedOffer[]>([])
    const [proposals, setProposals] = useState<{
        [key: number]: Proposition[]
    }>({})

    const queryOffers = async () => {
        await client
            .query({
                query: gql(ACCOUNT_OFFER_QUERY),
                variables: {
                    offerer: "0xa70A96B0487bA89510916f772D79561F599A7eA3"
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
        queryOffers()
    }, [])

    useEffect(() => {
        async function setOffers(offers: RawOffer[]) {
            const populatedOffers = await Promise.all(offers.map(offerDTOToOfferObject))
            const filteredOffers = populatedOffers.filter((offer) => offer) as Offer[]

            console.log("filteredOffers", filteredOffers)
            setPopulatedOffers(filteredOffers)
        }
        if (rawOffers && rawOffers.length > 0) {
            setOffers(rawOffers)
        }
    }, [rawOffers])

    useEffect(() => {
        async function getProposers(offers: RawOffer[]) {
            console.log("offers", offers)
            const results = {}
            for (let i = 0; i < offers.length; i++) {
                const element = offers[i];
                // @ts-ignore
                results[offers[i].offerId] = await queryProposalsForOffer(element.offerId)
            }
            setProposals(results)
        }
        console.log("populatedOffers", populatedOffers)
        if (populatedOffers && populatedOffers.length > 0) {
            getProposers(populatedOffers)
        }
    }, [populatedOffers])

    useEffect(() => {
        console.log("proposals", proposals)
    }, [proposals])

    return (
        <>
            <Card sx={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '1.5rem',
            }}>
                <CardHeader>
                    <Heading size='md'>Recent Activity</Heading>
                </CardHeader>

                <CardBody display={show ? 'block' : 'none'}>
                    <Stack divider={<StackDivider />} spacing='4'>
                        {
                            populatedOffers.map((offer) => {
                                const propositions = proposals[offer.offerId]
                                return (
                                    <Box>
                                        <Card>
                                            <CardBody>
                                                <Heading size={'md'}>{offer.title} - {offer.price} tokens</Heading>
                                            </CardBody>
                                            <TableContainer>
                                                <Table variant='simple'>
                                                    <Tbody>
                                                        {
                                                            propositions.map((proposition) => {
                                                                return (
                                                                    <Tr>
                                                                        <Td><Avatar name='Ryan Florence' src='https://bit.ly/ryan-florence' /></Td>
                                                                        <Td>Tob</Td>
                                                                        <Td>{cropTextInTheMiddle(proposition.proposer, 25)}</Td>
                                                                        <Td><Button>Deal!</Button></Td>
                                                                    </Tr>
                                                                )
                                                            })
                                                        }
                                                    </Tbody>
                                                </Table>
                                            </TableContainer>
                                        </Card>
                                    </Box>
                                )
                            }
                            )
                        }
                    </Stack>
                </CardBody>
                <Button onClick={handleToggle}>
                    <Icon as={show ? MdKeyboardArrowUp : MdKeyboardArrowDown} boxSize={8} />
                </Button>
            </Card>
        </>
    )
}