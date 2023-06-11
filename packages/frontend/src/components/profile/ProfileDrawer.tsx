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
import { Image } from '@chakra-ui/react'
import defaultCover from 'public/images/default-cover-offer.jpg';
import defaultAvatar from 'public/images/people/avatar_default.jpeg';
import { CONTRACT_ADDRESS } from '@utils/const';
import abiContract from '@assets/abi/sel.json'

import { Offer } from '../../types/app';
import { AbiItem } from 'viem';

type ProfileDrawerProps = {
    isOpen: boolean;
    onClose: () => void;
    isConnected: boolean;
};

export const ProfileDrawer: FC<ProfileDrawerProps> = ({ isOpen, onClose, isConnected }) => {
    const btnRef = React.useRef();

    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
                size="md"
            >
                {isConnected ? (
                    <>
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerCloseButton />
                            <DrawerHeader px={8} pr={0} mt={2} pb={1}>
                                <Box>
                                    <Flex align="flex-start" flexDirection={'row'} alignItems="center">
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
                                    </Flex>
                                </Box>

                            </DrawerBody>

                            <DrawerFooter>
                                <Button colorScheme='blue' >
                                    Propose Your Help</Button>
                            </DrawerFooter>
                        </DrawerContent>
                    </>
                ) : (
                    <Text>Please connect your account first</Text>
                )}
            </Drawer >
        </>
    )
};
