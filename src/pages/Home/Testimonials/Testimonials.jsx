import { useEffect, useState } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import TestimonialSingle from "./TestimonialSingle";
import axios from "axios";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
        <button
            className="flex justify-center items-center bg-[#f3f3f3] text-[#444] hover:bg-primary transition-all h-14 w-14 md:h-20 md:w-20 rounded-full hover:text-white z-20 absolute top-32 -right-9"
            onClick={onClick}
        >
            <FaArrowRight size={25} />
        </button>
    );
};

const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
        <button
            className="flex justify-center items-center bg-[#f3f3f3] text-[#444] hover:bg-primary transition-all h-14 w-14 md:h-20 md:w-20 rounded-full hover:text-white z-20 absolute top-32 -left-9"
            onClick={onClick}
        >
            <FaArrowLeft size={25} />
        </button>
    );
};

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);

    var settings = {
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
                breakpoint: 480,
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
        <div className="py-10 space-y-10">
            <SectionTitle
                section="Testimonial"
                title="What Customer Says"
                description="the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. "
            />
            <div className="slider-container relative">
                <Slider {...settings}>
                    {testimonials?.map((testimonial) => (
                        <TestimonialSingle
                            key={testimonial._id}
                            testimonial={testimonial}
                        />
                    ))}
                </Slider>
            </div>
        </div>
    );
};

SampleNextArrow.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
};

SamplePrevArrow.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
};

export default Testimonials;
