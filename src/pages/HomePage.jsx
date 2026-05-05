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
import BarselonaImg from '../assets/destination/barselona.jpg'

import {
  ArrowRight, ChevronLeft, ChevronRight, MapPin,
  ShieldCheck, Star, Users, HeartHandshake,
  Handshake, Globe, CheckCircle, BadgeCheck,
  ArrowUpRight,
  Hotel, Car, MoveRight,
  Quote, Bookmark, Circle, Train, CalendarDays,
  Users2, Building2, Lock,
  Crown,
} from 'lucide-react'

/* ════════════════════════════════════════════════════════════
   SHARED TOKENS
═══════════════════════════════════════════════════════════════ */
const GOLD = '#B8860B'
const GOLD2 = '#D4A017'
const RED = '#B91C1C'
const DARK = '#0F172A'
const SLATE = '#475569'
const STONE = '#78716C'
const DARK2 = '#1C1917'
const CREAM = '#FAFAF5'
const CREAM2 = '#F5F0E8'

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
   1. HERO SECTION — FULLY RESPONSIVE
═══════════════════════════════════════════════════════════════ */
const HERO_SLIDES = [
  { id: 0, destination: 'EUROPE', subline: 'Timeless Wonders', country: 'Multi-Country', region: 'Europe', tag: 'GRAND TOUR', eyebrow: 'Elite Journey', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1920&q=90', description: 'From the Swiss Alps to Italian coastlines, experience a journey across cultures, history, and breathtaking landscapes.', rating: 4.8, nights: '10 nights', accent: GOLD2 },
  { id: 1, destination: 'LONDON', subline: 'The Royal Capital', country: 'United Kingdom', region: 'Europe', tag: 'URBAN HERITAGE', eyebrow: 'Classic Experience', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1920&q=90', description: 'Historic landmarks, royal traditions, and modern luxury blend seamlessly in one of the world\'s most iconic cities.', rating: 4.7, nights: '6 nights', accent: GOLD },
  { id: 2, destination: 'ITALY', subline: 'The Eternal Beauty', country: 'Italy', region: 'Southern Europe', tag: 'CULTURAL LUXURY', eyebrow: 'Curated Experience', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1920&q=90', description: 'Ancient ruins, Renaissance art, and romantic streets — Italy is a masterpiece at every turn.', rating: 4.9, nights: '7 nights', accent: GOLD },
  { id: 3, destination: 'SWEDEN', subline: 'Nordic Serenity', country: 'Sweden', region: 'Northern Europe', tag: 'SCANDINAVIAN', eyebrow: 'Premium Experience', image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=1920&q=90', description: 'Minimalist design, pristine nature, and a peaceful Nordic lifestyle define Sweden\'s unique charm.', rating: 4.7, nights: '5 nights', accent: GOLD },
  { id: 4, destination: 'GREECE', subline: 'Aegean Romance', country: 'Greece', region: 'Southern Europe', tag: 'ROMANTIC ESCAPE', eyebrow: 'Luxury Experience', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=90', description: 'Whitewashed villages, blue domes, and breathtaking sunsets over the Aegean Sea.', rating: 4.9, nights: '5 nights', accent: GOLD },
]

const AUTO_MS = 5500
const RING_R = 16
const RING_CIRC = 2 * Math.PI * RING_R

function getNextCards(cur) {
  const total = HERO_SLIDES.length
  return [HERO_SLIDES[(cur + 1) % total], HERO_SLIDES[(cur + 2) % total], HERO_SLIDES[(cur + 3) % total]]
}

function HeroSection() {
  const [cur, setCur] = useState(0)
  const [prevIdx, setPrevIdx] = useState(null)
  const [animating, setAnimating] = useState(false)
  const [prog, setProg] = useState(0)
  const [textKey, setTextKey] = useState(0)
  const [bookmarked, setBookmarked] = useState({})
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
    stopTimer(); setPrevIdx(fromIdx); setAnimating(true); setProg(0); setCur(idx); setTextKey(k => k + 1)
    setTimeout(() => { setPrevIdx(null); setAnimating(false) }, 750)
    startTimer(idx)
  }, [animating, cur, startTimer])

  const goNext = useCallback(() => goTo((cur + 1) % HERO_SLIDES.length), [cur, goTo])
  const goPrev = useCallback(() => goTo((cur - 1 + HERO_SLIDES.length) % HERO_SLIDES.length), [cur, goTo])

  useEffect(() => { startTimer(0); return () => stopTimer() }, [startTimer])
  useEffect(() => {
    const fn = (e) => { if (e.key === 'ArrowRight') goNext(); if (e.key === 'ArrowLeft') goPrev() }
    window.addEventListener('keydown', fn); return () => window.removeEventListener('keydown', fn)
  }, [goNext, goPrev])

  const slide = HERO_SLIDES[cur]
  const cards = getNextCards(cur)
  const ringOffset = RING_CIRC - (prog / 100) * RING_CIRC
  const CARD_W = [220, 178, 145]
  const CARD_H = [340, 275, 225]
  const CARD_RIGHT = [0, 190, 340]

  return (
    <section
      className="relative w-full overflow-hidden select-none"
      style={{
        /* ✅ minHeight accounts for fixed navbar (~70px) */
        minHeight: 'clamp(580px, 96vh, 1020px)',
        background: '#07070e',
        fontFamily: "Georgia,'Times New Roman',serif",
      }}
      aria-label="Hero slideshow"
    >
      {/* Background images */}
      {HERO_SLIDES.map((s, i) => (
        <div key={s.id} aria-hidden="true" className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${s.image}')`, opacity: i === cur ? 1 : 0, transform: i === cur ? 'scale(1.04)' : 'scale(1)', transition: 'opacity 1.1s cubic-bezier(.4,0,.2,1),transform 8s ease', zIndex: i === cur ? 1 : 0 }} />
      ))}

      {/* Overlays */}
      <div aria-hidden="true" className="absolute inset-0 z-[2]" style={{ background: 'linear-gradient(100deg,rgba(4,4,10,.97) 0%,rgba(4,4,10,.88) 30%,rgba(4,4,10,.65) 50%,rgba(4,4,10,.15) 72%,rgba(4,4,10,.0) 100%)' }} />
      <div aria-hidden="true" className="absolute inset-0 z-[2]" style={{ background: 'linear-gradient(0deg,rgba(4,4,10,.96) 0%,rgba(4,4,10,.24) 18%,transparent 42%)' }} />
      <div aria-hidden="true" className="absolute inset-0 z-[2]" style={{ background: 'linear-gradient(180deg,rgba(4,4,10,.60) 0%,transparent 20%)' }} />

      {/* Gold left accent line */}
      <div aria-hidden="true" className="absolute left-0 top-0 bottom-0 z-[4] w-[3px]" style={{ background: `linear-gradient(180deg,transparent,${GOLD} 35%,${GOLD2} 65%,transparent)` }} />

      {/* Desktop slide counter sidebar */}
      <div className="absolute left-5 z-[5] hidden lg:flex flex-col items-center gap-4" style={{ top: '50%', transform: 'translateY(-50%)' }}>
        {HERO_SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{ width: 2, height: i === cur ? 36 : 14, borderRadius: 2, background: i === cur ? GOLD : 'rgba(255,255,255,.25)', border: 'none', cursor: 'pointer', padding: 0, transition: 'height .4s ease,background .4s ease' }} />
        ))}
        <div style={{ fontFamily: 'sans-serif', marginTop: 6, textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: GOLD, lineHeight: 1 }}>{String(cur + 1).padStart(2, '0')}</div>
          <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,.18)', margin: '4px auto' }} />
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,.25)', lineHeight: 1 }}>{String(HERO_SLIDES.length).padStart(2, '0')}</div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-[3] flex flex-col" style={{ minHeight: 'clamp(580px, 96vh, 1020px)' }}>
        <div className="flex-1 flex items-center">
          <div
            className="w-full max-w-[1440px] mx-auto relative"
            style={{
              /* ✅ Key fix: responsive padding, extra top for navbar */
              paddingTop: 'clamp(80px, 12vw, 40px)',
              paddingBottom: 0,
              paddingLeft: 'clamp(20px, 6vw, 96px)',
              paddingRight: 'clamp(20px, 4vw, 48px)',
            }}
          >
            {/* Text content column */}
            <div
              className="flex flex-col justify-center"
              style={{
                maxWidth: 'clamp(280px, 90vw, 520px)',
                paddingBottom: 'clamp(80px, 15vw, 60px)',
                position: 'relative',
                zIndex: 2,
              }}
            >
              {/* Eyebrow */}
              <div key={`ey-${textKey}`} style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 14, animation: 'heroLuxUp .55s ease both', fontFamily: 'sans-serif' }}>
                <Rule color={GOLD} w={20} />
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.24em', textTransform: 'uppercase', color: GOLD }}>{slide.eyebrow}</span>
                <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: GOLD2, border: `1px solid ${GOLD}45`, background: 'rgba(212,160,23,.12)', padding: '3px 8px', borderRadius: 2 }}>{slide.tag}</span>
              </div>

              {/* ✅ HEADLINE — whiteSpace removed, font scales down properly on mobile */}
              <div style={{ position: 'relative', marginBottom: 10 }}>
                {/* ← overflow: hidden REMOVED */}

                {prevIdx !== null && (
                  <h1
                    key={`out-${prevIdx}`}
                    style={{
                      position: 'absolute', top: 0, left: 0,
                      fontFamily: "Georgia,'Times New Roman',serif",
                      fontSize: 'clamp(2.6rem, 10vw, 7.5rem)',  // ✅ tighter
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      lineHeight: 0.9,
                      color: '#fff',
                      textTransform: 'uppercase',
                      margin: 0,
                      whiteSpace: 'nowrap',
                      wordBreak: 'keep-all',
                      overflowWrap: 'normal',
                      animation: 'heroSlideOutUp .65s cubic-bezier(.4,0,.2,1) both',
                      pointerEvents: 'none',
                      zIndex: 1,
                    }}
                  >
                    {HERO_SLIDES[prevIdx].destination}
                  </h1>
                )}

                <h1
                  key={`in-${textKey}`}
                  style={{
                    fontFamily: "Georgia,'Times New Roman',serif",
                    fontSize: 'clamp(2.6rem, 10vw, 7.5rem)',    // ✅ tighter
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    lineHeight: 0.9,
                    color: '#fff',
                    textTransform: 'uppercase',
                    margin: 0,
                    whiteSpace: 'nowrap',
                    wordBreak: 'keep-all',
                    overflowWrap: 'normal',
                    animation: 'heroSlideInUp .65s cubic-bezier(.4,0,.2,1) both',
                    position: 'relative',
                    zIndex: 2,
                    paddingBottom: 6,
                  }}
                >
                  {slide.destination}
                </h1>
              </div>
              {/* Subline */}
              <div key={`sl-${textKey}`} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, animation: 'heroLuxUp .6s .08s ease both' }}>
                <div style={{ width: 24, height: 1, background: GOLD, flexShrink: 0 }} />
                <span style={{ fontFamily: 'sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: GOLD }}>{slide.subline}</span>
              </div>

              {/* Location row */}
              <div key={`lc-${textKey}`} style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6, marginBottom: 14, animation: 'heroLuxUp .6s .14s ease both', fontFamily: 'sans-serif' }}>
                <MapPin size={11} style={{ color: GOLD, flexShrink: 0 }} />
                <span style={{ fontSize: 10, letterSpacing: '.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,.42)' }}>{slide.country}</span>
                <span style={{ color: 'rgba(255,255,255,.15)' }}>·</span>
                <span style={{ fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,.24)' }}>{slide.region}</span>
              </div>

              {/* Description */}
              <p key={`ds-${textKey}`} style={{ animation: 'heroLuxUp .6s .20s ease both', fontFamily: 'sans-serif', fontSize: 'clamp(.82rem,1.2vw,.96rem)', color: 'rgba(255,255,255,.50)', lineHeight: 1.8, maxWidth: '38ch', fontWeight: 300, marginBottom: 24 }}>
                {slide.description}
              </p>

              {/* CTA buttons */}
              <div key={`ct-${textKey}`} style={{ display: 'flex', flexWrap: 'wrap', gap: 10, animation: 'heroLuxUp .6s .28s ease both' }}>
                <Link
                  to="/destinations"
                  className="inline-flex items-center gap-2 font-semibold uppercase tracking-widest transition-all duration-300 hover:brightness-110 hover:scale-[1.02] active:scale-95"
                  style={{ background: `linear-gradient(135deg,${RED},#991B1B)`, color: '#fff', padding: 'clamp(10px,2vw,13px) clamp(18px,3vw,26px)', borderRadius: 2, fontFamily: 'sans-serif', fontSize: 'clamp(10px,1.5vw,11px)', letterSpacing: '.14em', boxShadow: `0 8px 28px ${RED}55`, textDecoration: 'none' }}
                >
                  Explore Collection <ArrowRight size={13} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 font-semibold uppercase tracking-widest transition-all duration-300 hover:bg-white/10"
                  style={{ color: 'rgba(255,255,255,.68)', border: `1px solid ${GOLD}50`, padding: 'clamp(9px,2vw,12px) clamp(16px,3vw,24px)', borderRadius: 2, fontFamily: 'sans-serif', fontSize: 'clamp(10px,1.5vw,11px)', letterSpacing: '.14em', textDecoration: 'none' }}
                >
                  Request Itinerary
                </Link>
              </div>
            </div>

            {/* ── Desktop destination cards panel (hidden on mobile) ── */}
            <div
              className="hidden lg:block absolute"
              style={{ right: 'clamp(24px, 3vw, 48px)', bottom: 70, width: CARD_RIGHT[2] + CARD_W[2] + 16, height: CARD_H[0], zIndex: 5 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, justifyContent: 'flex-end', fontFamily: 'sans-serif' }}>
                <Rule color={GOLD} w={14} />
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: GOLD }}>Also Explore</span>
              </div>
              {[...cards].reverse().map((card, ri) => {
                const realIdx = 2 - ri
                const isFront = realIdx === 0
                const cardW = CARD_W[realIdx]
                const cardH = CARD_H[realIdx]
                const rightOff = CARD_RIGHT[realIdx]
                return (
                  <div
                    key={`card-${card.id}-${ri}`}
                    className="absolute overflow-hidden"
                    style={{ right: rightOff, bottom: 0, width: cardW, height: cardH, borderRadius: 10, cursor: 'pointer', zIndex: isFront ? 10 : realIdx === 1 ? 9 : 8, boxShadow: isFront ? `0 0 0 2px ${GOLD},0 32px 64px rgba(0,0,0,.80)` : '0 8px 32px rgba(0,0,0,.65)', animation: `heroCardIn .6s ${ri * 70}ms cubic-bezier(.4,0,.2,1) both`, transition: 'box-shadow .4s ease' }}
                    onClick={() => goTo(HERO_SLIDES.findIndex(s => s.id === card.id))}
                  >
                    <img src={card.image} alt={card.destination} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .6s ease' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.07)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                    <div className="absolute inset-0" style={{ background: isFront ? 'linear-gradient(0deg,rgba(4,4,10,.92) 0%,rgba(4,4,10,.10) 52%,transparent 100%)' : 'linear-gradient(0deg,rgba(4,4,10,.80) 0%,rgba(4,4,10,.25) 55%,rgba(4,4,10,.18) 100%)' }} />
                    {isFront && <div className="absolute top-0 left-0 right-0" style={{ height: 2.5, background: `linear-gradient(90deg,${RED},${GOLD},${GOLD2})` }} />}
                    <button
                      onClick={(e) => { e.stopPropagation(); setBookmarked(b => ({ ...b, [card.id]: !b[card.id] })) }}
                      style={{ position: 'absolute', top: 10, right: 10, width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,.18)', backdropFilter: 'blur(8px)', border: bookmarked[card.id] ? `1.5px solid ${GOLD}` : '1.5px solid rgba(255,255,255,.32)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all .25s ease' }}>
                      <Bookmark size={10} style={{ color: bookmarked[card.id] ? GOLD : '#fff', fill: bookmarked[card.id] ? GOLD : 'transparent', transition: 'all .25s ease' }} />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0" style={{ padding: isFront ? '10px 12px' : '8px 10px' }}>
                      <p style={{ fontFamily: "Georgia,serif", fontSize: isFront ? 14 : 11, fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: 3, textTransform: 'uppercase' }}>{card.destination}</p>
                      <p style={{ fontFamily: 'sans-serif', fontSize: 9, color: GOLD2, fontWeight: 500 }}>{card.subline}</p>
                    </div>
                  </div>
                )
              })}
              <div style={{ position: 'absolute', top: -26, right: 0, display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'sans-serif' }}>
                <Link to="/destinations" style={{ fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: GOLD2, textDecoration: 'none' }}>View all destinations</Link>
                <ArrowRight size={10} style={{ color: GOLD2 }} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile thumbnail cards ── */}
        <div className="lg:hidden flex items-end justify-center gap-2 px-4 pb-3 relative z-[5]">
          {getNextCards(cur).map((card, ci) => {
            const sizes = [[80, 108], [64, 86], [52, 70]]
            const [w, h] = sizes[ci]
            return (
              <button key={card.id} onClick={() => goTo(HERO_SLIDES.findIndex(s => s.id === card.id))}
                style={{ position: 'relative', overflow: 'hidden', flexShrink: 0, width: w, height: h, borderRadius: 8, border: 'none', cursor: 'pointer', padding: 0, boxShadow: ci === 0 ? `0 0 0 2px ${GOLD},0 8px 24px rgba(0,0,0,.65)` : '0 4px 16px rgba(0,0,0,.55)', transition: 'all .4s ease' }}>
                <img src={card.image} alt={card.destination} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg,rgba(0,0,0,.72) 0%,transparent 55%)' }} />
                {ci === 0 && <div className="absolute top-0 left-0 right-0" style={{ height: 2, background: `linear-gradient(90deg,${RED},${GOLD})` }} />}
                <p className="absolute bottom-1.5 left-1.5 right-1.5 text-white leading-tight" style={{ fontFamily: "Georgia,serif", fontSize: 8, fontWeight: 700, textTransform: 'uppercase' }}>{card.destination}</p>
              </button>
            )
          })}
        </div>

        {/* ── Bottom control bar ── */}
        <div style={{ background: 'rgba(4,4,10,.78)', backdropFilter: 'blur(22px)', borderTop: '1px solid rgba(255,255,255,.07)', position: 'relative', zIndex: 10 }}>
          <div
            className="max-w-[1440px] mx-auto flex items-center justify-between gap-3"
            style={{ padding: '11px clamp(16px, 5vw, 96px)' }}
          >
            {/* Left: region info (hidden on small mobile) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0, minWidth: 0 }} className="hidden sm:flex">
              <div style={{ fontFamily: 'sans-serif', minWidth: 0 }}>
                <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '.18em', color: 'rgba(255,255,255,.26)' }}>{slide.region}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,.62)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{slide.country} · {slide.subline}</div>
              </div>
            </div>

            {/* Center: progress ring + dots + counter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, justifyContent: 'center' }}>
              <div style={{ position: 'relative', width: 32, height: 32, flexShrink: 0 }}>
                <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                  <circle cx="18" cy="18" r={RING_R} fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="1.5" />
                  <circle cx="18" cy="18" r={RING_R} fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeDasharray={RING_CIRC} strokeDashoffset={ringOffset} style={{ transition: 'stroke-dashoffset 50ms linear' }} />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: GOLD }} />
                </div>
              </div>
              <div className="flex gap-2">
                {HERO_SLIDES.map((_, i) => (
                  <Circle key={i} size={i === cur ? 14 : 10} onClick={() => goTo(i)}
                    style={{ cursor: 'pointer', fill: i === cur ? RED : 'transparent', color: 'white', opacity: i === cur ? 1 : 0.5, transition: 'all 0.3s ease' }} />
                ))}
              </div>
              <div style={{ fontFamily: 'sans-serif', display: 'flex', alignItems: 'baseline', gap: 2 }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: GOLD }}>{String(cur + 1).padStart(2, '0')}</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,.20)' }}>/{String(HERO_SLIDES.length).padStart(2, '0')}</span>
              </div>
            </div>

            {/* Right: nav arrows */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
              <button onClick={goPrev} aria-label="Previous"
                style={{ width: 34, height: 34, borderRadius: 2, border: `1px solid ${GOLD}40`, background: 'transparent', color: 'rgba(255,255,255,.52)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s ease' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = GOLD }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = `${GOLD}40`; e.currentTarget.style.color = 'rgba(255,255,255,.52)' }}>
                <ChevronLeft size={15} />
              </button>
              <button onClick={goNext} aria-label="Next"
                style={{ width: 34, height: 34, borderRadius: 2, border: 'none', background: `linear-gradient(135deg,${RED},#991B1B)`, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 16px ${RED}50`, transition: 'transform .2s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heroLuxUp      { from{opacity:0;transform:translateY(16px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes heroSlideInUp  { from{opacity:0;transform:translateY(56px) skewY(1.2deg)} to{opacity:1;transform:translateY(0) skewY(0deg)} }
        @keyframes heroSlideOutUp { from{opacity:1;transform:translateY(0) skewY(0deg)} to{opacity:0;transform:translateY(-56px) skewY(-1.2deg)} }
        @keyframes heroCardIn     { from{opacity:0;transform:translateX(44px) scale(.92)} to{opacity:1;transform:translateX(0) scale(1)} }
      `}</style>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════
   2. SERVICES SECTION
═══════════════════════════════════════════════════════════════ */
const ALL_SERVICES = [
  {
    id: '01',
    icon: Users,
    label: 'Family Holidays',
    title: 'Family Packages',
    tagline: 'Trips for every generation.',
    description: 'Fun and relaxing holidays for the whole family.',
    features: ['Kid-friendly plans', 'Family stays'],
    accent: GOLD
  },
  {
    id: '02',
    icon: Hotel,
    label: 'Hotels',
    title: 'Best Hotels',
    tagline: 'Comfort & value stays.',
    description: 'Handpicked hotels from budget to luxury.',
    features: ['Prime locations', 'Verified quality'],
    accent: GOLD
  },
  {
    id: '03',
    icon: Users2,
    label: 'Group Bookings',
    title: 'Group Tours',
    tagline: 'Perfect for all groups.',
    description: 'Curated trips for families, friends, and teams.',
    features: ['Custom plans', 'Best pricing'],
    accent: GOLD
  },
  {
    id: '04',
    icon: Train,
    label: 'Rail Tours',
    title: 'Rail Journeys',
    tagline: 'Scenic train trips.',
    description: 'Enjoy iconic and luxury rail experiences.',
    features: ['Scenic routes', 'All-inclusive'],
    accent: GOLD
  },
  {
    id: '05',
    icon: Car,
    label: 'Transfers',
    title: 'Transfers & Tours',
    tagline: 'Smooth travel services.',
    description: 'Private transfers and guided sightseeing.',
    features: ['Airport pickup', 'Private cars'],
    accent: GOLD
  },
  {
    id: '06',
    icon: CalendarDays,
    label: 'Events',
    title: 'Events & MICE',
    tagline: 'We plan, you enjoy.',
    description: 'Expert planning for corporate and social events.',
    features: ['Corporate events', 'Full management'],
    accent: GOLD
  },
  {
    id: '07',
    icon: Building2,
    label: 'Corporate',
    title: 'Corporate Travel',
    tagline: 'Smart business travel.',
    description: 'Efficient travel solutions for companies.',
    features: ['Business trips', 'Priority support'],
    accent: GOLD
  },
  {
    id: '08',
    icon: Crown,
    label: 'VIP',
    title: 'Luxury Packages',
    tagline: 'Premium experiences.',
    description: 'Exclusive luxury travel with concierge services.',
    features: ['Private trips', '24/7 support'],
    accent: GOLD
  },
];

function ServiceCard({ svc, index, inView }) {
  const [hov, setHov] = useState(false)
  const Icon = svc.icon
  return (
    <article className="relative overflow-hidden cursor-pointer"
      style={{ borderRadius: 6, border: `1px solid ${hov ? svc.accent + '55' : '#E8E8E4'}`, background: '#fff', boxShadow: hov ? `0 32px 64px -16px rgba(15,23,42,.18),0 0 0 1px ${svc.accent}22` : '0 2px 16px -4px rgba(15,23,42,.06)', transform: inView ? (hov ? 'translateY(-8px)' : 'translateY(0)') : 'translateY(32px)', opacity: inView ? 1 : 0, transition: `transform ${hov ? '380ms' : '600ms'} cubic-bezier(.4,0,.2,1),box-shadow 400ms ease,border-color 400ms ease,opacity 600ms ease ${index * 90}ms` }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${svc.accent},${GOLD2})`, transform: hov ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 450ms cubic-bezier(.4,0,.2,1)' }} />
      <div className="relative p-5 sm:p-7 flex flex-col h-full">
        <div className="flex items-start justify-between mb-5">
          <div style={{ width: 48, height: 48, borderRadius: 6, background: hov ? svc.accent + '18' : '#F8F7F4', border: `1px solid ${hov ? svc.accent + '40' : '#EEE'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .4s ease' }}>
            <Icon size={20} style={{ color: hov ? svc.accent : '#94A3B8', transition: 'color .4s ease', strokeWidth: 1.6 }} />
          </div>
          <span className="font-black text-4xl leading-none select-none" style={{ fontFamily: "Georgia,serif", color: hov ? svc.accent + '30' : '#F1F5F9', transition: 'color .4s ease' }}>{svc.id}</span>
        </div>
        <h3 style={{ fontFamily: "Georgia,serif", fontSize: 'clamp(1rem,2vw,1.2rem)', fontWeight: 700, color: DARK, lineHeight: 1.2, marginBottom: 6 }}>{svc.title}</h3>
        <p className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: hov ? svc.accent : '#94A3B8', transition: 'color .35s ease' }}>{svc.tagline}</p>
        <div style={{ height: 1, background: hov ? `linear-gradient(90deg,${svc.accent}44,transparent)` : '#F1F5F9', marginBottom: 14, transition: 'background .4s ease' }} />
        <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: SLATE }}>{svc.description}</p>
        <ul className="flex flex-col gap-2 mb-5">
          {svc.features.map(f => (
            <li key={f} className="flex items-center gap-2.5">
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: hov ? svc.accent : '#CBD5E1', flexShrink: 0, transition: 'background .4s ease' }} />
              <span className="text-[12px] font-medium" style={{ color: hov ? SLATE : '#94A3B8', transition: 'color .4s ease' }}>{f}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 font-bold text-[11px] uppercase tracking-widest" style={{ color: hov ? svc.accent : '#CBD5E1', transition: 'color .35s ease' }}>
         <Link to="/services" className="flex items-center gap-2 font-bold text-[11px] uppercase tracking-widest"
  style={{ color: hov ? svc.accent : '#CBD5E1', transition: 'color .35s ease' }}
>
  Learn More
  <ArrowUpRight
    size={13}
    style={{
      transform: hov ? 'translate(2px,-2px)' : 'translate(0,0)',
      transition: 'transform .3s ease'
    }}
  />
</Link>
        </div>
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
            <div className="flex items-center gap-3 mb-4"><Rule color={GOLD} w={28} /><span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.22em', color: GOLD, fontFamily: 'sans-serif' }}>What We Offer</span></div>
            <h2 style={{ fontFamily: "Georgia,serif", fontSize: 'clamp(2.2rem,6vw,4.2rem)', fontWeight: 400, color: DARK, lineHeight: 0.95 }}>Our Services</h2>
            <p style={{ color: SLATE, fontSize: 'clamp(.875rem,1.4vw,.975rem)', maxWidth: '50ch', lineHeight: 1.8, marginTop: 12, fontFamily: 'sans-serif' }}>Eight pillars of travel expertise — each one designed to make your journey effortless and memorable.</p>
          </div>
          <Link to="/services"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `linear-gradient(135deg,${RED},#991B1B)`, color: '#fff', fontFamily: 'sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', padding: '14px 28px', borderRadius: 3, textDecoration: 'none', flexShrink: 0, boxShadow: `0 8px 28px -8px ${RED}50` }}>
            View All Services <MoveRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {ALL_SERVICES.map((svc, i) => <ServiceCard key={svc.id} svc={svc} index={i} inView={inView} />)}
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════
   3. BRAND VALUES
