import React, { FC, useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Text, Box } from '@chakra-ui/react';
import { Offer } from '@types/app';
import Image from 'next/image';
import noImage from 'public/images/no-images.png';

type TabOfferProps = {
  offer: Offer;
};

export const TabOffer: FC<TabOfferProps> = ({ offer }) => {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (index: number) => {
    setActiveTab(index);
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
          <Text fontWeight="medium" fontSize="md" color="gray.900" mb={2}>
            {offer.description}
          </Text>
        </TabPanel>
        <TabPanel style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          {offer.images ? (
            offer.images.map((image, index) => (
              <Image key={index} alt="Pictures of the offer" width={500} height={500} src={image} />
            ))
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
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
