import React, { useEffect, useMemo, useState } from 'react'
import { Box } from '@chakra-ui/react';
import { collection, getDocs } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useFormik } from 'formik';
import Navigator from '@/components/navigator/Navigator.jsx';
import Header from '@/components/header/Header.jsx';
import Calculator from '@/pages/calculator/Calculator.jsx'
import Gift from '@/pages/gift/Gift.jsx'
import Orders from '@/pages/orders/Orders.jsx'
import getGiftsData from '@/utils/getGiftsData';
import { MEMBERSHIP_FEE } from '@/utils/const';
import { useLocalStorage } from "@uidotdev/usehooks";
import JoinForm from './pages/join/JoinForm';
import Settings from './pages/settings/Settings';
import { db } from './firebase';

const Content = ({ currentPage, total, points, ...props }) => {
  switch (currentPage) {
    case 'gift':
      return <Gift currentPV={points} {...props} />;
    case 'orders':
      return <Orders {...props} />;
    case 'join':
      return <JoinForm {...props} />
    case 'setting':
      return <Settings />;
    case 'home':
    default:
      return <Calculator total={total} points={points} {...props} />;
  }
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [orderHistoryList, setOrderHistoryList] = useLocalStorage("orders", {});
  const [productData, setProductData] = useState({});
  const [promotionData, setPromotionData] = useState({});
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
      const { price, pv } = productData[itemId];
      const total = acc.total + price * itemQuantity;
      const points = acc.points + pv * itemQuantity;
      return {
        total, points
      }
    }, { total: membershipFee, points: 0 })

    return { total, points }
  }, [items, membershipFee, productData]);

  const giftList = useMemo(() => {
    if(!promotionData?.gifts) {
      return [];
    }
    return Object.values(promotionData.gifts).sort((a, b) => a.value - b.value);
  }, [promotionData])

  const giftData = getGiftsData(giftList, points);

  useEffect(() => {
    const fetchProductData = async () => {
      const querySnapshot = await getDocs(collection(db, 'Products'));
      const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const data = list.reduce((acc, cur) => {
        acc[cur.id] = cur;
        return acc
      }, {});

      setProductData(data);
    };

    const fetchGiftData = async () => {
      const querySnapshot = await getDocs(collection(db, 'Gifts'));
      const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const data = list.reduce((acc, cur) => {
        acc[cur.id] = cur;
        delete cur.id;
        return acc
      }, {});

      setPromotionData(data)
    };

    fetchProductData();
    fetchGiftData();
  }, []);

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
            productData={productData}
            promotionData={promotionData}
            giftData={giftData}
            onDeleteOrder={deleteOrder}
            saveItem={saveItem}
            importItem={importItem}
            hasPromotion={promotionData.hasPromotion?.value}
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
            hasPromotion={promotionData.hasPromotion?.value }
          />
        </Box>
      </Box>
    </Box>
  )
}

export default App
