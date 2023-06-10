import { Avatar, Flex, Text, Box } from "@chakra-ui/react";
import React, { FC } from "react";
import { Offer } from "../../types/app";
import { Rating } from "@components/profile/Rating";

type AuthorOfferProps = {
    offer: Offer;
};

export const AuthorOffer: FC<AuthorOfferProps> = ({ offer }) => {
    return (
        <Flex align="flex-start" flexDirection={'column'} mb={5}>
            <Flex alignItems="center" justifyContent="flex-start" width="100%" align="center" alignContent={"center"} mb={2}>
                <Text fontWeight="bold" mr={2}>{offer.author.name}</Text>
                <Text fontWeight={"bold"} fontSize={"sm"} backgroundColor="green.300" borderRadius="lg" px={2} py={1}  >🌿 Verified</Text>
            </Flex>
            <Text fontWeight="medium" fontSize="sm" color="gray.600" mb={2} >Saint-Martin-le-Vinoux (Nord-Est)</Text>
            <Rating rating={offer.author.rating} />


        </Flex>
    );
}