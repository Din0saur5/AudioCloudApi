import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MarkdownComponent = () => {
    const markdown = `
    \`\`\`javascript
          fetch('http://localhost:5001/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                file: {
                    name: 'sample_audio.mp3',
                    url: 'sample_audio_local_Url'  //easily extracted from the file picker input 
                    str8Pipe: false
                }
            }),
            
        })
        .then(response => response.json())
        .then(data => console.log('File uploaded:', data))
        .catch(error => console.error('Error:', error));
        \`\`\`

        If you dont want to use a downloaded audio file from the computer,
        but rather you are getting an audio blob directly from another api or other dynamic source
        set the value for str8Pipe to true in your fetch and use the blob itself rather than the local url.
        Example below:
        
       \`\`\`javascript
          fetch('http://localhost:5001/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                file: {
                    name: 'sample_audio',
                    blob: [blobtype_file],
                    str8Pipe: true
                }
            }),
           
        })
        .then(response => response.json())
        .then(data => console.log('File uploaded:', data))
        .catch(error => console.error('Error:', error));
        \`\`\`
      `;

  return (
    <div>
      <ReactMarkdown
        children={markdown}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                language={match[1]}
                style={atomDark}
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }
        }}
      />
    </div>
  );
};

export default MarkdownComponent;