"use client";

import Image from "next/image";

export default function Logo() {
  return (
    <div className="relative flex items-center justify-center mb-8">
      {/* Rotating gradient border with pulse */}
      <div className="absolute w-[200px] h-[200px] rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-spin-slow animate-pulse-slow"></div>

      {/* Static logo */}
      <div className="relative w-[180px] h-[180px] bg-white rounded-full p-2 flex items-center justify-center shadow-lg">
        <Image
          src="/logo.png"
          alt="App Logo"
          width={180}
          height={180}
          className="rounded-full"
          priority
        />
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        .animate-spin-slow { animation: spin-slow 6s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
