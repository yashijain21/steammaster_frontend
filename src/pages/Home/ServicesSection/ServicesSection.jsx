import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "../SectionTitle/SectionTitle";
import { FaArrowRight } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import '../../../index.css'

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const axios = useAxiosPublic();

  const sectionRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("/services");
        setServices(res.data);
      } catch (error) {
        console.error("Failed to fetch services:", error.message);
      }
    };
    fetchServices();
  }, [axios]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".section-title", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".section-title",
          start: "top 80%",
        },
      });

      gsap.from(".more-button", {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.5,
        ease: "bounce.out",
        scrollTrigger: {
          trigger: ".more-button",
          start: "top 80%",
        },
      });

      if (buttonRef.current) {
        buttonRef.current.addEventListener("mouseenter", () => {
          gsap.to(buttonRef.current, {
            scale: 1.05,
            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            duration: 0.3,
          });
        });

        buttonRef.current.addEventListener("mouseleave", () => {
          gsap.to(buttonRef.current, {
            scale: 1,
            boxShadow: "none",
            duration: 0.3,
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [services]);

  return (
    <div
      className="space-y-5  barlow-regular bg-gradient-to-b from-gray-50 to-white barlow-regular"
      id="services"
      ref={sectionRef}
    >
      <div className="section-title">
        <SectionTitle
          section="Tjänster"
          title="Våra Tjänsteområden"
          description="SteamMaster erbjuder professionella bilvårdstjänster som får din bil att glänsa – både invändigt och utvändigt."
        />
      </div>

{/* Services Cards Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-4 mt-8">
  {services.slice(0, 4).map((service) => (
    <div
      key={service._id}
      className="relative h-80 overflow-hidden group shadow-md"
    >
      {/* Background Image */}
      <img
        src={
          service.image ||
          "https://gomechprod.blob.core.windows.net/gm-retail-app/service-new-images/Dry%20Cleaning%20sq.jpg"
        }
        alt={service.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
      />

      {/* Full Overlay */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/70 flex flex-col justify-end px-4 pb-6 transition-colors duration-500 ease-in-out">
        <h3 className="text-white text-lg font-bold uppercase tracking-wide transition-all duration-500">
          {service.name}
        </h3>
        <p className="text-gray-300 text-sm mt-1 transition-all duration-500">
          {service.description}
        </p>

        {/* Hover Arrow to Details */}
        <Link
          to={`/service/${service._id}`}
          className="mt-4 text-white text-4xl transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out"
        >
          &rarr;
        </Link>
      </div>
    </div>
  ))}
</div>







      <div className="text-center pt-4">
        <button
          ref={buttonRef}
          className="more-button btn bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 transition-all duration-300 hover:scale-105"
        >
          Visa fler tjänster <FaArrowRight className="inline ml-2" />
        </button>
      </div>
    </div>
  );
};

export default ServicesSection;
