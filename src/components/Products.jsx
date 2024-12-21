// components/Products.js
import  { useEffect, useState, useContext } from "react";
import { fetchProducts } from "../services/ApiService";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { state, dispatch } = useContext(CartContext); // Access cart state and dispatch function

  useEffect(() => {
    fetchProducts().then((data) => setProducts(data));
  }, []);

  // Check if a product is already in the cart
  const isInCart = (productId) => {
    return state.items.some((item) => item.id === productId);
  };

  return (
    <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-16 p-6 font-poppins text-center">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex flex-col justify-center items-center shadow-gray-300 shadow-inner hover:shadow-lg p-4 rounded-lg transition hover:scale-105"
        >
          <img
            src={product.image}
            alt={product.title}
            className="mb-4 h-40 scale-75"
          />
          <h2 className="mb-2 font-Orbitron text-center text-sm">
            {product.title}
          </h2>
          {/* <p className="text-sm">{product.description.slice(0, 100)}...</p> */}
          <p className="mb-3 font-bold text-xl">${product.price}</p>

          {/* Link to product details page */}

          <Link
            to={`/product/${product.id}`}
            className="block border-2 bg-blue-900 hover:bg-transparent mt-2 p-2 border-black rounded-lg w-full font-bold text-center text-white hover:text-black scale-90"
          >
            View Product
          </Link>

          {/* Add or Remove from Cart button */}
          {isInCart(product.id) ? (
            <button
              onClick={() =>
                dispatch({ type: "REMOVE_FROM_CART", payload: product })
              }
              className="block border-2 bg-red-700 hover:bg-transparent mt-2 p-2 border-red-700 rounded-lg w-full font-bold text-center text-white hover:text-red-500 scale-90"
            >
              Remove from Cart
            </button>
          ) : (
            <button
              onClick={() =>
                dispatch({ type: "ADD_TO_CART", payload: product })
              }
              className="block border-2 bg-black hover:bg-transparent mt-2 p-2 border-black rounded-lg w-full font-bold text-center text-white hover:text-black scale-90"
            >
              Add to Cart
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Products;
