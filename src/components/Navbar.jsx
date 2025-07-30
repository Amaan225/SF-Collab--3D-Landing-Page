import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Menu, X, Youtube } from 'lucide-react';
import gsap from 'gsap';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef(null);
  const linksRef = useRef([]);
  const [showExplore, setShowExplore] = useState(true);
  const lastScrollY = useRef(0);

  // Music and animation states/refs
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const barRefs = useRef([]);
  const barTimeline = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Scroll hide/show Explore bars
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScrollY.current) {
        setShowExplore(false); // scrolling down
      } else {
        setShowExplore(true); // scrolling up
      }
      lastScrollY.current = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP overlay and link animations
  useEffect(() => {
    if (isOpen) {
      gsap.set(overlayRef.current, { display: 'flex', pointerEvents: 'auto' });
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power4.inOut' }
      );

      // Animate links from left
      gsap.fromTo(
        linksRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power4.out',
          stagger: 0.1,
          delay: 0.2,
        }
      );

      document.body.style.overflow = 'hidden';
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.4,
        ease: 'power4.inOut',
        onComplete: () => {
          gsap.set(overlayRef.current, {
            display: 'none',
            pointerEvents: 'none',
          });
        },
      });
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  // Toggle music and bars animation
  const toggleMusic = () => {
    if (!isPlaying) {
      // Start music
      if (!audioRef.current) {
        audioRef.current = new Audio('/SpotiDownloader.com - Roi - Instrumental Slowed - Mckyyy.mp3'); // Your audio file path
        audioRef.current.loop = true;
      }
      audioRef.current.play();
      setIsPlaying(true);

      // Start infinite bar animation
      barTimeline.current = gsap.timeline({ repeat: -1, yoyo: true });

      barRefs.current.forEach((bar, index) => {
        const heightUp = index % 2 === 0 ? 25 : 10; // alternate bars height up/down
        const heightDown = 15;

        barTimeline.current.to(
          bar,
          {
            height: `${heightUp}px`,
            duration: 0.5,
            ease: 'power1.inOut',
          },
          0 // all start at the same time
        );
        barTimeline.current.to(
          bar,
          {
            height: `${heightDown}px`,
            duration: 0.5,
            ease: 'power1.inOut',
          },
          0.5 // second half of the timeline
        );
      });
    } else {
      // Stop music
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);

      // Stop bar animation and reset height
      if (barTimeline.current) {
        barTimeline.current.kill();
        barTimeline.current = null;
      }
      barRefs.current.forEach((bar) => {
        gsap.to(bar, { height: '20px', duration: 0.3, ease: 'power1.out' });
      });
    }
  };

  const navlink = [
    { href: '/', name: 'Home' },
    { href: '/', name: 'About' },
    { href: '/', name: 'StartUps' },
  ];

  return (
    <>
      {/* Overlay Menu */}
      <div
        ref={overlayRef}
        className='fixed inset-0 z-[40] hidden bg-[#0f0f0f] text-white items-center justify-center'
        style={{ pointerEvents: 'none' }}
      >
        <div className='w-full h-full flex justify-between p-4'>
          {/* Left Panel */}
          <div className='w-1/2 h-full flex flex-col justify-between py-10'>
          <div className='flex flex-col gap-6 px-8'>
  {navlink.map((link, index) => (
    <Link
      key={index}
      to={link.href}
      ref={(el) => (linksRef.current[index] = el)}
      className='text-7xl hover:text-zinc-400 transition-all'
    >
      {link.name}
    </Link>
  ))}

  {/* ✅ NEW: Get Started Button */}
  <Link
    to="https://sfcolab.vercel.app/"
    target='_blank'
    className='mt-6 inline-block text-lg font-semibold hover:text-white hover:bg-transparent hover:border hover:transition-all hover:ease-in bg-white text-black px-6 py-3 rounded-full transition-all w-fit'
  >
    Get Started
  </Link>
</div>


            <div className='px-8 flex items-center gap-12'>
              <div className='flex gap-2'>
                <a href="#" className='p-2 border border-white rounded-full hover:bg-white hover:text-black transition-all'><Facebook /></a>
                <a href="#" className='p-2 border border-white rounded-full hover:bg-white hover:text-black transition-all'><Instagram /></a>
                <a href="#" className='p-2 border border-white rounded-full hover:bg-white hover:text-black transition-all'><Linkedin /></a>
                <a href="#" className='p-2 border border-white rounded-full hover:bg-white hover:text-black transition-all'><Youtube /></a>
              </div>
              {/* <p className='text-sm max-w-[300px] font-medium'>
                This website is just the concept work <br />
                done by—Aung&Aamman to showcase our capabilities.
              </p> */}
            </div>
          </div>

          {/* Right Panel */}
          <div className='w-1/2 h-full flex items-center justify-end '>
              <div className=' w-[80%] h-full'>
                  <video muted autoPlay loop className='w-full h-full object-cover rounded-2xl'>
                    <source src='/typo2(2).mp4' />
                  </video>
              </div>
          </div>
        </div>
      </div>

      {/* logo top-left */}

      {/* <div className={`fixed top-6 left-6 h-28 flex items-center z-30 ${showExplore ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
  <img
    src="/SFCOLLAB LOGO FULL.svg"
    alt="SF Collab Logo"
    className=" h-full" // Adjust as needed
  />
</div> */}


      {/* Animated Bars in Top-Right Corner */}
      <div
        className={`fixed right-[2%] top-[5%] z-40 flex items-end gap-[4px] transition-all duration-300 ${
          showExplore ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      >
        <div onClick={toggleMusic} className='flex gap-[4px] cursor-pointer select-none'>
          {[0, 1, 2, 3].map((_, i) => (
            <div
              key={i}
              ref={(el) => (barRefs.current[i] = el)}
              className='w-[6px] h-[20px] bg-white rounded-sm'
              style={{ transformOrigin: 'bottom' }}
            />
          ))}
        </div>
      </div>

      {/* Menu Button */}
      <div className='fixed z-50 flex items-end bottom-[0%] left-[50%] -translate-x-1/2 justify-center pointer-events-auto'>
        <button
          onClick={toggleMenu}
          className='flex gap-2 items-center justify-center bg-white px-4 py-3 rounded-full transition-all duration-300 hover:scale-105'
        >
          <span className='text-2xl text-[#0f0f0f] font-[400]'>{isOpen ? 'Close' : 'Menu'}</span>
          <span className='bg-[#2A2725] p-1 rounded-full'>
            {isOpen ? <X className='text-white' /> : <Menu className='text-white' />}
          </span>
        </button>
      </div>
    </>
  );
};

export default Navbar;
