'use client';

import React, { useState } from 'react';
import { LockKeyhole, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

const ACCESS_CODE = 'KAPI13$';

export default function AppAccessGate({ children }: { children: React.ReactNode }) {
  // Always require the code for every new page load (web + APK).
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = code.trim() === ACCESS_CODE;
    if (!valid) {
      setError('Invalid code. Please try again.');
      return;
    }

    setIsUnlocked(true);
    setError('');
  };

  if (!isUnlocked) {
    return (
      <div className="fixed inset-0 z-[120] bg-[#020817] text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-3xl border border-cyan-500/30 bg-[#071428] shadow-[0_0_40px_rgba(14,165,233,0.25)] p-6 sm:p-8">
          <div className="w-24 h-24 rounded-3xl bg-white p-2 mb-4 shadow-xl border border-cyan-200/40 overflow-hidden">
            <Image src="/logo.png" alt="App Logo" width={96} height={96} className="w-full h-full object-cover rounded-2xl" />
          </div>
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center mb-4">
            <LockKeyhole className="w-7 h-7 text-cyan-300" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Enter The Developed Code</h2>
          <p className="text-cyan-100/80 text-sm mb-6">This APK is protected. Enter access code to continue.</p>

          <form onSubmit={handleUnlock} className="space-y-4">
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter access code"
              className="w-full px-4 py-3 rounded-xl bg-[#0b1d36] border border-cyan-400/30 text-white placeholder:text-cyan-100/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            {error && <p className="text-red-300 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-[#001320] font-bold inline-flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" /> Unlock App
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
