import React, { FC, useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Text, Box } from '@chakra-ui/react';
import { Offer } from '@types/app';
import Image from 'next/image';
import CarouselPictures from '@components/image/carouselPictures';
import { ShortProfilePage } from '@components/profile/ShortProfilePage';
import noImage from 'public/images/no-images.png';

type TabOfferProps = {
    offer: Offer;
};

export const TabOffer: FC<TabOfferProps> = ({ offer }) => {
    const [activeTab, setActiveTab] = useState(0);
    const handleTabChange = (index: number) => {
        setActiveTab(index);
    };

    const renderDescription = (description: string) => {
        const lines = description.split('<br/>');
        return lines.map((line, index) => (
            <Text key={index} fontWeight={600} color={'gray.500'} mb={2} fontSize="md">
                {line}
            </Text>
        ));
    };

    return (
        <Tabs width="100%" variant="enclosed" isLazy onChange={handleTabChange} index={activeTab}>
            <TabList>
                <Tab flexGrow={1} fontWeight={activeTab === 0 ? 'bold' : 'normal'}>Description</Tab>
                <Tab flexGrow={1} fontWeight={activeTab === 1 ? 'bold' : 'normal'}>Pictures</Tab>
                <Tab flexGrow={1} fontWeight={activeTab === 2 ? 'bold' : 'normal'}>Profile</Tab>
            </TabList>

            <TabPanels>
                <TabPanel px={4}>
                    <Text mb={2}>
                        {renderDescription(offer.description)}
                    </Text>
                </TabPanel>
                <TabPanel style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {offer.images ? (
                        <CarouselPictures images={offer.images} />
                    ) : (
                        <Box
                            width="100%"
                            height="100%"
                            position="relative"
                            overflow="hidden"
                            justifyContent="center"
                            alignItems="center"
                            display="flex"
                            mt={4}
                        >
                            <Image alt="No picture" src={noImage} style={{ borderRadius: '8px' }} />
                        </Box>
                    )}
                </TabPanel>
                <TabPanel>
                    <ShortProfilePage author={offer.author} />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};
