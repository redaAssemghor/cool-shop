import { useCart } from "../CartContext";

function Votcher() {
  const { cartItems, totalItemsPrice } = useCart();

  const handleClick = () => {
    alert(
      "Congratulations! You would have made a successful purchase if this was a real store 😁"
    );
  };

  return (
    <div>
      <h1 className="text-2xl p-2 mb-8 font-bold">Order Summary</h1>
      <ul className="border-b-2">
        {cartItems.map((item) => (
          <li key={item.id} className="mb-9 text">
            {item.title}
          </li>
        ))}
      </ul>
      <div className="flex justify-between m-5">
        <h1 className="font-bold">Total:</h1>
        <h1 className="font-bold">{totalItemsPrice}$</h1>
      </div>
      <p></p>
      <h1></h1>
      <button className="btn btn-primary w-40 mt-2 " onClick={handleClick}>
        Check Out
      </button>
    </div>
  );
}

export default Votcher;
