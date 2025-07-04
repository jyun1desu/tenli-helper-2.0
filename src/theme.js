import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        bg: {
            primary: "#f6fafa",
            secondary: "#7dcc94",
            tertiary: "#fdc088",
            grey: "#f8f8f8",
            highlight: "#faf3d8",
            pink: "#fcc6c6",
            green2: "#cfd696",
        },
        content: {
          primary: "#4f4f4f",
          secondary: "#696969",
          tertiary: "#b8b6b6",
          highlight: "#4eb56b",
          warning: "#e63522",
        },
        icon: {
          primary: "#f6d0cc",
          secondary: "#dadada",
          star: "#fddf6c",
          warning: "#e63522",
        },
        border: {
          primary: "#d2e2ce",
          secondary: "#fdf0f0",
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
