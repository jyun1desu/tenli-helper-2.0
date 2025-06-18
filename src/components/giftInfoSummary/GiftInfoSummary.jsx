import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useTranslation, Trans } from 'react-i18next';
import ProgressBar from '../progress-bar/ProgressBar';
import formatNumber from '@/utils/formatNumber.js';

const HighlightText = ({ children }) => (
    <Text as="span" bg="bg.highlight" borderRadius="50px" px="1" display="inline">
        {children}
    </Text>
);

const GiftInfoSummary = ({ giftData = {} }) => {
    const { t } = useTranslation('giftInfoSummary');

    const { gift, nextGift, pointsToNext, nextGiftProgress } = giftData;
    const giftName = gift?.name;
    const nextGiftName = nextGift?.name;

    return (
        <Box>
            <Text letterSpacing="1px" textStyle="md" mb="2" whiteSpace="pre-line" lineHeight={1.2}>
                {giftName && (
                    <>
                        {t('got')} <HighlightText>{giftName}</HighlightText>
                        {!nextGiftName ? t('exclamation') : ''}
                    </>
                )}
                {nextGiftName && (
                    <>
                        {giftName ? ', ' : ''}
                        <Trans
                            i18nKey="nextGift"
                            ns="giftInfoSummary"
                            values={{ points: formatNumber(pointsToNext, false), gift: nextGiftName }}
                            components={{
                                b: <b />,
                                highlight: <HighlightText as="b" />,
                            }}
                        />
                    </>
                )}
            </Text>
            <ProgressBar percentage={nextGiftProgress} />
        </Box>
    );
};

export default GiftInfoSummary;
