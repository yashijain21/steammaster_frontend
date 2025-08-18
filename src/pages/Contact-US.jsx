// components/ContactUs.jsx

import React from "react";

const ContactUs = () => {
  return (
    <section className="bg-white py-10 px-6 md:px-20 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Kontakta oss</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Vänster sektion */}
        <div>
          <p className="text-gray-700 mb-4">
            Du kan använda vårt onlineformulär för att komma i kontakt med oss.
          </p>

          <p className="text-gray-700">info@steammaster.se</p>
          <p className="text-gray-700">+46 10-199 76 75</p>
          <p className="text-gray-700 mb-6">Kundsupport</p>

          <div className="w-full h-[450px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4363648.880047922!2d2.7366959749999973!3d57.72175849999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464ff53241e625d3%3A0xfac72e321ad4c93f!2sSteam%20Master%20-%20Bilv%C3%A5rd%20G%C3%B6teborg%20(Ring%C3%B6n)!5e0!3m2!1sen!2sin!4v1755501766980!5m2!1sen!2sin"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Våra anläggningar</h3>
            <p className="text-gray-700">
              Stockholm | Göteborg | Örebro | Västerås
            </p>
            <p className="text-gray-700">Öppettider: 08:00 - 18:00</p>
          </div>
        </div>

        {/* Höger sektion */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Kontakta oss direkt</h3>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Ditt namn"
              className="w-full p-3 rounded border border-gray-300"
            />

            <input
              type="email"
              placeholder="Din e-postadress"
              className="w-full p-3 rounded border border-gray-300"
            />

            <textarea
              placeholder="Ditt meddelande"
              rows="4"
              className="w-full p-3 rounded border border-gray-300"
            ></textarea>

            <button
              type="submit"
              className="bg-lime-600 hover:bg-lime-700 text-white px-6 py-3 rounded"
            >
              Skicka
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
