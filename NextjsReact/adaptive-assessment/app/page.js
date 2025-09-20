// "use client";

// import Link from "next/link";
// import Logo from "../components/logo";

// export default function Home() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-purple-200 to-blue-100 text-center p-6 relative overflow-hidden">
//       {/* Original background blobs */}
//       <div className="absolute top-0 left-0 w-40 h-40 bg-blue-300 rounded-full opacity-30 animate-bounce"></div>
//       <div className="absolute bottom-0 right-0 w-52 h-52 bg-pink-300 rounded-full opacity-30 animate-pulse"></div>

//       <div className="relative z-10 max-w-xl flex flex-col items-center">
//         <Logo />
//         <h1 className="text-5xl font-extrabold text-purple-700 mb-6 mt-2 animate-pulse">🌟 Welcome!</h1>
//         <p className="text-xl text-gray-800 mb-4 font-medium">“Believe in yourself, you are capable of amazing things.” 💡</p>
//         <p className="text-lg text-gray-700 mb-8">Let’s begin your journey of learning and growth. Click below to continue.</p>
//         <Link
//           href="/dashboard"
//           className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-bold px-8 py-4 rounded-2xl shadow-lg transition duration-300 transform hover:scale-105"
//         >
//           🚀 Enter Dashboard
//         </Link>
//         <p className="text-md text-gray-600 mt-8 italic animate-pulse">“Every day is a new chance to learn and shine ✨”</p>
//       </div>
//     </div>
//   );
// }

"use client";
import Head from "next/head"; 
import Link from "next/link";
import Logo from "../components/logo";
import Heart from "../components/heart";

export default function Home() {
  return (
    <>
    <Head>
        <title>Ability Nest - Welcome</title> {/* <-- Set your tab title here */}
        <meta name="description" content="Start your learning journey at Ability Nest" />
    </Head>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-purple-200 to-blue-100 text-center p-6 relative overflow-hidden">
      {/* Original background blobs */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-blue-300 rounded-full opacity-30 animate-bounce"></div>
      <div className="absolute bottom-0 right-0 w-52 h-52 bg-pink-300 rounded-full opacity-30 animate-pulse"></div>

      <div className="relative z-10 max-w-xl flex flex-col items-center">
        <Logo />

        {/* Welcome with hearts */}
        <div className="flex items-center justify-center mb-8">
          <Heart className="mr-6" />
          <h1 className="text-5xl font-extrabold text-purple-700 mx-4 animate-pulse">Welcome!</h1>
          <Heart className="ml-6" />
        </div>

        <p className="text-xl text-gray-800 mb-4 font-medium">
          “Believe in yourself, you are capable of amazing things.” 💡
        </p>
        <p className="text-lg text-gray-700 mb-8">
          Let’s begin your journey of learning and growth. Click below to continue.
        </p>

        <Link
          href="/dashboard"
          className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-bold px-8 py-4 rounded-2xl shadow-lg transition duration-300 transform hover:scale-105"
        >
          🚀 Enter Dashboard
        </Link>

        <p className="text-md text-gray-600 mt-8 italic animate-pulse">
          “Every day is a new chance to learn and shine ✨”
        </p>
      </div>
    </div>
    </>
  );
}
