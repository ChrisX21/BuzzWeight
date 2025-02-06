import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t w-full mt-auto">
      <div className="container mx-auto px-6 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8 text-center md:text-left">
          <div>
            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-3 md:mb-4">
              Company
            </h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-3 md:mb-4">
              Resources
            </h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 md:pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            © 2024 Web and Measurement Systems by Kristiyan Aleksiev. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
