// components/ContactUs.jsx
import React from "react";

const ContactUs = () => {
  return (
    <section className="bg-white py-10 px-6 md:px-20 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Section */}
        <div>
          <p className="text-gray-700 mb-4">
            You can use our online form to contact us.
          </p>
          <p className="text-gray-700">info@steammaster.se</p>
          <p className="text-gray-700">+46 10-199 76 75</p>
          <p className="text-gray-700 mb-6">Customer Support</p>
          <div className="mb-6">
            <img
              src="https://via.placeholder.com/300x200"
              alt="Map"
              className="rounded-lg"
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Our Location</h3>
            <p className="text-gray-700">
              Stockholm | Göteborg | Örebro | Västerås
            </p>
            <p className="text-gray-700">Business Hours: 08:00 - 18:00</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded border border-gray-300"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded border border-gray-300"
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full p-3 rounded border border-gray-300"
            ></textarea>
            <button
              type="submit"
              className="bg-lime-600 hover:bg-lime-700 text-white px-6 py-3 rounded"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
