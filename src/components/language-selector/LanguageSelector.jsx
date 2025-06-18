import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import CheckIcon from '@/assets/check.svg?react';

const OPTIONS = [
  {
    label: '中文',
    value: 'zh',
  },
  {
    label: 'English',
    value: 'en',
  },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Box
      display="flex"
      flexDir="column"
      borderRadius="8px"
      overflow="hidden"
      border="1px solid"
      borderColor="bg.grey"
    >
      {OPTIONS.map((option, index) => {
        const isCurrent = option.value === i18n.language;
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
            onClick={() => changeLanguage(option.value)}
          >
            {option.value === i18n.language ? <CheckIcon /> : null} {option.label}
          </Button>
        )
      })}
    </Box>
  );
};

export default LanguageSelector;
