
    import { useState } from 'react'
   
    import '../App.css';
import MarkdownComponent from '../components/MarkdownComponent';

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
        <>
        <h1>Docs for AudioCloud Api</h1>
        <p>post request the audio file to this url ""</p>
        <p>response will be a url</p>
        <p>easy peasy</p>
        <p>keep files on the smaller side under 5mb</p>
        <p>Files are meant to be super temporary and for stiching uncooperative libraries together as a middleware</p>
        <p>meaning that files delete soon after fetching them and the urls will go dead</p>
        <p>If you need more persistant storage go look for your own cloud.</p>
        <h3>If this is useful to you and you want to send me a donation to keep this thing running my cashapp is <b>$flipz4650</b></h3>
        <br/><br/>
        <h2>test</h2>
        <form onSubmit={(e)=>handleSubmit(e)}>
        <input className="file-input file-input-bordered file-input-sm w-full max-w-xs" onChange={handleFileChange} type="file" name="audio" accept="audio/*" id='filePicker' />
        <button type='submit'>Test uploads</button>
        </form>
        <br/>
        <p><b>URL displays here:</b></p>
        <br/>
        <br/> {url&&<a href={url}>{url}</a>
        }
        <br/><br/>
        <h2>examples of fetches</h2>
        <MarkdownComponent></MarkdownComponent>
        

      </>
      )
    }
    
    export default Home
    