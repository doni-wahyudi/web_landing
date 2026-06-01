import React, { createContext, useState, useContext } from 'react';
import { useLanguage } from './LanguageContext';
import { FiX, FiMessageSquare, FiSend } from 'react-icons/fi';
import './WhatsAppModal.css';

const WhatsAppModalContext = createContext();

export const WhatsAppModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    message: ''
  });
  
  const { language } = useLanguage();
  const phoneNumber = "6285219461408";

  const translations = {
    id: {
      title: "Konsultasi via WhatsApp",
      subtitle: "Silakan isi form singkat ini agar kami dapat memberikan solusi dan penawaran terbaik untuk bisnis Anda.",
      labelName: "Nama Lengkap *",
      placeholderName: "Nama Anda...",
      labelBusiness: "Nama Bisnis / Perusahaan (Opsional)",
      placeholderBusiness: "Nama Bisnis Anda...",
      labelService: "Layanan yang Diminati *",
      labelMessage: "Kebutuhan / Detail Proyek *",
      placeholderMessage: "Ceritakan singkat kebutuhan website/digital marketing Anda...",
      submitBtn: "Kirim & Lanjutkan ke WhatsApp",
      errorName: "Nama Lengkap wajib diisi.",
      errorService: "Silakan pilih layanan.",
      errorNeeds: "Kebutuhan proyek wajib diisi.",
      serviceGroups: [
        {
          label: "Web, Information System (IS) & Apps Development",
          options: [
            "Website - Paket Basic",
            "Website - Paket Profesional",
            "Website - Paket Premium",
            "IS & Apps Dev - Information System (IS)",
            "IS & Apps Dev - Apps Development",
            "Company Profile Website",
            "E-Commerce / Toko Online",
            "Landing Page / Iklan",
            "Custom Web Application",
            "Maintenance & Support Plan"
          ]
        },
        {
          label: "Digital Marketing & SEO (Pemasaran & Optimasi)",
          options: [
            "Google Ads",
            "Meta Ads (FB & IG)",
            "Social Media Management",
            "Search Engine Optimization (SEO)",
            "SEO Google - Paket Starter",
            "SEO Google - Paket Growth",
            "SEO Google - Paket Enterprise",
            "Kelola Sosmed - Paket Basic",
            "Kelola Sosmed - Paket Medium",
            "Kelola Sosmed - Paket Profesional",
            "Kelola Sosmed - Paket Custom Package"
          ]
        },
        {
          label: "Enterprise Solutions & Intelligence",
          options: [
            "Media Monitoring",
            "Media Monitoring - Paket BASIC NEWS",
            "Media Monitoring - Paket SOSMED",
            "Media Monitoring - Paket PROFESIONAL",
            "Media Monitoring - Paket ENTERPRISE",
            "Media Monitoring - Paket ULTIMATE",
            "Media Monitoring - Paket DIAMOND",
            "Sistem Informasi & Aplikasi"
          ]
        },
        {
          label: "Add-on Services (Layanan Tambahan)",
          options: [
            "Add-on Service - Perpanjangan",
            "Add-on Service - Pembuatan Logo",
            "Add-on Service - Basic",
            "Add-on Service - Profesional",
            "Add-on Service - Premium"
          ]
        },
        {
          label: "Lainnya / Others",
          options: [
            "Konsultasi Umum / Lainnya"
          ]
        }
      ]
    },
    en: {
      title: "WhatsApp Consultation",
      subtitle: "Please fill out this short form so we can provide the best solution and pricing for your business.",
      labelName: "Full Name *",
      placeholderName: "Your Name...",
      labelBusiness: "Business / Company Name (Optional)",
      placeholderBusiness: "Your Business Name...",
      labelService: "Service of Interest *",
      labelMessage: "Project Needs / Details *",
      placeholderMessage: "Briefly describe your website/digital marketing needs...",
      submitBtn: "Send & Proceed to WhatsApp",
      errorName: "Full Name is required.",
      errorService: "Please select a service.",
      errorNeeds: "Project needs are required.",
      serviceGroups: [
        {
          label: "Web, Information System (IS) & Apps Development",
          options: [
            "Website - Paket Basic",
            "Website - Paket Professional",
            "Website - Paket Premium",
            "IS & Apps Dev - Information System (IS)",
            "IS & Apps Dev - Apps Development",
            "Company Profile Website",
            "E-Commerce / Online Store",
            "High-Conversion Landing Page",
            "Custom Web Application",
            "Maintenance & Support Plan"
          ]
        },
        {
          label: "Digital Marketing & SEO Services",
          options: [
            "Google Ads",
            "Meta Ads (FB & IG)",
            "Social Media Management",
            "Search Engine Optimization (SEO)",
            "SEO Google - Paket Starter",
            "SEO Google - Paket Growth",
            "SEO Google - Paket Enterprise",
            "Kelola Sosmed - Paket Basic",
            "Kelola Sosmed - Paket Medium",
            "Kelola Sosmed - Paket Professional",
            "Kelola Sosmed - Paket Custom Package"
          ]
        },
        {
          label: "Enterprise Solutions & Intelligence",
          options: [
            "Media Monitoring",
            "Media Monitoring - Paket BASIC NEWS",
            "Media Monitoring - Paket SOSMED",
            "Media Monitoring - Paket PROFESIONAL",
            "Media Monitoring - Paket ENTERPRISE",
            "Media Monitoring - Paket ULTIMATE",
            "Media Monitoring - Paket DIAMOND",
            "Information Systems & Apps"
          ]
        },
        {
          label: "Add-on Services",
          options: [
            "Add-on Service - Renewal",
            "Add-on Service - Logo Design",
            "Add-on Service - Basic",
            "Add-on Service - Professional",
            "Add-on Service - Premium"
          ]
        },
        {
          label: "Others",
          options: [
            "General Consultation / Others"
          ]
        }
      ]
    },
    de: {
      title: "WhatsApp-Beratung",
      subtitle: "Bitte füllen Sie dieses kurze Formular aus, damit wir Ihnen die beste Lösung und das beste Angebot für Ihr Unternehmen anbieten können.",
      labelName: "Vollständiger Name *",
      placeholderName: "Ihr Name...",
      labelBusiness: "Name des Unternehmens / der Marke (Optional)",
      placeholderBusiness: "Name Ihres Unternehmens...",
      labelService: "Gewünschte Dienstleistung *",
      labelMessage: "Projektanforderungen / Details *",
      placeholderMessage: "Beschreiben Sie kurz Ihre Website- oder Digital-Marketing-Anforderungen...",
      submitBtn: "Senden & weiter zu WhatsApp",
      errorName: "Bitte geben Sie Ihren vollständigen Namen ein.",
      errorService: "Bitte wählen Sie eine Dienstleistung.",
      errorNeeds: "Bitte beschreiben Sie Ihre Projektanforderungen.",
      serviceGroups: [
        {
          label: "Web-, Informationssystem- (IS) & App-Entwicklung",
          options: [
            "Website - Paket Basic",
            "Website - Paket Professional",
            "Website - Paket Premium",
            "IS & Apps Dev - Information System (IS)",
            "IS & Apps Dev - Apps Development",
            "Company Profile Website",
            "E-Commerce / Online Store",
            "High-Conversion Landing Page",
            "Custom Web Application",
            "Maintenance & Support Plan"
          ]
        },
        {
          label: "Digitales Marketing & SEO-Dienstleistungen",
          options: [
            "Google Ads",
            "Meta Ads (FB & IG)",
            "Social Media Management",
            "Search Engine Optimization (SEO)",
            "SEO Google - Paket Starter",
            "SEO Google - Paket Growth",
            "SEO Google - Paket Enterprise",
            "Kelola Sosmed - Paket Basic",
            "Kelola Sosmed - Paket Medium",
            "Kelola Sosmed - Paket Professional",
            "Kelola Sosmed - Paket Custom Package"
          ]
        },
        {
          label: "Enterprise-Lösungen & Analyse",
          options: [
            "Media Monitoring",
            "Media Monitoring - Paket BASIC NEWS",
            "Media Monitoring - Paket SOSMED",
            "Media Monitoring - Paket PROFESIONAL",
            "Media Monitoring - Paket ENTERPRISE",
            "Media Monitoring - Paket ULTIMATE",
            "Media Monitoring - Paket DIAMOND",
            "Information Systems & Apps"
          ]
        },
        {
          label: "Zusatzleistungen",
          options: [
            "Add-on Service - Renewal",
            "Add-on Service - Logo Design",
            "Add-on Service - Basic",
            "Add-on Service - Professional",
            "Add-on Service - Premium"
          ]
        },
        {
          label: "Sonstiges",
          options: [
            "General Consultation / Others"
          ]
        }
      ]
    }
  };

  const t = translations[language] || translations.id;

  const flatServices = t.serviceGroups.reduce((acc, group) => {
    return acc.concat(group.options);
  }, []);

  const openWhatsAppModal = (serviceName = '') => {
    setSelectedService(serviceName);
    setIsOpen(true);
  };

  const closeWhatsAppModal = () => {
    setIsOpen(false);
    setFormData({ name: '', business: '', message: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || formData.name.trim() === '') {
      alert(t.errorName);
      return;
    }
    if (!selectedService) {
      alert(t.errorService);
      return;
    }
    if (!formData.message || formData.message.trim() === '') {
      alert(t.errorNeeds);
      return;
    }

    // Build the WhatsApp message
    let formattedText = '';
    if (language === 'en') {
      formattedText = `Hello Aurotech! I am *${formData.name.trim()}*${formData.business ? ` from *${formData.business.trim()}*` : ''}.\n\nI am interested in your *${selectedService}* package/service and want to consult.\n\n*My Project Details:*\n${formData.message.trim()}`;
    } else if (language === 'de') {
      formattedText = `Hallo Aurotech! Ich bin *${formData.name.trim()}*${formData.business ? ` von *${formData.business.trim()}*` : ''}.\n\nIch interessiere mich für Ihre Dienstleistung *${selectedService}* und möchte mich beraten lassen.\n\n*Meine Projektdetails:*\n${formData.message.trim()}`;
    } else {
      formattedText = `Halo Aurotech! Saya *${formData.name.trim()}*${formData.business ? ` dari *${formData.business.trim()}*` : ''}.\n\nSaya tertarik dengan layanan *${selectedService}* dan ingin berkonsultasi.\n\n*Detail Kebutuhan Saya:*\n${formData.message.trim()}`;
    }

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(formattedText)}`;
    
    // Open in new window/tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    closeWhatsAppModal();
  };


  return (
    <WhatsAppModalContext.Provider value={{ openWhatsAppModal, closeWhatsAppModal }}>
      {children}
      
      {isOpen && (
        <div className="wa-modal-overlay">
          <div className="wa-modal glass animate-entrance">
            <div className="wa-modal-header">
              <div className="wa-modal-title-wrapper">
                <FiMessageSquare className="wa-title-icon" />
                <h3>{t.title}</h3>
              </div>
              <button className="wa-close-btn" onClick={closeWhatsAppModal} aria-label="Close form">
                <FiX size={20} />
              </button>
            </div>
            
            <p className="wa-modal-subtitle">{t.subtitle}</p>
            
            <form onSubmit={handleSubmit} className="wa-modal-form">
              <div className="form-group">
                <label>{t.labelName}</label>
                <input 
                  type="text" 
                  required
                  placeholder={t.placeholderName}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>{t.labelBusiness}</label>
                <input 
                  type="text" 
                  placeholder={t.placeholderBusiness}
                  value={formData.business}
                  onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>{t.labelService}</label>
                <select 
                  required 
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                >
                  <option value="" disabled>{language === 'en' ? '-- Select Service --' : language === 'de' ? '-- Dienstleistung auswählen --' : '-- Pilih Layanan --'}</option>
                  {selectedService && !flatServices.includes(selectedService) && (
                    <option value={selectedService}>{selectedService}</option>
                  )}
                  {t.serviceGroups.map((group, idx) => (
                    <optgroup key={idx} label={group.label}>
                      {group.options.map((service, sIdx) => (
                        <option key={sIdx} value={service}>{service}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>{t.labelMessage}</label>
                <textarea 
                  required
                  rows="4"
                  placeholder={t.placeholderMessage}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-full wa-submit-btn">
                <FiSend />
                {t.submitBtn}
              </button>
            </form>
          </div>
        </div>
      )}
    </WhatsAppModalContext.Provider>
  );
};

export const useWhatsAppModal = () => {
  const context = useContext(WhatsAppModalContext);
  if (!context) {
    throw new Error('useWhatsAppModal must be used within a WhatsAppModalProvider');
  }
  return context;
};
