import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        bg: {
            primary: "#f6efef",
        },
        content: {
          primary: "#222222",
          secondary: "#555555",
          tertiary: "#d5d5d5",
          highlight: "#4eb56b",
        },
        icon: {
          primary: "#ffc0cb",
        },
      },
      space: { 
        xs: '4px',
        s: '8px',
        m: '12px',
        l: '16px',
        xl: '20px',
      },
    },
  },
});

const system = createSystem(defaultConfig, customConfig);

export default system;
