'use client'
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 bg-pf-bg border-t border-pf-line/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-sm text-pf-dim">
            designed &amp; engineered by <span className="text-pf-accent">sanjeevnode</span> · © {currentYear}
          </p>

          <nav className="flex flex-wrap gap-6">
            {['about', 'experience', 'projects', 'skills', 'education', 'contact'].map((item) => (
              <a
                key={item}
                href={`/#${item}`}
                className="link-underline text-sm text-pf-dim hover:text-pf-accent transition-colors capitalize"
                onClick={(e) => {
                  const el = document.getElementById(item);
                  if (el) {
                    e.preventDefault();
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {item}
              </a>
            ))}
            <a
              href="/privacy-and-policy"
              className="text-sm text-pf-dim hover:text-pf-accent transition-colors"
            >
              Privacy Policy
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
