import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        bg: {
            primary: "#f6fafa",
            secondary: "#7dcc94",
            tertiary: "#fdc088",
            highlight: "#faf3d8",
        },
        content: {
          primary: "#4f4f4f",
          secondary: "#444444",
          tertiary: "#b8b6b6",
          highlight: "#4eb56b",
        },
        icon: {
          primary: "#f6d0cc",
          star: "#fddf6c",
        },
        border: {
          primary: "#d2e2ce",
          sceondary: "#fdf0f0",
        }
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
