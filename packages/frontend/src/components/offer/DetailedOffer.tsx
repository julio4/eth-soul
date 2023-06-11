import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Button,
	Text,
	Box,
	Flex,
} from '@chakra-ui/react'

import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import React, { FC } from 'react'
import { CONTRACT_ADDRESS } from '@utils/const'
import abiContract from '@assets/abi/sel.json'

import { Offer } from '../../types/app'
import { AuthorOffer } from './AuthorOffer'
import { TabOffer } from './TabOffer'
import { AvatarAndCover } from '../profile/AvatarAndCover'

type DetailedOfferProps = {
	offer: Offer
	isOpen: boolean
	onClose: () => void
}

export const DetailedOffer: FC<DetailedOfferProps> = ({ offer, isOpen, onClose }) => {
	const btnRef = React.useRef()

	// Call makeProposition function
	const {
		data,
		isLoading,
		isSuccess,
		write: createMakeProposition,
	} = useContractWrite({
		address: CONTRACT_ADDRESS,
		abi: abiContract.abi,
		functionName: 'makeProposition',
	})

	const sendOffer = async () => {
		createMakeProposition({
			args: [offer.id],
		})
	}

	return (
		<>
			<Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef} size="md">
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader px={8} pr={0} mt={2} pb={1}>
						<Box>
							<Flex align="flex-start" flexDirection={'row'} alignItems="center">
								<Text width={'70%'}>{offer.title}</Text>
								<Flex flexDirection={'column'} alignItems="flex-end">
									<Text fontWeight="light" fontSize="sm" color="gray.500">
										yesterday
									</Text>
								</Flex>
							</Flex>
						</Box>
					</DrawerHeader>

					<DrawerBody px={0}>
						<AvatarAndCover author={offer.author} />
						<Box px={10} mb={5}>
							<AuthorOffer offer={offer} />
							<TabOffer offer={offer} />
						</Box>
					</DrawerBody>

					<DrawerFooter
						sx={{
							width: '100%',
						}}
					>
						<Button
							colorScheme="blue"
							onClick={sendOffer}
							sx={{
								width: '100%',
							}}
						>
							Propose Your Help
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	)
}
