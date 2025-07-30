import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const popupRef = useRef(null);
  const videoRef = useRef(null); // Ref for popup video

  useEffect(() => {
    // Scroll-based image scale
    gsap.to(imageRef.current, {
      scale: 1.2,
      scrollTrigger: {
        trigger: imageRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Entry animation for content
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.3,
      }
    );
  }, []);

  const openPopup = () => {
    gsap.set(popupRef.current, { display: 'flex' });
    gsap.fromTo(
      popupRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'power3.out',
        onComplete: () => {
          // Play video on open
          if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
          }
        },
      }
    );
  };

  const closePopup = () => {
    gsap.to(popupRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.4,
      ease: 'power3.in',
      onComplete: () => {
        gsap.set(popupRef.current, { display: 'none' });

        // Stop and reset video
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      },
    });
  };

  return (
    <section className="relative flex h-screen w-full">
      {/* Content */}
      <div
        ref={contentRef}
        className="h-screen w-full flex flex-col items-center justify-center z-20"
      >
        <div className="w-full h-1/2 flex items-end justify-center">
        <h1 className="text-[10vw] uppercase mix-blend-overlay font-medium -mt-[40px] bg-gradient-to-r from-purple-700 to to-blue-400 transparent bg-clip-text text-transparent">
Sf
</h1>
<h1 className="text-[10vw] uppercase mix-blend-overlay font-light -mt-[40px]">
collab
</h1>
        </div>

        <div className="w-full flex justify-end items-end p-8 h-1/2">
         

          {/* About Us card */}
          <div className="w-[250px] flex justify-between h-[100px] bg-[#0f0f0f] rounded-xl">
            <div className="w-[60%] h-full p-2 rounded-xl">
              <video
                src="/sfcvidd.mp4"
                className="w-full h-full rounded-xl object-cover"
                autoPlay
                muted
                loop
              ></video>
            </div>
            <div className="flex flex-col justify-center gap-2 w-[40%]">
              <span className="text-white">Discover Us</span>
              <button
                className="p-2 bg-white flex w-10 rounded-full"
                onClick={openPopup}
              >
                <Play color="black" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Background video with scroll scaling */}
      <div className="absolute w-full h-screen overflow-hidden border-b border-b-[#0F0F0F]">
        <video
          ref={imageRef}
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        >
          <source src="856857-hd_2048_1080_30fps.mp4" />
        </video>
      </div>

      {/* Bottom Blur */}
      <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-[#0f0f0f]/50 to-transparent backdrop-blur-sm"></div>

      {/* Always-mounted Popup */}
      <div
        ref={popupRef}
        style={{ display: 'none' }}
        className="fixed top-0 left-0 w-full h-screen bg-black/80 items-center justify-center z-50"
      >
        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg">
          <video
            ref={videoRef}
            src="/main.mp4"
            className="w-full h-full object-cover"
            loop
            controls
          ></video>

          <button
            className="absolute top-4 right-4 bg-[#0f0f0f] rounded-full p-2"
            onClick={closePopup}
          >
            <X className="text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
