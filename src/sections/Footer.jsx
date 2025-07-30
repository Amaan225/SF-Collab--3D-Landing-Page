import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const sections = footerRef.current.querySelectorAll('.footer-section');

    sections.forEach((section, index) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, []);

  return (
    <footer ref={footerRef} className="h-screen w-full p-4 flex items-center">
      <div className="flex flex-col md:flex-row md:justify-between h-screen w-full gap-10">
        {/* Column 1: Image + Logo */}
        <div className="footer-section  flex items-center md:w-1/3 w-full">
          <div className="w-full h-[300px] md:h-[60%] rounded-3xl overflow-hidden
          ">
            <img
              src="/IMG-20250630-WA0029~3.jpg"
              className="w-full h-full object-cover"
              alt="footer visual"
            />
          </div>
        </div>

        {/* Column 2: Navigation */}
        <div className="footer-section md:w-1/3 w-full flex items-center justify-end pr-4 ">
          <div className="text-right space-y-6 w-full md:w-[90%]">
            <div className="flex flex-col text-4xl md:text-6xl gap-3 font-semibold">
              <Link className="transition-all hover:text-zinc-400 hover:scale-[1.1]">Home</Link>
              <Link className="transition-all hover:text-zinc-400 hover:scale-[1.1]">About</Link>
              <Link className="transition-all hover:text-zinc-400 hover:scale-[1.1]">StartUps</Link>
              <Link className="transition-all hover:text-zinc-400 hover:scale-[1.1]">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
