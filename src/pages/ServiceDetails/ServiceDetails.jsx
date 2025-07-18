import { Link, NavLink, useLoaderData } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useEffect, useState, useMemo } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FaStar, FaShieldAlt, FaClock } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import gal1 from "/gallery/gal1.webp";
import gal2 from "/gallery/gal2.webp";
import gal3 from "/gallery/gal3.webp";
import gal4 from "/gallery/gal4.webp";
import gal5 from "/gallery/gal5.webp";
import gal6 from "/gallery/gal6.webp";
import gal7 from "/gallery/gal7.webp";
import gal8 from "/gallery/gal8.webp";

const ServiceDetails = () => {
    const service = useLoaderData();
    const [allServices, setAllServices] = useState([]);
    const axios = useAxiosPublic();

    useEffect(() => {
        axios.get("/services").then((res) => setAllServices(res.data));
    }, [axios]);

    const randomGalleryImages = useMemo(() => {
        const allImages = [gal1, gal2, gal3, gal4, gal5, gal6, gal7, gal8];
        const shuffled = allImages.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 6);
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen barlow-regular">
            {/* Hero Section */}
            <div className="relative h-96 overflow-hidden">
                <img
                    src={service.image || "https://images.unsplash.com/photo-1603575448878-868a20723f5d?auto=format&fit=crop&w=2070&q=80"}
                    alt={service.name}
                    className="w-full h-full object-cover brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 pb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 barlow-regular">{service.name}</h1>
                    <div className="flex items-center gap-4">
                        <span className="bg-primary px-4 py-1 rounded-full text-white font-medium barlow-regular">Popular</span>
                        <div className="flex items-center text-yellow-400">
                            <FaStar className="mr-1" />
                            <span className="text-white barlow-regular">4.9 (128 reviews)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 m-5 relative z-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Service Details Card */}
                    <div className="bg-white rounded-xl shadow-xl p-8 flex-1">
                        <div className="flex flex-col md:flex-row gap-8 mb-12">
                            <div className="md:w-1/2">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 barlow-bold">Service Information</h2>
                                <p className="text-secondary leading-relaxed barlow-regular">{service.description}</p>
                            </div>
                            <div className="md:w-1/2">
                                <div className="bg-gray-100 p-6 rounded-lg">
                                    <h3 className="font-bold text-lg mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent barlow-bold ">
                                        Service Highlights
                                    </h3>
                                    <ul className="space-y-3 text-secondary">
                                        <li className="flex items-start gap-3">
                                            <FaShieldAlt className="text-primary mt-1 flex-shrink-0 r" />
                                            <span className="barlow-regular">Premium quality materials</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <FaClock className="text-primary mt-1 flex-shrink-0" />
                                            <span className="barlow-regular">Approx. {service.duration || '2-3'} hours completion time</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <FaStar className="text-primary mt-1 flex-shrink-0" />
                                            <span className="barlow-regular">Expert-certified technicians</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Service Process */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 barlow-bold">How It Works</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {['Consultation', 'Service Execution', 'Quality Check'].map((step, index) => (
                                    <div key={index} className="bg-gray-50 p-6 rounded-lg border-l-4 border-primary">
                                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold mb-3 barlow-bold">
                                            {index + 1}
                                        </div>
                                        <h3 className="font-bold text-lg mb-2 barlow-regular">{step}</h3>
                                        <p className="text-secondary barlow-regular">Detailed description of this step in the process</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Gallery */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Gallery</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {randomGalleryImages.map((src, idx) => (
                                    <div
                                        key={idx}
                                        className="aspect-square bg-gray-200 rounded-lg overflow-hidden"
                                    >
                                        <img
                                            src={src}
                                            alt={`Gallery ${idx + 1}`}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Booking Sidebar */}
                    <div className="lg:w-96 space-y-6">
                        {/* Pricing Card */}
                        <div className="bg-white rounded-xl shadow-xl p-6 top-6">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 barlow-bold">Total Price</h3>
                                    <p className="text-secondary barlow-regular">Including all taxes</p>
                                </div>
                                <span className="text-3xl font-bold text-primary barlow-regular">{service.price} kr</span>
                            </div>

                            <Link
                                to={`/service/${service._id}/checkout`}
                                className="block w-full bg-primary hover:bg-primary-dark text-white text-center py-4 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl barlow-bold"
                            >
                                Book This Service
                            </Link>
                        </div>

                        {/* Other Services */}
                        <div className="bg-white rounded-xl shadow-xl p-6">
                            <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                                You Might Also Like
                            </h3>
                            <div className="space-y-4">
                                {allServices.map((item) => (
                                    <NavLink
                                        key={item._id}
                                        to={`/service/${item._id}`}
                                        className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-all"
                                    >
                                        <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                                            <img 
                                                src={item.image} 
                                                alt={item.name} 
                                                className="w-full h-full object-cover" 
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium">{item.name}</h4>
                                            <p className="text-primary font-bold">{item.price} kr</p>
                                        </div>
                                        <IoIosArrowForward className="text-secondary" />
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;
