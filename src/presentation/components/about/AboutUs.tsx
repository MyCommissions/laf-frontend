import React from "react";

const Vision: React.FC = () => {
  return (
    <div className="bg-[#FEFFF5] text-black w-full md:w-auto p-12 md:p-16 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-center">Vision</h2>
      <p className="text-base md:text-lg text-gray-700 leading-relaxed text-center">
        To create a safe, efficient, and user-friendly campus environment where
        lost items are quickly matched with rightful owners.
      </p>
    </div>
  );
};

const Mission: React.FC = () => {
  return (
    <div className="bg-[#FEFFF5] text-black w-full md:w-auto p-12 md:p-16 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-center">Mission</h2>
      <p className="text-base md:text-lg text-gray-700 leading-relaxed text-center">
        To provide a reliable platform for reporting and claiming lost or found
        items through clear procedures and responsive support.
      </p>
    </div>
  );
};

const AboutUs: React.FC = () => {
  return (
    <div className="bg-[#FEFFF5] text-black min-h-screen p-12 flex flex-col items-center justify-center font-serif">
      {/* Left side content */}
      <div className="flex-1 flex flex-col justify-center items-start p-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
      </div>

      {/* Right side content */}
      <div className="flex-1 flex flex-col items-start p-8 space-y-8">
        <div className="text-lg">
          <p className="mb-4">
            Welcome to the official Lost & Found system—your campus companion
            for recovering misplaced items and posting found ones quickly and
            securely.
          </p>
          <p className="mb-4">
            We’re built to serve students, staff, and visitors with a
            straightforward platform that streamlines reporting, verification,
            and item matching. Whether you left your ID in a classroom or
            discovered a pair of keys near the library, this system ensures
            everything gets the right attention and chance of return.
          </p>
          <p className="mb-4">
            Our process blends digital tools with real-world support from guards
            and admins. Every report is carefully tracked, verified, and
            stored—making sure items go to the right people, with clear
            documentation at every step.
          </p>
        </div>
      </div>
      
      {/* Moved Vision and Mission to a single flex-row container at the bottom */}
      <div className="flex flex-col md:flex-row w-full justify-evenly gap-8 p-8">
        <Vision/>
        <Mission />
      </div>
    </div>
  );
};

export default AboutUs;
