import {
	Heading,
	Avatar,
	Box,
	Center,
	Text,
	Stack,
	Button,
	Link,
	useColorModeValue,
	ChakraProvider,
	Divider,
	Card,
	CardBody,
	Image,
	Icon,
	Flex,
} from '@chakra-ui/react'

import { BadgeList } from './BadgeList'
import { Author } from '@types/app'
import { RecentActivityModal } from '@components/activity/RecentActivityModal'
import { AvatarAndCover } from './AvatarAndCover'
import { Rating } from './Rating'
import { AiOutlinePhone } from 'react-icons/ai'
import { FiMapPin } from 'react-icons/fi'
import { CurrentActivity } from '@components/activity/CurrentActivity'

type ProfileComponentProps = {
	author: Author
}

export function ProfileComponent({ author }: ProfileComponentProps) {
	return (
		<Box
			w={'full'}
			h={'full'}
			bg={useColorModeValue('white', 'gray.900')}
			boxShadow={'md'}
			rounded={'lg'}
			textAlign={'center'}
		>
			<AvatarAndCover author={author} />
			<Box textAlign="left" px={10}>
				<Heading textAlign="left" fontSize={'2xl'} color={'gray.700'} mb={2}>
					{author.name}
				</Heading>

				<Box textAlign="left">
					<BadgeList badges={author.badges} />
					<Rating rating={author.rating} />
				</Box>

				<Divider mt={5} />
				<Box textAlign={'left'}>
					<Heading as="h6" size="xs" mt={5} color={'gray.800'}>
						My Infos
					</Heading>
					<Flex flexDirection={'row'} alignItems="center" mt={1} justifyContent="flex-start">
						<Flex flexDirection={'row'} alignItems="center" mr={'10%'}>
							<Icon as={AiOutlinePhone} mr={2} />
							<Text>533 223 039</Text>
						</Flex>
						<Flex flexDirection={'row'} alignItems="center">
							<Icon as={FiMapPin} mr={2} />
							<Text>Luční 104, Horesedly, 270 04</Text>
						</Flex>
					</Flex>

					<Divider mt={5} />
					<CurrentActivity />
				</Box>
			</Box>
		</Box>
	)
}
