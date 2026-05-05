'use client'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import { Link } from "react-router-dom"

/* ─── Icons (lucide-react) ───────────────────────────────── */
import {
  ArrowRight, ChevronLeft, ChevronRight, MapPin, Phone,
  ShieldCheck, Clock, Award, Star, CheckCircle2, Users, HeartHandshake,
  Handshake, Globe, CheckCircle, BadgeCheck,
  Zap, TrendingDown,
  ArrowUpRight,
  Hotel, Car, Binoculars, Palmtree, Briefcase, MoveRight,
  Quote,
} from 'lucide-react'

/* ════════════════════════════════════════════════════════════
   SHARED TOKENS
═══════════════════════════════════════════════════════════════ */
const GOLD  = '#B8860B'
const GOLD2 = '#D4A017'
const RED   = '#B91C1C'
const DARK  = '#0F172A'
const SLATE = '#475569'
const STONE = '#78716C'
const DARK2 = '#1C1917'

/* ════════════════════════════════════════════════════════════
   SHARED HOOKS
═══════════════════════════════════════════════════════════════ */
function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

function useCountUp(target, duration = 1600, started = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!started) return
    let t0 = null
    const step = (ts) => {
      if (!t0) t0 = ts
      const p = Math.min((ts - t0) / duration, 1)
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target, duration])
  return val
}

function Rule({ color = GOLD, w = 32 }) {
  return <div style={{ width: w, height: 1, background: color, flexShrink: 0 }} />
}

function StarRow({ count = 5, accent }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={12} style={{ fill: accent || GOLD, color: accent || GOLD }} />
      ))}
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   1. HERO SECTION
═══════════════════════════════════════════════════════════════ */
const HERO_SLIDES = [
  {
    id: 0,
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1920&q=90',
    location: 'Paris, France', region: 'Western Europe',
    tag: 'SIGNATURE COLLECTION', eyebrow: 'Curated Experience',
    headline: ['The Art of', 'European', 'Travel'],
    description: 'From the gilded salons of Paris to the sun-drenched Amalfi coast — we orchestrate journeys that transcend the ordinary.',
    accent: GOLD2, accentDim: 'rgba(212,160,23,0.12)',
  },
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920&q=90',
    location: 'Eiffel Tower, Paris', region: 'Île-de-France',
    tag: 'ROMANCE & CULTURE', eyebrow: 'Iconic Destination',
    headline: ['Bonjour,', 'Paris'],
    description: 'Candlelit bistros, world-class museums, and Haussmann boulevards at dusk. Paris is not a destination — it is a state of mind.',
    accent: GOLD, accentDim: 'rgba(184,134,11,0.12)',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=1920&q=90',
    location: 'London, England', region: 'United Kingdom',
    tag: 'ROYAL HERITAGE', eyebrow: 'Premium Experience',
    headline: ['Royal', 'London,', 'Reimagined'],
    description: 'Private tours of royal palaces, Michelin-starred dining in Mayfair, and bespoke theatre evenings — London on your terms.',
    accent: GOLD2, accentDim: 'rgba(212,160,23,0.12)',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1920&q=90',
    location: 'Swiss Alps, Switzerland', region: 'Central Europe',
    tag: 'ALPINE LUXURY', eyebrow: 'Adventure & Wellness',
    headline: ['Above the', 'Clouds —', 'Switzerland'],
    description: 'Heliskiing at dawn, thermal spa retreats, and Michelin-starred raclette in a 16th-century chalet. Alpine luxury redefined.',
    accent: GOLD, accentDim: 'rgba(184,134,11,0.12)',
  },
]

