'use client'
import { useState, useRef, useEffect, useMemo, useCallback } from "react"
import {
  MapPin, ArrowUpRight, ChevronDown, Search, X,
  ChevronRight, Globe, Waves, Mountain, Building2, Plane,
  Sun, Utensils, Camera, Compass, Users, ArrowRight,
  Phone, Star, ChevronLeft, Calendar, Clock
} from "lucide-react"

import Navbar          from '../components/common/Navbar'
import Footer          from '../components/common/Footer'
import DestinationHeroImg from '../assets/destination/destination-page.jpg'
import DestinationImg     from '../assets/destination/destination-page.webp'

import {
  ALL_DESTINATIONS,
  REGION_META,
  FLAG_ICONS,
  CAT_COLORS,
  RED, RED2, G, G2, G3, INK, PARCH, CARD, SL, SL2, BR, BR2,
} from '../data/destinations'

/* ══════════════════════════════════════════════════════════
   LUXURY TYPOGRAPHY SYSTEM — identical to AboutPage
   ─────────────────────────────────────────────────────────
   DISPLAY  : Cormorant Garamond — hero titles, quotes
   HEADING  : Playfair Display   — section h2 / h3
   BODY     : Jost               — all paragraphs
   LABEL    : Montserrat         — uppercase micro-labels
══════════════════════════════════════════════════════════ */

/* ── inject fonts once ── */
if (typeof document !== 'undefined' && !document.getElementById('luxury-fonts')) {
  const l = document.createElement('link')
  l.id   = 'luxury-fonts'
  l.rel  = 'stylesheet'
  l.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=Jost:wght@300;400;500;600&family=Montserrat:wght@400;500;600;700&display=swap'
  document.head.appendChild(l)
}

/* ── inject CSS vars once ── */
if (typeof document !== 'undefined' && !document.getElementById('luxury-vars')) {
  const s = document.createElement('style')
  s.id = 'luxury-vars'
  s.textContent = `
    :root {
      --f-display : 'Cormorant Garamond', 'Georgia', serif;
      --f-heading : 'Playfair Display', 'Georgia', serif;
      --f-body    : 'Jost', 'Helvetica Neue', sans-serif;
      --f-label   : 'Montserrat', sans-serif;

      --t-display : clamp(3rem, 9vw, 7.2rem);
      --t-h1      : clamp(2.4rem, 5.5vw, 4.2rem);
      --t-h2      : clamp(1.55rem, 2.8vw, 2.2rem);
      --t-h3      : clamp(1.05rem, 1.8vw, 1.25rem);
      --t-body-lg : 1.0625rem;
      --t-body    : 0.9375rem;
      --t-body-sm : 0.8125rem;
      --t-label   : 0.625rem;
      --t-stat    : clamp(1.8rem, 3.5vw, 2.6rem);

      --ls-display : -0.025em;
      --ls-heading : -0.02em;
      --ls-label   : 0.22em;
      --ls-sublabel: 0.14em;

      --lh-display : 0.9;
      --lh-heading : 1.05;
      --lh-body    : 1.85;
      --lh-body-tight: 1.55;
    }
  `
  document.head.appendChild(s)
}

/* ── Shared type style objects — same as AboutPage & ServicesPage ── */
const T = {
  display : { fontFamily:"'Cormorant Garamond','Georgia',serif", fontSize:'clamp(3rem,9vw,7.2rem)',       letterSpacing:'-0.025em', lineHeight:0.9,    fontWeight:700 },
  h1      : { fontFamily:"'Playfair Display','Georgia',serif",   fontSize:'clamp(2.4rem,5.5vw,4.2rem)',  letterSpacing:'-0.02em',  lineHeight:1.05,   fontWeight:700 },
  h2      : { fontFamily:"'Playfair Display','Georgia',serif",   fontSize:'clamp(1.55rem,2.8vw,2.2rem)', letterSpacing:'-0.02em',  lineHeight:1.05,   fontWeight:600 },
  h3      : { fontFamily:"'Playfair Display','Georgia',serif",   fontSize:'clamp(1.05rem,1.8vw,1.25rem)',letterSpacing:'-0.01em',  lineHeight:1.25,   fontWeight:600 },
  bodyLg  : { fontFamily:"'Jost','Helvetica Neue',sans-serif",   fontSize:'1.0625rem',                   lineHeight:1.85,           fontWeight:300 },
  body    : { fontFamily:"'Jost','Helvetica Neue',sans-serif",   fontSize:'0.9375rem',                   lineHeight:1.85,           fontWeight:300 },
  bodySm  : { fontFamily:"'Jost','Helvetica Neue',sans-serif",   fontSize:'0.8125rem',                   lineHeight:1.55,           fontWeight:400 },
  label   : { fontFamily:"'Montserrat',sans-serif",              fontSize:'0.625rem',                    letterSpacing:'0.22em',    textTransform:'uppercase', fontWeight:700 },
  sublabel: { fontFamily:"'Montserrat',sans-serif",              fontSize:'0.625rem',                    letterSpacing:'0.14em',    textTransform:'uppercase', fontWeight:600 },
  stat    : { fontFamily:"'Cormorant Garamond','Georgia',serif",  fontSize:'clamp(1.8rem,3.5vw,2.6rem)',  letterSpacing:'-0.03em',   lineHeight:1,      fontWeight:700 },
}

