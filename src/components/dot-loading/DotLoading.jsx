import { Box, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const DotLoading = () => {
    const [dotCount, setDotCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setDotCount((prev) => (prev % 3) + 1);
        }, 200);

        return () => clearInterval(interval);
    }, []);

    return (
        <Box>
            <Text color="content.secondary" fontWeight={600} textStyle="3xl">
                {'Loading' + '.'.repeat(dotCount)}
            </Text>
        </Box>
    );
};

export default DotLoading;