import { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle/SectionTitle";
import axios from "axios";

const Features = () => {
    const [features, setFeatures] = useState([]);
    useEffect(() => {
        axios.get("/data/features.json").then((res) => setFeatures(res.data));
    }, []);



    return (
        <div className="py-10 space-y-10">
            <SectionTitle
                section="Core Features"
                title="Why Choose Us"
                description="the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. "
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {features?.map((feature) => (
                    <div
                        key={feature._id}
                        className="flex flex-col items-center gap-3 border border-gray-300 rounded-lg py-6"
                    >
                        <img src={feature.icon} alt={feature.name} />
                        <h3 className="font-bold">{feature.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Features;
