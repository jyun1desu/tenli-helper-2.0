import React from 'react';
import { Box } from '@chakra-ui/react';

import Home from '@/assets/calculator.svg?react';
import Gift from '@/assets/gift.svg?react';
import Orders from '@/assets/file.svg?react';
import NavigationButton from './naviation-button/NavigationButton.jsx';

const Navigator = () => {
    return (
        <Box background="bg.primary" display="flex" gap="12px" alignItems="center">
            <NavigationButton icon={Home} label="計算機" />
            <NavigationButton icon={Gift} label="贈品和活動" />
            <NavigationButton icon={Orders} label="待印表單" />
        </Box>
    )
};

export default Navigator;
