'use client';

import { useState } from 'react';
import { javascript } from '@codemirror/lang-javascript';
import { githubDark } from '@uiw/codemirror-theme-github';
import CodeMirror from '@uiw/react-codemirror';

interface CodeEditorProps {
  initialCode: string;
}

export const CodeEditor = ({ initialCode }: Readonly<CodeEditorProps>) => {
  const [code, setCode] = useState(initialCode);

  const handleChange = (value: string) => {
    setCode(value);
  };

  return (
    <CodeMirror
      value={code}
      theme={githubDark}
      extensions={[javascript()]}
      onChange={handleChange}
    />
  );
};
