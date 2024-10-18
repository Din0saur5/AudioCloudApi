## When coming from a locally downloaded&nbsp;file

```javascript
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

```
