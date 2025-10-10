import "./products.css";
import { useEffect, useState } from "react";
import {
  getProductCategories,
  getProducts,
  getProductsByCategory,
  searchProducts,
  sortProductsByPrice,
} from "../../apis/apis";
import { FilterIcon, SortAsc, SortDesc } from "lucide-react";

const ProductsScreen = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [lowToHigh, setLowToHigh] = useState(false);

  /// get all products
  useEffect(() => {
    fetchProducts();
    getAllCategories();
  }, []);

  /// get all products
  const fetchProducts = async () => {
    const response = await getProducts();
    setProducts(response);
  };

  /// search products
  const searchProductMethod = async (searchQuery) => {
    console.log(searchQuery);

    const filteredProducts = await searchProducts(searchQuery);
    setProducts(filteredProducts);
  };

  /// get all categories
  const getAllCategories = async () => {
    const response = await getProductCategories();
    setCategories(["All Categories", ...response]);
  };

  // get products by category
  const getProductsByOneCategory = async (category) => {
    const filteredProducts = await getProductsByCategory(category);
    setProducts(filteredProducts);
  };

  const sortWithPrice= async (sortOption) => {
    var sortOptionValue;
    if(sortOption === true) {
      sortOptionValue = "asc";
    }else{
      sortOptionValue = "desc";
    }
    const sortedWithPrice =  await sortProductsByPrice(sortOptionValue);
    setProducts(sortedWithPrice);
  }

  const handleSort = ({ lowToHigh }) => {
    setLowToHigh(!lowToHigh);
    console.log(lowToHigh);
    sortWithPrice(lowToHigh);
  };

  return (
    <div className="products-screen">
      <div className="products-header">
        <h1>Products Inventory</h1>
      </div>

      <div className="products-filters">
        <div className="search-box" style={{ flex: 1 }}>
          <input
            style={{ flex: 1, width: "100%" }}
            className="search-input"
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => {
              /// set the search query to input field
              setSearchQuery(e.target.value);
              /// call the searchProducts function
              searchProductMethod(e.target.value);
            }}
          />
          {searchQuery && (
            <button
              className="clear-button"
              onClick={() => {
                setSearchQuery("");
                searchProductMethod("");
              }}
            >
              ×
            </button>
          )}
        </div>
        <select
          value={category}
          onChange={(e) => {
            /// set the category
            setCategory(e.target.value);
            /// if category is All Categories then fetch all products
            if (e.target.value === "All Categories") {
              fetchProducts();
            }
            /// else fetch products by category
            else {
              getProductsByOneCategory(e.target.value);
            }
          }}
          className="category-filter"
        >
          {categories.map((category) => (
            <option
              key={typeof category === "string" ? category : category.id}
              value={typeof category === "string" ? category : category.slug}
            >
              {typeof category === "string" ? category : category.name}
            </option>
          ))}
        </select>
        <div
          className="filter-products"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "1px 8px",
            background: "transparent",
            border: "1px solid #e2e8f0",
            borderRadius: "6px",
          }}
        >
          <FilterIcon size={16} />
          <p style={{ marginLeft: "8px" }}>Filter</p>
        </div>
      </div>
      <div className="products-table">
        <table>
          <thead>
            <tr>
              <th>PRODUCT</th>
              <th>CATEGORY</th>
              <th
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleSort({ lowToHigh });
                }}
              >
                <div style={{ marginRight: "8px" }}>PRICE</div>
                {lowToHigh === false ? (
                  <SortAsc size={16} />
                ) : (
                  <SortDesc size={16} />
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="product-cell">
                    <div
                      style={{
                        backgroundColor: "#f5f5f5",
                        padding: "2px",
                        alignContent: "center",
                        borderRadius: "4px",
                      }}
                    >
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="product-image"
                        style={{
                          width: "55px",
                          height: "50px",
                          objectFit: "contain",
                        }}
                      />
                    </div>

                    <div className="product-info">
                      <div className="product-name">{product.title}</div>
                      <div className="product-sku">SKU: {product.id}</div>
                    </div>
                  </div>
                </td>
                <td>{product.category}</td>
                <td>${product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <div className="pagination">
          <div className="pagination-info">
            Showing 1 to 10 of {products.length} results
          </div>
          <div className="pagination-controls">
            <button className="page-btn" disabled>&lt;</button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <span className="page-ellipsis">...</span>
            <button className="page-btn">10</button>
            <button className="page-btn">&gt;</button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProductsScreen;
