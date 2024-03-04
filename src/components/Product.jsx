import React from "react";
import PropTypes from "prop-types";

  export default function Product({ product, onAddProductToBuy, onDeleteProduct, onEditProduct  }) {
    const onAdd = function() {
      onAddProductToBuy(product);
    };
    
    return (
      <div className="col-4">
        <div className="card">
          <img src={product.image} alt={product.name} />
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">${product.price}</p>
            <button className="btn btn-outline-primary btn-sm" onClick={onAdd }>
              Add to Cart
            </button>
            <button className="btn btn-outline-danger btn-sm" onClick={() => onDeleteProduct(product.id)}>
              Delete
            </button>
            <button className="btn btn-info btn-sm" onClick={() => onEditProduct(product)}>
              Edit
            </button>
          </div>
        </div>
      </div>
    );  
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  onAddProductToBuy: PropTypes.func.isRequired,
  onDeleteProduct: PropTypes.func.isRequired,
  onEditProduct: PropTypes.func.isRequired,
};