import Product from "./Product";
import AllPizza from "../allProducts";

function Products() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-lg font-bold my-8">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 my-8 gap-12 sm:gap-y-15 justify-items-center justify-center">
        {AllPizza.map((product) => (
          <Product key={product._id.$oid} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
