import { Input } from '@chakra-ui/react';

const TextInput = ({
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
            onChange={onChange}
            value={value}
            _placeholder={{ color: "#4eb56b5c" }}
            css={{ "--focus-color": "#d2e2ce" }}
        />
    )
}

export default TextInput;
