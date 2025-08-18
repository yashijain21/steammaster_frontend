import { Link, NavLink, useLoaderData } from "react-router-dom";
import { FaCheckCircle, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";

const AXE_YELLOW = "text-yellow-400";   // or whatever your Tailwind config color is
const AXE_BG = "bg-black";              // dark background

function CategoryDetails() {
  const category = useLoaderData();
  const [allCategories, setAllCategories] = useState([]);
  const [services, setServices] = useState([]);
  const axios = useAxiosPublic();

  const isSubCategory = category?.parent !== null && category?.parent !== undefined;

  useEffect(() => {
    axios.get("/categories").then((res) => setAllCategories(res.data));
  }, [axios]);

  useEffect(() => {
    if (isSubCategory) {
      axios.get(`/services/category/${sub._id}`).then((res) => {
        setServices(res.data);
      });
    }
  }, [category, axios, isSubCategory]);
  // FABRICATE: Example staticCategoryContent, replace with your own mapping logic
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
    benefitDesc1: "Vi erbjuder möbeltvätt i Göteborg och många av närområden. Vi värnar både om dina möbler och miljön...",
    benefitTitle2: "Vår tvättmetod och utrustning",
    benefitDesc2: "Steam Master anstränger sig ständigt att finnas vid framkanten...",
    processTitle: "Hur går det till?",
    processDesc1: "Den torra, heta ångan på 180°C nedbryter de flesta typer av smuts...",
    processDesc2: "Ångtvätt underlättar arbetet för den som städar...",
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
},
"Mobil tjänster": {
    title1: "Mobila Städ- och Tvättjänster direkt till din dörr",
    desc1: "Steam Master erbjuder ett brett utbud av mobila tjänster – från möbeltvätt till bilvård, utförda där du befinner dig. Vårt team kommer till din bostad eller arbetsplats och levererar professionell service med miljövänliga metoder.",
    points: [
      "Vi kommer till dig",
      "Flexibla tider",
      "Miljösmarta lösningar"
    ],
   "benefitTitle1": "Slipp köer och logistik – Vi gör jobbet på plats",
    "benefitDesc1": "Oavsett om det gäller bilen, soffan eller hela bostaden erbjuder vi bekväma och professionella mobila tjänster som sparar både tid och energi.",
    "benefitTitle2": "Utrustning för alla miljöer",
    "benefitDesc2": "Vi använder portabel ångteknologi och professionella rengöringsprodukter som är säkra för både hem och fordon.",
    "processTitle": "Så fungerar våra mobila tjänster",
    "processDesc1": "Du bokar enkelt via vår hemsida eller telefon.",
    "processDesc2": "Vi kommer till din plats med all utrustning och utför jobbet utan att du behöver lyfta ett finger.",
    "checklist": [
      "Tidsbesparande",
      "Bekvämt",
      "Skräddarsytt efter dina behov",
      "Perfekt för barnfamiljer & äldre"
    ]
  },
  "Företagstjänster": {
    title1: "Professionella rengöringstjänster för företag i Sverige",
    desc1: "Steam Master erbjuder företagsanpassade lösningar inom rengöring, möbeltvätt, bilvård och mer. Vi hjälper kontor, restauranger, hotell och bilfirmor att hålla sina lokaler och fordon i toppskick.",
    points: [
      "Flexibla avtal",
      "På plats hos er",
      "Diskret och effektivt"
    ],
    benefitTitle1: "Anpassade lösningar för varje bransch",
    benefitDesc1: "Oavsett om du driver ett café, ett kontor eller ett bilföretag, har vi ett rengöringspaket för dig – anpassat efter din miljö och ditt schema.",
    benefitTitle2: "Professionell personal och utrustning",
    benefitDesc2:" Vi använder modern ångteknik och utbildad personal för att säkerställa ett hygieniskt och representativt resultat – varje gång.",
    processTitle: "Så fungerar det",
    processDesc1:" Vi börjar med ett kostnadsfritt konsultationsmöte för att identifiera behov.",
    processDesc2: "Därefter skapar vi ett avtal och sätter upp ett regelbundet schema.",
    checklist: [
      "Möbeltvätt för kontor & hotell",
      "Biltvätt för bilhandlare & leasing",
      "Rengöring inför kundmöten & inspektioner",
      "Flexibla bokningar – dagtid, kväll eller helg"
    ]
  }






  // Add more categories here...
  // Add more categories here...
};

  const staticContent = staticCategoryContent[category?.name] || null;

  return (
    <div className={`${AXE_BG} min-h-screen`}>
      <div className="relative h-80 flex items-center justify-center bg-gradient-to-r from-neutral-900 via-black to-neutral-800">
        <div className="w-full h-full absolute inset-0 opacity-50" />
        <div className="z-10 text-center">
          <h1 className="text-5xl font-extrabold text-white mb-2 drop-shadow-lg tracking-wide">
            {category.name}
          </h1>
          <p className="text-xl text-gray-200">{staticContent.desc1}</p>
        </div>
      </div>

      {/* SERVICES SECTION */}
      <section className="max-w-7xl mx-auto py-16 px-3">
        {/* Headline */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
          {staticContent.title1}
        </h2>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.length === 0 ? (
            <p className="text-white/70 text-center col-span-3">Inga tjänster tillgängliga...</p>
          ) : (
            services.map((service, i) => (
              <div key={service._id}
                   className="bg-neutral-900 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center group hover:scale-105 transition-transform">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-40 h-32 object-cover rounded-xl mb-4 border-4 border-neutral-800"
                />
                <span className="text-lg font-bold text-white mb-2">{service.name}</span>
                <p className="text-gray-400 mb-4">{service.description}</p>
                <Link to="/appoinment" state={{ selectedService: service }}>
                  <button className={`bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-lg shadow transition-colors mb-2`}>Boka Tid</button>
                </Link>
                <span className="font-medium text-white mt-2">{service.price} kr</span>
              </div>
            ))
          )}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-neutral-900 py-16 px-3">
        <div className="max-w-4xl mx-auto">
          <h3 className={`text-2xl text-white font-bold mb-8 text-center`}>How it Works</h3>
          <ol className="space-y-6 text-gray-200 text-lg">
            <li className="flex items-start">
              <span className={`text-yellow-400 font-bold mr-4`}>01.</span>
              <span>Book Your Appointment</span>
            </li>
            <li className="flex items-start">
              <span className={`text-yellow-400 font-bold mr-4`}>02.</span>
              <span>We Detail Your Car</span>
            </li>
            <li className="flex items-start">
              <span className={`text-yellow-400 font-bold mr-4`}>03.</span>
              <span>Enjoy the Shine</span>
            </li>
          </ol>
        </div>
      </section>

      {/* CTA / Contact */}
      <section className="py-16 px-3 bg-gradient-to-r from-black to-neutral-900">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-extrabold text-white mb-4">Your Car’s Best Look Is Just One Detail Away</h3>
          <p className="text-lg text-gray-200 mb-6">Book your detailing today and get <span className={AXE_YELLOW + " font-bold"}>30% Cut Off</span></p>
          <Link to="/appoinment">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-10 rounded-full text-xl transition-colors shadow-lg">Book Now</button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-black border-t border-neutral-800 py-8">
        <div className="max-w-7xl mx-auto text-center">
          <span className={`text-white text-md`}>Copyright © 2025 AXEMOBILE. All Rights Reserved.</span>
        </div>
      </footer>
    </div>
  );
}

export default CategoryDetails;
