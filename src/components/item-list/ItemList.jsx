import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';

const Item = ({
    onChange
}) => {
    const [count, setCount] = useState(0);

    return <Box>Item</Box>
};


const ItemList = () => {
    return (
        <Box>
            <Item />
        </Box>
    )
};

export default ItemList;

