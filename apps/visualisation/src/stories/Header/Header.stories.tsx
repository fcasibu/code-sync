import type { Meta, StoryObj } from '@storybook/react';
import { Header as HeaderComponent } from '@code-sync/web/src/components';

const meta: Meta<typeof HeaderComponent> = {
  component: HeaderComponent,
  title: 'components/Header',
};

export default meta;

type Story = StoryObj<typeof HeaderComponent>;

export const Default: Story = {};

export const WithHighlightedTab: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
      },
    },
  },
};
