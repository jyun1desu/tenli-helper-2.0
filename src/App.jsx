import React, { useMemo, useState } from 'react'
import { Box } from '@chakra-ui/react';
import { useFormik } from 'formik';
import Navigator from '@/components/navigator/Navigator.jsx';
import Header from '@/components/header/Header.jsx';
import Calculator from '@/pages/calculator/Calculator.jsx'
import Gift from '@/pages/gift/Gift.jsx'
import Orders from '@/pages/orders/Orders.jsx'
import getGiftsData from '@/utils/getGiftsData';
import { MEMBERSHIP_FEE, PRODUCT_DATA, PROMOTION_DATA } from '@/utils/const';

const Content = ({ currentPage, total, points, ...props }) => {
  switch (currentPage) {
    case 'gift':
      return <Gift currentPV={points} {...props} />;
    case 'orders':
      return <Orders {...props} />;
    case 'home':
    default:
      return <Calculator total={total} points={points} {...props} />;
  }
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const { values = {}, setFieldValue, handleReset } = useFormik({
    initialValues: {
      items: {},
      membershipFee: 0,
    },
  });

  const { items = {}, membershipFee } = values;

  const { total, points } = useMemo(() => {
    const { total, points } = Object.entries(items).reduce((acc, cur) => {
      const [itemId, itemQuantity] = cur
      const { price, pv } = PRODUCT_DATA[itemId];
      const total = acc.total + price * itemQuantity;
      const points = acc.points + pv * itemQuantity;
      return {
        total, points
      }
    }, { total: membershipFee, points: 0 })

    return { total, points }
  }, [items, membershipFee]);

  const giftList = useMemo(() => {
    return Object.values(PROMOTION_DATA.gifts).sort((a, b) => a.value - b.value);
  }, [])

  const giftData = getGiftsData(giftList, points);

  return (
    <Box fontWeight="500" color="content.primary" width="100dvw" height="100dvh" bg="white">
      <Box bg="bg.primary" display="flex" flexDirection="column" width="100%" height="100%">
        <Box flex="0 0 auto">
          <Header currentPage={currentPage} />
        </Box>
        <Box flex="1 1 auto" overflow="hidden">
          <Content
            currentPage={currentPage}
            total={total}
            points={points}
            membershipFee={membershipFee}
            cartItems={values.items}
            resetForm={handleReset}
            giftData={giftData}
            onMembershipChange={(isChecked) => {
              setFieldValue('membershipFee', isChecked ? MEMBERSHIP_FEE : 0)
            }}
            onItemQuantityChange={(id, inputQuantity) => {
              setFieldValue('items', {
                ...values.items,
                [id]: inputQuantity
              })
            }}
          />
        </Box>
        <Box flex="0 0 auto" zIndex={99}>
          <Navigator currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </Box>
      </Box>
    </Box>
  )
}

export default App
