import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Ripple, initTWE } from "tw-elements";

import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CheckOut = () => {
    const location = useLocation();
    const checkout = useLoaderData();
    const navigate = useNavigate();
    const { user, updateInfo, setLoading } = useContext(AuthContext);
    const [error, setError] = useState("");
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        initTWE({ Ripple });
    }, []);

    const { data: userOldData } = useQuery({
        queryKey: ["user-old-data", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user.email}`);
            return res.data;
        },
    });

    console.log(userOldData);

    const handleCheckOut = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = form.get("name");
        const email = form.get("email");
        const phone = form.get("phone");
        const phone2 = form.get("phone2");
        const address = form.get("address");
        const order = {
            name,
            email,
            phone,
            phone2,
            address,
            order: {
                ...checkout,
                status: "Pending",
                type: `${
                    location.pathname.includes("service")
                        ? "Service"
                        : "Product"
                }`,
            },
        };
        const userData = { name, email, phone, phone2, address };
        console.log(order);
        if (name === "") {
            setError("Please enter your Name.");
            return;
        } else if (email === "") {
            setError("Please enter your Email address.");
            return;
        } else if (!/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setError("Invalid email");
            return;
        } else if (phone === "") {
            setError("Please enter your Phone Number");
            return;
        } else if (!/^[0-9]*$/.test(phone)) {
            setError("Invalid Phone Number");
            return;
        } else if (phone2 !== "") {
            if (!/^[0-9]*$/.test(phone2)) {
                setError("Invalid Alternative Phone Number");
                return;
            }
        } else if (address === "") {
            setError("Please enter your Address");
            return;
        }
        setError("");
        axiosSecure.put("/users", userData).then((res) => {
            console.log("user updated on database");
            console.log(res.data);
            const profile = {
                displayName: name,
            };
            updateInfo(user, profile)
                .then(() => {
                    console.log("profile updated on firebase");
                    setLoading(false);
                })
                .catch((error) => console.error(error.message));
        });
        axiosSecure.post("/orders", order).then((res) => {
            console.log(res.data);
            if (res.data.insertedId) {
                navigate("/");
                Swal.fire({
                    icon: "success",
                    title: "Order Confirmed!",
                    text: `We will send your ${
                        location.pathname.includes("service")
                            ? "Service"
                            : "Product"
                    } soon.`,
                });
            }
        });
    };

    return (
        <div className="container mx-auto px-3 md:px-6 space-y-10 mt-6 mb-10">
            <PageTitle
                title="Check Out"
                breadcrumb={`${
                    location.pathname.includes("service")
                        ? "Service"
                        : location.pathname.includes("product")
                        ? "Product"
                        : "Undefined"
                }/Check Out`}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="md:col-span-2 bg-[#F3F3F3] order-2 md:order-1 p-10 md:p-16 rounded-lg">
                    <form onSubmit={handleCheckOut} className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <div className="relative w-full min-w-[200px] h-10">
                                    <input
                                        className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900 bg-white"
                                        placeholder=" "
                                        name="name"
                                        defaultValue={user.displayName}
                                    />
                                    <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                                        Name
                                    </label>
                                </div>
                            </div>
                            <div>
                                <div className="relative w-full min-w-[200px] h-10">
                                    <input
                                        className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900 bg-white"
                                        placeholder=" "
                                        name="email"
                                        onChange={() => {}}
                                        value={user.email}
                                    />
                                    <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                                        Email
                                    </label>
                                </div>
                            </div>
                            <div>
                                <div className="relative w-full min-w-[200px] h-10">
                                    <input
                                        className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900 bg-white"
                                        placeholder=" "
                                        name="phone"
                                        defaultValue={userOldData?.phone}
                                    />
                                    <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                                        Phone Number
                                    </label>
                                </div>
                            </div>
                            <div>
                                <div className="relative w-full min-w-[200px] h-10">
                                    <input
                                        className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900 bg-white"
                                        placeholder=" "
                                        name="phone2"
                                        defaultValue={userOldData?.phone2}
                                    />
                                    <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                                        Alternative Phone Number (Optional)
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="relative w-full min-w-[200px]">
                                <textarea
                                    className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50 bg-white"
                                    placeholder=" "
                                    name="address"
                                    defaultValue={userOldData?.address}
                                ></textarea>
                                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 text-gray-500">
                                    Address
                                </label>
                            </div>
                        </div>

                        <button
                            className="btn btn-block active:scale-95 bg-primary text-white border-primary hover:border-primary hover:bg-[#d62400]"
                            data-twe-ripple-init
                            data-twe-ripple-color="light"
                        >
                            Order Confirm
                        </button>
                    </form>
                    {error && <p className="text-red-600 pt-2">{error}</p>}
                </div>
                <div className="space-y-3 order-1 md:order-2">
                    <div className="rounded-xl overflow-hidden bg-[#F3F3F3]">
                        <img
                            src={checkout.img}
                            alt={checkout.title}
                            className={`${
                                location.pathname.includes("product")
                                    ? "w-2/3 mx-auto"
                                    : ""
                            }`}
                        />
                    </div>
                    <h2 className="text-3xl font-bold">{checkout.title}</h2>
                    <p className="text-xl font-semibold text-dark2">
                        Price : ${checkout.price}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;
