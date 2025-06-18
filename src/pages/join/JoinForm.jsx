import React, { useState } from 'react';
import { Box, Text, Button, Field } from '@chakra-ui/react';
import TextInput from '../../components/text-input/TextInput';

const JoinForm = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    return (
        <Box display="flex" flexDirection="column" height="100%">
            <Box
                flex="1 1 auto"
                bg="white"
                display="flex"
                flexDirection="column"
                gap="3"
                pt="4"
                px="4"
                m="4"
                mb="0"
                borderRadius="8px"
            >
                <Field.Root orientation="horizontal">
                    <Field.Label letterSpacing="2px" textStyle="2xl" flex="0 0 auto" mr="2">
                        顧客姓名
                    </Field.Label>
                    <TextInput
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                    />
                </Field.Root>
                <Field.Root orientation="horizontal">
                    <Field.Label letterSpacing="2px" textStyle="2xl" flex="0 0 auto" mr="2">
                        電話
                    </Field.Label>
                    <TextInput
                        value={phoneNumber}
                        onChange={(e) => { setPhoneNumber(e.target.value) }}
                    />
                </Field.Root>
                <Field.Root orientation="horizontal">
                    <Field.Label letterSpacing="2px" textStyle="2xl" flex="0 0 auto" mr="2">
                        住址
                    </Field.Label>
                <TextInput
                        value={address}
                        onChange={(e) => { setAddress(e.target.value) }}
                    />
                </Field.Root>
            </Box>
            <Box py="4" px="4" mt="auto" flex="0 0 auto">
                <Button
                    width="100%"
                    onClick={() => { }}
                    bg="bg.secondary"
                    size="md"
                    flex="5"
                >
                    <Text textStyle="xl" letterSpacing="2px">匯出 PDF 檔</Text>
                </Button>
            </Box>
        </Box>
    );
};

export default JoinForm;