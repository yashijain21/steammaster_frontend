import { useEffect, useState } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import axios from "axios";
import SingleService from "./SingleService";

const ServicesSection = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/services/min")
            .then((res) => setServices(res.data));
    }, []);

    return (
        <div className="py-10 space-y-10" id="services">
            <SectionTitle
                section="Service"
                title="Our Service Area"
                description="the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services?.map((service) => (
                    <SingleService key={service._id} service={service} />
                ))}
            </div>
            <div className="text-center">
                <button className="btn bg-transparent border border-primary text-primary hover:bg-primary hover:text-white transition-all md:px-5">
                    More Services
                </button>
            </div>
        </div>
    );
};

export default ServicesSection;
