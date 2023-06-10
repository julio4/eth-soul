import React, { FC, useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Text } from '@chakra-ui/react';
import { Offer } from '@types/app';

type TabOfferProps = {
  offer: Offer;
};

export const TabOffer: FC<TabOfferProps> = ({ offer }) => {
  const [activeTab, setActiveTab] = useState(0); // État pour suivre l'index de l'onglet actif

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
        <TabPanel px={6}>
          <Text fontWeight="medium" fontSize="md" color="gray.900" mb={2}>
            {offer.description}
          </Text>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
