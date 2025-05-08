
import Navigator from './Navigator';

export default {
  title: 'Components/Navigator',
  component: Navigator,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

export const Primary = {
  args: {
    primary: true,
    label: 'Button',
  },
};

export const Secondary = {
  args: {
    label: 'Button',
  },
};

export const Large = {
  args: {
    size: 'large',
    label: 'Button',
  },
};

export const Small = {
  args: {
    size: 'small',
    label: 'Button',
  },
};
