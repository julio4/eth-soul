import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Link,
    Badge,
    useColorModeValue,
    Divider,
    Card,
    CardBody,
    Icon,
} from '@chakra-ui/react';

import { Author } from '@types/app';
import { CategoryBadge } from './Badge';
import { BadgeList } from './BadgeList';

type ShortProfilePageProps = {
    author: Author;
};

export function ShortProfilePage({ author }: ShortProfilePageProps) {
    return (
        <Box>
            <BadgeList badges={author.badges} />
            <Center py={6} flexDirection={'column'}>
                <Box>

                    {
                        author.description ? <Text fontWeight={600} color={'gray.500'} mb={2}>
                            {author.description}
                        </Text> : <Text fontWeight={600} color={'gray.500'} mb={4}>
                            No description provided
                        </Text>
                    }
                </Box>
                <Divider mt={2} />

            </Center>
            <Box >
                <Text textAlign="left" fontSize={'xl'} fontWeight={"semibold"} color="gray.800" >
                    Reviews
                </Text>
                <Text textAlign="left" fontSize={'sm'} color="gray.600" mb={2} >
                    To be coming soon
                </Text>
            </Box>
        </Box>

    );
}