import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CursorOverlay = () => {
  const cursorRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const inner = innerRef.current;

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        ease: 'power2.out',
        duration: 0.3,
        overwrite: 'auto',
      });
    };

    const handleHover = (e) => {
      const tag = e.target.tagName.toLowerCase();
      if (tag === 'img' || tag === 'video' || tag ==='span' || tag ==='h1' || tag == 'button') {
        // X-ray effect on hover
        gsap.to(inner, {
          opacity: 0.85,
          background:
            'radial-gradient(circle at center, #b0f3ff 0%, #e0e7ef 40%, #b0f3ff 100%)',
          filter:
            'grayscale(1) contrast(200%) brightness(1.3) drop-shadow(0 0 20px #b0f3ff) invert(0.2)',
          boxShadow: '0 0 30px 10px rgba(176, 243, 255, 0.5)',
          duration: 0.6,
          ease: 'power2.out',
        });
      } else {
        // Reset to normal
        gsap.to(inner, {
          opacity: 0.1,
          background: 'white',
          filter: 'none',
          boxShadow: 'none',
          duration: 0.5,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        pointerEvents: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1111111111,
        width: 100,
        height: 100,
        borderRadius: '50%',
        overflow: 'hidden',
        border: '2px solid white',
        mixBlendMode: 'difference',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(255,255,255,0.05)',
        backdropFilter: 'none',
      }}
    >
      <div
        ref={innerRef}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          opacity: 0.1,
          borderRadius: '50%',
          transition: 'background 0.6s ease, opacity 0.6s ease, filter 0.6s ease',
        }}
      />
    </div>
  );
};

export default CursorOverlay;
