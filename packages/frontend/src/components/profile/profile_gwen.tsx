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
    ChakraProvider,
    Divider,
    Card,
    CardBody,
    Icon,
  } from '@chakra-ui/react';

  import {
    PhoneIcon
  } from '@chakra-ui/icons';
  
  export default function ProfilePage() {
    return (
        <ChakraProvider>
            <Box
                maxW={'320px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}>
            <Center py={6}>
                <Avatar
                    size={'xl'}
                    src={
                    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
                    }
                    alt={'Avatar Alt'}
                    mb={4}
                    pos={'relative'}

                />
            </Center>
            <Center>
                <Heading textAlign="right" fontSize={'2xl'} fontFamily={'body'}>
                    Jean DUPONT
                </Heading>
                {/* <Text fontWeight={600} color={'gray.500'} mb={4}>
                    
                </Text> */}
            </Center>
                <Box textAlign="left">
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
                    <PhoneIcon />
                    <Text>
                        06 12 34 56 78
                    </Text>
                </Card>
            <Center>
                
            </Center>
            </Box>
        </ChakraProvider>
    );
  }
  