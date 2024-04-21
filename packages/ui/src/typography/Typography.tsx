import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import styles from './Typography.module.css';

export const TypographyH1 = forwardRef<
  HTMLHeadingElement,
  Readonly<React.ComponentProps<'h1'>>
>(({ className, ...props }, ref) => {
  return <h1 {...props} ref={ref} className={clsx(styles.h1, className)} />;
});

TypographyH1.displayName = 'TypographyH1';

export const TypographyH2 = forwardRef<
  HTMLHeadingElement,
  Readonly<React.ComponentProps<'h2'>>
>(({ className, ...props }, ref) => {
  return <h2 {...props} ref={ref} className={clsx(styles.h2, className)} />;
});

TypographyH2.displayName = 'TypographyH2';

export const TypographyH3 = forwardRef<
  HTMLHeadingElement,
  Readonly<React.ComponentProps<'h3'>>
>(({ className, ...props }, ref) => {
  return <h3 {...props} ref={ref} className={clsx(styles.h3, className)} />;
});

TypographyH3.displayName = 'TypographyH3';

export const TypographyH4 = forwardRef<
  HTMLHeadingElement,
  Readonly<React.ComponentProps<'h4'>>
>(({ className, ...props }, ref) => {
  return <h4 {...props} ref={ref} className={clsx(styles.h4, className)} />;
});

TypographyH4.displayName = 'TypographyH4';

export const TypographyH5 = forwardRef<
  HTMLHeadingElement,
  Readonly<React.ComponentProps<'h5'>>
>(({ className, ...props }, ref) => {
  return <h5 {...props} ref={ref} className={clsx(styles.h5, className)} />;
});

TypographyH5.displayName = 'TypographyH5';

export const TypographyH6 = forwardRef<
  HTMLHeadingElement,
  Readonly<React.ComponentProps<'h6'>>
>(({ className, ...props }, ref) => {
  return <h6 {...props} ref={ref} className={clsx(styles.h6, className)} />;
});

TypographyH6.displayName = 'TypographyH6';

const text = cva(styles.text, {
  variants: {
    size: {
      xs: styles.xs,
      sm: styles.sm,
      lg: styles.lg,
      xl: styles.xl,
    },
  },
});

interface TextProps
  extends React.ComponentProps<'p'>,
    VariantProps<typeof text> {
  as?: 'p' | 'span' | 'label';
  asChild?: boolean;
}

export const Text = forwardRef<React.ElementRef<'p'>, Readonly<TextProps>>(
  ({ className, as: Tag = 'p', children, size, ...props }, ref) => {
    return (
      <Slot {...props} ref={ref} className={text({ size, className })}>
        <Tag>{children}</Tag>
      </Slot>
    );
  },
);

Text.displayName = 'Text';
