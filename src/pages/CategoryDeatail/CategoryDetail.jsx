import { useEffect, useState } from "react";
import { Link, NavLink, useLoaderData } from "react-router-dom";
import { FaStar, FaCheckCircle, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const staticCategoryContent = {
  "Möbelrengöring": {
    title1: "Möbeltvätt för företag och privatpersoner",
    desc1: `Vi på Steam Master hjälper både privatpersoner och företagskunder att
djuprengöra och fräscha upp deras lösa och fasta möbler. Fläckborttagning och luktborttagning är två av våra specialiteter.`,
    points: ["Modernt teknik", "Miljövänligt", "Nöjd kund-garanti"],
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
    ],
    introImg: "https://media.istockphoto.com/id/626851364/photo/upholstered-furniture-professionally-chemical-cleaning-in-hotel-and-house.jpg?s=612x612&w=0&k=20&c=D1n_baz56UuGDcwS8aKip6hwWK6-Jt6cXrZoEnGh80g=",
    benefitImg: "https://localfloorcleaner.com/wp-content/uploads/2025/05/Health-Benefits-of-Upholstery-Cleaning-image-1024x702.jpg",
    processImg: "https://www.specialtyrestorationoftexas.com/assets/images/content/img-carpet-upholstry.jpg"
  },

  "Biltvättstjänster": {
    title1: "Professionell Biltvätt med Premium Finish",
    desc1: "Vi på Steam Master erbjuder biltvätt som inte bara gör bilen ren utan bevarar lacken. Våra produkter är skonsamma mot bilen och miljön...",
    points: ["Skonsamma produkter", "Snabb och effektiv", "Nöjd kund-garanti"],
    benefitTitle1: "Flexibel biltvätt var du än är",
    benefitDesc1: "Vi erbjuder mobil biltvätt – hemma hos dig eller på kontoret...",
    benefitTitle2: "Utrustning som ger resultat",
    benefitDesc2: "Vi använder ångteknologi och mikrofiberduk för skonsam rengöring...",
    processTitle: "Hur fungerar det?",
    processDesc1: "Ångtvätt rengör bilen på djupet och eliminerar bakterier i kupén.",
    processDesc2: "Ingen vattenansamling – bilen är redo direkt efter tvätten.",
    checklist: [
      "Rengör både interiör och exteriör",
      "Miljövänligt alternativ till traditionell biltvätt",
      "Bevarar bilens andrahandsvärde",
      "Snabbt, enkelt och skonsamt sätt att tvätta bilen"
    ],
    introImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDXK5KX8jjtnpajeDW4hOGrye3rOFMeiFNOws-7-CpQdNev1vxo9mmZrqXKs5bcETpyhc&usqp=CAU",
    benefitImg: "https://dht7q8fif4gks.cloudfront.net/2023-03/car%20detailing%20tn.jpg",
    processImg: "https://media.istockphoto.com/id/1319694476/photo/before-and-after-the-leather-seat-cleaning-service.jpg?s=612x612&w=0&k=20&c=MbSqiSTikS3Ka9EAGx3dlR0MCtDSf0NoG3gObETvFqY="
  },

  "Husbil & Båt": {
    title1: "Professionell Rengöring för Husbil och Båt",
    desc1: "Vi på Steam Master erbjuder professionell rengöring av både husbilar och båtar – direkt där de står...",
    points: ["Flexibel och mobil service", "Skonsam mot alla ytor", "Effektiv mot mögel och dålig lukt"],
    benefitTitle1: "Vi kommer dit din husbil eller båt är",
    benefitDesc1: "Oavsett om ditt fordon är parkerat på uppfarten, campingen eller i förvaring...",
    benefitTitle2: "Grundlig rengöring med ångteknologi",
    benefitDesc2: "Vi rengör både in- och utvändigt med ånga som tränger in i svåråtkomliga utrymmen...",
    processTitle: "Hur går det till?",
    processDesc1: "Du fyller i vårt formulär med dina önskemål...",
    processDesc2: "Vi kontaktar dig och bokar en tid som passar – sedan utför vi hela jobbet på plats...",
    checklist: [
      "Skonsam rengöring av känsliga ytor",
      "Perfekt för vinterförvaring eller inför resan",
      "Bekvämt – vi kommer till dig",
      "Mögel- och luktborttagning ingår"
    ],
    introImg: "https://media.gettyimages.com/id/1388845425/photo/man-silhouette-washing-the-boat-hull-side-view.jpg?s=612x612&w=0&k=20&c=6_lbimhu4xnUq5v79RRssZKkXv33ySQ5i4HbWG5KoKI=",
    benefitImg: "https://media.gettyimages.com/id/1434370919/photo/skipper-cleans-the-bottom-of-his-sailing-yacht-with-a-karcher.jpg?s=612x612&w=0&k=20&c=Yx_Y6VcoXahtSWAfJi1St5BNWsA8O_D0EvVyvh6SMHA=",
    processImg: "https://media.gettyimages.com/id/1418804421/photo/car-wash-worker.jpg?s=612x612&w=0&k=20&c=1nW9KezNzpaY-RPQ9oZjCp9wZt4SZFJazsYmFBNk0EM="
  },

  "Lackreparation & Små Bucklor": {
    title1: "Reparation av Lack och Små Bucklor",
    desc1: "Vi erbjuder smarta lösningar för mindre lackskador, repor och bucklor...",
    points: ["Snabbt utförande", "Kostnadseffektivt", "Bibehåller bilens värde"],
    benefitTitle1: "Skonsam reparation på plats",
    benefitDesc1: "Vi kommer till dig och utför jobbet snabbt och professionellt...",
    benefitTitle2: "Professionell utrustning och teknik",
    benefitDesc2: "Vi använder precisionsverktyg och modern teknik...",
    processTitle: "Hur fungerar det?",
    processDesc1: "Skicka bilder på skadan via vårt bokningsformulär.",
    processDesc2: "Vi ger dig fast pris och bokar tid för reparation på plats.",
    checklist: [
      "Ingen omlackering behövs",
      "Perfekt för småskador och repor",
      "Tidseffektivt och prisvärt"
    ],
    introImg: "https://plus.unsplash.com/premium_photo-1661750320243-9b8833de05de?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2FyJTIwZGVudHxlbnwwfHwwfHx8MA%3D%3D",
    benefitImg: "https://media.istockphoto.com/id/1328727433/photo/photo-of-car-dent-repair-before.webp?a=1&b=1&s=612x612&w=0&k=20&c=yIl2rWHw37j5IDs9VZNR7fpr3qICPYw40Rn-U_ZSC2k=",
    processImg: "https://media.istockphoto.com/id/1071674170/photo/car-painting-procedure-at-auto-service-store-car-accident-at-the-front-door-and-rear-door-left.webp?a=1&b=1&s=612x612&w=0&k=20&c=wWJMDLu_Jsl5UAXW8_H6pULkPA21eu_xjOXC5GMZrkw="
  },

  "Rekonditionering": {
    title1: "Professionell Rekonditionering – Förvandla din bil till nyskick",
    desc1: "På Steam Master erbjuder vi avancerad bilrekonditionering som går långt bortom en vanlig biltvätt...",
    points: [
      "Djuprengöring av interiör & exteriör",
      "Lackskydd och vaxbehandling",
      "Miljövänliga och skonsamma metoder",
      "Specialiserade på fläckborttagning & lukteliminering",
      "Nöjd kund-garanti på alla rekondtjänster"
    ],
    benefitTitle1: "Skräddarsydd bilvård – För dina behov och din bils skick",
    benefitDesc1: "Vi erbjuder flera olika rekondpaket beroende på vad din bil behöver...",
    benefitTitle2: "Varför välja Steam Master för rekonditionering?",
    benefitDesc2: "Vi använder ångbaserad rengöring som effektivt avlägsnar smuts...",
    processTitle: "Hur går en bilrekonditionering till hos oss?",
    processDesc1: "Processen börjar med en noggrann inspektion av din bils skick...",
    processDesc2: "Exteriört tvättar vi bilen med ånga, rengör fälgar och hjulhus...",
    checklist: [
      "Djuprengöring av säten, mattor, paneler och tak",
      "Fläckborttagning och luktneutralisering",
      "Fälgrengöring och däckglans",
      "Polering, lackförsegling och vaxbehandling",
      "Motortvätt med skydd av känsliga komponenter",
      "Skräddarsydda paket: Bas, Silver, Premium & Elite"
    ],
    introImg: "https://media.istockphoto.com/id/1322050545/photo/car-scratch-repair-before-and-after.webp?a=1&b=1&s=612x612&w=0&k=20&c=xgOFiXmRzpsfHfswTEho2LIUAXxMlWRs_kOugaDPh4Y=",
    benefitImg: "https://media.istockphoto.com/id/1470940455/photo/photo-of-car-dent-repair-before.webp?a=1&b=1&s=612x612&w=0&k=20&c=0Kv0lx5kvmy9vTXvOi_XjEGNZQZQB42esVhbfHS-IS8=",
    processImg: "https://www.clinecollisioncenter.com/wp-content/uploads/2020/02/1.jpg"
  },

  "Mobil tjänster": {
    title1: "Mobila Städ- och Tvättjänster direkt till din dörr",
    desc1: "Steam Master erbjuder ett brett utbud av mobila tjänster – från möbeltvätt till bilvård...",
    points: ["Vi kommer till dig", "Flexibla tider", "Miljösmarta lösningar"],
    benefitTitle1: "Slipp köer och logistik – Vi gör jobbet på plats",
    benefitDesc1: "Oavsett om det gäller bilen, soffan eller hela bostaden...",
    benefitTitle2: "Utrustning för alla miljöer",
    benefitDesc2: "Vi använder portabel ångteknologi och professionella rengöringsprodukter...",
    processTitle: "Så fungerar våra mobila tjänster",
    processDesc1: "Du bokar enkelt via vår hemsida eller telefon.",
    processDesc2: "Vi kommer till din plats med all utrustning och utför jobbet utan att du behöver lyfta ett finger.",
    checklist: ["Tidsbesparande", "Bekvämt", "Skräddarsytt efter dina behov", "Perfekt för barnfamiljer & äldre"],
    introImg: "https://content.jdmagicbox.com/comp/noida/n6/011pxx11.xx11.161004144920.b7n6/catalogue/homeca-barola-noida-sector-49-noida-car-cleaning-services-ps6dq.jpg",
    benefitImg: "https://www.zoopgo.com/admin/uploads/vendors/4962/icon-17054133430.jpg",
    processImg: "https://media.istockphoto.com/id/969464542/video/worker-with-tool-box-walk-to-a-client-house-and-ring-the-doorbell.jpg?s=640x640&k=20&c=2pNFOtAvynx_dVi5ZmtMuolcqZiImll2GtG3zPvXtXw="
  },

  "Företagstjänster": {
    title1: "Professionella rengöringstjänster för företag i Sverige",
    desc1: "Steam Master erbjuder företagsanpassade lösningar inom rengöring, möbeltvätt, bilvård och mer...",
    points: ["Flexibla avtal", "På plats hos er", "Diskret och effektivt"],
    benefitTitle1: "Anpassade lösningar för varje bransch",
    benefitDesc1: "Oavsett om du driver ett café, ett kontor eller ett bilföretag...",
    benefitTitle2: "Professionell personal och utrustning",
    benefitDesc2: "Vi använder modern ångteknik och utbildad personal...",
    processTitle: "Så fungerar det",
    processDesc1: "Vi börjar med ett kostnadsfritt konsultationsmöte för att identifiera behov.",
    processDesc2: "Därefter skapar vi ett avtal och sätter upp ett regelbundet schema.",
    checklist: [
      "Möbeltvätt för kontor & hotell",
      "Biltvätt för bilhandlare & leasing",
      "Rengöring inför kundmöten & inspektioner",
      "Flexibla bokningar – dagtid, kväll eller helg"
    ],
    introImg: "https://techsquadteam.com/assets/profile/blogimages/b61f6d7a7a321d395f8510b813aedf3d.png",
    benefitImg: "https://img.freepik.com/free-photo/beautiful-car-washing-service_23-2149212190.jpg?semt=ais_hybrid&w=740&q=80",
    processImg: "https://img.freepik.com/free-photo/beautiful-car-washing-service_23-2149212190.jpg?semt=ais_hybrid&w=740&q=80"
  }
};


