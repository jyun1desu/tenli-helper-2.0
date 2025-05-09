import React, { useEffect, useState } from 'react';
import { Box, Button, Icon, Text } from '@chakra-ui/react';

import HeartIcon from '@/assets/heart-rounded.svg?react';
import PlusIcon from '@/assets/plus-circle.svg?react';
import MinusIcon from '@/assets/minus-circle.svg?react';

export const LAYOUT = {
    LIST: 0,
    GRID: 1,
}

const Item = ({
    series = 'A',
    seriesNumber = '1',
    name = '深層潔膚油',
    inputQuantity = 0,
    id,
    onChange,
    layout,
}) => {
    const [quantity, setQuantity] = useState(inputQuantity);

    useEffect(() => {
        // onChange(id, inputQuantity)
    }, [onChange, id, inputQuantity]);

    if (layout === LAYOUT.GRID) {
        return (
            <Box overflow="hidden" display="flex" bg="white" border="1px solid" borderColor="border.secondary" borderRadius="6px">
                {/* <Icon as={HeartIcon} /> */}
                <Box display="flex" px="1px" alignItems="center" top="0" left="0" height="100%" bg="border.secondary" flex="0 0 auto">
                    <Text textStyle="xl" px="1" whiteSpace="pre-line" lineHeight={1.2}>
                        {`${series}\n${seriesNumber}`}
                    </Text>
                </Box>
                <Box display="flex" flexDirection="column" alignItems="center" pt="2" pb="0" flex="1 1 auto">
                    <Box display="flex" alignItems="center">
                        <Text textStyle="2xl" letterSpacing="2px">{name}</Text>
                    </Box>
                    <Box display="flex" alignItems="center" gap="4px">
                        <Button color="icon.primary" minWidth="unset" p="0" variant="plain" onClick={() => {
                            setQuantity(pre => {
                                return pre === 0 ? pre : pre - 1;
                            })
                        }}><MinusIcon /></Button>
                        <Text width="40px" textAlign="center" whiteSpace="nowrap" color="content.highlight" textStyle="3xl">{quantity}</Text>
                        <Button color="icon.primary" minWidth="unset" p="0" variant="plain" onClick={() => {
                            setQuantity(pre => pre + 1);
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
                    {`${series}\n${seriesNumber}`}
                </Text>
            </Box>
            <Box flex="1 1 auto" display="flex" alignItems="center" py="3" px="3">
                <Text textStyle="2xl" letterSpacing="2px">{name}</Text>
                <Box display="flex" alignItems="center" ml="auto" gap="4px">
                    <Button color="icon.primary" minWidth="unset" p="0" variant="plain" onClick={() => {
                        setQuantity(pre => {
                            return pre === 0 ? pre : pre - 1;
                        })
                    }}><MinusIcon /></Button>
                    <Text width="40px" textAlign="center" whiteSpace="nowrap" color="content.highlight" textStyle="3xl">{quantity}</Text>
                    <Button color="icon.primary" minWidth="unset" p="0" variant="plain" onClick={() => {
                        setQuantity(pre => pre + 1);
                    }}><PlusIcon /></Button>
                </Box>
            </Box>
        </Box>
    )
};

const ItemList = ({ layout, onItemQuantityChange, list }) => {
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
                    } = item
                    return (
                        <Item
                            key={id}
                            layout={layout}
                            onChange={onItemQuantityChange}
                            name={name}
                            seriesNumber={seriesNumber}
                            series={series}
                            id={id}
                        />
                    )
                })
            }
        </Box>
    )
};

export default ItemList;

