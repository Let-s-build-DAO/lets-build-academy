"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const MainHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "mailto:hello@lbdao.xyz", label: "Contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
          isScrolled 
            ? "bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm py-2" 
            : "bg-transparent py-4"
        }`}
      >
        <div className="mx-auto px-6 lg:px-[7%]" style={{ maxWidth: '1440px' }}>
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <img 
                src="/logo-1.png" 
                className="h-10 w-auto" 
                alt="Let's Build Academy" 
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-semibold text-gray-600 transition-colors hover:text-purple text-[15px] tracking-wide`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA Button */}
            <Link href="/auth" className="hidden lg:block">
              <button className="bg-purple text-white px-7 py-2.5 rounded-full font-bold hover:bg-purple/90 transition-all duration-200 hover:shadow-[0_4px_12px_rgba(64,25,108,0.25)] hover:-translate-y-0.5 text-sm uppercase tracking-wider">
                Start Learning
              </button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray hover:text-purple transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay & Drawer */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />
      
      <div 
        className={`fixed top-0 left-0 bottom-0 w-[280px] sm:w-[320px] bg-white z-50 shadow-2xl lg:hidden transform transition-transform duration-300 ease-in-out flex flex-col ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <img src="/logo-1.png" className="h-8 w-auto" alt="Let's Build Academy" />
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="p-2 text-gray-500 hover:text-purple transition-colors bg-gray-50 rounded-full"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 px-6 py-8 space-y-6 overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="block text-lg font-semibold text-gray-800 hover:text-purple transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-6 border-t border-gray-100">
            <Link className="block w-full" href="/auth" onClick={() => setIsMenuOpen(false)}>
              <button className="w-full bg-purple text-white py-3.5 rounded-full font-bold hover:bg-purple/90 transition-colors shadow-md">
                Start Learning
              </button>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default MainHeader;
