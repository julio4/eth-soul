import {
    Box,
    Flex,
    Center,
    Image,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Text,
    Divider,
    useColorModeValue,
    Card,
    CardBody,
} from '@chakra-ui/react'
import { FC, useState } from 'react'

import { BsHeart, BsHeartFill, BsTools } from 'react-icons/bs'
import AvatarPhoto from 'public/images/people/personne1.jpeg'

type OfferPopUpProps = {
    width?: string | number
}

export const OfferPopUp: FC<OfferPopUpProps> = ({ width = '100%' }) => {
    const offer = {
        image: 'https://lesveloselectriques.fr/wp-content/uploads/2023/03/VTT-electrique-occasion.jpg',
        timeSince: '3 hours ago',
        title: 'title',
        description: 'description',
        price: '4',
        location: '12 rue des Maronniers, Prague',
        author: 'Antoine',
    }

    const [heartFilled, setHeartFilled] = useState(false)

    return (
        <Box
            borderRadius={16}
            boxShadow="lg"
            bg="white"
            w={width}
            position={'relative'}
            zIndex={100}
            transform="translate(-40%, -105%)"
        >
            <Flex direction="column">
                <Box
                    w="100%"
                    h="100%"
                    borderRadius="16px 16px 0 0"
                    overflow="hidden"
                    position="relative"
                    boxSizing="border-box"
                >
                    <Image
                        src={offer.image}
                        alt={offer.title}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        cursor="default"
                    />

                    <Popover placement="top">
                        <PopoverTrigger>
                            <Box
                                position="absolute"
                                top="20%"
                                right="15%"
                                transform="translate(50%, -50%)"
                                bg="white"
                                borderRadius="lg"
                                boxShadow="lg"
                                p={2}
                                cursor="pointer"
                            >
                                {heartFilled ? (
                                    <BsHeartFill
                                        size={24}
                                        color="red"
                                        onClick={() => setHeartFilled(false)}
                                    />
                                ) : (
                                    <BsHeart
                                        size={24}
                                        color="grey"
                                        onClick={() => setHeartFilled(true)}
                                    />
                                )}
                            </Box>
                        </PopoverTrigger>
                    </Popover>
                </Box>

                <Center
                    flexDirection="column"
                    textAlign="center"
                    h="100%"
                    px={4}
                    py={3}
                    cursor="pointer"
                >
                    <Flex
                        justifyContent="space-between"
                        w="100%"
                        alignItems={'center'}
                    >
                        <BsTools size={18} color="gray" />
                        <Text
                            fontSize="xl"
                            fontWeight="medium"
                            color={useColorModeValue('gray.700', 'white')}
                        >
                            Réparation vélo
                        </Text>
                    </Flex>
                </Center>
            </Flex>
        </Box>
    )
}
