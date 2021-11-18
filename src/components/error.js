import React from "react";

const Error = ({cityName})=>{
    return(
        <div className="error__wrap">
            City "{cityName}" doesn't exist!
        </div>
    )
}

export default Error