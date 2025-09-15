import { useTranslation } from 'react-i18next';
import { Box, Text } from '@chakra-ui/react';
import LanguageIcon from '@/assets/translate.svg?react';
import LanguageSelector from '@/components/language-selector/LanguageSelector.jsx';
import CurrencySelector from '@/components/currency-selector/CurrencySelector.jsx';
import MoneyIcon from '@/assets/money.svg?react';
const Settings = ({ currentCurrency, onCurrencyChange }) => {
    const { t, i18n } = useTranslation('settings');

    const isZh = i18n.language.startsWith('zh');

    return (
        <Box display="flex" flexDirection="column" height="100%" px="4" py="3">
            <Box p="3" bg="white" borderRadius="6px" flex="1 1 auto">
                <Box>
                    <Text textStyle="2xl" mb="2" display="flex" alignItems="center" gap="2" color="content.highlight">
                        <LanguageIcon />
                        <Text
                            fontWeight={isZh ? 500 : 600}
                            letterSpacing="1px"
                            as="span"
                            color="content.primary"
                        >{t('language')}</Text>
                    </Text>
                    <Box px="1">
                        <LanguageSelector />
                    </Box>
                </Box>
                
                <Box mt="4">
                    <Text textStyle="2xl" mb="2" display="flex" alignItems="center" gap="2" color="content.highlight">
                        <MoneyIcon />
                        <Text
                            fontWeight={isZh ? 500 : 600}
                            letterSpacing="1px"
                            as="span"
                            color="content.primary"
                        >{t('currency')}</Text>
                    </Text>
                    <Box px="1">
                        <CurrencySelector 
                            currentCurrency={currentCurrency}
                            onCurrencyChange={onCurrencyChange}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
};

export default Settings;