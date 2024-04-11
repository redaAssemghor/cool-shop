import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Shop() {
  const [items, setItems] = useState([]);
  const [addItem, setAddItem] = useState(null);
  const [click, setClick] = useState(null);

  const handelClick = () => {
    setAddItem(addItem + 1);
    setClick(true);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setItems(data);
    }
    fetchData();
  }, []);

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
              <button className="btn btn-primary" onClick={handelClick}>
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Shop;
