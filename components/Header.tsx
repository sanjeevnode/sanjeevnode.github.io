"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

const NAV = ['about', 'experience', 'projects', 'skills', 'education', 'contact'];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${sectionId}`;
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled
      ? 'bg-pf-bg/70 backdrop-blur-xl border-b border-pf-line/10 py-3'
      : 'bg-transparent py-5'
      }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a
          href="/"
          className="font-mono text-base md:text-lg text-pf-text"
          onClick={(e) => {
            if (window.location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          sanjeev<span className="text-pf-accent">@</span>node<span className="text-pf-dim">:~$</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex space-x-7">
            {NAV.map((item, i) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="group text-sm text-pf-dim hover:text-pf-text transition-colors capitalize"
              >
                <span className="font-mono text-pf-accent mr-1.5">0{i + 1}.</span>
                {item}
              </button>
            ))}
          </nav>

          <button
            onClick={toggleDarkMode}
            className="p-2 text-pf-dim hover:text-pf-accent transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 text-pf-dim hover:text-pf-accent transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            className="text-pf-text"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-pf-bg/95 backdrop-blur-xl absolute top-full left-0 w-full border-b border-pf-line/10">
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            {NAV.map((item, i) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="py-2 text-left text-pf-dim hover:text-pf-text transition-colors capitalize"
              >
                <span className="font-mono text-pf-accent mr-2">0{i + 1}.</span>
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
