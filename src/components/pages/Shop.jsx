import { Link } from "react-router-dom";
import { useCart } from "../CartContext";
import { useState } from "react";
import Pagination from "../Pagination";

function Shop() {
  const { items, addToCart, removeFromCart } = useCart();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="grid grid-cols-3 m-5">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="card card-compact shadow-xl border-2 m-2"
          >
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
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={items.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

export default Shop;
