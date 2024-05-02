import { FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope, FaPhone } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useQuery } from "@tanstack/react-query";
import { ThreeDots } from "react-loader-spinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const OrderDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const {
        data: order,
        isFetching,
        isError,
    } = useQuery({
        queryKey: ["order-details"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/${id}`);
            return res.data;
        },
    });

    const handleCancel = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel Order!",
            cancelButtonText: `No`,
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/orders/${order._id}`).then((res) => {
                    console.log(res.data);
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Order Canceled!",
                            text: "The Order has been canceled.",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 3000,
                        });
                        //order deleted, navigate to home
                        navigate("/");
                    }
                });
            }
        });
    };

    if (isFetching) {
        return (
            <div className="container mx-auto px-3 md:px-6 py-10 space-y-10">
                <PageTitle title="Order Details" breadcrumb="Order Details" />
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

    if (isError) {
        return <Navigate to="/orders" />;
    }

    return (
        <div className="container mx-auto px-3 md:px-6 py-10 space-y-10">
            <PageTitle title="Order Details" breadcrumb="Order Details" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                <div className="overflow-x-auto col-span-2 order-2 md:order-1">
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
                                    <span className="font-semibold">
                                        Order ID{" "}
                                    </span>
                                </td>
                                <td>{order._id}</td>
                            </tr>

                            <tr>
                                <td>
                                    <span className="font-semibold">
                                        {order.order.type}
                                    </span>
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
                <div className="order-1 md:order-2 bg-[#F3F3F3] rounded-lg overflow-hidden">
                    <img
                        src={order.order.img}
                        alt={order.order.title}
                        className={
                            order.order.type === "Product"
                                ? "mx-auto w-2/3"
                                : ""
                        }
                    />
                </div>
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
                    <li className="text-xl flex gap-2 items-center">
                        <FaPhone />
                        {order.phone2}
                    </li>
                )}
                <li className="text-xl flex gap-2 items-center">
                    <FaEnvelope />
                    {order.email}
                </li>
            </ul>
            <button
                onClick={handleCancel}
                className="btn bg-transparent border border-primary text-primary hover:bg-primary hover:text-white transition-all md:px-5"
            >
                Cancel Order
            </button>
        </div>
    );
};

export default OrderDetails;
