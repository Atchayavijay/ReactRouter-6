// components/Cart.js
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { state, dispatch } = useContext(CartContext);

  const totalPrice = state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const finalPrice = totalPrice * 0.9; // Apply 10% discount

  return (
    <div className="px-8 lg:px-16 pt-10 pb-10 font-poppins">
      <h1 className="mb-4 font-bold font-poppins text-5xl">Your Cart</h1>
      {state.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="">
          {state.items.map((item) => (
            <div
              key={item.id}
              className="flex lg:flex-row flex-col justify-between items-center mb-4 pb-2 border-b"
            >
              <div className="space-y-3">
                <h3 className="font-poppins font-semibold md:text-xl lg:text-lg">
                  {item.title}
                </h3>
                <p>${item.price}</p>
                <div className="flex justify-between lg:justify-start items-center space-x-2 lg:space-x-10">
                  <button
                    className="border-2 bg-red-500 hover:bg-transparent px-2 lg:px-8 py-1 lg:py-2 border-red-500 rounded-lg font-bold text-center text-white text-xs lg:text-lg hover:text-red-500"
                    onClick={() =>
                      dispatch({ type: "REMOVE_FROM_CART", payload: item })
                    }
                  >
                    Remove from Cart
                  </button>
                  <div className="flex">
                    <button
                      className="bg-black px-2 lg:px-2 rounded-lg font-bold text-white lg:text-2xl hover:scale-90"
                      onClick={() =>
                        dispatch({
                          type: "UPDATE_QUANTITY",
                          payload: { id: item.id, quantity: item.quantity - 1 },
                        })
                      }
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      className="bg-black px-2 lg:px-2 rounded-lg font-bold text-white lg:text-2xl hover:scale-90"
                      onClick={() =>
                        dispatch({
                          type: "UPDATE_QUANTITY",
                          payload: { id: item.id, quantity: item.quantity + 1 },
                        })
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <p className="pt-10">
                <span className="text-xl">Total:</span>{" "}
                <span className="font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </p>
            </div>
          ))}
          <div className="space-y-4 mt-6">
            <h1 className="lg:text-xl">
              Subtotal:{" "}
              <span className="font-bold">${totalPrice.toFixed(2)}</span>{" "}
            </h1>
            <h1 className="lg:text-2xl">
              Final Price (10% discount):{" "}
              <span className="font-bold"> ${finalPrice.toFixed(2)}</span>
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
