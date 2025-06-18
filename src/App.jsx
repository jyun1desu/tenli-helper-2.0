import React, { useMemo, useState } from 'react'
import { Box } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { useFormik } from 'formik';
import Navigator from '@/components/navigator/Navigator.jsx';
import Header from '@/components/header/Header.jsx';
import Calculator from '@/pages/calculator/Calculator.jsx'
import Gift from '@/pages/gift/Gift.jsx'
import Orders from '@/pages/orders/Orders.jsx'
import getGiftsData from '@/utils/getGiftsData';
import { MEMBERSHIP_FEE, PRODUCT_DATA, PROMOTION_DATA } from '@/utils/const';
import { useLocalStorage } from "@uidotdev/usehooks";
import JoinForm from './pages/join/JoinForm';

const Content = ({ currentPage, total, points, ...props }) => {
  switch (currentPage) {
    case 'gift':
      return <Gift currentPV={points} {...props} />;
    case 'orders':
      return <Orders {...props} />;
    case 'join':
      return <JoinForm {...props} />
    case 'home':
    default:
      return <Calculator total={total} points={points} {...props} />;
  }
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [orderHistoryList, setOrderHistoryList] = useLocalStorage("orders", {});
  const { values = {}, setFieldValue, handleReset, setValues } = useFormik({
    initialValues: {
      id: "",
      customerName: '',
      items: {},
      membershipFee: 0,
    },
  });

  const clear = () => {
    setOrderHistoryList({})
  }

  const deleteOrder = (orderId) => {
    const copy = { ...orderHistoryList };
    delete copy[orderId]
    setOrderHistoryList(copy);
  }

  const saveItem = () => {
    const id = values.id || uuidv4().substring(0, 5);
    const toSave = {
      ...orderHistoryList,
      [id]: {
        ...values,
        id,
        timestamp: Date.now()
      }
    }
    setOrderHistoryList(toSave);
    handleReset();
  }

  const importItem = (id) => {
    const itemData = orderHistoryList[id];
    setValues(itemData);
    setCurrentPage('home')
  };

  const { items = {}, membershipFee, customerName = '' } = values;

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
            clear={clear}
            membershipFee={membershipFee}
            cartItems={values.items}
            resetForm={handleReset}
            giftData={giftData}
            onDeleteOrder={deleteOrder}
            saveItem={saveItem}
            importItem={importItem}
            hasPromotion={PROMOTION_DATA.hasPromotion}
            orderHistoryList={orderHistoryList}
            customerName={customerName}
            onCustomerNameChange={(name) => {
              setFieldValue('customerName', name);
            }}
            onMembershipChange={(isChecked) => {
              setFieldValue('membershipFee', isChecked ? MEMBERSHIP_FEE : 0)
            }}
            onItemQuantityChange={(id, inputQuantity) => {
              const toSave = {
                ...values.items,
                [id]: inputQuantity
              };
              setFieldValue('items', toSave)
            }}
          />
        </Box>
        <Box flex="0 0 auto" zIndex={99}>
          <Navigator
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            hasPromotion={PROMOTION_DATA.hasPromotion}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default App
