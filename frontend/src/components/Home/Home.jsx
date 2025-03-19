import React, { useState, useEffect } from "react";
import axios from "axios";
import Sketch from "../Buttons/Sketch";

const funFacts = [
  "Did you know? The first-ever image uploaded to the internet was a band photo!",
  "Why did the AI go to art school? It wanted to brush up on its skills!",
  "Generating images... just like a magician, but digital!",
  "Did you know? The world's first photograph took 8 hours to expose!",
  "Waiting is hard, but so is choosing the perfect prompt!",
  "AI-generated images: proof that machines can dream!",
];

function Home() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentFact, setCurrentFact] = useState(funFacts[0]);

  useEffect(() => {
    let factInterval;
    if (loading) {
      factInterval = setInterval(() => {
        setCurrentFact(funFacts[Math.floor(Math.random() * funFacts.length)]);
      }, 5000);
    } else {
      clearInterval(factInterval);
    }
    return () => clearInterval(factInterval);
  }, [loading]);

  const handleGenerateImage = async () => {
    if (!prompt) {
      setError("Please enter a prompt");
      return;
    }
  
    // List of blocked words
    const blockedWords = [
  	"sex", "vagina", "porn", "pussy", "nude", "penis", "fuck", "xxx",
  	"boobs", "cock", "dick", "ass", "naked", "erotic", "fetish", "hardcore",
  	"hentai", "blowjob", "cum", "deepthroat", "gangbang", "lesbian", "gayporn",
  	"anal", "bdsm", "orgy", "stripper", "escort", "molestation", "rape", "incest",
  	"pedophile", "childporn", "bestiality", "necrophilia", "prostitute", "sexting",
  	"hooker", "slut", "whore", "arse", "clit", "genitals", "ejaculation", "masturbation",
  	"sperm", "tit", "breasts", "handjob", "groping", "voyeur", "cunnilingus",
  	"rimjob", "bondage", "dominatrix", "snuff", "bareback", "fisting"
    ];

    const lowerCasePrompt = prompt.toLowerCase();
  
    if (blockedWords.some((word) => lowerCasePrompt.includes(word))) {
      setError("I can't generate this. Try something else.");
      return;
    }
  
    setLoading(true);
    setError("");
    setImageUrl("");
  
    try {
      const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(
        `${VITE_BACKEND_URL}/api/v1/generate-image`,
        { prompt }
      );
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error("Error generating image:", error);
      setError("Failed to generate image");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <div className="bg-gray-900">
        <Sketch />
      </div>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold mb-6">Text to Image Generator</h1>
        <div className="w-full max-w-md">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt..."
            className="w-full p-3 text-black rounded-lg focus:outline-none shadow-md bg-slate-200"
          />
          <button
            onClick={handleGenerateImage}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold p-3 mt-4 rounded-lg transition-all"
          >
            {loading ? "Generating..." : "Generate Image"}
          </button>
        </div>
        {loading && <p className="text-yellow-400 mt-4">{currentFact}</p>}
        {error && <p className="text-red-500 mt-3">{error}</p>}
        {imageUrl && (
          <div className="mt-6">
            <img
              src={imageUrl}
              alt="Generated"
              className="w-full max-w-lg rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
