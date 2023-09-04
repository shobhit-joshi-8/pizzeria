import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { CartContext } from "../CartContext";
import pizzas from "../allProducts";
import { toast } from "react-hot-toast";

function Cart() {
  let total = 0;
  const { cart, setCart } = useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (!cart.items) {
      return;
    }

    // console.log("cart", Object.keys(cart.items));

    const newCartItems = Object.keys(cart.items).map((id) => {
      const pizza = pizzas.find((pizza) => pizza._id.$oid === id);
      return {
        ...cart.items[id],
        pizza,
      };
    });

    setCartItems(newCartItems);
  }, [cart]);

  // console.log(cartItems);

  const getQty = (productID) => {
    return cart.items[productID];
  };

  const increment = (productID) => {
    const exixstingQty = cart.items[productID];
    const _cart = { ...cart };
    _cart.items[productID] = exixstingQty + 1;
    _cart.totalItems += 1;
    setCart(_cart);
  };

  const decrement = (productID) => {
    const exixstingQty = cart.items[productID];

    if (exixstingQty === 1) {
      return;
    }

    const _cart = { ...cart };
    _cart.items[productID] = exixstingQty - 1;
    _cart.totalItems -= 1;
    setCart(_cart);
  };

  const getSum = (productID, price) => {
    const sum = price * getQty(productID);
    total += sum;
    return sum;
  };

  const handleDelete = (productID) => {
    const _cart = { ...cart };
    const quantity = _cart.items[productID];
    delete _cart.items[productID];
    _cart.totalItems -= quantity;
    setCart(_cart);
    setCartItems(
      cartItems.filter((product) => product.pizza._id.$oid !== productID)
    );

    toast.error("Item Deleted");
  };

  const handleOrderNow = () => {
    window.alert("order placed successfully");
    setCartItems([]);
    setCart({});
  };
  // console.log(cart.totalItems);
  // console.log(cart);

  return (
    <>
      {cartItems.length ? (
        <div className="container mx-auto lg:w-1/2 w-full pb-24 px-4 sm:px-0">
          <h1 className="my-12 font-bold">Cart Items</h1>
          <ul>
            {cartItems.map((cartItem) => (
              <li className="mb-8" key={cartItem.pizza._id.$oid}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-around sm:gap-8 px-1 py-3  sm:px-1 sm:py-7 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
                  <div className="flex items-center justify-between gap-4 ">
                    <div className="flex items-center">
                      {/* {console.log(cartItem.pizza._id.$oid)} */}
                      <img
                        src={cartItem.pizza.image}
                        alt={cartItem.pizza.name}
                        className="h-16"
                      />
                      <span className="font-bold ml-4 w-48 ">
                        {cartItem.pizza.name}
                      </span>
                    </div>
                    <div className="flex">
                      <button
                        className="bg-yellow-500 px-4 py-2 rounded-full leading-none"
                        onClick={() => {
                          decrement(cartItem.pizza._id.$oid);
                        }}
                      >
                        -
                      </button>
                      <b className="px-4">{getQty(cartItem.pizza._id.$oid)}</b>
                      <button
                        className="bg-yellow-500 px-4 py-2 rounded-full leading-none"
                        onClick={() => {
                          increment(cartItem.pizza._id.$oid);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center sm:gap-8">
                    <span>
                      ₹ {getSum(cartItem.pizza._id.$oid, cartItem.pizza.price)}
                    </span>
                    <button
                      className="bg-red-500 sm:hover:bg-red-700 transition duration-200 ease-in px-2 py-1 text-sm sm:px-4 sm:py-2 rounded-full leading-none text-white"
                      onClick={() => {
                        handleDelete(cartItem.pizza._id.$oid);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <hr className="my-6" />
          <div className="text-right">
            <b>Grand Total : </b> ₹{total}
          </div>
          <div className="text-right mt-6">
            <button
              className="bg-yellow-500 px-4 py-2 rounded-full leading-none"
              onClick={handleOrderNow}
            >
              Order Now
            </button>
          </div>
        </div>
      ) : (
        <img
          className="mx-auto w-1/2 mt-12"
          src="../images/empty-cart.png"
          alt="empty cart"
        />
      )}
    </>
  );
}

export default Cart;
