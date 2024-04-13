'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { X as CloseIcon } from 'lucide-react';
import { Button } from '../button';
import styles from './Dialog.module.css';

export type DialogState = 'open' | 'closed';

export interface DialogTriggerHandle {
  subscribe: (callback: (state: DialogState) => void) => () => void;
}

export const Dialog = DialogPrimitive.Root;

export const DialogPortal = DialogPrimitive.Portal;

export const DialogTitle = DialogPrimitive.Title;

export const DialogDescription = DialogPrimitive.Description;

export const DialogOverlay = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={clsx(styles.dialogOverlay, className)}
    {...props}
  />
));

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

export const DialogTrigger = forwardRef<
  DialogTriggerHandle,
  Readonly<React.ComponentProps<typeof DialogPrimitive.Trigger>>
>(({ children, ...props }, ref) => {
  const elementRef =
    useRef<React.ElementRef<typeof DialogPrimitive.Trigger>>(null);

  const mutationRef = useRef<MutationObserver | null>(null);

  useImperativeHandle(ref, () => ({
    subscribe(callback: (state: DialogState) => void) {
      mutationRef.current?.disconnect();

      mutationRef.current ??= new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          const element = mutation.target as HTMLButtonElement;
          const newState =
            (element.getAttribute('data-state') as DialogState | null) ??
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
    <DialogPrimitive.Trigger ref={elementRef} {...props}>
      {children}
    </DialogPrimitive.Trigger>
  );
});

DialogTrigger.displayName = DialogPrimitive.Trigger.displayName;

export const DialogContent = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  Readonly<React.ComponentProps<typeof DialogPrimitive.Content>>
>(({ children, className, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      className={clsx(styles.dialogContent, className)}
      ref={ref}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));

DialogContent.displayName = DialogPrimitive.Content.displayName;

export const DialogClose = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Close>,
  Readonly<React.ComponentProps<typeof DialogPrimitive.Close>>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Close
    className={clsx(styles.dialogClose, className)}
    asChild
    ref={ref}
    {...props}
  >
    <Button type="button" variant="ghost">
      <CloseIcon aria-hidden />
    </Button>
  </DialogPrimitive.Close>
));

DialogClose.displayName = DialogPrimitive.Close.displayName;
