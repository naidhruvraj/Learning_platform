// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { UserButton, useUser } from "@clerk/nextjs";

// const PreAssessment = () => {
//   const { user } = useUser();
//   const router = useRouter();
//   const [studentData, setStudentData] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     age: "",
//     address: "",
//     mobile: "",
//     bloodGroup: "",
//     motorSkills: "",
//     communicationSkills: "",
//     socialSkills: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     const fetchStudentData = async () => {
//       try {
//         const email = user?.primaryEmailAddress?.emailAddress;
//         if (!email) return;

//         const res = await fetch(`/api/saveStudentData?email=${email}`);
//         if (!res.ok) return;

//         const data = await res.json();
//         if (data?.message !== "Student not found") {
//           setStudentData(data);
//         }
//       } catch (error) {
//         console.error("Error fetching student data:", error);
//       }
//     };

//     if (user) fetchStudentData();
//   }, [user]);

//   const handleFormChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const res = await fetch("/api/saveStudentData", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...formData, email: user?.primaryEmailAddress?.emailAddress }),
//       });

//       if (res.ok) {
//         const savedData = await res.json();
//         setStudentData(savedData);
//       }
//     } catch (error) {
//       console.error("Error saving student data:", error);
//     }

//     setIsSubmitting(false);
//   };

//   const handleBeginTest = () => {
//     router.push("/dashboard/assessment");
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-300 to-purple-400 text-white p-8">
//       <main className="relative z-10 flex flex-col items-center justify-center p-10 bg-white/30 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/40 text-center w-[95%] max-w-2xl">
//         {!studentData ? (
//           <form onSubmit={handleFormSubmit} className="space-y-6 w-full">
//             <h1 className="text-4xl font-extrabold text-purple-700 mb-4">📝 Student Profile</h1>

//             <div className="grid grid-cols-1 gap-4">
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleFormChange}
//                 required
//                 placeholder="Full Name"
//                 className="w-full p-3 rounded-lg border text-gray-800 shadow-md"
//               />
//               <input
//                 type="number"
//                 name="age"
//                 value={formData.age}
//                 onChange={handleFormChange}
//                 required
//                 placeholder="Age"
//                 className="w-full p-3 rounded-lg border text-gray-800 shadow-md"
//               />
//               <input
//                 type="text"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleFormChange}
//                 required
//                 placeholder="Address"
//                 className="w-full p-3 rounded-lg border text-gray-800 shadow-md"
//               />
//               <input
//                 type="text"
//                 name="mobile"
//                 value={formData.mobile}
//                 onChange={handleFormChange}
//                 required
//                 placeholder="Mobile Number"
//                 className="w-full p-3 rounded-lg border text-gray-800 shadow-md"
//               />
//               <input
//                 type="text"
//                 name="bloodGroup"
//                 value={formData.bloodGroup}
//                 onChange={handleFormChange}
//                 required
//                 placeholder="Blood Group"
//                 className="w-full p-3 rounded-lg border text-gray-800 shadow-md"
//               />
//             </div>

//             {/* Hidden Skill Fields (Stored but NOT displayed later) */}
//             <div className="bg-[#EDE7F6] p-4 rounded-lg shadow-md border-2 border-purple-300 mt-4">
//               <h2 className="text-xl font-bold text-purple-800 mb-2">🛠 Skill Levels</h2>

//               <label className="block text-sm font-medium text-purple-700">Motor Skills:</label>
//               <select
//                 name="motorSkills"
//                 value={formData.motorSkills}
//                 onChange={handleFormChange}
//                 required
//                 className="w-full p-3 rounded-lg border text-gray-800 shadow-md bg-white"
//               >
//                 <option value="">Select Level</option>
//                 <option value="Excellent">Excellent</option>
//                 <option value="Good">Good</option>
//                 <option value="Average">Average</option>
//                 <option value="Needs Improvement">Needs Improvement</option>
//               </select>

//               <label className="block text-sm font-medium text-purple-700 mt-3">Communication Skills:</label>
//               <select
//                 name="communicationSkills"
//                 value={formData.communicationSkills}
//                 onChange={handleFormChange}
//                 required
//                 className="w-full p-3 rounded-lg border text-gray-800 shadow-md bg-white"
//               >
//                 <option value="">Select Level</option>
//                 <option value="Excellent">Excellent</option>
//                 <option value="Good">Good</option>
//                 <option value="Average">Average</option>
//                 <option value="Needs Improvement">Needs Improvement</option>
//               </select>

