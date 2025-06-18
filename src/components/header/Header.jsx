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
        title: '已儲存訂單',
        description: '將已儲存的表單匯出為 EXCEL 檔'
    },
    join: {
        title: '製作入會單',
        description: '將已儲存的表單匯出為 EXCEL 檔'
    },
}



const Header = ({ currentPage }) => {
    if (currentPage === 'home') {
        return null;
    }
    return (
        <Box display="flex" bg="white" pt="4" pb="3" px="4" height="80px">
            <Heading
                mt="auto"
                textAlign="left"
                color="content.highlight"
                size="3xl"
                letterSpacing="5px"
                fontWeight={600}>{PAGES_CONFIG[currentPage].title}</Heading>
        </Box>
    )
};

export default Header;