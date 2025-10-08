import CustomButton from "./custom_button";

const EmployeeCard = ({ name, designation }) => {
  return (
    <div
      style={{
        background: "gray",
        padding: "10px",
        width: "350px",
        borderRadius: "10px",
      }}
    >
      <h2>{name}</h2>
      <h4>{designation}</h4>
      <div style={{ marginTop: "10px", marginBottom: "10px" }}>
        <CustomButton />
      </div>
    </div>
  );
};

export default EmployeeCard;
