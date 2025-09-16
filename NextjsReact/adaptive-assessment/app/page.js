import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 text-center p-6">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-4 animate-pulse">
        🚀 Page Moved!
      </h1>
      <p className="text-lg text-gray-800 mb-6">
        This page has been moved. You can find it at:
      </p>
      <Link
        href="/dashboard"
        className="bg-blue-600 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg transition duration-300"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
