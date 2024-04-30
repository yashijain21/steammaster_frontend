import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/orders", {
                withCredentials: true,
            })
            .then((res) => setOrders(res.data));
    }, []);

    const handleApprove = (order) => {
        console.log(order.order);
        axios
            .patch(`http://localhost:5000/orders/${order._id}`, {
                _id: order.order._id,
                title: order.order.title,
                img: order.order.img,
                price: order.order.price,
                status: "Approved",
                type: order.order.type,
            })
            .then((res) => {
                console.log(res.data);
                const remaining = orders.filter((ord) => ord._id !== order._id);
                const updateOrder = orders.find((ord) => ord._id === order._id);
                updateOrder.order.status = "Approved";
                setOrders([updateOrder, ...remaining]);
            });
    };

    return (
        <div className="container mx-auto px-3 md:px-6 py-10 space-y-10">
            <PageTitle
                title="Manage Orders (Admin)"
                breadcrumb="Manage Orders"
            />
            {orders.length ? (
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Order</th>
                                <th>Customer Name</th>
                                <th>Customer Email</th>
                                <th>Customer Phone Number</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders?.map((order) => (
                                <tr key={order._id}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="rounded-xl w-20 h-20">
                                                    <img
                                                        src={order.order.img}
                                                        alt={order.order.title}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold;">
                                                    {order.order.title}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{order.name}</td>
                                    <td>{order.email}</td>
                                    <td>{order.phone}</td>
                                    <td>
                                        <span className="badge badge-ghost">
                                            {order.order.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex gap-3">
                                            <Link
                                                to={`/order-details/${order._id}`}
                                                className="btn btn-sm px-4 bg-primary text-white border-primary hover:border-primary hover:bg-[#d62400]"
                                            >
                                                Details
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleApprove(order)
                                                }
                                                className="btn btn-sm px-4 bg-primary text-white border-primary hover:border-primary hover:bg-[#d62400]"
                                            >
                                                Approve
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>
                    <h3 className="text-center text-2xl font-semibold py-[10vh]">
                        There is no available orders...
                    </h3>
                </div>
            )}
        </div>
    );
};

export default ManageOrders;
