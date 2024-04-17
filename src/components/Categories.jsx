import { useCart } from "./CartContext";

const Categories = () => {
  const { categories, filterCategory, isLoading, activeCategories } = useCart();

  const handleChange = (category) => (event) => {
    filterCategory(category, event.target.checked);
  };

  const categoriesCount = 5;

  return (
    <div className="mr-10">
      <h1 className="text-2xl font-bold border-b-2 p-2 mb-5">Categories</h1>
      {isLoading
        ? Array.from({ length: categoriesCount }, (_, index) => (
            <div
              className="skeleton h-6 bg-gray-300 w-48 my-9 p-2"
              key={index}
            ></div>
          ))
        : categories.map((category, index) => (
            <div
              className="form-control btn bg-inherit border-none mb-4 p-2 relative w-48"
              key={index}
            >
              <label className="cursor-pointer label">
                <input
                  type="checkbox"
                  className="checkbox absolute left-2"
                  checked={activeCategories.has(category)}
                  onChange={handleChange(category)}
                />
                <span className="label-text ml-1">{category}</span>
              </label>
            </div>
          ))}
    </div>
  );
};

export default Categories;
