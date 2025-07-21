import { useEffect, useState } from "react";
import { Link, NavLink, useLoaderData } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { FaStar, FaCheckCircle, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";


// Import your staticCategoryContent from your existing object
const staticCategoryContent = {
  "Möbelrengöring": {
    title1: "Möbeltvätt för företag och privatpersoner",
    desc1: `Vi på Steam Master hjälper både privatpersoner och företagskunder att
djuprengöra och fräscha upp deras lösa och fasta möbler. Fläckborttagning och luktborttagning är två av våra specialiteter.`,
    points: [
      "Modernt teknik",
      "Miljövänligt",
      "Nöjd kund-garanti"
    ],
    benefitTitle1: "Enkel, flexibel och anpassad möbeltvätt efter dina behov",
    benefitDesc1: `Vi erbjuder möbeltvätt i Göteborg och många av närområden. Vi värnar både om dina möbler och miljön...`,
    benefitTitle2: "Vår tvättmetod och utrustning",
    benefitDesc2: `Steam Master anstränger sig ständigt att finnas vid framkanten...`,
    processTitle: "Hur går det till?",
    processDesc1: `Den torra, heta ångan på 180°C nedbryter de flesta typer av smuts...`,
    processDesc2: `Ångtvätt underlättar arbetet för den som städar...`,
    checklist: [
      "Du som kund slipper bära tunga möbler",
      "Behöver inte längre köpa nya möbler så ofta",
      "Genom att anlita oss gör du den bästa besparingen både för din plånbok och miljön"
    ]
  },
 "Biltvättstjänster": {
    "title1": "Professionell Biltvätt med Premium Finish",
  "desc1": "Vi på Steam Master erbjuder biltvätt som inte bara gör bilen ren utan bevarar lacken. Våra produkter är skonsamma mot bilen och miljön. Med vår innovativa ångtvättteknik tar vi bort smuts, bakterier och allergener från både interiör och exteriör – helt utan att slösa vatten. Oavsett om du är hemma, på jobbet eller någon annanstans, kommer vi till dig och ger bilen en professionell rengöring med premium finish.",

    "points": [
      "Skonsamma produkter",
      "Snabb och effektiv",
      "Nöjd kund-garanti"
    ],
    "benefitTitle1": "Flexibel biltvätt var du än är",
    "benefitDesc1": "Vi erbjuder mobil biltvätt – hemma hos dig eller på kontoret.Ångtvätt är skonsamt både mot miljö, bil och personal. Vi tvättar alltid för hand med en noggrann metod och unik ångtvättsteknik. Du sparar tid och slipper köer – ett smart val för både bil och plånbok",
    "benefitTitle2": "Utrustning som ger resultat",
    "benefitDesc2": "Vi använder ångteknologi och mikrofiberduk för skonsam rengöring Moderna och klimatsmartare tvättmetoder än traditionella alternativ. Ångan når in i trånga och svåråtkomliga utrymmen för optimerat resultat. .",
    "processTitle": "Hur fungerar det?",
    "processDesc1": "Ångtvätt rengör bilen på djupet och eliminerar bakterier i kupén.",
    "processDesc2": "Ingen vattenansamling – bilen är redo direkt efter tvätten.",
    "checklist": [
      "Rengör både interiör och exteriör",
      "Miljövänligt alternativ till traditionell biltvätt",
      "Bevarar bilens andrahandsvärde",
      "Snabbt, enkelt och skonsamt sätt att tvätta bilen"
    ],
  
  },
  "Husbil & Båt": {
  "title1": "Professionell Rengöring för Husbil och Båt",
  "desc1": "Vi på Steam Master erbjuder professionell rengöring av både husbilar och båtar – direkt där de står. Våra mobila enheter gör det enkelt för dig att få ett skinande rent resultat utan att behöva köra till en tvätthall. Vi använder ångtvätt som är både effektiv och miljövänlig, perfekt för fordon som kräver särskild omtanke.",
  "points": [
    "Flexibel och mobil service",
    "Skonsam mot alla ytor",
    "Effektiv mot mögel och dålig lukt"
  ],
  "benefitTitle1": "Vi kommer dit din husbil eller båt är",
  "benefitDesc1": "Oavsett om ditt fordon är parkerat på uppfarten, campingen eller i förvaring – vi utför rengöringen där. Du slipper all logistik, köer och onödigt tidsförlust. Det sparar både pengar och miljöpåverkan.",
  "benefitTitle2": "Grundlig rengöring med ångteknologi",
  "benefitDesc2": "Vi rengör både in- och utvändigt med ånga som tränger in i svåråtkomliga utrymmen. Tekniken tar effektivt bort smuts, mögel, bakterier och lukt utan att skada känsliga material eller lack.",
  "processTitle": "Hur går det till?",
  "processDesc1": "Du fyller i vårt formulär med dina önskemål. Vi återkommer med fast pris och bekräftelse inom 24 timmar.",
  "processDesc2": "Vi kontaktar dig och bokar en tid som passar – sedan utför vi hela jobbet på plats utan att du behöver lyfta ett finger.",
  "checklist": [
    "Skonsam rengöring av känsliga ytor",
    "Perfekt för vinterförvaring eller inför resan",
    "Bekvämt – vi kommer till dig",
    "Mögel- och luktborttagning ingår"
  ]
},
"Lackreparation & Små Bucklor": {
  "title1": "Reparation av Lack och Små Bucklor",
  "desc1": "Vi erbjuder smarta lösningar för mindre lackskador, repor och bucklor – utan att behöva lackera om hela bilen. Perfekt för privatpersoner som vill återställa bilens utseende till ett rimligt pris.",
  "points": [
    "Snabbt utförande",
    "Kostnadseffektivt",
    "Bibehåller bilens värde"
  ],
  "benefitTitle1": "Skonsam reparation på plats",
  "benefitDesc1": "Vi kommer till dig och utför jobbet snabbt och professionellt. Du slipper lämna in bilen på verkstad i flera dagar.",
  "benefitTitle2": "Professionell utrustning och teknik",
  "benefitDesc2": "Vi använder precisionsverktyg och modern teknik för att bearbeta bucklor och återställa lackens finish utan att påverka omkringliggande ytor.",
  "processTitle": "Hur fungerar det?",
  "processDesc1": "Skicka bilder på skadan via vårt bokningsformulär.",
  "processDesc2": "Vi ger dig fast pris och bokar tid för reparation på plats.",
  "checklist": [
    "Ingen omlackering behövs",
    "Perfekt för småskador och repor",
    "Tidseffektivt och prisvärt"
  ]
},

"Rekonditionering": {
  "title1": "Professionell Rekonditionering – Förvandla din bil till nyskick",
  "desc1": "På Steam Master erbjuder vi avancerad bilrekonditionering som går långt bortom en vanlig biltvätt. Med hjälp av modern ångteknik, professionell utrustning och miljövänliga produkter återställer vi din bils utseende, hygien och känsla – både invändigt och utvändigt. Vi hjälper dig att bevara bilens värde, komfort och estetik.",
  "points": [
    "Djuprengöring av interiör & exteriör",
    "Lackskydd och vaxbehandling",
    "Miljövänliga och skonsamma metoder",
    "Specialiserade på fläckborttagning & lukteliminering",
    "Nöjd kund-garanti på alla rekondtjänster"
  ],
  "benefitTitle1": "Skräddarsydd bilvård – För dina behov och din bils skick",
  "benefitDesc1": "Vi erbjuder flera olika rekondpaket beroende på vad din bil behöver – från grundläggande rengöring till fullständig rekond med motortvätt, polering, interiörrengöring och vaxskydd. Oavsett om du förbereder bilen för försäljning, vill ge den ett lyft efter vintern eller bara vill ha den skinande ren, så har vi rätt paket för dig.",
  "benefitTitle2": "Varför välja Steam Master för rekonditionering?",
  "benefitDesc2": "Vi använder ångbaserad rengöring som effektivt avlägsnar smuts, fett och bakterier utan att skada material eller lack. Vår personal är utbildad och noggrann, och vi behandlar varje bil med samma omsorg som om den vore vår egen. Vi arbetar med premiumprodukter som ger ett långvarigt och glänsande resultat.",
  "processTitle": "Hur går en bilrekonditionering till hos oss?",
  "processDesc1": "Processen börjar med en noggrann inspektion av din bils skick. Därefter inleder vi rengöringen invändigt – vi dammsuger, rengör säten, golvmattor, dörrpaneler och instrumentpaneler. Fläckar och dofter behandlas specifikt med ånga och professionella medel.",
  "processDesc2": "Exteriört tvättar vi bilen med ånga, rengör fälgar och hjulhus, tar bort tjära och asfaltsfläckar, och avslutar med polering och vaxning för att skydda lacken och ge bilen en spegelblank finish. Motortvätt ingår i vissa paket där vi skyddar elkomponenter noggrant.",
  "checklist": [
    "Djuprengöring av säten, mattor, paneler och tak",
    "Fläckborttagning och luktneutralisering",
    "Fälgrengöring och däckglans",
    "Polering, lackförsegling och vaxbehandling",
    "Motortvätt med skydd av känsliga komponenter",
    "Skräddarsydda paket: Bas, Silver, Premium & Elite"
  ]
}






  // Add more categories here...
};


const AccordionItem = ({ sub, axios }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const toggleAccordion = async () => {
    if (!loaded) {
      const res = await axios.get(`/services/category/${sub._id}`);
      setServices(res.data);
      setLoaded(true);
      

      // Only open accordion if services exist
      if (res.data.length > 0) setIsOpen(true);
    } else {
      setIsOpen(!isOpen);
    }
  };

  // If services are already known to be 0, just show static card
  if (loaded && services.length === 0) {
    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{sub.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{sub.description}</p>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="font-bold text-primary text-lg">1 kr</div>
          <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg transition-colors whitespace-nowrap">
            Boka Tid
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={toggleAccordion}
        className="w-full text-left p-5 flex justify-between items-center hover:bg-gray-50 transition-colors"
      >
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{sub.name}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {sub.description?.slice(0, 80)}...
          </p>
        </div>
        {loaded && services.length === 0 ? null : (
          <div
            className={`text-gray-500 transition-transform ${
              isOpen ? "rotate-90" : ""
            }`}
          >
            <IoIosArrowForward size={20} />
          </div>
        )}
      </button>

      {isOpen && services.length > 0 && (
        <div className="px-5 pb-5 space-y-4">
          {services.map((service) => (
            <div
              key={service._id}
              className="border-t border-gray-100 pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="min-w-[96px]">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {service.name}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {service.description}
                  </p>
                  <p className="font-bold text-primary mt-2 text-lg">
                    {service.price} kr
                  </p>
                </div>
              </div>
              <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg transition-colors whitespace-nowrap">
                Boka Tid
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};



const CategoryDetails = () => {
  const category = useLoaderData();
  const staticContent = staticCategoryContent[category?.name] || null;
  const [allCategories, setAllCategories] = useState([]);
  const [services, setServices] = useState([]);
  const axios = useAxiosPublic();

  const isSubCategory = category?.parent !== null && category?.parent !== undefined;

  useEffect(() => {
    axios.get("/categories").then((res) => setAllCategories(res.data));
  }, [axios]);

  useEffect(() => {
    if (isSubCategory) {
      axios.get(`/services/category/${category._id?.$oid || category._id}`).then((res) => {
        setServices(res.data);
      });
    }
  }, [category, axios, isSubCategory]);

  return (
    <div className="bg-gray-50 min-h-screen barlow-regular">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={category.image || "https://images.unsplash.com/photo-1603575448878-868a20723f5d?auto=format&fit=crop&w=2070&q=80"}
          alt={category.name}
          className="w-full h-full object-cover brightness-75"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 pb-12">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 barlow-bold">
              {category.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-primary px-4 py-1 rounded-full text-white font-medium barlow-regular">
                Featured
              </span>
              <div className="flex items-center text-yellow-400">
                <FaStar className="mr-1" />
                <span className="text-white barlow-regular">4.8 (200+ reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 my-12 flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <div className="flex-1 space-y-12">
          {staticContent && (
            <>
              {/* Introduction Section */}
              <section className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                <div className="space-y-5">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 barlow-bold">
                    {staticContent.title1}
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed">{staticContent.desc1}</p>
                  <ul className="flex flex-wrap gap-4 text-primary font-semibold">
                    {staticContent.points.map((point, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full"
                      >
                        <FaCheckCircle className="text-green-500" /> {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Benefits Section */}
              <section className="bg-white rounded-xl shadow-sm p-6 md:p-8 border-l-4 border-primary">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      {staticContent.benefitTitle1}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">{staticContent.benefitDesc1}</p>
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      {staticContent.benefitTitle2}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">{staticContent.benefitDesc2}</p>
                  </div>
                </div>
              </section>

              {/* Process Section */}
              <section className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl shadow-sm p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-4">
                      {staticContent.processTitle}
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-6">{staticContent.processDesc1}</p>
                    <p className="text-gray-700 leading-relaxed">{staticContent.processDesc2}</p>
                  </div>
                  <div>
                    <div className="bg-white p-6 rounded-lg shadow-xs border border-gray-100">
                      <ul className="space-y-4">
                        {staticContent.checklist.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* Subcategories or services */}
          {!isSubCategory && (
            <section className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 barlow-bold">
                Våra Tjänsteområden inom {category.name}
              </h2>
              <div className="space-y-4">
                {allCategories
                  .filter((cat) => {
                    const parentId =
                      typeof cat.parent === "object" && cat.parent !== null
                        ? cat.parent.$oid || cat.parent.toString()
                        : cat.parent;
                    return parentId === category._id;
                  })
                  .map((sub) => (
                    <AccordionItem key={sub._id} sub={sub} axios={axios} />
                  ))}
              </div>
            </section>
          )}

          {isSubCategory && services.length > 0 && (
            <section className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 barlow-bold">Våra Tjänster</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <div
                    key={service._id}
                    className="bg-white border border-gray-100 rounded-lg shadow-sm p-4 hover:shadow-md transition-all"
                  >
                    <div className="overflow-hidden rounded-lg mb-4">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">{service.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <div className="text-primary font-bold text-lg">{service.price} kr</div>
                      <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors">
                        Boka Tid
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:w-96 space-y-6 sticky top-6 h-fit">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Kontakta Oss</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Namn</label>
                <input
                  type="text"
                  placeholder="Ditt namn"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Din email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Meddelande</label>
                <textarea
                  placeholder="Ditt meddelande"
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg transition-colors font-medium"
              >
                Skicka Meddelande
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-50 rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Kontaktinformation</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FaPhoneAlt className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-600">Telefon</p>
                  <a
                    href="tel:+46123456789"
                    className="text-gray-900 font-medium hover:text-primary transition-colors"
                  >
                 +46 76 556 67 75
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaEnvelope className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-600">Email</p>
                  <a
                    href="mailto:info@steammaster.se"
                    className="text-gray-900 font-medium hover:text-primary transition-colors"
                  >
                    info@steammaster.se
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-600">Adress</p>
                 <a href="https://maps.app.goo.gl/w9rBgDLHmi7QJaWV9">
                   <p className="text-gray-900 font-medium">Bleckvarugatan 3, 417 07 Göteborg, Sweden</p>
                 </a>
                </div>
              </div>
            </div>
          </div>

          {/* Explore Categories */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Upptäck Våra Tjänster</h3>
            <div className="space-y-4">
              {allCategories
                .filter((cat) => cat.parent === null)
                .map((item) => (
                  <NavLink
                    key={item._id}
                    to={`/category/${item._id}`}
                    className={({ isActive }) =>
                      `flex items-center gap-4 p-3 rounded-lg transition-all hover:bg-gray-50 ${
                        isActive ? "bg-gray-50 border-l-4 border-primary" : ""
                      }`
                    }
                  >
                    <div className="w-14 h-14 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                      <p className="text-sm text-gray-500 truncate">
                        {item.description?.slice(0, 50)}...
                      </p>
                    </div>
                    <IoIosArrowForward className="text-gray-400 flex-shrink-0" />
                  </NavLink>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
