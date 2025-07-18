import React, { useState, useEffect } from "react";
import { FaSlidersH } from "react-icons/fa";
import classNames from "classnames";
import useAxiosPublic from "../../hooks/useAxiosPublic"; // assuming this exists

const CarFilterSection = () => {
  const axios = useAxiosPublic();
  const [showFilters, setShowFilters] = useState(false);
  const [formData, setFormData] = useState({
    search: "",
    category: "",
    vehicleType: "",
    location: "",
    transmission: "",
    drivetrain: "",
    fuel: "",
    sortBy: "",
  });
  const [blink, setBlink] = useState(false);
  const [services, setServices] = useState([]);
  const [showPriceList, setShowPriceList] = useState(false);

  const handleSearchClick = () => {
    setShowFilters((prev) => !prev);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Auto-blink effect
  useEffect(() => {
    const requiredFields = showFilters
      ? ["search", "category", "vehicleType", "location", "transmission", "drivetrain", "fuel", "sortBy"]
      : ["search", "category", "vehicleType", "location"];

    const allFilled = requiredFields.every((field) => formData[field]?.trim() !== "");
    setBlink(allFilled);
  }, [formData, showFilters]);

  const handleGetQuote = async () => {
    const requiredFields = showFilters
      ? ["search", "category", "vehicleType", "location", "transmission", "drivetrain", "fuel", "sortBy"]
      : ["search", "category", "vehicleType", "location"];

    const allFilled = requiredFields.every((field) => formData[field]?.trim() !== "");

    if (allFilled) {
      try {
        const res = await axios.get("/services");
        setServices(res.data || []);
        setShowPriceList(true);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      }
    } else {
      setShowPriceList(false);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md space-y-4">
      <style>
        {`
          .blink {
            animation: blinker 1s linear infinite;
          }
          @keyframes blinker {
            50% { opacity: 0.3; }
          }
        `}
      </style>

      {/* Top Search Row */}
      <div className="flex flex-wrap gap-4 items-start">
        <input
          type="text"
          name="search"
          placeholder="Sök via bil-ID, namn, telefon eller e-post"
          value={formData.search}
          onChange={handleChange}
          className="flex-1 px-4 py-2 border rounded-md w-full md:w-auto"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">Tjänstekategori</option>
          <option>Bilvätt</option>
          <option>Bilpolering</option>
          <option>Färgskydd</option>
          <option>Invändig rengöring</option>
          <option>Fälgrengöring</option>
          <option>Motortvätt</option>
          <option>Strålkastarrenovering</option>
        </select>

        <select
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">Fordonstyp</option>
          <option>Personbil</option>
          <option>SUV</option>
          <option>Pickup</option>
          <option>Minibuss</option>
          <option>Elbil</option>
        </select>

        <select
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">Plats (Göteborg)</option>
          <option>Centrum</option>
          <option>Vasastan</option>
          <option>Hisingen</option>
          <option>Majorna</option>
          <option>Linné</option>
          <option>Frölunda</option>
          <option>Angered</option>
          <option>Kortedala</option>
          <option>Johanneberg</option>
          <option>Mölndal</option>
          <option>Guldheden</option>
          <option>Backa</option>
        </select>

        <button
          onClick={handleSearchClick}
          className="bg-primary text-white px-4 py-2 rounded-md flex items-center"
        >
          <FaSlidersH className="mr-2" />
          Fler filter
        </button>

        <button
          onClick={handleGetQuote}
          className={classNames(
            "px-4 py-2 rounded-md flex items-center text-white",
            {
              "bg-primary blink": blink,
              "bg-gray-400": !blink,
            }
          )}
        >
          Få offert
        </button>
      </div>

      {/* Optional Filters */}
      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <select
            name="transmission"
            value={formData.transmission}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md w-full"
          >
            <option value="">Typ av transmission</option>
            <option>Automat</option>
            <option>Manuell</option>
          </select>

          <select
            name="drivetrain"
            value={formData.drivetrain}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md w-full"
          >
            <option value="">Drivning</option>
            <option>Framhjulsdrift</option>
            <option>Bakhjulsdrift</option>
            <option>Fyrhjulsdrift</option>
          </select>

          <select
            name="fuel"
            value={formData.fuel}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md w-full"
          >
            <option value="">Bränsletyp</option>
            <option>Bensin</option>
            <option>Diesel</option>
            <option>El</option>
            <option>Hybrid</option>
          </select>

          <select
            name="sortBy"
            value={formData.sortBy}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md w-full"
          >
            <option value="">Sortera efter</option>
            <option>Senaste först</option>
            <option>Pris (lågt till högt)</option>
            <option>Pris (högt till lågt)</option>
            <option>Betyg</option>
          </select>
        </div>
      )}

      {/* Price List Section */}
      {showPriceList && services.length > 0 && (
        <div className="mt-10 px-2">
          <h2 className="text-2xl font-semibold text-center text-primary mb-4">
            Prislista för Tjänster
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-6 py-3 border-b text-sm font-bold">Tjänst</th>
                  <th className="px-6 py-3 border-b text-sm font-bold">Pris (SEK)</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-3 border-b">{service.name}</td>
                    <td className="px-6 py-3 border-b">
                      {service.price ? `${service.price} kr` : "Kontakta oss"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarFilterSection;
