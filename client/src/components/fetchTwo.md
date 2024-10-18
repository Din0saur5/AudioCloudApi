## When sending the audio blob directly

```javascript
fetch("http://localhost:5001/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    file: {
      name: "sample_audio",
      blob: [blobtype_file],
      str8Pipe: true,
    },
  }),
})
  .then((response) => response.json())
  .then((data) => console.log("File uploaded:", data))
  .catch((error) => console.error("Error:", error));
```
