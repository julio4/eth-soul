import { Box, Flex } from '@chakra-ui/react'
import Image from 'next/image'
import { Author } from '@types/app'

type AvatarAndCoverProps = {
	author: Author
}

export const AvatarAndCover = ({ author }: AvatarAndCoverProps) => {
	return (
		<Box position="relative" mb={12} height={'20%'} p={0}>
			<Box width="100%" height="100%" position="relative" overflow="hidden">
				<Image
					src={
						'https://images.unsplash.com/photo-1515268064940-5150b7c29f35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Ymx1ZSUyMG1vdW50YWlufGVufDB8fDB8fHww&w=1000&q=80'
					}
					alt="defaultCover"
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
					{author.avatar ? (
						<Image src={author.avatar} alt="avatar" width={84} height={84} />
					) : (
						<Image
							src={'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'}
							alt="avatar"
							width={84}
							height={84}
						/>
					)}
				</Box>
			</Flex>
		</Box>
	)
}
