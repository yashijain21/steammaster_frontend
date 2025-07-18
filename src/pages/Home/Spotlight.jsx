import React, { useRef } from "react";
import Features from "./Features";

const logos = [
  "/car_brands/ford-100.png",
  "/car_brands/honda-100.png",
  "/car_brands/icons8-bmw-100.png",
  "/car_brands/icons8-car-logo-100-2.png",
  "/car_brands/icons8-car-logo-100.png",
  "/car_brands/icons8-ferrari-100.png",
  "/car_brands/icons8-rolls-royce-100.png"
];

const SpotlightText = () => {
  const maskRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = maskRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    maskRef.current.style.setProperty("--x", `${x}px`);
    maskRef.current.style.setProperty("--y", `${y}px`);
  };

  const handleMouseLeave = () => {
    maskRef.current.style.setProperty("--x", `-9999px`);
    maskRef.current.style.setProperty("--y", `-9999px`);
  };

  return (
    <div
      className="relative min-h-screen bg-white overflow-hidden px-4 py-20 flex flex-col items-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spotlight Text */}
     <h1 className="text-center text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-300 max-w-5xl leading-tight z-0 select-none barlow-regular">
  Vi är Steam Master – Mästarna på ångrengöring! Förstklassiga tjänster inom städning, tvätt och bilvård.
</h1>

<h1
  ref={maskRef}
  className="absolute top-20 text-center text-4xl sm:text-5xl md:text-6xl font-extrabold text-black max-w-5xl leading-tight pointer-events-none z-10 select-none barlow-regular"
  style={{
    WebkitMaskImage:
      'radial-gradient(circle 80px at var(--x) var(--y), black 99%, transparent 100%)',
    maskImage:
      'radial-gradient(circle 80px at var(--x) var(--y), black 99%, transparent 100%)',
  }}
>
  Vi är Steam Master – Mästarna på ångrengöring! Förstklassiga tjänster inom städning, tvätt och bilvård.
</h1>


     <Features/>

      {/* Logos Marquee Effect */}
      <div className="w-full mt-20 overflow-hidden relative">
        <div className="marquee-track flex gap-12 items-center whitespace-nowrap">
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <img
              key={i}
              src={logo}
              alt={`logo-${i}`}
              className="opacity-30 hover:opacity-100 transition-opacity duration-300"
            />
          ))}
        </div>
      </div>

      {/* CSS for Marquee */}
      <style jsx>{`
        .marquee-track {
          animation: marquee 20s linear infinite;
          will-change: transform;
        }

        @keyframes marquee {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-66.666%);
          }
        }
      `}</style>
    </div>
  );
};

export default SpotlightText;
