const express = require('express');
const bodyParser = require('body-parser');
require("dotenv").config();
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5001;
app.use(cors()); 


const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON;
// Connect your supabase account and sanitize variables
const supabase = createClient(supabaseUrl, supabaseAnonKey);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define your API routes here




app.post('/', async (req, res) => {
    // Middleware for POST request body is added to parse `req.body`
    const file = req.body.file;

    if (!file || !file.url || !file.name) {
        return res.status(400).json({ error: 'Invalid file object. Make sure to include "url" and "name".' });
    }

    async function uploadFile(file) {
        async function getBlobFromUrl(blobUrl) {
            try {
                const response = await fetch(blobUrl);
                const fileBlob = await response.blob();
                return fileBlob;
            } catch (error) {
                console.error('Error fetching the Blob:', error);
                return null; // or handle the error as needed
            }
        }
        try {
            let fileBlob;
            let fileName = '';

            if (file.str8Pipe === false) {
                const fileExt = file.name.split('.').pop();
                fileName = `${file.name.split('.').shift()}${Math.random()}.${fileExt}`;

                fileBlob = await getBlobFromUrl(file.url);
            } else {
                fileName = file.name;
                fileBlob = file.blob;
            }

            const { data, error } = await supabase.storage.from('AudioFiles').upload(fileName, fileBlob);

            if (error) {
                throw error;
            }
            const url = `https://hhbifqhbepixliiprfnr.supabase.co/storage/v1/object/public/AudioFiles/${fileName}`;
            return { url: url, path: data.path };
        } catch (err) {
            console.error("Error uploading file:", err);
            throw err;
        }
    }

    async function waitAndRemoveFiles(filePath) {
        // Wait for 2 minutes (120,000 milliseconds)
        await new Promise(resolve => setTimeout(resolve, 30000));

        // Run the Supabase remove function
        try {
            const { data, error } = await supabase
                .storage
                .from('AudioFiles')
                .remove([filePath]);

            if (error) {
                console.error("Error removing files:", error);
            } else {
                console.log("Files removed successfully:", data);
            }
        } catch (e) {
            console.error("Delete Cycling error:", e);
        }
    }

    try {
        const { url, path } = await uploadFile(file); // Pass the file object from the request body
        waitAndRemoveFiles(path);
        res.status(201).json({ url: url });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}); 

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
