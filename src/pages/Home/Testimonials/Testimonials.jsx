import { useEffect, useState } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import TestimonialSingle from "./TestimonialSingle";
import axios from "axios";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Loader from "../../../components/Loader/Loader";

// Updated Arrows - Centered Vertically
const SampleNextArrow = ({ onClick }) => {
    return (
        <button
            className="flex justify-center items-center bg-[#f3f3f3] text-[#444] hover:bg-primary transition-all h-14 w-14 md:h-20 md:w-20 rounded-full hover:text-white z-20 absolute top-1/2 -translate-y-1/2 -right-5"
            onClick={onClick}
        >
            <FaArrowRight size={25} />
        </button>
    );
};

const SamplePrevArrow = ({ onClick }) => {
    return (
        <button
            className="flex justify-center items-center bg-[#f3f3f3] text-[#444] hover:bg-primary transition-all h-14 w-14 md:h-20 md:w-20 rounded-full hover:text-white z-20 absolute top-1/2 -translate-y-1/2 -left-5"
            onClick={onClick}
        >
            <FaArrowLeft size={25} />
        </button>
    );
};

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    useEffect(() => {
        axios
            .get("/data/testimonial.json")
            .then((res) => setTestimonials(res.data));
    }, []);

    return (
        <div className="py-10 space-y-10 barlow-regular">
            <SectionTitle
                section="Kundomdömen"
                title="Vad våra kunder säger"
                description="De flesta av våra kunder är mycket nöjda med våra tjänster – professionellt bemötande och imponerande resultat varje gång."
            />
            {testimonials.length ? (
                <div className="relative overflow-hidden">
                    <Slider {...settings}>
                        {testimonials.map((testimonial) => (
                            <TestimonialSingle
                                key={testimonial._id}
                                testimonial={testimonial}
                            />
                        ))}
                    </Slider>
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
};

SampleNextArrow.propTypes = {
    onClick: PropTypes.func,
};

SamplePrevArrow.propTypes = {
    onClick: PropTypes.func,
};

export default Testimonials;
