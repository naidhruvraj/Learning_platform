'use client';

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Header from "@/app/dashboard/_components/Header";

const colors = [
  { text: "#ff4d4d", bg: "#ffcccc" },
  { text: "#4d79ff", bg: "#cce0ff" },
  { text: "#33cc33", bg: "#ccffcc" },
  { text: "#ff9933", bg: "#ffddb3" },
  { text: "#9933ff", bg: "#e0ccff" },
  { text: "#ff6699", bg: "#ffccd9" },
];

const titleFonts = [
  "Poppins, sans-serif",
  "Montserrat, sans-serif",
  "Roboto Slab, serif",
  "Raleway, sans-serif",
  "Lobster, cursive",
  "Ubuntu, sans-serif"
];

const StudentModules = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [modules, setModules] = useState([]);

  // Redirect teachers
  useEffect(() => {
    if (isLoaded) {
      const userRole = user?.publicMetadata?.role;
      if (userRole === "teacher") router.replace("/dashboard/teacher");
    }
  }, [isLoaded, user, router]);

  // Fetch modules
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-purple-300 relative overflow-hidden flex flex-col">
      <Header />

      <div className="flex-grow flex items-center justify-center">
        {modules.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="text-4xl font-bold text-indigo-900 mb-4">
              No modules available right now
            </h2>
            <p className="text-lg text-gray-700">
              Come back later to explore new modules!
            </p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-10 p-6">
            {modules.map((mod, index) => {
              const colorIndex = index % colors.length;
              const fontIndex = index % titleFonts.length;

              return (
                <div
                  key={mod._id}
                  className="relative p-6 rounded-2xl flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
                  style={{
                    backgroundColor: colors[colorIndex].bg,
                    width: "450px",
                    minHeight: "450px",
                  }}
                >
                  {/* Rotating gradient border */}
                  <div className="absolute -inset-1 rounded-2xl border-4 border-transparent">
                    <div className="animated-border absolute inset-0 rounded-2xl pointer-events-none"></div>
                  </div>

                  {/* Module title centered with unique color and font */}
                  <h2
                    className="absolute top-6 left-1/2 transform -translate-x-1/2 text-center text-4xl font-bold"
                    style={{
                      color: colors[colorIndex].text,
                      fontFamily: "Lobster, cursive",
                    }}
                  >
                    {mod.name}
                  </h2>

                  <div className="mt-16 px-4 flex flex-col items-center">
                    <p className="text-gray-800 text-center mb-4">{mod.description}</p>
                    <video
                      controls
                      className="w-full rounded-lg shadow-md"
                      style={{ height: "250px" }}
                    >
                      <source src={mod.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute w-72 h-72 bg-purple-400 rounded-full opacity-60 blur-3xl animate-blob1"></div>
        <div className="absolute w-96 h-96 bg-pink-400 rounded-full opacity-50 blur-2xl bottom-10 right-10 animate-blob2"></div>
      </div>

      <style>
        {`
          .animated-border {
            border: 4px solid transparent;
            border-radius: 1rem;
            background: conic-gradient(#ff4d4d, #4d79ff, #33cc33, #ff9933, #9933ff, #ff6699, #ff4d4d);
            background-size: 200% 200%;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            animation: rotate-border 3s linear infinite;
          }

          @keyframes rotate-border {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }

          @keyframes blob1 {
            0% { transform: translate(0px,0px); }
            50% { transform: translate(200px,100px); }
            100% { transform: translate(0px,0px); }
          }

          @keyframes blob2 {
            0% { transform: translate(0px,0px); }
            50% { transform: translate(-150px,-100px); }
            100% { transform: translate(0px,0px); }
          }

          .animate-blob1 { animation: blob1 20s infinite alternate; }
          .animate-blob2 { animation: blob2 25s infinite alternate; }
        `}
      </style>
    </div>
  );
};

export default StudentModules;
