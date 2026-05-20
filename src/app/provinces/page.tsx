'use client';

import React from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import { provinces } from '@/data/provinces';
import { MapPin, ArrowRight, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';

export default function ProvincesPage() {
  const { t } = useLanguage();
  const requiredProvinceNames = [
    'Western Province',
    'Central Province',
    'Southern Province',
    'Northern Province',
    'Eastern Province',
    'North Western Province',
    'North Central Province',
    'Uva Province',
    'Sabaragamuwa Province',
  ];

  const provinceMap = new Map(provinces.map((p) => [p.name, p]));
  const displayProvinces = requiredProvinceNames.map((name, idx) => {
    const found = provinceMap.get(name);
    if (found) return found;
    return {
      id: `prov-missing-${idx + 1}`,
      name,
      shortDescription: 'Province details are being updated. Discover attractions and travel highlights soon.',
      placeCount: 9,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop',
    };
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <SectionHeader 
        title={t('exploreProvinces')} 
        subtitle={t('provincesSubtitle')} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {displayProvinces.map((province, index) => (
          <motion.div 
            key={province.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-panel rounded-3xl overflow-hidden border border-primary-900/40 shadow-[0_8px_28px_rgba(1,8,18,0.55)] group flex flex-col h-full"
          >
            <div className="relative h-56 w-full overflow-hidden shrink-0">
              <Image
                src={province.image}
                alt={province.name}
                fill
                quality={90}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020406]/85 via-[#020406]/35 to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="text-2xl font-bold text-white mb-1">{province.name}</h2>
                <div className="flex items-center gap-1.5 text-sky-100 text-sm font-medium">
                  <MapPin className="w-4 h-4 text-primary-400" />
                  <span>{province.placeCount} {t('popularPlaces')}</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                {province.shortDescription}
              </p>
              
              <div className="pt-4 border-t border-border mt-auto">
                <Link 
                  href="/places"
                  className="flex items-center justify-between w-full group/btn"
                >
                  <span className="font-bold text-primary-700 group-hover/btn:text-primary-800 transition-colors">
                    {t('viewDestinations')}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 group-hover/btn:bg-primary-600 group-hover/btn:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 glass-panel rounded-3xl p-8 border border-primary-900/40 flex flex-col md:flex-row items-center gap-8 justify-between neon-glow">
        <div>
          <h3 className="text-xl font-bold text-primary-200 mb-2 flex items-center gap-2">
            <Compass className="w-6 h-6 text-primary-700" /> {t('notSureStart')}
          </h3>
          <p className="text-primary-100 text-sm max-w-lg">
            {t('plannerHint')}
          </p>
        </div>
        <Link 
          href="/trip-planner"
          className="bg-primary-600 hover:bg-primary-500 text-white px-6 py-3 rounded-xl font-bold transition-colors whitespace-nowrap shadow-lg shadow-primary-700/25"
        >
          {t('openTripPlanner')}
        </Link>
      </div>

    </div>
  );
}
