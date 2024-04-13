import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext({
  items: [],
  categories: [],
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  cartCount: 0,
  totalItemsPrice: 0,
  incrementQuantity: () => {},
  decrementQuantity: () => {},
  deleteItem: () => {},
  filterCategory: () => {},
  filteredItems: [],
  activeCategories: [],
  isLoading: Boolean,
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeCategories, setActiveCategories] = useState(new Set());
  const [totalItemsPrice, setTotalItemsPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      const itemsWithAdded = data.map((item) => ({
        ...item,
        isAdded: false,
        quantity: 1,
      }));
      setItems(itemsWithAdded);
      setIsLoading(false);
      setFilteredItems(itemsWithAdded);
      setCategories(Array.from(new Set(data.map((item) => item.category))));
    }
    fetchData();
  }, []);

  useEffect(() => {
    setCartItems(items.filter((item) => item.isAdded));
    setTotalItemsPrice(
      cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );
  }, [items, cartItems]);

  useEffect(() => {
    if (activeCategories.size > 0) {
      setFilteredItems(
        items.filter((item) => activeCategories.has(item.category))
      );
    } else {
      setFilteredItems(items);
    }
  }, [items, activeCategories]);

  const addToCart = (id) =>
    setItems(
      items.map((item) => (item.id === id ? { ...item, isAdded: true } : item))
    );
  const removeFromCart = (id) =>
    setItems(
      items.map((item) => (item.id === id ? { ...item, isAdded: false } : item))
    );
  const incrementQuantity = (id) =>
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  const decrementQuantity = (id) =>
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      )
    );
  const deleteItem = (id) => setItems(items.filter((item) => item.id !== id));

  const filterCategory = (category, isActive) => {
    const updatedActiveCategories = new Set(activeCategories);
    if (isActive) {
      updatedActiveCategories.add(category);
    } else {
      updatedActiveCategories.delete(category);
    }
    setActiveCategories(updatedActiveCategories);
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
        categories,
        filterCategory,
        filteredItems,
        activeCategories,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
