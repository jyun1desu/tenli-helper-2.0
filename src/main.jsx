import { createRoot } from 'react-dom/client';
import { ChakraProvider } from "@chakra-ui/react";
import './index.css';
import App from './App.jsx';
import theme from './theme.js';
import './i18n';

createRoot(document.getElementById('root')).render(
  <ChakraProvider value={theme}>
    <App />
  </ChakraProvider>,
)
