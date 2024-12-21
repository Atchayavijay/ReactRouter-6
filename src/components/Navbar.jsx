// components/Navbar.jsx
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { state } = useContext(CartContext);
  const totalItems = state.items.reduce(
    (total, item) => total + item.quantity,
    0
  ); // Total items in the cart

  return (
    <nav className="flex justify-around items-center bg-pink-900 p-4 text-white">
      <Link to="/" className="font-bold font-orbitron text-lg lg:text-4xl tracking-widest">
        E-commerce
      </Link>
      <div className="flex justify-center items-center shrink-0">
        <div className="hover:scale-90">
          <Link
            to="/"
            className="border-2 border-white bg-white mr-4 px-2 lg:px-8 py-1 lg:py-2 rounded-xl font-bold font-poppins text-black text-sm"
          >
            Products
          </Link>
        </div>
        <div className="hover:scale-90">
          <Link
            to="/cart"
            className="relative border-2 border-white px-2 lg:px-6 py-1 lg:py-2 rounded-xl font-bold font-poppins text-sm active:scale-90"
          >
            Cart -<span className="pl-2">{totalItems}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
