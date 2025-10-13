import { ArrowBigLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./pageNotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <header>
        <h1>404</h1>
        <p>Page Not Found</p>
      </header>
      <main className="content">
        <div className="go-back" onClick={() => navigate("/")}>
          <ArrowBigLeft size={16}/>
          <p style={{marginLeft:10}}>Add Product</p>
        </div>
      </main>
    </div>
  );
};

export default NotFound;