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
} from '@chakra-ui/react'
import { FC } from 'react'

import { BsHeart } from 'react-icons/bs'
import AvatarPhoto from 'public/images/people/personne1.jpeg'

type OfferPopUpProps = {
    width?: string | number;
};

export const OfferPopUp: FC<OfferPopUpProps> = ({width = "100%"}) => {
    const offer = {
        image: 'https://lesveloselectriques.fr/wp-content/uploads/2023/03/VTT-electrique-occasion.jpg',
        timeSince: '3 hours ago',
        title: 'title',
        description: 'description',
        price: '4',
        location: '12 rue des Maronniers, Prague',
        author: 'Antoine',
    }

    return (
        <Box borderRadius={10} boxShadow="lg" bg="white" w={width}>
            <Flex>
                <Box
                    w="40%"
                    borderRadius="10px 0 0 10px"
                    overflow="hidden"
                    position="relative"
                >
                    <Image
                        src={offer.image}
                        alt={offer.title}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                    />

                    <Popover placement="top-end">
                        <PopoverTrigger>
                            <Box
                                position="absolute"
                                top="17%"
                                right="12%"
                                transform="translate(50%, -50%)"
                                bg="white"
                                borderRadius="lg"
                                boxShadow="lg"
                                p={2}
                            >
                                <BsHeart size={34} />
                            </Box>
                        </PopoverTrigger>
                        <PopoverContent
                            p={2}
                            bg="white"
                            boxShadow="lg"
                            borderRadius={10}
                        >
                            <Box>This is a heart!</Box>
                        </PopoverContent>
                    </Popover>
                </Box>

                <Box p={4}>
                    <Center
                        flexDirection="column"
                        textAlign="center"
                        h="100%"
                        px={2}
                    >
                        <Flex
                            justifyContent="space-between"
                            alignItems="center"
                            flexDir={'row'}
                            w="100%"
                        >
                            <Image
                                src={AvatarPhoto.src}
                                alt={offer.author}
                                w="50px"
                                h="50px"
                                borderRadius="full"
                                objectFit="cover"
                            />
                            <Text
                                fontSize="medium"
                                fontWeight="bold"
                                color={useColorModeValue('gray.200', 'gray.500')}
                            >
                                {offer.price} SEL
                            </Text>
                        </Flex>
                        <Flex
                            justifyContent="space-between"
                            w="100%"
                            alignItems="center"
                        >
                            <Text
                                fontSize="2xl"
                                fontWeight="semibold"
                                color={useColorModeValue('gray.800', 'white')}
                            >
                                Réparation vélo
                            </Text>
                        </Flex>
                        <Flex
                            justifyContent="flex-end"
                            w="100%"
                            alignItems="center"
                        >
                            <Text fontSize="xs" fontWeight="bold">
                                {offer.location}
                            </Text>
                        </Flex>
                        <Divider />
                    </Center>
                </Box>
            </Flex>
        </Box>
    )
}
