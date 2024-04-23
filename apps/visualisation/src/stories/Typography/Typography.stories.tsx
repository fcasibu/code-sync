import type { Meta, StoryObj } from '@storybook/react';
import {
  Text as TextComponent,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyH5,
  TypographyH6,
} from '@code-sync/ui';

export default {
  title: 'ui/Typography',
} satisfies Meta;

type TextStory = StoryObj<typeof TextComponent>;

export const Text: TextStory = {
  render: () => (
    <>
      <TextComponent size="xl">This is extra large text.</TextComponent>
      <TextComponent size="lg">This is large text.</TextComponent>
      <TextComponent>This is regular text.</TextComponent>
      <TextComponent size="sm">This is small text.</TextComponent>
      <TextComponent size="xs">This is extra small text.</TextComponent>
    </>
  ),
};

type HeadingStory = StoryObj<typeof TypographyH1>;

export const Headings: HeadingStory = {
  render: () => (
    <>
      <TypographyH1>Heading 1</TypographyH1>
      <TypographyH2>Heading 2</TypographyH2>
      <TypographyH3>Heading 3</TypographyH3>
      <TypographyH4>Heading 4</TypographyH4>
      <TypographyH5>Heading 5</TypographyH5>
      <TypographyH6>Heading 6</TypographyH6>
    </>
  ),
};
