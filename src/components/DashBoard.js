import React, { useState } from "react";
import "./DashBoard.css";
import axios from "axios";
import Card from "../UI/Card";

const DashBoard = () => {
  // const [data,setData]=useState("");

  const [search, setSearch] = useState("");
  const [data, setData] = useState("");
  const [isCard, setIsCard] = useState(false);
  
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

      {isCard ? (
        <Card data={data} />
      ) : (
        <div className="initial-info">
          <img
            src="/asset/no-info-cloud.svg"
            alt=""
            className="no-info-cloud"
          />
          <div className="message">No locations added to watchlist </div>
        </div>
      )}
    </>
  );
};
export default DashBoard;
