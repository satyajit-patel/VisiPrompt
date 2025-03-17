import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/Home/Home";
import {AuroraBackgroundDemo} from "./components/Background/AuroraBackgroundDemo";
import { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    async function wakeUpSidd() {
      const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.get(`${VITE_BACKEND_URL}/api/v1/ping`);
      console.log(response.data.message);
    }
    wakeUpSidd();
  }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AuroraBackgroundDemo />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
