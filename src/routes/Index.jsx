import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx"
import Footer from "@/pages/Footer.jsx";
import StockWatchlist from "@/pages/StockWatchList.jsx";
const Index = () => {
  return (
 <div className="flex min-h-screen max-w-full">
  <div className="w-[75%] bg-(--color-slate-900)">
    <Navbar />
    <Outlet />
    <Footer />
  </div>
<div className="hidden lg:block lg:w-1/4 xl:w-1/5">      <StockWatchlist/>
    </div>
</div>

  );
};

export default Index;
