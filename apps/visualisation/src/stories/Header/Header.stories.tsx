import type { Meta, StoryObj } from '@storybook/react';
import { Header as HeaderComponent } from '@code-sync/web/src/components';

export default {
  component: HeaderComponent,
  title: 'components/Header',
} satisfies Meta;

type Story = StoryObj<typeof HeaderComponent>;

export const Default: Story = {};

export const WithHighlightedTab: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/explore',
      },
    },
  },
};
