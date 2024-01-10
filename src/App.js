import NavBar from "./components/NavBar";
import "./App.css";
import DashBoard from "./components/DashBoard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<DashBoard />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
