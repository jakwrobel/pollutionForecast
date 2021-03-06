//Component renders error message, which value depends on error's type
import React from "react";

const Error = ({ type, message, cityName }) => {
  console.log(type);
  if (type === "content") {
    return <div className="error__wrap">City "{cityName} does not exist!"</div>;
  } else if ((type = "content")) {
    return <div className="error__wrap">{message}</div>;
  } else {
    return <div className="error__wrap">Unknown error has occured</div>;
  }
};

export default Error;
