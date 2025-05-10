import React, { useState } from 'react';
import { Box, Button, Icon, Text, Input, Grid, GridItem } from '@chakra-ui/react';
import ShareIcon from '@/assets/share-03.svg?react';
import PencilIcon from '@/assets/pencil.svg?react';
import DeleteIcon from '@/assets/trash-01.svg?react';
import ChevronRightIcon from '@/assets/chevron-right.svg?react';
import formatNumber from '@/utils/formatNumber.js';
import { TEST_GIFT_LIST, TEST_ORDER_ITEM_LIST } from '../calculator/test';
import CustomerNameInput from '@/components/customer-name-input/CustomerNameInput';
import OrderDetail from '@/components/orderItem/OrderItem';


const OrderItem = ({
    id,
    customerName,
    onCustomerNameChange,
    onDelete,
    onImport,
    items = TEST_ORDER_ITEM_LIST,
    gift = TEST_GIFT_LIST[0],
    pv = 6000,
    membershipFee = 0,
    amount = 72000,
    isDetailVisible = false,
    setIsDetailVisible,
}) => {
    const [isButtonReconfirming, setIsButtonReconfirming] = useState(false);
    return (
        <Box
            onClick={() => {
                setIsDetailVisible(pre => {
                    return pre === id ? id : ''
                })
            }}
            display="flex"
            flexDirection="column"
            px="4"
            py="3"
            borderRadius="8px"
            bg="white"
        >
            <Box display="flex" gap="7">
                <CustomerNameInput placeholder='客人姓名' />
                <Box display="flex" alignItems="center" gap="2">
                    <Button p="2" bg="bg.highlight" color="content.primary" minWidth="unset">
                        <Icon as={PencilIcon} />
                    </Button>
                    <Button
                        onClick={() => {
                            if (!isButtonReconfirming) {
                                setIsButtonReconfirming(true)
                            } else {
                                console.log('delete');
                                setIsButtonReconfirming(false)
                            }
                        }}
                        onBlur={() => {
                            setIsButtonReconfirming(false)
                        }}
                        p="2"
                        variant="subtle"
                        bg={isButtonReconfirming ? "content.warning" : ""}
                        transition="all 0s"
                    >
                        <Icon as={DeleteIcon} color={isButtonReconfirming ? "white" : "content.primary"} />
                        {isButtonReconfirming ? (
                            <Text
                                as="span"
                                color="white"
                                textStyle="md"
                                letterSpacing="2px"
                            >
                                確定刪除
                            </Text>
                        ) : null}
                    </Button>
                </Box>
            </Box>
            <Box display="flex" mt="3" justifyContent="space-between">
                <Text textStyle="lg"><b>{formatNumber(amount)}</b></Text>
                <Box
                    as="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsDetailVisible(pre => {
                            return pre === id ? '' : id
                        })
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
                    <OrderDetail
                        items={items}
                        gift={gift}
                        membershipFee={membershipFee}
                    />
                ) : null
            }
        </Box>
    )
}

const Orders = ({
    orderItems = []
}) => {
    const [isButtonReconfirming, setIsButtonReconfirming] = useState(false);
    const [showingDetailItemId, setShowingDetailItemId] = useState('');

    return (
        <Box display="flex" flexDirection="column" height="100%">
            <Box flex="1 1 auto" display="flex" flexDirection="column" gap="3" pt="4" px="4" overflow="scroll">
                {
                    [1, 2, 3, 4, 5].map(id => {
                        return (
                            <OrderItem
                                key={id}
                                isDetailVisible={showingDetailItemId === id}
                                id={id}
                                setIsDetailVisible={(id) => {
                                    setShowingDetailItemId(id);
                                }}
                            />
                        )
                    })
                }
            </Box>
            <Box py="4" px="4" mt="auto" flex="0 0 auto">
                <Button
                    size="xl"
                    width="100%"
                    bg={isButtonReconfirming ? "content.warning" : "white"}
                    variant="outline"
                    onClick={() => {
                        if (!isButtonReconfirming) {
                            setIsButtonReconfirming(true)
                        } else {
                            console.log('delete');
                            setIsButtonReconfirming(false)
                        }
                    }}
                    onBlur={() => {
                        setIsButtonReconfirming(false)
                    }}
                    color={isButtonReconfirming ? "white" : "content.tertiary"}
                >
                    <Text textStyle="xl" letterSpacing="2px">{isButtonReconfirming ? '確定清除' : '清除全部'}</Text>
                </Button>
                <Button size="xl" width="100%" bg="bg.secondary" mt="3">
                    <Text textStyle="xl" letterSpacing="2px">匯出所有資料至 <b>EXCEL</b></Text>
                    <Icon as={ShareIcon} />
                </Button>
            </Box>
        </Box>
    )
};

export default Orders;