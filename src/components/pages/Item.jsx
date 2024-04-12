import {
  faArrowLeft,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";

function Item() {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatedQuantity, setUpdatedQuantity] = useState(1);

  const { itemId } = useParams();

  const { addToCart } = useCart();
  const navigate = useNavigate();

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

  if (loading)
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  const buyNow = (id) => {
    addToCart(id);
    navigate("/checkout");
  };
  return (
    <div className="m-9">
      <Link to="/shop">
        <FontAwesomeIcon className="h-7 mb-3" icon={faArrowLeft} />
      </Link>
      <div className="card card-side shadow-xl">
        <figure className="max-w-96">
          <img src={item.image} />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-3xl">{item.title}</h2>
          <h2 className="font-light">{item.category}</h2>
          <h2 className="card-title font-bold">
            ${item.price * updatedQuantity}
          </h2>
          <div className="flex items-center">
            <button
              onClick={() => setUpdatedQuantity((q) => Math.max(q - 1, 1))}
            >
              <FontAwesomeIcon
                className="border-2 p-1 mt-2 rounded-lg hover:bg-gray-100"
                icon={faMinus}
              />
            </button>
            <span className="text-2xl font-medium mx-4">{updatedQuantity}</span>
            <button onClick={() => setUpdatedQuantity((q) => q + 1)}>
              <FontAwesomeIcon
                className="border-2 p-1 mt-2 rounded-lg hover:bg-gray-100"
                icon={faPlus}
              />
            </button>
          </div>
          <div className="mt-8">
            <p>{item.description}</p>
            <div className="card-actions justify-end mt-5">
              <button
                className="btn btn-base-100 w-40 m-1"
                onClick={() => addToCart(item.id)}
              >
                Add to Cart
              </button>
              <button
                className="btn btn-primary w-40 m-1"
                onClick={() => buyNow(item.id)}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
