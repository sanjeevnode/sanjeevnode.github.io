"use client";
import React from 'react';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';
import Image from 'next/image';

const Hero: React.FC = () => {
  return (
    <section id="about" className="min-h-screen flex items-center pt-20 pb-16 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black dark:text-white">
              <span className="block">Hello, I&apos;m</span>
              <span className="block mt-2">Sanjeev Singh</span>
            </h1>

            <h2 className="text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-400">
              Software Development Engineer
            </h2>

            <p className="text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed">
              I build exceptional digital experiences with a focus on clean design and intuitive
              interactions. Passionate about creating beautiful, functional interfaces that solve
              real problems for users.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="/sanjeev_resume.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-black dark:border-white text-black dark:text-white font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
              >
                <FileText size={18} />
                Download CV
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-300"
              >
                <Mail size={18} />
                Contact Me
              </a>
            </div>

            <div className="pt-6 flex gap-5">
              <a href="https://github.com/sanjeevnode" target='_blank' className="text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors" aria-label="GitHub">
                <Github size={22} />
              </a>
              <a href="https://www.linkedin.com/in/sanjeevnode" className="text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin size={22} />
              </a>
              <a href="mailto:me.sanjeevks@gmail.com" className="text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors" aria-label="Email">
                <Mail size={22} />
              </a>
            </div>
          </div>

          <div className="md:col-span-2 order-first md:order-last">
            <div className="aspect-square relative overflow-hidden">
              {/* Placeholder for profile image */}
              {/* <img
                src="/sanjeev-bg.png"
                alt="Profile"
                className="absolute inset-0 w-full h-full object-contain dark:invert"
              /> */}
              <Image
                src="/sanjeev-bg.png"
                alt="Profile"
                fill
                className="absolute inset-0 w-full h-full object-contain dark:invert"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;