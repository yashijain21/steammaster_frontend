// components/AboutUs.jsx

import React from "react";

import Cover from "/images/about_us/About_hero.png";

import Bubble from "/icons/tabler_chart-bubble-filled.png";
import Tree from "/icons/tabler_christmas-tree-filled.png";
import Boat from "/icons/tabler_speedboat-filled.png";
import User from "/icons/tabler_user-filled.png";

// ✅ Importera testimonials från JSON
import testimonials from "../../public/data/testimonial.json";

const features = [
  { icon: Bubble, label: "Djupgående rengöring" },
  { icon: Tree, label: "Miljövänligt" },
  { icon: Boat, label: "Snabbt & pålitligt" },
  { icon: User, label: "Kund i fokus" },
];

const AboutUs = () => {
  return (
    <section className="bg-white text-gray-800 barlow-regular">
      {/* Hero */}
      <div className="relative">
        <img
          src={Cover}
          alt="Ångrengöring"
          className="w-full object-cover h-[300px] md:h-[450px] lg:h-[500px] rounded-b-xl shadow"
        />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-12">
        {/* About Section */}
        <div className="text-center mb-16">
          <div className="text-center py-10 px-4 bg-gradient-to-br from-white via-gray-50 to-white">
            {/* Animated "ABOUT US" Title */}
            <h1 className="text-5xl font-extrabold text-primary mb-3 tracking-wide animate-fade-in-up">
              <span className="relative inline-block">OM OSS</span>
            </h1>

            {/* Decorative Divider with Icon */}
            <div className="flex justify-center items-center gap-3 mb-6">
              <div className="w-24 h-1 bg-primary rounded"></div>
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 4v16m8-8H4" />
              </svg>
              <div className="w-24 h-1 bg-primary rounded"></div>
            </div>

            {/* Our Story Subtitle */}
            <h2 className="text-2xl font-semibold text-secondary mb-2 animate-fade-in delay-300">
              Vår resa
            </h2>
          </div>

          <p className="text-gray-700 mb-8 leading-relaxed">
            SteamMaster föddes ur en passion för renhet och kraftfull
            ångrengöring. Det som började som en liten familjeverksamhet har
            vuxit till att bli Sveriges mest pålitliga namn inom miljövänlig
            ångrengöring.
          </p>

          <div className="mb-12">
            <h3 className="text-xl font-semibold text-primary mb-3">
              Varför välja SteamMaster?
            </h3>
            <p className="text-gray-600 mb-6">
              För oss handlar renhet inte bara om ett snyggt utseende – det
              handlar om ett bättre och sundare liv.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {features.map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center bg-white shadow-xl border rounded-xl h-36 w-42 p-4"
                >
                  <div className="text-2xl text-[#99bf37] w-16 h-16 flex justify-center items-center bg-[#404040] rounded-full mb-8">
                    <img src={icon} alt={label} />
                  </div>
                  <p className="text-sm font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Vad våra kunder säger
          </h2>
          <p className="text-gray-600 mb-8">
            Riktiga resultat. Riktiga människor. Riktigt rent.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(
              ({ _id, name, image, designation, description }) => (
                <div
                  key={_id}
                  className="bg-white p-6 rounded-lg border border-gray-200 text-left shadow hover:shadow-lg transition"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={image}
                      alt={name}
                      className="w-12 h-12 rounded-full mr-3 border"
                    />
                    <div>
                      <h4 className="font-bold text-lg">{name}</h4>
                      <p className="text-sm text-gray-500">{designation}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">{description}</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
