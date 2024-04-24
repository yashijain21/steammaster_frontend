import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

const MainLayout = () => {
    return (
        <div className="font-inter">
            <Header />
            <Outlet />
        </div>
    );
};

export default MainLayout;
