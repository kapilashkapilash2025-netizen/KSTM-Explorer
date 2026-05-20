'use client';

import React, { useEffect, useMemo, useState } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import { provinces } from '@/data/provinces';
import { PlaceCategory, SmartTripPlan, TripType, BudgetType } from '@/lib/types';
import { generateTripPlan } from '@/lib/tripEngine';
import {
  Calendar,
  MapPin,
  Wallet,
  Check,
  Navigation,
  Share2,
  Save,
  Sparkles,
  UserCircle,
  Route,
  CloudSun,
  Clock3,
  Hotel,
  Car,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';

declare global {
  interface Window {
    google?: {
      maps?: {
        Map: new (el: HTMLElement, opts: Record<string, unknown>) => {
          setCenter: (latLng: { lat: number; lng: number }) => void;
          setZoom: (zoom: number) => void;
        };
        Marker: new (opts: Record<string, unknown>) => unknown;
        TrafficLayer: new () => { setMap: (map: unknown | null) => void };
      };
    };
  }
}

const interestsList: PlaceCategory[] = ['Nature', 'Beach', 'Culture', 'Wildlife', 'Adventure', 'Religious', 'City'];

export default function TripPlannerPage() {
  const { t } = useLanguage();

  const [startLocation, setStartLocation] = useState('Colombo');
  const [destination, setDestination] = useState('Kandy');
  const [tripType, setTripType] = useState<TripType>('Round-trip');
  const [province, setProvince] = useState<string>('Central Province');
  const [days, setDays] = useState<number>(5);
  const [selectedInterests, setSelectedInterests] = useState<PlaceCategory[]>(['Culture', 'Nature']);
  const [budget, setBudget] = useState<BudgetType>('Medium');

  const [generatedPlan, setGeneratedPlan] = useState<SmartTripPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoggedIn] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('userSession');
  });

  const [weatherText, setWeatherText] = useState('Checking weather...');
  const [isTrafficEnabled, setIsTrafficEnabled] = useState(true);
  const [mapReady, setMapReady] = useState(false);

  const hasMapsKey = Boolean(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=7.8731&longitude=80.7718&current=temperature_2m,weather_code'
        );
        const data = await res.json();
        const temp = data?.current?.temperature_2m;
        if (typeof temp === 'number') {
          setWeatherText(`Sri Lanka avg now: ${temp.toFixed(1)}°C`);
        } else {
          setWeatherText('Weather data temporarily unavailable');
        }
      } catch {
        setWeatherText('Weather data temporarily unavailable');
      }
    };

    fetchWeather();
  }, []);

  useEffect(() => {
    if (!hasMapsKey) return;

    const scriptId = 'google-maps-script';
    if (document.getElementById(scriptId)) {
      initMap();
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    document.body.appendChild(script);

    function initMap() {
      const mapEl = document.getElementById('ai-trip-map');
      if (!mapEl || !window.google?.maps) return;

      const map = new window.google.maps.Map(mapEl, {
        center: { lat: 7.8731, lng: 80.7718 },
        zoom: 7,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      });

      new window.google.maps.Marker({
        position: { lat: 6.9271, lng: 79.8612 },
        map,
        title: 'Start Hub - Colombo',
      });

      new window.google.maps.Marker({
        position: { lat: 7.2906, lng: 80.6337 },
        map,
        title: 'Destination Hub - Kandy',
      });

      const traffic = new window.google.maps.TrafficLayer();
      if (isTrafficEnabled) traffic.setMap(map);
      setMapReady(true);
    }
  }, [hasMapsKey, isTrafficEnabled]);

  const toggleInterest = (interest: PlaceCategory) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setIsSaved(false);

    setTimeout(() => {
      const plan = generateTripPlan({
        startLocation,
        destination,
        tripType,
        province,
        days,
        interests: selectedInterests,
        budget,
      });
      setGeneratedPlan(plan);
      setIsGenerating(false);
    }, 1300);
  };

  const handleSavePlan = () => {
    if (!generatedPlan) return;
    if (!isLoggedIn) {
      alert('Please login to save trip plans.');
      return;
    }

    const savedPlans = JSON.parse(localStorage.getItem('savedTrips') || '[]');
    localStorage.setItem('savedTrips', JSON.stringify([...savedPlans, generatedPlan]));
    setIsSaved(true);
    window.dispatchEvent(new Event('tripsUpdated'));
  };

  const openDirections = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
  };

  const quickBudget = useMemo(() => {
    if (!generatedPlan) return null;
    return generatedPlan.estimatedBudgetLkr;
  }, [generatedPlan]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <SectionHeader
        title={t('tripPlanner')}
        subtitle="Plan start-to-finish trips with AI routing, smart stops, weather, hotels, and live map intelligence."
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            {!isLoggedIn && (
              <div className="mb-6 p-4 bg-primary-50 border border-primary-100 rounded-2xl flex items-start gap-3">
                <UserCircle className="w-5 h-5 text-primary-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-primary-900">Login Recommended</h4>
                  <p className="text-xs text-primary-700 mt-1 mb-2">Login to save generated plans and sync future trip drafts.</p>
                  <Link href="/login" className="text-xs font-bold text-primary-700 hover:underline">Go to Login</Link>
                </div>
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label className="text-sm font-bold text-gray-700 mb-2 block">Start Location</label>
                <input
                  value={startLocation}
                  onChange={(e) => setStartLocation(e.target.value)}
                  placeholder="e.g. Colombo"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700 mb-2 block">Destination</label>
                <input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. Ella"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700 mb-2 block">Trip Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['One-way', 'Round-trip'] as TripType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setTripType(type)}
                      className={`py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                        tripType === type
                          ? 'bg-primary-600 border-primary-600 text-white'
                          : 'bg-white border-gray-200 text-gray-600 hover:border-primary-300'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 text-primary-700" /> Region Focus
                </label>
                <select
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500"
                >
                  <option value="All">All of Sri Lanka</option>
                  {provinces.map((p) => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 text-primary-700" /> Travel Days
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="14"
                    value={days}
                    onChange={(e) => setDays(parseInt(e.target.value, 10))}
                    className="flex-1 accent-primary-600"
                  />
                  <span className="w-12 text-center font-bold text-gray-900 bg-gray-50 py-1.5 rounded-lg border border-gray-200">{days}</span>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <Sparkles className="w-4 h-4 text-primary-700" /> Interests
                </label>
                <div className="flex flex-wrap gap-2">
                  {interestsList.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                        selectedInterests.includes(interest)
                          ? 'bg-primary-50 border-primary-300 text-primary-700'
                          : 'bg-white border-gray-200 text-gray-600 hover:border-primary-300'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <Wallet className="w-4 h-4 text-primary-700" /> Budget Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Low', 'Medium', 'Luxury'] as BudgetType[]).map((b) => (
                    <button
                      key={b}
                      onClick={() => setBudget(b)}
                      className={`py-2 rounded-xl text-sm font-medium border ${
                        budget === b
                          ? 'bg-primary-600 border-primary-600 text-white'
                          : 'bg-white border-gray-200 text-gray-600 hover:border-primary-300'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full mt-8 bg-gradient-primary hover:opacity-90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-70"
            >
              {isGenerating ? 'Generating...' : 'Generate AI Trip Plan'}
            </button>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <CloudSun className="w-4 h-4 text-primary-700" /> Live Conditions
              </h3>
              <button
                onClick={() => setIsTrafficEnabled((v) => !v)}
                className="text-xs px-2 py-1 rounded-full border border-primary-200 text-primary-700"
              >
                Traffic: {isTrafficEnabled ? 'ON' : 'OFF'}
              </button>
            </div>
            <p className="text-sm text-gray-600">{weatherText}</p>
            <p className="text-xs text-gray-500">Traffic layer is available when Google Maps key is configured.</p>
          </div>
        </div>

        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Route className="w-4 h-4 text-primary-700" /> Live Map & Route View
              </h3>
              <span className="text-xs text-gray-500">Google Maps API</span>
            </div>
            {hasMapsKey ? (
              <div id="ai-trip-map" className="h-[280px] sm:h-[340px] w-full bg-gray-100" />
            ) : (
              <div className="h-[280px] sm:h-[340px] flex items-center justify-center bg-gray-50 text-center p-6">
                <div>
                  <p className="font-semibold text-gray-700">Map is ready to integrate</p>
                  <p className="text-sm text-gray-500 mt-1">Set `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` in `.env.local` to load live map, routes, and traffic layer.</p>
                </div>
              </div>
            )}
            {hasMapsKey && !mapReady && <p className="text-xs text-gray-500 px-4 pb-3">Loading map...</p>}
          </div>

          <AnimatePresence mode="wait">
            {!generatedPlan && !isGenerating ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-h-[320px] flex flex-col items-center justify-center bg-gray-50/50 border border-dashed border-gray-300 rounded-3xl p-8 text-center"
              >
                <Sparkles className="w-10 h-10 text-primary-300 mb-3" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">AI assistant is ready</h3>
                <p className="text-gray-500 max-w-md">Fill your trip inputs and generate a complete smart plan with route, timings, breaks, hotels, and cost estimates.</p>
              </motion.div>
            ) : isGenerating ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-[320px] flex flex-col items-center justify-center bg-white border border-gray-100 rounded-3xl p-8 text-center"
              >
                <div className="w-16 h-16 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin mb-6" />
                <h3 className="text-lg font-bold text-gray-900">Building your smart itinerary...</h3>
                <p className="text-sm text-gray-500 mt-2">Optimizing route flow, travel windows, and budget recommendations.</p>
              </motion.div>
            ) : (
              generatedPlan && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div className="bg-white border border-gray-100 shadow-sm rounded-3xl overflow-hidden">
                    <div className="bg-gradient-primary p-6 text-white flex flex-col sm:flex-row justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-bold mb-1">{generatedPlan.title}</h2>
                        <p className="text-sm text-primary-100">{generatedPlan.bestRoute}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-xl text-sm">
                          <Share2 className="w-4 h-4" /> Share
                        </button>
                        <button
                          onClick={handleSavePlan}
                          disabled={isSaved}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm ${isSaved ? 'bg-green-500 text-white' : 'bg-white text-primary-800'}`}
                        >
                          {isSaved ? <><Check className="w-4 h-4" /> Saved</> : <><Save className="w-4 h-4" /> Save</>}
                        </button>
                      </div>
                    </div>

                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
                      <div className="bg-primary-50 rounded-2xl p-4 border border-primary-100">
                        <h4 className="font-bold text-primary-900 mb-2 flex items-center gap-2"><Clock3 className="w-4 h-4" /> Travel Timings</h4>
                        <ul className="space-y-1 text-primary-800">
                          {generatedPlan.travelTimings.map((tLine, i) => <li key={i}>{tLine}</li>)}
                        </ul>
                      </div>

                      <div className="bg-primary-50 rounded-2xl p-4 border border-primary-100">
                        <h4 className="font-bold text-primary-900 mb-2">Food / Rest Breaks</h4>
                        <ul className="space-y-1 text-primary-800">
                          {generatedPlan.foodBreakTimings.map((tLine, i) => <li key={i}>{tLine}</li>)}
                        </ul>
                      </div>

                      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 md:col-span-2">
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><Car className="w-4 h-4 text-primary-700" /> AI Travel Assistant</h4>
                        <p className="text-gray-700">{generatedPlan.aiAssistantSummary}</p>
                      </div>
                    </div>
                  </div>

                  {quickBudget && (
                    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                      <h3 className="font-bold text-gray-900 mb-4">Budget Estimation (LKR)</h3>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                        <div className="bg-gray-50 rounded-xl p-3"><p className="text-gray-500">Transport</p><p className="font-bold">{quickBudget.transport.toLocaleString()}</p></div>
                        <div className="bg-gray-50 rounded-xl p-3"><p className="text-gray-500">Hotel</p><p className="font-bold">{quickBudget.hotel.toLocaleString()}</p></div>
                        <div className="bg-gray-50 rounded-xl p-3"><p className="text-gray-500">Food</p><p className="font-bold">{quickBudget.food.toLocaleString()}</p></div>
                        <div className="bg-gray-50 rounded-xl p-3"><p className="text-gray-500">Activities</p><p className="font-bold">{quickBudget.activities.toLocaleString()}</p></div>
                        <div className="bg-primary-50 rounded-xl p-3 border border-primary-200"><p className="text-primary-700">Total</p><p className="font-bold text-primary-900">{quickBudget.total.toLocaleString()}</p></div>
                      </div>
                    </div>
                  )}

                  <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Hotel className="w-4 h-4 text-primary-700" /> Hotel Suggestions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {generatedPlan.hotelSuggestions.map((h) => (
                        <div key={h.id} className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
                          <p className="font-bold text-gray-900">{h.name}</p>
                          <p className="text-xs text-gray-500 mt-1">{h.district} · {h.starRating}-star · {h.priceRange}</p>
                          <p className="text-xs text-gray-600 mt-2 line-clamp-2">{h.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4">Nearby Tourist Attractions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {generatedPlan.nearbyTouristAttractions.slice(0, 6).map((place) => (
                        <div key={place.id} className="bg-gray-50 border border-gray-100 rounded-2xl p-3 flex gap-3">
                          <Image src={place.image} alt={place.name} width={64} height={64} className="w-16 h-16 rounded-lg object-cover" />
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">{place.name}</p>
                            <p className="text-xs text-gray-500">{place.district}</p>
                            <button onClick={() => openDirections(place.latitude, place.longitude)} className="text-xs font-semibold text-primary-700 mt-1 inline-flex items-center gap-1">
                              <Navigation className="w-3 h-3" /> Directions
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
