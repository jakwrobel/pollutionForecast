//Renders left arrow in Item component
const LeftArrow = ({ onClickFunction }) => {
  return (
    <div onClick={onClickFunction} className="item__arrow">
      <img src="./images/arrowLeft.svg" alt="forward" />
    </div>
  );
};

export default LeftArrow;
