import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import { useState } from "react";

function Navbar() {
  const { cartItems, totalItemsPrice, getFilteredItems } = useCart();
  const itemsCount = cartItems.length;

  const [query, setQuery] = useState("");

  return (
    <div
      className="navbar bg-base-100"
      style={{ position: "sticky", top: 0, zIndex: 1000 }}
    >
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" to="/">
          Home
        </Link>
        <Link className="btn btn-ghost text-xl" to="/shop">
          Shop
        </Link>
      </div>
      <div className="flex-none">
        <label className="input input-bordered flex items-center gap-2 mr-1">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            onChange={(e) => {
              const newQuery = e.target.value;
              setQuery(newQuery);
              getFilteredItems(newQuery);
            }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">
                {itemsCount}
              </span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg">{itemsCount} Items</span>
              <span className="text-info">
                Total Price : {totalItemsPrice}$
              </span>
              <div className="card-actions">
                <Link className="btn btn-primary btn-block" to={"/checkout"}>
                  View cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
