
import { useState } from 'react'
import fetchOne from '../components/fetchOne.md'
import fetchTwo from '../components/fetchTwo.md'
import response from '../components/response.md';
import '../App.css';
import MarkdownDisplay from '../components/MarkdownComponent';

    const Home = () => {
      const [currentInput, setCurrentInput] = useState({
        name:'',
        url:'',
        blob: ''

      }) 
      const [url, setUrl] = useState('')

      const handleFileChange = (e) => {
        e.preventDefault()
        const file = e.target.files[0];
        if (file && file.type.match('audio.*')) {
            let photoData = {
                name: '',
                url: '',
                
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                photoData.url = e.target.result
                // setCurrentInput(e.target.result); // Update the profile_pic state with the file's data URL
            };
            reader.readAsDataURL(file);
            photoData.name = file.name // Store the selected file
            
            setCurrentInput(photoData)
            console.log(photoData)
        }
    };

    const handleSubmit =  (e) => {
      e.preventDefault()
      fetch('/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            file:{
              ...currentInput,
              str8Pipe: false
            }
        }),
        credentials: 'include',
    })
    .then(response => response.json())
    .then(data =>setUrl(data.url))
    .catch(error => console.error('Error:', error));
    }
   

      return (
        <div className='home'>
        <h1>Docs:</h1>
        <p>post request the audio file to this url "https://audiocloudapi.onrender.com"</p>
        <p>response will be a url</p>
        <p>keep files on the smaller side under 5mb</p>
        <p>Files are meant to be super temporary (30s) and for stiching uncooperative libraries together as a middleware</p>
        <p>meaning that files delete soon after fetching them and the urls will go dead</p>
        <p>easy peasy</p>
        <p>If you need more persistant storage use a dedicated cloud, not this.</p>
        <h3>If this is useful to you and you want to send me a donation to keep this thing running my cashapp is <b>$flipz4650</b></h3>
        <br/><br/>
        <h2>Test</h2>
        <form onSubmit={(e)=>handleSubmit(e)}>
        <input className="file-input file-input-bordered file-input-sm w-full max-w-xs" onChange={handleFileChange} type="file" name="audio" accept="audio/*" id='filePicker' />
        <button type='submit'>Go!</button>
        </form>
        <br/>
        <p><b>URL displays here:</b></p>
        
        <div className='url-container'>
        {url&&<a href={url}>{url}</a>
        }</div> 
        <br/>
        <h2>Examples:</h2>
        <MarkdownDisplay mdFile={fetchOne}></MarkdownDisplay>
        <p>If you dont want to use a downloaded audio file from the computer, but rather you are getting an audio blob directly from another api or other dynamic source set the value for str8Pipe to true in your fetch and use the blob itself rather than the local url. Example below:</p>
        <MarkdownDisplay mdFile={fetchTwo}></MarkdownDisplay>
        <br/>
        <MarkdownDisplay mdFile={response}></MarkdownDisplay>
      </div>
      )
    }
    
    export default Home
    