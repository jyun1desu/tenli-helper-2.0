import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import ProgressBar from '../progress-bar/ProgressBar';

const HighlightText = ({ children }) => {
    return (
        <Text as="span" bg="bg.highlight" borderRadius="50px" px="1" display="inline">{children}</Text>
    )
}

const GiftInfoSummary = ({ giftData = {} }) => {
    const { gift, nextGift, pointsToNext, nextGiftProgress } = giftData;
    const { name: giftLabel } = gift || {};
    const { name: nextGiftLabel } = nextGift || {};

    return (
        <Box>
            <Text letterSpacing="1px" textStyle="md" mb="2" whiteSpace="pre-line" lineHeight={1.2}>
                {giftLabel && (
                    <>
                        已獲得 <HighlightText>{giftLabel}</HighlightText>{nextGiftLabel ? '' : ' ！'}
                    </>
                )}
                {nextGiftLabel && (
                    <>
                        {giftLabel ? ', ' : ''}再 <Text as="b" textStyle="lg">{pointsToNext}PV</Text> 可獲得 <HighlightText as="b">{nextGiftLabel}</HighlightText> ！
                    </>
                )}
            </Text>
            <ProgressBar percentage={nextGiftProgress} />
        </Box>
    )
};

export default GiftInfoSummary;

