import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';

import Home from '@/assets/calculator.svg?react';
import Gift from '@/assets/gift.svg?react';
import Orders from '@/assets/file.svg?react';
import AddMember from '@/assets/user-edit.svg?react';
import Setting from '@/assets/settings.svg?react';
import Modal from '@/components/modal/Modal.jsx';
import NavigationButton from './naviation-button/NavigationButton.jsx';

const navsConfig = [{
    icon: Home,
    label: "計算機",
    value: 'home',
    enabled: true,
}, {
    icon: Gift,
    label: "贈品活動",
    value: 'gift',
    enabled: true,
}, {
    icon: Orders,
    label: "待印表單",
    value: 'orders',
    enabled: true,
}, {
    icon: AddMember,
    label: "填寫入會單",
    value: 'join',
    enabled: false,
}, {
    icon: Setting,
    label: "設定",
    value: 'setting',
    enabled: true,
}];

const Navigator = ({
    currentPage = 'home',
    setCurrentPage,
    hasPromotion = false,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Box
                py="4"
                px="6"
                gap="4"
                background="white"
                display="flex"
                justifyContent="space-around"
                alignItems="center"
                borderTopLeftRadius="16px"
                borderTopRightRadius="16px"
                boxShadow="0 4px 8px rgba(100, 100, 100, 0.2)"
            >
                {navsConfig.filter(nav => nav.enabled).map((nav) => {
                    return (
                        <NavigationButton
                            key={nav.value}
                            icon={nav.icon}
                            label={nav.label}
                            isSelected={currentPage === nav.value}
                            onClick={() => {
                                if (nav.value === 'gift' && !hasPromotion) {
                                    setIsModalOpen(true)
                                    return;
                                }
                                setCurrentPage(nav.value)
                            }} />
                    )
                })}
            </Box>
            <Modal
                id="save-order"
                isOpen={isModalOpen}
                setOpen={setIsModalOpen}
                confirmText="確認"
                onConfirm={() => {
                    setIsModalOpen(false)
                }}
                showCancelButton={false}
            >
                <Text textAlign="center" p="3" mt="4">
                    尚無活動
                </Text>
            </Modal>
        </>
    )
};

export default Navigator;
