import React, { useState, useEffect } from "react";
import ProductsList from "./components/ProductsList.jsx";
import CreatProductForm from "./components/CreatProductForm.jsx"
import UpdateProduct from './components/UpdateProduct';
import ShoppingCart from "./components/ShoppingCart.jsx"
import {myFirebase} from "./models/MyFirebase.js"
import "./App.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [productsToBuy, setProductsToBuy] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    (async () => {
      const products = await myFirebase.getProducts();
      setProducts(products);
    })();
  }, []);

  const refreshProducts = async () => {
    const updatedProducts = await myFirebase.getProducts();
    setProducts(updatedProducts);
  };

  const onAddProduct = async (newProduct) => {
    await myFirebase.createProduct(newProduct);
    const updatedProducts = await myFirebase.getProducts();
    setProducts([...products, newProduct]);
    refreshProducts();

    if (updatedProducts.length / productsPerPage > currentPage) {
      setCurrentPage(currentPage + 1);
      setTimeout(() => window.scrollTo(0, 0), 0);
    }
  };

  const onAddProductToBuy = (product) => {
    setProductsToBuy([...productsToBuy, product]);
  };

  const onDeleteProduct = async (productId) => {
    await myFirebase.deleteProduct(productId);
    const updatedProducts = await myFirebase.getProducts();
    setProducts(updatedProducts); 

    const updatedTotalPages = Math.ceil(updatedProducts.length / productsPerPage);
    if (currentPage > updatedTotalPages) {
      setCurrentPage((prevCurrentPage) => Math.max(prevCurrentPage - 1, 1));
    }

    const updatedProductsToBuy = productsToBuy.filter(product => product.id !== productId);
    setProductsToBuy(updatedProductsToBuy); 
    refreshProducts();
  };

  const onUpdateProduct = async (productId, updatedProductInfo) => {
    await myFirebase.updateProduct(productId, updatedProductInfo);
    const updatedProducts = await myFirebase.getProducts();
    setProducts(updatedProducts); 
    refreshProducts();

    const updatedProductsToBuy = productsToBuy.map(product => {
      if (product.id === productId) {
        return { ...product, ...updatedProductInfo };
      }
      return product;
    });
    setProductsToBuy(updatedProductsToBuy);
    setShowUpdateModal(false); 
  };

  const onEditProduct = (product) => {
    setCurrentProduct(product); 
    setShowUpdateModal(true); 
  };

  const onRemoveProductFromCart = (index) => {
    const newProductsToBuy = productsToBuy.filter((_, i) => i !== index);
    setProductsToBuy(newProductsToBuy);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  let pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
        <a className="page-link" href="#" onClick={(e) => 
          {e.preventDefault(); paginate(i);}}>{i}
        </a>
      </li>
    );
  }

  return (
    <div>
      <div className="row">
        <div className="col-8">
          <h1>Shopping site</h1>
          <ProductsList
            products={currentProducts}
            onAddProductToBuy={onAddProductToBuy}
            onDeleteProduct={onDeleteProduct}
            onEditProduct={onEditProduct}
          />
          
          {showUpdateModal && currentProduct && (
            <UpdateProduct
              show={showUpdateModal}
              product={currentProduct}
              onUpdateProduct={onUpdateProduct}
              onClose={() => setShowUpdateModal(false)}
            />
          )}
          <p>Number of products: {products.length}</p>
          <p>Total pages: {totalPages}</p>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <a className="page-link" href="#" onClick={(e) => 
                  {e.preventDefault(); paginate(currentPage - 1);}}>Previous
                </a>
              </li>
              {pages}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <a className="page-link" href="#" onClick={(e) => 
                  {e.preventDefault(); paginate(currentPage + 1);}}>Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="col-4">
          <h2>Shopping Cart</h2>
          <ShoppingCart
            productsToBuy={productsToBuy}
            onRemoveProductFromCart={(index) => {
              const newProductsToBuy = productsToBuy.filter((_, i) => i !== index);
              setProductsToBuy(newProductsToBuy);
            }}
          />
        </div>
        <CreatProductForm onAddProduct={onAddProduct} />
      </div>
    </div>
  );
}