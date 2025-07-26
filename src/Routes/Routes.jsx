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
import AdminRoute from "./AdminRoute";
import { baseUrl } from "../hooks/useAxiosPublic";
import Booking from "../components/Appoinment/BookingForm"
import Faq from "../components/Faq/Faq"
import CategoryDetails from "../pages/CategoryDeatail/CategoryDetail";
import ThankYou from "../components/Appoinment/Thankyou";
import ContactUs from "../pages/Contact-US";
import AboutUs from "../pages/Aboutus";
import AppointmentsDashboard from "../components/Appoinment/Appoinment_dasboard";
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
                path: "/contactus",
                element: <ContactUs/>,
            },
             {
                path: "/about",
                element:<AboutUs/>,
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
                path: "/appoinment",
                element: <Booking />,
            },
            {
                path:"/thank-you",
                element:<ThankYou/>
            },
            {
                path:"/appoinment-dashboard",
                element:<AppointmentsDashboard/>
            },
              {
                path: "/FAQ",
                element: <Faq />,
            },

            {
                path: "/service/:id",
                element: <ServiceDetails />,
                loader: ({ params }) =>
                    fetch(`${baseUrl}/services/${params.id}`),
            },
             {
                path: "/category/:id",
                element: <CategoryDetails />,
                loader: ({ params }) =>
                    fetch(`${baseUrl}/categories/${params.id}`),
            },
            {
                path: "/service/:id/checkout",
                element: (
                    <PrivetRoute>
                        <CheckOut />
                    </PrivetRoute>
                ),
                loader: ({ params }) =>
                    fetch(`${baseUrl}/services/min/${params.id}`),
            },
            {
                path: "/product/:id/checkout",
                element: (
                    <PrivetRoute>
                        <CheckOut />
                    </PrivetRoute>
                ),
                loader: ({ params }) =>
                    fetch(`${baseUrl}/products/${params.id}`),
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
                    <AdminRoute>
                        <ManageOrders />
                    </AdminRoute>
                ),
            },
        ],
    },
]);

export default router;
