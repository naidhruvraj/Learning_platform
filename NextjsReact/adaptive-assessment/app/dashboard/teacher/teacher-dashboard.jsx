'use client';

import React from 'react';
import { useUser } from '@clerk/nextjs';

const TeacherDashboard = () => {
  const { user } = useUser();

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300 p-6">
      
      {/* Main Dashboard Header */}
      <div className="text-center max-w-3xl w-full mb-10">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-indigo-900 drop-shadow-lg mb-6">
          Welcome, {user?.fullName || 'Teacher'}!
        </h1>
        <p className="text-lg sm:text-xl text-indigo-800">
          Hover over each card to see what you can do with Modules and Assessment Reports.
        </p>
      </div>

      {/* Flip Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-4xl w-full">

        {/* Modules Flip Card */}
        <div className="group perspective cursor-pointer">
          <div className="relative w-full h-80 transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
            {/* Front */}
            <div className="absolute w-full h-full bg-gradient-to-tr from-purple-500 to-pink-500 rounded-3xl flex flex-col items-center justify-center text-white shadow-xl backface-hidden p-6">
              <span className="text-6xl sm:text-7xl animate-bounce">📚</span>
              <h2 className="mt-5 text-3xl sm:text-4xl font-bold tracking-wide">Modules</h2>
            </div>
            {/* Back */}
            <div className="absolute w-full h-full bg-white/95 backdrop-blur-md rounded-3xl flex flex-col items-start justify-center text-indigo-900 shadow-xl transform rotate-y-180 backface-hidden p-8 space-y-6">

              <h2 className="text-2xl font-bold text-purple-600">Modules</h2>

              <div className="flex items-center gap-3 animate-bounce">
                <span className="text-2xl">✨</span>
                <p className="text-xl font-semibold">
                  <span className="text-purple-600">Add New Modules:</span> Title, Description, and Videos
                </p>
              </div>

              <div className="flex items-center gap-3 animate-bounce delay-150">
                <span className="text-2xl">🎯</span>
                <p className="text-lg">
                  <span className="text-pink-500 font-medium">Organize content</span> efficiently for students
                </p>
              </div>

              <div className="flex items-center gap-3 animate-bounce delay-300">
                <span className="text-2xl">🚀</span>
                <p className="text-lg">
                  <span className="text-indigo-600 font-medium">Engage learners</span> with structured lessons
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Assessment Reports Flip Card */}
        <div className="group perspective cursor-pointer">
          <div className="relative w-full h-80 transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
            {/* Front */}
            <div className="absolute w-full h-full bg-gradient-to-tr from-green-400 to-teal-400 rounded-3xl flex flex-col items-center justify-center text-white shadow-xl backface-hidden p-6">
              <span className="text-6xl sm:text-7xl animate-bounce">📝</span>
              <h2 className="mt-5 text-3xl sm:text-4xl font-bold tracking-wide">Assessment Reports</h2>
            </div>
            {/* Back */}
            <div className="absolute w-full h-full bg-white/95 backdrop-blur-md rounded-3xl flex flex-col items-start justify-center text-indigo-900 shadow-xl transform rotate-y-180 backface-hidden p-8 space-y-6">

              <h2 className="text-2xl font-bold text-green-600">Assessment Reports</h2>

              <div className="flex items-center gap-3 animate-bounce">
                <span className="text-2xl">🔍</span>
                <p className="text-xl font-semibold">
                  <span className="text-green-600">View Reports:</span> Track student progress easily
                </p>
              </div>

              <div className="flex items-center gap-3 animate-bounce delay-150">
                <span className="text-2xl">📊</span>
                <p className="text-lg">
                  <span className="text-teal-500 font-medium">Search & Filter:</span> Quickly find specific assessments
                </p>
              </div>

              <div className="flex items-center gap-3 animate-bounce delay-300">
                <span className="text-2xl">💾</span>
                <p className="text-lg">
                  <span className="text-indigo-600 font-medium">Export:</span> Download Excel files for offline use
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>

      <style jsx>{`
        .perspective { perspective: 1000px; }
        .transform-style-preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }

        .animate-bounce {
          animation: bounce 1.2s infinite;
        }
        .delay-150 { animation-delay: 0.15s; }
        .delay-300 { animation-delay: 0.3s; }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
};

export default TeacherDashboard;








// 'use client';

// import React from 'react';
// import { useUser } from '@clerk/nextjs';

// const TeacherDashboard = () => {
//   const { user } = useUser();

//   return (
//     <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-indigo-300 to-purple-400">
//       {/* Glassmorphism Card */}
//       <div className="bg-white/40 backdrop-blur-lg shadow-2xl rounded-2xl p-10 px-12 text-center border border-white/50 max-w-xl transition-transform hover:scale-105 duration-300">
//         <h1 className="text-4xl font-bold text-gray-900 drop-shadow-md">
//           Welcome, {user?.fullName || 'Teacher'}!
//         </h1>
//         <p className="text-lg text-gray-800 mt-3">
//           “A teacher’s guidance shapes the path of learning. Your dedication
//           lights the way for every student’s journey.”
//         </p>
//       </div>
//     </div>
//   );
// };

// export default TeacherDashboard;
