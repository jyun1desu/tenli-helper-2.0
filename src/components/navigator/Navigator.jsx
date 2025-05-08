import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';

import Home from '@/assets/calculator.svg?react';
import Gift from '@/assets/gift.svg?react';
import Orders from '@/assets/file.svg?react';
import NavigationButton from './naviation-button/NavigationButton.jsx';

const navsConfig = [{
    icon: Home,
    label: "計算機",
}, {
    icon: Gift,
    label: "贈品",
}, {
    icon: Orders,
    label: "待印表單",
}];

const Navigator = () => {
    const [selected, setIsSelected] = useState(navsConfig[0].label);


    return (
        <Box
            py="3"
            px="4"
            background="white"
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            borderTopLeftRadius="16px"
            borderTopRightRadius="16px"
        >
            {navsConfig.map((nav) => {
                return (
                    <NavigationButton icon={nav.icon} label={nav.label} isSelected={selected === nav.label} onClick={(label) => { setIsSelected(label) }} />
                )
            })}
        </Box>
    )
};

export default Navigator;
