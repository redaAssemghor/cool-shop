import { createContext, useContext, useEffect, useState } from "react";
import { loadFromLocalStorage, saveToLocalStorage } from "../localStorageUtils";

const CartContext = createContext({
  items: [],
  categories: [],
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  cartCount: Number,
  totalItemsPrice: 0,
  incrementQuantity: () => {},
  decrementQuantity: () => {},
  deleteItem: () => {},
  filterCategory: () => {},
  filteredItems: [],
  activeCategories: [],
  isLoading: Boolean,
  getFilteredItems: () => {},
  queriedItems: [],
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    return loadFromLocalStorage("LOCAL_CART_KEY", []);
  });

  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeCategories, setActiveCategories] = useState(new Set());
  const [totalItemsPrice, setTotalItemsPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [queriedItems, setQueriedItems] = useState([]);

  const getFilteredItems = (query) => {
    if (!query) {
      setQueriedItems(items);
    } else {
      const filtered = items.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setQueriedItems(filtered);
    }
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        const storedCart = loadFromLocalStorage("LOCAL_CART_KEY", []);
        const itemsWithAdded = data.map((item) => ({
          ...item,
          isAdded: storedCart.some((cartItem) => cartItem.id === item.id),
          quantity: 1,
        }));
        setItems(itemsWithAdded);
        setFilteredItems(itemsWithAdded);
        setCategories(Array.from(new Set(data.map((item) => item.category))));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      const updatedCartItems = items.filter((item) => item.isAdded);
      setCartItems(updatedCartItems);
      setTotalItemsPrice(
        updatedCartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        )
      );
    }
  }, [items]);

  useEffect(() => {
    if (activeCategories.size > 0) {
      setFilteredItems(
        items.filter((item) => activeCategories.has(item.category))
      );
    } else {
      setFilteredItems(items);
    }
  }, [items, activeCategories]);

  useEffect(() => {
    saveToLocalStorage("LOCAL_CART_KEY", cartItems);
  }, [cartItems]);

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
        getFilteredItems,
        queriedItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
