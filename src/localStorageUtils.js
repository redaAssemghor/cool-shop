export const saveToLocalStorage = (key, value) => {
  try {
    console.log("Saving local utils", key, value);
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (e) {
    console.error("Error saving to localStorage", e);
  }
};

export const loadFromLocalStorage = (key, defaultValue) => {
  try {
    console.log("load local utils", key, defaultValue);

    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      console.log(
        "No value found in localStorage, returning defaultValue:",
        defaultValue
      );
      return defaultValue;
    }
    return JSON.parse(serializedValue);
  } catch (e) {
    console.error("Error loading from localStorage", e);
    return defaultValue;
  }
};
