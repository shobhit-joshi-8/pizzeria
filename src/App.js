import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import ProductsPage from "./pages/ProductsPage";
import Cart from "./components/Cart";
import SingleProduct from "./pages/SingleProduct";
import { CartContext } from "./CartContext";
import { useEffect, useState } from "react";
import { getCart } from "./helpers";
import { storeCart } from "./helpers";

function App() {
  const [cart, setCart] = useState({});

  // fetch from local storage
  useEffect(() => {
    getCart().then((cart) => {
      setCart(JSON.parse(cart));
    });

    // console.log(JSON.parse(cart));
  }, []);

  useEffect(() => {
    // console.log("Saving cart to local storage:", cart);
    storeCart(JSON.stringify(cart));
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div>
      <BrowserRouter>
        <CartContext.Provider value={{ cart, setCart }}>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/products" exact element={<ProductsPage />}></Route>
            <Route path="/products/:_id" element={<SingleProduct />} />
            <Route path="/cart" element={<Cart />}></Route>
          </Routes>
        </CartContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
