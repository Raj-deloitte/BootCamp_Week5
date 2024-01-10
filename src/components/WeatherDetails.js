import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./WeatherDetails.css";
import axios from "axios";

const WeatherDetails = () => {
  const [data, setData] = useState("");
  const { name } = useParams();
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  const [dayLength, setDayLength] = useState(null);
  const [remainingDaylight, setRemainingDaylight] = useState(null);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=eb5fd6ce795d040ed78f3f6225960fa2`;
  useEffect(() => {
    axios.get(url).then((response) => {
      setData(response.data);
    });
  }, []);
  console.log(data);
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const convertUnixTimestampToTime = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    return hours + ':' + minutes.substr(-2);
  };

  const calculateDayLength = (sunrise, sunset) => {
    const sunriseTime = convertUnixTimestampToTime(sunrise);
    const sunsetTime = convertUnixTimestampToTime(sunset);

    const sunriseDate = new Date(sunrise * 1000);
    const sunsetDate = new Date(sunset * 1000);

    
    const dayLengthInMilliseconds = sunsetDate - sunriseDate;
    const hours = Math.floor(dayLengthInMilliseconds / 3600000);
    const minutes = Math.floor((dayLengthInMilliseconds % 3600000) / 60000);
    const dayLength = `${hours}H ${minutes}M`;

    
    const remainingDaylightInMilliseconds = sunsetDate - new Date();
    const remainingHours = Math.floor(remainingDaylightInMilliseconds / 3600000);
    const remainingMinutes = Math.floor((remainingDaylightInMilliseconds % 3600000) / 60000);
    const remainingDaylight = `${remainingHours}h ${remainingMinutes}m`;

    setSunrise(sunriseTime);
    setSunset(sunsetTime);
    setDayLength(dayLength);
    setRemainingDaylight(remainingDaylight);
  };
  useEffect(() => {
    
    const sunriseValue = data?.sys?.sunrise;
    const sunsetValue = data?.sys?.sunset;
    calculateDayLength(sunriseValue, sunsetValue);
  }, []);
  
 

  return (
    <>
      <div className="weatherContainer">
        <div className="breadcrump">
        <Link to={"/"}>
            <div className="back">
              <img src="../asset/arrow_back_ios_24px.svg" alt="left" />
              <div>Back</div>
            </div>
          </Link>
          <div className="bt">
            <button className="red">Remove</button>
          </div>
        </div>

        <div className="Row-1">
          <img src="../asset/Group.svg" alt="sun" className="sun" />
          <div className="arrow">
            <div>{data?.name} </div>
            <img src="../asset/Vector.svg" alt="arrow" />
          </div>
          <div className="deg">
            <div>{(data?.main?.temp - 273.15).toFixed(1)}</div>
            <img src="../asset/Ellipse 1.svg " className="deg" />
          </div>
        </div>

        <div className="Row-2">
          <div className="c-1">
            TIME
            <p>{currentTime}</p>
          </div>
          <div className="c-1">
            PRESSURE
            <p>{data?.main?.pressure}</p>
          </div>
          <div className="c-1">
            %RAIN
            <p>58%</p>
          </div>
          <div className="c-1">
            HUMIDITY
            <p>{data?.main?.humidity}</p>
          </div>
        </div>

        <div className="Row-3">
          <div className="heading">SUNRISE & SUNSET</div>
          <div className="rr">
            <div className="Time">
              <div>
                Length of day : <span className="time">{dayLength}</span>
              </div>
              <div>
                Remaining daylight : <span className="time">{remainingDaylight}</span>
              </div>
            </div>
            <div>GRAPH</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherDetails;
