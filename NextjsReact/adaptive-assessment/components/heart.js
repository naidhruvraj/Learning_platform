"use client";

export default function Heart({ className }) {
  return (
    <div className={`flex justify-center items-center relative ${className}`}>
      {/* Soft gradient glow */}
      <div className="heart-glow"></div>
      {/* Solid inner heart */}
      <div className="heart"></div>

      <style jsx>{`
        .heart-glow {
          width: 70px;
          height: 70px;
          position: absolute;
          border-radius: 50%;
          background: conic-gradient(from 0deg, #f472b6, #c084fc, #60a5fa, #f472b6);
          filter: blur(12px);
        }

        .heart {
          width: 50px;
          height: 50px;
          background: #f43f5e;
          position: relative;
          transform: rotate(-45deg);
          animation: beat 2s ease-in-out infinite;
          z-index: 10;
          border-radius: 5px;
        }

        .heart::before,
        .heart::after {
          content: "";
          width: 50px;
          height: 50px;
          background: #f43f5e;
          border-radius: 50%;
          position: absolute;
        }

        .heart::before {
          top: -25px;
          left: 0;
        }

        .heart::after {
          top: 0;
          left: 25px;
        }

        @keyframes beat {
          0%, 100% { transform: rotate(-45deg) scale(1); }
          25% { transform: rotate(-45deg) scale(1.08); }
          50% { transform: rotate(-45deg) scale(1.15); }
          75% { transform: rotate(-45deg) scale(1.08); }
        }
      `}</style>
    </div>
  );
}
