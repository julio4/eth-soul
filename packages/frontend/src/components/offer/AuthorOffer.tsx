import { Avatar, Flex, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { Offer } from "../../types/app";

type AuthorOfferProps = {
    offer: Offer;
};

export const AuthorOffer: FC<AuthorOfferProps> = ({ offer }) => {
    return (
        <Flex align="center">
            <Text>{offer.author.name}</Text>
            <Text>Saint-Martin-le-Vinoux (Nord-Est)</Text>
        </Flex>
    );
}