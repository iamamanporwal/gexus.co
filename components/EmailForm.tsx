"use client";

import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { ArrowRight, Check } from 'lucide-react';

export default function EmailForm() {
  const [state, handleSubmit] = useForm("mrepbnlj");

  if (state.succeeded) {
    return (
      <div className="inline-flex items-center gap-2 text-green-400 font-medium text-sm py-1.5 px-3 bg-white/5 rounded-full border border-green-400/30 backdrop-blur-sm animate-in fade-in duration-500">
        <Check className="w-3.5 h-3.5" />
        <span>Thanks for joining!</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm relative group">
      {/* Container with overflow-hidden to clip the animated border */}
      <div className="relative flex items-center p-[1.5px] rounded-full overflow-hidden isolate transform-gpu">

        {/* Outer glow layer for depth */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 via-white/10 to-white/20 blur-sm opacity-40 animate-border-glow" />

        {/* Primary rotating gradient - smoother, more refined */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] animate-border-spin-smooth will-change-transform bg-[conic-gradient(from_0deg,transparent_0%,transparent_30%,rgba(255,255,255,0.4)_50%,rgba(255,255,255,0.9)_55%,rgba(255,255,255,0.4)_60%,transparent_80%,transparent_100%)]" />

        {/* Secondary counter-rotating gradient for premium effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] animate-border-spin-reverse will-change-transform bg-[conic-gradient(from_180deg,transparent_0%,transparent_40%,rgba(255,255,255,0.2)_50%,transparent_60%,transparent_100%)] opacity-50" />

        {/* Inner Content - Masks the center */}
        <div className="w-full relative flex items-center bg-black/90 rounded-full backdrop-blur-xl z-10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email for early access"
            required
            className="w-full bg-transparent border-none rounded-full py-3 pl-6 pr-14 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-0 transition-all duration-300"
          />

          <button
            type="submit"
            disabled={state.submitting}
            className="absolute right-1 top-1 bottom-1 aspect-square rounded-full bg-white text-black flex items-center justify-center hover:scale-95 active:scale-90 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 z-20 shadow-lg"
          >
            {state.submitting ? (
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <ValidationError
        prefix="Email"
        field="email"
        errors={state.errors}
        className="text-red-400 text-xs mt-2 ml-4 absolute"
      />
    </form>
  );
}
