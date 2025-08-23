import React from "react";
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen p-12 flex flex-col md:flex-row items-center justify-center font-serif">
      {/* Left side content */}
      <div className="flex-1 flex flex-col justify-center items-start p-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
      </div>

      {/* Right side content */}
      <div className="flex-1 flex flex-col items-start p-8 space-y-8">
        <div className="text-lg">
          <p className="mb-4">
            Lost or found something on campus? Need help with filing or tracking a report? You can always reach out—we're here to assist you.
          </p>
          <p>
            Whether you're posting a new item, claiming a matched one, or checking your report's status, feel free to contact us for updates or instructions. We're committed to providing clear guidance and timely support.
          </p>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <Mail className="text-xl" />
            <a href="mailto:ClaimMe.lostfound@email.com" className="hover:underline">ClaimMe.lostfound@email.com</a>
          </div>
          <div className="flex items-center space-x-4">
            <Phone className="text-xl" />
            <span>(+63) 9XX XXX XXXX</span>
          </div>
          <div className="flex items-center space-x-4">
            <MapPin className="text-xl" />
            <span>USTP - CDO Guard House</span>
          </div>
          <div className="flex items-center space-x-4">
            <Clock className="text-xl" />
            <span>Monday to Friday, 8:00 AM – 5:00 PM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
