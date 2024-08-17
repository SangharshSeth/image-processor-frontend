// src/components/ElegantFooter.tsx
import * as React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="font-inter border-t py-4">
      <div className="container mx-auto text-center">
        <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
        <div className="flex justify-center space-x-4 mb-6">
          <a href="#" className=" hover:text-green-300 transition duration-300">
            <FaFacebookF size={20} />
          </a>
          <a href="#" className=" hover:text-green-300 transition duration-300">
            <FaTwitter size={20} />
          </a>
          <a href="#" className=" hover:text-green-300 transition duration-300">
            <FaInstagram size={20} />
          </a>
          <a href="#" className=" hover:text-green-300 transition duration-300">
            <FaLinkedinIn size={20} />
          </a>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} Emage Inc - All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
