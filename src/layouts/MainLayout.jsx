import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import BubbleBackground from "../components/Bubble/BubbleAnimation"; // ✅ Import it

const MainLayout = () => {
  return (
    <div className="font-inter relative min-h-screen bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Toast notifications */}
      <Toaster />

      {/* Bubbles in the background for all pages */}
      

      {/* Actual page content above the bubbles */}
      <div className="relative z-10">
        <Header />
        <BubbleBackground />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
