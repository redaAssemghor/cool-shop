import { Link } from "react-router-dom";

function Hero() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-4xl font-bold">Welcome To Cool Shop!</h1>
          <p className="mb-5">
            Discover our selection of stuff, bursting with flavor and vitality.
            Delivered straight from the farm to your table.
          </p>
          <Link className="btn btn-primary" to={"/shop"}>
            Shop Now!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
