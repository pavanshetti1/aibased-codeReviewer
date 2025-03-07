import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import prism from "prismjs"
import Editor from "react-simple-code-editor"
import Markdown from 'react-markdown'
import rehypeHighLight from 'rehype-highlight';
import "highlight.js/styles/github.css";
import axios from 'axios';

import './App.css'



function App() {

  const [code, setCode] = useState(`function sum() {
  return 1+1
}`)
  const [reviewCode, setReviewCode] = useState(``);
  const [loading, setLoading] = useState(false);


  async function review() {
    setLoading(true);
    const response = await axios.post('/ai/get-review', {code});
    setReviewCode(response.data);
    setLoading(false);
  }

  useEffect(()=> {
    prism.highlightAll();
  }, [])

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor 
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, 'javascript')}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: '1px solid #ddd',
                borderRadius: 5,
                height: '100%',
                width: '100%'
              }}
            />
          </div>
          <div 
            onClick={review}
          className="review">{loading ? 'Loading...' : 'Review'}</div>
        </div>
        <div className="right">
          <Markdown
            rehypePlugins={[rehypeHighLight]}
          >{reviewCode}</Markdown>
        </div>
      </main>
    </>
  )
}



export default App
