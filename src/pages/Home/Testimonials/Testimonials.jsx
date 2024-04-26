import { useEffect, useState } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import axios from "axios";
import TestimonialSingle from "./TestimonialSingle";

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    useEffect(() => {
        axios
            .get("/data/testimonial.json")
            .then((res) => setTestimonials(res.data));
    }, []);
    return (
        <div className="py-10 space-y-10">
            <SectionTitle
                section="Testimonial"
                title="What Customer Says"
                description="the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. "
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {testimonials?.map((testimonial) => (
                    <TestimonialSingle
                        key={testimonial._id}
                        testimonial={testimonial}
                    />
                ))}
            </div>
        </div>
    );
};

export default Testimonials;
