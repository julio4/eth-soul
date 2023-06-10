import React, { FC } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Text } from '@chakra-ui/react'

export const TabOffer: FC = () => {

    return (
        <Tabs width="100%" variant="enclosed" isLazy>
            <TabList>
                <Tab flexGrow={1}>Description</Tab>
                <Tab flexGrow={1}>Pictures</Tab>
                <Tab flexGrow={1}>Profile</Tab>
            </TabList>

            <TabPanels>
                <TabPanel px={6}>
                    <Text fontWeight="medium" fontSize="sm" color="gray.900" mb={2} >
                        Friendly neighborhood bike enthusiast offering affordable repair services. From flat tires to squeaky brakes, I'll fix it all. Convenient and reliable service, right at your doorstep. Pedal with confidence and enjoy the ride!
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
    )
}