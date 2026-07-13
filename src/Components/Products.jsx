import React, { useEffect, useState } from "react";

export default function Products() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
        marginTop: "20px"
      }}>
        {items.map(product => (
          <div key={product.id} style={{
            border: "1px solid #ddd",
            padding: "15px",
            borderRadius: "10px"
          }}>
            <img src={product.image} alt="" style={{ width: "100px", height: "100px" }} />
            <h4>{product.title.slice(0, 20)}...</h4>
            <p><strong>${product.price}</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
}