//               <label className="block text-sm font-medium text-purple-700 mt-3">Social Skills:</label>
//               <select
//                 name="socialSkills"
//                 value={formData.socialSkills}
//                 onChange={handleFormChange}
//                 required
//                 className="w-full p-3 rounded-lg border text-gray-800 shadow-md bg-white"
//               >
//                 <option value="">Select Level</option>
//                 <option value="Excellent">Excellent</option>
//                 <option value="Good">Good</option>
//                 <option value="Average">Average</option>
//                 <option value="Needs Improvement">Needs Improvement</option>
//               </select>
//             </div>

//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="bg-blue-600 text-white px-8 py-3 rounded-xl shadow-lg hover:bg-blue-700 hover:scale-105 transition-transform duration-300 w-full"
//             >
//               {isSubmitting ? "Saving..." : "Save Profile"}
//             </button>
//           </form>
//         ) : (
//           <>
//             <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-700">
//               Welcome, {studentData.name}!
//             </h1>

//             <div className="bg-white text-gray-900 p-6 rounded-xl w-full text-left mt-6 shadow-lg border-2 border-gray-300">
//               <h2 className="text-2xl font-bold text-indigo-600 mb-3">📌 Profile Details</h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
//                 <p><strong>👤 Name:</strong> {studentData.name}</p>
//                 <p><strong>🎂 Age:</strong> {studentData.age}</p>
//                 <p><strong>🏡 Address:</strong> {studentData.address}</p>
//                 <p><strong>📞 Mobile:</strong> {studentData.mobile}</p>
//                 <p><strong>🩸 Blood Group:</strong> {studentData.bloodGroup}</p>
//               </div>
//             </div>

//             <button
//               className="bg-blue-500 text-white px-8 py-3 rounded-xl shadow-lg hover:bg-blue-600 hover:scale-105 transition-transform duration-300 mt-6"
//               onClick={handleBeginTest}
//             >
//               🎯 Start Pre-Assessment
//             </button>
//           </>
//         )}
//       </main>
//     </div>
//   );
// };

// export default PreAssessment;

'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";

