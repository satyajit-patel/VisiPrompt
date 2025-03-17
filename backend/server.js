const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;
const HF_API_KEY = process.env.HF_API_KEY;

app.use(cors());
app.use(express.json());

app.post('/api/v1/generate-image', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0',
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
      }
    );

    const base64Image = Buffer.from(response.data, 'binary').toString('base64');
    const imageUrl = `data:image/png;base64,${base64Image}`;

    res.json({ imageUrl });
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

app.get("/api/v1/ping", (req, res) => {
  res.json({message: "pong"});
});

app.get("/", (req, res) => {
  res.send("UP");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