const HERO_THUMBS = [
  { slideIndex: 1, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=480&q=85', location: 'France', title: 'Paris Romance', nights: '7 nights' },
  { slideIndex: 2, image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=480&q=85', location: 'England', title: 'London Classic', nights: '5 nights' },
  { slideIndex: 3, image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=480&q=85', location: 'Switzerland', title: 'Swiss Alps', nights: '8 nights' },
]


const AUTO_MS     = 6000
const RING_R      = 16
const RING_CIRC   = 2 * Math.PI * RING_R

function HeroSection() {
  const [cur, setCur]         = useState(0)
  const [busy, setBusy]       = useState(false)
  const [prog, setProg]       = useState(0)
  const [animKey, setAnimKey] = useState(0)

  const go = useCallback((idx) => {
    if (busy || idx === cur) return
    setBusy(true); setCur(idx); setProg(0); setAnimKey(k => k + 1)
    setTimeout(() => setBusy(false), 1000)
  }, [cur, busy])

  const goNext = useCallback(() => go((cur + 1) % HERO_SLIDES.length), [cur, go])
  const goPrev = useCallback(() => go((cur - 1 + HERO_SLIDES.length) % HERO_SLIDES.length), [cur, go])

  useEffect(() => {
    const TICK = 50, steps = AUTO_MS / TICK; let count = 0
    const id = setInterval(() => {
      count++; setProg((count / steps) * 100)
      if (count >= steps) { count = 0; setProg(0); goNext() }
    }, TICK)
    return () => clearInterval(id)
  }, [goNext])

  useEffect(() => {
    const fn = (e) => { if (e.key === 'ArrowRight') goNext(); if (e.key === 'ArrowLeft') goPrev() }
    window.addEventListener('keydown', fn); return () => window.removeEventListener('keydown', fn)
  }, [goNext, goPrev])

  const slide      = HERO_SLIDES[cur]
  const ringOffset = RING_CIRC - (prog / 100) * RING_CIRC

  return (
    <section
      className="relative w-full overflow-hidden select-none"
      style={{ minHeight: 'clamp(600px,96vh,1000px)', background: '#08080f', fontFamily: "Georgia,'Times New Roman',serif" }}
      aria-label="Hero slideshow"
    >
      {/* Slide backgrounds */}
      {HERO_SLIDES.map((s, i) => (
        <div key={s.id} aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center will-change-[opacity]"
          style={{
            backgroundImage: `url('${s.image}')`,
            opacity: i === cur ? 1 : 0,
            transition: 'opacity 1.1s cubic-bezier(.4,0,.2,1)',
            zIndex: i === cur ? 1 : 0,
            transform: i === cur ? 'scale(1.02)' : 'scale(1)',
          }}
        />
      ))}

      {/* Overlays */}
      <div aria-hidden="true" className="absolute inset-0 z-[2]" style={{ background: 'linear-gradient(105deg,rgba(4,4,10,.96) 0%,rgba(4,4,10,.82) 38%,rgba(4,4,10,.32) 62%,rgba(4,4,10,.04) 100%)' }} />
      <div aria-hidden="true" className="absolute inset-0 z-[2]" style={{ background: 'linear-gradient(0deg,rgba(4,4,10,.92) 0%,rgba(4,4,10,.4) 22%,transparent 50%)' }} />
      <div aria-hidden="true" className="absolute inset-0 z-[2]" style={{ background: 'linear-gradient(180deg,rgba(4,4,10,.45) 0%,transparent 28%)' }} />

      {/* Gold left accent line */}
      <div aria-hidden="true" className="absolute left-0 top-0 bottom-0 z-[3] w-[3px]"
        style={{ background: `linear-gradient(180deg,transparent,${GOLD} 35%,${GOLD2} 65%,transparent)`, transition: 'background 800ms ease' }} />

      <div className="relative z-[4] flex flex-col" style={{ minHeight: 'clamp(600px,96vh,1000px)' }}>

      
        {/* Main content row */}
        <div className="flex-1 flex items-stretch">
          <div className="w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row items-stretch"
            style={{ padding: 'clamp(2rem,5vw,5rem) clamp(1.25rem,5vw,4rem)', gap: 0 }}>

            {/* ── Left text ── */}
            <div className="flex-1 flex flex-col justify-center"
              style={{ maxWidth: 640, paddingRight: 'clamp(0px,4vw,80px)', paddingBottom: 'clamp(1.5rem,4vw,0px)' }}>

              <div key={`ey-${animKey}`} className="flex items-center gap-3 mb-5 sm:mb-6"
                style={{ animation: 'luxUp .6s ease both', fontFamily: 'sans-serif' }}>
                <Rule color={GOLD} w={28} />
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-[.22em] uppercase"
                  style={{ color: GOLD }}>{slide.eyebrow}</span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-sm text-[9px] font-bold tracking-[.15em] uppercase border"
                  style={{ color: GOLD2, borderColor: `${GOLD}45`, background: slide.accentDim, fontFamily: 'sans-serif' }}>{slide.tag}</span>
              </div>

              <div key={`hl-${animKey}`}
                style={{ animation: 'luxUp .65s .08s ease both', marginBottom: 'clamp(1.25rem,3vw,2rem)' }}>
                <h1 className="text-white leading-[.92]"
                  style={{ fontSize: 'clamp(3rem,8vw,6.5rem)', fontWeight: 400, letterSpacing: '-.02em', fontFamily: "Georgia,'Times New Roman',serif" }}>
                  {slide.headline.map((line, li) => (
                    <span key={li} className="block">
                      {li === slide.headline.length - 1
                        ? <em style={{ fontStyle: 'italic', color: GOLD }}>{line}</em>
                        : line}
                    </span>
                  ))}
                </h1>
              </div>

              <div key={`lc-${animKey}`} className="flex items-center gap-2 mb-5 sm:mb-6"
                style={{ animation: 'luxUp .65s .14s ease both', fontFamily: 'sans-serif' }}>
                <MapPin size={12} style={{ color: GOLD, flexShrink: 0 }} />
                <span className="text-[11px] sm:text-xs tracking-[.15em] uppercase"
                  style={{ color: 'rgba(255,255,255,.45)' }}>{slide.location}</span>
                <span style={{ color: 'rgba(255,255,255,.15)', margin: '0 4px' }}>—</span>
                <span className="text-[11px] sm:text-xs tracking-[.12em] uppercase"
                  style={{ color: 'rgba(255,255,255,.28)' }}>{slide.region}</span>
              </div>

              <p key={`ds-${animKey}`}
                style={{ animation: 'luxUp .65s .20s ease both', color: 'rgba(255,255,255,.55)', fontSize: 'clamp(.875rem,1.4vw,1.05rem)', lineHeight: 1.75, maxWidth: '42ch', marginBottom: 'clamp(2rem,4vw,2.8rem)', fontFamily: 'sans-serif', fontWeight: 300 }}>
                {slide.description}
              </p>

              {/* CTA Buttons — RED primary */}
              <div key={`ct-${animKey}`} className="flex flex-wrap items-center gap-3 sm:gap-4"
                style={{ animation: 'luxUp .65s .27s ease both', marginBottom: 'clamp(2.5rem,5vw,3.5rem)' }}>
                <a href="#destinations"
                  className="inline-flex items-center gap-3 font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:brightness-110 hover:scale-[1.02] active:scale-[.98]"
                  style={{ background: `linear-gradient(135deg,${RED} 0%,#991B1B 100%)`, color: '#fff', padding: '13px 28px', borderRadius: 2, letterSpacing: '.12em', fontFamily: 'sans-serif', boxShadow: `0 8px 28px ${RED}50` }}>
                  Explore Collection <ArrowRight size={14} />
                </a>
                <a href="#inquiry"
                  className="inline-flex items-center gap-2 font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:bg-white/10"
                  style={{ color: 'rgba(255,255,255,.7)', border: `1px solid ${GOLD}55`, padding: '12px 28px', borderRadius: 2, letterSpacing: '.12em', fontFamily: 'sans-serif' }}>
                  Request Itinerary
                </a>
              </div>

          
            </div>

                   {/* ── Right thumbnail panel — bottom-right, horizontal ── */}
        <div
          className="hidden lg:flex"
          style={{
            position: 'absolute',
            bottom: '70px',
            right: 'clamp(1.25rem,5vw,4rem)',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '10px',
            zIndex: 5,
          }}
        >

          {/* Label row */}
          <div
            className="flex items-center gap-2"
            style={{ fontFamily: 'sans-serif' }}
          >
            <Rule color={GOLD} w={14} />
            <span
              className="text-[9px] tracking-[.2em] uppercase"
              style={{ color: GOLD }}
            >
              Also Explore
            </span>
          </div>

          {/* Cards row */}
          <div
            className="flex flex-row items-end"
            style={{ gap: '10px' }}
          >
            {HERO_THUMBS.map((card, ci) => {
              const isActive = cur === card.slideIndex
           const widths  = ['360px', '320px', '280px']
const heights = ['360px', '320px', '280px']
              return (
                <button
                  key={card.slideIndex}
                  onClick={() => go(card.slideIndex)}
                  className="relative overflow-hidden flex-shrink-0 border-0 focus:outline-none group"
                  style={{
                    width: widths[ci],
                    height: heights[ci],
                    borderRadius: 4,
                    boxShadow: isActive
                      ? `0 0 0 2px ${GOLD}, 0 16px 40px rgba(0,0,0,.65)`
                      : '0 4px 20px rgba(0,0,0,.5)',
                    transition: 'box-shadow 500ms ease',
                  }}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ width: '100%', height: '100%', display: 'block' }}
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: isActive
                        ? 'linear-gradient(0deg,rgba(0,0,0,.82) 0%,rgba(0,0,0,.08) 55%)'
                        : 'linear-gradient(0deg,rgba(0,0,0,.72) 0%,rgba(0,0,0,.18) 55%)',
                    }}
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 flex items-end justify-between"
                    style={{ padding: '10px 12px' }}
                  >
                    <div>
                      <p
                        className="text-[8px] uppercase tracking-widest leading-none mb-0.5"
                        style={{ color: 'rgba(255,255,255,.4)', fontFamily: 'sans-serif' }}
                      >
                        {card.location}
                      </p>
                      <p
                        className="text-[11px] font-medium leading-tight"
                        style={{ color: '#fff', fontFamily: 'Georgia,serif' }}
                      >
                        {card.title}
                      </p>
                    </div>
                    <span
                      className="text-[8px] tracking-widest uppercase px-1.5 py-0.5"
                      style={{
                        color: isActive ? '#fff' : GOLD2,
                        border: `1px solid ${GOLD}50`,
                        background: isActive ? RED : slide.accentDim,
                        borderRadius: 2,
                        fontFamily: 'sans-serif',
                        transition: 'background 400ms ease',
                      }}
                    >
                      {card.nights}
                    </span>
                  </div>

                  {isActive && (
                    <div
                      className="absolute top-0 left-0 right-0 h-[2.5px]"
                      style={{ background: `linear-gradient(90deg,${RED},${GOLD},${GOLD2})` }}
                    />
                  )}
                  {isActive && (
                    <div
                      className="absolute top-2 left-2 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-widest"
                      style={{ background: RED, color: '#fff', borderRadius: 2, fontFamily: 'sans-serif' }}
                    >
                      VIEWING
                    </div>
                  )}

                </button>
              )
            })}
          </div>
          {/* ── End Cards row ── */}

          {/* View all link */}
          <div
            className="flex items-center justify-end gap-2"
            style={{
              alignSelf: 'stretch',
              paddingTop: '6px',
              borderTop: `1px solid ${GOLD}22`,
            }}
          >
            <span
              className="text-[10px] tracking-[.18em] uppercase cursor-pointer"
              style={{ color: GOLD2, fontFamily: 'sans-serif' }}
              onClick={() => { window.location.href = '#destinations' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = GOLD2)}
            >
              View all destinations
            </span>
            <ArrowRight size={11} style={{ color: GOLD2 }} />
          </div>
          {/* ── End View all link ── */}

        </div>
        {/* ── End Right thumbnail panel ── */}
</div>
</div>
        {/* Mobile thumbs */}
        <div className="lg:hidden flex items-end justify-center gap-2.5 px-4 pb-3">
          {HERO_THUMBS.map((card) => {
            const isActive = cur === card.slideIndex
            return (
              <button key={card.slideIndex} onClick={() => go(card.slideIndex)}
                className="relative overflow-hidden flex-shrink-0 border-0 focus:outline-none"
                style={{ width: isActive ? 80 : 60, height: isActive ? 100 : 78, borderRadius: 4, boxShadow: isActive ? `0 0 0 2px ${GOLD}` : '0 2px 12px rgba(0,0,0,.6)', transition: 'all 400ms ease' }}>
                <img src={card.image} alt={card.title} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg,rgba(0,0,0,.75) 0%,transparent 55%)' }} />
                {isActive && <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg,${RED},${GOLD})` }} />}
                <p className="absolute bottom-1.5 left-2 right-2 text-white text-[8px] font-medium leading-tight"
                  style={{ fontFamily: "Georgia,serif" }}>{card.title}</p>
              </button>
            )
          })}
        </div>

        {/* Control bar */}
        <div style={{ background: 'rgba(4,4,10,.75)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,.07)' }}>
          <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4"
            style={{ padding: '14px clamp(1.25rem,5vw,4rem)' }}>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="hidden sm:flex flex-col" style={{ fontFamily: 'sans-serif' }}>
                <span className="text-[9px] uppercase tracking-[.18em]" style={{ color: 'rgba(255,255,255,.3)' }}>{slide.region}</span>
                <span className="text-xs font-medium tracking-wide" style={{ color: 'rgba(255,255,255,.7)' }}>{slide.location}</span>
              </div>
              <div className="flex items-baseline gap-0.5" style={{ fontFamily: 'sans-serif', marginLeft: 8 }}>
                <span className="font-bold text-base sm:text-lg" style={{ color: GOLD, transition: 'color 600ms' }}>{String(cur + 1).padStart(2, '0')}</span>
                <span className="text-xs" style={{ color: 'rgba(255,255,255,.2)' }}>/{String(HERO_SLIDES.length).padStart(2, '0')}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 flex-1 justify-center">
              <div className="relative flex-shrink-0" style={{ width: 38, height: 38 }}>
                <svg viewBox="0 0 38 38" className="w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="19" cy="19" r={RING_R} fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="1.5" />
                  <circle cx="19" cy="19" r={RING_R} fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round"
                    strokeDasharray={RING_CIRC} strokeDashoffset={ringOffset}
                    style={{ transition: 'stroke-dashoffset 50ms linear,stroke 700ms ease' }} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: GOLD, transition: 'background 700ms ease' }} />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={goPrev} aria-label="Previous slide"
                className="flex items-center justify-center focus:outline-none transition-all duration-200 hover:scale-105 active:scale-95"
                style={{ width: 36, height: 36, borderRadius: 2, border: `1px solid ${GOLD}40`, color: 'rgba(255,255,255,.5)', background: 'transparent' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = GOLD }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = `${GOLD}40`; e.currentTarget.style.color = 'rgba(255,255,255,.5)' }}>
                <ChevronLeft size={15} />
              </button>
              <button onClick={goNext} aria-label="Next slide"
                className="flex items-center justify-center focus:outline-none transition-all duration-200 hover:brightness-110 hover:scale-105 active:scale-95"
                style={{ width: 36, height: 36, borderRadius: 2, background: `linear-gradient(135deg,${RED},#991B1B)`, color: '#fff', border: 'none' }}>
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes luxUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════
   2. ABOUT PREVIEW
═══════════════════════════════════════════════════════════════ */
const ABOUT_STATS = [
  { val: '5,000+', label: 'Happy Travellers', icon: Users },
  { val: '200+',   label: 'Destinations',     icon: MapPin },
  { val: '8+',     label: 'Years of Excellence', icon: Award },
  { val: '50+',    label: 'Travel Experts',   icon: HeartHandshake },
]
const ABOUT_PILLARS = [
  { icon: ShieldCheck, title: 'Fully Transparent Pricing',  desc: 'No hidden charges, no surprises. Every cost is itemised before you confirm.' },
  { icon: Clock,       title: '24 / 7 Concierge Support',   desc: 'Our specialists are reachable by call, email, or WhatsApp at any hour, in any time zone.' },
  { icon: Star,        title: 'Awarded Service Quality',    desc: 'Consistently rated five stars by independent travellers across Trustpilot and Google.' },
]
const ABOUT_CREDENTIALS = ['IATA Accredited Member', 'Condé Nast Verified', 'ISO 9001 : 2015 Certified', 'Ministry of Tourism Recognised']

function AboutStatCell({ stat, index, started }) {
  const raw    = parseInt(stat.val.replace(/[^0-9]/g, ''), 10)
  const suffix = stat.val.replace(/[0-9]/g, '')
  const count  = useCountUp(raw, 1400 + index * 150, started)
  const Icon   = stat.icon
  const [hov, setHov] = useState(false)
  return (
    <div className="flex flex-col items-center text-center py-6 px-4 cursor-default transition-colors duration-300 relative"
      style={{ background: hov ? '#FAFAF8' : 'transparent' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 transition-all duration-300"
        style={{ background: hov ? `${GOLD}18` : '#F5F0E8', border: `1px solid ${hov ? GOLD + '55' : '#E7E5E4'}` }}>
        <Icon size={16} style={{ color: hov ? GOLD : '#A8A29E' }} />
      </div>
      <p className="font-black leading-none mb-1 transition-colors duration-300"
        style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(1.7rem,3.5vw,2.2rem)', color: hov ? GOLD : DARK2, letterSpacing: '-0.02em' }}>
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-[11px] uppercase tracking-[.14em] font-semibold transition-colors duration-300" style={{ color: hov ? DARK2 : STONE }}>{stat.label}</p>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-400" style={{ width: hov ? '36px' : '0px', background: RED }} />
    </div>
  )
}

function AboutPreview() {
  const sectionRef = useRef(null)
  const [started, setStarted] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true) }, { threshold: 0.12 })
    if (sectionRef.current) io.observe(sectionRef.current)
    return () => io.disconnect()
  }, [])
  return (
    <section ref={sectionRef} className="w-full bg-white overflow-hidden">
      {/* Stats strip */}
      <div className="border-b border-[#E7E5E4] bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ borderRight: '1px solid #E7E5E4' }}>
            {ABOUT_STATS.map((s, i) => (
              <div key={s.label} style={{ borderLeft: '1px solid #E7E5E4' }}>
                <AboutStatCell stat={s} index={i} started={started} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Split */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          {/* Image panel */}
          <div className="relative order-2 lg:order-1">
            <div className="relative overflow-hidden shadow-2xl" style={{ borderRadius: 4 }}>
              <img
                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=80"
                alt="Aerial view of lush mountain landscape at golden hour"
                className="w-full h-[340px] sm:h-[420px] lg:h-[500px] object-cover transition-transform duration-700"
                style={{ transform: imgLoaded ? 'scale(1)' : 'scale(1.04)' }}
                onLoad={() => setImgLoaded(true)} loading="lazy"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(0,0,0,0) 55%,rgba(0,0,0,0.35) 100%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                <div>
                  <p className="text-white/60 text-[10px] uppercase tracking-widest">Est.</p>
                  <p className="text-white font-black leading-none" style={{ fontFamily: "Georgia,serif", fontSize: '2rem' }}>2016</p>
                </div>
                {/* <div className="flex flex-col items-end gap-1">
                  {ABOUT_CREDENTIALS.slice(0, 2).map((c) => (
                    <span key={c} className="text-[9px] font-semibold tracking-widest uppercase px-2.5 py-1 bg-white/15 backdrop-blur-sm border border-white/20 text-white" style={{ borderRadius: 2 }}>{c}</span>
                  ))}
                </div> */}
              </div>
            </div>
            <div className="absolute -bottom-6 -right-4 sm:-right-6 w-44 sm:w-52 bg-white shadow-xl p-4 hidden sm:block"
              style={{ borderRadius: 4, borderLeft: `3px solid ${GOLD}` }}>
              <p className="font-black leading-none mb-1" style={{ fontFamily: "Georgia,serif", fontSize: '1.9rem', color: GOLD }}>4.9<span className="text-base font-semibold" style={{ color: STONE }}> / 5</span></p>
              <p className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: DARK2 }}>Client Satisfaction</p>
              <div className="flex gap-0.5 mb-1.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={11} fill={GOLD} color={GOLD} />)}</div>
              <p className="text-[10px]" style={{ color: STONE }}>Based on 2,400+ verified reviews</p>
            </div>
            <div className="absolute -left-5 top-8 bottom-8 w-px hidden lg:block"
              style={{ background: `linear-gradient(180deg,transparent,${GOLD}88,transparent)` }} />
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-6"><div className="h-px w-8" style={{ background: GOLD }} /><span className="text-[10px] font-bold uppercase tracking-[.22em]" style={{ color: STONE }}>Our Story</span></div>
            <h2 className="leading-[1.08] mb-5"
              style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(1.9rem,4.5vw,3rem)', fontWeight: 400, color: DARK2, letterSpacing: '-0.015em' }}>
              Crafted by travellers,<br /><em style={{ color: GOLD }}>perfected for you.</em>
            </h2>
            <p className="leading-relaxed mb-4" style={{ fontSize: 'clamp(.9rem,1.5vw,1rem)', color: STONE, maxWidth: '44ch' }}>Founded in Mumbai in 2016, Chalo Holidays was born from a simple conviction — that exceptional travel should be accessible to every family, couple, and adventurer.</p>
            <p className="leading-relaxed mb-7" style={{ fontSize: 'clamp(.9rem,1.5vw,1rem)', color: STONE, maxWidth: '44ch' }}>Today we serve over 5,000 travellers annually across 200+ destinations — every itinerary shaped by local knowledge, genuine care, and decades of expertise.</p>
            <blockquote className="border-l-2 pl-5 mb-8" style={{ borderColor: GOLD }}>
              <p className="italic leading-relaxed mb-2" style={{ fontFamily: "Georgia,serif", fontSize: 'clamp(.95rem,1.5vw,1.1rem)', color: '#44403C' }}>&ldquo;We do not just book trips — we architect memories that last a lifetime.&rdquo;</p>
              <cite className="text-[11px] font-semibold uppercase tracking-widest not-italic" style={{ color: STONE }}>— Founder, Chalo Holidays</cite>
            </blockquote>
            <div className="flex flex-col gap-4 mb-8">
              {ABOUT_PILLARS.map(({ icon: I, title, desc }) => (
                <div key={title} className="flex items-start gap-4 group">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-105"
                    style={{ background: '#F5F0E8', border: '1px solid #E7E5E4' }}>
                    <I size={16} style={{ color: GOLD }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold mb-0.5" style={{ color: DARK2 }}>{title}</p>
                    <p className="text-[12.5px] leading-relaxed" style={{ color: STONE }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="flex flex-wrap gap-2 mb-8">
              {ABOUT_CREDENTIALS.map((c) => (
                <span key={c} className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 border"
                  style={{ borderRadius: 2, borderColor: '#E7E5E4', color: STONE, background: '#FAFAF8' }}>
                  <CheckCircle2 size={10} style={{ color: GOLD }} />{c}
                </span>
              ))}
            </div> */}
            <div className="flex flex-wrap items-center gap-3">
              <a href="#about"
                className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3 text-white transition-all duration-200 hover:brightness-110 hover:scale-[1.03] active:scale-95"
                style={{ background: `linear-gradient(135deg,${RED} 0%,#991B1B 100%)`, borderRadius: 3, boxShadow: `0 6px 20px -6px ${RED}66` }}>
                Our Full Story <ArrowRight size={15} />
              </a>
              <a href="#inquiry"
                className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3 border transition-all duration-200 hover:bg-stone-50"
                style={{ borderRadius: 3, borderColor: GOLD, color: DARK2 }}>
                Plan My Journey
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Credentials bar */}
      <div className="border-t" style={{ borderColor: '#E7E5E4', background: '#FAFAF8' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-5 flex flex-wrap items-center justify-between gap-4">
          {/* <p className="text-[11px] uppercase tracking-[.18em] font-semibold" style={{ color: STONE }}>Trusted &amp; Accredited</p> */}
          {/* <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {ABOUT_CREDENTIALS.map((c) => (
              <span key={c} className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color: '#A8A29E' }}>
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: GOLD }} />{c}
              </span>
            ))}
          </div> */}
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════
   3. BRAND VALUES
═══════════════════════════════════════════════════════════════ */
const BRAND_STATS = [
  { id: 1, icon: Users,       count: 50,   suffix: 'K+', label: 'Happy Travellers',    sub: 'Families · Solo · Corporate' },
  { id: 2, icon: Handshake,   count: 500,  suffix: '+',  label: 'Global Partners',     sub: 'Agents · Hotels · DMCs' },
  { id: 3, icon: Globe,       count: 1200, suffix: '+',  label: 'Support Points',      sub: 'On-ground worldwide' },
  { id: 4, icon: CheckCircle, count: 98,   suffix: 'K+', label: 'Bookings Delivered',  sub: 'Zero friction, end-to-end' },
  { id: 5, icon: ShieldCheck, count: 100,  suffix: '%',  label: 'Transparent Pricing', sub: 'No hidden fees, ever' },
]
const BRAND_ACCREDITATIONS = [{ icon: BadgeCheck, label: 'IATA Accredited' }, { icon: Award, label: 'Condé Nast Verified' }, { icon: Star, label: 'ISO 9001 Certified' }]
const BRAND_PILLARS = [
  { num: '01', title: 'Bespoke Itineraries', body: 'Every journey is architected around you — your pace, your preferences, your story.' },
  { num: '02', title: 'White-Glove Service', body: 'A dedicated travel consultant accompanies you from first enquiry to safe return.' },
  { num: '03', title: 'Global Reach',        body: 'Over 90 countries, 1,200+ vetted partners, and on-ground support at every waypoint.' },
]

function BrandStatCell({ stat, index, started, isLast }) {
  const count  = useCountUp(stat.count, 1800 + index * 150, started)
  const [hov, setHov] = useState(false)
  const Icon   = stat.icon
  return (
    <div className="relative flex flex-col items-center text-center px-6 py-8 sm:px-8 sm:py-10 cursor-default transition-colors duration-500"
      style={{ background: hov ? '#F0EDE8' : 'transparent', borderRadius: 12 }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4 transition-all duration-400"
        style={{ border: `1px solid ${hov ? RED : 'rgba(201,168,76,0.25)'}`, background: hov ? `${RED}15` : 'transparent' }}>
        <Icon size={15} style={{ color: hov ? RED : `${GOLD}88` }} className="transition-colors duration-400" />
      </div>
      <div className="flex items-end justify-center leading-none mb-2">
        <span className="font-black transition-colors duration-400"
          style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(2.4rem,4vw,3.2rem)', letterSpacing: '-0.03em', color: hov ? GOLD : DARK2, fontVariantNumeric: 'tabular-nums' }}>
          {count.toLocaleString()}
        </span>
        <span className="font-bold text-xl pb-1 ml-0.5 transition-colors duration-400" style={{ color: hov ? GOLD2 : GOLD }}>{stat.suffix}</span>
      </div>
      <p className="text-xs sm:text-[13px] font-semibold tracking-[.10em] uppercase mb-1 transition-colors duration-400" style={{ color: hov ? DARK2 : '#44403C' }}>{stat.label}</p>
      <p className="text-[10px] sm:text-[11px] transition-colors duration-400" style={{ color: hov ? GOLD : '#A8A29E' }}>{stat.sub}</p>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] transition-all duration-500" style={{ width: hov ? '40%' : '0%', background: RED }} />
      {!isLast && <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px" style={{ height: '52%', background: '#E7E5E4' }} />}
    </div>
  )
}

function BrandValues() {
  const ref = useRef(null)
  const [started, setStarted] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true) }, { threshold: 0.12 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return (
    <section ref={ref} className="w-full" style={{ background: '#FAFAF9' }}>
      <div className="w-full border-b" style={{ borderColor: '#E7E5E4' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-20">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-10" style={{ background: `linear-gradient(90deg,${GOLD},#E7E5E4)` }} />
                <span className="text-[10px] font-semibold tracking-[.28em] uppercase" style={{ color: '#A8A29E' }}>Our Credentials</span>
              </div>
              <h2 className="leading-[1.05] mb-6"
                style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(2rem,5vw,3.4rem)', letterSpacing: '-0.02em', fontWeight: 400, color: DARK2 }}>
                Crafting extraordinary journeys<br /><em style={{ color: GOLD, fontStyle: 'italic' }}>since the very first mile.</em>
              </h2>
              {/* <div className="flex flex-wrap gap-2.5">
                {BRAND_ACCREDITATIONS.map(({ icon: Ic, label }) => (
                  <div key={label}
                    className="inline-flex items-center gap-2 rounded-full text-[11px] font-semibold tracking-wide px-4 py-2 border transition-colors duration-300 hover:border-[#B8860B] cursor-default"
                    style={{ color: '#78716C', borderColor: '#E7E5E4', background: '#FAFAF9' }}>
                    <Ic size={12} style={{ color: GOLD }} />{label}
                  </div>
                ))}
              </div> */}
            </div>
            <div className="flex flex-col lg:max-w-sm xl:max-w-md w-full" style={{ borderTop: `1px solid ${GOLD}20` }}>
              {BRAND_PILLARS.map(({ num, title, body }) => (
                <div key={num} className="flex gap-5 py-5 group cursor-default" style={{ borderTop: `1px solid ${GOLD}20` }}>
                  <span className="text-[11px] font-bold tracking-[.15em] mt-0.5 flex-shrink-0" style={{ color: '#D6D3D1', fontVariantNumeric: 'tabular-nums' }}>{num}</span>
                  <div>
                    <p className="text-sm font-semibold mb-1 transition-colors duration-300 group-hover:text-[#B8860B]" style={{ color: DARK2 }}>{title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: '#A8A29E' }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-b" style={{ borderColor: '#E7E5E4' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {BRAND_STATS.map((stat, i) => (
              <div key={stat.id} style={{ borderLeft: i > 0 ? '1px solid #E7E5E4' : 'none' }}>
                <BrandStatCell stat={stat} index={i} started={started} isLast={i === BRAND_STATS.length - 1} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <p className="text-sm leading-relaxed max-w-md" style={{ color: '#A8A29E' }}>&ldquo;Every journey is a masterpiece when planned with precision, passion, and the finest attention to detail.&rdquo;</p>
          <div className="flex items-center gap-3 flex-shrink-0">
            <a href="#about" className="text-xs font-semibold tracking-[.14em] uppercase px-5 py-2.5 rounded-full border transition-all duration-300 hover:border-[#B8860B] hover:text-[#B8860B]"
              style={{ color: '#78716C', borderColor: '#D6D3D1' }}>Our Story</a>
            <a href="#inquiry"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-[.12em] uppercase px-6 py-2.5 rounded-full transition-all duration-300 hover:brightness-110 hover:scale-[1.03] active:scale-95"
              style={{ color: '#fff', background: `linear-gradient(135deg,${RED},#991B1B)`, boxShadow: `0 6px 24px -6px ${RED}55` }}>
              Begin Your Journey <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════
   4. CORE STRENGTHS
═══════════════════════════════════════════════════════════════ */
const STRENGTHS = [
  { id: 1, number: '20+',    unit: 'Years',  label: 'Travel Expertise',      description: 'Two decades of crafting bespoke journeys across every continent — with the nuanced local intelligence only time can build.', icon: Award,       accent: GOLD,  tag: 'EXPERIENCE' },
  { id: 2, number: '1-Click',unit: '',       label: 'Effortless Booking',    description: 'A seamless, intuitive platform that takes you from dream destination to confirmed itinerary in minutes — not days.',        icon: Zap,         accent: RED,   tag: 'BOOKING' },
  { id: 3, number: '24/7',   unit: '',       label: 'Dedicated Support',     description: 'Our concierge travel team is always on call — day or night, wherever in the world your journey may take you.',               icon: Clock,       accent: GOLD2, tag: 'SUPPORT' },
  { id: 4, number: '#1',     unit: 'Rated',  label: 'Best-in-Class Service', description: 'Award-winning hospitality and white-glove service that consistently sets the benchmark for premium travel experiences.',    icon: Star,        accent: RED,   tag: 'SERVICE' },
  { id: 5, number: 'Best',   unit: 'Value',  label: 'Unbeatable Pricing',    description: 'Exclusive partnerships and consolidated purchasing give you access to world-class trips at prices that simply cannot be matched.', icon: TrendingDown, accent: GOLD, tag: 'PRICING' },
]

function StrengthCard({ strength, index }) {
  const [hov, setHov] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)
  const Icon = strength.icon
  const handleMove = (e) => {
    const r = cardRef.current.getBoundingClientRect()
    setMouse({ x: e.clientX - r.left, y: e.clientY - r.top })
  }
  return (
    <article ref={cardRef} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onMouseMove={handleMove}
      className="relative group cursor-pointer" style={{ animationDelay: `${index * 100}ms` }}>
      <div className="relative overflow-hidden transition-all duration-500 h-full"
        style={{
          background: hov ? `radial-gradient(340px circle at ${mouse.x}px ${mouse.y}px,${strength.accent}0D,transparent 65%),#ffffff` : '#ffffff',
          border: `1px solid ${hov ? `${strength.accent}45` : '#E8E5E1'}`,
          borderRadius: 4,
          transform: hov ? 'translateY(-5px)' : 'translateY(0)',
          boxShadow: hov ? `0 20px 48px -12px ${strength.accent}28,0 0 0 1px ${strength.accent}20` : '0 2px 12px -4px rgba(28,25,23,0.08)',
        }}>
        <div className="h-[1.5px] w-full transition-all duration-500"
          style={{ background: hov ? `linear-gradient(90deg,transparent,${strength.accent} 40%,${GOLD2} 60%,transparent)` : 'linear-gradient(90deg,transparent,#E8E5E1,transparent)' }} />
        <div className="p-6 sm:p-7 flex flex-col h-full">
          <div className="flex items-start justify-between mb-6">
            <span className="text-[9px] font-bold tracking-[0.22em] uppercase px-3 py-1.5"
              style={{ color: strength.accent, border: `1px solid ${strength.accent}35`, background: `${strength.accent}0C`, borderRadius: 2 }}>{strength.tag}</span>
            <div className="w-9 h-9 flex items-center justify-center transition-all duration-300 flex-shrink-0"
              style={{ background: hov ? `${strength.accent}15` : '#F5F2EE', border: `1px solid ${hov ? `${strength.accent}45` : '#E8E5E1'}`, borderRadius: 3 }}>
              <Icon size={15} style={{ color: hov ? strength.accent : '#8C8279' }} className="transition-colors duration-300" />
            </div>
          </div>
          <div className="mb-2 leading-none flex items-baseline gap-2">
            <span className="transition-colors duration-400"
              style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(2.6rem,5vw,3.6rem)', fontWeight: 700, letterSpacing: '-0.025em', color: hov ? strength.accent : DARK2 }}>
              {strength.number}
            </span>
            {strength.unit && (
              <span className="transition-colors duration-300"
                style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(1rem,2vw,1.25rem)', fontWeight: 400, fontStyle: 'italic', color: hov ? `${strength.accent}BB` : '#A39890' }}>
                {strength.unit}
              </span>
            )}
          </div>
          <h3 className="font-semibold text-sm sm:text-base mb-3 leading-snug" style={{ color: DARK2 }}>{strength.label}</h3>
          <div className="h-px mb-4 transition-all duration-500" style={{ background: hov ? `linear-gradient(90deg,${strength.accent}55,transparent)` : '#EBE8E4' }} />
          <p className="text-[13px] sm:text-sm leading-relaxed flex-1" style={{ color: '#78716C' }}>{strength.description}</p>
          <div className="flex items-center gap-1.5 mt-6 text-[11px] font-semibold tracking-[0.12em] uppercase transition-all duration-300"
            style={{ color: hov ? strength.accent : '#A39890', transform: hov ? 'translateX(4px)' : 'translateX(0)' }}>
            Learn More <ArrowUpRight size={13} />
          </div>
        </div>
      </div>
    </article>
  )
}

function CoreStrengths() {
  return (
    <section className="relative w-full bg-[#FAFAF8] py-20 sm:py-24 overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: `radial-gradient(#D4A01720 1px,transparent 1px)`, backgroundSize: '32px 32px' }} />
      <div aria-hidden="true" className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2"
        style={{ width: 700, height: 220, background: `radial-gradient(ellipse,${GOLD}18 0%,transparent 72%)`, filter: 'blur(48px)' }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px" style={{ background: RED }} />
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: GOLD }}>Why Choose Us</span>
              <div className="w-8 h-px" style={{ background: '#E8E5E1' }} />
            </div>
            <h2 className="leading-[1.0] text-balance"
              style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(2.2rem,5vw,3.5rem)', fontWeight: 400, letterSpacing: '-0.02em', color: DARK2 }}>
              Our Core <em style={{ color: GOLD, fontStyle: 'italic' }}>Strengths</em>
            </h2>
          </div>
          <div className="md:max-w-xs flex flex-col gap-4">
            <p className="text-sm leading-relaxed" style={{ color: '#78716C' }}>Built on two decades of passion for travel and an unwavering commitment to crafting journeys worthy of the world&apos;s most discerning travellers.</p>
            <a href="#about" className="self-start inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase transition-all duration-300 group/link" style={{ color: RED }}>
              Our Story <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {STRENGTHS.slice(0, 3).map((s, i) => <StrengthCard key={s.id} strength={s} index={i} />)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:w-2/3 lg:mx-auto">
          {STRENGTHS.slice(3).map((s, i) => <StrengthCard key={s.id} strength={s} index={i + 3} />)}
        </div>
        <div className="mt-14 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: '#E8E5E1' }}>
          {/* <p className="text-[11px] tracking-[0.18em] uppercase" style={{ color: '#A8A29E' }}>IATA Accredited &nbsp;·&nbsp; Condé Nast Recognised &nbsp;·&nbsp; ISO Certified</p> */}
          <a href="#inquiry"
            className="inline-flex items-center gap-2.5 text-[11px] font-bold tracking-[0.16em] uppercase px-6 py-3 transition-all duration-300 hover:brightness-105 hover:scale-[1.02] active:scale-95"
            style={{ color: '#fff', background: `linear-gradient(135deg,${RED},#991B1B)`, boxShadow: `0 6px 22px -6px ${RED}55`, borderRadius: 2 }}>
            Begin Your Journey <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════
   5. DESTINATIONS PREVIEW
═══════════════════════════════════════════════════════════════ */
const DEST_REGIONS = [
  { num: '01', name: 'Africa',    count: 5  },
  { num: '02', name: 'Asia',      count: 8  },
  { num: '03', name: 'Australia', count: 4  },
  { num: '04', name: 'Europe',    count: 10 },
  { num: '05', name: 'Americas',  count: 7  },
]
const colA_base = [
  {
    src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
    alt: 'Hallstatt Austria alpine village',
    location: 'Hallstatt, Austria',
    title: 'The Village Of Hallstatt',
    desc: "A storybook alpine village of mirror-still lakes, pastel houses, and towering mountain cliffs."
  },
  {
    src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    alt: 'New Zealand mountain bay',
    location: 'South Island, New Zealand',
    title: 'Fiordland Wilderness',
    desc: 'Dramatic fjords carved by ancient glaciers, dense rainforest, and emerald-green waters.'
  },
  {
    src: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3',
    alt: 'Northern lights Norway',
    location: 'Tromsø, Norway',
    title: 'Aurora Borealis',
    desc: "Curtains of green and violet light dance across the Arctic sky."
  },
  {
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    alt: 'Maldives lagoon',
    location: 'Maldives',
    title: 'Maldivian Seclusion',
    desc: 'Crystal-clear lagoons, white sandbanks, and overwater villas.'
  },
]
const colB_base = [
  {
    src: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
    alt: 'Rome Colosseum',
    location: 'Rome, Italy',
    title: 'Eternal Rome',
    desc: 'Two thousand years of history woven into every cobblestone.'
  },
  {
    src: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad',
    alt: 'Santorini Greece',
    location: 'Oia, Santorini',
    title: 'Santorini Caldera',
    desc: 'Iconic blue-domed churches and legendary sunsets.'
  },
  {
    src: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e',
    alt: 'Lake Como Italy',
    location: 'Lake Como, Italy',
    title: 'Villa-Strewn Como',
    desc: 'Luxury villas, alpine peaks, and serene lake views.'
  },
  {
    src: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
    alt: 'Kyoto Japan',
    location: 'Kyoto, Japan',
    title: 'Ancient Kyoto',
    desc: 'Cherry blossoms, temples, and lantern-lit streets.'
  },
]
const destColA = [...colA_base, ...colA_base]
const destColB = [...colB_base, ...colB_base]

function DestRegionRow({ region }) {
  const [hov, setHov] = useState(false)
  return (
    <div className="relative cursor-pointer select-none" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div className="h-px w-full mb-4" style={{ background: hov ? `linear-gradient(90deg,${RED},transparent)` : '#E2E8F0', transition: 'background 400ms ease' }} />
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-end gap-4">
          <span className="text-[11px] font-semibold tabular-nums" style={{ color: hov ? RED : '#94A3B8', transition: 'color 300ms ease' }}>{region.num}/</span>
          <span className="font-bold leading-none" style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(1.45rem,3.5vw,2rem)', color: hov ? DARK : '#94A3B8', transition: 'color 350ms ease' }}>{region.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold tabular-nums" style={{ color: hov ? SLATE : '#CBD5E1', transition: 'color 300ms ease' }}>({region.count})</span>
          <div style={{ opacity: hov ? 1 : 0, transform: hov ? 'translate(0,0)' : 'translate(-6px,6px)', transition: 'opacity 300ms ease,transform 300ms ease' }}>
            <ArrowUpRight size={16} style={{ color: RED }} />
          </div>
        </div>
      </div>
      <div style={{ height: 1, background: `linear-gradient(90deg,${RED},${GOLD})`, transform: hov ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 400ms cubic-bezier(.4,0,.2,1)', marginTop: -1 }} />
    </div>
  )
}

function DestImageTile({ img }) {
  const [hov, setHov] = useState(false)
  return (
    <div className="relative overflow-hidden flex-shrink-0 cursor-pointer w-full" style={{ borderRadius: 12,   aspectRatio: '3/4' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <img src={img.src} alt={img.alt} className="w-full h-full object-cover"
        style={{ transform: hov ? 'scale(1.08)' : 'scale(1)', transition: 'transform 700ms cubic-bezier(.4,0,.2,1)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg,rgba(15,23,42,.65) 0%,transparent 55%)' }} />
      <div className="absolute inset-0 flex flex-col justify-end"
        style={{ background: `linear-gradient(0deg,${DARK}F0 0%,${DARK}CC 50%,rgba(15,23,42,.30) 100%)`, opacity: hov ? 1 : 0, transform: hov ? 'translateY(0)' : 'translateY(10px)', transition: 'opacity 350ms ease,transform 350ms ease' }}>
        <div className="p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <MapPin size={12} style={{ color: GOLD2, flexShrink: 0 }} />
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: GOLD2 }}>{img.location}</span>
          </div>
          <h3 className="font-bold leading-tight mb-2" style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(.9rem,2vw,1.05rem)', color: '#fff' }}>{img.title}</h3>
          <p className="leading-relaxed" style={{ color: 'rgba(255,255,255,.68)', fontSize: 11, maxWidth: '28ch', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{img.desc}</p>
          <div className="flex items-center gap-1 mt-3" style={{ color: GOLD2 }}>
            <span className="text-[10px] font-bold uppercase tracking-widest">Explore</span>
            <ArrowUpRight size={11} style={{ color: GOLD2 }} />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3" style={{ opacity: hov ? 0 : 1, transition: 'opacity 250ms ease' }}>
        <div className="flex items-center gap-1"><MapPin size={9} style={{ color: GOLD2 }} /><span className="text-[10px] font-semibold" style={{ color: 'rgba(255,255,255,.75)' }}>{img.location}</span></div>
      </div>
    </div>
  )
}

function DestAutoScrollCol({ images, speed, reversed, className }) {
  const trackRef = useRef(null)
  const posRef   = useRef(0)
  const rafRef   = useRef(0)
  useEffect(() => {
    const track = trackRef.current; if (!track) return
    const half = track.scrollHeight / 2
    const tick = () => {
      posRef.current += reversed ? -speed : speed
      if (posRef.current >= half) posRef.current -= half
      if (posRef.current < 0)    posRef.current += half
      track.style.transform = `translateY(${-posRef.current}px)`
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [speed, reversed])
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex flex-col gap-3 will-change-transform">
        {images.map((img, i) => <DestImageTile key={i} img={img} />)}
      </div>
    </div>
  )
}

function DestinationsPreview() {
  return (
    <section id="destinations" className="relative py-20 sm:py-28 overflow-hidden" style={{ background: '#FFFFFF' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(#F1F5F9 1px,transparent 1px),linear-gradient(90deg,#F1F5F9 1px,transparent 1px)`, backgroundSize: '80px 80px', opacity: 0.35 }} />
      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-20 items-start">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-6"><div className="h-px w-7" style={{ background: GOLD }} /><span className="text-[10px] font-bold uppercase tracking-[.22em]" style={{ color: GOLD }}>Handpicked Regions</span></div>
            <h2 className="leading-[.95] mb-5" style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(3rem,7vw,5rem)', fontWeight: 400, color: DARK }}>Destinations</h2>
            <p className="leading-relaxed mb-10" style={{ color: SLATE, fontSize: 'clamp(.875rem,1.4vw,.975rem)', maxWidth: '42ch' }}>With each destination handpicked by our experts, your journey becomes more than a place — it becomes an experience of beauty, culture, and moments that stay with you long after the journey ends.</p>
            <nav className="mb-10">
              {DEST_REGIONS.map((r) => <DestRegionRow key={r.num} region={r} />)}
              <div className="h-px w-full mt-1" style={{ background: '#E2E8F0' }} />
            </nav>
            <button className="inline-flex items-center gap-2.5 font-bold text-sm uppercase tracking-widest px-7 py-4 transition-all duration-200 hover:opacity-90 active:scale-95 self-start"
              style={{ background: `linear-gradient(135deg,${RED},#991B1B)`, color: '#fff', borderRadius: 3, boxShadow: `0 8px 28px -8px ${RED}55` }}>
              Explore More Destinations <ChevronRight size={15} />
            </button>
          </div>
          <div className="relative" style={{ height: 'clamp(480px,70vh,680px)' }}>
            <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none" style={{ height: 80, background: 'linear-gradient(180deg,#fff 0%,transparent 100%)' }} />
            <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none" style={{ height: 80, background: 'linear-gradient(0deg,#fff 0%,transparent 100%)' }} />
            <div className="grid grid-cols-2 gap-3 h-full overflow-hidden">
              <DestAutoScrollCol images={destColA} speed={0.38} reversed={false} className="h-full" />
              <DestAutoScrollCol images={destColB} speed={0.30} reversed={true}  className="h-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════
   6. SERVICES PREVIEW
═══════════════════════════════════════════════════════════════ */
const SERVICES = [
  { id: '01', icon: Hotel,      label: 'Hotels',             title: 'Curated Luxury Hotels',      tagline: 'From boutique hideaways to five-star palaces.',      description: 'We handpick accommodations that go beyond comfort — selecting heritage palaces, intimate boutique retreats, and iconic city hotels that become memories in themselves.', features: ['Pre-arrival inspections', 'Best-rate guarantee', 'Exclusive room upgrades'],       accent: GOLD,  bg: 'https://placehold.co/800x500?text=Luxury+Hotel+Grand+Lobby+Chandelier+Marble+Floors+Elegant+Decor' },
  { id: '02', icon: Car,        label: 'Transfers',          title: 'Seamless Transfers',          tagline: 'Private, punctual and perfectly comfortable.',       description: 'From tarmac to hotel lobby, our chauffeured fleet ensures every transition is smooth. Luxury sedans, SUVs, and private coaches tailored to your group size.',             features: ['24/7 flight tracking', 'Meet & greet service', 'Luxury fleet options'],           accent: DARK,  bg: 'https://placehold.co/800x500?text=Luxury+Black+Sedan+Transfer+Airport+Chauffeur+Professional' },
  { id: '03', icon: Binoculars, label: 'Sightseeing',        title: 'Immersive Sightseeing',       tagline: 'Beyond the tourist trail — curated discoveries.',    description: 'Skip-the-line access, private guides fluent in your language, and insider access to experiences most travellers never find.',                                         features: ['Skip-the-line access', 'Expert local guides', 'Private after-hours tours'],   accent: GOLD2, bg: 'https://placehold.co/800x500?text=Private+Guided+Tour+Ancient+Monument+Sunrise+Empty+Historic+Site' },
  { id: '04', icon: Palmtree,   label: 'Holiday Packages',   title: 'Bespoke Holiday Packages',    tagline: 'Every detail shaped around you.',                    description: 'No two travellers are alike. Our packages are built from scratch — matching your travel style, pacing, interests, and budget with meticulous care and zero compromise.', features: ['Fully customisable', 'All-inclusive options', 'Family & honeymoon specials'], accent: RED,   bg: 'https://placehold.co/800x500?text=Tropical+Holiday+Package+Beachfront+Resort+Palm+Trees+Turquoise+Sea' },
  { id: '05', icon: Briefcase,  label: 'Corporate Bookings', title: 'Corporate Travel Solutions',  tagline: 'Business travel — effortless and efficient.',        description: 'From executive retreats to large-scale MICE events, we manage corporate travel with precision — negotiated rates, consolidated billing, and a dedicated account manager.',features: ['MICE & incentive travel', 'Consolidated invoicing', 'Dedicated account manager'],accent: GOLD,  bg: 'https://placehold.co/800x500?text=Corporate+Conference+Room+Modern+Business+Travel+Executive+Lounge' },
  { id: '06', icon: Users,      label: 'Group Bookings',     title: 'Group Travel Specialists',    tagline: 'Large groups, flawless logistics.',                  description: 'Pilgrimages, school tours, family reunions, or destination weddings — we coordinate every moving part so you travel together without a single hitch.',                features: ['Groups from 10–500+', 'Dedicated group coordinator', 'Special group fares'],  accent: RED,   bg: 'https://placehold.co/800x500?text=Large+Group+Travel+Tour+Happy+Travelers+Scenic+Landmark+Destination' },
]

function ServiceCard({ svc, index, inView }) {
  const [hov, setHov] = useState(false)
  const Icon = svc.icon
  return (
    <article className="relative overflow-hidden cursor-pointer group"
      style={{
        borderRadius: 6,
        border: `1px solid ${hov ? svc.accent + '55' : '#E8E8E4'}`,
        background: '#fff',
        boxShadow: hov ? `0 32px 64px -16px rgba(15,23,42,.18),0 0 0 1px ${svc.accent}22` : '0 2px 16px -4px rgba(15,23,42,.06)',
        transform: inView ? (hov ? 'translateY(-8px)' : 'translateY(0)') : 'translateY(32px)',
        opacity: inView ? 1 : 0,
        transition: `transform ${hov ? '380ms' : '600ms'} cubic-bezier(.4,0,.2,1),box-shadow 400ms ease,border-color 400ms ease,opacity 600ms ease ${index * 90}ms`,
      }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div className="absolute inset-0"
        style={{ backgroundImage: `url(${svc.bg})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: hov ? 0.12 : 0, transform: hov ? 'scale(1.04)' : 'scale(1.10)', transition: 'opacity 600ms ease,transform 800ms ease' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${svc.accent},${GOLD2})`, transform: hov ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 450ms cubic-bezier(.4,0,.2,1)' }} />
      <div className="relative p-7 flex flex-col h-full">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center justify-center" style={{ width: 52, height: 52, borderRadius: 6, background: hov ? svc.accent + '18' : '#F8F7F4', border: `1px solid ${hov ? svc.accent + '40' : '#EEE'}`, transition: 'background 400ms ease,border-color 400ms ease' }}>
            <Icon size={22} style={{ color: hov ? svc.accent : '#94A3B8', transition: 'color 400ms ease', strokeWidth: 1.6 }} />
          </div>
          <span className="font-black text-4xl leading-none select-none" style={{ fontFamily: "Georgia,'Times New Roman',serif", color: hov ? svc.accent + '30' : '#F1F5F9', transition: 'color 400ms ease' }}>{svc.id}</span>
        </div>
        <h3 className="font-bold leading-tight mb-2" style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(1.1rem,2vw,1.25rem)', color: DARK }}>{svc.title}</h3>
        <p className="text-[12px] font-semibold uppercase tracking-widest mb-4" style={{ color: hov ? svc.accent : '#94A3B8', transition: 'color 350ms ease' }}>{svc.tagline}</p>
        <div style={{ height: 1, background: hov ? `linear-gradient(90deg,${svc.accent}44,transparent)` : '#F1F5F9', marginBottom: 16, transition: 'background 400ms ease' }} />
        <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: SLATE }}>{svc.description}</p>
        <ul className="flex flex-col gap-2 mb-6">
          {svc.features.map((f) => (
            <li key={f} className="flex items-center gap-2.5">
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: hov ? svc.accent : '#CBD5E1', flexShrink: 0, transition: 'background 400ms ease' }} />
              <span className="text-[12px] font-medium" style={{ color: hov ? SLATE : '#94A3B8', transition: 'color 400ms ease' }}>{f}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 font-bold text-[11px] uppercase tracking-widest" style={{ color: hov ? svc.accent : '#CBD5E1', transition: 'color 350ms ease' }}>
          Learn More <ArrowUpRight size={13} style={{ transform: hov ? 'translate(2px,-2px)' : 'translate(0,0)', transition: 'transform 300ms ease' }} />
        </div>
      </div>
    </article>
  )
}

function MarqueeStrip() {
  const labels = ['Hotels', 'Transfers', 'Sightseeing', 'Holiday Packages', 'Corporate Bookings', 'Group Bookings']
  const items  = [...labels, ...labels, ...labels]
  return (
    <div className="overflow-hidden py-5 border-t border-b" style={{ borderColor: '#E8E8E4', background: DARK }}>
      <div className="flex gap-12 whitespace-nowrap" style={{ animation: 'marquee 22s linear infinite', width: 'max-content' }}>
        {items.map((label, i) => (
          <span key={i} className="flex items-center gap-4">
            <span className="text-[11px] font-bold uppercase tracking-[.22em]" style={{ color: 'rgba(255,255,255,.30)' }}>{label}</span>
            <span style={{ color: RED, fontSize: 10 }}>✦</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-33.333%)}}`}</style>
    </div>
  )
}

function ServicesPreview() {
  const [sectionRef, inView] = useInView(0.08)
  return (
    <>
      <MarqueeStrip />
      <section ref={sectionRef} className="relative py-20 sm:py-28 overflow-hidden" style={{ background: '#FAFAF8' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle,#D4D4C8 1px,transparent 1px)`, backgroundSize: '36px 36px', opacity: 0.45 }} />
        <div className="absolute top-0 bottom-0 left-0 w-[3px] hidden lg:block" style={{ background: `linear-gradient(180deg,transparent,${RED}44,transparent)` }} />
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16"
            style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 700ms ease,transform 700ms ease' }}>
            <div>
              <div className="flex items-center gap-3 mb-5"><div className="h-px w-7" style={{ background: GOLD }} /><span className="text-[10px] font-bold uppercase tracking-[.22em]" style={{ color: GOLD }}>What We Offer</span></div>
              <h2 className="leading-[.95] mb-4" style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(2.6rem,6vw,4.2rem)', fontWeight: 400, color: DARK }}>Our Services</h2>
              <p className="leading-relaxed" style={{ color: SLATE, fontSize: 'clamp(.875rem,1.4vw,.975rem)', maxWidth: '48ch' }}>Six pillars of travel expertise — each one designed to make your journey effortless, memorable, and unmistakably you.</p>
            </div>
            <a href="/services"
              className="inline-flex items-center gap-3 font-bold text-sm uppercase tracking-widest px-7 py-4 flex-shrink-0 transition-all duration-200 hover:brightness-110 active:scale-95 self-start sm:self-auto"
              style={{ background: `linear-gradient(135deg,${RED},#991B1B)`, color: '#fff', borderRadius: 3, boxShadow: `0 8px 28px -8px ${RED}50` }}>
              View All Services <MoveRight size={15} />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((svc, i) => <ServiceCard key={svc.id} svc={svc} index={i} inView={inView} />)}
          </div>
         
        </div>
      </section>
    </>
  )
}

/* ════════════════════════════════════════════════════════════
   7. TESTIMONIALS PREVIEW
═══════════════════════════════════════════════════════════════ */
const TESTIMONIALS = [
  { id: 1, name: 'Priya Sharma',    role: 'Honeymooner',              location: 'Mumbai, India',   rating: 5, service: 'Holiday Package',    text: 'Every single detail of our Maldives honeymoon was flawless. From the private transfer to the overwater villa, everything exceeded our expectations.', avatar: 'PS', accent: GOLD,  destination: 'Maldives' },
  { id: 2, name: 'James Whitfield', role: 'Corporate Travel Manager',  location: 'London, UK',      rating: 5, service: 'Corporate Bookings', text: 'We have managed executive travel through dozens of agencies. None have matched the precision, communication, and genuine care that this team brings.', avatar: 'JW', accent: DARK,  destination: 'Singapore' },
  { id: 3, name: 'Ananya Krishnan', role: 'Family Traveller',          location: 'Bangalore, India',rating: 5, service: 'Group Bookings',    text: 'Coordinating a family of 22 across three generations sounds like chaos — but our coordinator made it feel effortless. The Kerala itinerary was beautifully paced.', avatar: 'AK', accent: GOLD2, destination: 'Kerala, India' },
  { id: 4, name: 'Marco De Luca',   role: 'Solo Explorer',             location: 'Milan, Italy',    rating: 5, service: 'Sightseeing',        text: 'The private after-hours access to Angkor Wat at sunrise — with just our guide and the silence — is something I will carry for the rest of my life.', avatar: 'MD', accent: GOLD,  destination: 'Cambodia' },
  { id: 5, name: 'Ritu Mehta',      role: 'Luxury Traveller',          location: 'Delhi, India',    rating: 5, service: 'Hotels',             text: 'The hotel curation is extraordinary. Each property felt like a discovery — not a booking. Our suite at Udaipur was upgraded before we arrived.', avatar: 'RM', accent: RED,   destination: 'Rajasthan, India' },
  { id: 6, name: 'Chen Wei',        role: 'Business Traveller',        location: 'Shanghai, China', rating: 5, service: 'Transfers',          text: 'The meet-and-greet at Dubai Airport was waiting before my flight even landed. Seamless transfer to the hotel, bilingual driver, and remarkable attention to detail.', avatar: 'CW', accent: GOLD2, destination: 'Dubai, UAE' },
]


function FeaturedCarousel({ inView }) {
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)
  const intervalRef = useRef(null)
  const t = TESTIMONIALS[active]

  const goTo = (idx) => {
    if (animating) return
    setAnimating(true); setTimeout(() => { setActive(idx); setAnimating(false) }, 320)
  }
  const prev = () => goTo((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  const next = () => goTo((active + 1) % TESTIMONIALS.length)

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => setActive((p) => (p + 1) % TESTIMONIALS.length), 5000)
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => setActive((p) => (p + 1) % TESTIMONIALS.length), 5000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  return (
    <div className="relative overflow-hidden" style={{ borderRadius: 8, background: DARK, minHeight: 360, opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 700ms ease 200ms,transform 700ms ease 200ms' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(${GOLD}08 1px,transparent 1px),linear-gradient(90deg,${GOLD}08 1px,transparent 1px)`, backgroundSize: '48px 48px' }} />
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg,${RED},${GOLD},${GOLD2})` }} />
      <div className="absolute bottom-6 right-8 pointer-events-none" style={{ opacity: 0.06 }}><Quote size={120} style={{ color: GOLD, fill: GOLD }} /></div>
      <div className="relative z-10 p-8 sm:p-12 flex flex-col h-full" style={{ minHeight: 360 }}>
        <div className="flex items-center gap-4 mb-6">
          <span className="text-[9px] font-bold uppercase tracking-[.2em] px-2.5 py-1"
            style={{ background: RED + '22', color: '#fff', border: `1px solid ${RED}55`, borderRadius: 2 }}>{t.service}</span>
          <StarRow count={t.rating} accent={GOLD} />
        </div>
        <p className="leading-relaxed flex-1 mb-8"
          style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(1rem,2vw,1.2rem)', color: 'rgba(255,255,255,.80)', fontStyle: 'italic', maxWidth: '58ch', opacity: animating ? 0 : 1, transform: animating ? 'translateY(8px)' : 'translateY(0)', transition: 'opacity 320ms ease,transform 320ms ease' }}>
          &ldquo;{t.text}&rdquo;
        </p>
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="flex items-center gap-4" style={{ opacity: animating ? 0 : 1, transition: 'opacity 320ms ease' }}>
            <div className="flex items-center justify-center font-black text-base flex-shrink-0"
              style={{ width: 50, height: 50, borderRadius: '50%', background: t.accent + '30', border: `2px solid ${t.accent}60`, color: t.accent, fontFamily: "Georgia,'Times New Roman',serif" }}>{t.avatar}</div>
            <div>
              <p className="font-bold text-white leading-none mb-1" style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: '1rem' }}>{t.name}</p>
              <p className="text-[11px]" style={{ color: 'rgba(255,255,255,.40)' }}>{t.role} &middot; {t.location}</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
          
            <div className="flex items-center gap-2">
              <button onClick={() => { prev(); resetTimer() }} className="flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                style={{ width: 36, height: 36, borderRadius: 3, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.12)', color: 'rgba(255,255,255,.60)', cursor: 'pointer' }}>
                <ChevronLeft size={16} />
              </button>
              <button onClick={() => { next(); resetTimer() }} className="flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                style={{ width: 36, height: 36, borderRadius: 3, background: `linear-gradient(135deg,${RED},#991B1B)`, border: `1px solid ${RED}`, color: '#fff', cursor: 'pointer' }}>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TestimonialsPreview() {
  const [sectionRef, inView] = useInView(0.08)
  return (
    <section ref={sectionRef} className="relative py-20 sm:py-28 overflow-hidden" style={{ background: '#fff' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle,#E2E8F0 1px,transparent 1px)`, backgroundSize: '40px 40px', opacity: 0.50 }} />
      <div className="absolute top-0 bottom-0 right-0 w-[3px] hidden lg:block" style={{ background: `linear-gradient(180deg,transparent,${RED}44,transparent)` }} />
      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 700ms ease,transform 700ms ease' }}>
          <div>
            <div className="flex items-center gap-3 mb-5"><div className="h-px w-7" style={{ background: RED }} /><span className="text-[10px] font-bold uppercase tracking-[.22em]" style={{ color: GOLD }}>Traveller Stories</span></div>
            <h2 className="leading-[.95] mb-4" style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(2.6rem,6vw,4.2rem)', fontWeight: 400, color: DARK }}>What Our Guests Say</h2>
            <p className="leading-relaxed" style={{ color: SLATE, fontSize: 'clamp(.875rem,1.4vw,.975rem)', maxWidth: '48ch' }}>Real journeys. Real words. Every review here is from a traveller who trusted us — and came back for more.</p>
          </div>
        </div>
        <div className="mb-8"><FeaturedCarousel inView={inView} /></div>
     
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10"
          style={{ borderTop: '1px solid #E8E8E4', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 700ms ease 600ms,transform 700ms ease 600ms' }}>
          <p className="text-sm leading-relaxed" style={{ color: SLATE, maxWidth: '44ch' }}>Join thousands of satisfied travellers who have made us their trusted partner for every journey.</p>
          <div className="flex items-center gap-3 flex-shrink-0">
            <a href="#inquiry"
              className="inline-flex items-center gap-2.5 font-bold text-sm uppercase tracking-widest px-7 py-4 transition-all duration-200 hover:brightness-110 active:scale-95"
              style={{ background: `linear-gradient(135deg,${RED},#991B1B)`, color: '#fff', borderRadius: 3, boxShadow: `0 8px 28px -8px ${RED}66` }}>
              Start Your Journey <ArrowUpRight size={15} />
            </a>
            <a href="#reviews"
              className="inline-flex items-center gap-2.5 font-semibold text-sm uppercase tracking-widest px-7 py-4 transition-all duration-200 hover:bg-slate-50 active:scale-95"
              style={{ color: SLATE, border: `1px solid ${GOLD}50`, borderRadius: 3 }}>
              Read All Reviews <ChevronRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════
   HOMEPAGE
═══════════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar/>
      <HeroSection />
      <ServicesPreview />
      {/* <AboutPreview /> */}
      <BrandValues />
      <CoreStrengths />
      <DestinationsPreview />
      {/* <ServicesPreview /> */}
      <TestimonialsPreview />
      <Footer/>
    </div>
  )
}
