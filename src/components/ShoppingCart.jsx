import React from 'react';
import PropTypes from 'prop-types';

export default function ShoppingCart({ productsToBuy, onRemoveProductFromCart }) {
  return (
    <div>
      <ul>
        {productsToBuy.map((product, index) => (
          <li key={index} className="shopping-cart-item">
            {product.name} - ${product.price}
            <button className="remove-button" onClick={() => onRemoveProductFromCart(index)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p className="shopping-cart-total">Total: ${productsToBuy.reduce((prevTotalPrice, product) => 
        prevTotalPrice + (+product.price), 0)}
      </p>
    </div>
  );
}


ShoppingCart.propTypes = {
  productsToBuy: PropTypes.array.isRequired,
  onRemoveProductFromCart: PropTypes.func.isRequired,
};
