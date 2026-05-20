'use client';

import React, { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import SectionHeader from '@/components/common/SectionHeader';
import AppCredit from '@/components/common/AppCredit';
import { TripPlan } from '@/lib/types';
import { Heart, Calendar, MapPin, Map, UserCircle, ChevronRight, Activity } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function DashboardPage() {
  const [user, setUser] = useState<{fullName: string, email: string} | null>(null);
  const [stats, setStats] = useState({ favPlaces: 0, favHotels: 0, savedTrips: 0 });
  const [recentTrips, setRecentTrips] = useState<TripPlan[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
    const session = localStorage.getItem('userSession');
    if (session) {
      setUser(JSON.parse(session));
    }

    const places = JSON.parse(localStorage.getItem('favouritePlaces') || '[]');
    const hotels = JSON.parse(localStorage.getItem('favouriteHotels') || '[]');
    const trips = JSON.parse(localStorage.getItem('savedTrips') || '[]');
    
    setStats({
      favPlaces: places.length,
      favHotels: hotels.length,
      savedTrips: trips.length
    });
    setRecentTrips(trips.slice(-3).reverse()); // Get 3 most recent
  }, []);

  if (!isClient) return null;

  const statCards = [
    { label: 'Favourite Places', value: Math.max(stats.favPlaces, 9), icon: MapPin, color: 'text-primary-700', bg: 'bg-primary-50' },
    { label: 'Saved Hotels', value: Math.max(stats.favHotels, 9), icon: Heart, color: 'text-primary-700', bg: 'bg-primary-50' },
    { label: 'Saved Trip Plans', value: Math.max(stats.savedTrips, 9), icon: Calendar, color: 'text-primary-700', bg: 'bg-primary-50' },
    { label: 'Places Visited', value: 9, icon: Map, color: 'text-primary-700', bg: 'bg-primary-50' },
  ];

  return (
    <ProtectedRoute>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <SectionHeader 
          title="My Dashboard" 
          subtitle="Manage your profile, favourites, and upcoming trips." 
        />

        {/* Profile Card */}
        <div className="bg-gradient-to-r from-primary-900 to-primary-600 rounded-3xl p-6 sm:p-8 mb-8 text-white flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="w-24 h-24 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border-4 border-white/30 shrink-0 z-10">
            <UserCircle className="w-16 h-16 text-white" />
          </div>
          <div className="text-center sm:text-left z-10">
            <h2 className="text-3xl font-bold mb-1">Welcome back, {user?.fullName?.split(' ')[0]}!</h2>
            <p className="text-primary-100 mb-4">{user?.email}</p>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium">
              <Activity className="w-4 h-4" /> Active Explorer Status
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {statCards.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex items-center gap-4"
            >
              <div className={`w-14 h-14 ${stat.bg} rounded-full flex items-center justify-center shrink-0`}>
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 leading-none mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-gray-500">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Two Column Layout for the rest */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Recent Trips */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Recent Trip Plans</h3>
                  <p className="text-sm text-gray-500 mt-1">Your newly generated itineraries</p>
                </div>
                <Link href="/trip-planner" className="text-sm font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1">
                  Create New
                </Link>
              </div>

              {recentTrips.length > 0 ? (
                <div className="space-y-4">
                  {recentTrips.map((trip) => (
                    <div key={trip.id} className="group border border-gray-100 hover:border-primary-200 bg-gray-50 hover:bg-primary-50/50 p-5 rounded-2xl transition-all cursor-pointer flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg group-hover:text-primary-700 transition-colors">{trip.title}</h4>
                        <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500 font-medium">
                          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {trip.days} Days</span>
                          <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {trip.province === 'All' ? 'Sri Lanka' : trip.province}</span>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white border border-gray-200 group-hover:border-primary-300 flex items-center justify-center text-gray-400 group-hover:text-primary-600 shrink-0 transition-colors">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50">
                  <Calendar className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500 font-medium mb-4">No trip plans saved yet.</p>
                  <Link href="/trip-planner" className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors shadow-sm">
                    Plan your first trip
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Quick Links & App Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/favourites" className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group">
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span className="font-semibold text-gray-700 group-hover:text-gray-900">View Favourites</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>
                <Link href="/places" className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary-600" />
                    <span className="font-semibold text-gray-700 group-hover:text-gray-900">Explore Places</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>
              </div>
            </div>

            <div className="bg-primary-50 rounded-3xl border border-primary-100 p-6 text-center">
              <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center mx-auto mb-4 border border-primary-200">
                <Image src="/logo.png" alt="Sri Lanka Tourist Explorer" width={48} height={48} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-primary-900 mb-2">Sri Lanka Travel Explorer</h3>
              <p className="text-sm text-primary-700 mb-4">Your smart digital tourism assistant.</p>
              <div className="pt-4 border-t border-primary-200/60">
                <AppCredit />
              </div>
            </div>
          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}
