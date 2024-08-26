// src/components/Footer.js
import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="container mx-auto text-center">
        <p className="mb-2">
          &copy; {new Date().getFullYear()} Interactive Storytelling Platform.
          All rights reserved.
        </p>
        <div className="space-x-4 mb-2">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a
            href="https://github.com/eshansaif/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            GitHub
          </a>
        </div>
        <p className="text-sm text-gray-400">
          Designed and developed with ❤️ by Md. Shanjeed Saif
        </p>
      </div>
    </footer>
  );
}

export default Footer;
