'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';
import styles from './Dropdown.module.css';

export type DropdownState = 'open' | 'closed';

export interface DropdownMenuTriggerHandle {
  subscribe: (callback: (state: DropdownState) => void) => () => void;
}

export const DropdownMenu = DropdownMenuPrimitive.Root;

export const DropdownMenuGroup = DropdownMenuPrimitive.Group;

export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

export const DropdownMenuSub = DropdownMenuPrimitive.Sub;

export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export const DropdownMenuTrigger = forwardRef<
  DropdownMenuTriggerHandle,
  Readonly<React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>>
>(({ children, ...props }, ref) => {
  const elementRef =
    useRef<React.ElementRef<typeof DropdownMenuPrimitive.Trigger>>(null);

  const mutationRef = useRef<MutationObserver | null>(null);

  useImperativeHandle(ref, () => ({
    subscribe(callback: (state: DropdownState) => void) {
      mutationRef.current?.disconnect();

      mutationRef.current ??= new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          const element = mutation.target as HTMLButtonElement;
          const newState =
            (element.getAttribute('data-state') as DropdownState | null) ??
            'closed';
          callback(newState);
        });
      });

      if (elementRef.current) {
        mutationRef.current.observe(elementRef.current, {
          attributes: true,
          attributeFilter: ['data-state'],
        });
      }

      return () => mutationRef.current?.disconnect();
    },
  }));

  return (
    <DropdownMenuPrimitive.Trigger ref={elementRef} {...props}>
      {children}
    </DropdownMenuPrimitive.Trigger>
  );
});

DropdownMenuTrigger.displayName = DropdownMenuPrimitive.Trigger.displayName;

export const DropdownMenuSubTrigger = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  Readonly<
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
      inset?: boolean;
    }
  >
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={clsx(className)}
    {...props}
  >
    {children}
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

export const DropdownMenuSubContent = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  Readonly<React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={clsx(styles.content, className)}
    {...props}
  />
));
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

export const DropdownMenuContent = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  Readonly<React.ComponentProps<typeof DropdownMenuPrimitive.Content>>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      align="start"
      sideOffset={sideOffset}
      className={clsx(styles.content, className)}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

export const DropdownMenuItem = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  Readonly<
    React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
      inset?: boolean;
    }
  >
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={clsx(className)}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

export const DropdownMenuLabel = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  Readonly<
    React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
      inset?: boolean;
    }
  >
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={clsx(className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

export const DropdownMenuSeparator = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  Readonly<React.ComponentProps<typeof DropdownMenuPrimitive.Separator>>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={clsx(styles.separator, className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
