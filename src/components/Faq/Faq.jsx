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
      question: "How do I reset my password?",
      answer: "You can reset your password by clicking on 'Forgot Password' on the login page."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers."
    },
    {
      question: "How can I contact customer support?",
      answer: "You can reach our support team 24/7 through the live chat or email support@example.com."
    },
    {
      question: "What's your refund policy?",
      answer: "We offer 30-day money back guarantee for all our premium plans."
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
        Frequently Asked Questions
      </motion.h2>
    
      
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <FAQItem key={index} index={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-8 bg-gradient-to-r from-primary to-secondary p-0.5 rounded-lg"
      >
        <button className="w-full bg-white hover:bg-gray-50 text-primary font-semibold py-3 px-6 rounded-lg transition-all">
          Contact Support
        </button>
      </motion.div>
    </div>
  );
};

export default FAQSection;