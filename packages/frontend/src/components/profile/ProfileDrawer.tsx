import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Button,
	Input,
	Text,
	useDisclosure,
	Box,
	Flex,
	Divider,
	Heading,
} from '@chakra-ui/react'

import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import React, { FC } from 'react'
import { Image } from '@chakra-ui/react'
import defaultCover from 'public/images/default-cover-offer.jpg'
import defaultAvatar from 'public/images/people/avatar_default.jpeg'
import { CONTRACT_ADDRESS } from '@utils/const'
import abiContract from '@assets/abi/sel.json'
import { ProfileComponent } from './ProfileComponent'

import { Offer } from '../../types/app'
import { AbiItem } from 'viem'
import { generateAuthor } from '@utils/randomAuthor'

type ProfileDrawerProps = {
	isOpen: boolean
	onClose: () => void
	isConnected: boolean
}

export const ProfileDrawer: FC<ProfileDrawerProps> = ({ isOpen, onClose, isConnected }) => {
	const btnRef = React.useRef()

	return (
		<>
			<Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef} size="md">
				{isConnected ? (
					<>
						<DrawerOverlay />
						<DrawerContent>
							<DrawerCloseButton zIndex={9999} position="absolute" top={4} right={4} />
							<DrawerBody px={0}>
								<ProfileComponent author={generateAuthor()} />
							</DrawerBody>

							<DrawerFooter>
								<Button colorScheme="blue">Propose Your Help</Button>
							</DrawerFooter>
						</DrawerContent>
					</>
				) : (
					<Text>Please connect your account first</Text>
				)}
			</Drawer>
		</>
	)
}
