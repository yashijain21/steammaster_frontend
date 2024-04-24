import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div className="font-inter">
            <Outlet />
        </div>
    );
};

export default MainLayout;
