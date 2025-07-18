import { useEffect, useRef, useState } from "react";
import SectionTitle from "./SectionTitle/SectionTitle";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const [features, setFeatures] = useState([]);
  const featuresRef = useRef([]);
  const wrapperRef = useRef(null);

  useEffect(() => {
    axios.get("/data/features.json").then((res) => setFeatures(res.data));
  }, []);

  useEffect(() => {
    if (features.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(featuresRef.current, {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 85%",
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [features]);

  return (
    <div className="py-10 space-y-10 barlow-regular" ref={wrapperRef}>
      <SectionTitle
        section="Våra Kärnvärden"
        title="Varför Välja Oss"
        description="Vi erbjuder enastående service, pålitlighet och kvalitet. Våra kunder litar på oss för professionell bilvård med bästa möjliga resultat."
      />
      {features.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {features.map((feature, index) => (
            <div
              key={feature._id}
              ref={(el) => (featuresRef.current[index] = el)}
              className="flex flex-col items-center gap-3 border border-gray-300 rounded-lg py-6 hover:shadow-lg transition-shadow duration-300 bg-white"
            >
              <img
                src={feature.icon}
                alt={feature.name}
                className="w-16 h-16"
              />
              <h3 className="text-center font-medium barlow-regular">{feature.name}</h3>
            </div>
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Features;
