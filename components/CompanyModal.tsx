
import React from 'react';
import { X, MapPin, PhoneCall, Mail, Award, Clock, FileCheck } from 'lucide-react';

interface CompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyInfo: {
    address: string;
    phone: string;
    email: string;
    regNo: string;
    description: string;
    workingHours: string;
  };
  storeName: string;
  logoUrl: string | null;
}

const CompanyModal: React.FC<CompanyModalProps> = ({ isOpen, onClose, companyInfo, storeName, logoUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-md animate-in fade-in duration-500"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl bg-white shadow-2xl rounded-[40px] overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="bg-blue-600 p-8 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-white/20 rounded-full transition-all"
          >
            <X size={24} />
          </button>
          
          <div className="flex flex-col items-center text-center mt-4">
            <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-xl overflow-hidden mb-6">
              {logoUrl ? (
                <img src={logoUrl} alt={storeName} className="w-full h-full object-cover" />
              ) : (
                <svg viewBox="0 0 24 24" className="w-16 h-16 fill-current text-blue-600">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/>
                </svg>
              )}
            </div>
            <h2 className="text-3xl font-oswald font-bold uppercase tracking-tight mb-2">{storeName}</h2>
            <div className="bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/20 flex items-center gap-2">
              <FileCheck size={14} className="text-blue-100" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Registered Entity: {companyInfo.regNo}</span>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 space-y-10">
          <div className="space-y-4">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] flex items-center gap-3">
              <Award size={16} className="text-blue-600" /> Company Profile
            </h3>
            <p className="text-gray-600 leading-relaxed font-medium">
              {companyInfo.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Corporate Office</p>
                    <p className="text-sm font-bold text-gray-900 leading-relaxed">{companyInfo.address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <PhoneCall size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">24/7 Hotline</p>
                    <p className="text-sm font-bold text-gray-900">{companyInfo.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Email Support</p>
                    <p className="text-sm font-bold text-gray-900">{companyInfo.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Hours of Operation</h3>
              <div className="p-6 bg-gray-50 rounded-[32px] border border-gray-100 flex flex-col items-center text-center">
                <Clock size={32} className="text-blue-600 mb-4" />
                <p className="text-sm font-bold text-gray-900 mb-1">{companyInfo.workingHours}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Sri Lanka Standard Time</p>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Currently Operating</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t flex items-center justify-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Excellence in Precision since 2012
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyModal;
