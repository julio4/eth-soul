import { Flex, Text } from '@chakra-ui/react'
import React, { FC, useEffect, useState } from 'react'
import { Offer } from '../../types/app'
import { Rating } from '@components/profile/Rating'

type AuthorOfferProps = {
	offer: Offer
}

export const AuthorOffer: FC<AuthorOfferProps> = ({ offer }) => {
	const [address, setAddress] = useState('');

	useEffect(() => {
		fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?latlng=${offer.location.latitude},${offer.location.longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
		)
			.then(response => response.json())
			.then(data => {
				if (data.results && data.results[0]) {
					setAddress(data.results[0].formatted_address);
				}
			})
			.catch(error => console.error(error));
	}, [offer.location]);

	return (
		<Flex align="flex-start" flexDirection={'column'} mb={5}>
			<Flex alignItems="center" justifyContent="flex-start" width="100%" align="center" alignContent={'center'} mb={2}>
				<Text fontWeight="bold" mr={2} color={'gray.800'}>
					{offer.author.name}
				</Text>
				<Text
					fontWeight={'bold'}
					fontSize={'sm'}
					backgroundColor="green.300"
					borderRadius="lg"
					px={2}
					py={1}
					color={'gray.800'}
				>
					🌿 Verified
				</Text>
			</Flex>
			<Text fontWeight="medium" fontSize="sm" color="gray.600" mb={2}>
				{address}
			</Text>
			<Rating rating={offer.author.rating} />
		</Flex>
	);
}