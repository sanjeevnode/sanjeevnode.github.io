"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpCircle, Sun, Moon } from 'lucide-react';
import { NavItems } from '@/app/types/navItems';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (document) {
      setIsDark(document.documentElement.classList.contains('dark'));
    }
  }, []);
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle('dark');
  };

  // Scroll to section when nav link is clicked
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrollPosition > 50
      ? 'bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-800 py-3'
      : 'bg-transparent py-5'
      }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a
          href="#"
          className="text-xl md:text-2xl font-bold tracking-tight transition-colors"
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }}
        >
          <span className="text-black dark:text-white">sanjeevnode</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex space-x-8">
            {['about', 'experience', 'projects', 'education'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors capitalize"
              >
                {item}
              </button>
            ))}
          </nav>

          <button
            onClick={toggleDarkMode}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            className="text-gray-800 dark:text-gray-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 absolute top-full left-0 w-full shadow-md dark:shadow-gray-800">
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            {Object.values(NavItems).map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="py-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors capitalize"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Scroll to top button - show when scrolled down */}
      {scrollPosition > 300 && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-2 bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-full shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUpCircle size={24} />
        </button>
      )}
    </header>
  );
};

export default Header