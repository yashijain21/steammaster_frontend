import axios from "axios";
import { Link } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import { ThreeDots } from "react-loader-spinner";
import { useQuery } from "@tanstack/react-query";

const ManageOrders = () => {
    const {
        data: orders,
        isPending,
        refetch,
    } = useQuery({
        queryKey: ["manage-orders"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/orders", {
                withCredentials: true,
            });
            return res.data;
        },
    });

    const handleApprove = (order) => {
        console.log(order.order);
        const updatedOrder = {
            _id: order.order._id,
            title: order.order.title,
            img: order.order.img,
            price: order.order.price,
            status: "Approved",
            type: order.order.type,
        };
        axios
            .patch(`http://localhost:5000/orders/${order._id}`, updatedOrder, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res.data);
                refetch();
            });
    };

    if (isPending) {
        return (
            <div className="container mx-auto px-3 md:px-6 py-10 space-y-10">
                <PageTitle
                    title="Manage Orders (Admin)"
                    breadcrumb="Manage Orders"
                />
                <div className="min-h-[30vh] flex justify-center items-center">
                    <ThreeDots
                        visible={true}
                        height="80"
                        width="80"
                        color="#403F3F"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            </div>
        );
    }

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
                                                disabled={
                                                    order.order.status ===
                                                    "Approved"
                                                }
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
