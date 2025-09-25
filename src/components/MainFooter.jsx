/* eslint-disable @next/next/no-img-element */
import React from 'react';
import CommunitySection from './CommunitySection';
import Link from 'next/link';

const MainFooter = () => {
  return (
    <>
      <CommunitySection />
      <footer className="text-gray-800 px-6 py-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo */}
          <div>
            <img className="w-36 mb-4" src="/logo-1.png" alt="Academy Logo" />
            <p className="text-sm text-gray-600">Empowering builders through self-paced learning.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-purple">Quick Links</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/courses">Courses</Link></li>
              <li><Link href="mailto:hello@lbdao.xyz">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 text-purple">Learn More</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="https://www.lbdao.xyz/">Let&apos;s Build DAO</Link></li>
              <li><Link href="https://www.labs.lbdao.xyz/">The Team</Link></li>
              <li><Link href="https://www.events.lbdao.xyz/">Events</Link></li>
              <li><Link href="https://discord.com/invite/M9jx85nJkN">Join the Community</Link></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-purple">Connect with Us</h2>
            <div className="flex space-x-4 justify-between items-center">
              <a href="https://web.facebook.com/profile.php?id=61575270601827"><img className="w-6 h-6" src="/images/icons/facebook-square.png" alt="Facebook" /></a>
              <a href="https://www.instagram.com/letsbuilddao/"><img className="w-6 h-6" src="/images/icons/instagram.png" alt="Instagram" /></a>
              <a href="https://x.com/letsbuild_dao"><img className="w-6 h-6" src="/images/icons/twitter-square.png" alt="Twitter" /></a>
              <a href="https://www.youtube.com/@letsbuilddao"><img className="w-6 h-6" src="/images/icons/youtube-square.png" alt="YouTube" /></a>
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="text-[#E5DEFF] bg-[#030303] rounded-sm mt-6 text-center p-4 text-sm">
          <p>
            Copyright © {new Date().getFullYear()} LB Labs. All rights reserved.
          </p>
        </div>
        {/* <div className='p-3 text-sm border-t border-[#B3B3B4] mt-8 text-center'>Copyright © {new Date().getFullYear()} Let&lsquo;s Build Labs. All rights reserved.</div> */}
      </footer>
    </>
  );
};

export default MainFooter;