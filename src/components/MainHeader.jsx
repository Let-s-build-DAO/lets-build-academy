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
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-sm border-b border-gray/10 shadow-sm" 
            : "bg-transparent"
        }`}
      >
        <div className="content mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <img 
                src="/logo-1.png" 
                className="h-14 w-auto" 
                alt="Let's Build Academy" 
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-medium transition-colors hover:text-purple`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA Button */}
            <Link href="/auth" className="hidden lg:block">
              <button className="bg-purple text-white px-6 py-3 rounded-full font-medium hover:bg-purple/90 transition-all duration-200 hover:scale-105">
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

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed top-20 left-0 right-0 z-50 bg-white border-b border-gray/10 shadow-xl lg:hidden">
            <nav className="px-6 py-8 space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-lg font-medium text-gray hover:text-purple transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link className="mt-4" href="/auth" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full bg-purple text-white py-3 rounded-full font-medium hover:bg-purple/90 transition-colors">
                  Start Learning
                </button>
              </Link>
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default MainHeader;
