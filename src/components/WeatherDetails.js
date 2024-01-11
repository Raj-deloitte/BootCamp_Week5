import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./WeatherDetails.css";
import axios from "axios";

const WeatherDetails = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const [data, setData] = useState("");
  const { name } = useParams();

  const [click, setClicked] = useState(false);

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
  const addButtons = () => {
    setClicked(!click);
    dispatch({ type: "ADD_ITEM", payload: data });
    console.log("added from add", items);
  };
  const removeButtons = () => {
    setClicked(false);
    dispatch({ type: "REMOVE_ITEM", payload: data });
  };
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const convertUnixTimestampToTime = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    return hours + ":" + minutes.substr(-2);
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
    setDayLength(dayLength);
    

    const remainingDaylightInMilliseconds = sunsetDate - new Date();
    if (remainingDaylightInMilliseconds > 0) {
      const remainingHours = Math.floor(
        remainingDaylightInMilliseconds / 3600000
      );
      const remainingMinutes = Math.floor(
        (remainingDaylightInMilliseconds % 3600000) / 60000
      );
      const remainingDaylight = `${remainingHours}H ${remainingMinutes}M`;
      setRemainingDaylight(remainingDaylight);
    } else {
      setRemainingDaylight(`0H 0M`);
    }

    setSunrise(sunriseTime);
    setSunset(sunsetTime);
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
          {!click ? (
            <div className="add">
              <div onClick={addButtons}>Add to List </div>
              <img src="../asset/Union.svg" alt="add" />
            </div>
          ) : (
            <div className="bt">
              <button className="green">
                Added to list
                <img src="../asset/done_24px.svg" className="tick" />
              </button>
              <button className="red" onClick={removeButtons}>
                Remove
              </button>
            </div>
          )}
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
                Remaining daylight :{" "}
                <span className="time">{remainingDaylight}</span>
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
