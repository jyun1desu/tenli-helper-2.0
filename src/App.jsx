import React, { useState } from 'react'
import Navigator from '@/components/navigator/Navigator.jsx';
import Header from '@/components/header/Header.jsx';
import Calculator from '@/pages/calculator/Calculator.jsx'
import Gift from '@/pages/gift/Gift.jsx'
import Orders from '@/pages/orders/Orders.jsx'
import { Box } from '@chakra-ui/react';

const Content = ({ currentPage }) => {
  switch (currentPage) {
    case 'gift':
      return <Gift />;
    case 'orders':
      return <Orders />;
    case 'home':
    default:
      return <Calculator />;
  }
}

function App() {
  const [currentPage, setCurrentPage] = useState('orders');

  return (
    <Box fontWeight="500" color="content.primary" width="100dvw" height="100dvh" bg="white">
      <Box bg="bg.primary" display="flex" flexDirection="column" width="100%" height="100%">
        <Box flex="0 0 auto">
          <Header currentPage={currentPage} />
        </Box>
        <Box flex="1 1 auto" overflow="hidden">
          <Content currentPage={currentPage} />
        </Box>
        <Box flex="0 0 auto" zIndex={99}>
          <Navigator currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </Box>
      </Box>
    </Box>
  )
}

export default App
