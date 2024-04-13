import { useCart } from "./CartContext";

const Categories = () => {
  const { categories, filterCategory } = useCart();

  const handleChange = (category) => (event) => {
    // Call filterCategory with the category and checkbox state
    filterCategory(category, event.target.checked);
  };

  return (
    <div className="mr-10">
      <h1 className="text-2xl font-bold border-b-2 p-2 mb-5">Categories</h1>
      {categories.map((category, index) => (
        <div
          className="form-control btn bg-inherit border-none mb-4 p-2 relative w-48"
          key={index}
        >
          <label className="cursor-pointer label">
            <input
              type="checkbox"
              className="checkbox absolute left-2"
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
