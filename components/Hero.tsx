"use client";
import React, { useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, FileText, ArrowDown } from 'lucide-react';
import Typewriter from 'typewriter-effect';
import gsap from 'gsap';

const Hero: React.FC = () => {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: sessionStorage.getItem('preloaded') ? 0.2 : 2.6 });
      tl.to('.mask-line > *', {
        y: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.12,
      })
        .from('.hero-fade', {
          y: 24,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
        }, '-=0.5');
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="about" className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 bg-pf-bg overflow-hidden">
      {/* ambient glow */}
      <div aria-hidden className="pointer-events-none absolute -top-40 -left-32 w-[600px] h-[600px] rounded-full bg-pf-accent/10 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-48 -right-32 w-[700px] h-[700px] rounded-full bg-pf-accent2/10 blur-[130px]" />

      <div className="container mx-auto px-6 relative">
        <p className="hero-fade font-mono text-pf-accent text-sm md:text-base mb-6">Hi, my name is</p>

        <h1 className="font-display font-semibold uppercase leading-[0.95] tracking-tight text-pf-text text-[13vw] md:text-[9vw]">
          <span className="mask-line block"><span className="block">Sanjeev</span></span>
          <span className="mask-line block"><span className="block">Singh<span className="text-pf-accent">.</span></span></span>
        </h1>

        <div className="hero-fade mt-6 font-display text-xl md:text-3xl text-pf-dim font-light">
          <Typewriter
            options={{
              strings: ['Software Development Engineer', 'Full Stack Developer', 'Tech Enthusiast'],
              autoStart: true,
              loop: true,
              delay: 100,
              deleteSpeed: 80,
            }}
          />
        </div>

        <p className="hero-fade mt-8 max-w-xl text-pf-dim leading-relaxed">
          I build exceptional digital experiences with a focus on clean design and intuitive
          interactions. Passionate about creating beautiful, functional interfaces that solve
          real problems for users.
        </p>

        <div className="hero-fade mt-10 flex flex-wrap gap-4">
          <a
            href="/sanjeev_resume.pdf"
            download
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-pf-accent text-pf-bg font-semibold rounded-md transition-transform duration-300 hover:-translate-y-1"
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
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-pf-line/20 text-pf-text font-semibold rounded-md transition-all duration-300 hover:-translate-y-1 hover:border-pf-accent hover:text-pf-accent"
          >
            <Mail size={18} />
            Contact Me
          </a>
        </div>

        <div className="hero-fade mt-10 flex gap-5">
          <a href="https://github.com/sanjeevnode" target="_blank" rel="noopener noreferrer" className="text-pf-dim hover:text-pf-accent transition-colors" aria-label="GitHub">
            <Github size={22} />
          </a>
          <a href="https://www.linkedin.com/in/sanjeevnode" target="_blank" rel="noopener noreferrer" className="text-pf-dim hover:text-pf-accent transition-colors" aria-label="LinkedIn">
            <Linkedin size={22} />
          </a>
          <a href="mailto:me.sanjeevks@gmail.com" className="text-pf-dim hover:text-pf-accent transition-colors" aria-label="Email">
            <Mail size={22} />
          </a>
        </div>
      </div>

      <div className="hero-fade absolute bottom-8 left-1/2 -translate-x-1/2 text-pf-dim animate-bounce">
        <ArrowDown size={20} />
      </div>
    </section>
  );
};

export default Hero;
