import React, { useMemo } from 'react';
import { Box, Heading, Icon, Text } from '@chakra-ui/react';
import AnnouncementIcon from '@/assets/announcement-03.svg?react';
import CoinsIcon from '@/assets/coins-stacked.svg?react';
import MoneyIcon from '@/assets/money.svg?react';
import VerifiedIcon from '@/assets/verified.svg?react';
import getGiftData from '@/utils/getGiftsData';
import formatNumber from '@/utils/formatNumber.js';
import ProgressBar from '../../components/progress-bar/ProgressBar';
import { PROMOTION_DATA } from '../../utils/const';

const JoinForm = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            width="100%"
            height="100%"
        >
            Join
        </Box>
    );
};

const Gift = ({
    currentPV = 0,
}) => {
    const giftList = useMemo(() => {
        return Object.values(PROMOTION_DATA.gifts).sort((a, b) => a.value - b.value);
    }, [])

    const activities = [PROMOTION_DATA.event.message];

    const { gift: currentGift } = getGiftData(giftList, currentPV);

    const activeGifts = giftList.filter(gift => {
        const { pvCost } = gift;
        const pointsNeeded = Math.max(pvCost - currentPV, 0);
        const isCurrentGift = currentGift?.id === gift.id

        return pointsNeeded > 0 || isCurrentGift
    })

    const inactiveGifts = giftList.filter(gift => {
        const { pvCost } = gift;
        const pointsNeeded = Math.max(pvCost - currentPV, 0);
        const isCurrentGift = currentGift?.id === gift.id

        return pointsNeeded === 0 && !isCurrentGift
    })

    return (
        <Box display="flex" flexDirection="column" height="100%" overflow="hidden">
            <Box flex="1 1 auto" display="flex" flexDirection="column" p="4" overflow="scroll">
                <Box display="flex" flexDirection="column" gap="3">
                    {
                        activeGifts.map(gift => {
                            const { pvCost, id } = gift;
                            const pointsNeeded = Math.max(pvCost - currentPV, 0);
                            const progressPercentage = Math.min(1, (currentPV / pvCost));
                            const isCurrentGift = currentGift?.id === gift.id
                            return (
                                <GiftItem
                                    key={id}
                                    isCurrentGift={isCurrentGift}
                                    progressPercentage={progressPercentage}
                                    pointsNeeded={pointsNeeded}
                                    {...gift}
                                />
                            )
                        })
                    }
                </Box>
                {inactiveGifts?.length
                    ? (
                        <Box display="flex" flexDirection="column" gap="2" mt="4">
                            <Box display="flex" alignItems="center" gap="2">
                                <Box flex="1 1 auto" borderTop="2px solid" borderColor="content.tertiary" />
                                <Text flex="0 0 auto" color="content.tertiary" textAlign="right" textStyle="lg">因達到更高門檻而失效的贈品</Text>
                                <Box flex="1 1 auto" borderTop="2px solid" borderColor="content.tertiary" />
                            </Box>
                            {
                                inactiveGifts.map(gift => {
                                    const { pvCost, id } = gift;
                                    const pointsNeeded = Math.max(pvCost - currentPV, 0);
                                    const progressPercentage = Math.min(1, (currentPV / pvCost).toFixed(2));
                                    return (
                                        <GiftItem key={id} progressPercentage={progressPercentage} pointsNeeded={pointsNeeded} {...gift} />
                                    )
                                })
                            }
                        </Box>
                    )
                    : null}
            </Box>
            {
                activities.length ? (
                    <Box flex="0 0 auto" px="4" pt="2">
                        <Box p="2" bg="white" borderRadius="8px" border="1px solid" borderStyle="dashed" borderColor="border.primary">
                            <Text display="flex" gap="2">
                                <Icon color="icon.primary" width="28px" height="28px" as={AnnouncementIcon} />
                                <Text textStyle="xl" as="span" letterSpacing="2px">其他活動</Text>
                            </Text>
                            <Box ml="4" mt="2">
                                {
                                    activities.map(activity => {
                                        return (
                                            <Text key={activity} textStyle="lg" letterSpacing="1px">- {activity}</Text>
                                        )
                                    })
                                }
                            </Box>
                        </Box>
                    </Box>
                ) : ''
            }
            <Box flex="0 0 auto" px="4" py="2">
                <Box display="flex" bg="white" borderRadius="8px" overflow="hidden" alignItems="center">
                    <Text
                        flex="1"
                        textStyle="lg"
                        fontWeight={600}
                        textAlign="center"
                        bg="bg.secondary"
                        p="2"
                        color="white"
                        letterSpacing="2px"
                    >目前 PV
                    </Text>
                    <Text
                        flex="2"
                        fontWeight={600}
                        color="content.primary"
                        textAlign="right"
                        textStyle="xl"
                        letterSpacing="2px"
                        px="4"
                    >{formatNumber(currentPV, false)}</Text>
                </Box>
            </Box>
        </Box>
    )
};

export default JoinForm;