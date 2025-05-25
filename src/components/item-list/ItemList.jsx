import React, { useMemo } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import PlusIcon from '@/assets/plus-circle.svg?react';
import MinusIcon from '@/assets/minus-circle.svg?react';
import formatNumber from '@/utils/formatNumber.js';

export const LAYOUT = {
    LIST: 0,
    GRID: 1,
}

const Item = ({
    seriesNumber,
    name = '深層潔膚油',
    id,
    quantity = 0,
    onItemQuantityChange,
    layout,
    price,
    pv
}) => {
    const seriesLabel = useMemo(() => {
        return seriesNumber.split('').join(`\n`);
    }, [seriesNumber]);

    if (layout === LAYOUT.GRID) {
        return (
            <Box overflow="hidden" display="flex" bg="white" border="1px solid" borderColor="border.secondary" borderRadius="6px">
                <Box display="flex" px="1px" alignItems="center" top="0" left="0" height="100%" bg="border.secondary" flex="0 0 auto">
                    <Text textStyle="xl" px="1" whiteSpace="pre-line" lineHeight={1.2}>
                        {seriesLabel}
                    </Text>
                </Box>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" pt="2" pb="0" flex="1 1 auto">
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Text textStyle="xl" textAlign="center" letterSpacing="2px" px="2px">{name}</Text>
                        <Text
                            as="span"
                            textStyle="xl"
                            letterSpacing="2px"
                            px="2px"
                            fontWeight={600}
                            color="content.secondary"
                        >{formatNumber(price)}</Text>
                        <Text
                            as="span"
                            textStyle="md"
                            letterSpacing="2px"
                            px="2px"
                            fontWeight={600}
                            color="content.tertiary"
                        >
                            {formatNumber(pv, false)}PV
                        </Text>
                    </Box>
                    <Box display="flex" alignItems="center" gap="4px">
                        <Button color="icon.primary" minWidth="unset" p="0" variant="plain" onClick={() => {
                            onItemQuantityChange(id, quantity === 0 ? quantity : quantity - 1)
                        }}><MinusIcon /></Button>
                        <Text width="40px" textAlign="center" whiteSpace="nowrap" color="content.highlight" textStyle="3xl">{quantity}</Text>
                        <Button color="icon.primary" minWidth="unset" p="0" variant="plain" onClick={() => {
                            onItemQuantityChange(id, quantity + 1)
                        }}><PlusIcon /></Button>
                    </Box>
                </Box>
            </Box>
        )
    }

    return (
        <Box display="flex" bg="white" border="1px solid" borderColor="border.secondary" borderRadius="6px" overflow="hidden">
            <Box display="flex" px="1px" alignItems="center" bg="border.secondary" flex="0 0 auto">
                <Text textStyle="xl" px="2" whiteSpace="pre-line" lineHeight={1.2}>
                    {seriesLabel}
                </Text>
            </Box>
            <Box flex="1 1 auto" py="3" px="3">
                <Flex>
                    <Text textStyle="2xl" letterSpacing="2px">{name}</Text>
                    <Box display="flex" alignItems="center" ml="auto" gap="4px">
                        <Button color="icon.primary" minWidth="unset" p="0" variant="plain" onClick={() => {
                            onItemQuantityChange(id, quantity === 0 ? quantity : quantity - 1)
                        }}><MinusIcon /></Button>
                        <Text width="40px" textAlign="center" whiteSpace="nowrap" color="content.highlight" textStyle="3xl">{quantity}</Text>
                        <Button color="icon.primary" minWidth="unset" p="0" variant="plain" onClick={() => {
                            onItemQuantityChange(id, quantity + 1)
                        }}><PlusIcon /></Button>
                    </Box>
                </Flex>
                <Text>
                    <Text
                        as="span"
                        textStyle="xl"
                        letterSpacing="2px"
                        px="2px"
                        fontWeight={600}
                        color="content.secondary"
                    >{formatNumber(price)}</Text>
                    <Text
                        as="span"
                        textStyle="md"
                        letterSpacing="2px"
                        px="2px"
                        fontWeight={600}
                        color="content.tertiary"
                    >
                        {`/${formatNumber(pv, false)}PV`}
                    </Text>
                </Text>
            </Box>
        </Box>
    )
};

const ItemList = ({ layout, onItemQuantityChange, list, cartItems = {} }) => {
    return (
        <Box
            display={layout === LAYOUT.LIST ? "flex" : "grid"}
            flexDirection="column"
            gridTemplateColumns="1fr 1fr"
            gap="8px"
            pb="9"
        >
            {
                list.map((item) => {
                    const { series,
                        seriesNumber,
                        name,
                        id,
                        price,
                        pv
                    } = item
                    const quantity = cartItems[id]

                    return (
                        <Item
                            key={id}
                            layout={layout}
                            onItemQuantityChange={onItemQuantityChange}
                            quantity={quantity}
                            name={name}
                            seriesNumber={seriesNumber}
                            series={series}
                            price={price}
                            pv={pv}
                            id={id}
                        />
                    )
                })
            }
        </Box>
    )
};

export default ItemList;

