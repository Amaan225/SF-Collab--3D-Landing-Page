import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Explore = () => {
  const containerRef = useRef(null);
  const slideshowRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    'https://images.unsplash.com/photo-1750672951646-cad9ca5a6776?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzM3x8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1750967991618-7b64a3025381?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNnx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1750072167202-b54f7a2c6bc7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8',
    'https://images.unsplash.com/photo-1750439889444-dad033c8e825?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D',
  ];

  // ScrollTrigger for bg change
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, {
        backgroundColor: '#000',
        color: '#ffffff',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top +=650',
          end: '+=100%',
          scrub: true,
          markers: false,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Slideshow GSAP animation
  useEffect(() => {
    const slideInterval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;

      const slides = slideshowRef.current.querySelectorAll('.slide');

      gsap.to(slides[currentIndex], {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power2.out',
      });

      gsap.fromTo(
        slides[nextIndex],
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1, ease: 'power2.out' }
      );

      setCurrentIndex(nextIndex);
    }, 4000);

    return () => clearInterval(slideInterval);
  }, [currentIndex]);

  return (
    <div ref={containerRef} className="w-full h-screen pb-20 bg-white text-black relative overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/typo2(2).mp4"
        autoPlay
        loop
        muted
        playsInline
      ></video>
      {/* Overlay for darkening the video if needed */}
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none"></div>
      <div className="relative w-full h-full z-20 flex flex-col justify-between">
        <div className="w-full flex justify-center h-[90%] text-white">
        
          {/* Video section (now just content, video is bg) */}
          <div className="w-[60%] py-2 space-y-3 h-full flex flex-col">
            <div className="w-full h-12 rounded-full bg-[#000] border border-purple-800 shadow-purple-500 shadow-lg flex items-center justify-between">
              <div className="w-[70%] flex items-center justify-between mx-auto">
                <a href="" className=' hover:underline transition-all uppercase font-semibold'>Projects</a>
                {/* <a href="">Explore 3d</a> */}
                <a href="" className=' hover:underline uppercase transition-all font-semibold'>Join StartUp</a>
              </div>
            </div>
            {/* Removed video here, since it's now the background */}
            <div className="w-full h-[80%] rounded-4xl overflow-hidden"></div>
          </div>
        </div>

     
      </div>
    </div>
  );
};

export default Explore;
