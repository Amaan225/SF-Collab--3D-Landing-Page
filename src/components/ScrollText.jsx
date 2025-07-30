'use client';
import { useRef, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

const phrase =
  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.";

export default function ScrollText() {
  const refs = useRef([]);
  const body = useRef(null);
  const container = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    createAnimation();
  }, []);

  const createAnimation = () => {
    gsap.to(refs.current, {
      scrollTrigger: {
        trigger: container.current,
        scrub: true,
        start: 'top 200',
        end: `+=${window.innerHeight / 1.5}`,
      },
      opacity: 1,
      ease: 'none',
      stagger: 0.1,
      marker:true
    });
  };

  const splitWords = (phrase) => {
    let body = [];
    phrase.split(' ').forEach((word, i) => {
      const letters = splitLetters(word);
      body.push(
        <p
          key={word + '_' + i}
          className="text-[clamp(30px,4vw,80px)] mr-[1.2vw] font-bold m-0 whitespace-nowrap leading-tight"
        >
          {letters}
        </p>
      );
    });
    return body;
  };

  const splitLetters = (word) => {
    let letters = [];
    word.split('').forEach((letter, i) => {
      letters.push(
        <span
          key={letter + '_' + i}
          ref={(el) => {
            if (el) refs.current.push(el);
          }}
          className="opacity-20"
        >
          {letter}
        </span>
      );
    });
    return letters;
  };

  return (
    <main
      className="  text-white"
      ref={container}
    >
      {/* Animated Text Section */}
      <section className="flex ">
        <div
          ref={body}
          className="w-full flex flex-wrap  text-[3vw] text-gray-300"
        >
          {splitWords(phrase)}
        </div>
      </section>
    </main>
  );
}
