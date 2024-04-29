import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";

const OrderList = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/orders?email=${user?.email}`)
            .then((res) => setOrders(res.data));
    }, [user]);

    return (
        <div className="container mx-auto px-3 md:px-6 py-10">
            {orders.length ? (
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Product / Service</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Order Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders?.map((order) => (
                                <tr key={order._id}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-14 h-14">
                                                    <img
                                                        src={order.order.img}
                                                        alt={order.order.title}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">
                                                    {order.order.title}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>${order.order.price}</td>
                                    <td>
                                        <span className="badge badge-ghost">
                                            {order.order.status}
                                        </span>
                                    </td>
                                    <td>
                                        <Link
                                            to={`/order-details/${order._id}`}
                                            className="btn"
                                        >
                                            Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>
                    <h3 className="text-center text-2xl font-semibold py-[10vh]">
                        You Did not ordered anything..
                    </h3>
                </div>
            )}
        </div>
    );
};

export default OrderList;
