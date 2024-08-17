import React from "react";
import { FaCompress } from "react-icons/fa";

const LandingPage: React.FC = () => {
  return (
    <div className="antialiased bg-white font-inter">
      {/* Hero Section */}
      <header className=" text-black h-screen flex items-center">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-12 px-4">
          <div className="text-center md:text-left mb-12 md:mb-0">
            <h1 className="text-5xl font-bold leading-tight mb-4">
              Compress Your Images with{" "}
              <span className="text-green-600">Ease</span>
            </h1>
            <p className="text-lg mb-6">
              Our powerful tool ensures high-quality image compression with
              minimal loss. Boost your website's performance and save storage
              space effortlessly.
            </p>
            <a
              href="process-image"
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
            >
              Get Started
            </a>
          </div>
          <div className="mt-6 md:mt-0">
            <FaCompress className="text-6xl text-green-600 mx-auto" />
          </div>
        </div>
      </header>
    </div>
  );
};

export default LandingPage;
