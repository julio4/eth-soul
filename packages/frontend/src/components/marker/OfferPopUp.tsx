import { Box, Flex, Center, Image, Popover, PopoverTrigger, Text, useColorModeValue } from '@chakra-ui/react'
import ZoomContext from '@utils/zoomContext'

import { CategoryDetails } from '@types/category'

import { FC, useContext } from 'react'
import { Offer } from '@types/app'

type OfferPopUpProps = {
	width?: string | number
	offer: Offer
}

export const OfferPopUp: FC<OfferPopUpProps> = ({ width = '100%', offer }) => {
	const { zoomLevel } = useContext(ZoomContext)

	// const [heartFilled, setHeartFilled] = useState(false)

	return (
		<Box
			borderRadius={16}
			boxShadow="lg"
			bg="white"
			w={width}
			position={'relative'}
			zIndex={100}
			transform={'translate(-43%, -105%)'}
		>
			<Flex direction="column">
				<Box
					tw="relative h-full w-full"
					borderRadius={'16px 16px 0 0'}
					overflow="hidden"
					position="relative"
					boxSizing="border-box"
				>
					{offer.images && (
						<Image src={offer.images[0]} alt={offer.title} w="100%" h="100%" objectFit="cover" cursor="default" />
					)}

					<Popover placement="top">
						<PopoverTrigger>
							<Box
								position="absolute"
								top={'15%'}
								right={'17%'}
								transform="translate(50%, -50%)"
								bg="white"
								borderRadius="lg"
								boxShadow="lg"
								p={2}
								cursor="pointer"
							>
								{offer.price}
							</Box>
						</PopoverTrigger>
					</Popover>
				</Box>
				<Center flexDirection="column" textAlign="center" h="100%" px={4} py={3} cursor="pointer">
					<Flex justifyContent="flex-start" w="100%" alignItems={'center'}>
						{offer.category && (
							<Text fontSize="2xl" role="img" aria-label={CategoryDetails[offer.category].description}>
								{CategoryDetails[offer.category].emoji}
							</Text>
						)}
						<Text
							fontSize={'lg'}
							fontWeight="medium"
							color={useColorModeValue('gray.700', 'white')}
							width={'100%'}
							pl={2}
						>
							{offer.title}
						</Text>
					</Flex>
				</Center>
			</Flex>
		</Box>
	)
}
