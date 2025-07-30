import React, { useRef, useEffect } from 'react';
import ModelViewer from '../components/ModelViewer';

import TrueFocus from '../components/TrueFocus';

const Works = () => {
  const headerTextRef = useRef(null);

  useEffect(() => {
    // Animate header text
    if (headerTextRef.current) {
      const [heading, paragraph] = headerTextRef.current.children;
      heading.style.transform = 'translateY(80px)';
      heading.style.opacity = 0;
      paragraph.style.transform = 'translateY(80px)';
      paragraph.style.opacity = 0;

      setTimeout(() => {
        heading.style.transition = 'all 1s cubic-bezier(0.23, 1, 0.32, 1)';
        heading.style.transform = 'translateY(0)';
        heading.style.opacity = 1;
        paragraph.style.transition = 'all 1s cubic-bezier(0.23, 1, 0.32, 1)';
        paragraph.style.transform = 'translateY(0)';
        paragraph.style.opacity = 1;
      }, 200);
    }
  }, []);

  return (
    <div className="relative w-full min-h-screen space-y-14 font-dm-sans">
      {/* Blur top overlay */}
      <div className="absolute top-0 z-30 w-full h-20 bg-gradient-to-b -mt-[40px] from-[#0f0f0f]/100 to-transparent backdrop-blur-sm" />
      {/* Header section */}
      <div className="w-full flex justify-between relative h-screen">
        {/* 3D Model section */}
        <div className="w-1/2 flex z-10 items-center h-full">
          <ModelViewer />
        </div>
        {/* Text section */}
        <div className="w-1/2 flex items-center justify-start h-full p-3">
          <div className="w-1/2 space-y-6" ref={headerTextRef}>
            <TrueFocus sentence="Our Vision" />
            <p className="text-left text-fg-100 font-thin font-dm-sans ">
            At SFCollab, our vision is to empower dreamers, builders, and innovators by creating a unified platform where ideas turn into impactful ventures. We aim to eliminate the barriers that hold early-stage founders back - whether it’s team building, branding, planning, or execution. By combining smart tools, AI-driven insights, and a collaborative ecosystem, we envision a future where anyone with a spark of an idea can shape the world, regardless of background or resources.
            </p>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Works;
