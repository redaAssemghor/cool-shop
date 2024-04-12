import { Link } from "react-router-dom";
import { useCart } from "../CartContext";

function Shop() {
  const { items, addToCart, removeFromCart } = useCart();

  return (
    <div className="grid grid-cols-3 m-5">
      {items.map((item) => (
        <div key={item.id} className="card card-compact shadow-xl border-2 m-2">
          <Link to={`/shop/${item.id}`}>
            <figure>
              <img className="w-[200px]" src={item.image} alt="image" />
            </figure>
          </Link>
          <div className="card-body justify-end">
            <h2 className="card-title">{item.title}</h2>
            <h2 className="card-title">{item.price}$</h2>
            <div className="">
              {!item.isAdded ? (
                <button
                  className="btn btn-primary"
                  onClick={() => addToCart(item.id)}
                >
                  Add To Cart
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove from Cart
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Shop;
