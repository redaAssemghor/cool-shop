import {
  faArrowLeft,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext";
import { useState } from "react";

function CheckOut() {
  const { cartItems } = useCart();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="m-9">
      <Link to="/shop">
        <FontAwesomeIcon className="h-7 mb-3" icon={faArrowLeft} />
      </Link>
      {cartItems.map((item) => (
        <div className="card card-side shadow-xl" key={item.id}>
          <figure className="max-w-20">
            <img src={item.image} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{item.title}</h2>
            <h2 className="font-light">{item.category}</h2>
          </div>
          <div className="flex items-center">
            <button onClick={() => setQuantity((q) => Math.max(q - 1, 1))}>
              <FontAwesomeIcon
                className="border-2 p-1 mt-2 rounded-lg hover:bg-gray-100"
                icon={faMinus}
              />
            </button>
            <span className="text-2xl font-medium mx-4">{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)}>
              <FontAwesomeIcon
                className="border-2 p-1 mt-2 rounded-lg hover:bg-gray-100"
                icon={faPlus}
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CheckOut;
