import type { Meta } from '@storybook/react';
import {
  Button,
  Dialog as DialogComponent,
  DialogContent,
  DialogTrigger,
  Text,
} from '@code-sync/ui';
import { CodeEditor } from '@code-sync/web/src/components';

const meta: Meta = {
  title: 'ui/Dialog',
};

export default meta;

export const Dialog = {
  render: () => (
    <DialogComponent>
      <DialogTrigger asChild>
        <Button type="button">
          <Text>Click me!</Text>
        </Button>
      </DialogTrigger>
      <div className="sm:max-w-64">
        <DialogContent>
          <Text>Code</Text>
          <CodeEditor code={code} />
        </DialogContent>
      </div>
    </DialogComponent>
  ),
};

const code = `
import {
  Button,
  Dialog as DialogComponent,
  DialogContent,
  DialogTrigger,
  Text,
} from '@code-sync/ui';
import { CodeEditor } from '@code-sync/web/src/components';

export const Dialog = {
  render: () => (
    <DialogComponent>
      <DialogTrigger asChild>
        <Button>Click me!</Button>
      </DialogTrigger>
      <DialogContent>
        <Text>Title</Text>
        <CodeEditor code="console.log('hello, world!')" />
      </DialogContent>
    </DialogComponent>
  ),
};
`;
