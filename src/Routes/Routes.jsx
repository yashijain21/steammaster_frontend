import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ServiceDetails from "../pages/ServiceDetails/ServiceDetails";
import CheckOut from "../pages/CheckOut/CheckOut";
import PrivetRoute from "./PrivetRoute";
import OrderList from "../pages/OrderList/OrderList";
import OrderDetails from "../pages/OrderDetails/OrderDetails";
import ManageOrders from "../pages/ManageOrders/ManageOrders";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/service/:id",
                element: <ServiceDetails />,
                loader: ({ params }) =>
                    fetch(`http://localhost:5000/services/${params.id}`),
            },
            {
                path: "/service/:id/checkout",
                element: (
                    <PrivetRoute>
                        <CheckOut />
                    </PrivetRoute>
                ),
                loader: ({ params }) =>
                    fetch(`http://localhost:5000/services/min/${params.id}`),
            },
            {
                path: "/product/:id/checkout",
                element: (
                    <PrivetRoute>
                        <CheckOut />
                    </PrivetRoute>
                ),
                loader: ({ params }) =>
                    fetch(`http://localhost:5000/products/${params.id}`),
            },
            {
                path: "/orders",
                element: (
                    <PrivetRoute>
                        <OrderList />
                    </PrivetRoute>
                ),
            },
            {
                path: "/order-details/:id",
                element: (
                    <PrivetRoute>
                        <OrderDetails />
                    </PrivetRoute>
                ),
            },
            {
                path: "/manage-orders",
                element: (
                    <PrivetRoute>
                        <ManageOrders />
                    </PrivetRoute>
                ),
            },
        ],
    },
]);

export default router;
