'use client';

import { useState } from 'react';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import type { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import CodeMirror from '@uiw/react-codemirror';

interface CodeEditorProps extends ReactCodeMirrorProps {
  initialCode: string;
}

export const CodeEditor = ({
  initialCode,
  className,
  ...props
}: Readonly<CodeEditorProps>) => {
  const [code, setCode] = useState(initialCode);

  const handleChange = (value: string) => {
    setCode(value);
  };

  return (
    <CodeMirror
      className={className}
      height="400px"
      value={code}
      theme={vscodeDark}
      extensions={[javascript({ jsx: true })]}
      onChange={handleChange}
      {...props}
    />
  );
};
