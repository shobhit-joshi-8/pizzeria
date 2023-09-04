import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AllPizza from "../allProducts";
import { CartContext } from "../CartContext";
import { toast } from "react-hot-toast";
// console.log(AllPizza);

function SingleProduct() {
  const { cart, setCart } = useContext(CartContext);
  const [isAdding, setIsAdding] = useState(false);

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

  const [product, setProduct] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  const fetchProduct = AllPizza.filter((obj) => obj._id.$oid === params._id)[0];

  useEffect(() => {
    setProduct(fetchProduct);
  }, [params._id]);

  return (
    <div className="container mx-auto mt-6 sm:mt-12 px-8 overflow-hidden">
      <button
        className="mb-6 sm:mb-12 font-bold"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>
      <div className="flex flex-col sm:flex-row justify-items-start gap-3 sm:gap-0 mb-10">
        <div className="flex justify-center items-center">
          <img src={product.image} alt="pizza" />
        </div>
        <div className="ml-8 sm:ml-16 text ">
          <h1 className="text-xl font-bold">{product.name}</h1>
          <div className="text-md">{product.size}</div>
          <div className="font-bold mt-2">₹{product.price}</div>
          <button
            // className="px-6 py-2 rounded-full  font-bold mt-4 bg-yellow-500 hover:bg-yellow-600"
            disabled={isAdding}
            className={`${
              isAdding ? "bg-green-500" : "bg-yellow-500"
            } py-2 px-6 rounded-full font-bold mt-4 hover:bg-yellow-600`}
            onClick={(e) => {
              addToCart(e, product);
            }}
          >
            {isAdding ? "Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
