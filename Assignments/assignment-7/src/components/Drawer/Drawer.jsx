import { X } from "lucide-react";
import React, { useState, useMemo } from "react";
import "./Drawer.css";
import { addProduct } from "../../apis/apis";

const Drawer = ({ isOpen, onClose, categories, products }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productSKU, setProductSKU] = useState("");
  const [productPrice, setProductPrice] = useState();

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setProductName("");
      setProductSKU("");
      setSelectedCategory("");
      setProductPrice("");
      setIsAnimating(false);
      onClose();
    }, 300);
  };

  // Check if form is valid
  const isFormValid = useMemo(() => {
    return (
      productName.trim() !== "" &&
      productSKU.trim() !== "" &&
      selectedCategory !== "" &&
      productPrice > 0
    );
  }, [productName, productSKU, selectedCategory, productPrice]);

  const handleSave = () => {
    if (isFormValid) {
      const productData = {
        productName,
        productSKU,
        selectedCategory,
        productPrice: Number(productPrice),
      };

      addProduct(productData)
        .then(() => {
          products.push(productData);
          setProductName("");
          setProductSKU("");
          setSelectedCategory("");
          setProductPrice("");
          onClose();
        })
        .catch((error) => {
          console.error("Failed to add product:", error);
          alert("Failed to add product. Please try again.");
        });
    }
  };
  // Filter out "All Categories" from the options
  const filteredCategories = categories.filter(
    (category) => category !== "All Categories"
  );

  return (
    <>
      {(isOpen || isAnimating) && (
        <div className="drawer-overlay" onClick={handleClose}>
          <div
            className={`drawer ${isAnimating ? "sliding-out" : ""}`}
            /// not sure why this is needed,
            onClick={(e) => e.stopPropagation()}
          >
            <div className="drawer-header">
              <h2>Add Product</h2>
              <button className="close-button" onClick={handleClose}>
                <X size={24} />
              </button>
            </div>
            <div style={{ marginBottom: "50px" }}>
              <div className="drawer-content">
                {
                  <>
                    <p>Product Name*</p>
                    <input
                      className="product-input"
                      type="text"
                      placeholder="Mackbook Pro"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                    <p
                      style={{
                        marginTop: 20,
                      }}
                    >
                      Product SKU*
                    </p>
                    <input
                      className="product-input"
                      type="text"
                      placeholder="SKU-1234"
                      value={productSKU}
                      onChange={(e) => setProductSKU(e.target.value)}
                    />
                    <p
                      style={{
                        marginTop: 20,
                        marginBottom: 6,
                      }}
                    >
                      Category*
                    </p>
                    <select
                      style={{
                        width: "100%",
                        height: "40px",
                        border: "1px solid #e2e8f0",
                        borderRadius: "6px",
                      }}
                      value={selectedCategory}
                      onChange={(e) => {
                        /// set the category
                        setSelectedCategory(e.target.value);
                        console.log(e.target.value);
                      }}
                      className="category-filter"
                    >
                      {filteredCategories.map((category) => (
                        <option
                          key={
                            typeof category === "string"
                              ? category
                              : category.id
                          }
                          value={
                            typeof category === "string"
                              ? category
                              : category.slug
                          }
                        >
                          {typeof category === "string"
                            ? category
                            : category.name}
                        </option>
                      ))}
                    </select>
                    <p
                      style={{
                        marginTop: 20,
                      }}
                    >
                      Product Price*
                    </p>
                    <input
                      className="product-input"
                      type="number"
                      placeholder="$ 1234"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                    />
                  </>
                }
              </div>
            </div>
            <div
              className="drawer-footer"
              style={{
                justifyContent: "space-around",
                alignItems: "center",
                gap: "10px",
                display: "flex",
                padding: "1px 20px",
              }}
            >
              <button
                style={{
                  height: "40px",
                  width: "100%",
                  alignItems: "center",
                  padding: "1px 8px",
                  background: "gray",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  color: "white",
                  cursor: "pointer",
                }}
                className="cancel-button"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                style={{
                  height: "40px",
                  width: "100%",
                  alignItems: "center",
                  padding: "1px 8px",
                  background: "#2b82ff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  color: "white",
                  cursor: isFormValid ? "pointer" : "not-allowed",
                  opacity: isFormValid ? 1 : 0.5,
                }}
                className="save-button"
                onClick={handleSave}
                disabled={!isFormValid}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Drawer;
