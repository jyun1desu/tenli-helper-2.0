import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';

import Home from '@/assets/calculator.svg?react';
import Gift from '@/assets/gift.svg?react';
import Orders from '@/assets/file.svg?react';
import NavigationButton from './naviation-button/NavigationButton.jsx';

const navsConfig = [{
    icon: Home,
    label: "計算機",
    value: 'home'
}, {
    icon: Gift,
    label: "贈品活動",
    value: 'gift'
}, {
    icon: Orders,
    label: "待印表單",
    value: 'orders'
}];

const Navigator = ({
    currentPage = 'home',
    setCurrentPage,
}) => {
    const [selected, setIsSelected] = useState(currentPage);

    useEffect(() => {
        setCurrentPage(selected);
    }, [selected, setCurrentPage]);

    return (
        <Box
            py="4"
            px="6"
            gap="4"
            background="white"
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            borderTopLeftRadius="16px"
            borderTopRightRadius="16px"
        >
            {navsConfig.map((nav) => {
                return (
                    <NavigationButton
                        key={nav.value}
                        icon={nav.icon}
                        label={nav.label}
                        isSelected={selected === nav.value}
                        onClick={() => { setIsSelected(nav.value) }} />
                )
            })}
        </Box>
    )
};

export default Navigator;
