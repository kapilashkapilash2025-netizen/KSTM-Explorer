'use client';

import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface AppCreditProps {
  className?: string;
}

export default function AppCredit({ className = '' }: AppCreditProps) {
  const [isNativeApp] = useState(() => {
    try {
      return (
        typeof window !== 'undefined' &&
        // Capacitor injects this object in native runtime.
        !!(window as Window & { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor?.isNativePlatform?.()
      );
    } catch {
      return false;
    }
  });

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 bg-white/50 backdrop-blur-sm border border-gray-100 rounded-full shadow-sm transition-all hover:border-primary-200 group ${className}`}>
      <Sparkles className="w-3.5 h-3.5 text-primary-500 group-hover:animate-pulse" />
      <span className="text-xs font-bold bg-gradient-to-r from-gray-900 to-primary-700 bg-clip-text text-transparent tracking-tight">
        {isNativeApp ? 'Sri Lanka Travel Explorer' : 'Sri Lanka Travel Explorer'}
      </span>
    </div>
  );
}
