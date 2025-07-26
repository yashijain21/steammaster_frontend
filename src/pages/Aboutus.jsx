import React from "react";
import { FaLeaf, FaUsers, FaBolt, FaSpa, FaStar } from "react-icons/fa";
import Cover from "/images/about_us/About_hero.png";
import Bubble from "/icons/tabler_chart-bubble-filled.png"
import Tree from "/icons/tabler_christmas-tree-filled.png"
import Boat from "/icons/tabler_speedboat-filled.png"
import User from "/icons/tabler_user-filled.png"
const features = [
  { icon: Bubble, label: "Deep Cleaning" },
  { icon: Tree, label: "Eco-Friendly" },
  { icon: Boat , label: "Fast & Reliable" },
  { icon: User, label: "Customer First" },
];

const timeline = [2000, 2003, 2009, 2010, 2020, 2022];

const testimonials = [
  {
    name: "Andry Jansen",
    location: "SA",
    title: "Excellent Service",
    comment: "I couldn't believe the difference! My couch looks brand new.",
  },
  {
    name: "Martin-Jamesen",
    location: "AD",
    title: "Impressive Service",
    comment: "Professional, fast, and completely chemical-free – I'm impressed.",
  },
  {
    name: "Karen",
    location: "FA",
    title: "Trustworthy",
    comment: "SteamMaster is the only company I trust with my office carpets.",
  },
];

const AboutUs = () => {
  return (
    <section className="bg-white text-gray-800 barlow-regular">
      {/* Hero */}
      <div className="relative">
        <img
          src={Cover}
          alt="Steam Cleaning"
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
    <span className="relative inline-block">
      ABOUT US

    </span>
  </h1>

  {/* Decorative Divider with Icon */}
  <div className="flex justify-center items-center gap-3 mb-6">
    <div className="w-24 h-1 bg-primary rounded"></div>
    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M12 4v16m8-8H4" />
    </svg>
    <div className="w-24 h-1 bg-primary rounded"></div>
  </div>

  {/* Our Story Subtitle */}
  <h2 className="text-2xl font-semibold text-secondary mb-2 animate-fade-in delay-300">
    Our Story
  </h2>

</div>

          <p className="text-gray-700 mb-8 leading-relaxed">
            SteamMaster was born out of a passion for pure, powerful cleaning.
            What began as a small, family-run service has grown into Sweden's
            trusted name in eco-friendly steam cleaning.
          </p>
          
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-primary mb-3">
              Why SteamMaster?
            </h3>
            <p className="text-gray-600 mb-6">
              Because clean isn't just about looking good – it's about living better.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 ">
              {features.map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center  bg-white shadow-xl border rounded-xl h-36 w-42 p-4"
                >
                  <div className="text-2xl text-[#99bf37] w-16 h-16 flex justify-center items-center bg-[#404040] rounded-full mb-8"><img src={icon} alt="" /></div>
                  <p className="text-sm font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Our Journey</h2>
          <p className="text-gray-600 mb-6">Growing Consistently Through the Years</p>
          <div className="flex justify-between items-center relative px-4">
            {timeline.map((year) => (
              <div key={year} className="flex flex-col items-center">
                <div className="w-3 h-3 bg-green-600 rounded-full mb-2"></div>
                <span className="text-sm">{year}</span>
              </div>
            ))}
          </div>
          <div className="h-px bg-gray-300 w-full mt-6"></div>
        </div>

        {/* Testimonials Section */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            "What our clients say"
          </h2>
          <p className="text-gray-600 mb-8">
            Real results. Real people. Real clean.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ name, location, title, comment }) => (
              <div
                key={name}
                className="bg-white p-6 rounded-lg border border-gray-200 text-left"
              >
                <h4 className="font-bold text-lg mb-2">{title}</h4>
                <p className="text-gray-700 text-sm mb-4">{comment}</p>
                <p className="text-gray-500 text-sm">
                  {name}, {location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;