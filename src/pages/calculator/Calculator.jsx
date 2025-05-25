import React, { useMemo, useState } from 'react';
import { Box, Button, Checkbox, Field, Icon, Input, Text } from '@chakra-ui/react';
import PVIcon from '@/assets/diamond.svg?react';
import ReceiptIcon from '@/assets/receipt-check.svg?react';
import GiftIcon from '@/assets/gift.svg?react';
import GridIcon from '@/assets/grid.svg?react';
import MagicWand from '@/assets/magic-wand.svg?react';
import ListIcon from '@/assets/list.svg?react';
import ShoppingBagIcon from '@/assets/shopping-bag.svg?react';
import GiftInfoSummary from '@/components/giftInfoSummary/GiftInfoSummary.jsx';
import ItemList, { LAYOUT } from '@/components/item-list/ItemList.jsx';
import Modal from '@/components/modal/Modal.jsx';
import formatNumber from '@/utils/formatNumber.js';
import CustomerNameInput from '../../components/customer-name-input/CustomerNameInput.jsx';
import OrderDetail from '../../components/orderItem/OrderItem.jsx';
import { MEMBERSHIP_FEE, PRODUCT_DATA, PROMOTION_DATA } from '../../utils/const.js';

const Calculator = ({
    cartItems = {},
    total = 0,
    points = 0,
    membershipFee = 0,
    giftData = {},
    customerName,
    onCustomerNameChange,
    onMembershipChange,
    onItemQuantityChange,
    saveItem,
    resetForm,
}) => {
    const [currentFilter, setCurrentFilter] = useState('全部');
    const [layout, setLayout] = useState(LAYOUT.LIST);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isGiftAreaVisible, setIsGiftAreaVisible] = useState(false);

    const itemList = useMemo(() => {
        return Object.values(PRODUCT_DATA).sort((a, b) => a.order - b.order);
    }, []);

    const filters = useMemo(() => {
        const lookup = {};
        const filters = ['全部'];

        itemList.forEach(item => {
            if (!lookup[item.series]) {
                lookup[item.series] = true;
                filters.push(item.series);
            }
        });

        return filters;
    }, [itemList]);

    const displayList = useMemo(() => {
        if (currentFilter !== '全部') {
            return itemList.filter(item => item.series === currentFilter)
        }
        return itemList;
    }, [currentFilter, itemList]);

    return (
        <Box
            display="flex"
            flexDirection="column"
            width="100%"
            height="100%"
        >
            <Box display="flex" flex="0 0 auto" bg="white" pt="3" pb="2" px="4">
                <Box>
                    <Text mb="1">篩選系列</Text>
                    <Box display="flex" gap="2" alignItems="center">
                        {filters.map(filter => {
                            const isSelected = currentFilter === filter;
                            return (
                                <Button
                                    key={filter}
                                    variant="plain"
                                    borderRadius="80px"
                                    py="1px"
                                    px="5"
                                    height="auto"
                                    onClick={() => {
                                        if (filter === '全部') {
                                            setCurrentFilter('全部');
                                            return;
                                        }
                                        setCurrentFilter(isSelected ? '全部' : filter)
                                    }}
                                    bg={isSelected ? "bg.highlight" : "bg.primary"}
                                    color={isSelected ? "content.primary" : "content.primary"}
                                >
                                    <Text textStyle="lg" fontWeight={isSelected ? 700 : 500}
                                    >{filter}</Text>
                                </Button>
                            )
                        })}
                    </Box>
                </Box>
                <Box ml="auto" mt="auto" display="flex" gap="4px" p="1" borderRadius="6px" border="1px solid" borderColor="border.primary">
                    <Button height="auto" minWidth="unset" p="0" variant="plain" onClick={() => { setLayout(LAYOUT.GRID) }}>
                        <Icon as={GridIcon} size="md" color={layout === LAYOUT.GRID ? "content.highlight" : "content.tertiary"}
                        />
                    </Button>
                    <Button
                        height="auto"
                        minWidth="unset"
                        p="0"
                        variant="plain"
                        onClick={() => { setLayout(LAYOUT.LIST) }}
                    >
                        <Icon as={ListIcon} size="md" color={layout === LAYOUT.LIST ? "content.highlight" : "content.tertiary"}
                        />
                    </Button>
                </Box>
            </Box>
            <Box
                flex="1 1 auto"
                px="4"
                pt="3"
                overflowY="scroll"
                onScroll={() => {
                    setIsGiftAreaVisible(false)
                }}
            >
                <ItemList
                    layout={layout}
                    list={displayList}
                    onItemQuantityChange={onItemQuantityChange}
                    cartItems={cartItems}
                />
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                flex="0 0 auto"
                mx="4"
                mt="2"
                position="relative"
            >
                <Box
                    pt="2"
                    pb="3"
                    px="4"
                    bg="white"
                    zIndex={2}
                >
                    <Box display="flex" flexDirection="column" color="content.primary">
                        <Checkbox.Root
                            variant="solid"
                            size="lg"
                            alignSelf="flex-end"
                            checked={!!membershipFee}
                            onCheckedChange={(e) => onMembershipChange(e.checked)}
                        >
                            <Checkbox.HiddenInput />
                            <Checkbox.Control />
                            <Checkbox.Label textStyle="xl">入會費 <b>{formatNumber(MEMBERSHIP_FEE)}</b></Checkbox.Label>
                        </Checkbox.Root>
                        <Box display="flex" justifyContent="flex-end" gap="16px" mt="1">
                            <Text display="flex" alignItems="center" justifyContent="flex-end" flex="1 1 auto" textStyle="xl">
                                <Icon mr="1" color="icon.primary" size="s" as={PVIcon} />
                                <Text as="span" color="content.secondary" mr="3">PV</Text>
                                <Text as="span" fontWeight={600}>{`  ${formatNumber(points, false)}`}</Text>
                            </Text>
                            <Text display="flex" alignItems="center" justifyContent="flex-end" flex="0 1 auto" textStyle="xl">
                                <Icon mr="1" color="icon.primary" size="s" as={ReceiptIcon} />
                                <Text as="span" mr="3">合計</Text>
                                <Text as="span" fontWeight={600}>{` ${formatNumber(total)}`}</Text>
                            </Text>
                        </Box>
                    </Box>
                    <Box display="flex" gap="16px" mt="2">
                        <Button bg="white" size="md" flex="2" variant="outline" onClick={resetForm}>
                            <Text textStyle="lg" color="content.tertiary" letterSpacing="2px">清除</Text>
                        </Button>
                        <Button
                            onClick={() => {
                                setModalOpen(true)
                            }}
                            bg="bg.secondary"
                            size="md"
                            flex="5"
                            disabled={total === 0}
                        >
                            <Text textStyle="lg" letterSpacing="2px">儲存資料</Text>
                        </Button>
                    </Box>
                </Box>
                <Box
                    zIndex={1}
                    width="100%"
                    bottom="100%"
                    left="0"
                    transform={`translateY(${isGiftAreaVisible ? '0' : '100%'})`}
                    transition="transform .3s"
                    position="absolute"
                    borderBottom="1px solid"
                    borderStyle="dashed"
                    borderColor="border.primary"
                    mt="2"
                    pt="2"
                    pb="3"
                    px="4"
                    bg="white"
                >
                    <Box
                        bg="bg.tertiary"
                        borderTopRightRadius="8px"
                        borderTopLeftRadius="8px"
                        position="absolute"
                        bottom="100%"
                        left="0"
                        py="1"
                        height="36px"
                        px="4"
                        onClick={() => { setIsGiftAreaVisible(pre => !pre) }}
                    >
                        <Icon as={GiftIcon} size="md" color="white" />
                    </Box>
                    <GiftInfoSummary giftData={giftData} />
                </Box>
            </Box>
            <Modal
                id="save-order"
                isOpen={isModalOpen}
                setOpen={setModalOpen}
                title="儲存資料"
                confirmText="儲存"
                onConfirm={()=>{
                    saveItem();
                    setModalOpen(false);
                }}
            >
                <Field.Root width="80%" orientation="horizontal">
                    <CustomerNameInput value={customerName} onChange={(e) => {
                        onCustomerNameChange(e.target.value)
                    }} placeholder='陳小麗' />
                    <Field.Label letterSpacing="2px" textStyle="2xl" flex="0 0 auto" mr="2">
                        的訂單
                        <Icon as={MagicWand} />
                    </Field.Label>
                </Field.Root>
                <Box borderRadius="8px" border="1px solid" borderStyle="dashed" borderColor="border.secondary" p="3" mt="4">
                    <Text textStyle="lg" letterSpacing="2px" display="flex" alignItems="center" gap="2">
                        <Icon color="icon.primary" as={ShoppingBagIcon} />
                        訂單内容
                    </Text>
                    <OrderDetail
                        cartItems={cartItems}
                        gift={giftData?.gift}
                        membershipFee={membershipFee}
                        showTotal={true}
                        total={total}
                    />
                </Box>
            </Modal>
        </Box>
    )
};

export default Calculator;

