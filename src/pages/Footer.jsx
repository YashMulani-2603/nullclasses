import React from "react";
// import logo from "../assets/logo.png"
import { FaGithub } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
const Footer = () => {
  return (
    <div>
      <footer className="bg-[#1A1D2B]">
        <div className="container mx-auto p-0 md:p-8 xl:px-0">
          <div className="mx-auto max-w-7xl px-6 pb-10 pt-16">
            <div className="xl:grid xl:grid-cols-3 xl:gap-8">
              <div className="space-y-4">
                <div>
                  <a href="/">                        
                    <div className="flex items-center space-x-2 text-2xl font-medium ">
                      {/* <span>
                        <img
                          src={logo}
                          alt="Logo"
                         
                          className="w-30 rounded"
                        />
                      </span> */}
                    
                    </div>
                  </a>
                </div>
                <div className="max-w-md pr-16 text-md text-gray-200">
             Trade Smarter. Earn Bigger. Stay ahead with real-time insights, refine your strategies, and maximize your returns effortlessly.


                </div>
                <div className="flex space-x-5">
                  <a
                    href="https://www.linkedin.com/in/yash-mulani26/"
                    target="_blank"
                    className="text-gray-200 hover:text-gray-200"
                  >
                    <span className="sr-only">Linkedin</span>
                    <IoLogoLinkedin size={30}/>
                  </a>
                  <a
                    href="https://github.com/YashMulani-2603"
                    target="_blank"
                    className="text-gray-200 hover:text-gray-200"
                  >
                    <span className="sr-only">GitHub</span>
                   <FaGithub size={30}/>
                  </a>
                </div>
              </div>
              <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                <div className="md:grid md:grid-cols-2 md:gap-8">
                  <div>
                    <h3 className="text-md font-semibold leading-6 text-white">
                      Home
                    </h3>
                    <ul className="mt-6 space-y-4">
                      <li>
                        <a
                          href="/"
                          className="text-md leading-6 text-gray-300 hover:text-gray-50"
                        >
                          NewsUpdate
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          className="text-md leading-6 text-gray-300 hover:text-gray-50"
                        >
                          MultiAssetChart
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          className="text-md leading-6 text-gray-300 hover:text-gray-50"
                        >
                          StockWatchList
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-10 md:mt-0">
                    <h3 className="text-md font-semibold leading-6 text-white">
                      Use Cases
                    </h3>
                    <ul className="mt-6 space-y-4">
                      <li>
                        <a
                          href="/insighthub"
                          className="text-md leading-6 text-gray-300 hover:text-gray-50"
                        >
                          Sentiment Analysis
                        </a>
                      </li>
                      <li>
                        <a
                          href="/insighthub"
                          className="text-md leading-6 text-gray-300 hover:text-gray-50"
                        >
                          Insights
                        </a>
                      </li>
                      <li>
                        <a
                          href="/candlescan"
                          className="text-md leading-6 text-gray-300 hover:text-gray-50"
                        >
                          Analyzer
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="md:grid md:grid-cols-2 md:gap-8">
                  <div>
                    <h3 className="text-md font-semibold leading-6 text-white">
                      Resources
                    </h3>
                    <ul className="mt-6 space-y-4">
                      <li>
                        <a
                          href="/pricing"
                          className="text-md leading-6 text-gray-300 hover:text-gray-50"
                        >
                          Pricing
                        </a>
                      </li>
                      
                      
                      <li>
                        <a
                          href="/terms"
                          className="text-md leading-6 text-gray-300 hover:text-gray-50"
                        >
                          Terms of Service
                        </a>
                      </li>
                      <li>
                        <a
                          href="/privacy"
                          className="text-md leading-6 text-gray-300 hover:text-gray-50"
                        >
                          Privacy Policy
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-10 md:mt-0">
                    <h3 className="text-md font-semibold leading-6 text-white">
                      Company
                    </h3>
                    <ul className="mt-6 space-y-4">
                      <li>
                        <a
                          href="/dashboard"
                          className="text-md leading-6 text-gray-300 hover:text-gray-50"
                        >
                          Overview
                        </a>
                      </li>
                      <li>
                        <a
                          href="/about"
                          className="text-md leading-6 text-gray-300 hover:text-gray-50"
                        >
                          About Us
                        </a>
                      </li>
                      <li>
                        <a
                          href="/contactus"
                          className="text-md leading-6 text-gray-300 hover:text-gray-50"
                        >
                          Contact Us
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-16 border-t border-gray-400/30 pt-8 sm:mt-20 lg:mt-24">
              <div className="text-md text-center text-white">
                Copyright © 2025 . Created by Yash Mulani
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
