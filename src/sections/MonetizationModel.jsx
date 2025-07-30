import React from 'react'
import InfiniteScroll from '../components/InfiniteScroll';

const items = [
  {
    content: (
      <div>
        <div className="text-2xl font-bold mb-2">Subscription Tiers</div>
        <div className="text-base text-gray-700">
          Free, Pro, Enterprise, Team (pricing based on size/region)
        </div>
      </div>
    ),
  },
  {
    content: (
      <div>
        <div className="text-2xl font-bold mb-2">Equity-Based Access</div>
        <div className="text-base text-gray-700">
          Founders can pay via equity for premium tools
        </div>
      </div>
    ),
  },
  {
    content: (
      <div>
        <div className="text-2xl font-bold mb-2">Premium Features</div>
        <div className="text-base text-gray-700">
          Advanced analytics, AI features, and customization options
        </div>
      </div>
    ),
  },
  {
    content: (
      <div>
        <div className="text-2xl font-bold mb-2">Investor USPs & Pitch Lines</div>
        <ul className="list-disc pl-5 text-base text-gray-700 space-y-2">
          <li>
            <b>AI-Powered Work Ecosystem:</b> A hybrid of Notion, Slack, and Wellfound—custom-tailored for teams and startups.
          </li>
        </ul>
      </div>
    ),
  },
];

const MonetizationModel = () => {
  return (
    <div className='w-full h-screen'>
      <div className="mb-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 ">
          Business &amp; Monetization Model
        </h2>
      </div>
      <div style={{height: '500px', position: 'relative'}}>
        <InfiniteScroll
          items={items}
          isTilted={true}
          tiltDirection='left'
          autoplay={true}
          autoplaySpeed={0.5}
          autoplayDirection="down"
          pauseOnHover={true}
        />
      </div>
    </div>
  )
}

export default MonetizationModel