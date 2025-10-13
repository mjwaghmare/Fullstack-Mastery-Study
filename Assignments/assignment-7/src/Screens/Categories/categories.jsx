import { useEffect, useState } from "react";
import "./categories.css";
import { getProductCategories } from "../../apis/apis";
import { Plus,Pencil, Trash } from "lucide-react";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories();
  }, []);

  /// get all categories
  const getAllCategories = async () => {
    const response = await getProductCategories();
    setCategories(response);
  };

  const handleEditCategory = () => {
    console.log("edit");
  };
  const handleDeleteCategory = () => {
    console.log("delete");
  };

  return (
    <div style={{ padding: 20 }}>
      <div
        className="categories-header"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h1>Categories</h1>
        <div
          className="add-category"
          style={{
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
          onClick={() => {
            console.log("Add category");
          }}
        >
          <Plus size={16} />
          <p style={{ marginLeft: "8px", marginRight: "8px" }}>Add Category</p>
        </div>
      </div>
      <div className="categories-list" style={{ marginTop: "20px" }}>
        {categories.map((category) => (
          <div
            key={category.slug}
            className="category-item"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "16px",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 1px 1px rgba(0,0,0,0.1)",
              gap: "16px",
              justifyContent: "space-between",
            }}
          >
            <p style={{ margin: 0, color: "#333" }}>{category.name}</p>
            <div style={{ display: "flex", gap: 20 }}>
              <p
                className="category-option"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleEditCategory(category);
                }}
              >
                <Pencil color="gray" size={16}/>
                
              </p>
              <p
                className="category-option"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleDeleteCategory(category);
                }}
              >
                <Trash color="red" size={16}/>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
