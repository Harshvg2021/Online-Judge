import React, { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { Dropdown, DropdownItem, DropdownTrigger, DropdownMenu,Button } from "@nextui-org/react";
import "../styles/CodeEditor.css"

const CodeEditor = () => {
  const [code, setCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript'); // Initial language

  const languages = ['cpp', 'java', 'python', 'javascript'];

  const handleCodeChange = (value) => {
    setCode(value);
  };

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
  };

  return (
    <div className="code-editor-container">
      <div className="code-section">
        <h1>Code Editor</h1>
        <Dropdown>
          <DropdownTrigger>
            <Button flat color="primary">
              {selectedLanguage.toUpperCase()}
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Select Language">
            {languages.map((lang) => (
              <DropdownItem key={lang} onClick={() => handleLanguageChange(lang)}>
                {lang.toUpperCase()}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Editor
          height="100%" // Set full height for the code section
          defaultLanguage={selectedLanguage}
          defaultValue={code}
          onChange={handleCodeChange}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
