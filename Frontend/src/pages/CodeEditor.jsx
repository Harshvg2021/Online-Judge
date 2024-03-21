import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/htmlmixed/htmlmixed';

import { UnControlled as CodeMirror } from 'react-codemirror2';

const CodeEditor = ({ language }) => {
  const [code, setCode] = useState('');

  return (
    <CodeMirror
      value={code}
      options={{
        mode: language,
        theme: 'material',
        lineNumbers: true
      }}
      onChange={(editor, data, value) => {
        setCode(value);
      }}
    />
  );
};

export default CodeEditor;
