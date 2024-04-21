'use client';

import { forwardRef } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import clsx from 'clsx';
import styles from './Tabs.module.css';

export const Tabs = TabsPrimitive.Root;

export const TabsList = forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  Readonly<React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={clsx(styles.tabsList, className)}
    {...props}
  />
));

TabsList.displayName = TabsPrimitive.List.displayName;

export const TabsTrigger = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  Readonly<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={clsx(styles.tabsTrigger, className)}
    {...props}
  />
));

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export const TabsContent = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  Readonly<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={clsx(styles.tabsContent, className)}
    {...props}
  />
));

TabsContent.displayName = TabsPrimitive.Content.displayName;
