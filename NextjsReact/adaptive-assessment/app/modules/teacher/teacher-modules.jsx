// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import Header from "@/app/dashboard/_components/Header";

// const TeacherModules = () => {
//   const { user, isLoaded } = useUser();
//   const router = useRouter();
//   const [modules, setModules] = useState([]);
//   const [newModule, setNewModule] = useState({ name: "", description: "", video: null });
//   const [editingModule, setEditingModule] = useState(null);
//   const [loadingCreate, setLoadingCreate] = useState(false);
//   const [loadingUpdate, setLoadingUpdate] = useState(false);
//   const [loadingDelete, setLoadingDelete] = useState(false);

//   useEffect(() => {
//     if (isLoaded && user?.publicMetadata?.role !== "teacher") {
//       router.replace("/dashboard/student");
//     }
//   }, [isLoaded, user, router]);

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

//   const handleInputChange = (e) => {
//     setNewModule({ ...newModule, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setNewModule({ ...newModule, video: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!newModule.name || !newModule.description || !newModule.video) {
//       alert("Please fill all fields!");
//       return;
//     }

//     setLoadingCreate(true);
//     try {
//       const formData = new FormData();
//       formData.append("file", newModule.video);

//       const uploadRes = await axios.post("/api/modules/uploadVideo", formData);
//       const videoUrl = uploadRes.data.videoUrl;

//       const response = await axios.post("/api/modules/createModule", {
//         name: newModule.name,
//         description: newModule.description,
//         videoUrl,
//       });

