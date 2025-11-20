"use client";
import { Link } from "react-router-dom";

export default function ClaimeLanding() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md md:max-w-xl lg:max-w-2xl text-center space-y-8">
        
        {/* Logo Section */}
        <div className="flex justify-center">
          <img
            alt="logo"
            src="/hand.png"
            className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain"
          />
        </div>

        {/* Brand Name */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black tracking-tight">
          ClaiMe
        </h1>

        {/* Tagline Section */}
        <div className="space-y-2">
          <p className="text-lg md:text-xl lg:text-2xl text-gray-800 font-medium">
            Claim what is yours
          </p>
          <p className="text-base md:text-lg lg:text-xl text-gray-600">
            — fast, easy, secure.
          </p>
        </div>

        {/* Call to Action Button */}
        <div className="pt-4">
          <Link
            to="/signin"
            className="bg-black hover:bg-gray-800 text-white px-8 py-3 md:px-10 md:py-4 rounded-full text-base md:text-lg font-medium transition-colors duration-200 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            aria-label="Proceed to start claiming process"
          >
            Proceed
          </Link>
        </div>
      </div>
    </div>
  );
}
