# Api to temporarily host small audio files
## This is meant to be an open source project so use it as you wish, let me know if there are any issues
## webiste with demo: [https://tempaudiocloud.onrender.com/](https://tempaudiocloud.onrender.com/)

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

If you dont want to use a downloaded audio file from the computer,
but rather you are getting an audio blob directly from another api or other dynamic source
set the value for str8Pipe to true in your fetch and use the blob itself rather than the local url.
Example below:

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
