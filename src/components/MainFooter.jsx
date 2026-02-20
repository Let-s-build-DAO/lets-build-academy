/* eslint-disable @next/next/no-img-element */
import React from 'react';
import CommunitySection from './CommunitySection';
import Link from 'next/link';

const linkClass = 'text-gray-600 hover:text-purple transition-colors';

const MainFooter = () => {
  return (
    <>
      <CommunitySection />
      <footer className="text-gray-800 border-t border-gray-100 bg-white">
        <div className="mx-auto px-6 py-12 lg:py-14 lg:px-[7%]" style={{ maxWidth: '1440px' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {/* Logo */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link href="/" className="inline-block mb-4">
                <img className="w-36 h-auto" src="/logo-1.png" alt="Academy Logo" />
              </Link>
              <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
                Empowering builders through self-paced learning.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-purple mb-4">
                Quick Links
              </h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/" className={linkClass}>Home</Link></li>
                <li><Link href="/about" className={linkClass}>About Us</Link></li>
                <li><Link href="/courses" className={linkClass}>Courses</Link></li>
                <li><a href="mailto:hello@lbdao.xyz" className={linkClass}>Contact Us</a></li>
              </ul>
            </div>

            {/* Learn More */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-purple mb-4">
                Learn More
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="https://www.lbdao.xyz/" target="_blank" rel="noopener noreferrer" className={linkClass}>
                    Let&apos;s Build DAO
                  </a>
                </li>
                <li>
                  <a href="https://www.labs.lbdao.xyz/" target="_blank" rel="noopener noreferrer" className={linkClass}>
                    The Team
                  </a>
                </li>
                <li>
                  <a href="https://www.events.lbdao.xyz/" target="_blank" rel="noopener noreferrer" className={linkClass}>
                    Events
                  </a>
                </li>
                <li>
                  <a href="https://discord.com/invite/M9jx85nJkN" target="_blank" rel="noopener noreferrer" className={linkClass}>
                    Join the Community
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-purple mb-4">
                Connect with Us
              </h3>
              <div className="flex flex-wrap gap-4">
                <a href="https://web.facebook.com/profile.php?id=61575270601827" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-purple transition-colors" aria-label="Facebook">
                  <img className="w-6 h-6" src="/images/icons/facebook-square.png" alt="" />
                </a>
                <a href="https://www.instagram.com/letsbuilddao/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-purple transition-colors" aria-label="Instagram">
                  <img className="w-6 h-6" src="/images/icons/instagram.png" alt="" />
                </a>
                <a href="https://x.com/letsbuild_dao" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-purple transition-colors" aria-label="X (Twitter)">
                  <img className="w-6 h-6" src="/images/icons/twitter-square.png" alt="" />
                </a>
                <a href="https://www.youtube.com/@letsbuilddao" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-purple transition-colors" aria-label="YouTube">
                  <img className="w-6 h-6" src="/images/icons/youtube-square.png" alt="" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-10 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} LB Labs. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default MainFooter;