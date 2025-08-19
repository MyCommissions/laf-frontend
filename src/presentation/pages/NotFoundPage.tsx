import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Top green half */}
      <div className="absolute top-0 left-0 w-full h-[30vh] bg-[#4E944F] z-0" />

      {/* Bottom white half */}
      <div className="absolute bottom-0 left-0 w-full h-[70vh] bg-white z-0" />

      {/* Page Not Found Box */}
      <div className="relative z-10 flex flex-col items-center justify-center bg-gray-50 text-center p-12 border rounded-md shadow-lg">
        <h1 className="text-6xl font-bold text-[#4E944F] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
        <p className="text-gray-500 mb-6">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/home"
          className="inline-block px-6 py-2 bg-[#4E944F] text-white rounded hover:bg-[#3c7e3e] transition"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
}
