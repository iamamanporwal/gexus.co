"use client";

import React from 'react';
import Navigation from '@/components/Navigation';
import ContentPanel from '@/components/ContentPanel';
import BackgroundManager from '@/components/BackgroundManager';

// import { useAppStore } from '@/lib/store';

export default function Home() {


  return (
    <main className="w-full relative bg-black">

      <Navigation />

      {/* Fixed Background Layer */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <BackgroundManager />
      </div>

      {/* Scrollable Content Layer */}
      <div className="fixed inset-0 w-full h-[100dvh] overflow-y-auto md:snap-y md:snap-mandatory z-30">
        <ContentPanel />
      </div>
    </main>
  );
}
