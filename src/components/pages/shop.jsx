import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Shop() {
  const [items, setItems] = useState([]);
  const [addedToCart, setAddedToCart] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();

      const itemsWithIsAdded = data.map((item) => ({
        ...item,
        isAdded: false,
      }));
      setItems(itemsWithIsAdded);
    }
    fetchData();
  }, []);

  useEffect(() => {
    setAddedToCart(items.filter((item) => item.isAdded));
    console.log(addedToCart);
  }, [items]);

  const addToCart = (id) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, isAdded: true };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, isAdded: false };
        }
        return item;
      })
    );
  };

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
