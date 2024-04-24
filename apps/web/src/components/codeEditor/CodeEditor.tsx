import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import type { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import CodeMirror from '@uiw/react-codemirror';
import { isDefined } from '@/utils';

interface CodeEditorProps extends ReactCodeMirrorProps {
  code: string;
}

export const CodeEditor = ({
  code,
  className,
  ...props
}: Readonly<CodeEditorProps>) => {
  return (
    <CodeMirror
      className={className}
      height="400px"
      value={code}
      theme={vscodeDark}
      extensions={[javascript({ jsx: true })].filter(isDefined)}
      {...props}
    />
  );
};
