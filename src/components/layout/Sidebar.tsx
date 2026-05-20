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
  Info
} from 'lucide-react';
import AppCredit from '../common/AppCredit';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';

export default function Sidebar() {
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

  return (
    <aside className="w-64 bg-card border-r border-border flex-col hidden lg:flex h-screen sticky top-0 transition-all duration-300">
      <div className="p-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
            <Image src="/logo.png" alt="Sri Lanka Tourist Explorer" width={32} height={32} className="w-full h-full object-cover" />
          </div>
          <span className="font-bold text-lg text-foreground leading-tight">
            Sri Lanka<br />Travel Explorer
          </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">
          {t('menu')}
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-border">
        <div className="bg-primary/10 p-4 rounded-xl mb-4">
          <h4 className="text-sm font-semibold text-foreground mb-1">{t('features')}</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• {t('featureInteractiveMap')}</li>
            <li>• {t('featureTripPlanner')}</li>
            <li>• {t('featureSecureAuth')}</li>
          </ul>
        </div>
        <AppCredit className="w-full justify-center" />
      </div>
    </aside>
  );
}
