
import React from 'react';

const FloatingChat: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
      <div className="flex flex-col gap-3">
        {/* Contact via WhatsApp only */}
        <a 
          href="https://wa.me/94777777777" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-14 h-14 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform group relative active:scale-95"
          aria-label="Contact us on WhatsApp"
        >
          <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.107l-.694 2.54 2.6-.681a5.733 5.733 0 002.837.747h.001c3.182 0 5.77-2.587 5.771-5.766 0-3.18-2.589-5.713-5.772-5.713zm3.374 8.213c-.147.416-.716.757-1.189.807-.321.034-.739.053-2.174-.54-1.836-.758-3.018-2.624-3.11-2.747-.093-.123-.743-.988-.743-1.885 0-.897.471-1.336.638-1.522.167-.187.365-.233.487-.233.121 0 .243.001.35.006.114.005.266-.043.415.319.148.361.511 1.246.554 1.339.043.093.072.201.01.325-.062.123-.093.201-.185.308-.093.108-.195.241-.277.323-.093.093-.191.194-.081.384.111.189.493.812 1.059 1.314.73.648 1.343.85 1.534.943.19.093.303.077.414-.051.111-.129.479-.557.608-.747.129-.19.259-.159.438-.093.179.066 1.137.537 1.334.635.197.098.328.147.377.231.049.084.049.489-.101.905z" />
          </svg>
          <span className="absolute right-full mr-4 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs font-black uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-xl translate-x-2 group-hover:translate-x-0">
            WhatsApp Us
          </span>
        </a>
      </div>
    </div>
  );
};

export default FloatingChat;