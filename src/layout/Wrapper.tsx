import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Wrapper = () => {
  return (
    <div className="min-h-[100svh] flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Wrapper;
