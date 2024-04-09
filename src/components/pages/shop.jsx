import { useState, useEffect } from "react";

function Shop() {
  const [items, setItems] = useState([]);

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
          <a href="">
            <figure>
              <img className="w-[200px]" src={item.image} alt="image" />
            </figure>
          </a>
          <div className="card-body justify-end">
            <h2 className="card-title">{item.title}</h2>
            <h2 className="card-title">{item.price}$</h2>
            <div className="">
              <button className="btn btn-primary">Add To Cart</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Shop;
