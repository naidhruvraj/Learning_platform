'use client';

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Header from "@/app/dashboard/_components/Header";

const colors = [
  { text: "#ff4d4d", bg: "#ffcccc" },
  { text: "#4d79ff", bg: "#cce0ff" },
  { text: "#33cc33", bg: "#ccffcc" },
  { text: "#ff9933", bg: "#ffddb3" },
  { text: "#9933ff", bg: "#e0ccff" },
  { text: "#ff6699", bg: "#ffccd9" },
];

const StudentAssessment = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [modules, setModules] = useState([]);

  const fetchModules = useCallback(async () => {
    try {
      const response = await axios.get("/api/modules/getModules");
      setModules(response.data.modules);
    } catch (error) {
      console.error("Error fetching modules:", error);
      alert("Failed to load modules.");
    }
  }, []);

  useEffect(() => { fetchModules(); }, [fetchModules]);

  const handleStartTest = (module) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("selectedModuleId", module._id);
      sessionStorage.setItem("selectedModuleName", module.name);
    }
    router.push("/maintest/student/post-assessment");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-blue-200 to-purple-300 relative overflow-hidden flex flex-col">
      <div className="relative z-50 bg-white shadow-md">
        <Header />
      </div>

      <div className="flex-grow flex items-center justify-center px-4 mt-16">
        {modules.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center">
            <motion.h2
              className="text-4xl font-extrabold text-indigo-900 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              No Assessments available right now
            </motion.h2>
            <motion.p
              className="text-lg text-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Come back later to start your assessment!
            </motion.p>
          </div>
        ) : (
          <motion.div
            className="max-w-7xl mx-auto flex flex-wrap justify-center gap-10"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
          >
            {modules.map((mod, index) => {
              const colorIndex = index % colors.length;
              return (
                <motion.div
                  key={mod._id}
                  className="relative p-6 rounded-2xl flex flex-col items-center cursor-pointer overflow-hidden"
                  style={{ backgroundColor: colors[colorIndex].bg, width: "400px", minHeight: "250px" }}
                  whileHover={{ scale: 1.05 }}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                  }}
                >
                  <div className="absolute -inset-1 rounded-2xl border-4 border-transparent z-0">
                    <div className="animated-border absolute inset-0 rounded-2xl pointer-events-none"></div>
                  </div>

                  <div
                    className="absolute top-0 left-0 w-full p-3 text-xl font-bold rounded-t-2xl z-10 text-white"
                    style={{ backgroundColor: colors[colorIndex].text }}
                  >
                    {mod.name}
                  </div>

                  <div className="mt-12 px-4 z-10 text-center">
                    <p className="text-gray-800 text-lg mb-4">{mod.description}</p>
                    <motion.button
                      className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:scale-105 active:scale-95 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleStartTest(mod)}
                    >
                      Start Test
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-72 h-72 bg-purple-400 rounded-full opacity-60 blur-3xl"
          animate={{ x: [0, 200, 0], y: [0, 100, 0] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-pink-400 rounded-full opacity-50 blur-2xl bottom-10 right-10"
          animate={{ x: [0, -150, 0], y: [0, -100, 0] }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "mirror" }}
        />
      </div>

      <style>
        {`
          .animated-border {
            border: 4px solid transparent;
            border-radius: 1rem;
            background: conic-gradient(
              #ff4d4d,
              #4d79ff,
              #33cc33,
              #ff9933,
              #9933ff,
              #ff6699,
              #ff4d4d
            );
            background-size: 200% 200%;
            -webkit-mask: 
              linear-gradient(#fff 0 0) content-box, 
              linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            animation: rotate-gradient 3s linear infinite;
          }

          @keyframes rotate-gradient {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }

          @keyframes gradient-x {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 5s ease infinite;
          }
        `}
      </style>
    </div>
  );
};

export default StudentAssessment;



// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import Header from "@/app/dashboard/_components/Header"; 

// const colors = [
//   { text: "#ff4d4d", bg: "#ffcccc" },
//   { text: "#4d79ff", bg: "#cce0ff" },
//   { text: "#33cc33", bg: "#ccffcc" },
//   { text: "#ff9933", bg: "#ffddb3" },
//   { text: "#9933ff", bg: "#e0ccff" },
//   { text: "#ff6699", bg: "#ffccd9" },
// ];

// const StudentAssessment = () => {
//   const { user, isLoaded } = useUser();
//   const router = useRouter();
//   const [modules, setModules] = useState([]);

//   // Fetch modules
//   const fetchModules = useCallback(async () => {
//     try {
//       const response = await axios.get("/api/modules/getModules");
//       setModules(response.data.modules);
//     } catch (error) {
//       console.error("Error fetching modules:", error);
//       alert("Failed to load modules. Please try again later.");
//     }
//   }, []);

//   useEffect(() => {
//     fetchModules();
//   }, [fetchModules]);

//   // Handle navigation and store module ID in sessionStorage
//   const handleStartTest = (module) => {
//     if (typeof window !== "undefined") {
//       sessionStorage.setItem("selectedModuleId", module._id); // Store module ID
//       sessionStorage.setItem("selectedModuleName", module.name);
//     }
//     router.push("/maintest/student/post-assessment"); // Navigate to PostAssessment page
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-200 to-blue-300">
//       <div className="relative z-50 bg-white shadow-md">
//         <Header />
//       </div>

//       <div className="mt-20">
//         <h1 className="text-4xl font-bold text-center mt-6 text-indigo-900">
//           📝 Select a Module for Assessment
//         </h1>
//         <p className="text-center text-lg text-gray-700 mb-6">
//           Click "Start Test" to begin your assessment.
//         </p>

//         {/* Modules Container */}
//         <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-10 p-6">
//           {modules.map((mod, index) => {
//             const colorIndex = index % colors.length;
//             return (
//               <div
//                 key={mod._id}
//                 className="relative p-6 rounded-2xl shadow-lg border-4 border-white flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105"
//                 style={{
//                   backgroundColor: colors[colorIndex].bg,
//                   minHeight: "250px",
//                   width: "400px",
//                   justifyContent: "center",
//                   textAlign: "center",
//                   position: "relative",
//                 }}
//               >
//                 <div
//                   className="absolute top-0 left-0 w-full p-3 text-xl font-bold rounded-t-2xl"
//                   style={{
//                     backgroundColor: colors[colorIndex].text,
//                     color: "white",
//                   }}
//                 >
//                   {mod.name}
//                 </div>

//                 <div className="mt-12 px-4">
//                   <p className="text-gray-800 text-lg">{mod.description}</p>

//                   <button
//                     className="mt-4 px-6 py-2 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md transition-all hover:bg-indigo-700 active:scale-95"
//                     onClick={() => handleStartTest(mod)}
//                   >
//                     Start Test
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentAssessment;
