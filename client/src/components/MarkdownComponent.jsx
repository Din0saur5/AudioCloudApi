import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import '../App.css'


const MarkdownDisplay = ({mdFile}) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    // Fetch the Markdown file and set the content
    fetch(mdFile)
      .then((response) => response.text())
      .then((text) => setContent(text));
  }, []);

  return (
    <div className="markdown-container">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownDisplay;
