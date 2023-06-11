import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Button,
	Text,
} from '@chakra-ui/react'

import React, { FC } from 'react'
import { ProfileComponent } from './ProfileComponent'

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
