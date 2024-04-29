import { FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope, FaPhone } from "react-icons/fa6";
import { useLoaderData } from "react-router-dom";

const OrderDetails = () => {
    const order = useLoaderData();

    return (
        <div className="container mx-auto px-3 md:px-6 py-10 space-y-4">
            <h1 className="font-bold text-3xl">Order Details</h1>
            <div>
                <img
                    src={order.order.img}
                    alt={order.order.title}
                    className="w-64 rounded-lg"
                />
            </div>
            <ul className="space-y-3">
                <li className="text-xl">
                    <span className="font-semibold">Order ID: </span>
                    {order._id}
                </li>
                <li className="text-xl">
                    <span className="font-semibold">Product: </span>
                    {order.order.title}
                </li>
                <li className="text-xl">
                    <span className="font-semibold">Price: </span>$
                    {order.order.price}
                </li>
                <li className="text-xl">
                    <span className="font-semibold">Order Status: </span>
                    <span className="badge badge-ghost badge-lg">
                        {order.order.status}
                    </span>
                </li>
            </ul>
            <h1 className="font-bold text-2xl">Billing Address</h1>
            <ul className="space-y-3">
                <li className="text-xl">{order.name}</li>
                <li className="text-xl">{order.address}</li>

                <li className="text-xl flex gap-2 items-center">
                    <FaPhoneAlt />
                    {order.phone}
                </li>
                {order.phone2 && (
                    <li className="text-xl lex gap-2 items-center">
                        <FaPhone />
                        {order.phone2}
                    </li>
                )}
                <li className="text-xl flex gap-2 items-center">
                    <FaEnvelope />
                    {order.email}
                </li>
            </ul>
        </div>
    );
};

export default OrderDetails;
