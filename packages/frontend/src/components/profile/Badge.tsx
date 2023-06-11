import { ProBadgeDetails, CasualBadgeDetails, BadgeInfo } from '../../types/badge'
import { Category } from '../../types/category'
import { Box, Text } from '@chakra-ui/react'

interface CategoryBadgeProps {
	badgeInfo: BadgeInfo
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ badgeInfo }) => {
	const isProBadge = Object.values(ProBadgeDetails).includes(badgeInfo)

	const textColor = isProBadge ? 'white' : '#232B2F'

	return (
		<Box
			backgroundColor={badgeInfo.color}
			borderRadius="full"
			px={3}
			py={1}
			mr={2}
			mb={2}
			display="inline-block"
			boxShadow="md"
		>
			<Text fontWeight={'bold'} fontSize={'sm'} color={textColor}>
				{badgeInfo.text}
			</Text>
		</Box>
	)
}

export { CategoryBadge }