═══════════════════════════════════════════════════════════════ */
const BRAND_STATS = [
  { id: 1, icon: Users, count: 50, suffix: 'K+', label: 'Happy Travellers', sub: 'Families · Solo · Corporate' },
  { id: 2, icon: Handshake, count: 500, suffix: '+', label: 'Global Partners', sub: 'Agents · Hotels · DMCs' },
  { id: 3, icon: Globe, count: 1200, suffix: '+', label: 'Support Points', sub: 'On-ground worldwide' },
  { id: 4, icon: CheckCircle, count: 98, suffix: 'K+', label: 'Bookings Delivered', sub: 'Zero friction, end-to-end' },
  { id: 5, icon: ShieldCheck, count: 100, suffix: '%', label: 'Transparent Pricing', sub: 'No hidden fees, ever' },
]
const BRAND_PILLARS = [
  { num: '01', title: 'Bespoke Itineraries', body: 'Every journey is architected around you — your pace, your preferences, your story.' },
  { num: '02', title: 'White-Glove Service', body: 'A dedicated travel consultant accompanies you from first enquiry to safe return.' },
  { num: '03', title: 'Global Reach', body: 'Over 90 countries, 1,200+ vetted partners, and on-ground support at every waypoint.' },
]

function BrandStatCell({ stat, index, started, isLast }) {
  const count = useCountUp(stat.count, 1800 + index * 150, started)
  const [hov, setHov] = useState(false)
  const Icon = stat.icon
  return (
    <div className="relative flex flex-col items-center text-center px-4 py-6 sm:px-8 sm:py-10 cursor-default transition-colors duration-500"
      style={{ background: hov ? '#F0EDE8' : 'transparent', borderRadius: 12 }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-3 sm:mb-4 transition-all duration-400"
        style={{ border: `1px solid ${hov ? RED : 'rgba(201,168,76,0.25)'}`, background: hov ? `${RED}15` : 'transparent' }}>
        <Icon size={14} style={{ color: hov ? RED : `${GOLD}88` }} className="transition-colors duration-400" />
      </div>
      <div className="flex items-end justify-center leading-none mb-2">
        <span className="font-black transition-colors duration-400"
          style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(1.8rem,4vw,3.2rem)', letterSpacing: '-0.03em', color: hov ? GOLD : DARK2, fontVariantNumeric: 'tabular-nums' }}>{count.toLocaleString()}</span>
        <span className="font-bold text-lg pb-1 ml-0.5 transition-colors duration-400" style={{ color: hov ? GOLD2 : GOLD }}>{stat.suffix}</span>
      </div>
      <p className="text-[11px] sm:text-[13px] font-semibold tracking-[.10em] uppercase mb-1 transition-colors duration-400" style={{ color: hov ? DARK2 : '#44403C' }}>{stat.label}</p>
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
    if (ref.current) io.observe(ref.current); return () => io.disconnect()
  }, [])
  return (
    <section ref={ref} className="w-full" style={{ background: '#FAFAF9' }}>
      <div className="w-full border-b" style={{ borderColor: '#E7E5E4' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-20">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-4 mb-5">
                <div className="h-px w-10" style={{ background: `linear-gradient(90deg,${GOLD},#E7E5E4)` }} />
                <span className="text-[10px] font-semibold tracking-[.28em] uppercase" style={{ color: '#A8A29E' }}>Our Credentials</span>
              </div>
              <h2 className="leading-[1.05] mb-5" style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(1.8rem,5vw,3.4rem)', letterSpacing: '-0.02em', fontWeight: 400, color: DARK2 }}>
                Crafting extraordinary journeys<br /><em style={{ color: GOLD, fontStyle: 'italic' }}>since the very first mile.</em>
              </h2>
            </div>
            <div className="flex flex-col lg:max-w-sm xl:max-w-md w-full" style={{ borderTop: `1px solid ${GOLD}20` }}>
              {BRAND_PILLARS.map(({ num, title, body }) => (
                <div key={num} className="flex gap-5 py-4 group cursor-default" style={{ borderTop: `1px solid ${GOLD}20` }}>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-7 sm:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <p className="text-sm leading-relaxed max-w-md" style={{ color: '#A8A29E' }}>&ldquo;Every journey is a masterpiece when planned with precision, passion, and the finest attention to detail.&rdquo;</p>
          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            <Link to="/about" className="text-xs font-semibold tracking-[.14em] uppercase px-5 py-2.5 rounded-full border transition-all duration-300 hover:border-[#B8860B] hover:text-[#B8860B]" style={{ color: '#78716C', borderColor: '#D6D3D1', textDecoration: 'none' }}>Our Story</Link>
            <Link to="/contact" className="inline-flex items-center gap-2 text-xs font-bold tracking-[.12em] uppercase px-6 py-2.5 rounded-full transition-all duration-300 hover:brightness-110 hover:scale-[1.03] active:scale-95" style={{ color: '#fff', background: `linear-gradient(135deg,${RED},#991B1B)`, boxShadow: `0 6px 24px -6px ${RED}55`, textDecoration: 'none' }}>Begin Your Journey <ArrowUpRight size={13} /></Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════
   4. WHY CHOOSE US
═══════════════════════════════════════════════════════════════ */
const WHY_ITEMS = [
  { icon: BadgeCheck, title: 'Best Rate Guaranteed', desc: 'We guarantee the absolute lowest rates available online — no price-matching needed. Book with complete confidence.', stat: '100%', statLabel: 'Rate Match' },
  { icon: Globe, title: 'Search & Book Worldwide', desc: 'Access over 620,000+ destinations, hotels, and experiences globally through our comprehensive booking platform.', stat: '620K+', statLabel: 'Properties' },
  { icon: Lock, title: 'Trusted & Secure Booking', desc: 'Every transaction is fully encrypted and secured. Complete privacy protection on all your personal and payment data.', stat: '100%', statLabel: 'Secure Checkout' },
  { icon: HeartHandshake, title: 'Dedicated Travel Expert', desc: 'A personal consultant is assigned to your journey from first enquiry to final return — always reachable, always caring.', stat: '24/7', statLabel: 'Support' },
]

function WhyCard({ icon: Icon, title, desc, stat, statLabel }) {
  const [hov, setHov] = useState(false)
  return (
    <div style={{ background: hov ? DARK2 : CREAM, border: `1px solid ${hov ? DARK2 : '#E8E8E4'}`, borderRadius: 6, padding: 'clamp(16px,3vw,24px)', transition: 'all .35s ease', cursor: 'default', transform: hov ? 'translateY(-4px)' : 'translateY(0)', boxShadow: hov ? `0 20px 48px -12px rgba(15,23,42,.25)` : 'none' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: 6, background: hov ? `${GOLD}20` : '#F5F0E8', border: `1px solid ${hov ? GOLD + '40' : '#E8E8E4'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .35s ease' }}>
          <Icon size={18} style={{ color: hov ? GOLD : STONE, transition: 'color .35s ease' }} />
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontFamily: "Georgia,serif", fontSize: 'clamp(1.1rem,2.5vw,1.4rem)', fontWeight: 700, color: hov ? GOLD : DARK2, lineHeight: 1, transition: 'color .35s ease' }}>{stat}</p>
          <p style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: hov ? GOLD2 : STONE, fontFamily: 'sans-serif', transition: 'color .35s ease' }}>{statLabel}</p>
        </div>
      </div>
      <h3 style={{ fontFamily: "Georgia,serif", fontSize: 'clamp(.95rem,2vw,1.05rem)', fontWeight: 600, color: hov ? '#fff' : DARK2, marginBottom: 8, lineHeight: 1.2, transition: 'color .35s ease' }}>{title}</h3>
      <p style={{ fontSize: 12.5, lineHeight: 1.7, color: hov ? 'rgba(255,255,255,.55)' : STONE, fontFamily: 'sans-serif', transition: 'color .35s ease' }}>{desc}</p>
    </div>
  )
}

function WhyChooseUs() {
  const [ref, inView] = useInView(0.06)
  return (
    <section ref={ref} style={{ background: '#fff', padding: 'clamp(3rem,8vw,7rem) 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${GOLD}14 1px,transparent 1px)`, backgroundSize: '30px 30px', pointerEvents: 'none' }} />
      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(-32px)', transition: 'opacity .8s ease,transform .8s ease' }}>
            <div className="flex items-center gap-3 mb-5"><Rule color={GOLD} w={28} /><span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.22em', color: GOLD, fontFamily: 'sans-serif' }}>About Us</span></div>
            <h2 style={{ fontFamily: "Georgia,serif", fontSize: 'clamp(1.9rem,4.5vw,3.4rem)', fontWeight: 400, color: DARK2, letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: '1.25rem' }}>Welcome to <em style={{ color: GOLD, fontStyle: 'italic' }}>Chalo Holidays</em></h2>
            <p style={{ color: SLATE, fontSize: '1rem', lineHeight: 1.8, maxWidth: '46ch', fontFamily: 'sans-serif', fontWeight: 300, marginBottom: '1.25rem' }}>We are a travel consultant and B2B wholesale tour operator with a skilled, proactive team dedicated entirely to your success. Every itinerary is crafted with precision — nothing left to chance.</p>
            <blockquote style={{ borderLeft: `3px solid ${GOLD}`, paddingLeft: 20, marginBottom: 28 }}>
              <p style={{ fontFamily: "Georgia,serif", fontSize: '1.05rem', color: DARK2, fontStyle: 'italic', lineHeight: 1.7 }}>"We do not just book trips — we architect memories that last a lifetime."</p>
              <cite style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: STONE, fontFamily: 'sans-serif', fontStyle: 'normal' }}>— Founder, Chalo Holidays</cite>
            </blockquote>
            <Link to="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `linear-gradient(135deg,${RED},#991B1B)`, color: '#fff', fontFamily: 'sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '14px 28px', borderRadius: 3, textDecoration: 'none', boxShadow: `0 8px 28px -8px ${RED}55` }}>
              Discover Our Story <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
            style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(32px)', transition: 'opacity .8s ease .15s,transform .8s ease .15s' }}>
            {WHY_ITEMS.map(item => <WhyCard key={item.title} {...item} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════
   5. DESTINATIONS PREVIEW
═══════════════════════════════════════════════════════════════ */
const DEST_REGIONS = [
  { num: '01', name: 'Western Europe', count: 5 },
  { num: '02', name: 'Central Europe', count: 6 },
  { num: '03', name: 'Northern Europe', count: 4 },
  { num: '04', name: 'Eastern Europe', count: 5 },
]

const colA_base = [
  { src: LondonImg, alt: 'London UK', location: 'London, United Kingdom', title: 'Classic London', desc: 'Royal heritage, red buses, and timeless culture around every corner.' },
  { src: InterlakenImg, alt: 'Swiss Alps', location: 'Interlaken, Switzerland', title: 'Swiss Alpine Escape', desc: 'Snowy peaks, turquoise lakes, and breathtaking mountain landscapes.' },
  { src: BarselonaImg, alt: 'Barcelona Spain', location: 'Barcelona, Spain', title: 'Vibrant Barcelona', desc: 'Gaudí masterpieces, tapas culture, and golden Mediterranean beaches.' },
  { src: OsloImg, alt: 'Oslo Norway', location: 'Oslo, Norway', title: 'Nordic Oslo', desc: 'Fjord views, Viking heritage, and Scandinavian charm.' },
]
const colB_base = [
  { src: ParisImg, alt: 'Paris France', location: 'Paris, France', title: 'Romantic Paris', desc: 'The Eiffel Tower, café culture, and timeless Parisian charm.' },
  { src: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=2400&q=90&auto=format&fit=crop', alt: 'Rome Italy', location: 'Rome, Italy', title: 'Eternal Rome', desc: 'Ancient ruins, Vatican splendour, and the world\'s finest gelato.' },
  { src: BerlinImg, alt: 'Berlin Germany', location: 'Berlin, Germany', title: 'Dynamic Berlin', desc: 'History, street art, world-class museums and electric nightlife.' },
  { src: WarsawImg, alt: 'Warsaw Poland', location: 'Warsaw, Poland', title: 'Rising Warsaw', desc: 'A beautifully rebuilt old town beside a bold modern skyline.' },
]
const destColA = [...colA_base, ...colA_base]
const destColB = [...colB_base, ...colB_base]

function DestRegionRow({ region }) {
  const [hov, setHov] = useState(false)
  return (
    <div className="relative cursor-pointer select-none" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div className="h-px w-full mb-3" style={{ background: hov ? `linear-gradient(90deg,${RED},transparent)` : '#E2E8F0', transition: 'background 400ms ease' }} />
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-end gap-3">
          <span className="text-[11px] font-semibold tabular-nums" style={{ color: hov ? RED : '#94A3B8', transition: 'color 300ms ease' }}>{region.num}/</span>
          <span className="font-bold leading-none" style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(1.2rem,3.5vw,2rem)', color: hov ? DARK : '#94A3B8', transition: 'color 350ms ease' }}>{region.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold tabular-nums" style={{ color: hov ? SLATE : '#CBD5E1', transition: 'color 300ms ease' }}>({region.count})</span>
          <div style={{ opacity: hov ? 1 : 0, transform: hov ? 'translate(0,0)' : 'translate(-6px,6px)', transition: 'opacity 300ms ease,transform 300ms ease' }}><ArrowUpRight size={16} style={{ color: RED }} /></div>
        </div>
      </div>
      <div style={{ height: 1, background: `linear-gradient(90deg,${RED},${GOLD})`, transform: hov ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 400ms cubic-bezier(.4,0,.2,1)', marginTop: -1 }} />
    </div>
  )
}

function DestImageTile({ img }) {
  const [hov, setHov] = useState(false)
  return (
    <div className="relative overflow-hidden flex-shrink-0 cursor-pointer w-full" style={{ borderRadius: 12, aspectRatio: '3/4' }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <img src={img.src} alt={img.alt} className="w-full h-full object-cover" style={{ transform: hov ? 'scale(1.08)' : 'scale(1)', transition: 'transform 700ms cubic-bezier(.4,0,.2,1)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg,rgba(15,23,42,.65) 0%,transparent 55%)' }} />
      <div className="absolute inset-0 flex flex-col justify-end" style={{ background: `linear-gradient(0deg,${DARK}F0 0%,${DARK}CC 50%,rgba(15,23,42,.30) 100%)`, opacity: hov ? 1 : 0, transform: hov ? 'translateY(0)' : 'translateY(10px)', transition: 'opacity 350ms ease,transform 350ms ease' }}>
        <div className="p-4">
          <div className="flex items-center gap-1.5 mb-2"><MapPin size={11} style={{ color: GOLD2, flexShrink: 0 }} /><span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: GOLD2 }}>{img.location}</span></div>
          <h3 className="font-bold leading-tight mb-2" style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(.85rem,2vw,1.05rem)', color: '#fff' }}>{img.title}</h3>
          <p style={{ color: 'rgba(255,255,255,.68)', fontSize: 11, maxWidth: '28ch', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{img.desc}</p>
          <div className="flex items-center gap-1 mt-2" style={{ color: GOLD2 }}><span className="text-[10px] font-bold uppercase tracking-widest">Explore</span><ArrowUpRight size={11} /></div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3" style={{ opacity: hov ? 0 : 1, transition: 'opacity 250ms ease' }}>
        <div className="flex items-center gap-1"><MapPin size={9} style={{ color: GOLD2 }} /><span className="text-[10px] font-semibold" style={{ color: 'rgba(255,255,255,.75)' }}>{img.location}</span></div>
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
    <section id="destinations" className="relative py-16 sm:py-24 overflow-hidden" style={{ background: '#FFFFFF' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(#F1F5F9 1px,transparent 1px),linear-gradient(90deg,#F1F5F9 1px,transparent 1px)`, backgroundSize: '80px 80px', opacity: 0.35 }} />
      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-20 items-start">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-5"><div className="h-px w-7" style={{ background: GOLD }} /><span className="text-[10px] font-bold uppercase tracking-[.22em]" style={{ color: GOLD }}>Handpicked Regions</span></div>
            <h2 className="leading-[.95] mb-4" style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(2.5rem,7vw,5rem)', fontWeight: 400, color: DARK }}>Destinations</h2>
            <p className="leading-relaxed mb-8" style={{ color: SLATE, fontSize: 'clamp(.875rem,1.4vw,.975rem)', maxWidth: '42ch' }}>With each destination handpicked by our experts, your journey becomes more than a place — it becomes an experience of beauty, culture, and moments that stay with you.</p>
            <nav className="mb-8">{DEST_REGIONS.map(r => <DestRegionRow key={r.num} region={r} />)}<div className="h-px w-full mt-1" style={{ background: '#E2E8F0' }} /></nav>
            <Link to="/destinations" className="inline-flex items-center gap-2.5 font-bold text-sm uppercase tracking-widest px-6 py-4 transition-all duration-200 hover:opacity-90 active:scale-95 self-start" style={{ background: `linear-gradient(135deg,${RED},#991B1B)`, color: '#fff', borderRadius: 3, boxShadow: `0 8px 28px -8px ${RED}55`, textDecoration: 'none' }}>
              Explore Destinations <ChevronRight size={15} />
            </Link>
          </div>
          <div className="relative" style={{ height: 'clamp(400px,65vh,680px)' }}>
            <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none" style={{ height: 60, background: 'linear-gradient(180deg,#fff 0%,transparent 100%)' }} />
            <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none" style={{ height: 60, background: 'linear-gradient(0deg,#fff 0%,transparent 100%)' }} />
            <div className="grid grid-cols-2 gap-3 h-full overflow-hidden">
              <DestAutoScrollCol images={destColA} speed={0.38} reversed={false} className="h-full" />
              <DestAutoScrollCol images={destColB} speed={0.30} reversed={true} className="h-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════
   6. PARTNERS / GLOBAL NETWORK
═══════════════════════════════════════════════════════════════ */
if (typeof document !== 'undefined' && !document.getElementById('partners-marquee-style')) {
  const s = document.createElement('style'); s.id = 'partners-marquee-style'
  s.textContent = `@keyframes partners-marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`
  document.head.appendChild(s)
}

const PARTNERS = [
  { name: 'Disneyland', logo: DisneyLogo }, { name: 'Starwood', logo: StarwoodLogo }, { name: 'Rail Europe', logo: RailEuropeLogo }, { name: 'IHG', logo: IhgLogo },
  { name: 'Hyatt', logo: HyattLogo }, { name: 'Hilton', logo: HiltonLogo }, { name: 'Accor', logo: AccorLogo }, { name: 'Four Seasons', logo: FourSeasonsLogo },
  { name: 'Jumeirah', logo: JumeirahLogo }, { name: 'Kempinski', logo: KempinskiLogo }, { name: 'Mandarin Oriental', logo: MandarinLogo }, { name: 'Melia', logo: MeliaLogo },
  { name: 'Radisson', logo: RadissonLogo }, { name: 'Rosewood', logo: RosewoodLogo }, { name: 'Wyndham', logo: WyndhamLogo }, { name: 'Global', logo: GlobalLogo },
]

function MarqueeCell({ name, logo }) {
  const [hov, setHov] = useState(false)
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, width: 'clamp(140px, calc(100vw / 4), 220px)', minWidth: 140, height: 130, cursor: 'pointer', background: hov ? '#FFFFFF' : '#F7F3EE', borderRight: '1px solid #CBBFA8', borderTop: '1px solid #CBBFA8', borderBottom: '1px solid #CBBFA8', boxSizing: 'border-box', transition: 'background .35s ease', flexShrink: 0 }}>
      <div style={{ position: 'absolute', inset: 0, border: `1.5px solid ${hov ? GOLD : 'transparent'}`, pointerEvents: 'none', transition: 'border-color .35s ease', zIndex: 2 }} />
      <div style={{ width: '75%', height: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px', boxSizing: 'border-box' }}>
        <img src={logo} alt={name} style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain', display: 'block', filter: hov ? 'grayscale(0%) brightness(1)' : 'grayscale(100%) brightness(0.75) contrast(1.15)', transform: hov ? 'scale(1.06)' : 'scale(1)', transition: 'filter .4s ease,transform .4s ease' }} />
      </div>
      <span style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: hov ? GOLD : '#B0A090', transition: 'color .35s ease', fontWeight: 500 }}>{name}</span>
    </div>
  )
}

function PartnersMarqueeStrip({ items, inView }) {
  const [paused, setPaused] = useState(false)
  const doubled = [...items, ...items]
  return (
    <div style={{ position: 'relative', overflow: 'hidden', border: '1px solid #CBBFA8', opacity: inView ? 1 : 0, transition: 'opacity .7s ease .15s' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 60, zIndex: 10, pointerEvents: 'none', background: 'linear-gradient(90deg,#F7F3EE,transparent)' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 60, zIndex: 10, pointerEvents: 'none', background: 'linear-gradient(270deg,#F7F3EE,transparent)' }} />
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
    <section ref={ref} style={{ background: '#F7F3EE', padding: 'clamp(3.5rem,9vw,7rem) 0', position: 'relative', overflow: 'hidden' }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 48px', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'all .8s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 1, background: `linear-gradient(90deg,transparent,${GOLD})` }} />
            <span style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, fontWeight: 700 }}>Preferred Partners</span>
            <div style={{ width: 40, height: 1, background: `linear-gradient(90deg,${GOLD},transparent)` }} />
          </div>
          <h2 style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 300, letterSpacing: '-0.01em', color: '#1A1510', margin: '0 0 10px', lineHeight: 1.15 }}>The World's Finest <em style={{ color: GOLD, fontStyle: 'italic' }}>Brands</em></h2>
          <p style={{ fontFamily: "Georgia,'Times New Roman',serif", fontStyle: 'italic', fontSize: 13, color: '#9A8B7A', margin: 0 }}>Exclusive privileges and preferred rates for our distinguished clients</p>
        </div>
        <PartnersMarqueeStrip items={PARTNERS} inView={inView} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginTop: 32, opacity: inView ? 1 : 0, transition: 'opacity .7s ease .3s' }}>
          <div style={{ width: 1, height: 36, background: `linear-gradient(to bottom,transparent,${GOLD}70,transparent)` }} />
          <p style={{ fontFamily: "Georgia,'Times New Roman',serif", fontStyle: 'italic', fontSize: 12, color: '#9A8B7A', margin: 0 }}>Preferred rates & exclusive privileges across every brand</p>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════
   7. TESTIMONIALS
═══════════════════════════════════════════════════════════════ */
const TESTIMONIALS = [
  { id: 1, name: 'Rahul Mehta', role: 'Travel Agent', location: 'Ahmedabad, India', rating: 5, service: 'B2B Partnership', text: 'Working with this team has streamlined our Europe bookings completely. Fast responses, competitive pricing, and zero operational issues.', avatar: 'RM', accent: GOLD, destination: 'Europe' },
  { id: 2, name: 'Emma Collins', role: 'Tour Operator', location: 'London, UK', rating: 5, service: 'Ground Handling', text: 'Their on-ground support across Europe is exceptional. Transfers, hotels, and local coordination are always handled with precision.', avatar: 'EC', accent: DARK, destination: 'Europe' },
  { id: 3, name: 'Amit Shah', role: 'Travel Consultant', location: 'Mumbai, India', rating: 5, service: 'Group Bookings', text: 'Managing large group departures has become effortless. The backend coordination and instant confirmations save us huge time.', avatar: 'AS', accent: GOLD2, destination: 'Europe' },
  { id: 4, name: 'Marco Rossi', role: 'DMC Partner', location: 'Rome, Italy', rating: 5, service: 'B2B Operations', text: 'A reliable global partner. Communication is clear, payments are smooth, and execution on the ground is always consistent.', avatar: 'MR', accent: GOLD, destination: 'Italy' },
  { id: 5, name: 'Neha Kapoor', role: 'Agency Owner', location: 'Delhi, India', rating: 5, service: 'Hotel Booking', text: 'Their hotel inventory and rates give us a strong competitive edge. Clients are happy, and margins are better.', avatar: 'NK', accent: RED, destination: 'Europe' },
  { id: 6, name: 'Daniel Schmidt', role: 'Corporate Travel Manager', location: 'Berlin, Germany', rating: 5, service: 'Corporate Travel', text: 'Consistent service quality across multiple European cities. Ideal for handling corporate travel requirements.', avatar: 'DS', accent: GOLD2, destination: 'Germany' },
  { id: 7, name: 'Sophia Laurent', role: 'Luxury Travel Planner', location: 'Paris, France', rating: 5, service: 'Luxury Packages', text: 'Their curated itineraries and premium hotel partnerships make it easy to serve high-end clients.', avatar: 'SL', accent: GOLD, destination: 'France' },
  { id: 8, name: 'Vikram Iyer', role: 'Wholesale Partner', location: 'Bangalore, India', rating: 5, service: 'Bulk Bookings', text: 'Handling volume bookings is smooth and efficient. Pricing and turnaround time are consistently strong.', avatar: 'VI', accent: RED, destination: 'Europe' },
  { id: 9, name: 'Katarina Novak', role: 'Inbound Specialist', location: 'Prague, Czech Republic', rating: 5, service: 'Local Coordination', text: 'Excellent coordination across multiple countries. Their network and execution are highly dependable.', avatar: 'KN', accent: GOLD2, destination: 'Central Europe' },
  { id: 10, name: 'Ahmed Khan', role: 'Travel Distributor', location: 'Dubai, UAE', rating: 5, service: 'B2B Distribution', text: 'A strong and reliable partner for Europe products. Great support team and seamless booking process.', avatar: 'AK', accent: GOLD, destination: 'Europe' },
]

if (typeof document !== 'undefined' && !document.getElementById('testimonial-marquee-style')) {
  const s = document.createElement('style'); s.id = 'testimonial-marquee-style'
  s.textContent = `@keyframes tMarqueeLeft{from{transform:translateX(0)}to{transform:translateX(-50%)}}`
  document.head.appendChild(s)
}

function TestimonialMarqueeCard({ t }) {
  const [hov, setHov] = useState(false)
  const palette = {
    [GOLD]: { chipBg: `${GOLD}18`, chipBorder: `${GOLD}40`, chipColor: GOLD, avatarBg: `${GOLD}14`, avatarBorder: `${GOLD}45`, avatarColor: GOLD },
    [GOLD2]: { chipBg: `${GOLD2}18`, chipBorder: `${GOLD2}40`, chipColor: GOLD2, avatarBg: `${GOLD2}14`, avatarBorder: `${GOLD2}45`, avatarColor: GOLD2 },
    [RED]: { chipBg: `${RED}12`, chipBorder: `${RED}35`, chipColor: RED, avatarBg: `${RED}10`, avatarBorder: `${RED}40`, avatarColor: RED },
    [DARK]: { chipBg: `${GOLD}18`, chipBorder: `${GOLD}40`, chipColor: GOLD, avatarBg: `${GOLD}14`, avatarBorder: `${GOLD}45`, avatarColor: GOLD },
  }
  const p = palette[t.accent] || palette[GOLD]
  const topGrad = t.accent === RED ? `linear-gradient(90deg,${RED},${GOLD})` : `linear-gradient(90deg,${GOLD},${GOLD2})`

  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ flexShrink: 0, width: 300, background: hov ? '#FFFFFF' : CREAM, border: `1px solid ${hov ? GOLD + '55' : '#DDD4C4'}`, borderRadius: 6, padding: '18px 22px', position: 'relative', overflow: 'hidden', cursor: 'default', transition: 'background .3s,border-color .3s,transform .3s,box-shadow .3s', transform: hov ? 'translateY(-4px)' : 'translateY(0)', boxShadow: hov ? `0 20px 48px -12px ${GOLD}28` : '0 2px 12px -4px rgba(15,23,42,.06)' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: topGrad, transform: hov ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform .4s cubic-bezier(.4,0,.2,1)' }} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 2, background: p.chipBg, color: p.chipColor, border: `1px solid ${p.chipBorder}` }}>{t.service}</span>
        <StarRow count={t.rating} accent={GOLD} />
      </div>
      <p style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 13, fontStyle: 'italic', lineHeight: 1.7, color: hov ? DARK2 : STONE, margin: '0 0 14px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', transition: 'color .3s' }}>&ldquo;{t.text}&rdquo;</p>
      <div style={{ height: 1, background: hov ? `linear-gradient(90deg,${GOLD}55,transparent)` : `linear-gradient(90deg,#DDD4C4,transparent)`, margin: '0 0 12px', transition: 'background .3s' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "Georgia,serif", fontSize: 11, fontWeight: 700, background: p.avatarBg, border: `1.5px solid ${p.avatarBorder}`, color: p.avatarColor }}>{t.avatar}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: "Georgia,serif", fontSize: 13, fontWeight: 600, color: DARK2, lineHeight: 1.2, margin: '0 0 2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.name}</p>
          <p style={{ fontSize: 10, color: STONE, margin: 0 }}>{t.role} · {t.location}</p>
        </div>
        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 2, flexShrink: 0, background: p.chipBg, color: p.chipColor, border: `1px solid ${p.chipBg}` }}>{t.destination}</span>
      </div>
    </div>
  )
}

function TestimonialMarqueeBlock({ inView }) {
  const [paused, setPaused] = useState(false)
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS]
  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: CREAM2, borderRadius: 8, border: `1px solid ${GOLD}28`, padding: '28px 0', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity .7s ease .15s,transform .7s ease .15s' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: `radial-gradient(${GOLD}22 1px,transparent 1px)`, backgroundSize: '32px 32px', opacity: .5 }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${GOLD}80,${GOLD2},${GOLD}80,transparent)` }} />
      <div style={{ position: 'absolute', inset: '0 auto 0 0', width: 60, zIndex: 2, pointerEvents: 'none', background: `linear-gradient(90deg,${CREAM2},transparent)` }} />
      <div style={{ position: 'absolute', inset: '0 0 0 auto', width: 60, zIndex: 2, pointerEvents: 'none', background: `linear-gradient(270deg,${CREAM2},transparent)` }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 24px', marginBottom: 18, position: 'relative', zIndex: 3 }}>
        <div style={{ height: 1, width: 24, background: `linear-gradient(90deg,${RED},${GOLD})` }} />
        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.24em', textTransform: 'uppercase', color: GOLD }}>Voices From the Journey</span>
        <div style={{ height: 1, flex: 1, background: `linear-gradient(90deg,${GOLD}30,transparent)` }} />
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
    <section ref={sectionRef} style={{ position: 'relative', padding: 'clamp(3.5rem,9vw,7rem) 0', overflow: 'hidden', background: '#fff' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: `radial-gradient(circle,#E8E4DC 1px,transparent 1px)`, backgroundSize: '40px 40px', opacity: .55 }} />
      <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 clamp(1rem,5vw,3rem)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 40, opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 700ms ease,transform 700ms ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{ height: 1, width: 28, background: RED }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', color: GOLD }}>Traveller Stories</span>
          </div>
          <h2 style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(2.2rem,6vw,4.2rem)', fontWeight: 400, lineHeight: .95, color: DARK, marginBottom: 12 }}>What Our Guests Say</h2>
          <p style={{ color: SLATE, fontSize: 'clamp(.875rem,1.4vw,.975rem)', lineHeight: 1.7, maxWidth: '48ch' }}>Real journeys. Real words. Every review here is from a traveller who trusted us — and came back for more.</p>
        </div>
        <div style={{ marginBottom: 36 }}><TestimonialMarqueeBlock inView={inView} /></div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', paddingTop: 32, borderTop: `1px solid ${GOLD}25`, opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 700ms ease 600ms,transform 700ms ease 600ms' }}>
          <p style={{ color: SLATE, fontSize: 14, lineHeight: 1.7, maxWidth: '44ch' }}>Join thousands of satisfied travellers who have made us their trusted partner for every journey.</p>
          <Link to="/testimonials" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', padding: '14px 28px', borderRadius: 3, textDecoration: 'none', background: `linear-gradient(135deg,${RED},#991B1B)`, color: '#fff', boxShadow: `0 8px 28px -8px ${RED}66` }}>
            Read All Reviews <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════
   HOMEPAGE ASSEMBLY
═══════════════════════════════════════════════════════════════ */
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