import React from "react";
import { FaUsers, FaImages, FaCloud } from "react-icons/fa";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <div className="antialiased bg-white font-inter min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-5xl font-bold leading-tight mb-6">
          Compress Your Images with{" "}
          <span className="text-green-600">Ease</span>
        </h1>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Our powerful tool ensures high-quality image compression with
          minimal loss. Boost your website's performance and save storage
          space effortlessly.
        </p>
        <div className="space-x-4 mb-12">
          <Link
            to="process-image"
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
          >
            Get Started
          </Link>
          <Link
            to="/demo"
            className="bg-white text-green-500 border border-green-500 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition duration-300"
          >
            View Demo
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <FaUsers className="text-4xl text-green-600 mx-auto mb-2" />
            <p className="font-bold text-2xl">10,000+</p>
            <p className="text-gray-600">Happy Users</p>
          </div>
          <div className="text-center">
            <FaImages className="text-4xl text-green-600 mx-auto mb-2" />
            <p className="font-bold text-2xl">1M+</p>
            <p className="text-gray-600">Images Processed</p>
          </div>
          <div className="text-center">
            <FaCloud className="text-4xl text-green-600 mx-auto mb-2" />
            <p className="font-bold text-2xl">5TB+</p>
            <p className="text-gray-600">Storage Saved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;