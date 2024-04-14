import {
  faArrowLeft,
  faMinus,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext";
import Votcher from "./Votcher";

function CheckOut() {
  const { cartItems, incrementQuantity, decrementQuantity, deleteItem } =
    useCart();

  if (cartItems.length === 0) {
    return (
      <div className="text-center my-20">
        <h1>Your basket is empty</h1>
        <Link to="/shop" className="text-blue-500 hover:text-blue-700">
          Return to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="flex base-100 bg-base-100">
      <div className="m-9 w-2/3">
        <Link to="/shop">
          <FontAwesomeIcon className="h-7 mb-3" icon={faArrowLeft} />
        </Link>
        {cartItems.map((item) => (
          <div className="card card-side shadow-xl p-4 mb-5" key={item.id}>
            <figure className="max-w-20">
              <img src={item.image} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.title}</h2>
              <h2 className="font-light">{item.category}</h2>
            </div>
            <div className="flex items-center mr-4">
              <button onClick={() => decrementQuantity(item.id)}>
                <FontAwesomeIcon
                  className="border-2 p-1 mt-2 rounded-lg hover:bg-gray-100"
                  icon={faMinus}
                />
              </button>
              <span className="text-2xl font-medium mx-4">{item.quantity}</span>
              <button onClick={() => incrementQuantity(item.id)}>
                <FontAwesomeIcon
                  className="border-2 p-1 mt-2 rounded-lg hover:bg-gray-100"
                  icon={faPlus}
                />
              </button>
            </div>
            <div className="flex gap-4">
              <button onClick={() => deleteItem(item.id)}>
                <FontAwesomeIcon
                  className="border-2 p-1 mt-2 rounded-lg hover:bg-gray-100"
                  icon={faTrash}
                />
              </button>
              <h2 className="card-title">{item.price * item.quantity}$</h2>
            </div>
          </div>
        ))}
      </div>
      <div className="w-1/3 border-2 rounded-3xl p-8 m-9">
        <Votcher />
      </div>
    </div>
  );
}

export default CheckOut;
