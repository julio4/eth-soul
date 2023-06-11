import {
	Box,
	Button,
	Card,
	CardBody,
	CardHeader,
	Heading,
	Text,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	StackDivider,
	useDisclosure,
	Icon,
	Collapse,
	TableContainer,
	Table,
	TableCaption,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
	Tfoot,
	Avatar,
} from '@chakra-ui/react'
import { use, useEffect, useState } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { cropTextInTheMiddle } from '../../utils/stringUtils'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { CONTRACT_ADDRESS, THE_GRAPH_URL } from '@utils/const'
import { Offer, Author, RawOffer, PopulatedOffer } from '../../types/app'
import { offerDTOToOfferObject } from '@mapping/OfferMapping'
import { useAccount, useContractWrite } from 'wagmi'
import contractABI from '@assets/abi/sel.json'
import { CurrentActivity } from './CurrentActivity'

export type RecentActivityModalProps = Record<string, never>

export const RecentActivityModal = (props: RecentActivityModalProps) => {
	const [show, setShow] = useState(true)

	const handleToggle = () => setShow(!show)

	return (
		<>
			<Card
				sx={{
					position: 'absolute',
					minWidth: '30rem',
					bottom: '1.5rem',
					left: '1.5rem',
				}}
			>
				<CardHeader>
					<Heading size="md">Recent Activity</Heading>
				</CardHeader>

				<CardBody display={show ? 'block' : 'none'}>
					<CurrentActivity />
				</CardBody>
				<Button onClick={handleToggle}>
					<Icon as={show ? MdKeyboardArrowUp : MdKeyboardArrowDown} boxSize={8} />
				</Button>
			</Card>
		</>
	)
}
