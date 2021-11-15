import simplearrow from '../simplearrow.svg'

const RightArrow = ({onClickFunction}) => {
  return (
    <div onClick={onClickFunction} className="item__arrow">
      <img src="./images/arrowRight.svg"/>
    </div>
  );
};
export default RightArrow;
