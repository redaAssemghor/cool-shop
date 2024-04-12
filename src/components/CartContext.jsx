import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext({
  items: [],
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  cartCount: 0,
  itemsPrice: 0,
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [items, setItems] = useState([]);
  const [itemsPrice, setItemsPrice] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();

      const itemsWithIsAdded = data.map((item) => ({
        ...item,
        isAdded: false,
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
      (acc, item) => acc + item.price,
      0
    );
    setItemsPrice(totaleItemsPrice);
    console.log(itemsPrice);
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

  return (
    <CartContext.Provider
      value={{
        items,
        cartItems,
        addToCart,
        removeFromCart,
        cartCount: cartItems.length,
        itemsPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
