import React from "react";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../CartContext";
import { toast } from "react-hot-toast";

function Product(props) {
  const [isAdding, setIsAdding] = useState(false);

  const { cart, setCart } = useContext(CartContext);

  // console.log(props);
  const { product } = props;

  const addToCart = (event, product) => {
    // console.log(product);
    event.preventDefault();

    // const cart = {
    //   items: {
    //     '608c2899e165f6137f02b54d' : 2,
    //     '608c2960e165f6137f02b552' : 3
    //   },
    //   totalItems : 5
    // }
    let _cart = { ...cart };

    // if cart is empty
    if (!_cart.items) {
      _cart.items = {};
    }

    // increasing quantity if same product is clicked again...

    if (_cart.items[product._id.$oid]) {
      _cart.items[product._id.$oid] = _cart.items[product._id.$oid] + 1;
    } else {
      _cart.items[product._id.$oid] = 1;
    }

    if (!_cart.totalItems) {
      _cart.totalItems = 0;
    }
    _cart.totalItems += 1;
    setCart(_cart);
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);

    toast.success("Item Added To Cart");
  };

  return (
    <Link to={`/products/${product._id.$oid}`}>
      <div className="border-[1px] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] px-3 rounded-lg pb-5  sm:hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]  transition duration-300 ease-in ">
        <img src={product.image} alt="pizza" />
        <div className="text-center">
          <h2 className="pb-1">{product.name}</h2>
          <span className="bg-gray-200 py-1 rounded-full text-sm px-4 mt-4">
            {product.size}
          </span>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span>₹ {product.price}</span>
          <button
            disabled={isAdding}
            className={`${
              isAdding ? "bg-green-500" : "bg-yellow-500"
            } py-1 px-4 rounded-full font-bold`}
            onClick={(e) => {
              addToCart(e, product);
            }}
          >
            Add{isAdding ? "ed" : ""}
          </button>
        </div>
        {/* pizza data */}
      </div>
    </Link>
  );
}

export default Product;
