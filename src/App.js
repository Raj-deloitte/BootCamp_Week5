import NavBar from "./components/NavBar";
import "./App.css";
import DashBoard from "./components/DashBoard";
import WeatherDetails from "./components/WeatherDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const getDotsStyle=()=>{
    return window.innerWidth <= 768 ? {top : '10px'} : {bottom: "10px"};
  }
  const [settings,setSettings] =useState( {
    dots: true,
    dotsStyle:getDotsStyle(),
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setSettings({...settings,
      dotsStyle:getDotsStyle(),
    })
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [settings]);
  return (
    <BrowserRouter>
      {isMobile ? null : <NavBar />}
      <Routes>
        <Route path="/" element={<DashBoard settings={settings}/>}></Route>
        <Route path="/weather/:name" element={<WeatherDetails isMobile={isMobile}  />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
