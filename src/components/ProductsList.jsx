import PropTypes from "prop-types";
import Product from "./Product";

export default function ProductsList({ products, onAddProductToBuy, onDeleteProduct, onEditProduct }) {
  return (
    <>
      <h2>Products</h2>
      <div className="products row">
        {products.map((product) => (
          <Product 
            key={product.id}
            product={product}
            onAddProductToBuy={onAddProductToBuy}
            onDeleteProduct={onDeleteProduct}
            onEditProduct={onEditProduct} 
          />
        ))}
      </div>
    </>
  );
}

ProductsList.propTypes = {
  products: PropTypes.array.isRequired,
  onAddProductToBuy: PropTypes.func.isRequired,
  onDeleteProduct: PropTypes.func.isRequired,
  onEditProduct: PropTypes.func.isRequired, 
};
