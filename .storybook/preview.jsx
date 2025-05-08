import React from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../src/theme.js"; 

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <ChakraProvider value={theme}>
        <Story />
      </ChakraProvider>
    ),
  ],
};

export default preview;
