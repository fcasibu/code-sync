import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@code-sync/ui';

export default {
  title: 'ui/Button',
  component: Button,
} satisfies Meta<typeof Button>;

type ButtonStory = StoryObj<typeof Button>;

export const Default: ButtonStory = {
  args: {
    children: 'Default button',
  },
};

export const Outline: ButtonStory = {
  args: {
    children: 'Outline button',
    variant: 'outline',
  },
};

export const Ghost: ButtonStory = {
  args: {
    children: 'Ghost button',
    variant: 'ghost',
  },
};

export const Link: ButtonStory = {
  args: {
    children: 'Link styled button',
    variant: 'link',
  },
};
