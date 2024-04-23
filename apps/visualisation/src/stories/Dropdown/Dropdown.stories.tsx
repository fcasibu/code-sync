import type { Meta } from '@storybook/react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Text,
} from '@code-sync/ui';

export default {
  title: 'ui/Dropdown',
} satisfies Meta;

export const Dropdown = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="default">
          <Text>Click me!</Text>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent className="w-64" sideOffset={10}>
          <DropdownMenuLabel>
            <Text>Label</Text>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            {Array.from({ length: 5 }, (_, i) => `Item ${i + 1}`).map(
              (item) => (
                <DropdownMenuItem key={item}>
                  <Text>{item}</Text>
                </DropdownMenuItem>
              ),
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  ),
};
