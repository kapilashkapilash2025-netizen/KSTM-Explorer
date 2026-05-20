'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Bell, Globe, User, Menu, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import AppCredit from '../common/AppCredit';
import { useLanguage } from '@/context/LanguageContext';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';

type LanguageCode = 'en' | 'ta' | 'si';

interface TopbarProps {
  onMenuClick?: () => void;
}

const ThemeToggleButton = dynamic(() => import('./ThemeToggleButton'), { ssr: false });

export default function Topbar({ onMenuClick }: TopbarProps) {
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isLangOpen, setIsLangOpen] = useState(false);

  useEffect(() => {
    // Simple auth check for now
    const session = localStorage.getItem('userSession');
    if (session) {
      const user = JSON.parse(session);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoggedIn(true);
      setUserName(user.fullName);
    }
  }, []);

  const handleLogout = async () => {
    if (auth) {
      try {
        await signOut(auth);
      } catch {
        // Ignore sign-out errors and clear local session anyway.
      }
    }

    localStorage.removeItem('userSession');
    setIsLoggedIn(false);
    setUserName('');
    router.push('/login');
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'si', name: 'සිංහල' },
  ];

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30 transition-all duration-300">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 rounded-lg text-muted-foreground hover:bg-muted lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="relative max-w-md w-full hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            placeholder={t('searchPlaceholder')} 
            className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all text-foreground placeholder:text-muted-foreground/60"
          />
        </div>
        
        <div className="hidden lg:flex items-center justify-center flex-1">
          <AppCredit />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="relative">
          <button 
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors flex items-center gap-1 text-sm font-medium"
          >
            <Globe className="w-4 h-4" />
            <span className="uppercase">{language}</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isLangOpen && (
            <div className="absolute top-full right-0 mt-1 w-32 bg-card border border-border rounded-xl shadow-xl py-1 z-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code as LanguageCode);
                    setIsLangOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${
                    language === lang.code ? 'text-primary font-bold' : 'text-foreground'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <ThemeToggleButton />

        <button className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-card"></span>
        </button>

        <div className="w-px h-6 bg-border hidden sm:block mx-1"></div>

        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-semibold text-foreground">Hi, {userName.split(' ')[0]}</span>
              <button onClick={handleLogout} className="text-xs text-primary hover:underline">Sign Out</button>
            </div>
            <Link href="/dashboard" className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:ring-2 hover:ring-primary transition-all">
              <User className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <Link 
            href="/login" 
            className="flex items-center gap-2 bg-primary hover:opacity-90 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-sm"
          >
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Login / Sign Up</span>
          </Link>
        )}
      </div>
    </header>
  );
}
