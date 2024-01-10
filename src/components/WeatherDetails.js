import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./WeatherDetails.css";
import axios from "axios";

const WeatherDetails = () => {
  const [data, setData] = useState("");
  const { name } = useParams();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=eb5fd6ce795d040ed78f3f6225960fa2`;
  useEffect(() => {
    axios.get(url).then((response) => {
      setData(response.data);
    });
  }, []);
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
//   console.log(currentTime);

  return (
    <>
      <div className="weatherContainer">
        <div className="breadcrump">
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
                Length of day : <span className="time">13H 12M</span>
              </div>
              <div>
                Remaining daylight : <span className="time">9H 22M</span>
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
