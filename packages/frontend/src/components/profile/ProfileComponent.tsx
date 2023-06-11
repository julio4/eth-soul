import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Link,
    useColorModeValue,
    ChakraProvider,
    Divider,
    Card,
    CardBody,
    Image,
    Icon,
} from '@chakra-ui/react';

import { BadgeList } from './BadgeList';
import { Author } from '@types/app';
import { AvatarAndCover } from './AvatarAndCover';


type ProfileComponentProps = {
    author: Author;
};

export function ProfileComponent({ author }: ProfileComponentProps) {
    return (
        <Box
            w={'full'}
            h={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'md'}
            rounded={'lg'}
            textAlign={'center'}>
            <AvatarAndCover author={author} />

            <Center>
                <Heading textAlign="right" fontSize={'2xl'} color={'gray.700'} >
                    {author.name}
                </Heading>
            </Center>
            <Box textAlign="left">
                <BadgeList badges={author.badges} />
                <Heading as="h6" size="xs" mt={5}>
                    My activity
                </Heading>
            </Box>
            <Card mt="5">
                <CardBody>
                    Member of blablabla since 3000 years
                </CardBody>
            </Card>
            <Stack align={'center'} justify={'center'} direction={'row'} mt={3}>
                <Card>
                    <CardBody>
                        Events
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        Something else
                    </CardBody>
                </Card>
            </Stack>
            <Box textAlign={'left'}>
                <Heading as="h6" size="xs" mt={5}>
                    My Infos
                </Heading>
            </Box>
            <Card mt={5}>
                <Text>
                    06 12 34 56 78
                </Text>
            </Card>
            <Center>

            </Center>
        </Box>
    );
}
