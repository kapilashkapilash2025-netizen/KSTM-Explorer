'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-primary-600 flex flex-col items-center justify-center text-white"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="w-24 h-24 bg-white p-2 rounded-3xl shadow-2xl mb-6 overflow-hidden">
              <Image src="/logo.png" alt="Logo" width={96} height={96} className="w-full h-full object-cover rounded-2xl" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Sri Lanka Travel Guide</h1>
            <p className="text-primary-100 opacity-80 text-sm">Smart Tourism Assistant</p>
          </motion.div>

          <div className="absolute bottom-12 flex flex-col items-center gap-4">
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <div className="text-center space-y-1">
              <p className="text-[10px] font-semibold tracking-widest uppercase opacity-70">Sri Lanka Travel Explorer</p>
              <p className="text-xs font-bold tracking-wide uppercase opacity-90">Smart Tourism Assistant</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
