import { Input } from '@chakra-ui/react';
import React from 'react';

const CustomerNameInput = ({
    value,
    onChange,
    placeholder = '',
}) => {
    return (
        <Input
            size="lg"
            px="1"
            placeholder={placeholder}
            variant="flushed"
            focusRingWidth="1px"
            letterSpacing="3px"
            textStyle="2xl"
            fontWeight={500}
            borderColor="border.primary"
            color="content.highlight"
            _placeholder={{ color: "#4eb56b5c" }}
            css={{ "--focus-color": "#d2e2ce" }}
        />
    )
}

export default CustomerNameInput;
