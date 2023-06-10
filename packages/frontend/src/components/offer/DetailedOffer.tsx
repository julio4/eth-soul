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
    Flex
} from '@chakra-ui/react'
import React, { FC } from 'react';
import Image from 'next/image';
import cover from 'public/images/cover_grenoble.jpeg';
import avatarImage from 'public/images/people/personne1.jpeg';

import { Offer } from '../../types/app';
import { AuthorOffer } from './AuthorOffer';

type DetailedOfferProps = {
    offer: Offer;
    isOpen: boolean;
    onClose: () => void;
};

export const DetailedOffer: FC<DetailedOfferProps> = ({ offer, isOpen, onClose }) => {
    const btnRef = React.useRef();
    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader px={3} pr={8} mt={2} pb={1}>
                        <Box>
                            <Flex align="flex-start" flexDirection={'row'} alignItems="center">
                                <Text width={"70%"}>
                                    Réparation vélo
                                </Text>
                                <Flex flexDirection={'column'} alignItems="flex-end">
                                    <Text fontWeight="light" fontSize="sm" color="gray.500" >2 days ago</Text>
                                </Flex>
                            </Flex>
                        </Box>
                    </DrawerHeader>

                    <DrawerBody px={0}>
                        <Box position="relative" mb={14} height={"20%"}>
                            <Box
                                width="100%"
                                height="100%"
                                position="relative"
                                overflow="hidden"
                            >
                                <Image
                                    src={cover}
                                    alt='offer'
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </Box>
                            <Flex
                                position="absolute"
                                left={5}
                                bottom={-9}
                                align="center"
                                justify="center"
                                borderRadius="full"
                                bg="white"
                                p={1}
                                zIndex={1}
                            >
                                <Box borderRadius="full" overflow="hidden">
                                    <Image src={avatarImage} alt='avatar' width={84} height={84} />
                                </Box>
                            </Flex>
                        </Box>
                        <Box px={5}>
                            <AuthorOffer offer={offer} />
                        </Box>

                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue'>Save</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
};
