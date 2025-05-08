import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        bg: {
            primary: "#f4f4f4",
        },
        content: {
          primary: "#222222",
          secondary: "#4eb56b",
        },
        icon: {
          primary: "#ffc0cb",
        },
      },
    },
  },
});

const system = createSystem(defaultConfig, customConfig);

export default system;
