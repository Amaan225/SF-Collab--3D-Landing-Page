import { useRef, useEffect } from "react";
import { Rocket, Target, Brain } from "lucide-react";
import gsap from "gsap";

const phases = [
  {
    icon: Rocket,
    phase: "PHASE 0",
    title: "MVP – Essential Core",

    gradient: "from-purple-900 to-black-500", // changed gradient to black-to-purple (black replaced with purple-900)
    dot: "bg-white",
    items: [
      "Better UI/UX with smooth transitions",
      "Enhanced scrolling and box expansion",
      "Improved filtering capabilities",
      "Basic chat functionality",
      "Equity access for founders",
      "Security basics",
      "Flexible access options",
    ],
    description:
      "Launch-ready, lean, and powerful. Focus on usability and essential features for early users.",
  },
  {
    icon: Target,
    phase: "PHASE 1",
    title: "Core Functionalities & Monetization",
    gradient: "from-purple-900 to-black-500", // changed gradient to black-to-purple (black replaced with purple-900)
    dot: "bg-white",
    items: [
      "Advanced chat system",
      "Gamified loyalty system",
      "In-app call feature",
      "Team manager integration",
      "Integrated calendar",
      "AI task assignment",
      "Custom triggers",
      "Knowledge base / wiki",
    ],
    description:
      "Focus on engagement, retention, and revenue generation to create a sustainable platform.",
  },
  {
    icon: Brain,
    phase: "PHASE 2",
    title: "Advanced AI Features & Global Expansion",
    gradient: "from-purple-900 to-black-500", // changed gradient to black-to-purple (black replaced with purple-900)
    dot: "bg-white",
    items: [
      "AI chat summaries",
      "Gamification pro mode",
      "AI skill challenges",
      "Virtual whiteboard",
      "Advanced team insights",
      "Auto productivity monitoring",
      "AI-powered recommendations",
      "Randomized startup join",
    ],
    description:
      "AI-powered intelligence, automation, and a dynamic ecosystem for global reach.",
  },
];

export default function Roadmap() {
  const cardRefs = useRef([]);

  useEffect(() => {
    cardRefs.current.forEach((el, i) => {
      if (el) {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 80, scale: 0.95 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1,
            delay: i * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="w-full mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Phased Implementation Plan
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Our carefully planned phases ensure a focused development approach, from essential features to advanced AI capabilities.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {phases.map((phase, idx) => {
            const Icon = phase.icon;
            return (
              <div
                key={phase.phase}
                ref={el => (cardRefs.current[idx] = el)}
                className="bg-transparent border border-violet-600 rounded-xl overflow-hidden opacity-0  shadow-[rgba(88,28,135,0.35)] shadow-2xl hover:shadow-[rgba(88,28,135,0.5)] "
              >
                <div className={`bg-gradient-to-r ${phase.gradient} text-white p-6`}>
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-8 h-8" />
                    <div>
                      <p className="text-sm font-medium opacity-90">{phase.phase}</p>
                      <h2 className="text-xl font-bold">{phase.title}</h2>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-white font-semibold mb-6 leading-relaxed">{phase.description}</p>
                  <ul className="space-y-3">
                    {phase.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className={`w-2 h-2 ${phase.dot} rounded-full mt-2 flex-shrink-0`}></div>
                        <span className="text-slate-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
