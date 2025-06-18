import React, { useMemo } from 'react';
import { Box, Heading, Icon, Text } from '@chakra-ui/react';
import { useTranslation, Trans } from 'react-i18next';
import AnnouncementIcon from '@/assets/announcement-03.svg?react';
import PVIcon from '@/assets/diamond.svg?react';
import MoneyIcon from '@/assets/money.svg?react';
import VerifiedIcon from '@/assets/verified.svg?react';
import getGiftData from '@/utils/getGiftsData';
import formatNumber from '@/utils/formatNumber.js';
import ProgressBar from '../../components/progress-bar/ProgressBar';

const GiftItem = ({
    id,
    name,
    pvCost,
    value,
    progressPercentage,
    pointsNeeded,
    isCurrentGift,
}) => {
    const { t } = useTranslation('gift');

    return (
        <Box
            flex="0 0 auto"
            key={id}
            display="flex"
            flexDirection="column"
            bg="white"
            py="3"
            px="3"
            border="1px solid"
            borderColor="border.secondary"
            borderRadius="6px"
            position="relative"
            overflow="hidden"
        >
            <Text textStyle="xl" fontWeight={500} letterSpacing="1.5px">
                {name}
            </Text>
            <Box display="flex" mt="2">
                <Text color="content.secondary" display="flex" alignItems="center" gap="1">
                    <Icon color="icon.secondary" as={PVIcon} />
                    <Text as="span"><b>{formatNumber(pvCost, false)} PV</b></Text>
                </Text>
                <Text color="content.secondary" display="flex" alignItems="center" gap="1" ml="4">
                    <Icon color="icon.secondary" as={MoneyIcon} />
                    <Text as="span">{t('value')} <b>{formatNumber(value, true)}</b></Text>
                </Text>
            </Box>
            {isCurrentGift ?
                <Text
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap="1"
                    position="absolute"
                    right="0"
                    top="0"
                    bg="bg.pink"
                    px="2"
                    py="1"
                    color="white"
                    height="100%"
                >
                    <Icon width="28px" height="28px" as={VerifiedIcon} />
                </Text>
                : ''
            }
            {
                pointsNeeded ? (
                    <Box display="flex" flexDirection="column" mt="3">
                        <Text color="content.primary" textAlign="right" mb="1" textStyle="lg">
                            <Trans
                                i18nKey="pointsToUnlockGift"
                                ns="gift"
                                values={{ points: formatNumber(pointsNeeded, false) }}
                                components={{
                                    b: <b />,
                                }}
                            />
                        </Text>
                        <ProgressBar percentage={progressPercentage * 100} height="10px" />
                    </Box>
                ) : null
            }
        </Box>
    );
};

const Gift = ({
    currentPV = 0,
    promotionData = {},
}) => {

    const { t } = useTranslation('gift');
    const giftList = useMemo(() => {
        if (!promotionData.gifts) {
            return [];
        };
        return Object.values(promotionData.gifts).sort((a, b) => a.value - b.value);
    }, [promotionData])

    const activities = [promotionData.event.message];

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
                                <Text flex="0 0 auto" color="content.tertiary" textAlign="right" textStyle="lg">{t('expiredGifts')}</Text>
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
                                <Text textStyle="xl" as="span" letterSpacing="2px">{t('otherActivities')}</Text>
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
                        // bg="bg.secondary"
                        p="2"
                        color="content.primary"
                        letterSpacing="2px"
                    >{t('currentPV')}
                    </Text>
                    <Text
                        flex="2"
                        fontWeight={600}
                        color="content.highlight"
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

export default Gift;