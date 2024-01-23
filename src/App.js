import NavBar from "./components/NavBar";
import "./App.css";
import DashBoard from "./components/DashBoard";
import WeatherDetails from "./components/WeatherDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
 
 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  },[]);
  return (
    <BrowserRouter>
      {isMobile ? null : <NavBar />}
      <Routes>
        <Route path="/" element={<DashBoard isMobile={isMobile}/>}></Route>
        <Route path="/weather/:name" element={<WeatherDetails isMobile={isMobile}  />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
