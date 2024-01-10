import "./Card.css";
// import { Link } from "react-router-dom";

const Card = ({ data }) => {
//   console.log(data.weather[0].description);

  return (
    <>
      <div className="Card">
        <div className="row1">
          <div>{data.name}</div>
          <img src="./asset/Right.svg" alt="right-arrow"></img>
        </div>
        <div className="row2">
          <div className="r2">
            <h3>{(data?.main?.temp - 273.15).toFixed(2)}</h3>
            <img src="/asset/Ellipse 1.svg " className="deg" alt="degree" />
          </div>
          <img src="" alt="cloud"></img>
        </div>
        <div className="row3">
          <div className="col1">
            <img src="./asset/warning.svg " alt="sign" />
            <p className="col2">{data?.weather[0]?.description}</p>
          </div>
          <div className="col2">{data?.weather[0]?.main}</div>
        </div>
      </div>
    </>
  );
};

export default Card;
