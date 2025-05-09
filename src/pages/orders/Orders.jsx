import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

const Orders = () => {
    return (
        <Box bg="white" pt="4" pb="3" px="4">
            <Heading textAlign="left" color="content.highlight" size="2xl" letterSpacing="5px" fontWeight={600}>
                Orders
            </Heading>
        </Box>
    )
};

export default Orders;