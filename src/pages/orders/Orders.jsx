import React, { useState } from 'react';
import { Box, Button, Icon, Text, Input, Grid, GridItem } from '@chakra-ui/react';
import ShareIcon from '@/assets/share-03.svg?react';
import GiftIcon from '@/assets/gift.svg?react';
import PencilIcon from '@/assets/pencil.svg?react';
import DeleteIcon from '@/assets/trash-01.svg?react';
import ChevronRightIcon from '@/assets/chevron-right.svg?react';
import formatNumber from '@/utils/formatNumber.js';
import { TEST_GIFT_LIST, TEST_ORDER_ITEM_LIST } from '../calculator/test';


const OrderItem = ({
    id,
    customerName,
    onCustomerNameChange,
    onDelete,
    onImport,
    items = TEST_ORDER_ITEM_LIST,
    gift = TEST_GIFT_LIST[0],
    pv = 6000,
    amount = 72000,
}) => {
    const [isDetailVisible, setIsDetailVisible] = useState(false);
    return (
        <Box display="flex" flexDirection="column" px="4" py="3" borderRadius="8px" bg="white">
            <Box display="flex" gap="7">
                <Input
                    size="lg"
                    px="1"
                    placeholder="客人姓名"
                    variant="flushed"
                    focusRingWidth="1px"
                    letterSpacing="3px"
                    textStyle="xl"
                    fontWeight={500}
                    borderColor="border.primary"
                    color="content.highlight"
                    _placeholder={{ color: "#4eb56b5c" }}
                    css={{ "--focus-color": "#d2e2ce" }}
                />
                <Box display="flex" alignItems="center" gap="2">
                    <Button p="2" bg="bg.highlight" color="content.primary" minWidth="unset">
                        <Icon as={PencilIcon} />
                    </Button>
                    <Button p="2" variant="subtle">
                        <Icon as={DeleteIcon} />
                    </Button>
                </Box>
            </Box>
            <Box display="flex" mt="3" justifyContent="space-between">
                <Text textStyle="lg"><b>{formatNumber(amount)}</b></Text>
                <Box
                    as="button" onClick={() => {
                        setIsDetailVisible(pre => !pre)
                    }}
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                    gap="1"
                >
                    <Text as="span" textStyle="md" letterSpacing="1px">
                        更多細節
                    </Text>
                    <Icon as={ChevronRightIcon} transform={isDetailVisible ? 'rotate(90deg)' : 'rotate(0)'} transition=".3s" />
                </Box>
            </Box>
            {
                isDetailVisible ? (
                    <>
                        <Box borderTop="1px solid" borderStyle="dashed" borderColor="border.secondary" mt="2" pt="3">
                            <Grid templateColumns="repeat(2, 1fr)" gap="3" px="3">
                                {
                                    items.map((item) => {
                                        const { series, seriesNumber, name, amount } = item;
                                        return (
                                            <>
                                                <GridItem >
                                                    <Text textStyle="md" letterSpacing="2px" color="content.primary" textAlign="left">
                                                        {`${series}${seriesNumber} ${name}`}
                                                    </Text>
                                                </GridItem>
                                                <GridItem>
                                                    <Text textStyle="md" letterSpacing="2px" color="content.primary" textAlign="right">x <b>{amount}</b></Text>
                                                </GridItem>
                                            </>
                                        );
                                    })
                                }
                            </Grid>
                        </Box>

                        <Box borderTop="1px solid" borderStyle="dashed" borderColor="border.secondary" mt="2" pt="3">
                            <Grid templateColumns="repeat(2, 1fr)" gap="3" px="3">
                                <GridItem display="flex" alignItems="center" gap="3">
                                    <Icon color="icon.primary" size="md" as={GiftIcon} />
                                    <Text textStyle="md" letterSpacing="2px" color="content.primary">
                                        {gift?.label || '尚無贈品'}
                                    </Text>
                                </GridItem>
                                {gift ? (
                                    <GridItem>
                                        <Text textStyle="md" letterSpacing="2px" color="content.primary" textAlign="right">x <b>1</b></Text>
                                    </GridItem>
                                ) : null}
                            </Grid>
                        </Box>
                    </>
                ) : null
            }
        </Box>
    )
}

const Orders = () => {
    return (
        <Box display="flex" flexDirection="column" height="100%">
            <Box p py="4" px="4">
                <OrderItem />
            </Box>
            <Box py="4" px="4" mt="auto" flex="0 0 auto">
                <Button size="xl" width="100%" bg="bg.secondary">
                    <Text textStyle="xl" letterSpacing="2px">匯出所有資料至 <b>EXCEL</b></Text>
                    <Icon as={ShareIcon} />
                </Button>
            </Box>
        </Box>
    )
};

export default Orders;