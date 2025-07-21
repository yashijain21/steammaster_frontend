import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="border-b border-gray-200/50 pb-4 mb-4 overflow-hidden"
    >
      <motion.button
        whileHover={{ backgroundColor: 'rgba(99, 102, 241, 0.05)' }}
        className="flex justify-between items-center w-full text-left p-3 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-primary">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="ml-4 text-secondary"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pl-3 pr-6"
          >
            <p className="text-gray-600 py-2">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQSection = () => {
  const faqs = [
    {
      question: "Vad är rekond?",
      answer:
        "Rekond (rekonditionering) innebär en noggrann rengöring och återställning av bilens interiör och exteriör. Hos Steam Master fokuserar vi på skonsam ångtvätt, fläckborttagning, luktneutralisering och ytbehandling för att återställa bilens skick."
    },
    {
      question: "Vad är skillnaden mellan biltvätt och rekond?",
      answer:
        "En vanlig biltvätt handlar främst om att avlägsna smuts från bilens yta. Rekond är mer omfattande och inkluderar djuprengöring av interiör, polering, lackbehandling och ibland motortvätt – allt för att återställa bilens helhetsintryck."
    },
    {
      question: "Polerar ni bilar utomhus?",
      answer:
        "Nej, vi polerar inte bilar utomhus eftersom damm och väderförhållanden kan påverka resultatet. All polering utförs i kontrollerad miljö för bästa finish."
    },
    {
      question: "Lägger ni Keramiskt lackskydd utomhus?",
      answer:
        "Nej, applicering av Keramiskt lackskydd kräver en dammfri och kontrollerad miljö. Vi utför detta endast inomhus för att garantera hållbarhet och skydd."
    },
    {
      question: "Varför måste min bil förvaras inomhus ett dygn efter att Keramiskt lackskydd applicerats?",
      answer:
        "Det keramiska skyddet behöver härda i minst 24 timmar utan påverkan av regn, smuts eller direkt solljus. Inomhusförvaring säkerställer optimal vidhäftning och långvarigt skydd."
    },
    {
      question: "Hur ska jag ta hand om min bil efter att ni applicerat Keramiskt lackskydd?",
      answer:
        "Undvik biltvätt under de första 7 dagarna. Använd pH-neutrala rengöringsmedel och undvik automatiska biltvättar med borstar för att bevara skyddet längre."
    },
    {
      question: "Vad ingår i de olika rekondtjänsterna?",
      answer:
        "Vi erbjuder flera rekondpaket: Inre rekond (interiörrengöring), Yttre rekond (tvätt, avfettning, polering), och Helrekond (komplett behandling inklusive lackskydd). Se vår tjänstesida för detaljerat innehåll."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold text-secondary mb-2 text-center p-5"
      >
        Vanliga Frågor
      </motion.h2>

      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            index={index}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-8 bg-gradient-to-r from-primary to-secondary p-0.5 rounded-lg"
      >
        <button className="w-full bg-white hover:bg-gray-50 text-primary font-semibold py-3 px-6 rounded-lg transition-all">
          Kontakta Supporten
        </button>
      </motion.div>
    </div>
  );
};



export default FAQSection;