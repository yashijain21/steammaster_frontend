import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Typewriter } from "react-simple-typewriter";
import img from "/images/homeCarousel/2.jpg"
const slide = {
  image: img,
title: "Välkommen till SteamMasters",
description: "Vi erbjuder professionella städtjänster för hem och kontor."

};

function HeroAnimation() {
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setShowText(true);
      },
    });

    tl.fromTo(
      imageRef.current,
      {
        scale: 0.2,
        opacity: 0,
        clipPath: "inset(40% 40% 40% 40%)",
      },
      {
        scale: 1,
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.5,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <div className="relative w-full h-[80vh] bg-black overflow-hidden">
      <div
        ref={imageRef}
        className="absolute inset-0 bg-cover bg-center z-10"
        style={{
          backgroundImage: `url(${slide.image})`,
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#151515] to-[#15151575] lg:to-transparent z-20"></div>

      {/* Text */}
      <div className="relative z-30 text-white px-6 md:px-20 h-full flex items-center">
        {showText && (
          <div ref={textRef} className="max-w-xl">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold barlow-bold mb-4">
              <Typewriter
                words={[slide.title]}
                loop={1}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </h1>
            <p className="text-lg barlow-regular mb-6">{slide.description}</p>
            <div className="flex gap-4">
              <button className="btn bg-primary text-white border-primary hover:bg-[#d62400] barlow-regular">
                Boka Nu
              </button>
              <button className="btn bg-transparent border-white text-white hover:bg-[#ffffff4d] barlow-regular">
                Läs Mer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeroAnimation;
