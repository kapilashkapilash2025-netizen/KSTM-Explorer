'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Map, 
  MapPin, 
  BedDouble, 
  Compass, 
  Calendar, 
  AlertTriangle, 
  Heart, 
  LayoutDashboard, 
  Info,
  X
} from 'lucide-react';
import AppCredit from '../common/AppCredit';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}


export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { name: t('home'), href: '/', icon: Map },
    { name: t('places'), href: '/places', icon: MapPin },
    { name: t('hotels'), href: '/hotels', icon: BedDouble },
    { name: t('provinces'), href: '/provinces', icon: Compass },
    { name: t('tripPlanner'), href: '/trip-planner', icon: Calendar },
    { name: t('emergency'), href: '/emergency', icon: AlertTriangle },
    { name: t('favourites'), href: '/favourites', icon: Heart },
    { name: t('dashboard'), href: '/dashboard', icon: LayoutDashboard },
    { name: t('about'), href: '/about', icon: Info },
  ];

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
        onClick={onClose}
      />
      <aside className={`fixed inset-y-0 left-0 w-72 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" onClick={onClose}>
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
              <Image src="/logo.png" alt="Sri Lanka Tourist Explorer" width={32} height={32} className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-lg text-primary-900 leading-tight">
              Travel Explorer
            </span>
          </Link>
          <button onClick={onClose} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary-50 text-primary-700 font-medium' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-primary-600' : 'text-gray-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-gray-100 mt-auto">
          <AppCredit className="text-center text-xs" />
        </div>
      </aside>
    </>
  );
}
