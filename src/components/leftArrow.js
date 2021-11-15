const LeftArrow = ({onClickFunction}) => {
  return (
    <div onClick={onClickFunction} className="item__arrow">
      <img src="./images/arrowLeft.svg"/>
    </div>
  );
};

export default LeftArrow;
