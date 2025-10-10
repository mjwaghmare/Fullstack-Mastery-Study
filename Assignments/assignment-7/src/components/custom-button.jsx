const CustomButton = ({ label, onClick }) => {
  return (
    <button
      style={{
        backgroundColor: "#2b82ff",
        border: "none",
        color: "white",
        padding: "8px 16px",
        textAlign: "center",
        textDecoration: "none",
        display: "inline-block",
        fontSize: "16px",
        margin: "4px 2px",
        cursor: "pointer",
        borderRadius: "8px",
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default CustomButton;
