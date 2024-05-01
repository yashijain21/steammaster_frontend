import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
    return (
        <div className="font-inter">
            <Toaster />
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;
