import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import { setupMarqueeAnimation } from './marquee'
import './vertical.css'
import BlurText from '../BlurText'

gsap.registerPlugin(ScrollTrigger)

const cards = [
  {
    title: "Logo / Image Generator",
    description: `Instantly generate stunning logos and visuals with AI.
Bring your brand to life in just a few clicks.`,
    image: "/pexels-nickoloui-2473183.jpg"
  },
  {
    title: " Data Scraper",
    description: `Extract real-time business insights from across the web.
Turn raw data into smarter decisions effortlessly.`,
    color: '',
    image: "/pexels-alberto-salum-1784034021-28626097.jpg"
  },
  {
    title: "Business Plan + Pitch Deck Generator",
    description: `Craft investor-ready business plans and pitch decks in minutes.
Powered by AI to help you impress and secure funding fast.`,
    color: '',
    image: "/pexels-rdne-7414214.jpg"
  },
  {
    title: "Automatic Timezone Converter",
    description: `Effortlessly sync meetings across global time zones.
No math, no confusion -just perfect timing.`,
    image: "/pexels-padrinan-745365.jpg"
  }
]

function Vertical() {
  const cardsRef = useRef([])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2
    })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    const titles = gsap.utils.toArray('.card-title h1')
    titles.forEach((title) => {
      const text = title.textContent
      title.innerHTML = text.split('').map(char => 
        `<span class="char"><span>${char}</span></span>`
      ).join('')
    })

    const introCard = cardsRef.current[0]
    const cardImgWrapper = introCard.querySelector('.card-img')
    const cardImg = introCard.querySelector('.card-img img')
    gsap.set(cardImgWrapper, { scale: 0.5, borderRadius: '400px' })
    gsap.set(cardImg, { scale: 1.5 })

    const animateContentIn = (titleChars, description) => {
      gsap.to(titleChars, { x: '0%', duration: 0.75, ease: 'power4.out' })
      gsap.to(description, {
        x: 0,
        opacity: 1,
        duration: 0.75,
        delay: 0.1,
        ease: 'power4.out'
      })
    }

    const animateContentOut = (titleChars, description) => {
      gsap.to(titleChars, { x: '100%', duration: 0.5, ease: 'power4.out' })
      gsap.to(description, {
        x: '40px',
        opacity: 0,
        duration: 0.5,
        delay: 0.5,
        ease: 'power4.out'
      })
    }

    const marquee = introCard.querySelector('.card-marquee .marquee')
    const titleChars = introCard.querySelectorAll('.char span')
    const description = introCard.querySelector('.card-description')

    ScrollTrigger.create({
      trigger: introCard,
      start: 'top top',
      end: '+=300vh',
      onUpdate: (self) => {
        const progress = self.progress
        const direction = self.direction
        
        const imgScale = gsap.utils.clamp(0.5, 1.5, 0.5 + progress)
        const borderRadius = gsap.utils.clamp(25, 400, 400 - progress * 375)
        const innerImgScale = gsap.utils.clamp(1, 1.5, 1.5 - progress * 0.5)

        gsap.to(cardImgWrapper, {
          scale: imgScale,
          borderRadius: borderRadius + 'px',
          duration: 0.1,
          ease: 'none'
        })

        gsap.to(cardImg, {
          scale: innerImgScale,
          duration: 0.1,
          ease: 'none'
        })

        if (imgScale >= 0.5 && imgScale <= 0.75) {
          const fadeProgress = (imgScale - 0.5) / (0.75 - 0.5)
          gsap.to(marquee, { opacity: 1 - fadeProgress, duration: 0.1, ease: 'none' })
        } else if (imgScale < 0.5) {
          gsap.to(marquee, { opacity: 1, duration: 0.1, ease: 'none' })
        } else if (imgScale > 0.75) {
          gsap.to(marquee, { opacity: 0, duration: 0.1, ease: 'none' })
        }

        if (direction === 1) {
          if (progress >= 1 && !introCard.contentRevealed) {
            introCard.contentRevealed = true
            animateContentIn(titleChars, description)
          }
          if (progress < 1 && introCard.contentRevealed) {
            introCard.contentRevealed = false
            animateContentOut(titleChars, description)
          }
        } else {
          if (progress < 1 && introCard.contentRevealed) {
            introCard.contentRevealed = false
            animateContentOut(titleChars, description)
          }
          if (progress >= 1 && !introCard.contentRevealed) {
            introCard.contentRevealed = true
            animateContentIn(titleChars, description)
          }
        }
      }
    })

    cardsRef.current.forEach((card, index) => {
      const isLastCard = index === cardsRef.current.length - 1
      ScrollTrigger.create({
        trigger: card,
        start: 'top top',
        end: isLastCard ? '+=100vh' : 'top top',
        endTrigger: isLastCard ? null : cardsRef.current[cardsRef.current.length - 1],
        pin: true,
        pinSpacing: isLastCard,
        anticipatePin: 1
      })
    })

    cardsRef.current.forEach((card, index) => {
      if (index < cardsRef.current.length - 1) {
        const cardWrapper = card.querySelector('.card-wrapper')
        ScrollTrigger.create({
          trigger: cardsRef.current[index + 1],
          start: 'top bottom',
          end: 'top top',
          onUpdate: (self) => {
            const progress = self.progress
            gsap.set(cardWrapper, {
              scale: 1 - progress * 0.25,
              opacity: 1 - progress,
            })
          }
        })
      }
    })

    cardsRef.current.forEach((card, index) => {
      if (index > 0) {
        const cardImg = card.querySelector('.card-img img')
        const imgContainer = card.querySelector('.card-img')
        ScrollTrigger.create({
          trigger: card,
          start: 'top bottom',
          end: 'top top',
          onUpdate: (self) => {
            const progress = self.progress
            gsap.set(cardImg, { scale: 2 - progress })
            gsap.set(imgContainer, { borderRadius: 150 - progress * 125 + 'px' })
          }
        })
      }
    })

    cardsRef.current.forEach((card, index) => {
      if (index === 0) return

      const cardDescription = card.querySelector('.card-description')
      const cardTitleChars = card.querySelectorAll('.char span')

      ScrollTrigger.create({
        trigger: card,
        start: 'top top',
        onEnter: () => animateContentIn(cardTitleChars, cardDescription),
        onLeave: () => animateContentOut(cardTitleChars, cardDescription),
        onEnterBack: () => animateContentIn(cardTitleChars, cardDescription),
        onLeaveBack: () => animateContentOut(cardTitleChars, cardDescription)
      })
    })

    setupMarqueeAnimation()

    return () => {
      lenis.destroy()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <main className="vertical-component">
      <section className="intro ">
        <BlurText
              text="All the Power you need is in your Hands"
              delay={150}
              animateBy="words"
              direction="top"
              className='text-6xl'
        />
      </section>

     

      <section className="cards">
        {cards.map((card, index) => (
          <div key={index} className="card" ref={el => cardsRef.current[index] = el}>
            {index === 0 && (
              <div className="card-marquee">
                <div className="marquee">
                  <h1> <span className='text-violet-600'>Powerful</span> Features</h1>
                  <h1><span className='text-violet-600'>Powerful</span> Features</h1>
                  <h1><span className='text-violet-600'>Powerful</span> Features</h1>
                  <h1><span className='text-violet-600'>Powerful</span> Features</h1>
                </div>
              </div>
            )}
            <div className="card-wrapper">
              <div className="card-content">
                <div
                  className={`card-title${index === 1 ? ' dark-title' : ''}`}
                  style={index === 2 ? { color: '#fff' } : index === 1 ? { color: '#27272a' } : undefined}
                >
                  <h1>{card.title}</h1>
                </div>
                <div className="card-description">
                  <p>{card.description}</p>
                </div>
              </div>
              <div className="card-img">
                <img src={card.image} alt={card.title} />
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}

export default Vertical