//       setModules((prev) => [response.data.module, ...prev]);
//       alert("Module added successfully!");
//       setNewModule({ name: "", description: "", video: null });
//       document.getElementById("moduleVideo").value = "";
//     } catch (error) {
//       console.error("Error adding module:", error);
//       alert("An error occurred while adding the module.");
//     }
//     setLoadingCreate(false);
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     if (!editingModule.name || !editingModule.description) {
//       alert("Please fill all fields!");
//       return;
//     }

//     setLoadingUpdate(true);
//     try {
//       let videoUrl = editingModule.videoUrl;

//       if (editingModule.newVideo) {
//         const formData = new FormData();
//         formData.append("file", editingModule.newVideo);

//         const uploadRes = await axios.post("/api/modules/uploadVideo", formData);
//         videoUrl = uploadRes.data.videoUrl;
//       }

//       const updatedModule = {
//         _id: editingModule._id,
//         name: editingModule.name,
//         description: editingModule.description,
//         videoUrl,
//       };

//       await axios.put("/api/modules/updateModule", updatedModule);

//       setModules((prevModules) =>
//         prevModules.map((mod) =>
//           mod._id === editingModule._id ? updatedModule : mod
//         )
//       );

//       alert("Module updated successfully!");
//       setEditingModule(null);
//     } catch (error) {
//       console.error("Error updating module:", error);
//       alert("An error occurred while updating the module.");
//     }
//     setLoadingUpdate(false);
//   };

//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure you want to delete this module?")) return;

//     setLoadingDelete(true);
//     try {
//       await axios.delete(`/api/modules/deleteModule?id=${id}`);
//       setModules((prevModules) => prevModules.filter((mod) => mod._id !== id));
//       alert("Module deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting module:", error);
//       alert("Failed to delete module.");
//     }
//     setLoadingDelete(false);
//   };

//   return (
//     <>
//       <Header />
//       <div className="p-8 min-h-screen bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-100
// ">
//         <h1 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 drop-shadow-md">
//           Manage Modules
//         </h1>

//         {/* Create Module */}
//         <div className="bg-white shadow-md p-6 rounded-lg mb-6 max-w-2xl mx-auto">
//           <h2 className="text-xl font-semibold mb-4">Create New Module</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="text"
//               name="name"
//               placeholder="Module Name"
//               value={newModule.name}
//               onChange={handleInputChange}
//               className="border p-2 w-full rounded-md"
//             />
//             <textarea
//               name="description"
//               placeholder="Module Description"
//               value={newModule.description}
//               onChange={handleInputChange}
//               className="border p-2 w-full rounded-md"
//             />
//             <input
//               id="moduleVideo"
//               type="file"
//               accept="video/*"
//               onChange={handleFileChange}
//               className="border p-2 w-full rounded-md"
//             />
//             <button
//               type="submit"
//               className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
//               disabled={loadingCreate}
//             >
//               {loadingCreate ? "Uploading..." : "Add Module"}
//             </button>
//           </form>
//         </div>

//         {/* Edit Module */}
//         {editingModule && (
//           <div className="bg-white shadow-md p-6 rounded-lg mb-6 max-w-2xl mx-auto">
//             <h2 className="text-xl font-semibold mb-4 text-yellow-600">Edit Module</h2>
//             <form onSubmit={handleUpdate} className="space-y-4">
//               <input
//                 type="text"
//                 value={editingModule.name}
//                 onChange={(e) => setEditingModule({ ...editingModule, name: e.target.value })}
//                 className="border p-2 w-full rounded-md"
//               />
//               <textarea
//                 value={editingModule.description}
//                 onChange={(e) => setEditingModule({ ...editingModule, description: e.target.value })}
//                 className="border p-2 w-full rounded-md"
//               />
//               <input
//                 type="file"
//                 accept="video/*"
//                 onChange={(e) => setEditingModule({ ...editingModule, newVideo: e.target.files[0] })}
//                 className="border p-2 w-full rounded-md"
//               />
//               <button
//                 type="submit"
//                 className="bg-green-500 text-white px-4 py-2 rounded-md w-full"
//                 disabled={loadingUpdate}
//               >
//                 {loadingUpdate ? "Updating..." : "Update Module"}
//               </button>
//             </form>
//           </div>
//         )}

//         {/* List Modules */}
//         <h2 className="text-2xl font-semibold mb-4 text-center">Existing Modules</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
//           {modules.map((mod, idx) => (
//             <div
//               key={mod._id}
//               className={`p-4 rounded-xl shadow-md transition-transform hover:scale-[1.02] hover:border-2 hover:border-gradient-to-tr from-blue-400 to-indigo-400 ${
//                 idx % 2 === 0
//                   ? "bg-gradient-to-br from-white via-indigo-50 to-white"
//                   : "bg-gradient-to-br from-white via-blue-50 to-white"
//               }`}
//             >
//               <h3 className="text-lg font-semibold">{mod.name}</h3>
//               <video controls className="w-full rounded-md mt-2">
//                 <source src={mod.videoUrl} type="video/mp4" />
//                 Your browser does not support the video tag.
//               </video>
//               <div className="flex space-x-3 mt-4">
//                 <button
//                   onClick={() => setEditingModule(mod)}
//                   className="bg-yellow-500 text-white px-3 py-1 rounded-md"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(mod._id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded-md"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default TeacherModules;
'use client';

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Header from "@/app/dashboard/_components/Header";

const TeacherModules = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [modules, setModules] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);
  const [newModule, setNewModule] = useState({ name: "", description: "", video: null });
  const [editingModule, setEditingModule] = useState(null);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (isLoaded && user?.publicMetadata?.role !== "teacher") {
      router.replace("/dashboard/student");
    }
  }, [isLoaded, user, router]);

  const fetchModules = useCallback(async () => {
    try {
      const response = await axios.get("/api/modules/getModules");
      setModules(response.data.modules);
      setFilteredModules(response.data.modules);
    } catch (error) {
      console.error("Error fetching modules:", error);
      alert("Failed to load modules. Please try again later.");
    }
  }, []);

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  const handleInputChange = (e) => setNewModule({ ...newModule, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setNewModule({ ...newModule, video: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newModule.name || !newModule.description || !newModule.video) {
      alert("Please fill all fields!");
      return;
    }
    setLoadingCreate(true);
    try {
      const formData = new FormData();
      formData.append("file", newModule.video);
      const uploadRes = await axios.post("/api/modules/uploadVideo", formData);
      const videoUrl = uploadRes.data.videoUrl;
      const response = await axios.post("/api/modules/createModule", {
        name: newModule.name,
        description: newModule.description,
        videoUrl,
      });
      setModules((prev) => [response.data.module, ...prev]);
      setFilteredModules((prev) => [response.data.module, ...prev]);
      alert("Module added successfully!");
      setNewModule({ name: "", description: "", video: null });
      document.getElementById("moduleVideo").value = "";
    } catch (error) {
      console.error("Error adding module:", error);
      alert("An error occurred while adding the module.");
    }
    setLoadingCreate(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingModule.name || !editingModule.description) {
      alert("Please fill all fields!");
      return;
    }
    setLoadingUpdate(true);
    try {
      let videoUrl = editingModule.videoUrl;
      if (editingModule.newVideo) {
        const formData = new FormData();
        formData.append("file", editingModule.newVideo);
        const uploadRes = await axios.post("/api/modules/uploadVideo", formData);
        videoUrl = uploadRes.data.videoUrl;
      }
      const updatedModule = {
        _id: editingModule._id,
        name: editingModule.name,
        description: editingModule.description,
        videoUrl,
      };
      await axios.put("/api/modules/updateModule", updatedModule);
      setModules((prevModules) =>
        prevModules.map((mod) => (mod._id === editingModule._id ? updatedModule : mod))
      );
      setFilteredModules((prevModules) =>
        prevModules.map((mod) => (mod._id === editingModule._id ? updatedModule : mod))
      );
      alert("Module updated successfully!");
      setEditingModule(null);
    } catch (error) {
      console.error("Error updating module:", error);
      alert("An error occurred while updating the module.");
    }
    setLoadingUpdate(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this module?")) return;
    setLoadingDelete(true);
    try {
      await axios.delete(`/api/modules/deleteModule?id=${id}`);
      setModules((prevModules) => prevModules.filter((mod) => mod._id !== id));
      setFilteredModules((prevModules) => prevModules.filter((mod) => mod._id !== id));
      alert("Module deleted successfully!");
    } catch (error) {
      console.error("Error deleting module:", error);
      alert("Failed to delete module.");
    }
    setLoadingDelete(false);
  };

  // Dynamic search filtering
  useEffect(() => {
    if (!searchTerm) {
      setFilteredModules(modules);
    } else {
      const filtered = modules.filter((mod) =>
        mod.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredModules(filtered);
    }
  }, [searchTerm, modules]);

  return (
    <>
      <Header />
      <div className="p-8 min-h-screen bg-gradient-to-b from-blue-50 via-indigo-100 to-purple-50">

        <h1 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 drop-shadow-md">
          Manage Modules
        </h1>

        {/* Create Module */}
        <div className="bg-white shadow-lg p-6 rounded-xl mb-6 max-w-2xl mx-auto border-l-4 border-blue-500">
          <h2 className="text-xl font-bold mb-4 text-blue-700">Create New Module</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Module Name"
              value={newModule.name}
              onChange={handleInputChange}
              className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
            <textarea
              name="description"
              placeholder="Module Description"
              value={newModule.description}
              onChange={handleInputChange}
              className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
            <input
              id="moduleVideo"
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="border p-2 w-full rounded-md"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-md w-full hover:scale-105 transition-transform"
              disabled={loadingCreate}
            >
              {loadingCreate ? "Uploading..." : "Add Module"}
            </button>
          </form>
        </div>

        {/* Edit Module */}
        {editingModule && (
          <div className="bg-white shadow-lg p-6 rounded-xl mb-6 max-w-2xl mx-auto border-l-4 border-yellow-400">
            <h2 className="text-xl font-bold mb-4 text-yellow-600">Edit Module</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                value={editingModule.name}
                onChange={(e) => setEditingModule({ ...editingModule, name: e.target.value })}
                className="border p-2 w-full rounded-md focus:ring-2 focus:ring-yellow-400 outline-none transition"
              />
              <textarea
                value={editingModule.description}
                onChange={(e) => setEditingModule({ ...editingModule, description: e.target.value })}
                className="border p-2 w-full rounded-md focus:ring-2 focus:ring-yellow-400 outline-none transition"
              />
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setEditingModule({ ...editingModule, newVideo: e.target.files[0] })}
                className="border p-2 w-full rounded-md"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-md w-full hover:scale-105 transition-transform"
                disabled={loadingUpdate}
              >
                {loadingUpdate ? "Updating..." : "Update Module"}
              </button>
            </form>
          </div>
        )}

        {/* List Modules */}
        <h2 className="text-2xl font-bold mb-2 text-center text-indigo-700">Existing Modules</h2>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-6">
          <input
            type="text"
            placeholder="Search modules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-2 border-indigo-400 p-2 w-full rounded-md focus:ring-2 focus:ring-indigo-500 outline-none transition shadow-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {filteredModules.length > 0 ? (
            filteredModules.map((mod, idx) => (
              <div
                key={mod._id}
                className={`p-4 rounded-xl shadow-md transition-transform transform hover:scale-105 hover:shadow-xl border-l-4 ${
                  idx % 2 === 0
                    ? "border-blue-400 bg-gradient-to-br from-white via-indigo-50 to-white"
                    : "border-purple-400 bg-gradient-to-br from-white via-purple-50 to-white"
                } animate-fadeIn`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <h3 className="text-lg font-semibold mb-2">{mod.name}</h3>
                <video controls className="w-full rounded-md mt-2 shadow-md">
                  <source src={mod.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="flex space-x-3 mt-4">
                  <button
                    onClick={() => setEditingModule(mod)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md flex items-center gap-2 hover:scale-110 transition-transform"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(mod._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md flex items-center gap-2 hover:scale-110 transition-transform"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-2 text-gray-500 mt-6">No records found.</p>
          )}
        </div>

      </div>

      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s forwards;
        }
      `}</style>
    </>
  );
};

export default TeacherModules;
