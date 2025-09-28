import React from "react";

const SearchTodo = ({ handleSearch }) => {
  return (
    <div
      style={{
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      <input
        type="search"
        placeholder="Search todo"
        onChange={(e) => handleSearch(e.target.value)}
        style={{
          width: "100%", // Full width
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          marginBottom: "1px",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
};

export default SearchTodo;
