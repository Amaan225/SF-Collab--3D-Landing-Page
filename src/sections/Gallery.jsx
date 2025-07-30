'use client'

import React, { useRef, useEffect } from 'react'
import ParallaxImage from '../components/ParallaxImage'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import AboutModel from '../components/AboutModel'
import BlurText from '../components/BlurText'

gsap.registerPlugin(ScrollTrigger)

const Gallery = () => {
  const textRefs = useRef([])
  const headerRef = useRef(null)
  const headingRef = useRef(null)
  const paragraphRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    // Header animation
    gsap.fromTo(
      [headingRef.current, paragraphRef.current],
      { autoAlpha: 0, y: 50 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Image/text scroll animation
    textRefs.current.forEach((el) => {
      if (!el) return
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })
  }, [])

  const addToRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el)
    }
  }

  const contentData = [
    {
        title: 'Free software if you cannot afford it',
        text: 'SForger is free for startups that can’t afford it. We believe in empowering entrepreneurs to succeed, regardless of their financial situation.',
        image: '/logogen.jpg',
      },
      {
        title: ' Investor ready environment with 3 cryptocurrency tokens',
        text: 'SForger provides a comprehensive platform for startups to connect with investors. With three cryptocurrency tokens, we create a secure and efficient environment for fundraising and investment.',
        image: '/invest.jpg',
      },
      {
        title: 'AI automate and succeed',
        text: ' SForger leverages AI to automate tasks and streamline processes, allowing startups to focus on what matters most: building their business and achieving success.',
        image: '/connect.jpg',
      },
      {
        title: 'Manage & Thrive',
        text: ' Lead with SFManagers. Assign taks, communicate, and track progress for seamless success with SForger',
        image: '/flag.jpg',
      },
  ]

  return (
    <div className="min-h-screen w-full flex space-y-10 flex-col overflow-hidden p-3">
      {/* HEADER SECTION */}
      <div ref={headerRef} className="h-screen flex justify-between items-center w-full">
        <div className="w-1/2 h-full space-y-6 flex flex-col justify-end pb-20">
          <div ref={headingRef} className="text-7xl font-medium">
            <BlurText
              text="About Investors"
              delay={150}
              animateBy="words"
              direction="top"
            />
          </div>
          <p ref={paragraphRef} className="font-medium text-lg text-slate-500">
          Connect with high-potential startups aligned with your vision.
          Discover, evaluate, and invest - all in one collaborative space.
          </p>
        </div>
        <div className="w-1/2 h-full flex items-center">
            <AboutModel/>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className='w-[90%] mx-auto'>
        {contentData.map((item, index) => (
          <div key={index} className="h-screen w-full flex items-center justify-center">
            <div
              className={`w-full h-full flex items-center gap-10 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              <div className="w-[500px] h-full rounded-2xl border-2 shadow-indigo-500  border-violet-500 shadow-2xl overflow-hidden">
                <ParallaxImage
                  src={item.image}
                  alt={item.title}
                  className="rounded-xl"
                />
              </div>
              <div
                ref={addToRefs}
                className={`w-[500px] flex flex-col space-y-5 ${
                  index % 2 === 0
                    ? 'text-left items-start'
                    : 'text-right items-end'
                }`}
              >
                <h1
  className="font-medium text-3xl w-full bg-gradient-to-r from-violet-500 to-blue-400 bg-clip-text text-transparent"
>
  {item.title}
</h1>
                <p className="font-medium">{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Gallery
