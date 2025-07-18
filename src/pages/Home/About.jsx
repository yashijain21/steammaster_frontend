import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  FaCar, 
  FaMagic, 
  FaTools, 
  FaWindowMaximize, 
  FaBroom, 
  FaSearchDollar,
  FaArrowRight
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const imageLeftRef = useRef(null);
  const imageRightRef = useRef(null);
  const contentRef = useRef(null);
  const [hoveredService, setHoveredService] = useState(null);

  const services = [
    { name: "Biltvätt", icon: <FaCar className="text-xl" /> },
    { name: "Keramisk lackskydd", icon: <FaMagic className="text-xl" /> },
    { name: "Spot repair", icon: <FaTools className="text-xl" /> },
    { name: "Solfilm", icon: <FaWindowMaximize className="text-xl" /> },
    { name: "Interior detailing", icon: <FaBroom className="text-xl" /> },
    { name: "Polering", icon: <FaSearchDollar className="text-xl" /> },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image animations with more dynamic effects
      gsap.from(imageLeftRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: imageLeftRef.current,
          start: "top 80%",
        },
      });

      gsap.from(imageRightRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: imageRightRef.current,
          start: "top 80%",
        },
      });

      // Text animation with staggered children
      gsap.from(contentRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
        },
      });

      // Enhanced bubble animation with larger movement
      gsap.utils.toArray(".bubble").forEach((bubble) => {
        const duration = 3 + Math.random() * 3;
        const delay = Math.random() * 2;
        const yDistance = 50 + Math.random() * 50; // Increased movement range
        
        gsap.to(bubble, {
          y: `-=${yDistance}`,
          duration: duration,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: delay,
        });
        
        // Add horizontal movement for some bubbles
        if (Math.random() > 0.5) { // Increased chance of horizontal movement
          gsap.to(bubble, {
            x: `+=${30 + Math.random() * 40}`, // Increased horizontal movement
            duration: duration * 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: delay,
          });
        }
      });

      // Interactive image hover effects
      const images = [imageLeftRef.current, imageRightRef.current];
      images.forEach(img => {
        img.addEventListener("mouseenter", () => {
          gsap.to(img, {
            scale: 1.03,
            duration: 0.3,
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          });
        });
        img.addEventListener("mouseleave", () => {
          gsap.to(img, {
            scale: 1,
            duration: 0.3,
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="relative py-16 barlow-regular overflow-hidden bg-gradient-to-b from-white to-gray-50"
      id="about"
      ref={containerRef}
    >
      {/* Enhanced Bubbles with Larger Sizes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        {[...Array(15)].map((_, i) => { // Increased number of bubbles
          const size = 10 + Math.random() * 30; // Larger size range (10px to 40px)
          const top = Math.random() * 100;
          const left = Math.random() * 100;
          const opacity = 0.05 + Math.random() * 0.2; // Slightly more transparent
          const color = Math.random() > 0.5 ? "bg-primary" : "bg-secondary";
          const blur = Math.random() > 0.7 ? "blur-sm" : ""; // Some bubbles are blurred
          
          return (
            <span 
              key={i}
              className={`bubble ${color} ${blur} rounded-full absolute`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${top}%`,
                left: `${left}%`,
                opacity: opacity,
              }}
            />
          );
        })}
      </div>

      {/* Main Content (unchanged) */}
      <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* ... rest of your content remains the same ... */}
        <div className="flex items-center">
          <div className="relative pb-20 sm:h-[430px] md:h-[500px] lg:h-[330px] xl:h-[420px] 2xl:h-[500px]">
            <img
              src="/images/about_us/person.jpg"
              className="w-4/5 rounded-lg shadow-xl transition-all duration-300 cursor-pointer hover:shadow-2xl"
              ref={imageLeftRef}
              alt="person"
            />
            <img
              src="/images/about_us/parts.jpg"
              className="w-1/2 rounded-lg absolute right-0 top-1/2 sm:top-52 md:top-60 lg:top-40 xl:top-48 2xl:top-60 border-8 border-gray-50 shadow-xl transition-all duration-300 cursor-pointer hover:shadow-2xl"
              ref={imageRightRef}
              alt="parts"
            />
          </div>
        </div>

        <div className="space-y-6 barlow-regular" ref={contentRef}>
          <h4 className="font-bold text-xl text-primary tracking-wider">OM OSS</h4>
          <h1 className="text-3xl md:text-4xl font-bold text-secondary leading-tight">
            Experter på <span className="text-primary">biltvätt & rekond</span> – för en bil som glänser
          </h1>
          
          <p className="text-gray-600 leading-relaxed">
            SteamMaster erbjuder professionell bilvård med fokus på både in- och
            utvändig rengöring, keramisk lackskydd, spot repair, solfilm och mer. Med modern
            utrustning och passion för detaljer ger vi din bil ett nytt liv.
          </p>
          
          <p className="text-gray-600 leading-relaxed">
            Våra tjänster är utformade för att ge bästa möjliga finish, långvarigt
            skydd och ett skinande resultat – varje gång. Oavsett om du kör personbil,
            husbil eller båt, har vi rätt lösning för dig.
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
            {services.map((service, index) => (
              <div 
                key={index}
                className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer flex flex-col items-center text-center 
                  ${hoveredService === index ? 
                    'bg-primary text-white border-primary shadow-lg transform scale-105' : 
                    'bg-white text-gray-700 border-gray-200 hover:border-primary hover:shadow-md'}`}
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div className={`mb-2 p-2 rounded-full ${hoveredService === index ? 'bg-white text-primary' : 'bg-gray-100 text-gray-700'}`}>
                  {service.icon}
                </div>
                <span className="text-sm font-medium">{service.name}</span>
              </div>
            ))}
          </div>
          
          <button className="btn bg-primary text-white border-primary hover:bg-transparent hover:border-primary hover:text-primary px-8 py-3 mt-6 transition-all duration-300 hover:scale-105 transform flex items-center justify-center">
            Läs Mer Om Våra Tjänster
            <FaArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;