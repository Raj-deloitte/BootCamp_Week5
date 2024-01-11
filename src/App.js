import NavBar from "./components/NavBar";
import "./App.css";
import DashBoard from "./components/DashBoard";
import WeatherDetails from "./components/WeatherDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store';

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<DashBoard />}></Route>
        <Route path="/weather/:name" element={<WeatherDetails/>}></Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
