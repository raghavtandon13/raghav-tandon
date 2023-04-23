import React from "react";
import "./CardT.css";
function CardT(props) {
  return (
    <div className="result-card">
      <div className="company-img">
        <img
          src={props.imgUrl} alt="https://media.cnn.com/api/v1/images/stellar/prod/111006055359-apple-logo-new-york.jpg"
          height="100%"
          width="100%"
        />
      </div>
      <div className="company-desc">
        <h1>{props.company}</h1>
        <h3>{props.headline}</h3>
        <p>{props.description}</p>
        <a href={props.primaryText}>Visit {props.company} Homepage</a>
      </div>
    </div>
  );
}
export default CardT;
