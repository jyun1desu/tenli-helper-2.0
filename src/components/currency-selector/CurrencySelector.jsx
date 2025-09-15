import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import CheckIcon from '@/assets/check.svg?react';

const CURRENCY_OPTIONS = [
  {
    label: 'NTD',
    value: 'twd',
    symbol: 'NT$'
  },
  {
    label: 'MYR',
    value: 'myr',
    symbol: 'RM'
  },
];

const CurrencySelector = ({ currentCurrency, onCurrencyChange }) => {
  return (
    <Box
      display="flex"
      flexDir="column"
      borderRadius="8px"
      overflow="hidden"
      border="1px solid"
      borderColor="bg.grey"
    >
      {CURRENCY_OPTIONS.map((option, index) => {
        const isCurrent = option.value === currentCurrency;
        return (
          <Button
            justifyContent="flex-start"
            bg={isCurrent ? 'bg.grey' : 'transparent'}
            border="none"
            borderTop={index > 0 ? '1px solid' : 'none'}
            borderColor="bg.grey"
            key={option.value}
            borderRadius="0"
            color="content.primary"
            fontWeight={isCurrent ? 600 : 500}
            textStyle="xl"
            size="2xl"
            onClick={() => onCurrencyChange(option.value)}
          >
            {isCurrent ? <CheckIcon /> : null} {option.label} ({option.symbol})
          </Button>
        )
      })}
    </Box>
  );
};

export default CurrencySelector;
