//Renders one pollution section  
import React from "react";
import LeftArrow from "./leftArrow";
import RightArrow from "./rightArrow";
import {
  slideToPrev,
  slideToNext,
  colorFunctions,
  getDate,
  getTime,
} from "../functions/results-functions";

const Item = ({ itemType, pollution, barvalueScale }) => {
  return (
    <div className="item__wrap">
      <LeftArrow
        onClickFunction={() =>
          slideToPrev(document.getElementsByClassName(`${itemType}__wrap`))
        }
      />
      <div className="item__content">
        {pollution.map((element) => (
          <div className={`${itemType}__wrap`}>
            <div
              className={`${itemType}__value`}
              style={{
                color: colorFunctions["set" + itemType + "Color"](
                  element[itemType]
                ),
              }}
            >
              {element[itemType]}
            </div>
            <div className={`${itemType}__content`}>
              <div
                className={`${itemType}__bar`}
                style={{
                  height: `${element[itemType] / barvalueScale}%`,
                  backgroundColor: colorFunctions["set" + itemType + "Color"](
                    element[itemType]
                  ),
                }}
              ></div>
            </div>
            <div className={`${itemType}__time`}>
              {getTime(element.datetime)}
            </div>
            <div className={`${itemType}__day`}>
              {getDate(element.datetime)}
            </div>
          </div>
        ))}
      </div>
      <RightArrow
        onClickFunction={() =>
          slideToNext(
            document.getElementsByClassName(`${itemType}__wrap`),
            document.getElementsByClassName("item__content")
          )
        }
      />
    </div>
  );
};

export default Item;
