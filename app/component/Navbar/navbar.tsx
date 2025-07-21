"use client"
import React, { useState, useEffect } from 'react';

import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Coaches', id: 'coaches' },
    { label: 'Programs', id: 'programs' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0  z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold hidden lg:block text-emerald-400 cursor-pointer "
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            CK SOCCER
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-white hover:text-emerald-400 transition-colors duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>

       
          {/* <button
            className="md:hidden text-white hover:text-emerald-400 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button> */}
        </div>

        {/* Mobile Navigation */}
        {/* {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-white hover:text-emerald-400 transition-colors duration-200 font-medium text-left"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )} */}
      </nav>
    </header>
  );
};

export default Header;