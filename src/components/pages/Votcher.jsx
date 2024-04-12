import { useCart } from "../CartContext";

function Votcher() {
  const { cartItems, totalItemsPrice } = useCart();

  return (
    <div>
      <h1>Order Summary</h1>
      <h1>{totalItemsPrice}</h1>
      <p></p>
      <p></p>
      <h1></h1>
      <button className="btn btn-primary w-40 mt-2 ">Check Out</button>
    </div>
  );
}

export default Votcher;
