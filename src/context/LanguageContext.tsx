'use client';

import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'ta' | 'si';

type I18nValue = { en: string; ta: string; si: string };

const translations: Record<string, I18nValue> = {
  home: { en: 'Home', ta: 'முகப்பு', si: 'මුල් පිටුව' },
  places: { en: 'Places', ta: 'இடங்கள்', si: 'ස්ථාන' },
  hotels: { en: 'Hotels', ta: 'விடுதிகள்', si: 'හෝටල්' },
  provinces: { en: 'Provinces', ta: 'மாநிலங்கள்', si: 'පළාත්' },
  tripPlanner: { en: 'Trip Planner', ta: 'பயணத் திட்டம்', si: 'ගමන් සැලසුම්කරු' },
  emergency: { en: 'Emergency', ta: 'அவசரம்', si: 'හදිසි' },
  favourites: { en: 'Favourites', ta: 'விருப்பங்கள்', si: 'ප්‍රියතම' },
  dashboard: { en: 'Dashboard', ta: 'டாஷ்போர்டு', si: 'පාලක පුවරුව' },
  about: { en: 'About', ta: 'பற்றி', si: 'ගැන' },

  searchPlaceholder: {
    en: 'Search places, hotels...',
    ta: 'இடங்கள், விடுதிகளைத் தேடுங்கள்...',
    si: 'ස්ථාන, හෝටල් සොයන්න...',
  },

  discoverPlaces: { en: 'Discover Places', ta: 'இடங்களைக் கண்டறியுங்கள்', si: 'ස්ථාන සොයා ගන්න' },
  smartAssistant: { en: 'Smart Tourism Assistant', ta: 'ஸ்மார்ட் சுற்றுலா உதவியாளர்', si: 'ස්මාර්ට් සංචාරක සහකරු' },
  topDestinations: { en: 'Top Destinations', ta: 'சிறந்த இடங்கள்', si: 'ප්‍රධාන ගමනාන්ත' },
  placesOnMap: { en: 'Places on Map', ta: 'வரைபடத்தில் இடங்கள்', si: 'සිතියමේ ස්ථාන' },
  showingPlaces: { en: 'Showing {{count}} beautiful places to visit', ta: 'பார்வைக்கு {{count}} அழகான இடங்கள்', si: 'බැලීමට සුන්දර ස්ථාන {{count}} ක්' },

  exploreProvinces: { en: 'Explore Provinces', ta: 'மாநிலங்களை ஆராயுங்கள்', si: 'පළාත් සොයා බලන්න' },
  provincesSubtitle: {
    en: 'Discover the unique culture, geography, and attractions of all 9 provinces in Sri Lanka.',
    ta: 'இலங்கையின் 9 மாநிலங்களின் தனித்துவமான கலாசாரம், புவியியல் மற்றும் சுற்றுலா இடங்களை அறியுங்கள்.',
    si: 'ශ්‍රී ලංකාවේ පළාත් 9 ම වෙතින් සංස්කෘතිය, භූගෝලය සහ ආකර්ෂණීය ස්ථාන සොයා බලන්න.',
  },
  popularPlaces: { en: 'Popular Places', ta: 'பிரபல இடங்கள்', si: 'ජනප්‍රිය ස්ථාන' },
  viewDestinations: { en: 'View Destinations', ta: 'இடங்களைப் பாருங்கள்', si: 'ගමනාන්ත බලන්න' },
  notSureStart: { en: 'Not sure where to start?', ta: 'எங்கே தொடங்குவது தெரியவில்லையா?', si: 'ආරම්භ කරන්නේ කොහෙන්ද?' },
  plannerHint: {
    en: 'Use our smart Trip Planner to generate a custom itinerary based on your interests, budget, and time available.',
    ta: 'உங்கள் விருப்பம், பட்ஜெட் மற்றும் நேரத்துக்கு ஏற்ப தனிப்பயன் பயணத் திட்டத்தை உருவாக்குங்கள்.',
    si: 'ඔබගේ රුචි, අයවැය සහ කාලය අනුව අභිරුචි ගමන් සැලැස්මක් සාදන්න.',
  },
  openTripPlanner: { en: 'Open Trip Planner', ta: 'பயணத் திட்டம் திறக்க', si: 'ගමන් සැලසුම්කරු විවෘත කරන්න' },

  menu: { en: 'Menu', ta: 'மெனு', si: 'මෙනුව' },
  features: { en: 'Features', ta: 'அம்சங்கள்', si: 'විශේෂාංග' },
  featureInteractiveMap: { en: 'Interactive Map', ta: 'இணைய வரைபடம்', si: 'අන්තර්ක්‍රියා සිතියම' },
  featureTripPlanner: { en: 'Trip Planner', ta: 'பயணத் திட்டம்', si: 'ගමන් සැලසුම්කරු' },
  featureSecureAuth: { en: 'Secure Auth', ta: 'பாதுகாப்பான உள்நுழைவு', si: 'ආරක්ෂිත පිවිසුම' },

  filters: { en: 'Filters', ta: 'வடிகட்டிகள்', si: 'පෙරහන්' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en';
    const saved = localStorage.getItem('language') as Language | null;
    return saved || 'en';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string, vars?: Record<string, string | number>) => {
    const template = translations[key]?.[language] ?? key;
    if (!vars) return template;

    return Object.entries(vars).reduce((acc, [varKey, value]) => {
      return acc.replaceAll(`{{${varKey}}}`, String(value));
    }, template);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
