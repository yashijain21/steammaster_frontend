import { Link, NavLink, useLoaderData } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoIosArrowRoundForward } from "react-icons/io";

const ServiceDetails = () => {
    const service = useLoaderData();
    const [allServices, setAllServices] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:5000/services/titles")
            .then((res) => setAllServices(res.data));
    }, []);
    return (
        <div className="container mx-auto px-3 md:px-6 pt-6 pb-10 space-y-16">
            <PageTitle title="Service Details" breadcrumb="Service Details" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-4">
                    <div className="rounded-xl overflow-hidden">
                        <img
                            src={service.img}
                            alt={service.title}
                            className="w-full"
                        />
                    </div>
                    <h2 className="text-4xl font-bold">{service.title}</h2>
                    <p className="text-dark3">{service.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {service?.facility.map((facility, idx) => (
                            <div
                                key={idx}
                                className="bg-[#F3F3F3] p-10 rounded-lg space-y-2 border-t-2 border-primary"
                            >
                                <h1 className="font-bold text-xl">
                                    {facility.name}
                                </h1>
                                <p className="text-dark3">{facility.details}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="bg-[#F3F3F3] p-10 space-y-4 rounded-lg">
                        <h3 className="font-bold text-2xl">Services</h3>
                        <ul className="space-y-3">
                            {allServices?.map((service) => (
                                <li key={service._id}>
                                    <NavLink
                                        to={`/service/${service._id}`}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "flex items-center justify-between p-4 rounded-lg font-bold text-white bg-primary dark:text-purple-400"
                                                : "flex items-center justify-between p-4 bg-white rounded-lg text-black dark:text-gray-200"
                                        }
                                    >
                                        <span>{service.title}</span>
                                        <IoIosArrowRoundForward size={30} />
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-[#151515] text-white text-center p-12 rounded-lg space-y-3">
                        <img
                            src="/logo-white.svg"
                            alt="logo"
                            className="mx-auto w-1/3"
                        />
                        <h3 className="font-bold text-xl">
                            Need Help? We Are Here To Help You
                        </h3>
                        <div className="bg-white px-11 pt-5 pb-9 rounded-lg relative">
                            <h4 className="text-black font-bold text-xl">
                                <span className="text-primary">Car Doctor</span>{" "}
                                Special
                            </h4>
                            <p className="text-dark3 font-bold">
                                Save up to{" "}
                                <span className="text-primary">60% off</span>
                            </p>
                            <button className="btn bg-primary text-white hover:bg-[#c42606] border-0 px-8 absolute -bottom-5  left-1/2 -translate-x-1/2">
                                Get A Quote
                            </button>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h3 className="font-bold text-4xl">
                            Price ${service.price}
                        </h3>
                        <Link
                            to={`/service/${service._id}/checkout`}
                            className="btn btn-block bg-primary text-white border-primary hover:bg-transparent hover:border-primary hover:text-primary"
                        >
                            Proceed Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;
