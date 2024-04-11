import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Item() {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { itemId } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${itemId}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setItem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [itemId]);

  console.log(itemId);

  if (loading) return <h1>its loaging ...</h1>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <figure>
        <img src={item.image} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.title}</h2>
        <p>{item.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default Item;
