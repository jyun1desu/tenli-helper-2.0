import React from 'react';
import { Box, Icon, Text, Grid, GridItem } from '@chakra-ui/react';
import GiftIcon from '@/assets/gift.svg?react';
import HeartIcon from '@/assets/heart-rounded.svg?react';
import formatNumber from '@/utils/formatNumber.js';

const OrderDetail = ({
    items = [],
    gift,
    membershipFee = 0,
    showTotal = false,
    amount = 0,
}) => {
    return (
        <>
            <Box borderTop="1px solid" borderStyle="dashed" borderColor="border.secondary" mt="2" pt="3">
                {
                    !items?.length
                        ? <Text textStyle="md" letterSpacing="2px" color="content.primary" textAlign="center">
                            尚無商品
                        </Text>
                        : null
                }
                <Grid templateColumns="2fr 3fr" gap="3" px="3">
                    {
                        items.map((item) => {
                            const { series, seriesNumber, name, amount } = item;
                            return (
                                <>
                                    <GridItem >
                                        <Text textStyle="md" letterSpacing="2px" color="content.sceondary" textAlign="left">
                                            {`${series}${seriesNumber} ${name}`}
                                        </Text>
                                    </GridItem>
                                    <GridItem>
                                        <Text textStyle="md" letterSpacing="2px" color="content.tertiary" textAlign="right">x <b>{amount}</b></Text>
                                    </GridItem>
                                </>
                            );
                        })
                    }
                </Grid>
            </Box>
            <Box borderTop="1px solid" borderStyle="dashed" borderColor="border.secondary" mt="2" pt="3">
                <Grid templateColumns="auto 1fr" gap="3" px="3">
                    <GridItem display="flex" alignItems="center" gap="3">
                        <Icon color="icon.primary" size="md" as={GiftIcon} />
                        <Text textStyle="md" letterSpacing="2px" color="content.primary">
                            {gift ? gift.label : '尚無贈品'}
                        </Text>
                    </GridItem>
                </Grid>
            </Box>
            {
                membershipFee ? (
                    <Box borderTop="1px solid" borderStyle="dashed" borderColor="border.secondary" mt="2" pt="3">
                        <Grid templateColumns="2fr 3fr" gap="3" px="3">
                            <GridItem display="flex" alignItems="center" gap="3">
                                <Icon color="icon.primary" size="md" as={HeartIcon} />
                                <Text textStyle="md" letterSpacing="2px" color="content.primary">
                                    入會費
                                </Text>
                            </GridItem>
                            {membershipFee ? (
                                <GridItem>
                                    <Text
                                        textStyle="md"
                                        fontWeight={600}
                                        letterSpacing="2px"
                                        color="content.tertiary"
                                        textAlign="right"
                                    >{formatNumber(membershipFee, true)}</Text>
                                </GridItem>
                            ) : null}
                        </Grid>
                    </Box>
                ) : null
            }
            {
                showTotal ? (
                    <Box borderTop="1px solid" borderStyle="dashed" borderColor="border.secondary" mt="2" pt="3">
                        <Grid templateColumns="2fr 3fr" gap="3" p="3" borderRadius="8px" bg="border.secondary">
                            <GridItem display="flex" alignItems="center" gap="3">
                                <Text textStyle="lg" letterSpacing="2px" color="content.primary">
                                    總金額
                                </Text>
                            </GridItem>
                            <GridItem>
                                <Text textStyle="lg" fontWeight={600} letterSpacing="2px" color="content.primary" textAlign="right">{formatNumber(amount, true)}</Text>
                            </GridItem>
                        </Grid>
                    </Box>
                ) : null
            }
        </>
    )
}

export default OrderDetail;
