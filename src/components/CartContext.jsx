import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext({
  items: [],
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  cartCount: 0,
  totalItemsPrice: 0,
  incrementQuantity: () => {},
  decrementQuantity: () => {},
  deleteItem: () => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [items, setItems] = useState([]);
  const [totalItemsPrice, setTotalItemsPrice] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();

      const itemsWithIsAdded = data.map((item) => ({
        ...item,
        isAdded: false,
        quantity: 1,
      }));
      setItems(itemsWithIsAdded);
    }
    fetchData();
  }, []);

  useEffect(() => {
    setCartItems(items.filter((item) => item.isAdded));
  }, [items]);

  useEffect(() => {
    const totaleItemsPrice = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalItemsPrice(totaleItemsPrice);
  }, [cartItems]);

  const addToCart = (id) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, isAdded: true };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, isAdded: false };
        }
        return item;
      })
    );
  };

  const incrementQuantity = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      )
    );
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        items,
        cartItems,
        addToCart,
        removeFromCart,
        cartCount: cartItems.length,
        totalItemsPrice,
        incrementQuantity,
        decrementQuantity,
        deleteItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
