import { Avatar, Flex, Text, Box } from "@chakra-ui/react";
import React, { FC } from "react";
import { Offer } from "../../types/app";

type AuthorOfferProps = {
    offer: Offer;
};

export const AuthorOffer: FC<AuthorOfferProps> = ({ offer }) => {
    return (
        <Flex align="flex-start" flexDirection={'column'}>
            <Flex alignItems="center" justifyContent="flex-start" width="100%" align="center" alignContent={"center"}>
                <Text fontWeight="bold" mr={2}>{offer.author.name}</Text>
                <Text fontWeight={"bold"} fontSize={"sm"} backgroundColor="green.300" borderRadius="lg" px={2} py={1}  >🌿 Verified</Text>
            </Flex>
            <Text fontWeight="medium" fontSize="sm" color="gray.600" >Saint-Martin-le-Vinoux (Nord-Est)</Text>

        </Flex>
    );
}