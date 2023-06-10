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
import ZoomContext from '@shared/zoomContext'

import { FC, useState, useContext, useEffect } from 'react'

import { BsHeart, BsHeartFill, BsTools } from 'react-icons/bs'
import AvatarPhoto from 'public/images/people/personne1.jpeg'

type OfferPopUpProps = {
    width?: string | number
}

export const OfferPopUp: FC<OfferPopUpProps> = ({ width = '100%' }) => {
    const { zoomLevel } = useContext(ZoomContext)

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
            transform={
                zoomLevel > 15 ? 'translate(-40%, -130%)' :
                zoomLevel == 15 ? 'translate(-35%, -140%)' :
                    zoomLevel == 14 ? 'translate(-35%, -150%)' : 'translate(-35%, -130%)'
            }
        >
            <Flex direction="column">
                <Box
                    w="100%"
                    h="100%"
                    borderRadius={
                        zoomLevel > 13 ? '16px 16px 0 0' : '16px'
                    }
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
                                top={
                                    zoomLevel >= 16 ? '15%' :
                                        zoomLevel == 15 ? '20%' :
                                            zoomLevel == 14 ? '25%'
                                                : '20%'
                                }
                                right={
                                    zoomLevel >= 16 ? '12%' :
                                        zoomLevel == 15 ? '16%' :
                                            zoomLevel == 14 ? '19%'
                                                : '16%'
                                }
                                transform="translate(50%, -50%)"
                                bg="white"
                                borderRadius="lg"
                                boxShadow="lg"
                                p={
                                    zoomLevel >= 14 ? 2 : 1
                                }
                                cursor="pointer"
                            >
                                {heartFilled ? (
                                    <BsHeartFill
                                        size={
                                            zoomLevel >= 15 ? 24 :
                                                zoomLevel == 14 ? 20 : 12
                                        }
                                        color="red"
                                        onClick={() => setHeartFilled(false)}
                                    />
                                ) : (
                                    <BsHeart
                                        size={
                                            zoomLevel >= 15 ? 24 :
                                                zoomLevel == 14 ? 20 : 12
                                        }
                                        color="grey"
                                        onClick={() => setHeartFilled(true)}
                                    />
                                )}
                            </Box>
                        </PopoverTrigger>
                    </Popover>
                </Box>

                {
                    zoomLevel > 13 && (

                        <Center
                            flexDirection="column"
                            textAlign="center"
                            h="100%"
                            px={4}
                            py={3}
                            cursor="pointer"
                        >
                            <Flex
                                justifyContent="flex-start"
                                w="100%"
                                alignItems={'center'}
                            >
                                <BsTools size={18} color="gray" />
                                <Text
                                    fontSize={
                                        zoomLevel > 14 ? 'xl' : 'lg'
                                    }
                                    fontWeight="medium"
                                    color={useColorModeValue('gray.700', 'white')}
                                    width={'100%'}
                                    pl={2}
                                >
                                    Babysitting
                                </Text>
                            </Flex>
                        </Center>
                    )
                }
            </Flex>
        </Box>
    )
}
