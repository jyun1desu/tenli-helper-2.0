import React, { useEffect, useMemo, useState } from 'react'
import { Box } from '@chakra-ui/react';
import { collection, getDocs } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import Navigator from '@/components/navigator/Navigator.jsx';
import Header from '@/components/header/Header.jsx';
import Calculator from '@/pages/calculator/Calculator.jsx'
import Gift from '@/pages/gift/Gift.jsx'
import Orders from '@/pages/orders/Orders.jsx'
import getGiftsData from '@/utils/getGiftsData';
import { useLocalStorage } from "@uidotdev/usehooks";
import JoinForm from './pages/join/JoinForm';
import Settings from './pages/settings/Settings';
import { db } from './firebase';
import DotLoading from './components/dot-loading/DotLoading';

const Content = ({ currentPage, total, points, setCurrentCurrency, ...props }) => {
  switch (currentPage) {
    case 'gift':
      return <Gift {...props} currentPV={points} />;
    case 'orders':
      return <Orders {...props} />;
    case 'join':
      return <JoinForm {...props} />
    case 'setting':
      return <Settings
        onCurrencyChange={setCurrentCurrency}
        {...props}
      />;
    case 'home':
    default:
      return <Calculator total={total} points={points} {...props} />;
  }
}

function App() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const [currentPage, setCurrentPage] = useState('home');
  const [orderHistoryList, setOrderHistoryList] = useLocalStorage("orders", {});
  const [currentCurrency, setCurrentCurrency] = useLocalStorage("currency", "twd");
  const [rawProductData, setProductData] = useState({});
  const [rawMembershipFeeData, setRawMembershipFeeData] = useState({});
  const productData = useMemo(() => {
    const result = {};
    const isEn = currentLanguage.includes('en');

    Object.values(rawProductData).forEach(d => {
      const { name, enName, priceData, price, myPrice } = d;

      result[d.id] = {
        ...d,
        name: isEn ? enName : name,
        price: currentCurrency === 'myr' ? myPrice : price,
        priceData: priceData || {
          twd: price,
          myr: myPrice,
        },
      };
    })

    return result;
  }, [rawProductData, currentLanguage, currentCurrency]);

  const defaultMembershipFee = useMemo(() => {
    const { price, myPrice } = rawMembershipFeeData;
    const data = {
      twd: price || 1000,
      myr: myPrice
    }

    return data[currentCurrency];
  }, [rawMembershipFeeData, currentCurrency]);

  const [promotionData, setPromotionData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { values = {}, setFieldValue, handleReset, setValues } = useFormik({
    initialValues: {
      id: "",
      customerName: '',
      items: {},
      hasMembershipFee: false,
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
        hasMembershipFee,
        defaultMembershipFee,
        currentCurrency,
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

  const { items = {}, hasMembershipFee, customerName = '' } = values;
  const membershipFee = hasMembershipFee ? defaultMembershipFee : 0;

  const { total, points } = useMemo(() => {
    const { total, points } = Object.entries(items).reduce((acc, cur) => {
      const [itemId, itemQuantity] = cur
      const { price, pv } = productData[itemId];
      const total = acc.total + price * itemQuantity;
      const points = acc.points + pv * itemQuantity;
      return {
        total, points
      }
    }, { total: membershipFee , points: 0 })

    return { total, points }
  }, [items, membershipFee, productData]);

  const giftList = useMemo(() => {
    if (!promotionData?.gifts) {
      return [];
    }
    return Object.values(promotionData.gifts).sort((a, b) => a.value - b.value);
  }, [promotionData])

  const giftData = getGiftsData(giftList, points);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const fetchProductData = async () => {
          const querySnapshot = await getDocs(collection(db, 'Products'));
          const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

          const data = list.reduce((acc, cur) => {
            acc[cur.id] = cur;
            return acc;
          }, {});

          setProductData(data);
        };

        const fetchGiftData = async () => {
          const querySnapshot = await getDocs(collection(db, 'Gifts'));
          const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

          const data = list.reduce((acc, cur) => {
            const { id, ...rest } = cur;
            acc[id] = rest;
            return acc;
          }, {});

          setPromotionData(data);
        };

        const fetchMembershipFee = async () => {
          const querySnapshot = await getDocs(collection(db, 'MembershipFee'));
          const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          const feeData = list?.[0] || {};
          setRawMembershipFeeData(feeData);
        };

        await Promise.all([
          fetchProductData(),
          fetchGiftData(),
          fetchMembershipFee(),
        ]);
      } catch (error) {
        console.error("Fetching data failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
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
              currentCurrency={currentCurrency}
              setCurrentCurrency={setCurrentCurrency}
              clear={clear}
              hasMembershipFee={hasMembershipFee}
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
              defaultMembershipFee={defaultMembershipFee}
              onCustomerNameChange={(name) => {
                setFieldValue('customerName', name);
              }}
              onMembershipChange={(isChecked) => {
                setFieldValue('hasMembershipFee', isChecked)
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
              hasPromotion={promotionData.hasPromotion?.value}
            />
          </Box>
        </Box>
      </Box>
      {isLoading ? (
        <Box
          position="fixed"
          width="100dvw"
          height="100dvh"
          top="0"
          left="0"
          bg="bg.primary"
          opacity="0.85"
          zIndex="9999"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <DotLoading />
        </Box>
      ) : null}
    </>
  )
}

export default App
