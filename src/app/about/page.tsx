'use client';

import React from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import AppCredit from '@/components/common/AppCredit';
import { Target, ShieldCheck, MapPin, Sparkles, Cpu } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full">
      <SectionHeader 
        title="About Sri Lanka Travel Explorer" 
      />

      <div className="space-y-8 mt-8">
        
        {/* Main Intro */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-sm text-center">
          <div className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center mx-auto mb-6 shadow-xl border-4 border-white">
            <Image src="/logo.png" alt="Sri Lanka Tourist Explorer" width={128} height={128} className="w-full h-full object-cover" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Sri Lanka Travel Explorer</h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
            A comprehensive digital tourism platform designed to help visitors discover, plan, and experience the unparalleled beauty of Sri Lanka safely and efficiently.
          </p>
        </div>

        {/* Vision */}
        <div className="bg-primary-50 rounded-3xl p-8 sm:p-10 border border-primary-100">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-8 h-8 text-primary-600" />
            <h2 className="text-2xl font-bold text-primary-900">Vision</h2>
          </div>
          <p className="text-primary-800 text-lg leading-relaxed font-medium">
            &quot;To create a smart, secure and accessible digital tourism assistant for Sri Lanka, helping visitors discover destinations, plan journeys, access hotels, save favourites and receive essential safety information.&quot;
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:border-primary-200 transition-colors">
            <MapPin className="w-8 h-8 text-primary-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Discovery</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Explore curated lists of destinations and hotels categorized by interest, complete with high-quality images, accurate ratings, and essential travel information.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:border-primary-200 transition-colors">
            <Sparkles className="w-8 h-8 text-amber-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Trip Planning</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Generate custom, day-by-day itineraries based on your specific travel duration, budget, and personal interests to maximize your Sri Lankan adventure.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:border-primary-200 transition-colors">
            <ShieldCheck className="w-8 h-8 text-primary-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Tourist Safety</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Access critical emergency contacts, an SOS location sharing feature, and essential tourist safety tips directly from your device, ensuring peace of mind.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:border-primary-200 transition-colors">
            <Cpu className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Future AI Upgrades</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Built on a scalable, modern architecture, the platform is structured to integrate advanced AI/RAG capabilities and real-time government tourism APIs in the future.
            </p>
          </div>
        </div>

        {/* Developer Credit Section */}
        <div className="bg-gray-900 rounded-3xl p-8 sm:p-10 text-center mt-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
          
          <div className="relative z-10">
            <p className="text-gray-400 uppercase tracking-widest text-sm font-semibold mb-4">Project Architecture & Engineering</p>
            <div className="inline-block bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-4">
              <AppCredit />
            </div>
            <p className="text-gray-400 mt-6 max-w-lg mx-auto text-sm">
              Designed as a production-ready application utilizing Next.js 14, TypeScript, and modern frontend paradigms.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
