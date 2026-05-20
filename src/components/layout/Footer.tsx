import React from 'react';
import Link from 'next/link';
import AppCredit from '../common/AppCredit';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
                <Image src="/logo.png" alt="Sri Lanka Tourist Explorer" width={32} height={32} className="w-full h-full object-cover" />
              </div>
              <span className="font-bold text-lg text-primary-900 leading-tight">
                Sri Lanka<br />Travel Explorer
              </span>
            </Link>
            <p className="text-gray-500 text-sm">
              Your smart digital tourism assistant for discovering Sri Lanka&apos;s finest destinations.
            </p>
            <AppCredit className="mt-4" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Explore
            </h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="/places" className="hover:text-primary-600 transition-colors">Top Places</Link></li>
              <li><Link href="/hotels" className="hover:text-primary-600 transition-colors">Hotels & Resorts</Link></li>
              <li><Link href="/provinces" className="hover:text-primary-600 transition-colors">Provinces</Link></li>
              <li><Link href="/trip-planner" className="hover:text-primary-600 transition-colors">Trip Planner</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Features
            </h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><span className="flex items-center">Interactive Maps & Directions</span></li>
              <li><span className="flex items-center">Secure & Reliable Authentication</span></li>
              <li><span className="flex items-center">Plan, Save & Share Your Trips</span></li>
              <li><span className="flex items-center">Favourites & Personalized Experience</span></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Support
            </h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="/emergency" className="hover:text-primary-600 transition-colors font-medium text-red-500 hover:text-red-600">Emergency Contacts</Link></li>
              <li><Link href="/emergency#safety" className="hover:text-primary-600 transition-colors">Tourist Safety Info</Link></li>
              <li><Link href="/about" className="hover:text-primary-600 transition-colors">About the Platform</Link></li>
              <li><span className="flex items-center">Responsive Design Mobile Friendly</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Sri Lanka Travel Explorer. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-400">
            <span>Comprehensive Travel Information</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
