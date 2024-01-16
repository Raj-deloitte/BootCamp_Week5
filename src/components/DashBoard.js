import React, { useState } from "react";
import "./DashBoard.css";
import axios from "axios";
import Card from "../UI/Card";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WeatherDetails from "./WeatherDetails";

const DashBoard = ({settings}) => {
  // const [data,setData]=useState("");

  const [search, setSearch] = useState("");
  const [data, setData] = useState("");
  const [isCard, setIsCard] = useState(false);

  const items = useSelector((state) => state.listItem.items);
  console.log("home se ", items);
  const searchLocation = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=eb5fd6ce795d040ed78f3f6225960fa2`;
    axios.get(url).then((response) => {
      setData(response.data);
      setIsCard(true);

    });
  };
  
  return (
    <>
      <div className="search_div">
        <div className="search_box">
          <input
            value={search}
            type="text"
            className="inputField"
            placeholder="Search Location"
            onChange={(e) => setSearch(e.target.value)}
          />
          <img
            src="/asset/icon-wrapper.svg"
            alt="search"
            className="search-icon"
            onClick={searchLocation}
          />
        </div>
      </div>

      {isCard && (
        <Card data={data} />
      ) 
      }
      {items.length === 0 && !isCard && 
      (
        <div className="initial-info">
          <img
            src="/asset/no-info-cloud.svg"
            alt=""
            className="no-info-cloud"
          />
          <div className="message">No locations added to watchlist </div>
        </div>
      )}
      <Slider {...settings}>
      {items.map((item, index) => (
        <div className="weather_card" key={index}>
          <WeatherDetails pdata={item} isDisplayingFromDashboard={true}/>
        </div>
      ))}
      </Slider>
    </>
  );
};
export default DashBoard;
