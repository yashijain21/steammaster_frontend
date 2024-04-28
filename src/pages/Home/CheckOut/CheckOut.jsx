import { useLoaderData, useLocation } from "react-router-dom";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { Input, Textarea } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { Ripple, initTWE } from "tw-elements";

const CheckOut = () => {
    const location = useLocation();
    const checkout = useLoaderData();
    const { user } = useContext(AuthContext);
    const [error, setError] = useState("");

    useEffect(() => {
        initTWE({ Ripple });
    }, []);

    const handleCheckOut = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = form.get("name");
        const email = form.get("email");
        const phone = form.get("phone");
        const phone2 = form.get("phone2");
        const address = form.get("address");
        const data = { name, email, phone, phone2, address };
        console.log(data);
        if (name === "") {
            setError("Please enter your Name.");
            return;
        } else if (email === "") {
            setError("Please enter your Email address.");
            return;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
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
                            <Input
                                className="bg-white"
                                size="lg"
                                label="Name"
                                name="name"
                                defaultValue={user.displayName}
                            />
                            <Input
                                className="bg-white"
                                size="lg"
                                label="Email"
                                name="email"
                                defaultValue={user.email}
                            />
                            <Input
                                className="bg-white"
                                size="lg"
                                name="phone"
                                label="Phone Number"
                            />
                            <Input
                                className="bg-white"
                                size="lg"
                                name="phone2"
                                label="Alternative Phone Number"
                            />
                        </div>
                        <Textarea
                            className="bg-white"
                            size="lg"
                            label="Address"
                            name="address"
                        />
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
                            // className="w-2/3 mx-auto"
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
