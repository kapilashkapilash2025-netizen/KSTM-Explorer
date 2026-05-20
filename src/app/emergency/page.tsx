'use client';

import React, { useMemo, useState } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import { emergencyContacts } from '@/data/emergency';
import {
  AlertTriangle,
  Phone,
  MapPin,
  Radio,
  HeartPulse,
  CloudLightning,
  ShieldAlert,
  X,
  Copy,
  Share2,
  Navigation,
  CheckCircle2,
  Siren,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';

type GeoState = 'idle' | 'loading' | 'ready' | 'error';

export default function EmergencyPage() {
  const { t } = useLanguage();
  const [showSOSModal, setShowSOSModal] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [geoState, setGeoState] = useState<GeoState>('idle');
  const [geoError, setGeoError] = useState('');
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const topHotlines = useMemo(
    () => emergencyContacts.filter((c) => ['110', '119', '111'].includes(c.phone)),
    []
  );

  const requestLocation = () => {
    setGeoState('loading');
    setGeoError('');

    if (!('geolocation' in navigator)) {
      setGeoState('error');
      setGeoError('Location is not supported on this device/browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setGeoState('ready');
      },
      () => {
        setGeoState('error');
        setGeoError('Location access denied. Please enable location permission.');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );
  };

  const handleSOSClick = () => {
    setShowSOSModal(true);
    requestLocation();
  };

  const copyPhone = async (phone: string) => {
    try {
      await navigator.clipboard.writeText(phone);
      setCopiedPhone(phone);
      setTimeout(() => setCopiedPhone(null), 1500);
    } catch {
      setCopiedPhone(null);
    }
  };

  const shareEmergency = async () => {
    const text = location
      ? `Emergency! My location: https://maps.google.com/?q=${location.lat},${location.lng}`
      : 'Emergency! Please contact me immediately.';

    if (navigator.share) {
      try {
        await navigator.share({ title: 'Emergency Alert', text });
      } catch {
        // user cancelled share
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      alert('Emergency message copied. You can paste and send it quickly.');
    } catch {
      alert('Unable to share automatically. Please call emergency contact directly.');
    }
  };

  const openNearestHospital = () => {
    if (!location) return;
    window.open(
      `https://www.google.com/maps/search/hospital/@${location.lat},${location.lng},14z`,
      '_blank'
    );
  };

  const openNearestPolice = () => {
    if (!location) return;
    window.open(
      `https://www.google.com/maps/search/police+station/@${location.lat},${location.lng},14z`,
      '_blank'
    );
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'Medical':
        return HeartPulse;
      case 'Police':
        return ShieldAlert;
      default:
        return Phone;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full relative">
      <SectionHeader
        title={t('emergency')}
        subtitle="Fast emergency help, verified contact numbers, and location-based quick actions for travelers in Sri Lanka."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-red-50 rounded-3xl p-6 sm:p-8 border border-red-100 shadow-sm">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
              <Siren className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-red-900 mb-2">Emergency SOS</h3>
            <p className="text-sm text-red-700 mb-6 font-medium">
              One tap to prepare emergency message + location for instant sharing.
            </p>

            <button
              onClick={handleSOSClick}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2"
            >
              <AlertTriangle className="w-5 h-5" /> SOS — I Need Help
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
            <h3 className="font-bold text-lg text-gray-900 mb-4" id="safety">
              Quick Safety Actions
            </h3>
            <div className="space-y-3">
              <button
                onClick={requestLocation}
                className="w-full flex items-center justify-between gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100 hover:border-amber-200 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center shrink-0">
                    <CloudLightning className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-sm text-amber-900">Get Current Location</h4>
                    <p className="text-xs text-amber-700">Needed for hospital/police navigation</p>
                  </div>
                </div>
                {geoState === 'ready' ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : (
                  <MapPin className="w-5 h-5 text-amber-700" />
                )}
              </button>

              <button
                onClick={openNearestHospital}
                disabled={!location}
                className="w-full flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100 hover:border-blue-200 transition-colors disabled:opacity-60"
              >
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-sm text-blue-900">Find Nearest Hospital</h4>
                  <p className="text-xs text-blue-700">Open live Google Maps search</p>
                </div>
              </button>

              <button
                onClick={openNearestPolice}
                disabled={!location}
                className="w-full flex items-center gap-3 p-3 bg-primary-50 rounded-xl border border-primary-100 hover:border-primary-200 transition-colors disabled:opacity-60"
              >
                <div className="w-10 h-10 bg-primary-100 text-primary-700 rounded-lg flex items-center justify-center shrink-0">
                  <Radio className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-sm text-primary-900">Find Nearest Police</h4>
                  <p className="text-xs text-primary-700">Fast route support for incidents</p>
                </div>
              </button>
            </div>

            {geoError && (
              <p className="text-xs text-red-600 mt-4 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{geoError}</p>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm">
            <h3 className="font-bold text-xl text-gray-900 mb-4">Priority Hotlines (24/7)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {topHotlines.map((contact) => (
                <a
                  key={contact.id}
                  href={`tel:${contact.phone}`}
                  className="bg-red-50 border border-red-100 rounded-2xl p-4 hover:bg-red-100 transition-colors"
                >
                  <p className="text-xs font-semibold text-red-700">{contact.title}</p>
                  <p className="text-2xl font-bold text-red-900 mt-1">{contact.phone}</p>
                </a>
              ))}
            </div>

            <h3 className="font-bold text-xl text-gray-900 mb-6">All Emergency Contacts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {emergencyContacts.map((contact) => {
                const Icon = getIconForType(contact.type);
                const isCopied = copiedPhone === contact.phone;
                return (
                  <div
                    key={contact.id}
                    className="border border-gray-100 rounded-2xl p-5 hover:border-primary-200 transition-colors bg-gray-50/50"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center shrink-0 text-primary-600">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 text-base mb-1 truncate">{contact.title}</h4>
                        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{contact.description}</p>
                        <div className="flex flex-wrap gap-2">
                          <a
                            href={`tel:${contact.phone}`}
                            className="inline-flex items-center gap-1.5 bg-gray-900 hover:bg-primary-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5" /> Call
                          </a>
                          <button
                            onClick={() => copyPhone(contact.phone)}
                            className="inline-flex items-center gap-1.5 bg-white border border-gray-200 hover:border-primary-300 px-3 py-1.5 rounded-lg text-sm font-semibold text-gray-700"
                          >
                            {isCopied ? <CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />} {isCopied ? 'Copied' : 'Copy'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-primary-50 rounded-3xl p-6 sm:p-8 border border-primary-100">
            <h3 className="font-bold text-lg text-primary-900 mb-4">Essential Safety Tips for Tourists</h3>
            <ul className="space-y-3 text-sm text-primary-800">
              <li className="flex items-start gap-2"><span className="text-primary-500 font-bold">•</span> Swim only in designated safe zones, especially in strong-current coastal areas.</li>
              <li className="flex items-start gap-2"><span className="text-primary-500 font-bold">•</span> Keep a screenshot of emergency hotlines for offline use.</li>
              <li className="flex items-start gap-2"><span className="text-primary-500 font-bold">•</span> Share live location with trusted contact during long-distance travel.</li>
              <li className="flex items-start gap-2"><span className="text-primary-500 font-bold">•</span> Keep hydration high and carry basic first-aid medicines.</li>
            </ul>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showSOSModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowSOSModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-md rounded-3xl overflow-hidden relative z-10 shadow-2xl"
            >
              <div className="bg-red-600 p-6 text-center text-white relative">
                <button
                  onClick={() => setShowSOSModal(false)}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg overflow-hidden border-2 border-white/50">
                  <Image src="/logo.png" alt="Logo" width={64} height={64} className="w-full h-full object-cover" />
                </div>
                <h2 className="text-2xl font-bold">Emergency Request</h2>
              </div>

              <div className="p-6">
                <p className="text-gray-700 font-medium text-center mb-6">
                  Quickly call hotline or share emergency message with your live location.
                </p>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-4">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Current Location</h4>
                  {geoState === 'loading' && <div className="text-sm text-gray-500 italic">Locating device...</div>}
                  {geoState === 'error' && <div className="text-sm text-red-600">{geoError}</div>}
                  {location && (
                    <div className="flex items-center gap-2 text-gray-900 font-mono text-sm">
                      <MapPin className="w-4 h-4 text-primary-600" />
                      {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <a href="tel:119" className="py-3 rounded-xl font-bold text-white bg-gray-900 hover:bg-black transition-colors text-center">Call 119</a>
                  <a href="tel:110" className="py-3 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 transition-colors text-center">Call 110</a>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setShowSOSModal(false)}
                    className="py-3 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={shareEmergency}
                    className="py-3 rounded-xl font-bold text-white bg-primary-600 hover:bg-primary-700 transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-4 h-4" /> Share SOS
                  </button>
                </div>

                {location && (
                  <button
                    onClick={openNearestHospital}
                    className="w-full mt-3 py-3 rounded-xl font-semibold text-primary-700 border border-primary-200 bg-primary-50 hover:bg-primary-100 inline-flex items-center justify-center gap-2"
                  >
                    <Navigation className="w-4 h-4" /> Open Nearest Hospital
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
