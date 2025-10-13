import "./products.css";
import { useEffect, useState, useCallback } from "react";
import {
  getProductCategories,
  getProducts,
  getProductsByCategory,
  searchProducts,
  sortProductsByPrice,
} from "../../apis/apis";
import { FilterIcon, Plus, SortAsc, SortDesc } from "lucide-react";
import Drawer from "../../components/Drawer/Drawer";

const ProductsScreen = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [lowToHigh, setLowToHigh] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [limit] = useState(10);

  /// get all products
  const fetchProducts = useCallback(
    async (page = 1) => {
      const response = await getProducts(page, limit);
      setProducts(response.products);
      setTotalProducts(response.total);
      // setCurrentPage(page);
    },
    [limit]
  );

  /// search products
  const searchProductMethod = async (searchQuery) => {
    console.log(searchQuery);
    const filteredProducts = await searchProducts(searchQuery);
    setProducts(filteredProducts.products || filteredProducts);
    setTotalProducts(filteredProducts.total || filteredProducts.length);
    setCurrentPage(1);
  };

  /// get all categories
  const getAllCategories = async () => {
    const response = await getProductCategories();
    setCategories(["All Categories", ...response]);
  };

  // get products by category
  const getProductsByOneCategory = useCallback(
    async (category, page = 1) => {
      const filteredProducts = await getProductsByCategory(
        category,
        page,
        limit
      );
      setProducts(filteredProducts.products || filteredProducts);
      setTotalProducts(filteredProducts.total || filteredProducts.length);
    },
    [limit]
  );

  const sortWithPrice = async (sortOption) => {
    var sortOptionValue;
    if (sortOption === true) {
      sortOptionValue = "asc";
    } else {
      sortOptionValue = "desc";
    }
    const sortedWithPrice = await sortProductsByPrice(sortOptionValue);
    setProducts(sortedWithPrice.products || sortedWithPrice);
    setTotalProducts(sortedWithPrice.total || sortedWithPrice.length);
    setCurrentPage(1);
  };

  const handleSort = ({ lowToHigh }) => {
    setLowToHigh(!lowToHigh);
    console.log(lowToHigh);
    sortWithPrice(lowToHigh);
  };

  useEffect(() => {
  if (category && category !== "All Categories") {
    getProductsByOneCategory(category, currentPage);
  } else {
    fetchProducts(currentPage);
  }
  if (categories.length === 0) {
    getAllCategories();
  }
}, [currentPage, category, fetchProducts, getProductsByOneCategory, categories.length]);

  return (
    <div className="products-screen">
      <div
        className="products-header"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h1>Products Inventory</h1>
        <div
          className="filter-products"
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
          onClick={() => setIsDrawerOpen(true)}
        >
          <Plus size={16} />
          <p style={{ marginLeft: "8px", marginRight: "8px" }}>Add Product</p>
        </div>
      </div>
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        categories={categories}
        products={products}
      ></Drawer>

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
            /// reset to page 1
            setCurrentPage(1);
            /// if category is All Categories then fetch all products
            if (e.target.value === "All Categories") {
              fetchProducts(1);
            }
            /// else fetch products by category
            else {
              getProductsByOneCategory(e.target.value, 1);
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
                          width: "45px",
                          height: "40px",
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
        <div className="pagination">
          <div className="pagination-info">
            Showing {(currentPage - 1) * limit + 1} to{" "}
            {Math.min(currentPage * limit, totalProducts)} of {totalProducts}{" "}
            results
          </div>
          <div className="pagination-controls">
            <button
              className="page-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              &lt;
            </button>

            {/* First page */}
            {currentPage > 2 && (
              <button className="page-btn" onClick={() => setCurrentPage(1)}>
                1
              </button>
            )}

            {/* Ellipsis before current page */}
            {currentPage > 3 && <span className="page-ellipsis">...</span>}

            {/* Previous page */}
            {currentPage > 1 && (
              <button
                className="page-btn"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                {currentPage - 1}
              </button>
            )}

            {/* Current page */}
            <button className="page-btn active">{currentPage}</button>

            {/* Next page */}
            {currentPage < Math.ceil(totalProducts / limit) && (
              <button
                className="page-btn"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                {currentPage + 1}
              </button>
            )}

            {/* Ellipsis after current page */}
            {currentPage < Math.ceil(totalProducts / limit) - 2 && (
              <span className="page-ellipsis">...</span>
            )}

            {/* Last page */}
            {currentPage < Math.ceil(totalProducts / limit) - 1 && (
              <button
                className="page-btn"
                onClick={() => setCurrentPage(Math.ceil(totalProducts / limit))}
              >
                {Math.ceil(totalProducts / limit)}
              </button>
            )}

            <button
              className="page-btn"
              disabled={currentPage === Math.ceil(totalProducts / limit)}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsScreen;
