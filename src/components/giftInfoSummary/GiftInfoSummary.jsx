import React from 'react';
import { Box, Icon, Text } from '@chakra-ui/react';
import StarIcon from '@/assets/star.svg?react';
import getGiftData from '@/utils/getGiftsData.js';
import ProgressBar from '../progress-bar/ProgressBar';

const HighlightText = ({ children }) => {
    return (
        <Text as="span" bg="bg.highlight" borderRadius="50px" px="1" display="inline">{children}</Text>
    )
}

const GiftInfoSummary = ({ giftList = [], currentPV = 0 }) => {
    const { gift, nextGift, pointsToNext, nextGiftProgress } = getGiftData(giftList, currentPV);
    const { label: giftLabel } = gift || {};
    const { label: nextGiftLabel } = nextGift || {};

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
                        ，再 <Text as="b" textStyle="lg">{pointsToNext}PV</Text> 可獲得 <HighlightText as="b">{nextGiftLabel}</HighlightText> ！
                    </>
                )}
            </Text>
            <ProgressBar percentage={nextGiftProgress} />
        </Box>
    )
};

export default GiftInfoSummary;

