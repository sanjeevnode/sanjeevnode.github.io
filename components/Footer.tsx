'use client'
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 dark:text-gray-300">
              © {currentYear} sanjeevnode. All rights reserved.
            </p>
          </div>

          <div>
            <nav className="flex gap-6">
              {['about', 'experience', 'projects', 'education', 'contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors capitalize"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;