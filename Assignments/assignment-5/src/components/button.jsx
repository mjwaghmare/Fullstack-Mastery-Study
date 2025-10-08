const CustomButton = ({btnName,onClick}) => {
  return (
    <div className="custom-btn">
      <button onClick={onClick} className="btn">{btnName}</button>
    </div>
  );
};

export default CustomButton;