/* ─────────────────────────────────────────────────────────────────────────────
   CONSTANTS & HELPERS
───────────────────────────────────────────────────────────────────────────── */
const ICON_MAP = { Sun, Utensils, Camera, Compass, Users }

function useInView(threshold = 0.06) {
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

function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  )
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return width
}

/* Shared section label atom */
function SectionLabel({ color = G, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
      <div style={{ width: 26, height: 1.5, background: color, borderRadius: 2, flexShrink: 0 }} />
      <span style={{ ...T.label, color }}>{children}</span>
    </div>
  )
}

/* Shared section heading atom — Playfair h1 */
function SectionHeading({ children, light = false, style: extra = {} }) {
  return (
    <h2 style={{ ...T.h1, color: light ? '#fff' : INK, ...extra }}>
      {children}
    </h2>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   1. HERO
───────────────────────────────────────────────────────────────────────────── */
function Hero() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setTimeout(() => setLoaded(true), 80) }, [])

  return (
    <section style={{ position: 'relative', minHeight: '80vh', background: INK, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${DestinationHeroImg})`, backgroundSize: 'cover', backgroundPosition: 'center 30%', backgroundRepeat: 'no-repeat', transform: loaded ? 'scale(1.06)' : 'scale(1.0)', transition: 'transform 14s ease', filter: 'brightness(0.88) saturate(1.1)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(125deg,rgba(8,6,2,.97) 0%,rgba(8,6,2,.78) 40%,rgba(8,6,2,.22) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg,rgba(8,6,2,1) 0%,rgba(8,6,2,.55) 15%,transparent 45%)' }} />
      {/* Amber brand accent line */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: `linear-gradient(180deg,transparent,${G} 20%,${G2} 80%,transparent)` }} />

      <div style={{ position: 'relative', zIndex: 3, flex: 1, display: 'flex', alignItems: 'center', padding: 'clamp(6rem,14vh,9rem) clamp(1.5rem,6vw,6rem) 4rem' }}>
        <div style={{ maxWidth: 820, opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(32px)', transition: 'opacity 1.1s ease .1s, transform 1.1s ease .1s' }}>

          {/* Eyebrow — Montserrat label */}
          <SectionLabel color={G}>Premium Travel Collection</SectionLabel>

          {/* Hero display title — Cormorant Garamond */}
          <h1 style={{ ...T.display, color: '#fff', marginBottom: 24 }}>
            Discover<br />
            <em style={{ fontStyle: 'italic', color: G }}>Your Journey</em>
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 22 }}>
            <MapPin size={11} style={{ color: G2 }} />
            <span style={{ ...T.sublabel, color: 'rgba(255,255,255,.38)' }}>Worldwide Destinations</span>
          </div>

          {/* Hero subline — Jost bodyLg */}
          <p style={{ ...T.bodyLg, color: 'rgba(255,255,255,.48)', maxWidth: '46ch', marginBottom: 44 }}>
            Explore handpicked destinations across the world — from iconic cities to hidden gems. Your perfect journey starts here.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   2. INTRO SECTION
───────────────────────────────────────────────────────────────────────────── */
function IntroSection() {
  const [ref, inView] = useInView(0.06)
  const w = useWindowWidth()
  const isMobile = w < 768

  return (
    <section ref={ref} style={{ background: PARCH, padding: 'clamp(4rem,8vw,6.5rem) 0', borderTop: `1px solid ${BR}` }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(1rem,5vw,5rem)', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))', gap: 'clamp(2.5rem,6vw,5rem)', alignItems: 'center' }}>

        {/* Image */}
        <div style={{ position: 'relative', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(-36px)', transition: 'opacity .9s ease, transform .9s ease' }}>
          <div style={{ position: 'relative', zIndex: 1, borderRadius: 2, overflow: 'hidden', height: isMobile ? '280px' : 'clamp(420px, 55vw, 650px)', background: PARCH }}>
            <img src={DestinationImg} alt="Chalo Holiday — explore the world" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', display: 'block' }} />
          </div>
        </div>

        {/* Text */}
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(36px)', transition: 'opacity .9s ease .15s, transform .9s ease .15s' }}>

          {/* Eyebrow — Montserrat label */}
          <SectionLabel color={G}>About Our Collection</SectionLabel>

          {/* Heading — Playfair h1 */}
          <SectionHeading style={{ marginBottom: 24 }}>
            Where every journey becomes<br />
            <em style={{ fontFamily:"'Cormorant Garamond','Georgia',serif", color: G, fontStyle: 'italic', fontWeight: 500 }}>a cherished story.</em>
          </SectionHeading>

          <div style={{ width: 64, height: 2, background: `linear-gradient(90deg,${G},${G2})`, marginBottom: 24, borderRadius: 1 }} />

          {/* Body paragraphs — Jost bodyLg */}
          <p style={{ ...T.bodyLg, color: SL, marginBottom: 16 }}>
            At <strong style={{ fontWeight: 600, color: INK }}>Chalo Holidays</strong>, we believe that travel is more than a destination — it is a transformative experience. Our curated collection of European escapes spans 20 countries, handpicked by our expert consultants.
          </p>
          <p style={{ ...T.bodyLg, color: SL, marginBottom: 36 }}>
            From the fjords of Norway to the sun-drenched Amalfi Coast, from fairy-tale Prague to the eternal streets of Rome — we craft bespoke itineraries tailored precisely to your pace, your passions and your budget.
          </p>

          <a
            href="#destinations"
            onClick={e => { e.preventDefault(); document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' }) }}
            style={{ ...T.label, display: 'inline-flex', alignItems: 'center', gap: 8, background: `linear-gradient(135deg,${RED},${RED2})`, color: '#fff', padding: '14px 28px', borderRadius: 3, textDecoration: 'none', boxShadow: `0 8px 28px -6px ${RED}44` }}
          >
            Explore All Destinations <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   3. TOP DESTINATIONS CAROUSEL
───────────────────────────────────────────────────────────────────────────── */
function TopDestinationsCarousel({ onFilter }) {
  const [ref, inView] = useInView(0.05)
  const [paused, setPaused] = useState(false)
  const carouselDests = ALL_DESTINATIONS.filter(d => d.hot)
  const doubled = [...carouselDests, ...carouselDests]

  return (
    <section ref={ref} style={{ background: '#ffffff', padding: 'clamp(3.5rem,7vw,5.5rem) 0' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(1rem,5vw,5rem)' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48, opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'opacity .7s, transform .7s' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 12 }}>
            <div style={{ width: 28, height: 1.5, background: `linear-gradient(90deg,transparent,${G})`, borderRadius: 2 }} />
            <span style={{ ...T.label, color: G }}>Handpicked for You</span>
            <div style={{ width: 28, height: 1.5, background: `linear-gradient(90deg,${G},transparent)`, borderRadius: 2 }} />
          </div>
          {/* Section heading — Playfair h1 */}
          <SectionHeading>
            Top{' '}
            <em style={{ fontFamily:"'Cormorant Garamond','Georgia',serif", color: G, fontStyle: 'italic', fontWeight: 500 }}>Destinations</em>
          </SectionHeading>
        </div>

        <style>{`
          @keyframes marqueeScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .marquee-track { display: flex; gap: 28px; width: max-content; animation: marqueeScroll 28s linear infinite; }
          .marquee-track.paused { animation-play-state: paused; }
          .marquee-wrap { overflow: hidden; width: 100%; }
        `}</style>
        <div className="marquee-wrap" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className={`marquee-track${paused ? ' paused' : ''}`}>
            {doubled.map((dest, i) => (
              <TopDestItem
                key={`${dest.id}-${i}`}
                dest={dest}
                inView={inView}
                onClick={() => onFilter && onFilter(dest.region)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TopDestItem({ dest, inView, onClick }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', flexShrink: 0, width: 150, opacity: inView ? 1 : 0, transition: 'opacity 0.6s ease' }}
    >
      <div style={{ width: 130, height: 130, borderRadius: '50%', overflow: 'hidden', border: `3px solid ${hov ? G : '#e8e8e8'}`, transition: 'border-color .3s, transform .3s, box-shadow .3s', transform: hov ? 'scale(1.06)' : 'scale(1)', boxShadow: hov ? `0 8px 28px ${G}33` : '0 2px 10px rgba(0,0,0,0.08)', flexShrink: 0 }}>
        <img src={dest.img} alt={dest.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', transform: hov ? 'scale(1.08)' : 'scale(1)', transition: 'transform .5s ease' }} />
      </div>
      {/* Destination name — Playfair h3 */}
      <p style={{ ...T.h3, color: hov ? G : INK, marginTop: 14, marginBottom: 4, textAlign: 'center', transition: 'color .3s' }}>{dest.name}</p>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   4. COUNTRY FILTER SIDEBAR (desktop)
───────────────────────────────────────────────────────────────────────────── */
function CountryFilter({ countries, selected, onChange }) {
  return (
    <div>
      {/* Filter label — Montserrat sublabel */}
      <p style={{ ...T.sublabel, color: SL2, marginBottom: 14 }}>Filter by country</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        <button
          onClick={() => onChange(null)}
          style={{ ...T.bodySm, padding: '8px 14px', borderRadius: 8, border: `1.5px solid ${selected === null ? INK : BR2}`, background: selected === null ? INK : '#fff', color: selected === null ? '#fff' : SL, fontWeight: selected === null ? 700 : 400, cursor: 'pointer', transition: 'all .22s', textAlign: 'left', boxShadow: selected === null ? '0 4px 14px -4px rgba(45,45,45,.35)' : 'none', display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <Globe size={13} color={selected === null ? '#fff' : SL2} />
          All Countries
        </button>
        {countries.map(country => {
          const isActive = selected === country
          return (
            <button
              key={country}
              onClick={() => onChange(country)}
              style={{ ...T.bodySm, padding: '8px 14px', borderRadius: 8, border: `1.5px solid ${isActive ? INK : BR2}`, background: isActive ? INK : '#fff', color: isActive ? '#fff' : SL, fontWeight: isActive ? 700 : 500, cursor: 'pointer', transition: 'all .22s', textAlign: 'left', boxShadow: isActive ? '0 4px 14px -4px rgba(45,45,45,.35)' : 'none', display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <img src={FLAG_ICONS[country]} alt={country} style={{ width: 20, height: 20, objectFit: 'contain', borderRadius: '50%', flexShrink: 0 }} />
              {country}
            </button>
          )
        })}
      </div>
      {/* Caption — Jost bodySm */}
      <p style={{ ...T.bodySm, color: SL2, fontStyle: 'italic', marginTop: 8 }}>*Select one country at a time</p>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   5. MOBILE COUNTRY CHIPS
───────────────────────────────────────────────────────────────────────────── */
function MobileCountryChips({ countries, selected, onChange }) {
  const chipStyle = (active) => ({
    ...T.bodySm,
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '7px 14px', borderRadius: 20,
    border: `1.5px solid ${active ? INK : BR2}`,
    background: active ? INK : '#fff',
    color: active ? '#fff' : SL,
    fontWeight: active ? 700 : 400,
    cursor: 'pointer', whiteSpace: 'nowrap',
    transition: 'all .22s', flexShrink: 0,
  })

  return (
    <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 16, scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
      <button style={chipStyle(selected === null)} onClick={() => onChange(null)}>
        <Globe size={12} color={selected === null ? '#fff' : SL2} />
        All
      </button>
      {countries.map(country => (
        <button key={country} style={chipStyle(selected === country)} onClick={() => onChange(country)}>
          <img src={FLAG_ICONS[country]} alt={country} style={{ width: 16, height: 16, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
          {country}
        </button>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   6. DESTINATION MODAL
───────────────────────────────────────────────────────────────────────────── */
function DestinationModal({ dest, onClose, onPrev, onNext, hasPrev, hasNext }) {
  const [openIdx, setOpenIdx]     = useState(null)
  const [imgLoaded, setImgLoaded] = useState(false)
  const cat   = CAT_COLORS[dest.category] || CAT_COLORS.city
  const w     = useWindowWidth()
  const isMobile = w < 640

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(10,8,5,0.82)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '10px' : '20px', animation: 'modalFadeIn 0.3s ease' }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ background: '#FEFCF8', borderRadius: isMobile ? 16 : 24, width: '100%', maxWidth: 900, maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 40px 100px -20px rgba(0,0,0,0.6)', animation: 'modalSlideUp 0.35s cubic-bezier(0.22,1,0.36,1)', position: 'relative' }}
      >
        {/* Hero image */}
        <div style={{ position: 'relative', height: isMobile ? 220 : 340, flexShrink: 0, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg,#C8A96E22,#8B691422)`, opacity: imgLoaded ? 0 : 1, transition: 'opacity 0.6s' }} />
          <img src={dest.img} alt={dest.name} onLoad={() => setImgLoaded(true)} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(10,8,5,0.75) 0%, rgba(10,8,5,0.3) 45%, transparent 70%)' }} />

          {/* Controls */}
          <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, width: 40, height: 40, borderRadius: '50%', background: 'rgba(10,8,5,0.55)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', backdropFilter: 'blur(4px)' }}>
            <X size={18} />
          </button>
          {hasPrev && (
            <button onClick={onPrev} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: 'rgba(10,8,5,0.55)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
              <ChevronLeft size={18} />
            </button>
          )}
          {hasNext && (
            <button onClick={onNext} style={{ position: 'absolute', right: 64, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: 'rgba(10,8,5,0.55)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
              <ChevronRight size={18} />
            </button>
          )}

          {/* Badges */}
          <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 8 }}>
            <span style={{ ...T.label, background: cat.bg, color: cat.text, padding: '5px 12px', borderRadius: 20, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: cat.dot }} />{cat.label}
            </span>
            {dest.hot && (
              <span style={{ ...T.label, background: `linear-gradient(135deg,${G},${G2})`, color: '#fff', padding: '5px 12px', borderRadius: 20 }}>★ Popular</span>
            )}
          </div>

          {/* Title area */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: isMobile ? '16px 20px 18px' : '20px 28px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <img src={dest.flag} alt={dest.country} style={{ width: 18, height: 18, objectFit: 'contain', borderRadius: '50%', flexShrink: 0 }} />
              <span style={{ ...T.sublabel, color: 'rgba(255,255,255,0.6)' }}>{dest.country}</span>
            </div>
            {/* Modal title — Cormorant Garamond display */}
            <h2 style={{ fontFamily:"'Cormorant Garamond','Georgia',serif", fontSize: isMobile ? '1.8rem' : '2.6rem', fontWeight: 600, color: '#fff', lineHeight: 1.0, letterSpacing: '-0.02em', margin: 0 }}>
              {dest.name}
            </h2>
            {/* Tagline — Cormorant italic */}
            <p style={{ fontFamily:"'Cormorant Garamond','Georgia',serif", fontSize: '1rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.7)', marginTop: 6, fontWeight: 400 }}>
              {dest.tagline}
            </p>
          </div>
        </div>

        {/* Scrollable body */}
        <div style={{ overflowY: 'auto', flex: 1, padding: isMobile ? '20px 16px 24px' : '28px 28px 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 28 }}>

            {/* Left col */}
            <div>
              {/* Description — Jost body */}
              <p style={{ ...T.body, color: SL, marginBottom: 24 }}>{dest.desc}</p>

              <div style={{ marginBottom: 24 }}>
                {/* Highlights label — Montserrat sublabel */}
                <p style={{ ...T.sublabel, color: SL2, marginBottom: 10 }}>Highlights</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {dest.highlights.map(h => (
                    <span key={h} style={{ ...T.bodySm, color: SL, background: PARCH, border: `1px solid ${BR2}`, borderRadius: 20, padding: '5px 12px', display: 'flex', alignItems: 'center', gap: 5 }}>
                      <MapPin size={9} color={G2} />{h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Accordion */}
              <div>
                {dest.accordion.map((item, idx) => {
                  const IconComp = ICON_MAP[item.icon] || Sun
                  const isOpen   = openIdx === idx
                  return (
                    <div key={idx} style={{ borderBottom: `1px solid ${BR}` }}>
                      <button onClick={() => setOpenIdx(isOpen ? null : idx)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '12px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 26, height: 26, borderRadius: '50%', background: isOpen ? G : G3, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.3s' }}>
                            <IconComp size={12} color={isOpen ? '#fff' : G} />
                          </div>
                          {/* Accordion title — Playfair h3 at smaller scale */}
                          <span style={{ fontFamily:"'Playfair Display','Georgia',serif", fontSize: '0.875rem', fontWeight: 600, color: isOpen ? G2 : SL, letterSpacing: '-0.01em', transition: 'color 0.3s' }}>{item.title}</span>
                        </div>
                        <ChevronDown size={13} color={isOpen ? G : SL2} style={{ flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                      </button>
                      {isOpen && (
                        <div style={{ paddingBottom: 14, paddingLeft: 36 }}>
                          {/* Accordion body — Jost body */}
                          <p style={{ ...T.body, color: SL2 }}>{item.body}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right col */}
            <div>
              {/* Journey overview card */}
              <div style={{ background: G3, borderRadius: 16, border: `1px solid ${G}22`, padding: '20px', marginBottom: 20 }}>
                <p style={{ ...T.sublabel, color: SL2, marginBottom: 16 }}>Journey Overview</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  {[
                    { Icon: Calendar, label: 'Best Season', val: dest.insights.season },
                    { Icon: Clock,    label: 'Duration',    val: dest.insights.duration },
                    { Icon: Compass,  label: 'Experience',  val: dest.insights.type },
                    { Icon: Globe,    label: 'Pace',        val: dest.insights.pace },
                  ].map(({ Icon, label, val }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <div style={{ width: 30, height: 30, borderRadius: 9, background: '#fff', border: `1px solid ${BR}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={13} color={G2} />
                      </div>
                      <div>
                        {/* Insight label — Montserrat sublabel */}
                        <p style={{ ...T.sublabel, color: SL2, marginBottom: 2 }}>{label}</p>
                        {/* Insight value — Jost body */}
                        <p style={{ ...T.bodySm, fontWeight: 600, color: INK, lineHeight: 1.3 }}>{val}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review card */}
              <div style={{ background: '#fff', border: `1px solid ${BR}`, borderRadius: 14, padding: '16px 18px', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} color={G} fill={G} />)}
                  <span style={{ ...T.bodySm, fontWeight: 700, color: G, marginLeft: 4 }}>Exceptional</span>
                </div>
                {/* Review quote — Cormorant italic */}
                <p style={{ fontFamily:"'Cormorant Garamond','Georgia',serif", fontSize: '1rem', fontStyle: 'italic', color: SL, lineHeight: 1.7 }}>
                  "A bespoke, once-in-a-lifetime experience curated for the discerning traveller."
                </p>
              </div>

              <a href="#inquiry" style={{ ...T.label, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: `linear-gradient(135deg,${RED},${RED2})`, color: '#fff', padding: '15px 20px', borderRadius: 10, textDecoration: 'none', boxShadow: `0 8px 28px -6px ${RED}55` }}>
                Plan My {dest.name} Journey <ArrowRight size={14} />
              </a>
              {/* CTA caption — Jost bodySm */}
              <p style={{ ...T.bodySm, textAlign: 'center', color: SL2, marginTop: 10 }}>
                Complimentary consultation · No obligation
              </p>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes modalFadeIn  { from { opacity:0; } to { opacity:1; } }
        @keyframes modalSlideUp { from { opacity:0; transform:translateY(32px) scale(0.97); } to { opacity:1; transform:none; } }
      `}</style>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   7. DESTINATION CARD
───────────────────────────────────────────────────────────────────────────── */
function DestCard({ dest, onClick }) {
  const [hov,       setHov]       = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const cat = CAT_COLORS[dest.category] || CAT_COLORS.city

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ background: CARD, borderRadius: 16, overflow: 'hidden', border: `1px solid ${hov ? G + '66' : BR}`, boxShadow: hov ? '0 24px 56px -10px rgba(0,0,0,.22)' : '0 2px 16px -4px rgba(0,0,0,.10)', transform: hov ? 'translateY(-6px)' : 'none', transition: 'box-shadow .35s ease, transform .35s ease, border-color .3s ease', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ position: 'relative', height: 380, overflow: 'hidden', flexShrink: 0 }}>
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg,${G3},${BR})`, opacity: imgLoaded ? 0 : 1, transition: 'opacity .5s' }} />
        <img src={dest.img} alt={dest.name} loading="lazy" onLoad={() => setImgLoaded(true)} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hov ? 'scale(1.06)' : 'scale(1)', transition: 'transform 1.1s ease' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg,rgba(10,8,5,.6) 0%,rgba(10,8,5,.08) 50%,transparent 80%)' }} />

        {/* Category badge — Montserrat label */}
        <div style={{ position: 'absolute', top: 12, left: 12 }}>
          <span style={{ ...T.label, fontSize: '0.5rem', background: cat.bg, color: cat.text, padding: '4px 10px', borderRadius: 20, display: 'inline-flex', alignItems: 'center', gap: 5, boxShadow: '0 2px 8px rgba(0,0,0,.12)' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: cat.dot }} />{cat.label}
          </span>
        </div>

        {/* Popular badge */}
        {dest.hot && (
          <div style={{ position: 'absolute', top: 12, right: 12, ...T.label, fontSize: '0.5rem', background: `linear-gradient(135deg,${G},${G2})`, color: '#fff', padding: '4px 10px', borderRadius: 20, boxShadow: `0 2px 10px ${G}55` }}>
            ★ Popular
          </div>
        )}

        {/* Hover overlay */}
        {hov && (
          <div style={{ position: 'absolute', inset: 0, background: `${G}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'opacity 0.3s' }}>
            <div style={{ background: 'rgba(255,255,255,0.92)', borderRadius: 30, padding: '8px 18px', display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}>
              <span style={{ ...T.label, color: G2 }}>View Details</span>
              <ArrowRight size={12} color={G2} />
            </div>
          </div>
        )}

        {/* Title */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px 16px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
            <img src={dest.flag} alt={dest.country} style={{ width: 18, height: 18, objectFit: 'contain', borderRadius: '50%', flexShrink: 0 }} />
            <span style={{ ...T.sublabel, color: 'rgba(255,255,255,.55)' }}>{dest.country}</span>
          </div>
          {/* Card name — Playfair h2 */}
          <h3 style={{ ...T.h2, color: '#fff' }}>{dest.name}</h3>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   8. REGION DROPDOWN
───────────────────────────────────────────────────────────────────────────── */
function RegionDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const regions = ['Western Europe','Central Europe','Northern Europe','Southern/Eastern Europe']

  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ ...T.body, display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: `1.5px solid ${open ? G : BR2}`, borderRadius: 8, padding: '9px 16px', fontWeight: 600, color: SL, cursor: 'pointer', transition: 'border-color .25s', boxShadow: open ? `0 4px 20px -4px ${G}44` : 'none' }}
      >
        <MapPin size={13} color={G} />{value}
        <ChevronDown size={13} color={SL2} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .3s' }} />
      </button>
      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 6px)', right: 0, zIndex: 100, background: '#fff', borderRadius: 10, border: `1px solid ${BR}`, boxShadow: '0 16px 48px -8px rgba(0,0,0,.18)', minWidth: 200, overflow: 'hidden' }}>
          {regions.map(r => (
            <button
              key={r}
              onClick={() => { onChange(r); setOpen(false) }}
              style={{ ...T.body, width: '100%', textAlign: 'left', padding: '11px 18px', border: 'none', background: r === value ? G3 : '#fff', cursor: 'pointer', color: r === value ? G2 : SL, fontWeight: r === value ? 700 : 400, transition: 'background .2s', borderLeft: r === value ? `3px solid ${G}` : '3px solid transparent' }}
            >
              {r}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   9. WHY SECTION
───────────────────────────────────────────────────────────────────────────── */
const WHY_ITEMS = [
  { icon: 'Camera',  title: 'Expert-Verified Stays',    body: 'Our consultants personally visit every destination we recommend — we inspect hotels, walk the routes, taste the restaurants.' },
  { icon: 'Compass', title: 'Bespoke Itineraries',      body: 'No two journeys are the same. Every trip is crafted to your preferences, pace and budget — unlimited revisions.' },
  { icon: 'Users',   title: '24/7 On-Ground Support',   body: "From the moment you depart to your return flight — we're one call away. Real people, real answers, always." },
  { icon: 'Sun',     title: 'Transparent Pricing',      body: 'No hidden fees, no pressure tactics. You see exactly what you pay for — and we always match or beat market rates.' },
]

function WhySection() {
  const [ref, inView] = useInView(0.06)

  return (
    <section ref={ref} style={{ background: '#fff', padding: 'clamp(4rem,7vw,6rem) 0', borderTop: `1px solid ${BR}` }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(1rem,5vw,5rem)' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48, opacity: inView ? 1 : 0, transition: 'opacity .7s, transform .7s', transform: inView ? 'none' : 'translateY(20px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 14 }}>
            <div style={{ width: 28, height: 1.5, background: `linear-gradient(90deg,transparent,${G})`, borderRadius: 2 }} />
            <span style={{ ...T.label, color: G }}>Why Chalo Holidays</span>
            <div style={{ width: 28, height: 1.5, background: `linear-gradient(90deg,${G},transparent)`, borderRadius: 2 }} />
          </div>
          {/* Section heading — Playfair h1 */}
          <SectionHeading>
            Crafted with{' '}
            <em style={{ fontFamily:"'Cormorant Garamond','Georgia',serif", color: G, fontStyle: 'italic', fontWeight: 500 }}>passion,</em>{' '}
            delivered with{' '}
            <em style={{ fontFamily:"'Cormorant Garamond','Georgia',serif", color: G, fontStyle: 'italic', fontWeight: 500 }}>precision.</em>
          </SectionHeading>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,240px),1fr))', gap: 24 }}>
          {WHY_ITEMS.map(({ icon, title, body }, i) => {
            const [hov, setHov] = useState(false)
            const I = ICON_MAP[icon] || Sun
            return (
              <div
                key={title}
                onMouseEnter={() => setHov(true)}
                onMouseLeave={() => setHov(false)}
                style={{ padding: '28px 24px', border: `1px solid ${hov ? G + '66' : BR}`, borderTop: `2px solid ${hov ? G : BR2}`, background: hov ? G3 : CARD, transition: 'all .3s', cursor: 'default', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(28px)', transitionDelay: `${i * 80}ms` }}
              >
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: hov ? `${G}22` : PARCH, border: `1px solid ${hov ? G + '55' : BR2}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, transition: 'all .3s' }}>
                  <I size={18} style={{ color: hov ? G : SL2, strokeWidth: 1.5, transition: 'color .3s' }} />
                </div>
                {/* Card title — Playfair h3 */}
                <h3 style={{ ...T.h3, color: INK, marginBottom: 10 }}>{title}</h3>
                {/* Card body — Jost body */}
                <p style={{ ...T.body, color: SL }}>{body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   10. DESTINATIONS SECTION
───────────────────────────────────────────────────────────────────────────── */
function DestinationsSection() {
  const [region,       setRegion]       = useState('Western Europe')
  const [country,      setCountry]      = useState(null)
  const [visibleCount, setVisibleCount] = useState(6)
  const [modalDest,    setModalDest]    = useState(null)
  const [fade,         setFade]         = useState(true)
  const prevRegion = useRef(region)

  const w        = useWindowWidth()
  const isMobile = w < 640
  const isTablet = w < 1024

  useEffect(() => {
    if (prevRegion.current !== region) {
      setFade(false)
      setVisibleCount(6)
      setCountry(null)
      const t = setTimeout(() => { setFade(true); prevRegion.current = region }, 260)
      return () => clearTimeout(t)
    }
  }, [region])

  const handleCountryChange = useCallback(c => {
    setFade(false)
    setVisibleCount(6)
    setCountry(c)
    setTimeout(() => setFade(true), 180)
  }, [])

  const filtered = useMemo(
    () => ALL_DESTINATIONS
      .filter(d => d.region === region)
      .filter(d => !country || d.country === country),
    [region, country]
  )
  const shown = filtered.slice(0, visibleCount)

  const openModal  = useCallback(dest => setModalDest(dest), [])
  const closeModal = useCallback(()   => setModalDest(null), [])
  const modalIdx   = modalDest ? filtered.findIndex(d => d.id === modalDest.id) : -1
  const goPrev     = useCallback(() => { if (modalIdx > 0) setModalDest(filtered[modalIdx - 1]) }, [modalIdx, filtered])
  const goNext     = useCallback(() => { if (modalIdx < filtered.length - 1) setModalDest(filtered[modalIdx + 1]) }, [modalIdx, filtered])

  const meta        = REGION_META[region]
  const cardCols    = isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'
  const regionCountries = meta.countries

  return (
    <>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:none; } }
        .dest-card-enter { animation: fadeUp .45s ease forwards; }
      `}</style>

      <section id="destinations" style={{ background: PARCH, padding: 'clamp(3rem,6vw,5rem) 0' }}>
        <div style={{ maxWidth: 1360, margin: '0 auto', padding: '0 clamp(1rem,4vw,3.5rem)' }}>

          {/* Top row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
            <div>
              {/* Region / country headline — Cormorant Garamond display */}
              <h2 style={{ fontFamily:"'Cormorant Garamond','Georgia',serif", fontSize: 'clamp(2.4rem,6vw,4.8rem)', fontWeight: 600, color: INK, lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: 8, opacity: fade ? 1 : 0, transition: 'opacity .3s' }}>
                {country ? country : meta.headline}
              </h2>
              {/* Sub — Jost body */}
              <p style={{ ...T.body, color: SL, maxWidth: 340, opacity: fade ? 1 : 0, transition: 'opacity .3s .05s' }}>
                {country ? `Showing destinations in ${country}` : meta.sub}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <RegionDropdown value={region} onChange={setRegion} />
            </div>
          </div>

          {/* Mobile chips */}
          {isTablet && (
            <MobileCountryChips
              countries={regionCountries}
              selected={country}
              onChange={handleCountryChange}
            />
          )}

          {/* Main layout */}
          <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '220px 1fr', gap: isTablet ? 0 : 32, alignItems: 'start' }}>

            {/* Desktop sidebar */}
            {!isTablet && (
              <div style={{ opacity: fade ? 1 : 0, transition: 'opacity .4s .05s' }}>
                {/* Sidebar body — Jost bodyLg */}
                <p style={{ ...T.bodyLg, color: SL, marginBottom: 28 }}>{meta.body}</p>

                <CountryFilter
                  countries={regionCountries}
                  selected={country}
                  onChange={handleCountryChange}
                />

                {/* Meta footer card */}
                <div style={{ background: G3, border: `1px solid ${G}30`, borderRadius: 12, padding: '18px 16px', marginTop: 24, opacity: fade ? 1 : 0, transition: 'opacity .4s .1s' }}>
                  <div style={{ width: 28, height: 2, background: `linear-gradient(90deg,${G},${G2})`, borderRadius: 2, marginBottom: 10 }} />
                  {/* Footer note — Jost body */}
                  <p style={{ ...T.body, color: SL }}>{meta.footer}</p>
                </div>

                <a href="#inquiry" style={{ ...T.label, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 20, background: `linear-gradient(135deg,${RED},${RED2})`, color: '#fff', padding: '14px 20px', borderRadius: 8, textDecoration: 'none', boxShadow: `0 8px 28px -6px ${RED}44` }}>
                  Plan My Journey <ArrowRight size={13} />
                </a>
              </div>
            )}

            {/* Card grid */}
            <div>
              {/* Mobile stats bar */}
              {isTablet && (
                <div style={{ display: 'flex', gap: 20, marginBottom: 20, padding: '14px 16px', background: '#fff', borderRadius: 12, border: `1px solid ${BR}`, opacity: fade ? 1 : 0, transition: 'opacity .4s' }}>
                  {[
                    { n: filtered.length, label: 'Destinations' },
                    { n: '100%',          label: 'Bespoke'      },
                    { n: '24/7',          label: 'Support'      },
                  ].map(({ n, label }) => (
                    <div key={label} style={{ display: 'flex', flexDirection: 'column' }}>
                      {/* Stat — Cormorant stat */}
                      <span style={{ ...T.stat, fontSize: '1.4rem', color: G }}>{n}</span>
                      {/* Stat label — Montserrat sublabel */}
                      <span style={{ ...T.sublabel, color: SL2 }}>{label}</span>
                    </div>
                  ))}
                </div>
              )}

              {shown.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: cardCols, gap: isMobile ? 12 : 16, opacity: fade ? 1 : 0, transition: 'opacity .35s' }}>
                  {shown.map((dest, i) => (
                    <div key={dest.id} className="dest-card-enter" style={{ animationDelay: `${i * 55}ms` }}>
                      <DestCard dest={dest} onClick={() => openModal(dest)} />
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                  {/* Empty state — Playfair h2 */}
                  <p style={{ ...T.h2, color: SL, marginBottom: 8 }}>No destinations found.</p>
                  {/* Sub — Jost body */}
                  <p style={{ ...T.body, color: SL }}>Try a different country or region.</p>
                </div>
              )}

              {/* Load more */}
              {visibleCount < filtered.length && (
                <div style={{ textAlign: 'center', marginTop: 28 }}>
                  <button
                    onClick={() => setVisibleCount(c => c + 6)}
                    style={{ ...T.body, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', borderRadius: 30, border: `1.5px solid ${BR2}`, background: '#fff', fontWeight: 600, color: SL, cursor: 'pointer', transition: 'all .25s', letterSpacing: '0.08em' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = G; e.currentTarget.style.color = G }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = BR2; e.currentTarget.style.color = SL }}
                  >
                    View more <ArrowRight size={13} />
                  </button>
                </div>
              )}

              {/* Mobile CTA */}
              {isTablet && (
                <a href="#inquiry" style={{ ...T.label, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 28, background: `linear-gradient(135deg,${RED},${RED2})`, color: '#fff', padding: '14px 20px', borderRadius: 8, textDecoration: 'none', boxShadow: `0 8px 28px -6px ${RED}44` }}>
                  Plan My Journey <ArrowRight size={13} />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {modalDest && (
        <DestinationModal
          dest={modalDest}
          onClose={closeModal}
          onPrev={goPrev}
          onNext={goNext}
          hasPrev={modalIdx > 0}
          hasNext={modalIdx < filtered.length - 1}
        />
      )}
    </>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE ROOT
───────────────────────────────────────────────────────────────────────────── */
export default function DestinationsPage() {
  return (
    <div style={{ fontFamily:"'Jost','Helvetica Neue',sans-serif", background: PARCH }}>
      <style>{`
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0 }
        input, select, button { outline:none }
        ::-webkit-scrollbar { width:6px; height:6px }
        ::-webkit-scrollbar-track { background:${PARCH} }
        ::-webkit-scrollbar-thumb { background:${G}; border-radius:3px }
      `}</style>
      <Navbar />
      <Hero />
      <IntroSection />
      <TopDestinationsCarousel onFilter={() => {}} />
      <WhySection />
      <DestinationsSection />
      <Footer />
    </div>
  )
}