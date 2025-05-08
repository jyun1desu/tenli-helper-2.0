/** @type { import('@storybook/react-vite').StorybookConfig } */
import { mergeConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

const config = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [svgr()],
      optimizeDeps: {
        include: [
          "@chakra-ui/react",
          "@emotion/react",
          "@emotion/styled",
          "framer-motion"
        ],
      },
    });
  },
};

export default config;
