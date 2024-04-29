import { FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope, FaPhone } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
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
                    className="w-96 rounded-lg"
                />
            </div>
            <div className="overflow-x-auto">
                <table className="table text-lg">
                    <thead className="text-base">
                        <tr>
                            <th>Name</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <span className="font-semibold">Order ID </span>
                            </td>
                            <td>{order._id}</td>
                        </tr>

                        <tr>
                            <td>
                                <span className="font-semibold">Product</span>
                            </td>
                            <td>{order.order.title}</td>
                        </tr>
                        <tr>
                            <td>
                                <span className="font-semibold">Price</span>
                            </td>
                            <td>${order.order.price}</td>
                        </tr>
                        <tr>
                            <td>
                                <span className="font-semibold">
                                    Order Status
                                </span>
                            </td>
                            <td>
                                <span className="badge badge-ghost">
                                    {order.order.status}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h1 className="font-bold text-2xl">Billing Address</h1>
            <ul className="space-y-3">
                <li className="text-xl">{order.name}</li>
                <li className="text-xl flex gap-2 items-center">
                    <IoLocationSharp />
                    {order.address}
                </li>

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
