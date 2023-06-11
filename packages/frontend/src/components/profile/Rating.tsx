import { FC } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { Flex, Text } from '@chakra-ui/react'
import { RatingType } from '@types/app'

type RatingProps = {
	rating: RatingType
}

export const Rating: FC<RatingProps> = ({ rating }) => {
	return (
		<Flex
			alignItems="center"
			justifyContent="flex-start"
			width="100%"
			align="center"
			alignContent={'center'}
			mb={2}
			ml={-1}
		>
			<AiFillStar color="yellow" size={22} />
			<Text fontWeight="bold" color="gray.800" pl={1}>
				{rating.average}/5
			</Text>
			<Text fontWeight="hairline" color="gray.600" pl={1}>
				({rating.numberOfReviews} reviews)
			</Text>
		</Flex>
	)
}
