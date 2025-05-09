import React from 'react';
import { Box, Icon, Text } from '@chakra-ui/react';
import StarIcon from '@/assets/star.svg?react';

const ProgressBar = ({ percentage = 0, height = '12px' }) => {
    return (
        <Box display="flex" alignItems="center">
            <Box width="100%" height={height} bg="#f1f3f3" borderRadius="8px">
                <Box width={`${percentage}%`} height={height} bg="bg.tertiary" borderRadius="8px" />
            </Box>
            {percentage === 100 ? <Icon as={StarIcon} color="icon.star" ml="1" /> : ''}
        </Box>
    )
};

export default ProgressBar;
