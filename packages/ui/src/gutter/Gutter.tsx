import { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Gutter.module.css';

export const Gutter = forwardRef<
  HTMLDivElement,
  Readonly<React.ComponentProps<'div'>>
>(({ className, ...props }, ref) => (
  <div {...props} ref={ref} className={clsx(styles.gutter, className)} />
));

Gutter.displayName = 'Gutter';
