import React, { useState } from 'react';

const UpdateProductModal = ({ show, onClose, product, onUpdateProduct }) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [image, setImage] = useState(product.image);

  if (!show) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProduct(product.id, { name, price, image });
    onClose(); 
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
          <label>Price</label>
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
          <label>Image URL</label>
          <input type="text" value={image} onChange={e => setImage(e.target.value)} />
          <button type="submit">Update Product</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default UpdateProductModal;

