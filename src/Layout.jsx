import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 overflow-auto">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
