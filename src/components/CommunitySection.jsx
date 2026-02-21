/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Mail, Phone, MessageSquare } from 'lucide-react';

const CommunitySection = () => {
  return (
    <div className='bg-purple relative py-20 lg:py-24 flex items-center justify-center overflow-hidden'>
      <img className='absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none' src="/pattern.png" alt="" />
      
      <div className='relative z-10 max-w-6xl w-full px-6 lg:px-12'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
          
          {/* Join Community Column */}
          <div className='text-white space-y-6 text-center lg:text-left'>
            <div className='inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20 backdrop-blur-sm shadow-sm'>
               <span className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></span>
               Connect With Us
            </div>
            
            <h2 className='text-4xl md:text-5xl font-black leading-tight'>
              Join Our Global<br className="hidden lg:block" /> Community
            </h2>
            
            <p className='text-lg text-white/80 leading-relaxed max-w-md mx-auto lg:mx-0'>
              Ready to take the first step toward an exciting tech career? Join thousands of builders, share ideas, and start your journey today.
            </p>
            
            <div className='flex justify-center lg:justify-start flex-wrap gap-4 pt-4'>
              <a href="https://discord.gg/M9jx85nJkN" target="_blank" rel="noopener noreferrer" className='flex items-center gap-2 bg-white text-purple font-bold rounded-xl px-6 py-4 hover:shadow-lg hover:-translate-y-1 transition-all'>
                <MessageSquare size={20} />
                Join Discord
              </a>
              <a href="https://t.me/lbdaocommunity" target="_blank" rel="noopener noreferrer" className='flex items-center gap-2 bg-white/10 text-white font-bold rounded-xl px-6 py-4 border border-white/20 hover:bg-white/20 hover:-translate-y-1 transition-all backdrop-blur-sm'>
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                Join Telegram
              </a>
            </div>
          </div>

          {/* Contact Us Column */}
          <div className='bg-white rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden'>
             <div className="absolute top-0 right-0 w-48 h-48 bg-purple/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
             
             <h3 className='text-2xl font-black text-gray-900 mb-8'>Get in Touch</h3>
             
             <div className='space-y-4 relative z-10'>
                {/* General Inquiries */}
                <div className='flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group'>
                   <div className='w-12 h-12 bg-purple/10 text-purple rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform'>
                     <Mail size={24} />
                   </div>
                   <div className='min-w-0'>
                      <h4 className='font-bold text-gray-900 mb-0.5'>General Inquiries</h4>
                      <a href="mailto:hello@lbdao.xyz" className='text-gray-600 hover:text-purple transition-colors font-medium text-sm md:text-base truncate block'>hello@lbdao.xyz</a>
                   </div>
                </div>

                {/* Direct Contact */}
                <div className='flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group'>
                   <div className='w-12 h-12 bg-purple/10 text-purple rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform'>
                     <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                   </div>
                   <div className='min-w-0'>
                      <h4 className='font-bold text-gray-900 mb-0.5'>Direct Contact</h4>
                      <a href="mailto:adams@lbdao.xyz" className='text-gray-600 hover:text-purple transition-colors font-medium text-sm md:text-base truncate block'>adams@lbdao.xyz</a>
                   </div>
                </div>

                {/* Phone */}
                <div className='flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group'>
                   <div className='w-12 h-12 bg-purple/10 text-purple rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform'>
                     <Phone size={24} />
                   </div>
                   <div className='min-w-0'>
                      <h4 className='font-bold text-gray-900 mb-0.5'>Phone</h4>
                      <a href="tel:+2349050811584" className='text-gray-600 hover:text-purple transition-colors font-medium text-sm md:text-base truncate block'>+234 905 081 1584</a>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CommunitySection;