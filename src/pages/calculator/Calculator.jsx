import React, { useMemo, useState } from 'react';
import { Box, Button, Checkbox, Icon, Text } from '@chakra-ui/react';
import ItemList, { LAYOUT } from '../../components/item-list/ItemList.jsx';
import PVIcon from '@/assets/diamond.svg?react';
import StarIcon from '@/assets/star.svg?react';
import ReceiptIcon from '@/assets/receipt-check.svg?react';
import MagicWandIcon from '@/assets/magic-wand.svg?react';
import GridIcon from '@/assets/grid.svg?react';
import ListIcon from '@/assets/list.svg?react';
import { TEST_GIFT_LIST, TEST_ITEM_LIST } from './test.js';



const formatNumber = (value, withCurrency = true) => {
    return `${withCurrency ? '$' : ''}${value.toLocaleString()}`;
}

const getGiftData = (giftList, points) => {
    const sortedGifts = giftList.sort((a, b) => a.threshold - b.threshold);

    let currentGift = undefined;
    let nextGift = undefined;

    for (let i = 0; i < sortedGifts.length; i++) {
        const gift = sortedGifts[i];

        if (points >= gift.threshold) {
            currentGift = gift;
        } else {
            nextGift = gift;
            break;
        }
    }

    const pointsToNext = nextGift ? nextGift.threshold - points : 0;

    return {
        gift: currentGift ? currentGift.label : undefined,
        nextGift: nextGift ? nextGift.label : undefined,
        nextGiftProgress: nextGift ? (points / nextGift.threshold) * 100 : 100,
        pointsToNext,
    };
}

const HighlightText = ({ children }) => {
    return (
        <Text bg="bg.highlight" borderRadius="50px" px="1" display="inline">{children}</Text>
    )
}

const Calculator = ({ total = 25800, points = 2000, itemList = TEST_ITEM_LIST, giftList = TEST_GIFT_LIST }) => {

    const { gift, nextGift, pointsToNext, nextGiftProgress } = getGiftData(giftList, points);
    const [currentFilter, setCurrentFilter] = useState('');
    const [layout, setLayout] = useState(LAYOUT.LIST);

    const filters = useMemo(() => {
        const lookup = {};
        const filters = [];

        itemList.forEach(item => {
            if (!lookup[item.series]) {
                lookup[item.series] = true;
                filters.push(item.series);
            }
        });

        return filters;
    }, [itemList]);


    const displayList = useMemo(() => {
        if (currentFilter) {
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
                                    variant="plain"
                                    borderRadius="80px"
                                    py="1px"
                                    px="5"
                                    height="auto"
                                    onClick={() => {
                                        setCurrentFilter(isSelected ? '' : filter)
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
            <Box flex="1 1 auto" px="4" pt="3" overflowY="scroll">
                <ItemList layout={layout} list={displayList} />
            </Box>
            <Box display="flex" flexDirection="column" flex="0 0 auto" mt="3" mb="2" mx="4" p="4" bg="white">
                <Box display="flex" flexDirection="column" color="content.primary">
                    <Box mb="2">
                        <Text letterSpacing="1px" textStyle="lg" mb="2">
                            {gift && (
                                <>
                                    已獲得{nextGift ? '' : '最高級贈品'}<HighlightText>{gift}</HighlightText>{nextGift ? '，' : ''}
                                </>
                            )}
                            {nextGift && (
                                <>
                                    再累積 <Text as="b">{pointsToNext}PV </Text>即可獲得<HighlightText as="b">{nextGift}</HighlightText>
                                </>
                            )}
                        </Text>
                        <Box display="flex" alignItems="center">
                            <Box width="100%" height="12px" bg="#f0f0f0" borderRadius="8px">
                                <Box width={`${nextGiftProgress}%`} height="12px" bg="#fdc088" borderRadius="8px" />
                            </Box>
                            {!nextGift ? <Icon as={StarIcon} color="icon.star" ml="1" /> : ''}
                        </Box>
                    </Box>
                    <Box display="flex" justifyContent="flex-end" gap="16px">
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

                    <Checkbox.Root variant="solid" size="md" alignSelf="flex-end">
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                        <Checkbox.Label textStyle="lg">入會費</Checkbox.Label>
                    </Checkbox.Root>
                </Box>
                <Box display="flex" gap="16px" mt="3">
                    <Button bg="white" size="md" flex="2" variant="outline">
                        <Text textStyle="lg" color="content.tertiary" letterSpacing="2px">清除</Text>
                    </Button>
                    <Button bg="bg.secondary" size="md" flex="5">
                        <Text textStyle="lg" letterSpacing="2px">儲存資料</Text>
                    </Button>
                </Box>
            </Box>
        </Box>
    )
};

export default Calculator;

