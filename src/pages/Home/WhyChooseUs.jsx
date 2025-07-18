import { FaAward, FaClipboardCheck, FaUserTie, FaCar } from "react-icons/fa";

const services = [
  {
    icon: <FaAward size={40} />,
    title: "Högsta kvalitet",
    desc: "Professionell service med tillförlitlighet",
  },
  {
    icon: <FaClipboardCheck size={40} />,
    title: "Licens & Försäkring",
    desc: "Professionell service med tillförlitlighet",
  },
  {
    icon: <FaUserTie size={40} />,
    title: "Certifierade experter",
    desc: "Professionell service med tillförlitlighet",
  },
  {
    icon: <FaCar size={40} />,
    title: "Brett utbud av tjänster",
    desc: "Professionell service med tillförlitlighet",
  },
];

const WhyChooseUs = () => {
  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary uppercase">
          Varför välja <span className="text-primary">SteamMaster</span>
        </h2>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-[#1c1c1c] text-white p-8 rounded-md text-center shadow-md group transition-all duration-300"
          >
            <div className="flex justify-center items-center">
              <div className="text-primary mb-4 group-hover:text-secondary transition-colors duration-300">
                {service.icon}
              </div>
            </div>
            <h3 className="text-lg font-bold uppercase mb-2">{service.title}</h3>
            <p className="text-sm">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
