import React from "react";
import "../../Css/card.css";

const Card = (props) => {
  return <div className="card">{props.children}</div>;
};

export default Card;