const PreAssessment = () => {
  const { user } = useUser();
  const router = useRouter();
  const [studentData, setStudentData] = useState(null);
  const [preAssessmentStatus, setPreAssessmentStatus] = useState("not_completed");
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    address: "",
    mobile: "",
    bloodGroup: "",
    motorSkills: "",
    communicationSkills: "",
    socialSkills: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchStudentData = async () => {
      try {
        const email = user?.primaryEmailAddress?.emailAddress;
        if (!email) return;

        const res = await fetch(`/api/saveStudentData?email=${email}`);
        if (!res.ok) return;

        const data = await res.json();
        setStudentData(data);
        setPreAssessmentStatus(data.preAssessmentCompleted ? "completed" : "not_completed");
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, [user]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/saveStudentData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, email: user?.primaryEmailAddress?.emailAddress }),
      });

      if (res.ok) {
        const savedData = await res.json();
        setStudentData(savedData);
        setPreAssessmentStatus(savedData.preAssessmentCompleted ? "completed" : "not_completed");
      }
    } catch (error) {
      console.error("Error saving student data:", error);
    }

    setIsSubmitting(false);
  };

  const handleProceed = () => {
    if (preAssessmentStatus === "completed") {
      router.push("/modules/student");
    } else {
      router.push("/dashboard/assessment");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-r from-indigo-300 to-purple-400 text-white p-6 relative overflow-hidden">
      
      {/* Header with logo */}
      <motion.div
        className="flex items-center gap-4 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img src="/logo.png" alt="Ability Nest Logo" className="w-12 h-12" />
        <h1 className="text-3xl font-extrabold text-white">Ability Nest</h1>
      </motion.div>

      {/* Floating shapes */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-yellow-200 rounded-full opacity-20 animate-bounce-slow"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-400 rounded-full opacity-20 animate-bounce-slow"></div>

      {!studentData ? (
        <motion.form
          onSubmit={handleFormSubmit}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/30 backdrop-blur-xl rounded-2xl shadow-2xl border-4 border-gradient-animated p-8 w-[95%] max-w-2xl space-y-6 text-gray-900"
        >
          <h2 className="text-4xl font-extrabold text-purple-700 mb-6 text-center animate-fade-in">📝 Student Profile</h2>

          {[{ label: "Full Name", name: "name", type: "text" },
            { label: "Age", name: "age", type: "number" },
            { label: "Address", name: "address", type: "text" },
            { label: "Mobile Number", name: "mobile", type: "text" },
            { label: "Blood Group", name: "bloodGroup", type: "text" }].map((field, idx) => (
            <div key={idx} className="flex flex-col md:flex-row items-center gap-4">
              <label className="w-40 text-lg font-medium text-purple-800">{field.label}:</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleFormChange}
                required
                className="flex-1 p-3 rounded-lg border border-purple-400 shadow focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300 hover:scale-105"
              />
            </div>
          ))}

          <div className="mt-6 bg-purple-100 p-6 rounded-xl shadow-lg border-2 border-purple-300 animate-fade-in">
            <h2 className="text-xl font-bold text-purple-800 mb-4 text-center">🛠 Skill Levels</h2>
            {["motorSkills", "communicationSkills", "socialSkills"].map((field, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center gap-4 mb-4">
                <label className="w-40 text-lg font-medium text-purple-700 capitalize">{field.replace(/([A-Z])/g, " $1")}:</label>
                <select
                  name={field}
                  value={formData[field]}
                  onChange={handleFormChange}
                  required
                  className="flex-1 p-3 rounded-lg border border-purple-400 shadow focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white transition-all duration-300 hover:scale-105"
                >
                  <option value="">Select Level</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Average">Average</option>
                  <option value="Needs Improvement">Needs Improvement</option>
                </select>
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl shadow-lg hover:bg-blue-700 hover:scale-105 transition-transform duration-300 w-full text-lg font-semibold"
          >
            {isSubmitting ? "Saving..." : "Save Profile"}
          </button>
        </motion.form>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/30 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/40 p-8 w-[95%] max-w-2xl text-gray-900"
        >
          <h2 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-700 text-center animate-fade-in">
            Welcome, {studentData.name}!
          </h2>

          <div className="bg-white text-gray-900 p-6 rounded-xl w-full text-left mt-6 shadow-lg border-2 border-gray-300 animate-fade-in">
            <h3 className="text-2xl font-bold text-indigo-600 mb-3">📌 Profile Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
              <p><strong>👤 Name:</strong> {studentData.name}</p>
              <p><strong>🎂 Age:</strong> {studentData.age}</p>
              <p><strong>🏡 Address:</strong> {studentData.address}</p>
              <p><strong>📞 Mobile:</strong> {studentData.mobile}</p>
              <p><strong>🩸 Blood Group:</strong> {studentData.bloodGroup}</p>
            </div>
          </div>

          <div className={`mt-6 p-4 rounded-xl shadow-md w-full text-lg font-medium text-white text-center border-2 animate-fade-in
            ${preAssessmentStatus === 'completed' ? 'bg-green-600 border-green-400' : 'bg-red-500 border-red-400'}`}>
            {preAssessmentStatus === "completed" ? (
              <p>✅ <strong>You have successfully completed the Pre-Assessment.</strong> <br /> Proceed to explore the learning modules.</p>
            ) : (
              <p>⚠️ <strong>Please complete the Pre-Assessment first.</strong> <br /> You need to complete it to unlock the modules.</p>
            )}
          </div>

          <button
            className={`px-8 py-3 rounded-xl shadow-lg transition-transform duration-300 mt-6 w-full text-white text-lg font-semibold hover:scale-105
              ${preAssessmentStatus === "completed" ? "bg-blue-600 hover:bg-blue-700" : "bg-orange-500 hover:bg-orange-600"}`}
            onClick={handleProceed}
          >
            {preAssessmentStatus === "completed" ? "📚 Proceed to Modules" : "🎯 Start Pre-Assessment"}
          </button>
        </motion.div>
      )}

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-bounce-slow { animation: bounce-slow 6s ease-in-out infinite; }

        @keyframes border-gradient {
          0% { border-color: #a78bfa; }
          50% { border-color: #f472b6; }
          100% { border-color: #a78bfa; }
        }
        .border-gradient-animated { animation: border-gradient 3s ease-in-out infinite; }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 1s ease forwards; }
      `}</style>
    </div>
  );
};

export default PreAssessment;
