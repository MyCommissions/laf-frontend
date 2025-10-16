import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react"; // ⚠️ Lucide icon import

export default function NotFoundPage() {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Top red half */}
      <div className="absolute top-0 left-0 w-full h-[30vh] bg-[#F80B02] z-0" />

      {/* Bottom white half */}
      <div className="absolute bottom-0 left-0 w-full h-[70vh] bg-white z-0" />

      {/* Page Not Found Box */}
      <div className="relative z-10 flex flex-col items-center justify-center bg-white text-center p-12 border border-gray-200 rounded-3xl shadow-2xl max-w-lg">
        {/* Icon */}
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6 shadow-inner">
          <AlertTriangle size={48} className="text-[#F80B02]" />
        </div>

        {/* Text Section */}
        <h1 className="text-6xl font-extrabold text-[#F80B02] mb-3">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-500 mb-8 max-w-md">
          Sorry, the page you are looking for doesn't exist or has been moved to
          another location.
        </p>

        {/* Button */}
        <Link
          to="/home"
          className="inline-block px-8 py-3 bg-[#F80B02] text-white font-semibold rounded-full shadow-md hover:bg-[#d10902] transition-all duration-200"
        >
          Go Back to Home
        </Link>
      </div>

      {/* Subtle floating icon in background */}
      <AlertTriangle
        size={200}
        className="absolute text-red-200 opacity-20 bottom-20 right-20 rotate-12"
      />
    </div>
  );
}
