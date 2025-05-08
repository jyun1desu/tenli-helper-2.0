import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

const PAGES_CONFIG = {
    home: {
        title: '計算機',
        description: '快速計算商品總價與 PV 點數'
    },
    gift: {
        title: '贈品與活動',
        description: '查詢贈品門檻及最新活動資訊'
    },
    orders: {
        title: '待列印清單',
        description: '將已儲存的表單匯出為 EXCEL 檔'
    },
}



const Header = ({ currentPage }) => {
    return (
        <Box bg="white" pt="7" pb="5" px="6">
            <Heading color="content.highlight" size="4xl" letterSpacing="5px" fontWeight={600}>{PAGES_CONFIG[currentPage].title}</Heading>
            <Text color="content.tertiary" textStyle="xl" letterSpacing="1.5px">{PAGES_CONFIG[currentPage].description}</Text>
        </Box>
    )
};

export default Header;