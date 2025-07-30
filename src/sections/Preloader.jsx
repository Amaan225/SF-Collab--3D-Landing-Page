import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
  const counterRef = useRef(null);
  const progressBarRef = useRef(null);
  const preloaderRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    const duration = 3; // seconds

    // Wait until window fully loads (including images/videos)
    const handleLoad = () => {
      setAssetsLoaded(true);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    const tl = gsap.timeline({
      onUpdate: () => {
        const p = Math.floor(tl.progress() * 100);
        setProgress(p);
      },
      onComplete: () => {
        setAnimationDone(true);
      },
    });

    tl.to(counterRef.current, {
      innerText: 100,
      duration,
      snap: { innerText: 1 },
      ease: 'power1.out',
    });

    gsap.to(progressBarRef.current, {
      height: '100%',
      duration,
      ease: 'power1.out',
    });

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  useEffect(() => {
    if (assetsLoaded && animationDone) {
      // Fade out the preloader
      gsap.to(preloaderRef.current, {
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });
    }
  }, [assetsLoaded, animationDone, onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-50 bg-black text-white flex items-center justify-center opacity-100"
    >
      {/* Progress bar on right */}
      <div className="absolute right-5 bottom-5 top-5 w-2 bg-white/20 rounded-full overflow-hidden">
        <div ref={progressBarRef} className="bg-white w-full h-0"></div>
      </div>

      {/* Huge counter bottom-left */}
      <div
        className="absolute bottom-5 left-10 text-9xl font-bold"
        ref={counterRef}
      >
        {progress}
      </div>
    </div>
  );
};

export default Preloader;
