import React, { useRef } from 'react';

const CarServicesShowcase = () => {
  const services = [
    {
      title: "Utvändig Biltvätt & Detaljvård",
      video: "/vdos/vdo1.mp4",
      description: "Professionell utvändig rengöring som tar bort smuts och återställer glansen"
    },
    {
      title: "Renovering av Fälgar",
      video: "/vdos/vdo2.mp4",
      description: "Fullständig restaurering av fälgar för att få dem att se ut som nya"
    },
    {
      title: "Invändig Djuprengöring",
      video: "/vdos/vdo3.mp4",
      description: "Grundlig rengöring av säten, mattor och alla inre ytor"
    },
    {
      title: "Renovering av Strålkastare",
      video: "/vdos/vdo4.mp4",
      description: "Avlägsna oxidation för att återställa kristallklara strålkastare"
    }
  ];

  const videoRefs = useRef([]);

  const togglePlay = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;
    video.paused ? video.play() : video.pause();
  };

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 barlow-regular">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-secondary sm:text-4xl">
            Våra Premiumtjänster
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-primary sm:mt-4">
            Professionell bilvård som ger synliga resultat
          </p>
        </div>

        {/* Video Layout */}
        <div className="flex md:flex-row gap-6">
          {/* Left - 2 videos stacked or side-by-side */}
          <div className="flex flex-col md:flex-row gap-6 md:w-2/3">
            {services.slice(0, 2).map((service, index) => (
              <div
                key={index}
                className="relative rounded-lg shadow-md overflow-hidden flex-1 min-w-0 h-[85vh] group"
              >
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={service.video}
                  muted
                  loop
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <p className="text-gray-200 mt-1">{service.description}</p>
                </div>
                <div
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  onClick={() => togglePlay(index)}
                >
                  <div className="bg-black/50 rounded-full p-3 hover:bg-black/70">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right - 2 smaller videos */}
          <div className="flex flex-col gap-6 md:w-1/3">
            {services.slice(2, 4).map((service, idx) => {
              const index = idx + 2;
              return (
                <div
                  key={index}
                  className="relative rounded-lg shadow-md overflow-hidden h-[40vh] w-full group"
                >
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={service.video}
                    muted
                    loop
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold">{service.title}</h3>
                    <p className="text-gray-200 mt-1">{service.description}</p>
                  </div>
                  <div
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    onClick={() => togglePlay(index)}
                  >
                    <div className="bg-black/50 rounded-full p-3 hover:bg-black/70">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarServicesShowcase;
