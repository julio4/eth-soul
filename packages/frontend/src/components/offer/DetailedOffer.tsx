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
} from '@chakra-ui/react'

import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import React, { FC } from 'react';
import Image from 'next/image';
import defaultCover from 'public/images/default-cover-offer.jpg';
import defaultAvatar from 'public/images/people/avatar_default.jpeg';
import { CONTRACT_ADDRESS } from '@utils/const';
import abiContract from '@assets/abi/sel.json'

import { Offer } from '../../types/app';
import { AuthorOffer } from './AuthorOffer';
import { TabOffer } from './TabOffer';
import { AbiItem } from 'viem';

type DetailedOfferProps = {
    offer: Offer;
    isOpen: boolean;
    onClose: () => void;
};

export const DetailedOffer: FC<DetailedOfferProps> = ({ offer, isOpen, onClose }) => {
    const btnRef = React.useRef();

    // Call makeProposition function
    const { data, isLoading, isSuccess, write: createMakeProposition } = useContractWrite({
        address: CONTRACT_ADDRESS,
        abi: abiContract,
        functionName: 'makeProposition',
    });

    const sendOffer = async () => {
        createMakeProposition({
            args: [offer.id]
        });
    }



    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
                size="md"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader px={8} pr={0} mt={2} pb={1}>
                        <Box>
                            <Flex align="flex-start" flexDirection={'row'} alignItems="center">
                                <Text width={"70%"}>
                                    {offer.title}
                                </Text>
                                <Flex flexDirection={'column'} alignItems="flex-end">
                                    <Text fontWeight="light" fontSize="sm" color="gray.500" >2 days ago</Text>
                                </Flex>
                            </Flex>
                        </Box>
                    </DrawerHeader>

                    <DrawerBody px={0}>
                        <Box position="relative" mb={12} height={"20%"}>
                            <Box
                                width="100%"
                                height="100%"
                                position="relative"
                                overflow="hidden"
                            >
                                <Image
                                    src={defaultCover}
                                    alt='offer'
                                    layout="fill"
                                    objectFit="defaultCover"
                                />
                            </Box>
                            <Flex
                                position="absolute"
                                left={8}
                                bottom={-9}
                                align="center"
                                justify="center"
                                borderRadius="full"
                                bg="white"
                                p={1}
                                zIndex={1}
                            >
                                <Box borderRadius="full" overflow="hidden">
                                    {
                                        offer.author.avatar ?
                                            <Image src={offer.author.avatar} alt='avatar' width={84} height={84} />
                                            :
                                            <Image src={defaultAvatar} alt='avatar' width={84} height={84} />
                                    }
                                </Box>
                            </Flex>
                        </Box>
                        <Box px={10} mb={5}>
                            <AuthorOffer offer={offer} />
                            <TabOffer offer={offer} />
                        </Box>

                    </DrawerBody>

                    <DrawerFooter>
                        <Button colorScheme='blue' onClick={sendOffer}>
                            Propose Your Help</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer >
        </>
    )
};
