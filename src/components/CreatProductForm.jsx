import React, { useState } from "react";
import PropTypes from "prop-types";

export default function CreateProductForm({ onAddProduct }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');

  const onAddProductHelper = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Product name cannot be empty.');
      return;
    }
    if (!price || isNaN(price) || Number(price) <= 0) {
      setError('Product price must be a positive number.');
      return;
    }

    onAddProduct({
      name,
      price: +price, 
      image,
    });
    setError('');
  };

  return (
    <div>
      <h2>Create Product</h2>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      <form onSubmit={onAddProductHelper}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </div>
  );
}

CreateProductForm.propTypes = {
  onAddProduct: PropTypes.func.isRequired,
};
