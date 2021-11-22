//Renders right arrow in Item component

const RightArrow = ({ onClickFunction }) => {
  return (
    <div onClick={onClickFunction} className="item__arrow">
      <img src="./images/arrowRight.svg" alt="backward" />
    </div>
  );
};
export default RightArrow;
