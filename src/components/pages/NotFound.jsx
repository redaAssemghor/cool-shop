import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold">Oooops 😬</h1>
      <p className="font-bold my-7">404 - Page Not Found 😵</p>
      <p className="font-semibold">
        You can go back home
        <Link className="hover:underline" to={"/"}>
          {" "}
          by clicking here!
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
