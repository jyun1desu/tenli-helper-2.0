import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Icon, Text } from '@chakra-ui/react';
import PencilIcon from '@/assets/pencil.svg?react';
import DeleteIcon from '@/assets/trash-01.svg?react';
import ChevronRightIcon from '@/assets/chevron-right.svg?react';
import formatNumber from '@/utils/formatNumber.js';
import TextInput from '@/components/text-input/TextInput';
import OrderDetail from '@/components/orderItem/OrderItem';
import getGiftsData from '@/utils/getGiftsData';
import { formatTimestampToDateString } from '../../utils/formatTimestampToDateString';


const OrderItem = ({
    id,
    customerName,
    timestamp,
    onCustomerNameChange,
    onDeleteOrder,
    importItem,
    items = {},
    productData = {},
    promotionData = {},
    membershipFee = 0,
    isDetailVisible = false,
    setIsDetailVisible,
}) => {
    const { t, i18n } = useTranslation('orders');
    const [isButtonReconfirming, setIsButtonReconfirming] = useState(false);
    const isZh = i18n.language.startsWith('zh');
    const { total, points } = useMemo(() => {
        const { total, points } = Object.entries(items).reduce((acc, cur) => {
            const [itemId, itemQuantity] = cur
            const { price, pv } = productData[itemId];
            const total = acc.total + price * itemQuantity;
            const points = acc.points + pv * itemQuantity;
            return {
                total, points
            }
        }, { total: membershipFee, points: 0 })

        return { total, points }
    }, [items, membershipFee, productData]);

    const giftList = useMemo(() => {
        if (!promotionData.gifts) {
            return [];
        }
        return Object.values(promotionData.gifts).sort((a, b) => a.value - b.value);
    }, [promotionData])

    const finalGiftData = getGiftsData(giftList, points);

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
            <Text color="content.tertiary" mb="1"><b>{formatTimestampToDateString(timestamp)}</b></Text>
            <Box display="flex" gap="7">
                <TextInput value={customerName} onChange={onCustomerNameChange} placeholder={t('placeholderCustomerName')} />
                <Box display="flex" alignItems="center" gap="2">
                    <Button p="2" bg="bg.highlight" color="content.primary" minWidth="unset" onClick={() => {
                        importItem(id)
                    }}>
                        <Icon as={PencilIcon} />
                    </Button>
                    <Button
                        onClick={() => {
                            if (!isButtonReconfirming) {
                                setIsButtonReconfirming(true)
                            } else {
                                onDeleteOrder(id)
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
                                {t('confirmDelete')}
                            </Text>
                        ) : null}
                    </Button>
                </Box>
            </Box>
            <Box display="flex" mt="3" justifyContent="space-between">
                <Text textStyle="lg"><b>{formatNumber(total)}</b></Text>
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
                    <Text as="span" textStyle="lg" letterSpacing={isZh ? '1px' : 0} fontWeight={isZh ? 500 : 600}>
                        {t('moreDetails')}
                    </Text>
                    <Icon as={ChevronRightIcon} transform={isDetailVisible ? 'rotate(90deg)' : 'rotate(0)'} transition=".3s" />
                </Box>
            </Box>
            {
                isDetailVisible ? (
                    <OrderDetail
                        cartItems={items}
                        gift={finalGiftData.gift}
                        membershipFee={membershipFee}
                    />
                ) : null
            }
        </Box>
    )
}

const Orders = ({
    onDeleteOrder,
    clear,
    importItem,
    productData = {},
    promotionData = {},
    onCustomerNameChange,
    orderHistoryList = {},
}) => {
    const { t } = useTranslation('orders');
    const [isButtonReconfirming, setIsButtonReconfirming] = useState(false);
    const [showingDetailItemId, setShowingDetailItemId] = useState('');
    const orderItems = Object.values(orderHistoryList) || [];

    return (
        <Box display="flex" flexDirection="column" height="100%">
            <Box flex="1 1 auto" display="flex" flexDirection="column" gap="3" pt="4" px="4" overflow="scroll">
                {
                    orderItems.map(item => {
                        const { id, customerName, items, membershipFee, timestamp } = item;
                        return (
                            <OrderItem
                                key={id}
                                id={id}
                                onDeleteOrder={onDeleteOrder}
                                productData={productData}
                                promotionData={promotionData}
                                timestamp={timestamp}
                                onCustomerNameChange={onCustomerNameChange}
                                customerName={customerName}
                                importItem={importItem}
                                membershipFee={membershipFee}
                                items={items}
                                isDetailVisible={showingDetailItemId === id}
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
                    disabled={!orderItems.length}
                    size="xl"
                    width="100%"
                    bg={isButtonReconfirming ? "content.warning" : "white"}
                    variant="outline"
                    onClick={() => {
                        if (!isButtonReconfirming) {
                            setIsButtonReconfirming(true)
                        } else {
                            clear();
                            setIsButtonReconfirming(false)
                        }
                    }}
                    onBlur={() => {
                        setIsButtonReconfirming(false)
                    }}
                    color={isButtonReconfirming ? "white" : "content.tertiary"}
                >
                    <Text textStyle="xl" letterSpacing="2px">{isButtonReconfirming ? t('confirmClearAll') : t('clearAll')}</Text>
                </Button>
            </Box>
        </Box>
    )
};

export default Orders;