const AnimatedSection = ({ children, delay = 0, className = "" }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
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
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 barlow-bold">
              {category.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-primary px-4 py-1 rounded-full text-white font-medium barlow-regular">
                Featured
              </span>
              <div className="flex items-center text-primary">
                <FaStar className="mr-1" />
                <span className="text-white barlow-regular">4.8 (200+ reviews)</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-5 my-12 flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <div className="flex-1 space-y-12">
                  {!isSubCategory && (
  <AnimatedSection delay={2.0}>
    <section className="bg-white rounded-xl shadow-sm p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 barlow-bold">
        Våra Tjänsteområden inom {category.name}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {allCategories
          .filter((cat) => {
            const parentId =
              typeof cat.parent === "object" && cat.parent !== null
                ? cat.parent.$oid || cat.parent.toString()
                : cat.parent;
            return parentId === category._id;
          })
          .map((sub, index) => (
            <motion.div
              key={sub._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              viewport={{ once: true }}
              className="relative group rounded-2xl overflow-hidden shadow-lg"
            >
              {/* Background Image */}
              <img
                src={sub.image}
                alt={sub.name}
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-6 flex flex-col justify-end transition-all duration-500">
                {/* Number */}
                <span className="absolute top-4 left-4 text-2xl font-bold text-primary">
                  {String(index + 1).padStart(2, "0")}.
                </span>

                {/* Title */}
                <h3 className="text-xl font-bold text-primary mb-2">
                  {sub.name}
                </h3>

                {/* Hover Content */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Link
                    to={`/category/${sub._id}`}
                    className="flex items-center gap-2 text-white font-medium mb-2"
                  >
                    View Services <span>→</span>
                  </Link>
                  <p className="text-gray-200 text-sm">{sub.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
      </div>
    </section>
  </AnimatedSection>
)}
{staticContent && (
  <>
    {/* Introduction Section */}
    <AnimatedSection delay={0.2}>
      <section className="bg-white rounded-xl shadow-sm p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text */}
          <div className="space-y-5">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 barlow-bold">
              {staticContent.title1}
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {staticContent.desc1}
            </p>
            <ul className="flex flex-wrap gap-4 text-primary font-semibold">
              {staticContent.points.map((point, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full"
                >
                  <FaCheckCircle className="text-green-500" /> {point}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Picture */}
          <motion.img
            src={staticContent.introImg}
            alt="Introduction Visual"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-xl shadow-md"
          />
        </div>
      </section>
    </AnimatedSection>

    {/* Benefits Section */}
    <AnimatedSection delay={0.4}>
      <section className="bg-white rounded-xl shadow-sm p-6 md:p-8 border-l-4 border-primary">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Benefit Texts */}
          <div className="col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {staticContent.benefitTitle1}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {staticContent.benefitDesc1}
              </p>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {staticContent.benefitTitle2}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {staticContent.benefitDesc2}
              </p>
            </div>
          </div>

          {/* Benefit Image */}
          <motion.img
            src={staticContent.benefitImg}
            alt="Benefits Illustration"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>
    </AnimatedSection>

    {/* Process Section */}
    <AnimatedSection delay={0.6}>
      <section className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl shadow-sm p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Process Text */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-4">
              {staticContent.processTitle}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {staticContent.processDesc1}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {staticContent.processDesc2}
            </p>
          </div>

          {/* Checklist with image */}
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-lg shadow-xs border border-gray-100"
          >
            <div className="flex flex-col gap-6">
              {/* Illustration */}
              <motion.img
                src={staticContent.processImg}
                alt="Process Illustration"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-full rounded-md"
              />

              {/* Checklist */}
              <ul className="space-y-4">
                {staticContent.checklist.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </AnimatedSection>
  </>
)}



          {/* Subcategories or services */}



          {isSubCategory && services.length > 0 && (
            <AnimatedSection delay={0.8}>
              <section className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 barlow-bold">
                  Våra Tjänster
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                  {services.map((service, index) => (
                    <motion.div
                      key={service._id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="relative group rounded-2xl overflow-hidden shadow-lg"
                    >
                      {/* Background Image */}
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-6 flex flex-col justify-end transition-all duration-500">
                        {/* Number */}
                        <span className="absolute top-4 left-4 text-2xl font-bold text-primary">
                          {String(index + 1).padStart(2, "0")}.
                        </span>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-primary mb-2">
                          {service.name}
                        </h3>

                        {/* Hover Content */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <Link
                            to="/appoinment"
                            state={{ selectedService: service }}
                            className="flex items-center gap-2 text-white font-medium mb-2"
                          >
                            Boka en tid <span>→</span>
                          </Link>
                          <p className="text-gray-200 text-sm">{service.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </AnimatedSection>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:w-96 space-y-6 sticky top-6 h-fit">
          {/* Contact Form */}
          <AnimatedSection delay={0.3}>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Kontakta Oss</h3>
              <form className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-gray-700 mb-1">Namn</label>
                  <input
                    type="text"
                    placeholder="Ditt namn"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="Din email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-gray-700 mb-1">Meddelande</label>
                  <textarea
                    placeholder="Ditt meddelande"
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                  ></textarea>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg transition-colors font-medium"
                  >
                    Skicka Meddelande
                  </button>
                </motion.div>
              </form>
            </div>
          </AnimatedSection>

          {/* Contact Info */}
          <AnimatedSection delay={0.5}>
            <div className="bg-gray-50 rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Kontaktinformation</h3>
              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
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
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
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
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-600">Adress</p>
                    <a href="https://maps.app.goo.gl/w9rBgDLHmi7QJaWV9">
                      <p className="text-gray-900 font-medium">Bleckvarugatan 3, 417 07 Göteborg, Sweden</p>
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>

          {/* Explore Categories */}
          <AnimatedSection delay={0.7}>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Upptäck Våra Tjänster</h3>
              <div className="space-y-4">
                {allCategories
                  .filter((cat) => cat.parent === null)
                  .map((item, index) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      viewport={{ once: true }}
                    >
                      <NavLink
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
                      </NavLink>
                    </motion.div>
                  ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;