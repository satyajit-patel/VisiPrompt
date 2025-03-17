import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateImage = async () => {
    if (!prompt) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError('');
    setImageUrl('');

    try {
      const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(`${VITE_BACKEND_URL}/api/v1/generate-image`, { prompt });
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
      setError('Failed to generate image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Text to Image Generator</h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt"
        style={{ width: '300px', padding: '10px' }}
      />
      <button onClick={handleGenerateImage} style={{ padding: '10px 20px', marginLeft: '10px' }}>
        Generate Image
      </button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {imageUrl && (
        <div style={{ marginTop: '20px' }}>
          <img src={imageUrl} alt="Generated" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      )}
    </div>
  );
}

export default App;
