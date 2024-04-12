import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import styles from './Button.module.css';

export const button = cva(styles.base, {
  variants: {
    variant: {
      default: styles.default,
      outline: styles.outline,
      ghost: styles.ghost,
      link: styles.link,
    },
  },
});

interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof button> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, variant = 'default', ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={button({ className, variant })} {...props} ref={ref} />
    );
  },
);

Button.displayName = 'Button';
