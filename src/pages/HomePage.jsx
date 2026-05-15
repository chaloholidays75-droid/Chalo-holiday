'use client'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import { Link } from "react-router-dom"
import DisneyLogo from '../assets/patners/disney-logo.jpg'
import HiltonLogo from '../assets/patners/hilton-logo.jpg'
import HyattLogo from '../assets/patners/hyatt-logo.jpg'
import IhgLogo from '../assets/patners/ihg-logo.jpg'
import StarwoodLogo from '../assets/patners/starwood-logo.jpg'
import AccorLogo from '../assets/patners/ACCOR.svg'
import FourSeasonsLogo from '../assets/patners/four-seasons-hotels.png'
import GlobalLogo from '../assets/patners/Global_Logo.webp'
import JumeirahLogo from '../assets/patners/Jumeirah-Logo.png'
import KempinskiLogo from '../assets/patners/kempinski_logo.png'
import MandarinLogo from '../assets/patners/mandarin-oriental-hotel.jpg'
import MeliaLogo from '../assets/patners/melia-logo.jpg'
import RailEuropeLogo from '../assets/patners/raileurope-logo.jpg'
import RadissonLogo from '../assets/patners/rhg-logo.svg'
import RosewoodLogo from '../assets/patners/rosewood-logo.png'
import WyndhamLogo from '../assets/patners/wyndham-hotels.webp'
import LondonImg from '../assets/destination/london-img.jpeg'
import InterlakenImg from '../assets/destination/Interlakeni-img.jpg'
import OsloImg from '../assets/destination/oslo-norway.jpg'
import ParisImg from '../assets/destination/paris-france.webp'
import BerlinImg from '../assets/destination/berlin.jpg'
import WarsawImg from '../assets/destination/Warsaw.avif'
import BarselonaImg from '../assets/destination/barcelonaimg.avif'
import londonImg from '../assets/destination/london-img.jpeg'
import parisImg from '../assets/destination/paris-img.webp'
import spainImg from '../assets/destination/spain-img.avif'
import greeceImg from '../assets/destination/greece-img.webp'

import {
  ArrowRight, ChevronLeft, ChevronRight, MapPin,
  ShieldCheck, Star, Users, HeartHandshake,
  Handshake, Globe, CheckCircle, BadgeCheck,
  ArrowUpRight,
  Hotel, Car, MoveRight,
  Quote, Bookmark, Circle, Train, CalendarDays,
  Users2, Building2, Lock,
  Crown, Binoculars, Briefcase
} from 'lucide-react'

/* ═══════════════════════════════════════════════════════════
   LUXURY TYPOGRAPHY SYSTEM
   ─────────────────────────────────────────────────────────
   DISPLAY  : Cormorant Garamond — ultra-refined serif for hero titles
   HEADING  : Playfair Display   — classic editorial serif for section h2
   SUBHEAD  : Cormorant Garamond Italic — elegant subheadings / taglines
   BODY     : Jost               — geometric, modern, airy for paragraphs
   LABEL    : Montserrat         — crisp uppercase micro-labels / badges
   MONO     : Numbers/stats use Cormorant for old-style elegance

   SIZE SCALE (consistent across all sections):
   --t-display : clamp(3rem, 9vw, 7.5rem)   → hero destination name
   --t-h1      : clamp(2.4rem, 5.5vw, 4.2rem) → section headlines
   --t-h2      : clamp(1.55rem, 2.8vw, 2.2rem) → sub-section titles
   --t-h3      : clamp(1.05rem, 1.8vw, 1.25rem) → card titles
   --t-body-lg : 1.0625rem (17px)           → lead paragraphs
   --t-body    : 0.9375rem (15px)           → standard body copy
   --t-body-sm : 0.8125rem (13px)           → secondary body / captions
   --t-label   : 0.625rem  (10px)           → uppercase micro-labels
   --t-stat    : clamp(1.9rem, 4vw, 3.2rem) → stats / counters
══════════════════════════════════════════════════════════════ */

/* ── FONT IMPORT injected once ── */
if (typeof document !== 'undefined' && !document.getElementById('luxury-fonts')) {
  const l = document.createElement('link')
  l.id   = 'luxury-fonts'
  l.rel  = 'stylesheet'
  l.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=Jost:wght@300;400;500;600&family=Montserrat:wght@400;500;600;700&display=swap'
  document.head.appendChild(l)
}

/* ── CSS vars injected once ── */
if (typeof document !== 'undefined' && !document.getElementById('luxury-vars')) {
  const s = document.createElement('style')
  s.id = 'luxury-vars'
  s.textContent = `
    :root {
      /* Fonts */
      --f-display : 'Cormorant Garamond', 'Georgia', serif;
      --f-heading : 'Playfair Display', 'Georgia', serif;
      --f-body    : 'Jost', 'Helvetica Neue', sans-serif;
      --f-label   : 'Montserrat', sans-serif;

      /* Type scale */
      --t-display : clamp(3rem, 9vw, 7.5rem);
      --t-h1      : clamp(2.4rem, 5.5vw, 4.2rem);
      --t-h2      : clamp(1.55rem, 2.8vw, 2.2rem);
      --t-h3      : clamp(1.05rem, 1.8vw, 1.25rem);
      --t-body-lg : 1.0625rem;
      --t-body    : 0.9375rem;
      --t-body-sm : 0.8125rem;
      --t-label   : 0.625rem;
      --t-stat    : clamp(1.9rem, 4vw, 3.2rem);

      /* Letter spacing */
      --ls-display : -0.025em;
      --ls-heading : -0.02em;
      --ls-label   : 0.22em;
      --ls-sublabel: 0.14em;

      /* Line heights */
      --lh-display : 0.9;
      --lh-heading : 1.05;
      --lh-body    : 1.85;
      --lh-body-tight: 1.55;
    }
  `
  document.head.appendChild(s)
}

/* ═══════════════════════════════════════════════════════════
   BRAND PALETTE
══════════════════════════════════════════════════════════════ */
const RED    = '#D91B1B'
const RED2   = '#B01515'
const AMBER  = '#F5A800'
const AMBER2 = '#C8880A'
const CHAR   = '#2D2D2D'
const GRAY   = '#8A8A8A'
const CREAM  = '#FAFAF5'
const CREAM2 = '#F5F0E6'
const WHITE  = '#FFFFFF'
const GOLD   = AMBER
const GOLD2  = AMBER2
const DARK   = CHAR
const SLATE  = '#4A4A4A'
const STONE  = GRAY

/* ── Convenience style objects ── */
const T = {
  display : { fontFamily:'var(--f-display)', fontSize:'var(--t-display)',   letterSpacing:'var(--ls-display)', lineHeight:'var(--lh-display)', fontWeight:700 },
  h1      : { fontFamily:'var(--f-heading)', fontSize:'var(--t-h1)',        letterSpacing:'var(--ls-heading)', lineHeight:'var(--lh-heading)', fontWeight:700 },
  h2      : { fontFamily:'var(--f-heading)', fontSize:'var(--t-h2)',        letterSpacing:'var(--ls-heading)', lineHeight:'var(--lh-heading)', fontWeight:600 },
  h3      : { fontFamily:'var(--f-heading)', fontSize:'var(--t-h3)',        letterSpacing:'-0.01em',           lineHeight:1.25,                fontWeight:600 },
  bodyLg  : { fontFamily:'var(--f-body)',    fontSize:'var(--t-body-lg)',   lineHeight:'var(--lh-body)',       fontWeight:300 },
  body    : { fontFamily:'var(--f-body)',    fontSize:'var(--t-body)',      lineHeight:'var(--lh-body)',       fontWeight:300 },
  bodySm  : { fontFamily:'var(--f-body)',    fontSize:'var(--t-body-sm)',   lineHeight:'var(--lh-body-tight)', fontWeight:400 },
  label   : { fontFamily:'var(--f-label)',   fontSize:'var(--t-label)',     letterSpacing:'var(--ls-label)',   textTransform:'uppercase', fontWeight:700 },
  sublabel: { fontFamily:'var(--f-label)',   fontSize:'var(--t-label)',     letterSpacing:'var(--ls-sublabel)',textTransform:'uppercase', fontWeight:600 },
  stat    : { fontFamily:'var(--f-display)', fontSize:'var(--t-stat)',      letterSpacing:'-0.03em',           lineHeight:1,               fontWeight:700 },
}

/* ═══════════════════════════════════════════════════════════
   SHARED HOOKS
══════════════════════════════════════════════════════════════ */
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

function Rule({ color = AMBER, w = 32 }) {
  return <div style={{ width: w, height: 1.5, background: color, flexShrink: 0, borderRadius: 2 }} />
}

