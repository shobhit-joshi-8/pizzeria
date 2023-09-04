import React from "react";
import Products from "../components/Products";

function Home() {
  return (
    <>
      {/* hero section */}

      <div className="hero py-8 px-4  ">
        <div className="container mx-auto flex flex-col-reverse gap-4 sm:flex-row items-center justify-around ">
          <div className="w1/2 flex flex-col ">
            <h6 className="text-lg text-center sm:text-left">
              <em>Are you Hungry?</em>
            </h6>
            <h1 className="text-3xl md:text-6xl font-bold">Don't Wait</h1>
            <button className="px-6 py-2 md:w-1/2 rounded-full font-bold mt-4 bg-yellow-500 hover:bg-yellow-600">
              Order Now
            </button>
          </div>
          <div className="w1/2">
            <img src="/images/pizza.png" alt="pizza" />
          </div>
        </div>
      </div>

      {/* products section */}

      <div className="pb-24 overflow-hidden px-4 ">
        <Products />
      </div>
    </>
  );
}

export default Home;
