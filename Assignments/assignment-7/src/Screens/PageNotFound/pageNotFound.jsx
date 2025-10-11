import { ArrowBigLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Page Not Found</p>
      <div
          className="filter-products"
          style={{
            width: "200px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            padding: "1px 8px",
            background: "#2b82ff",
            border: "1px solid #e2e8f0",
            borderRadius: "6px",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <ArrowBigLeft size={16} />
          <p style={{ marginLeft: "8px" }}>Add Product</p>
        </div>
    </div>
  );
};

export default NotFound;