function StarRow({ count = 5, accent }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={12} style={{ fill: accent || AMBER, color: accent || AMBER }} />
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   LABEL COMPONENT — consistent micro-labels everywhere
══════════════════════════════════════════════════════════════ */
function SectionLabel({ children, color = AMBER }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <Rule color={color} w={28} />
      <span style={{ ...T.label, color }}>{children}</span>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   1. HERO SECTION
══════════════════════════════════════════════════════════════ */
const HERO_SLIDES = [
  { id: 0, destination: 'LONDON',  subline: 'Royal City Escape',    country: 'United Kingdom', region: 'Europe',         tag: 'URBAN HERITAGE',   eyebrow: 'Classic Experience',  image: londonImg, description: 'Historic landmarks, royal traditions, and modern luxury blend seamlessly in one of the world\'s most iconic cities.', rating: 4.7, nights: '6 nights', accent: AMBER2 },
  { id: 1, destination: 'PARIS',   subline: 'City Of Romance',      country: 'France',         region: 'Western Europe', tag: 'LUXURY ESCAPE',    eyebrow: 'Elegant Experience',  image: parisImg,  description: 'Experience the charm of Paris with iconic landmarks, romantic cafés, luxury shopping, and timeless French culture.',     rating: 4.9, nights: '5 nights', accent: AMBER  },
  { id: 2, destination: 'SPAIN',   subline: 'Mediterranean Vibes',  country: 'Spain',          region: 'Southern Europe',tag: 'COASTAL JOURNEY',  eyebrow: 'Vibrant Experience',  image: spainImg,  description: 'Sunny beaches, lively cities, rich culture, and delicious cuisine make Spain an unforgettable destination.',            rating: 4.8, nights: '7 nights', accent: AMBER2 },
  { id: 3, destination: 'GREECE',  subline: 'Sunset Paradise',      country: 'Greece',         region: 'Southern Europe',tag: 'ROMANTIC ESCAPE',  eyebrow: 'Luxury Experience',   image: greeceImg, description: 'Whitewashed villages, blue domes, and breathtaking sunsets over the Aegean Sea.',                                     rating: 4.9, nights: '5 nights', accent: AMBER  },
]

const AUTO_MS   = 5500
const RING_R    = 16
const RING_CIRC = 2 * Math.PI * RING_R
const CARD_W    = [220, 178, 145]
const CARD_H    = [340, 275, 225]
const CARD_LEFT = [0, 190, 340]

function getSliderCards(cur) {
  const total = HERO_SLIDES.length
  return [HERO_SLIDES[cur], HERO_SLIDES[(cur + 1) % total], HERO_SLIDES[(cur + 2) % total]]
}

function HeroSection() {
  const [cur, setCur] = useState(0)
  const [prevIdx, setPrevIdx] = useState(null)
  const [animating, setAnimating] = useState(false)
  const [prog, setProg] = useState(0)
  const [textKey, setTextKey] = useState(0)
  const [morphKey, setMorphKey] = useState(0)
  const progRef = useRef(null)

  const stopTimer = () => clearInterval(progRef.current)

  const startTimer = useCallback((fromIdx) => {
    stopTimer()
    let count = 0
    const steps = AUTO_MS / 50
    progRef.current = setInterval(() => {
      count++
      setProg((count / steps) * 100)
      if (count >= steps) { stopTimer(); goTo((fromIdx + 1) % HERO_SLIDES.length, fromIdx) }
    }, 50)
  }, [])

  const goTo = useCallback((idx, from) => {
    const fromIdx = from !== undefined ? from : cur
    if (animating || idx === fromIdx) return
    stopTimer()
    setPrevIdx(fromIdx)
    setAnimating(true)
    setProg(0)
    setCur(idx)
    setTextKey(k => k + 1)
    setMorphKey(k => k + 1)
    setTimeout(() => { setPrevIdx(null); setAnimating(false) }, 1100)
    startTimer(idx)
  }, [animating, cur, startTimer])

  const goNext = useCallback(() => goTo((cur + 1) % HERO_SLIDES.length), [cur, goTo])
  const goPrev = useCallback(() => goTo((cur - 1 + HERO_SLIDES.length) % HERO_SLIDES.length), [cur, goTo])

  useEffect(() => { startTimer(0); return () => stopTimer() }, [startTimer])
  useEffect(() => {
    const fn = (e) => { if (e.key === 'ArrowRight') goNext(); if (e.key === 'ArrowLeft') goPrev() }
    window.addEventListener('keydown', fn); return () => window.removeEventListener('keydown', fn)
  }, [goNext, goPrev])

  const slide      = HERO_SLIDES[cur]
  const sliderCards = getSliderCards(cur)
  const ringOffset  = RING_CIRC - (prog / 100) * RING_CIRC

  return (
    <section
      className="relative w-full overflow-hidden select-none"
      style={{ minHeight: 'clamp(580px, 96vh, 1020px)', background: '#07070e' }}
      aria-label="Hero slideshow"
    >
      {/* Background layers */}
      {HERO_SLIDES.map((s, i) => (
        <div key={s.id} aria-hidden="true" className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${s.image}')`, opacity: i === cur ? 0 : i === prevIdx ? 1 : 0, transform: 'scale(1.04)', zIndex: 0 }} />
      ))}
      <div key={`morph-${morphKey}`} aria-hidden="true" className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${slide.image}')`, zIndex: 1, animation: 'cardMorphExpand 1.0s cubic-bezier(.76,0,.24,1) both' }} />

      {/* Overlays */}
      <div aria-hidden="true" className="absolute inset-0 z-[2]" style={{ background: 'linear-gradient(260deg,rgba(4,4,10,.82) 0%,rgba(4,4,10,.65) 30%,rgba(4,4,10,.38) 50%,rgba(4,4,10,.08) 72%,rgba(4,4,10,.0) 100%)' }} />
      <div aria-hidden="true" className="absolute inset-0 z-[2]" style={{ background: 'linear-gradient(0deg,rgba(4,4,10,.80) 0%,rgba(4,4,10,.14) 18%,transparent 42%)' }} />
      <div aria-hidden="true" className="absolute inset-0 z-[2]" style={{ background: 'linear-gradient(180deg,rgba(4,4,10,.38) 0%,transparent 20%)' }} />

      {/* Brand accent line */}
      <div aria-hidden="true" className="absolute right-0 top-0 bottom-0 z-[4] w-[3px]"
        style={{ background: `linear-gradient(180deg,transparent,${AMBER} 35%,${AMBER2} 65%,transparent)` }} />

      {/* Desktop slide counter */}
      <div className="absolute right-5 z-[5] hidden lg:flex flex-col items-center gap-4"
        style={{ top: '50%', transform: 'translateY(-50%)' }}>
        {HERO_SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            style={{ width: 2, height: i === cur ? 36 : 14, borderRadius: 2, background: i === cur ? AMBER : 'rgba(255,255,255,.25)', border: 'none', cursor: 'pointer', padding: 0, transition: 'height .4s ease,background .4s ease' }} />
        ))}
        <div style={{ fontFamily:'var(--f-label)', marginTop: 6, textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: AMBER, lineHeight: 1 }}>{String(cur + 1).padStart(2, '0')}</div>
          <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,.18)', margin: '4px auto' }} />
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,.18)', lineHeight: 1 }}>{String(HERO_SLIDES.length).padStart(2, '0')}</div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-[3] flex flex-col" style={{ minHeight: 'clamp(580px, 96vh, 1020px)' }}>
        <div className="flex-1 flex items-center">
          <div className="w-full max-w-[1440px] mx-auto relative"
            style={{ paddingTop: 'clamp(80px,12vw,40px)', paddingBottom: 0, paddingLeft: 'clamp(20px,4vw,48px)', paddingRight: 'clamp(20px,6vw,96px)' }}>

            {/* Stacked image cards */}
            <div className="hidden lg:block absolute"
              style={{ left: 'clamp(24px,3vw,48px)', bottom: 70, width: CARD_LEFT[2] + CARD_W[2] + 16, height: CARD_H[0], zIndex: 5 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <Rule color={AMBER} w={14} />
                <span style={{ ...T.label, color: AMBER }}>Now Viewing</span>
              </div>
              <div style={{ position: 'absolute', top: -26, left: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                <ArrowRight size={10} style={{ color: AMBER2, transform: 'scaleX(-1)' }} />
                <Link to="/destinations" style={{ ...T.label, fontSize: 10, color: AMBER2, textDecoration: 'none' }}>View all destinations</Link>
              </div>

              {[...sliderCards].reverse().map((card, ri) => {
                const realIdx = 2 - ri
                const isFront = realIdx === 0
                return (
                  <div key={`card-${card.id}-${textKey}-${ri}`}
                    className="absolute overflow-hidden"
                    style={{ left: CARD_LEFT[realIdx], bottom: 0, width: CARD_W[realIdx], height: CARD_H[realIdx], borderRadius: 10, cursor: isFront ? 'default' : 'pointer', zIndex: isFront ? 10 : realIdx === 1 ? 9 : 8, boxShadow: isFront ? `0 0 0 2px ${AMBER},0 32px 64px rgba(0,0,0,.80)` : '0 8px 32px rgba(0,0,0,.65)', animation: `heroCardInLeft .6s ${ri * 70}ms cubic-bezier(.4,0,.2,1) both`, transition: 'box-shadow .4s ease' }}
                    onClick={() => !isFront && goTo(HERO_SLIDES.findIndex(s => s.id === card.id))}>
                    <img src={card.image} alt={card.destination} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .6s ease' }}
                      onMouseEnter={e => { if (!isFront) e.currentTarget.style.transform = 'scale(1.07)' }}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                    <div className="absolute inset-0" style={{ background: isFront ? 'linear-gradient(0deg,rgba(4,4,10,.92) 0%,rgba(4,4,10,.10) 52%,transparent 100%)' : 'linear-gradient(0deg,rgba(4,4,10,.80) 0%,rgba(4,4,10,.25) 55%,rgba(4,4,10,.18) 100%)' }} />
                    {isFront && <div className="absolute top-0 left-0 right-0" style={{ height: 2.5, background: `linear-gradient(90deg,${RED},${AMBER},${AMBER2})` }} />}
                    <div className="absolute bottom-0 left-0 right-0" style={{ padding: isFront ? '10px 12px' : '8px 10px' }}>
                      <p style={{ fontFamily:'var(--f-display)', fontSize: isFront ? 15 : 12, fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: 3, textTransform: 'uppercase' }}>{card.destination}</p>
                      <p style={{ ...T.label, fontSize: 9, color: AMBER2 }}>{card.subline}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Text content */}
            <div className="flex flex-col justify-center ml-auto"
              style={{ maxWidth: 'clamp(280px,90vw,520px)', paddingBottom: 'clamp(80px,15vw,60px)', position: 'relative', zIndex: 2 }}>

              <div key={`ey-${textKey}`} style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 14, animation: 'heroLuxUp .55s ease both' }}>
                <Rule color={AMBER} w={20} />
                <span style={{ ...T.label, color: AMBER }}>{slide.eyebrow}</span>
                <span style={{ ...T.label, color: AMBER2, border: `1px solid ${AMBER}45`, background: 'rgba(245,168,0,.12)', padding: '3px 8px', borderRadius: 2 }}>{slide.tag}</span>
              </div>

              <div style={{ position: 'relative', marginBottom: 10 }}>
                {prevIdx !== null && (
                  <h1 key={`out-${prevIdx}`} style={{ ...T.display, position: 'absolute', top: 0, left: 0, color: '#fff', textTransform: 'uppercase', margin: 0, whiteSpace: 'nowrap', animation: 'heroSlideOutUp .65s cubic-bezier(.4,0,.2,1) both', pointerEvents: 'none', zIndex: 1 }}>
                    {HERO_SLIDES[prevIdx].destination}
                  </h1>
                )}
                <h1 key={`in-${textKey}`} style={{ ...T.display, color: '#fff', textTransform: 'uppercase', margin: 0, whiteSpace: 'nowrap', animation: 'heroSlideInUp .65s cubic-bezier(.4,0,.2,1) both', position: 'relative', zIndex: 2, paddingBottom: 6 }}>
                  {slide.destination}
                </h1>
              </div>

              <div key={`sl-${textKey}`} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, animation: 'heroLuxUp .6s .08s ease both' }}>
                <Rule color={AMBER} w={24} />
                <span style={{ fontFamily:'var(--f-display)', fontStyle:'italic', fontSize: 'clamp(.9rem,1.6vw,1.1rem)', fontWeight: 500, color: AMBER, letterSpacing: '0.04em' }}>{slide.subline}</span>
              </div>

              <div key={`lc-${textKey}`} style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6, marginBottom: 16, animation: 'heroLuxUp .6s .14s ease both' }}>
                <MapPin size={11} style={{ color: AMBER, flexShrink: 0 }} />
                <span style={{ ...T.label, color: 'rgba(255,255,255,.75)' }}>{slide.country}</span>
                <span style={{ color: 'rgba(255,255,255,.35)' }}>·</span>
                <span style={{ ...T.sublabel, color: 'rgba(255,255,255,.55)' }}>{slide.region}</span>
              </div>

              <p key={`ds-${textKey}`} style={{ ...T.bodyLg, fontFamily:'var(--f-display)', fontStyle:'italic', fontWeight: 500, color: 'rgba(255,255,255,.80)', maxWidth: '38ch', marginBottom: 28, animation: 'heroLuxUp .6s .20s ease both' }}>
                {slide.description}
              </p>

              <div key={`ct-${textKey}`} style={{ display: 'flex', flexWrap: 'wrap', gap: 10, animation: 'heroLuxUp .6s .28s ease both' }}>
                <Link to="/destinations"
                  className="inline-flex items-center gap-2 transition-all duration-300 hover:brightness-110 hover:scale-[1.02] active:scale-95"
                  style={{ ...T.label, background: `linear-gradient(135deg,${RED},${RED2})`, color: '#fff', padding: 'clamp(10px,2vw,13px) clamp(18px,3vw,26px)', borderRadius: 3, boxShadow: `0 8px 28px ${RED}55`, textDecoration: 'none' }}>
                  Explore Collection <ArrowRight size={13} />
                </Link>
                <Link to="/contact"
                  className="inline-flex items-center gap-2 transition-all duration-300 hover:bg-white/10"
                  style={{ ...T.label, color: 'rgba(255,255,255,.68)', border: `1px solid ${AMBER}50`, padding: 'clamp(9px,2vw,12px) clamp(16px,3vw,24px)', borderRadius: 3, textDecoration: 'none' }}>
                  Request Itinerary
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile thumbnail cards */}
        <div className="lg:hidden flex items-end justify-center gap-2 px-4 pb-3 relative z-[5]">
          {getSliderCards(cur).map((card, ci) => {
            const sizes = [[80, 108], [64, 86], [52, 70]]
            const [w, h] = sizes[ci]
            const isCurrent = ci === 0
            return (
              <button key={`mob-${card.id}-${textKey}-${ci}`}
                onClick={() => !isCurrent && goTo(HERO_SLIDES.findIndex(s => s.id === card.id))}
                style={{ position: 'relative', overflow: 'hidden', flexShrink: 0, width: w, height: h, borderRadius: 8, border: 'none', cursor: isCurrent ? 'default' : 'pointer', padding: 0, boxShadow: isCurrent ? `0 0 0 2px ${AMBER},0 8px 24px rgba(0,0,0,.65)` : '0 4px 16px rgba(0,0,0,.55)', transition: 'all .4s ease' }}>
                <img src={card.image} alt={card.destination} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg,rgba(0,0,0,.72) 0%,transparent 55%)' }} />
                {isCurrent && <div className="absolute top-0 left-0 right-0" style={{ height: 2, background: `linear-gradient(90deg,${RED},${AMBER})` }} />}
                <p className="absolute bottom-1.5 left-1.5 right-1.5 text-white" style={{ fontFamily:'var(--f-display)', fontSize: 8, fontWeight: 700, textTransform: 'uppercase' }}>{card.destination}</p>
              </button>
            )
          })}
        </div>

        {/* Bottom control bar */}
        <div style={{ background: 'rgba(4,4,10,.78)', backdropFilter: 'blur(22px)', borderTop: '1px solid rgba(255,255,255,.07)', position: 'relative', zIndex: 10 }}>
          <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-3"
            style={{ padding: '11px clamp(16px,5vw,96px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0, minWidth: 0 }} className="hidden sm:flex">
              <div>
                <div style={{ ...T.label, fontSize: 9, color: 'rgba(255,255,255,.26)' }}>{slide.region}</div>
                <div style={{ fontFamily:'var(--f-body)', fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,.62)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{slide.country} · {slide.subline}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, justifyContent: 'center' }}>
              <div style={{ position: 'relative', width: 32, height: 32, flexShrink: 0 }}>
                <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                  <circle cx="18" cy="18" r={RING_R} fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="1.5" />
                  <circle cx="18" cy="18" r={RING_R} fill="none" stroke={AMBER} strokeWidth="1.8" strokeLinecap="round" strokeDasharray={RING_CIRC} strokeDashoffset={ringOffset} style={{ transition: 'stroke-dashoffset 50ms linear' }} />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: AMBER }} />
                </div>
              </div>
              <div className="flex gap-2">
                {HERO_SLIDES.map((_, i) => (
                  <Circle key={i} size={i === cur ? 14 : 10} onClick={() => goTo(i)}
                    style={{ cursor: 'pointer', fill: i === cur ? RED : 'transparent', color: 'white', opacity: i === cur ? 1 : 0.5, transition: 'all 0.3s ease' }} />
                ))}
              </div>
              <div style={{ fontFamily:'var(--f-display)', display: 'flex', alignItems: 'baseline', gap: 2 }}>
                <span style={{ fontWeight: 700, fontSize: 16, color: AMBER }}>{String(cur + 1).padStart(2, '0')}</span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,.20)' }}>/{String(HERO_SLIDES.length).padStart(2, '0')}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
              <button onClick={goPrev} aria-label="Previous"
                style={{ width: 34, height: 34, borderRadius: 2, border: `1px solid ${AMBER}40`, background: 'transparent', color: 'rgba(255,255,255,.52)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s ease' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = AMBER; e.currentTarget.style.color = AMBER }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = `${AMBER}40`; e.currentTarget.style.color = 'rgba(255,255,255,.52)' }}>
                <ChevronLeft size={15} />
              </button>
              <button onClick={goNext} aria-label="Next"
                style={{ width: 34, height: 34, borderRadius: 2, border: 'none', background: `linear-gradient(135deg,${RED},${RED2})`, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 16px ${RED}50`, transition: 'transform .2s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heroLuxUp      { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes heroSlideInUp  { from{opacity:0;transform:translateY(56px) skewY(1.2deg)} to{opacity:1;transform:translateY(0) skewY(0deg)} }
        @keyframes heroSlideOutUp { from{opacity:1;transform:translateY(0) skewY(0deg)} to{opacity:0;transform:translateY(-56px) skewY(-1.2deg)} }
        @keyframes heroCardInLeft { from{opacity:0;transform:translateX(-44px) scale(.92)} to{opacity:1;transform:translateX(0) scale(1)} }
        @keyframes cardMorphExpand {
          0%   { clip-path: inset(calc(100% - 480px) calc(100% - 270px) 70px 48px round 10px); transform: scale(1.18); }
          60%  { clip-path: inset(0px 0px 0px 0px round 4px); transform: scale(1.06); }
          100% { clip-path: inset(0px 0px 0px 0px round 0px); transform: scale(1.04); }
        }
      `}</style>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   2. SERVICES SECTION
══════════════════════════════════════════════════════════════ */
const ALL_SERVICES = [
  { id: '01', icon: Hotel,       title: "Hotels",                  tagline: "Comfort, convenience & value",         desc: "Carefully selected hotel options across categories, ensuring comfort, convenience and value for every stay.",                                          tag: "Best Rates", hot: true,  to: "/services", accent: AMBER  },
  { id: '02', icon: Users2,      title: "Group Bookings",          tagline: "Perfect trips for every generation",    desc: "Tour packages thoughtfully designed for adults, kids and elderly travellers with seamless planning.",                                                  tag: "10+ Pax",    hot: false, to: "/services", accent: AMBER2 },
  { id: '03', icon: Train,       title: "Train Travel",            tagline: "Luxury rail holiday experiences",       desc: "Exclusive rail tour holiday packages designed for scenic, comfortable and memorable journeys.",                                                       tag: "Exclusive",  hot: false, to: "/services", accent: RED    },
  { id: '04', icon: Car,         title: "Transfers & Sightseeing", tagline: "Smooth journeys everywhere",            desc: "Grab the best deals on airport transfers, city transfers and guided sightseeing tours.",                                                              tag: "24/7",       hot: false, to: "/services", accent: AMBER  },
  { id: '05', icon: CalendarDays,title: "Event & Conference",      tagline: "Professional event planning",           desc: "Make your event unforgettable with our experienced meeting and conference planning team.",                                                            tag: "Events",     hot: false, to: "/services", accent: AMBER2 },
  { id: '06', icon: Briefcase,   title: "Corporate Bookings",      tagline: "Smart corporate travel solutions",      desc: "City packages and corporate travel bookings with unbeatable deals and business-friendly services.",                                                    tag: "B2B",        hot: false, to: "/services", accent: RED    },
  { id: '07', icon: Crown,       title: "VIP Packages",            tagline: "Luxury crafted for VIP travellers",     desc: "Enjoy premium boutique hotels, luxury resorts and exclusive concierge-style experiences.",                                                            tag: "Luxury",     hot: true,  to: "/services", accent: AMBER  },
]

function ServiceCard({ svc, index, inView }) {
  const [hov, setHov] = useState(false)
  const Icon = svc.icon
  return (
    <article className="relative overflow-hidden cursor-pointer"
      style={{ borderRadius: 6, border: `1px solid ${hov ? svc.accent + '55' : '#E8E8E4'}`, background: '#fff', boxShadow: hov ? `0 32px 64px -16px rgba(15,23,42,.18),0 0 0 1px ${svc.accent}22` : '0 2px 16px -4px rgba(15,23,42,.06)', transform: inView ? (hov ? 'translateY(-8px)' : 'translateY(0)') : 'translateY(32px)', opacity: inView ? 1 : 0, transition: `transform ${hov ? '380ms' : '600ms'} cubic-bezier(.4,0,.2,1),box-shadow 400ms ease,border-color 400ms ease,opacity 600ms ease ${index * 90}ms` }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2.5, background: `linear-gradient(90deg,${RED},${AMBER})`, transform: hov ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 450ms cubic-bezier(.4,0,.2,1)' }} />
      <div className="relative p-5 sm:p-7 flex flex-col h-full">
        <div className="flex items-start justify-between mb-5">
          <div style={{ width: 48, height: 48, borderRadius: 6, background: hov ? svc.accent + '18' : '#F8F7F4', border: `1px solid ${hov ? svc.accent + '40' : '#EEE'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .4s ease' }}>
            <Icon size={20} style={{ color: hov ? svc.accent : GRAY, transition: 'color .4s ease', strokeWidth: 1.6 }} />
          </div>
        </div>

        {/* Card title — h3 scale */}
        <h3 style={{ ...T.h3, color: CHAR, marginBottom: 6 }}>{svc.title}</h3>

        {/* Tagline — italic display font */}
        <p style={{ fontFamily:'var(--f-display)', fontStyle:'italic', fontSize: '0.875rem', fontWeight: 500, color: hov ? svc.accent : GRAY, transition: 'color .35s ease', marginBottom: 14, letterSpacing: '0.01em' }}>{svc.tagline}</p>

        <div style={{ height: 1, background: hov ? `linear-gradient(90deg,${svc.accent}44,transparent)` : '#F1F5F9', marginBottom: 14, transition: 'background .4s ease' }} />

        {/* Body — body scale */}
        <p style={{ ...T.body, color: SLATE, marginBottom: 16, flex: 1 }}>{svc.desc}</p>

        <Link to="/services" className="flex items-center gap-2"
          style={{ ...T.label, color: hov ? svc.accent : '#CBD5E1', transition: 'color .35s ease' }}>
          Learn More
          <ArrowUpRight size={13} style={{ transform: hov ? 'translate(2px,-2px)' : 'translate(0,0)', transition: 'transform .3s ease' }} />
        </Link>
      </div>
    </article>
  )
}

function ServicesPreview() {
  const [ref, inView] = useInView(0.06)
  return (
    <section id="services" ref={ref} style={{ background: CREAM, padding: 'clamp(3rem,8vw,7rem) 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle,#D4D4C8 1px,transparent 1px)`, backgroundSize: '36px 36px', opacity: 0.45, pointerEvents: 'none' }} />
      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-16"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity .7s ease,transform .7s ease' }}>
          <div>
            <SectionLabel>What We Offer</SectionLabel>
            {/* Section headline — h1 scale */}
            <h2 style={{ ...T.h1, color: CHAR, marginBottom: 12 }}>Our Services</h2>
            {/* Lead paragraph — bodyLg scale */}
            <p style={{ ...T.bodyLg, color: SLATE, maxWidth: '50ch' }}>
              Eight pillars of travel expertise - each one designed to make your journey effortless and memorable.
            </p>
          </div>
          <Link to="/services"
            style={{ ...T.label, display: 'inline-flex', alignItems: 'center', gap: 8, background: `linear-gradient(135deg,${RED},${RED2})`, color: '#fff', padding: '14px 28px', borderRadius: 3, textDecoration: 'none', flexShrink: 0, boxShadow: `0 8px 28px -8px ${RED}50` }}>
            View All Services <MoveRight size={15} />
          </Link>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 max-w-6xl">
            {ALL_SERVICES.map((svc, i) => <ServiceCard key={svc.id} svc={svc} index={i} inView={inView} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   3. BRAND VALUES
══════════════════════════════════════════════════════════════ */
const BRAND_STATS = [
  { id: 1, icon: Users,       count: 50,   suffix: 'K+', label: 'Happy Travellers',    sub: 'Families · Solo · Corporate' },
  { id: 2, icon: Handshake,   count: 500,  suffix: '+',  label: 'Global Partners',     sub: 'Agents · Hotels · DMCs' },
  { id: 3, icon: Globe,       count: 1200, suffix: '+',  label: 'Support Points',      sub: 'On-ground worldwide' },
  { id: 4, icon: CheckCircle, count: 98,   suffix: 'K+', label: 'Bookings Delivered',  sub: 'Zero friction, end-to-end' },
  { id: 5, icon: ShieldCheck, count: 100,  suffix: '%',  label: 'Transparent Pricing', sub: 'No hidden fees, ever' },
]
const BRAND_PILLARS = [
  { num: '01', title: 'Bespoke Itineraries', body: 'Every journey is architected around you — your pace, your preferences, your story.' },
  { num: '02', title: 'White-Glove Service', body: 'A dedicated travel consultant accompanies you from first enquiry to safe return.' },
  { num: '03', title: 'Global Reach',        body: 'Over 90 countries, 1,200+ vetted partners, and on-ground support at every waypoint.' },
]

function BrandStatCell({ stat, index, started, isLast }) {
  const count = useCountUp(stat.count, 1800 + index * 150, started)
  const [hov, setHov] = useState(false)
  const Icon = stat.icon
  return (
    <div className="relative flex flex-col items-center text-center px-4 py-6 sm:px-8 sm:py-10 cursor-default transition-colors duration-500"
      style={{ background: hov ? CREAM2 : 'transparent', borderRadius: 12 }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-3 sm:mb-4 transition-all duration-400"
        style={{ border: `1px solid ${hov ? RED : `${AMBER}25`}`, background: hov ? `${RED}15` : 'transparent' }}>
        <Icon size={14} style={{ color: hov ? RED : `${AMBER}88` }} className="transition-colors duration-400" />
      </div>
      {/* Stat number — display font */}
      <div className="flex items-end justify-center leading-none mb-2">
        <span style={{ ...T.stat, color: hov ? AMBER : CHAR, transition: 'color .4s ease', fontVariantNumeric: 'tabular-nums' }}>{count.toLocaleString()}</span>
        <span style={{ fontFamily:'var(--f-display)', fontWeight: 700, fontSize: '1.2rem', paddingBottom: 4, marginLeft: 2, color: hov ? AMBER2 : AMBER, transition: 'color .4s ease' }}>{stat.suffix}</span>
      </div>
      {/* Stat label */}
      <p style={{ ...T.sublabel, color: hov ? CHAR : '#44403C', marginBottom: 4, transition: 'color .4s ease' }}>{stat.label}</p>
      {/* Stat sub — body-sm */}
      <p style={{ ...T.bodySm, color: hov ? AMBER : GRAY, transition: 'color .4s ease' }}>{stat.sub}</p>
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
    if (ref.current) io.observe(ref.current); return () => io.disconnect()
  }, [])
  return (
    <section ref={ref} className="w-full" style={{ background: '#FAFAF9' }}>
      <div className="w-full border-b" style={{ borderColor: '#E7E5E4' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-20">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-4 mb-5">
                <div className="h-px w-10" style={{ background: `linear-gradient(90deg,${AMBER},#E7E5E4)` }} />
                <span style={{ ...T.label, color: GRAY }}>Our Credentials</span>
              </div>
              {/* Section headline */}
              <h2 style={{ ...T.h1, color: CHAR, marginBottom: 20 }}>
                Crafting extraordinary journeys<br />
                <em style={{ fontFamily:'var(--f-display)', color: AMBER, fontStyle: 'italic', fontWeight: 500 }}>since the very first mile.</em>
              </h2>
            </div>
            <div className="flex flex-col lg:max-w-sm xl:max-w-md w-full">
              {BRAND_PILLARS.map(({ num, title, body }) => (
                <div key={num} className="flex gap-5 py-4 group cursor-default" style={{ borderTop: `1px solid ${AMBER}20` }}>
                  <span style={{ ...T.label, color: '#D6D3D1', marginTop: 2, flexShrink: 0 }}>{num}</span>
                  <div>
                    {/* Pillar title — h3 */}
                    <p style={{ ...T.h3, color: CHAR, marginBottom: 6, transition: 'color .3s' }} className="group-hover:text-[#F5A800]">{title}</p>
                    {/* Pillar body — body-sm */}
                    <p style={{ ...T.bodySm, color: GRAY }}>{body}</p>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-7 sm:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          {/* Quote — body italic */}
          <p style={{ fontFamily:'var(--f-display)', fontStyle:'italic', fontSize:'var(--t-body-lg)', color: GRAY, maxWidth: '44ch', lineHeight: 1.75 }}>
            &ldquo;Every journey is a masterpiece when planned with precision, passion, and the finest attention to detail.&rdquo;
          </p>
          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            <Link to="/about" style={{ ...T.label, color: GRAY, borderColor: '#D6D3D1', textDecoration: 'none', padding: '10px 20px', borderRadius: 99, border: '1px solid #D6D3D1' }}
              className="transition-all duration-300 hover:border-[#F5A800] hover:text-[#F5A800]">Discover More</Link>
            <Link to="/contact" className="inline-flex items-center gap-2 transition-all duration-300 hover:brightness-110 hover:scale-[1.03] active:scale-95"
              style={{ ...T.label, color: '#fff', background: `linear-gradient(135deg,${RED},${RED2})`, boxShadow: `0 6px 24px -6px ${RED}55`, textDecoration: 'none', padding: '10px 24px', borderRadius: 99 }}>
              Begin Your Journey <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   4. WHY CHOOSE US
══════════════════════════════════════════════════════════════ */
const WHY_ITEMS = [
  { icon: BadgeCheck,     title: 'Best Rate Guaranteed',     desc: 'We guarantee the absolute lowest rates available online - no price-matching needed. Book with complete confidence.',           stat: '100%', statLabel: 'Rate Match'      },
  { icon: Globe,          title: 'Search & Book Worldwide',  desc: 'Access over 620,000+ destinations, hotels, and experiences globally through our comprehensive booking platform.',             stat: '620K+',statLabel: 'Properties'       },
  { icon: Lock,           title: 'Trusted & Secure Booking', desc: 'Every transaction is fully encrypted and secured. Complete privacy protection on all your personal and payment data.',         stat: '100%', statLabel: 'Secure Checkout'  },
  { icon: HeartHandshake, title: 'Dedicated Travel Expert',  desc: 'A personal consultant is assigned to your journey from first enquiry to final return - always reachable, always caring.',    stat: '24/7', statLabel: 'Support'          },
]

function WhyCard({ icon: Icon, title, desc, stat, statLabel }) {
  const [hov, setHov] = useState(false)
  return (
    <div style={{ background: hov ? CHAR : CREAM, border: `1px solid ${hov ? CHAR : '#E8E8E4'}`, borderRadius: 12, padding: 'clamp(16px,3vw,24px)', transition: 'all .35s ease', cursor: 'default', transform: hov ? 'translateY(-4px)' : 'translateY(0)', boxShadow: hov ? `0 20px 48px -12px rgba(15,23,42,.25)` : 'none' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ width: 48, height: 48, borderRadius: 10, background: hov ? `${AMBER}20` : CREAM2, border: `1px solid ${hov ? AMBER + '40' : '#E8E8E4'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .35s ease' }}>
          <Icon size={20} style={{ color: hov ? AMBER : GRAY, transition: 'color .35s ease' }} />
        </div>
        <div style={{ textAlign: 'right' }}>
          {/* Stat — display font */}
          <p style={{ fontFamily:'var(--f-display)', fontSize: 'clamp(1.3rem,2.5vw,1.6rem)', fontWeight: 700, color: hov ? AMBER : CHAR, lineHeight: 1, transition: 'color .35s ease', letterSpacing: '.02em' }}>{stat}</p>
          <p style={{ ...T.label, color: hov ? AMBER2 : GRAY, transition: 'color .35s ease' }}>{statLabel}</p>
        </div>
      </div>
      {/* Card title — h3 */}
      <h3 style={{ ...T.h3, color: hov ? '#fff' : CHAR, marginBottom: 10, transition: 'color .35s ease' }}>{title}</h3>
      {/* Body — body scale */}
      <p style={{ ...T.body, color: hov ? 'rgba(255,255,255,.72)' : GRAY, transition: 'color .35s ease' }}>{desc}</p>
    </div>
  )
}

function WhyChooseUs() {
  const [ref, inView] = useInView(0.06)
  return (
    <section ref={ref} style={{ background: '#fff', padding: 'clamp(3rem,8vw,7rem) 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${AMBER}14 1px,transparent 1px)`, backgroundSize: '30px 30px', pointerEvents: 'none' }} />
      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(-32px)', transition: 'opacity .8s ease,transform .8s ease' }}>
            <SectionLabel>About Us</SectionLabel>

            {/* Section headline */}
            <h2 style={{ ...T.h1, color: CHAR, marginBottom: '0.75rem' }}>
              Welcome to{' '}
              <em style={{ fontFamily:'var(--f-display)', color: RED, fontStyle: 'italic' }}>Chalo Holidays</em>
            </h2>

            {/* Subheading — h2 italic display */}
            <h3 style={{ fontFamily:'var(--f-display)', fontStyle:'italic', fontSize:'var(--t-h2)', color: AMBER, fontWeight: 500, marginBottom: '1rem', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
              Beyond Travel. We Create Experiences.
            </h3>

            {/* Body paragraph — bodyLg */}
            <p style={{ ...T.bodyLg, color: SLATE, maxWidth: '48ch', marginBottom: '1.5rem' }}>
              We are a team of travel experts - trusted, responsive and detail-driven. With deep expertise in European travel and strong global capabilities, we go beyond simply meeting your needs - we collaborate with you to deliver seamless and successful journeys.
            </p>

            {/* Blockquote — display italic */}
            <blockquote style={{ borderLeft: `3px solid ${RED}`, paddingLeft: 20, marginBottom: 32 }}>
              <p style={{ fontFamily:'var(--f-display)', fontStyle:'italic', fontSize:'var(--t-h3)',fontWeight: 800, color: CHAR, lineHeight: 1.7, marginBottom: 8 }}>
                "We do not just book trips - we architect memories that last a lifetime."
              </p>
              <cite style={{ ...T.label, color: GRAY, fontStyle: 'normal' }}>— Founder, Chalo Holidays</cite>
            </blockquote>

            <Link to="/about" style={{ ...T.label, display: 'inline-flex', alignItems: 'center', gap: 8, background: `linear-gradient(135deg,${RED},${RED2})`, color: '#fff', padding: '14px 28px', borderRadius: 3, textDecoration: 'none', boxShadow: `0 8px 28px -8px ${RED}55` }}>
              Explore More <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
            style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(32px)', transition: 'opacity .8s ease .15s,transform .8s ease .15s',  fontWeight: '700' }}>
            {WHY_ITEMS.map(item => <WhyCard key={item.title} {...item} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   5. DESTINATIONS PREVIEW
══════════════════════════════════════════════════════════════ */
const DEST_REGIONS = [
  { num: '01', name: 'Western Europe',   },
  { num: '02', name: 'Central Europe', },
  { num: '03', name: 'Northern Europe',  },
  { num: '04', name: 'Eastern Europe',   },
]

const colA_base = [
  { src: LondonImg,     alt: 'London UK',       location: 'London, United Kingdom',  title: 'Classic London',      desc: 'Royal heritage, red buses, and timeless culture around every corner.' },
  { src: InterlakenImg, alt: 'Swiss Alps',       location: 'Interlaken, Switzerland', title: 'Swiss Alpine Escape', desc: 'Snowy peaks, turquoise lakes, and breathtaking mountain landscapes.' },
  { src: BarselonaImg,  alt: 'Barcelona Spain',  location: 'Barcelona, Spain',        title: 'Vibrant Barcelona',   desc: 'Gaudí masterpieces, tapas culture, and golden Mediterranean beaches.' },
  { src: OsloImg,       alt: 'Oslo Norway',      location: 'Oslo, Norway',            title: 'Nordic Oslo',         desc: 'Fjord views, Viking heritage, and Scandinavian charm.' },
]
const colB_base = [
  { src: ParisImg,  alt: 'Paris France',   location: 'Paris, France',   title: 'Romantic Paris',  desc: 'The Eiffel Tower, café culture, and timeless Parisian charm.' },
  { src: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=2400&q=90&auto=format&fit=crop', alt: 'Rome Italy', location: 'Rome, Italy', title: 'Eternal Rome', desc: 'Ancient ruins, Vatican splendour, and the world\'s finest gelato.' },
  { src: BerlinImg, alt: 'Berlin Germany', location: 'Berlin, Germany', title: 'Dynamic Berlin', desc: 'History, street art, world-class museums and electric nightlife.' },
  { src: WarsawImg, alt: 'Warsaw Poland',  location: 'Warsaw, Poland',  title: 'Rising Warsaw',  desc: 'A beautifully rebuilt old town beside a bold modern skyline.' },
]
const destColA = [...colA_base, ...colA_base]
const destColB = [...colB_base, ...colB_base]

function DestRegionRow({ region }) {
  const [hov, setHov] = useState(false)
  return (
    <div className="relative cursor-pointer select-none" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div className="h-px w-full mb-3" style={{ background: hov ? `linear-gradient(90deg,${RED},transparent)` : '#E2E8F0', transition: 'background 400ms ease' }} />
      <div className="flex items-center justify-between pb-3">
        <span style={{ fontFamily:'var(--f-heading)', fontSize: 'clamp(1.2rem,3.5vw,2rem)', fontWeight: 600, color: hov ? CHAR : '#94A3B8', transition: 'color 350ms ease' }}>{region.name}</span>
        <div className="flex items-center gap-3">
          {/* <span style={{ ...T.body, color: hov ? SLATE : '#CBD5E1', transition: 'color 300ms ease' }}>({region.count})</span> */}
          <div style={{ opacity: hov ? 1 : 0, transform: hov ? 'translate(0,0)' : 'translate(-6px,6px)', transition: 'opacity 300ms ease,transform 300ms ease' }}>
            <ArrowUpRight size={16} style={{ color: RED }} />
          </div>
        </div>
      </div>
      <div style={{ height: 1.5, background: `linear-gradient(90deg,${RED},${AMBER})`, transform: hov ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 400ms cubic-bezier(.4,0,.2,1)', marginTop: -1, borderRadius: 2 }} />
    </div>
  )
}

function DestImageTile({ img }) {
  const [hov, setHov] = useState(false)
  return (
    <div className="relative overflow-hidden flex-shrink-0 cursor-pointer w-full" style={{ borderRadius: 12, aspectRatio: '3/4' }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <img src={img.src} alt={img.alt} className="w-full h-full object-cover" style={{ transform: hov ? 'scale(1.08)' : 'scale(1)', transition: 'transform 700ms cubic-bezier(.4,0,.2,1)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg,rgba(15,23,42,.65) 0%,transparent 55%)' }} />
      <div className="absolute inset-0 flex flex-col justify-end"
        style={{ background: `linear-gradient(0deg,${CHAR}F0 0%,${CHAR}CC 50%,rgba(15,23,42,.30) 100%)`, opacity: hov ? 1 : 0, transform: hov ? 'translateY(0)' : 'translateY(10px)', transition: 'opacity 350ms ease,transform 350ms ease' }}>
        <div className="p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <MapPin size={11} style={{ color: AMBER2, flexShrink: 0 }} />
            <span style={{ ...T.label, color: AMBER2 }}>{img.location}</span>
          </div>
          {/* Tile title — h3 */}
          <h3 style={{ ...T.h3, color: '#fff', marginBottom: 8 }}>{img.title}</h3>
          {/* Tile desc — body-sm */}
          <p style={{ ...T.bodySm, color: 'rgba(255,255,255,.68)', maxWidth: '28ch', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{img.desc}</p>
          <div className="flex items-center gap-1 mt-2" style={{ color: AMBER2 }}>
            <span style={{ ...T.label, fontSize: 10 }}>Explore</span>
            <ArrowUpRight size={11} />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3" style={{ opacity: hov ? 0 : 1, transition: 'opacity 250ms ease' }}>
        <div className="flex items-center gap-1">
          <MapPin size={9} style={{ color: AMBER2 }} />
          <span style={{ ...T.bodySm, color: 'rgba(255,255,255,.75)' }}>{img.location}</span>
        </div>
      </div>
    </div>
  )
}

function DestAutoScrollCol({ images, speed, reversed, className }) {
  const trackRef = useRef(null); const posRef = useRef(0); const rafRef = useRef(0)
  useEffect(() => {
    const track = trackRef.current; if (!track) return
    const half = track.scrollHeight / 2
    const tick = () => {
      posRef.current += reversed ? -speed : speed
      if (posRef.current >= half) posRef.current -= half
      if (posRef.current < 0) posRef.current += half
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
    <section id="destinations" className="relative py-16 sm:py-24 overflow-hidden" style={{ background: WHITE }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(#F1F5F9 1px,transparent 1px),linear-gradient(90deg,#F1F5F9 1px,transparent 1px)`, backgroundSize: '80px 80px', opacity: 0.35 }} />
      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-20 items-start">
          <div className="flex flex-col">
            <SectionLabel>Handpicked Regions</SectionLabel>
            {/* Section headline */}
            <h2 style={{ ...T.h1, color: CHAR, marginBottom: 16 }}>Destinations</h2>
            {/* Lead paragraph */}
            <p style={{ ...T.bodyLg, color: SLATE, maxWidth: '42ch', marginBottom: 32 }}>
              With each destination handpicked by our experts, your journey becomes more than a place - it becomes an experience of beauty, culture, and moments that stay with you.
            </p>
            <nav className="mb-8">{DEST_REGIONS.map(r => <DestRegionRow key={r.num} region={r} />)}<div className="h-px w-full mt-1" style={{ background: '#E2E8F0' }} /></nav>
            <Link to="/destinations" className="inline-flex items-center gap-2.5 transition-all duration-200 hover:opacity-90 active:scale-95 self-start"
              style={{ ...T.label, background: `linear-gradient(135deg,${RED},${RED2})`, color: '#fff', padding: '14px 24px', borderRadius: 3, boxShadow: `0 8px 28px -8px ${RED}55`, textDecoration: 'none' }}>
              Explore Destinations <ChevronRight size={15} />
            </Link>
          </div>
          <div className="relative" style={{ height: 'clamp(400px,65vh,680px)' }}>
            <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none" style={{ height: 60, background: 'linear-gradient(180deg,#fff 0%,transparent 100%)' }} />
            <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none" style={{ height: 60, background: 'linear-gradient(0deg,#fff 0%,transparent 100%)' }} />
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

/* ═══════════════════════════════════════════════════════════
   6. PARTNERS MARQUEE
══════════════════════════════════════════════════════════════ */
if (typeof document !== 'undefined' && !document.getElementById('partners-marquee-style')) {
  const s = document.createElement('style'); s.id = 'partners-marquee-style'
  s.textContent = `@keyframes partners-marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`
  document.head.appendChild(s)
}

const PARTNERS = [
  { name: 'Disneyland',        logo: DisneyLogo       }, { name: 'Starwood',   logo: StarwoodLogo   },
  { name: 'Rail Europe',       logo: RailEuropeLogo   }, { name: 'IHG',        logo: IhgLogo        },
  { name: 'Hyatt',             logo: HyattLogo        }, { name: 'Hilton',     logo: HiltonLogo     },
  { name: 'Accor',             logo: AccorLogo        }, { name: 'Four Seasons',logo: FourSeasonsLogo},
  { name: 'Jumeirah',          logo: JumeirahLogo     }, { name: 'Kempinski',  logo: KempinskiLogo  },
  { name: 'Mandarin Oriental', logo: MandarinLogo     }, { name: 'Melia',      logo: MeliaLogo      },
  { name: 'Radisson',          logo: RadissonLogo     }, { name: 'Rosewood',   logo: RosewoodLogo   },
  { name: 'Wyndham',           logo: WyndhamLogo      }, { name: 'Global',     logo: GlobalLogo     },
]

function MarqueeCell({ name, logo }) {
  const [hov, setHov] = useState(false)
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, width: 'clamp(140px,calc(100vw/4),220px)', minWidth: 140, height: 130, cursor: 'pointer', background: hov ? WHITE : CREAM2, borderRight: '1px solid #CBBFA8', borderTop: '1px solid #CBBFA8', borderBottom: '1px solid #CBBFA8', boxSizing: 'border-box', transition: 'background .35s ease', flexShrink: 0 }}>
      <div style={{ position: 'absolute', inset: 0, border: `1.5px solid ${hov ? AMBER : 'transparent'}`, pointerEvents: 'none', transition: 'border-color .35s ease', zIndex: 2 }} />
      <div style={{ width: '75%', height: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px', boxSizing: 'border-box' }}>
        <img src={logo} alt={name} style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain', display: 'block', filter: hov ? 'grayscale(0%) brightness(1)' : 'grayscale(100%) brightness(0.75) contrast(1.15)', transform: hov ? 'scale(1.06)' : 'scale(1)', transition: 'filter .4s ease,transform .4s ease' }} />
      </div>
      {/* Partner name — label */}
      <span style={{ ...T.label, color: hov ? AMBER : '#B0A090', transition: 'color .35s ease' }}>{name}</span>
    </div>
  )
}

function PartnersMarqueeStrip({ items, inView }) {
  const [paused, setPaused] = useState(false)
  const doubled = [...items, ...items]
  return (
    <div style={{ position: 'relative', overflow: 'hidden', border: '1px solid #CBBFA8', opacity: inView ? 1 : 0, transition: 'opacity .7s ease .15s' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 60, zIndex: 10, pointerEvents: 'none', background: `linear-gradient(90deg,${CREAM2},transparent)` }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 60, zIndex: 10, pointerEvents: 'none', background: `linear-gradient(270deg,${CREAM2},transparent)` }} />
      <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
        style={{ display: 'flex', width: 'max-content', animation: 'partners-marquee 32s linear infinite', animationPlayState: paused ? 'paused' : 'running' }}>
        {doubled.map(({ name, logo }, i) => <MarqueeCell key={`${name}-${i}`} name={name} logo={logo} />)}
      </div>
    </div>
  )
}

function GlobalNetwork() {
  const [ref, inView] = useInView(0.08)
  return (
    <section ref={ref} style={{ background: CREAM2, padding: 'clamp(3.5rem,9vw,7rem) 0', position: 'relative', overflow: 'hidden' }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 48px', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'all .8s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 1.5, background: `linear-gradient(90deg,transparent,${AMBER})`, borderRadius: 2 }} />
            <span style={{ ...T.label, color: AMBER }}>Preferred Partners</span>
            <div style={{ width: 40, height: 1.5, background: `linear-gradient(90deg,${AMBER},transparent)`, borderRadius: 2 }} />
          </div>
          {/* Section headline */}
          <h2 style={{ ...T.h1, color: CHAR, fontWeight: 400, marginBottom: 10 }}>
            The World's Finest{' '}
            <em style={{ fontFamily:'var(--f-display)', color: AMBER, fontStyle: 'italic', fontWeight: 500 }}>Brands</em>
          </h2>
          {/* Subline — italic display */}
          <p style={{ fontFamily:'var(--f-display)', fontStyle:'italic', fontSize:'var(--t-body)', color: GRAY }}>
            Exclusive privileges and preferred rates for our distinguished clients
          </p>
        </div>
        <PartnersMarqueeStrip items={PARTNERS} inView={inView} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginTop: 32, opacity: inView ? 1 : 0, transition: 'opacity .7s ease .3s' }}>
          <div style={{ width: 1, height: 36, background: `linear-gradient(to bottom,transparent,${AMBER}70,transparent)` }} />
          <p style={{ fontFamily:'var(--f-display)', fontStyle:'italic', fontSize:'var(--t-body-sm)', color: GRAY }}>Preferred rates & exclusive privileges across every brand</p>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   7. TESTIMONIALS
══════════════════════════════════════════════════════════════ */
const TESTIMONIALS = [
  { id: 1,  name: 'Rahul Mehta',    role: 'Travel Agent',             location: 'Ahmedabad, India',       rating: 5, service: 'B2B Partnership',    text: 'Working with this team has streamlined our Europe bookings completely. Fast responses, competitive pricing, and zero operational issues.', avatar: 'RM', accent: AMBER,  destination: 'Europe' },
  { id: 2,  name: 'Emma Collins',   role: 'Tour Operator',            location: 'London, UK',             rating: 5, service: 'Ground Handling',    text: 'Their on-ground support across Europe is exceptional. Transfers, hotels, and local coordination are always handled with precision.',   avatar: 'EC', accent: CHAR,   destination: 'Europe' },
  { id: 3,  name: 'Amit Shah',      role: 'Travel Consultant',        location: 'Mumbai, India',          rating: 5, service: 'Group Bookings',     text: 'Managing large group departures has become effortless. The backend coordination and instant confirmations save us huge time.',           avatar: 'AS', accent: AMBER2, destination: 'Europe' },
  { id: 4,  name: 'Marco Rossi',    role: 'DMC Partner',              location: 'Rome, Italy',            rating: 5, service: 'B2B Operations',     text: 'A reliable global partner. Communication is clear, payments are smooth, and execution on the ground is always consistent.',              avatar: 'MR', accent: AMBER,  destination: 'Italy'  },
  { id: 5,  name: 'Neha Kapoor',    role: 'Agency Owner',             location: 'Delhi, India',           rating: 5, service: 'Hotel Booking',      text: 'Their hotel inventory and rates give us a strong competitive edge. Clients are happy, and margins are better.',                       avatar: 'NK', accent: RED,    destination: 'Europe' },
  { id: 6,  name: 'Daniel Schmidt', role: 'Corporate Travel Manager', location: 'Berlin, Germany',        rating: 5, service: 'Corporate Travel',   text: 'Consistent service quality across multiple European cities. Ideal for handling corporate travel requirements.',                          avatar: 'DS', accent: AMBER2, destination: 'Germany'},
  { id: 7,  name: 'Sophia Laurent', role: 'Luxury Travel Planner',    location: 'Paris, France',          rating: 5, service: 'Luxury Packages',    text: 'Their curated itineraries and premium hotel partnerships make it easy to serve high-end clients.',                                   avatar: 'SL', accent: AMBER,  destination: 'France' },
  { id: 8,  name: 'Vikram Iyer',    role: 'Wholesale Partner',        location: 'Bangalore, India',       rating: 5, service: 'Bulk Bookings',      text: 'Handling volume bookings is smooth and efficient. Pricing and turnaround time are consistently strong.',                               avatar: 'VI', accent: RED,    destination: 'Europe' },
  { id: 9,  name: 'Katarina Novak', role: 'Inbound Specialist',       location: 'Prague, Czech Republic', rating: 5, service: 'Local Coordination', text: 'Excellent coordination across multiple countries. Their network and execution are highly dependable.',                                 avatar: 'KN', accent: AMBER2, destination: 'Central Europe' },
  { id: 10, name: 'Ahmed Khan',     role: 'Travel Distributor',       location: 'Dubai, UAE',             rating: 5, service: 'B2B Distribution',   text: 'A strong and reliable partner for Europe products. Great support team and seamless booking process.',                                  avatar: 'AK', accent: AMBER,  destination: 'Europe' },
]

if (typeof document !== 'undefined' && !document.getElementById('testimonial-marquee-style')) {
  const s = document.createElement('style'); s.id = 'testimonial-marquee-style'
  s.textContent = `@keyframes tMarqueeLeft{from{transform:translateX(0)}to{transform:translateX(-50%)}}`
  document.head.appendChild(s)
}

function TestimonialMarqueeCard({ t }) {
  const [hov, setHov] = useState(false)
  const chipColor  = t.accent
  const chipBg     = `${t.accent}18`
  const chipBorder = `${t.accent}40`
  const topGrad    = t.accent === RED ? `linear-gradient(90deg,${RED},${AMBER})` : `linear-gradient(90deg,${AMBER},${AMBER2})`

  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ flexShrink: 0, width: 310, background: hov ? WHITE : CREAM, border: `1px solid ${hov ? AMBER + '55' : '#DDD4C4'}`, borderRadius: 6, padding: '20px 24px', position: 'relative', overflow: 'hidden', cursor: 'default', transition: 'background .3s,border-color .3s,transform .3s,box-shadow .3s', transform: hov ? 'translateY(-4px)' : 'translateY(0)', boxShadow: hov ? `0 20px 48px -12px ${AMBER}28` : '0 2px 12px -4px rgba(15,23,42,.06)' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2.5, background: topGrad, transform: hov ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform .4s cubic-bezier(.4,0,.2,1)', borderRadius: '2px 2px 0 0' }} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ ...T.label, padding: '3px 8px', borderRadius: 2, background: chipBg, color: chipColor, border: `1px solid ${chipBorder}` }}>{t.service}</span>
        <StarRow count={t.rating} accent={AMBER} />
      </div>
      {/* Review text — display italic */}
      <p style={{ fontFamily:'var(--f-display)', fontStyle:'italic', fontSize:'var(--t-body)', lineHeight: 1.75, color: hov ? CHAR : GRAY, margin: '0 0 14px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', transition: 'color .3s' }}>&ldquo;{t.text}&rdquo;</p>
      <div style={{ height: 1, background: hov ? `linear-gradient(90deg,${AMBER}55,transparent)` : `linear-gradient(90deg,#DDD4C4,transparent)`, margin: '0 0 14px', transition: 'background .3s' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily:'var(--f-display)', fontSize: 12, fontWeight: 700, background: chipBg, border: `1.5px solid ${chipBorder}`, color: chipColor }}>{t.avatar}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Name — h3 */}
          <p style={{ fontFamily:'var(--f-heading)', fontSize: '0.9rem', fontWeight: 600, color: CHAR, lineHeight: 1.2, margin: '0 0 2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.name}</p>
          {/* Role/location — body-sm */}
          <p style={{ ...T.bodySm, color: GRAY, margin: 0 }}>{t.role} · {t.location}</p>
        </div>
        <span style={{ ...T.label, padding: '3px 8px', borderRadius: 2, flexShrink: 0, background: chipBg, color: chipColor, border: `1px solid ${chipBorder}` }}>{t.destination}</span>
      </div>
    </div>
  )
}

function TestimonialMarqueeBlock({ inView }) {
  const [paused, setPaused] = useState(false)
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS]
  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: CREAM2, borderRadius: 8, border: `1px solid ${AMBER}28`, padding: '28px 0', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity .7s ease .15s,transform .7s ease .15s' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: `radial-gradient(${AMBER}22 1px,transparent 1px)`, backgroundSize: '32px 32px', opacity: .5 }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2.5, background: `linear-gradient(90deg,transparent,${RED} 20%,${AMBER} 50%,${AMBER2} 80%,transparent)`, borderRadius: 2 }} />
      <div style={{ position: 'absolute', inset: '0 auto 0 0', width: 60, zIndex: 2, pointerEvents: 'none', background: `linear-gradient(90deg,${CREAM2},transparent)` }} />
      <div style={{ position: 'absolute', inset: '0 0 0 auto', width: 60, zIndex: 2, pointerEvents: 'none', background: `linear-gradient(270deg,${CREAM2},transparent)` }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 24px', marginBottom: 20, position: 'relative', zIndex: 3 }}>
        <div style={{ height: 1.5, width: 24, background: `linear-gradient(90deg,${RED},${AMBER})`, borderRadius: 2 }} />
        <span style={{ ...T.label, color: AMBER }}>Voices From the Journey</span>
        <div style={{ height: 1, flex: 1, background: `linear-gradient(90deg,${AMBER}30,transparent)` }} />
      </div>
      <div style={{ overflow: 'hidden', width: '100%' }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div style={{ display: 'flex', gap: 14, width: 'max-content', animation: 'tMarqueeLeft 45s linear infinite', animationPlayState: paused ? 'paused' : 'running' }}>
          {doubled.map((t, i) => <TestimonialMarqueeCard key={`${t.id}-${i}`} t={t} />)}
        </div>
      </div>
    </div>
  )
}

function TestimonialsPreview() {
  const [sectionRef, inView] = useInView(0.06)
  return (
    <section ref={sectionRef} style={{ position: 'relative', padding: 'clamp(3.5rem,9vw,7rem) 0', overflow: 'hidden', background: WHITE }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: `radial-gradient(circle,#E8E4DC 1px,transparent 1px)`, backgroundSize: '40px 40px', opacity: .55 }} />
      <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 clamp(1rem,5vw,3rem)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 40, opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 700ms ease,transform 700ms ease' }}>
          <SectionLabel>Traveller Stories</SectionLabel>
          {/* Section headline */}
          <h2 style={{ ...T.h1, color: CHAR, marginBottom: 12 }}>What Our Guests Say</h2>
          {/* Lead paragraph */}
          <p style={{ ...T.bodyLg, color: SLATE, maxWidth: '48ch' }}>
            Real journeys. Real words. Every review here is from a traveller who trusted us - and came back for more.
          </p>
        </div>
        <div style={{ marginBottom: 36 }}><TestimonialMarqueeBlock inView={inView} /></div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', paddingTop: 32, borderTop: `1px solid ${AMBER}25`, opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 700ms ease 600ms,transform 700ms ease 600ms' }}>
          <p style={{ ...T.body, color: SLATE, maxWidth: '44ch' }}>
            Join thousands of satisfied travellers who have made us their trusted partner for every journey.
          </p>
          <Link to="/testimonials" style={{ ...T.label, display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 28px', borderRadius: 3, textDecoration: 'none', background: `linear-gradient(135deg,${RED},${RED2})`, color: '#fff', boxShadow: `0 8px 28px -8px ${RED}66` }}>
            Read All Reviews <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   HOMEPAGE ASSEMBLY
══════════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <WhyChooseUs />
      <ServicesPreview />
      <DestinationsPreview />
      <BrandValues />
      <TestimonialsPreview />
      <GlobalNetwork />
      <Footer />
    </div>
  )
}