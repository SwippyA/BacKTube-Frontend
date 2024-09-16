import React from "react";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-purple-700 text-white py-6 px-8 overflow-hidden">
      <div className="container mx-auto ml-24 text-center">
        <div className="flex justify-center space-x-4 mb-4">
          <a
            href="https://www.linkedin.com/in/shubhankar-swain-82697924b/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://github.com/SwippyA"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://x.com/Shubhankar4433"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
          >
            <FaTwitter size={24} />
          </a>
        </div>
        <p className="text-sm">© 2024 SHUBHANKAR SWAIN</p>
      </div>
    </div>
  );
}

export default Footer;
