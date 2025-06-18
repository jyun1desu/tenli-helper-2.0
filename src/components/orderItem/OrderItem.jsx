import React, { Fragment } from 'react';
import { Box, Icon, Text, Grid, GridItem } from '@chakra-ui/react';
import GiftIcon from '@/assets/gift.svg?react';
import HeartIcon from '@/assets/heart-rounded.svg?react';
import formatNumber from '@/utils/formatNumber.js';
import { PRODUCT_DATA } from '../../utils/const';
import { useTranslation } from 'react-i18next';

const OrderDetail = ({
    cartItems = [],
    gift,
    membershipFee = 0,
    total = 0,
    showTotal = false,
}) => {
    const { t } = useTranslation('orderItem');

    const items = Object.entries(cartItems)
        .filter(([, quantity]) => quantity !== 0)
        .map(([itemId, quantity]) => {
            return { ...PRODUCT_DATA[itemId], quantity }
        });

    return (
        <>
            <Box borderTop="1px solid" borderStyle="dashed" borderColor="border.secondary" mt="2" pt="3">
                {
                    !items?.length
                        ? <Text textStyle="lg" letterSpacing="2px" color="content.primary" textAlign="center">
                            {t('noProduct')}
                        </Text>
                        : null
                }
                <Grid templateColumns="2fr 1fr" gap="3" px="3">
                    {
                        items.map((item) => {
                            const { seriesNumber, name, quantity } = item;
                            return (
                                <Fragment key={item.id}>
                                    <GridItem>
                                        <Text textStyle="lg" letterSpacing="2px" color="content.sceondary" textAlign="left">
                                            {`${seriesNumber} ${name}`}
                                        </Text>
                                    </GridItem>
                                    <GridItem>
                                        <Text textStyle="lg" letterSpacing="2px" color="content.tertiary" textAlign="right">x <b>{quantity}</b></Text>
                                    </GridItem>
                                </Fragment>
                            );
                        })
                    }
                </Grid>
            </Box>

            <Box borderTop="1px solid" borderStyle="dashed" borderColor="border.secondary" mt="2" pt="3">
                <Grid templateColumns="auto 1fr" gap="3" px="3">
                    <GridItem display="flex" alignItems="center" gap="3">
                        <Icon color="icon.primary" size="lg" as={GiftIcon} />
                        <Text textStyle="lg" letterSpacing="2px" color="content.primary">
                            {gift ? gift.name : t('noGift')}
                        </Text>
                    </GridItem>
                </Grid>
            </Box>

            {membershipFee ? (
                <Box borderTop="1px solid" borderStyle="dashed" borderColor="border.secondary" mt="2" pt="3">
                    <Grid templateColumns="2fr 1fr" gap="3" px="3">
                        <GridItem display="flex" alignItems="center" gap="3">
                            <Icon color="icon.primary" size="lg" as={HeartIcon} />
                            <Text textStyle="lg" letterSpacing="2px" color="content.primary">
                                {t('membershipFee')}
                            </Text>
                        </GridItem>
                        <GridItem>
                            <Text
                                textStyle="lg"
                                fontWeight={600}
                                letterSpacing="2px"
                                color="content.tertiary"
                                textAlign="right"
                            >{formatNumber(membershipFee, true)}</Text>
                        </GridItem>
                    </Grid>
                </Box>
            ) : null}

            {showTotal ? (
                <Box borderTop="1px solid" borderStyle="dashed" borderColor="border.secondary" mt="2" pt="3">
                    <Grid templateColumns="2fr 1fr" gap="3" p="3" borderRadius="8px" bg="border.secondary">
                        <GridItem display="flex" alignItems="center" gap="3">
                            <Text textStyle="xl" letterSpacing="2px" color="content.primary">
                                {t('total')}
                            </Text>
                        </GridItem>
                        <GridItem>
                            <Text textStyle="xl" fontWeight={600} letterSpacing="2px" color="content.primary" textAlign="right">
                                {formatNumber(total, true)}
                            </Text>
                        </GridItem>
                    </Grid>
                </Box>
            ) : null}
        </>
    )
};

export default OrderDetail;
