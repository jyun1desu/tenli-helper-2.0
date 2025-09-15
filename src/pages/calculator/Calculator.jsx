import React, { useMemo, useState } from 'react';
import { Box, Button, Checkbox, Field, Icon, Input, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
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
import TextInput from '../../components/text-input/TextInput.jsx';
import OrderDetail from '../../components/orderItem/OrderItem.jsx';
import { useLocalStorage } from '@uidotdev/usehooks';

const Calculator = ({
    cartItems = {},
    total = 0,
    points = 0,
    hasPromotion = false,
    membershipFee = 0,
    defaultMembershipFee = 0,
    productData = {},
    giftData = {},
    customerName,
    currentCurrency = 'twd',
    onCustomerNameChange,
    onMembershipChange,
    onItemQuantityChange,
    saveItem,
    resetForm,
}) => {
    const { t } = useTranslation('calculator');
    const defaultFilter = t('all');
    const [currentFilter, setCurrentFilter] = useState(t('all'));
    const [layout, setLayout] = useLocalStorage('layout', LAYOUT.LIST);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isGiftAreaVisible, setIsGiftAreaVisible] = useState(false);

    const itemList = useMemo(() => {
        return Object.values(productData).sort((a, b) => a.order - b.order);
    }, [productData]);

    const filters = useMemo(() => {
        const lookup = {};
        const filters = [defaultFilter];

        itemList.forEach(item => {
            if (!lookup[item.series]) {
                lookup[item.series] = true;
                filters.push(item.series);
            }
        });

        return filters;
    }, [itemList]);

    const displayList = useMemo(() => {
        if (currentFilter !== defaultFilter) {
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
            <Box display="flex" alignItems="flex-end" flex="0 0 auto" bg="white" pt="3" pb="2" px="4" height="80px">
                <Box>
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
                                        if (filter === defaultFilter) {
                                            setCurrentFilter(defaultFilter);
                                            return;
                                        }
                                        setCurrentFilter(isSelected ? defaultFilter : filter)
                                    }}
                                    bg={isSelected ? "bg.highlight" : "bg.primary"}
                                    color={isSelected ? "content.primary" : "content.primary"}
                                >
                                    <Text textStyle="lg" letterSpacing="1px"
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
                    currentCurrency={currentCurrency}
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
                            <Checkbox.Label textStyle="xl">
                                <Text as="span" mr="4">{t('membershipFee')}</Text>
                                <b>{formatNumber(defaultMembershipFee, true, currentCurrency)}</b>
                            </Checkbox.Label>
                        </Checkbox.Root>
                        <Box display="flex" justifyContent="flex-end" gap="16px" mt="1">
                            <Text display="flex" alignItems="center" justifyContent="flex-end" flex="1 1 auto" textStyle="xl">
                                <Icon mr="1" color="icon.primary" size="s" as={PVIcon} />
                                <Text as="span" color="content.secondary" mr="3">{t('PV')}</Text>
                                <Text as="span" fontWeight={600}>{`  ${formatNumber(points, false)}`}</Text>
                            </Text>
                            <Text display="flex" alignItems="center" justifyContent="flex-end" flex="0 1 auto" textStyle="xl">
                                <Icon mr="1" color="icon.primary" size="s" as={ReceiptIcon} />
                                <Text as="span" mr="3">{t('total')}</Text>
                                <Text as="span" fontWeight={600}>{` ${formatNumber(total, true, currentCurrency)}`}</Text>
                            </Text>
                        </Box>
                    </Box>
                    <Box display="flex" gap="16px" mt="2">
                        <Button bg="white" size="md" flex="2" variant="outline" onClick={resetForm}>
                            <Text textStyle="lg" color="content.tertiary" letterSpacing="2px">{t('clear')}</Text>
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
                            <Text textStyle="lg" letterSpacing="2px">{t('saveData')}</Text>
                        </Button>
                    </Box>
                </Box>
                {hasPromotion ? (
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
                ) : null}
            </Box>
            <Modal
                id="save-order"
                isOpen={isModalOpen}
                setOpen={setModalOpen}
                title={t('saveData')}
                confirmText={t('save')}
                onConfirm={() => {
                    saveItem();
                    setModalOpen(false);
                }}
            >
                <Field.Root width="80%" orientation="horizontal">
                    <TextInput value={customerName} onChange={(e) => {
                        onCustomerNameChange(e.target.value)
                    }} placeholder={t('customerPlaceholder')} />
                    <Field.Label letterSpacing="2px" textStyle="2xl" flex="0 0 auto" mr="2">
                        {t('order')}
                        <Icon as={MagicWand} />
                    </Field.Label>
                </Field.Root>
                <Box borderRadius="8px" border="1px solid" borderStyle="dashed" borderColor="border.secondary" p="3" mt="4">
                    <Text textStyle="lg" letterSpacing="2px" display="flex" alignItems="center" gap="2">
                        <Icon color="icon.primary" as={ShoppingBagIcon} />
                        {t('orderContent')}
                    </Text>
                    <OrderDetail
                        productData={productData}
                        cartItems={cartItems}
                        gift={giftData?.gift}
                        membershipFee={membershipFee}
                        showTotal={true}
                        total={total}
                        currentCurrency={currentCurrency}
                    />
                </Box>
            </Modal>
        </Box>
    )
};

export default Calculator;

