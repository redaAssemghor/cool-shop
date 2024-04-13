import { Link } from "react-router-dom";
import { useCart } from "../CartContext";
import { useState } from "react";
import Pagination from "../Pagination";
import Categories from "../Categories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faBagShopping } from "@fortawesome/free-solid-svg-icons";

function Shop() {
  const { filteredItems, addToCart, removeFromCart, activeCategories } =
    useCart();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="m-8">
      <div className="flex">
        <Categories />
        <div>
          <div className="m-2">
            <h1 className="font-bold mb-4">Items({filteredItems.length})</h1>
            {[...activeCategories].map((category) => (
              <span
                key={category}
                className="bg-blue-200 text-blue-800 text-sm font-semibold mr-2 p-2 rounded-full dark:bg-blue-200 dark:text-blue-800"
              >
                <FontAwesomeIcon icon={faTag} /> {category}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-3 mt-7">
            {currentItems.map((item) => (
              <div key={item.id} className="card card-compact shadow-xlm-2">
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
                        className="btn"
                        onClick={() => addToCart(item.id)}
                      >
                        Add To Cart
                        <FontAwesomeIcon className="" icon={faBagShopping} />
                      </button>
                    ) : (
                      <button
                        className="btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove From Cart
                        <FontAwesomeIcon icon={faBagShopping} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={filteredItems.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default Shop;
