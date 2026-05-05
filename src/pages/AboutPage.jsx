'use client'
import React, { useState, useRef, useEffect } from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
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
import AboutImg from '../assets/images/about/about-hero.avif'

import {
  ArrowRight, ArrowUpRight, MapPin, Phone, ShieldCheck, Clock, Award,
  Star, CheckCircle2, Users, HeartHandshake, Handshake, Globe,
  CheckCircle, BadgeCheck, Zap, TrendingDown, Quote, ChevronRight,
  ChevronLeft, Hotel, Car, Binoculars, Package, Briefcase, Building2,
  Ticket, Home, Crown, Gem, Landmark, Theater, Moon, Plane, UtensilsCrossed
} from 'lucide-react'

/* ════════════════════════════════════════════
   TOKENS
════════════════════════════════════════════ */
const GOLD  = '#B8860B'
const GOLD2 = '#D4A017'
const GOLD3 = '#F0C040'
const RED   = '#B91C1C'
const DARK  = '#0F172A'
const DARK2 = '#1C1917'
const SLATE = '#475569'
const STONE = '#78716C'
const CREAM = '#FAFAF5'
const CREAM2= '#F5F0E8'

/* ════════════════════════════════════════════
   HOOKS
════════════════════════════════════════════ */
function useInView(threshold = 0.12) {
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
    const step = ts => {
      if (!t0) t0 = ts
      const p = Math.min((ts - t0) / duration, 1)
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target, duration])
  return val
}

/* ════════════════════════════════════════════
   ATOMS
════════════════════════════════════════════ */
function Rule({ color = GOLD, w = 32 }) {
  return <div style={{ width: w, height: 1, background: `linear-gradient(90deg,${color},${GOLD2})`, flexShrink: 0 }} />
}
function StarRow({ count = 5, accent = GOLD }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={12} style={{ fill: accent, color: accent }} />
      ))}
    </div>
  )
}
function SectionLabel({ color = GOLD, children }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <Rule color={color} w={26} />
      <span style={{ color, fontSize: 10, fontWeight: 700, letterSpacing: '0.26em', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>
        {children}
      </span>
    </div>
  )
}
function SectionHeading({ children, light = false, style = {} }) {
  return (
    <h2 style={{
      fontFamily: "Georgia,'Times New Roman',serif",
      fontSize: 'clamp(2.1rem,4.8vw,3.5rem)',
      fontWeight: 400,
      letterSpacing: '-0.022em',
      color: light ? '#fff' : DARK2,
      lineHeight: 1.06,
      ...style,
    }}>{children}</h2>
  )
}

/* ════════════════════════════════════════════
   1. HERO
════════════════════════════════════════════ */
function AboutHero() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setTimeout(() => setLoaded(true), 60) }, [])

  return (
    <section className="relative w-full overflow-hidden"
      style={{ minHeight: 'clamp(580px,85vh,940px)', background: '#08080f', fontFamily: "Georgia,'Times New Roman',serif" }}>

      <div
  className="absolute inset-0 bg-cover bg-center"
  style={{
    backgroundImage: `url(${AboutImg})`,
    transform: loaded ? 'scale(1.02)' : 'scale(1.10)',
    transition: 'transform 1.6s cubic-bezier(.4,0,.2,1)'
  }}
/>

      <div className="absolute inset-0" style={{ background: 'linear-gradient(108deg,rgba(4,4,10,.98) 0%,rgba(4,4,10,.84) 40%,rgba(4,4,10,.30) 66%,rgba(4,4,10,.06) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg,rgba(4,4,10,.95) 0%,rgba(4,4,10,.40) 22%,transparent 52%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(4,4,10,.52) 0%,transparent 25%)' }} />

      <div className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{ background: `linear-gradient(180deg,transparent,${GOLD} 30%,${GOLD2} 68%,transparent)` }} />

      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: `radial-gradient(rgba(184,134,11,.06) 1px,transparent 1px)`, backgroundSize: '36px 36px' }} />

      <div className="relative z-10 max-w-[1440px] mx-auto flex flex-col justify-center"
        style={{ minHeight: 'clamp(580px,85vh,940px)', padding: 'clamp(5rem,11vh,8rem) clamp(1.5rem,5vw,4rem) clamp(3rem,7vh,5rem)' }}>

        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(22px)', transition: 'opacity .85s ease .1s, transform .85s ease .1s' }}>

          {/* <div className="flex items-center gap-3 mb-7" style={{ fontFamily: 'sans-serif' }}>
            <Rule color={GOLD} w={28} />
            <span className="text-[10px] font-semibold tracking-[.26em] uppercase" style={{ color: GOLD }}>Our Story</span>
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 text-[9px] font-bold tracking-[.16em] uppercase border rounded-sm"
              style={{ color: GOLD2, borderColor: `${GOLD}45`, background: 'rgba(212,160,23,0.12)', fontFamily: 'sans-serif' }}>EST. 2016</span>
          </div> */}

          <h1 className="text-white mb-6"
            style={{ fontSize: 'clamp(3rem,9vw,7.2rem)', fontWeight: 400, letterSpacing: '-0.026em', lineHeight: 0.90 }}>
            We are<br />
            <em style={{ fontStyle: 'italic', color: GOLD }}>Chalo Holidays.</em>
          </h1>

          <p style={{ color: 'rgba(255,255,255,.56)', fontSize: 'clamp(.92rem,1.5vw,1.1rem)', lineHeight: 1.82, maxWidth: '52ch', fontFamily: 'sans-serif', fontWeight: 300, marginBottom: '1.25rem' }}>
            A trusted travel consultant and B2B wholesale tour operator — built on a team of reliable, approachable, and proactive professionals who bring strong skills, knowledge, and experience to everything we do.
          </p>
          {/* <p style={{ color: 'rgba(255,255,255,.38)', fontSize: 'clamp(.84rem,1.2vw,.96rem)', lineHeight: 1.78, maxWidth: '46ch', fontFamily: 'sans-serif', fontWeight: 300, marginBottom: '2.8rem' }}>
            We work not only to respond to your needs — but to partner with you and help your business grow.
          </p> */}

          <div className="flex flex-wrap gap-3" style={{ fontFamily: 'sans-serif' }}>
            <a href="#who-we-are"
              className="inline-flex items-center gap-3 font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:brightness-110 hover:scale-[1.02]"
              style={{ background: `linear-gradient(135deg,${RED},#991B1B)`, color: '#fff', padding: '13px 30px', borderRadius: 2, boxShadow: `0 8px 28px ${RED}50` }}>
              Discover Our Story <ArrowRight size={14} />
            </a>
            <a href="#vision"
              className="inline-flex items-center gap-2 font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:bg-white/10"
              style={{ color: 'rgba(255,255,255,.68)', border: `1px solid ${GOLD}55`, padding: '12px 28px', borderRadius: 2 }}>
              Our Vision
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════
   2. WHO WE ARE  — updated with real content
════════════════════════════════════════════ */
const WHO_PILLARS = [
  { icon: HeartHandshake, title: 'Partner-First Approach',   desc: 'We work alongside you — not just for you. Your business growth is our shared goal.' },
  { icon: ShieldCheck,    title: 'Transparent by Default',   desc: 'No hidden markups. Every rupee is visible, itemised, and justified before you confirm.' },
  { icon: Globe,          title: 'Truly Global Reach',       desc: '200+ destinations, 500+ vetted ground partners, local intelligence on every continent.' },
  { icon: Clock,          title: 'Real-Time Solutions',      desc: 'Fast-moving market demands fast answers — our team delivers timely, effective solutions.' },
]

function WhoWeAre() {
  const [ref, inView] = useInView(0.10)

  return (
    <section id="who-we-are" ref={ref} className="w-full bg-white overflow-hidden">
      {/* Top gold rule */}
      <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}55, transparent)` }} />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 py-20 sm:py-28">

        {/* Section header — centred editorial style */}
        <div className="text-center mb-16"
          style={{ opacity: inView?1:0, transform: inView?'translateY(0)':'translateY(24px)', transition: 'opacity .75s ease, transform .75s ease' }}>
          <SectionLabel color={GOLD}>Who We Are</SectionLabel>
          <SectionHeading style={{ marginBottom: '1.5rem' }}>
            Crafted by travellers,<br /><em style={{ color: GOLD }}>perfected for you.</em>
          </SectionHeading>
          {/* Decorative gold line beneath heading */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <div style={{ width: 48, height: 1, background: `linear-gradient(90deg, transparent, ${GOLD})` }} />
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: GOLD }} />
            <div style={{ width: 48, height: 1, background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
          </div>
        </div>

        {/* Body — two-column prose + blockquote */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 mb-14"
          style={{ opacity: inView?1:0, transform: inView?'translateY(0)':'translateY(24px)', transition: 'opacity .75s ease .1s, transform .75s ease .1s' }}>

          {/* Left column — paragraphs */}
          <div>
            <p className="leading-relaxed mb-5" style={{ fontSize: 'clamp(.95rem,1.4vw,1.05rem)', color: STONE, lineHeight: 1.88 }}>
              Chalo Holiday is a travel consultant and B2B wholesale tour operator powered by a team of reliable, approachable, and proactive professionals. We bring strong skills, knowledge, and experience — working not only to respond to your needs, but to truly partner with you.
            </p>
            <p className="leading-relaxed mb-5" style={{ fontSize: 'clamp(.95rem,1.4vw,1.05rem)', color: STONE, lineHeight: 1.88 }}>
              Today's business environment is fast-moving, complex, and highly competitive. Travel agents need the support of experienced professionals who can deliver timely and effective solutions. At Chalo Holiday, we are committed to providing exactly that.
            </p>
            <p className="leading-relaxed" style={{ fontSize: 'clamp(.95rem,1.4vw,1.05rem)', color: STONE, lineHeight: 1.88 }}>
              You are welcome to register your company on our platform and gain access to hundreds of pages of up-to-date information, exclusive promotions, and attractive hotel deals worldwide.
            </p>
          </div>

          {/* Right column — quote + stat row */}
          <div className="flex flex-col justify-between gap-8">
            <blockquote className="border-l-2 pl-6" style={{ borderColor: GOLD }}>
              <p className="italic leading-relaxed mb-3" style={{ fontFamily: "Georgia,serif", fontSize: 'clamp(1rem,1.5vw,1.15rem)', color: '#44403C', lineHeight: 1.78 }}>
                &ldquo;Chalo Holiday is the result of ambition, courage, encouragement, and continuous dedication — a commitment to delivering journeys that inspire, connect, and create lasting memories.&rdquo;
              </p>
              <cite className="text-[11px] font-semibold uppercase tracking-widest not-italic" style={{ color: STONE }}>— Founder, Chalo Holidays</cite>
            </blockquote>

          </div>
        </div>

        {/* Pillars row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          style={{ opacity: inView?1:0, transform: inView?'translateY(0)':'translateY(24px)', transition: 'opacity .75s ease .2s, transform .75s ease .2s' }}>
          {WHO_PILLARS.map(({ icon: I, title, desc }, i) => {
            const [hov, setHov] = useState(false)
            return (
              <div key={title}
                className="flex flex-col gap-3 p-5 cursor-default transition-all duration-300"
                style={{ border: `1px solid ${hov ? `${GOLD}55` : '#F0EDE8'}`, background: hov ? CREAM : '#fff', transform: hov ? 'translateY(-3px)' : 'none', boxShadow: hov ? `0 12px 28px -8px rgba(0,0,0,.08)` : 'none' }}
                onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
                <div className="w-10 h-10 flex items-center justify-center shrink-0"
                  style={{ background: hov ? `${GOLD}14` : '#F5F0E8', border: `1px solid ${hov ? `${GOLD}40` : '#E7E5E4'}`, transition: 'all 300ms' }}>
                  <I size={16} style={{ color: GOLD }} />
                </div>
                <div>
                  <p className="text-sm font-bold mb-1" style={{ color: DARK2, fontFamily: "Georgia,serif" }}>{title}</p>
                  <p className="text-[12.5px] leading-relaxed" style={{ color: STONE }}>{desc}</p>
                </div>
                <div className="mt-auto h-[1.5px] transition-all duration-500" style={{ width: hov ? '40%' : '0%', background: GOLD }} />
              </div>
            )
          })}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3"
          style={{ opacity: inView?1:0, transition: 'opacity .75s ease .3s' }}>
          <a href="#inquiry"
            className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3 text-white transition-all duration-200 hover:brightness-110 hover:scale-[1.02]"
            style={{ background: `linear-gradient(135deg,${RED},#991B1B)`, borderRadius: 3, boxShadow: `0 6px 20px -6px ${RED}66`, fontFamily: 'sans-serif' }}>
            Plan My Journey <ArrowRight size={15} />
          </a>
          <a href="#register"
            className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3 border transition-all duration-200 hover:bg-stone-50"
            style={{ borderRadius: 3, borderColor: GOLD, color: DARK2, fontFamily: 'sans-serif' }}>
            Register Your Company
          </a>
        </div>

      </div>
    </section>
  )
}

/* ════════════════════════════════════════════
   3. VISION & PRIORITIES — real content
════════════════════════════════════════════ */
const PRIORITIES = [
  'Meet and exceed the expectations of our clients and suppliers',
  'Introduce innovative ideas that enhance our products and services',
  'Continuously improve existing offerings and develop new ones',
  'Maintain service excellence as the core of everything we do',
  'Remain competitive in a dynamic global travel market',
]

function VisionSection() {
  const [ref, inView] = useInView(0.08)

  return (
    <section id="vision" ref={ref} className="relative w-full overflow-hidden py-20 sm:py-28"
      style={{ background: `linear-gradient(135deg, ${CREAM}, ${CREAM2})` }}>

      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage:`linear-gradient(${GOLD}12 1px,transparent 1px),linear-gradient(90deg,${GOLD}12 1px,transparent 1px)`, backgroundSize:'56px 56px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width:800, height:400, background:`radial-gradient(ellipse,${GOLD}20 0%,transparent 70%)`, filter:'blur(60px)' }} />
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background:`linear-gradient(90deg,transparent,${RED},${GOLD},${GOLD2},transparent)` }} />

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">

          {/* Vision */}
          <div style={{ opacity:inView?1:0, transform:inView?'translateY(0)':'translateY(28px)', transition:'opacity .75s ease, transform .75s ease' }}>
            <SectionLabel color={GOLD}>Our Vision</SectionLabel>
            <SectionHeading style={{ marginBottom:'1.5rem' }}>
              A globally trusted<br /><em style={{ color:GOLD }}>travel partner.</em>
            </SectionHeading>
            <p style={{ color:'rgba(0,0,0,.6)', fontSize:'clamp(0.95rem,1.2vw,1.1rem)', lineHeight:1.82, maxWidth:'48ch', fontFamily:'sans-serif', fontWeight:300, marginBottom:'2.5rem' }}>
              To become a globally trusted travel partner by delivering innovative solutions, exceptional service, and unforgettable travel experiences — one journey at a time.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { val:'200+', label:'Destinations Covered', sub:'Across 90+ countries' },
                { val:'500+', label:'Global Partners',      sub:'Hotels, DMCs & operators' },
                { val:'5K+',  label:'Happy Travellers',     sub:'Families, couples, corporates' },
                { val:'24/7', label:'Concierge Support',    sub:'Always on, always ready' },
              ].map(({ val, label, sub }) => {
                const [hov, setHov] = useState(false)
                return (
                  <div key={label} className="p-5 rounded transition-all duration-300 cursor-default"
                    style={{ background:hov?'rgba(255,255,255,.9)':'rgba(255,255,255,.7)', border:`1px solid ${hov?`${GOLD}40`:'rgba(0,0,0,.06)'}`, boxShadow:hov?'0 10px 25px rgba(0,0,0,.08)':'0 4px 12px rgba(0,0,0,.05)', transform:hov?'translateY(-3px)':'none' }}
                    onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
                    <p className="font-black leading-none mb-1" style={{ fontFamily:"Georgia,serif", fontSize:'1.8rem', color:GOLD }}>{val}</p>
                    <p className="text-[12px] font-semibold mb-0.5" style={{ color:'rgba(0,0,0,.75)', fontFamily:'sans-serif' }}>{label}</p>
                    <p className="text-[11px]" style={{ color:'rgba(0,0,0,.45)', fontFamily:'sans-serif' }}>{sub}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Priorities */}
          <div style={{ opacity:inView?1:0, transform:inView?'translateY(0)':'translateY(28px)', transition:'opacity .75s ease .15s, transform .75s ease .15s' }}>
            <SectionLabel color={GOLD2}>Our Priorities</SectionLabel>
            <SectionHeading style={{ marginBottom:'2rem' }}>
              What we stand<br /><em style={{ color:GOLD2 }}>committed to.</em>
            </SectionHeading>

            <div className="flex flex-col gap-3">
              {PRIORITIES.map((p, i) => {
                const [hov, setHov] = useState(false)
                return (
                  <div key={i} className="flex items-center gap-4 p-4 rounded transition-all duration-300 cursor-default"
                    style={{ background:hov?'rgba(255,255,255,.95)':'rgba(255,255,255,.75)', border:`1px solid ${hov?`${GOLD}45`:'rgba(255,255,255,.07)'}`, boxShadow:hov?'0 8px 20px rgba(0,0,0,.06)':'0 3px 10px rgba(0,0,0,.04)', transform:hov?'translateX(6px)':'none' }}
                    onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
                    <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full"
                      style={{ background:`${GOLD}20`, border:`1px solid ${GOLD}` }}>
                      <span style={{ fontFamily:"Georgia,serif", fontSize:'0.72rem', fontWeight:700, color:GOLD }}>{String(i+1).padStart(2,'0')}</span>
                    </div>
                    <p className="text-[14px] leading-snug transition-colors duration-200 font-semibold"
                      style={{ color:hov?'rgba(0,0,0,.85)':'rgba(0,0,0,.6)', fontFamily:'sans-serif' }}>{p}</p>
                    <ArrowRight size={13} className="ml-auto flex-shrink-0 transition-all duration-300"
                      style={{ color:GOLD, opacity:hov?1:0, transform:hov?'translateX(0)':'translateX(-6px)' }} />
                  </div>
                )
              })}
            </div>

            <div className="mt-8 pt-6 border-t" style={{ borderColor:'rgba(255,255,255,.08)' }}>
              <a href="#inquiry"
                className="inline-flex items-center gap-2.5 font-bold text-[11px] uppercase tracking-[.16em] px-7 py-3.5 transition-all duration-300 hover:brightness-110 hover:scale-[1.02]"
                style={{ color:'#fff', background:`linear-gradient(135deg,${RED},#991B1B)`, borderRadius:2, boxShadow:`0 6px 22px -6px ${RED}55`, fontFamily:'sans-serif' }}>
                Start Your Journey <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════
   4. STATS STRIP
════════════════════════════════════════════ */
const STATS = [
  { val: 5000,  suffix: '+',  label: 'Happy Travellers',   sub: 'Families · Couples · Solo',  icon: Users },
  { val: 200,   suffix: '+',  label: 'Destinations',        sub: 'Across 90+ countries',        icon: MapPin },
  { val: 500,   suffix: '+',  label: 'Global Partners',     sub: 'Hotels, DMCs & operators',    icon: Handshake },
  { val: 8,     suffix: '+',  label: 'Years Excellence',    sub: 'Trusted since 2016',          icon: Award },
  { val: 4,     suffix: '.9', label: 'Client Rating',       sub: '2,400+ verified reviews',     icon: Star },
  { val: 98,    suffix: '%',  label: 'Rebooking Rate',      sub: 'Clients who return always',   icon: CheckCircle },
]

function StatCell({ stat, i, started }) {
  const count = useCountUp(stat.val, 1600 + i * 120, started)
  const [hov, setHov] = useState(false)
  const Icon = stat.icon
  return (
    <div className="relative flex flex-col items-center text-center py-10 px-6 cursor-default transition-colors duration-300"
      style={{ background:hov?'rgba(255,255,255,.06)':'transparent' }}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
      <div className="w-10 h-10 flex items-center justify-center rounded-full mb-4 transition-all duration-300"
        style={{ border:`1px solid ${hov?RED:`${GOLD}30`}`, background:hov?`${RED}18`:'transparent' }}>
        <Icon size={15} style={{ color:hov?RED:`${GOLD}88`, transition:'color 300ms' }} />
      </div>
      <div className="flex items-end leading-none mb-2">
        <span className="font-black transition-colors duration-300"
          style={{ fontFamily:"Georgia,'Times New Roman',serif", fontSize:'clamp(2.4rem,4vw,3.2rem)', letterSpacing:'-0.03em', color:hov?GOLD:'#fff' }}>
          {count.toLocaleString()}
        </span>
        <span className="font-bold text-xl pb-1 ml-0.5 transition-colors duration-300" style={{ color:hov?GOLD2:GOLD }}>{stat.suffix}</span>
      </div>
      <p className="text-xs font-semibold tracking-[.1em] uppercase mb-1 transition-colors duration-300" style={{ color:hov?'#fff':'#a8a29e' }}>{stat.label}</p>
      <p className="text-[10px] transition-colors duration-300" style={{ color:hov?GOLD2:'#57534e' }}>{stat.sub}</p>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] transition-all duration-500" style={{ width:hov?'42%':'0%', background:RED }} />
    </div>
  )
}

function StatsStrip() {
  const ref = useRef(null)
  const [started, setStarted] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setStarted(true) },{ threshold:0.12 })
    if(ref.current) io.observe(ref.current)
    return ()=>io.disconnect()
  },[])
  return (
    <section ref={ref} style={{ background:DARK2, borderTop:`1px solid ${GOLD}18`, borderBottom:`1px solid ${GOLD}18` }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {STATS.map((s,i)=>(
            <div key={s.label} style={{ borderLeft:i>0?'1px solid rgba(255,255,255,.07)':'none' }}>
              <StatCell stat={s} i={i} started={started} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════
   5. OUR ACTIVITIES  — real company content
════════════════════════════════════════════ */
const ACTIVITIES_LIST = [
  { icon: Landmark,     label: 'Disneyland Paris Partner',         desc: 'Proud official partner of Disneyland Paris — exclusive packages and priority access for all our clients.', tag:'Official Partner' },
  { icon: Hotel,        label: 'Worldwide Hotel Bookings',          desc: 'B2B & B2C global inventory across IHG, Hyatt, Marriott, Hilton, Accor, Four Seasons, Rosewood, Shangri-La and hundreds more.', tag:'500+ Chains' },
  { icon: Ticket,       label: 'Sports & Event Ticketing',          desc: 'Exclusive access to global sports events, concerts, and premium live experiences worldwide.', tag:'Live Events' },
  { icon: Moon,         label: 'Late-Night Activities',             desc: 'Curated evening experiences, late-night tours, and unique after-dark cultural encounters at top destinations.', tag:'Experiences' },
  { icon: Users,        label: 'Family Holiday Packages',           desc: 'Multigenerational trips meticulously designed for every age group, preference, and family dynamic.', tag:'Family' },
  { icon: Briefcase,    label: 'Business Travel Solutions',         desc: 'MICE, corporate bookings, executive travel, policy management, and consolidated billing for organisations.', tag:'Corporate' },
  { icon: Plane,        label: 'Solo Travel Arrangements',          desc: 'Safe, seamless, and enriching solo adventures — curated for independent travellers across every destination.', tag:'Solo' },
  { icon: Car,          label: 'Ground Support Services',           desc: 'Car hire, chauffeur service, sightseeing tours, attraction tickets, and theatre bookings worldwide.', tag:'24/7' },
  { icon: Building2,    label: 'Meetings & Conferences',            desc: 'End-to-end MICE logistics — from venue selection and AV setup to on-site management and catering.', tag:'MICE' },
  { icon: Home,         label: 'Serviced Apartment Bookings',       desc: 'Extended-stay solutions across 90+ countries for long trips, relocations, and executive assignments.', tag:'Extended Stay' },
  { icon: Binoculars,   label: 'Sightseeing & Guided Tours',       desc: 'Skip-the-line private tours with expert multilingual guides at the world\'s most iconic destinations.', tag:'Guided' },
  { icon: Gem,          label: 'Luxury & VIP Travel',              desc: 'Private jets, super-premium suites, Dorchester Collection, Nobu Hotels, and white-glove concierge throughout.', tag:'Ultra-Luxury' },
]

function OurActivities() {
  const [ref, inView] = useInView(0.06)

  return (
    <section ref={ref} className="relative w-full py-20 sm:py-28 overflow-hidden" style={{ background: CREAM }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage:`radial-gradient(rgba(184,134,11,.08) 1px,transparent 1px)`, backgroundSize:'32px 32px' }} />

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14"
          style={{ opacity:inView?1:0, transform:inView?'translateY(0)':'translateY(24px)', transition:'opacity .7s ease, transform .7s ease' }}>
          <div>
            <SectionLabel color={RED}>Our Activities</SectionLabel>
            <SectionHeading>Everything you need<br /><em style={{ color:GOLD }}>under one roof.</em></SectionHeading>
          </div>
          <p style={{ color:STONE, fontSize:'1rem', lineHeight:1.80, maxWidth:'38ch', fontFamily:'sans-serif' }}>
            From a simple hotel night to a complex multi-country expedition — we manage every element with the same meticulous care and expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {ACTIVITIES_LIST.map(({ icon:I, label, desc, tag }, i) => {
            const [hov, setHov] = useState(false)
            return (
              <div key={label}
                className="relative flex flex-col gap-3 p-5 rounded-sm cursor-default transition-all duration-400 overflow-hidden"
                style={{ background:hov?'#fff':CREAM2, border:`1px solid ${hov?`${GOLD}55`:'#E8E5E1'}`, boxShadow:hov?`0 20px 48px -12px rgba(0,0,0,.12),0 0 0 1px ${GOLD}20`:'0 1px 4px rgba(0,0,0,.04)', transform:inView?(hov?'translateY(-5px)':'translateY(0)'):'translateY(32px)', opacity:inView?1:0, transition:`background 350ms,border-color 350ms,box-shadow 350ms,transform ${hov?'350ms':'600ms'} cubic-bezier(.4,0,.2,1),opacity .65s ease ${i*45}ms` }}
                onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
                <div className="absolute top-0 left-0 h-[2px] transition-all duration-500"
                  style={{ width:hov?'100%':'0%', background:`linear-gradient(90deg,${GOLD},${GOLD2})` }} />
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded flex items-center justify-center transition-all duration-300"
                    style={{ background:hov?`${GOLD}18`:'#EDE8DF', border:`1px solid ${hov?`${GOLD}45`:'#E0DBD0'}` }}>
                    <I size={15} style={{ color:hov?GOLD:STONE, transition:'color 300ms', strokeWidth:1.6 }} />
                  </div>
                  <span className="text-[8px] font-bold px-2 py-0.5 tracking-widest leading-none"
                    style={{ borderRadius:2, background:`${GOLD}14`, color:GOLD, border:`1px solid ${GOLD}30`, fontFamily:'sans-serif' }}>{tag}</span>
                </div>
                <div>
                  <p className="text-[14px] font-semibold mb-1 leading-tight" style={{ fontFamily:"Georgia,'Times New Roman',serif", color:DARK2 }}>{label}</p>
                  <p className="text-[13px] leading-snug" style={{ color:STONE, fontFamily:'sans-serif', fontWeight:300 }}>{desc}</p>
                </div>
                <div className="flex items-center gap-1.5 mt-auto transition-all duration-300"
                  style={{ opacity:hov?1:0, transform:hov?'translateY(0)':'translateY(4px)' }}>
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color:GOLD, fontFamily:'sans-serif' }}>Learn More</span>
                  <ArrowUpRight size={10} style={{ color:GOLD }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════
   6. GLOBAL NETWORK  — updated hotel list
════════════════════════════════════════════ */
const HOTEL_GROUPS = [
  { name: 'Disneyland',        logo: DisneyLogo },
  { name: 'Starwood',          logo: StarwoodLogo },
  { name: 'Rail Europe',       logo: RailEuropeLogo },
  { name: 'IHG',               logo: IhgLogo },
  { name: 'Hyatt',             logo: HyattLogo },
  { name: 'Hilton',            logo: HiltonLogo },
  { name: 'Accor',             logo: AccorLogo },
  { name: 'Four Seasons',      logo: FourSeasonsLogo },
  { name: 'Jumeirah',          logo: JumeirahLogo },
  { name: 'Kempinski',         logo: KempinskiLogo },
  { name: 'Mandarin Oriental', logo: MandarinLogo },
  { name: 'Melia',             logo: MeliaLogo },
  { name: 'Radisson',          logo: RadissonLogo },
  { name: 'Rosewood',          logo: RosewoodLogo },
  { name: 'Wyndham',           logo: WyndhamLogo },
  { name: 'Global',            logo: GlobalLogo },
]

/* ── Inject keyframe once at module level ── */
if (typeof document !== 'undefined' && !document.getElementById('partners-marquee-style')) {
  const s = document.createElement('style')
  s.id = 'partners-marquee-style'
  s.textContent = `
    @keyframes partners-marquee {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
  `
  document.head.appendChild(s)
}

function HotelCell({ name, logo }) {
  const [hov, setHov] = useState(false)

  const cornerPaths = [
    { top: 8,    left: 8,   path: 'M0 14 L0 0 L14 0' },
    { top: 8,    right: 8,  path: 'M0 0 L14 0 L14 14' },
    { bottom: 8, left: 8,   path: 'M0 0 L0 14 L14 14' },
    { bottom: 8, right: 8,  path: 'M14 0 L14 14 L0 14' },
  ]

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        width: 'calc(100vw / 5)',
        minWidth: 180,
        maxWidth: 260,
        height: 160,
        cursor: 'pointer',
        background: hov ? '#FFFFFF' : '#F7F3EE',
        borderRight: '1px solid #CBBFA8',
        borderTop: '1px solid #CBBFA8',
        borderBottom: '1px solid #CBBFA8',
        boxSizing: 'border-box',
        transition: 'background .35s ease',
        flexShrink: 0,
      }}
    >
      {/* Gold inset border on hover */}
      <div style={{
        position: 'absolute', inset: 0,
        border: `1.5px solid ${hov ? GOLD : 'transparent'}`,
        pointerEvents: 'none',
        transition: 'border-color .35s ease',
        zIndex: 2,
      }} />

      {/* Gold corner hairlines */}
      {cornerPaths.map(({ path, ...pos }, ci) => (
        <svg
          key={ci}
          width="16" height="16" viewBox="0 0 16 16"
          style={{
            position: 'absolute',
            opacity: hov ? 0.7 : 0,
            transition: 'opacity .35s ease',
            zIndex: 3,
            ...pos,
          }}
        >
          <path d={path} fill="none" stroke={GOLD} strokeWidth="0.8" />
        </svg>
      ))}

      {/* Logo */}
      <div style={{
        width: '75%',
        height: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 12px',
        boxSizing: 'border-box',
      }}>
        <img
          src={logo}
          alt={name}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            display: 'block',
            filter: hov
              ? 'grayscale(0%) brightness(1) contrast(1)'
              : 'grayscale(100%) brightness(0.75) contrast(1.15)',
            transform: hov ? 'scale(1.06)' : 'scale(1)',
            transition: 'filter .4s ease, transform .4s ease',
          }}
        />
      </div>

      {/* Name tag */}
      <span style={{
        fontSize: 9,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: hov ? GOLD : '#B0A090',
        transition: 'color .35s ease',
        fontWeight: 500,
      }}>
        {name}
      </span>
    </div>
  )
}

function GlobalNetwork() {
  const [ref, inView] = useInView(0.08)
  const [paused, setPaused] = useState(false)

  const doubled = [...HOTEL_GROUPS, ...HOTEL_GROUPS]

  return (
    <section
      ref={ref}
      style={{
        background: '#F7F3EE',
        padding: 'clamp(5rem,9vw,7rem) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(${GOLD}07 1px,transparent 1px),linear-gradient(90deg,${GOLD}07 1px,transparent 1px)`,
        backgroundSize: '52px 52px',
      }} />

      {/* Top & Bottom rule */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${GOLD}50,transparent)` }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${GOLD}30,transparent)` }} />

      {/* Section corner ornaments */}
      {[
        { top: 20,    left: 20,  path: 'M1 22 L1 1 L22 1' },
        { top: 20,    right: 20, path: 'M1 1 L22 1 L22 22' },
        { bottom: 20, left: 20,  path: 'M1 1 L1 22 L22 22' },
        { bottom: 20, right: 20, path: 'M22 1 L22 22 L1 22' },
      ].map(({ path, ...pos }, i) => (
        <svg
          key={i} width="24" height="24" viewBox="0 0 24 24"
          style={{ position: 'absolute', opacity: 0.4, ...pos }}
        >
          <path d={path} fill="none" stroke={GOLD} strokeWidth="1" />
        </svg>
      ))}

      <div className="max-w-[1200px] mx-auto px-6">

        {/* ── HEADER ── */}
        <div style={{
          textAlign: 'center',
          maxWidth: 700,
          margin: '0 auto 60px',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all .8s ease',
        }}>
          {/* Eyebrow */}
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: 12, marginBottom: 18,
          }}>
            <div style={{ width: 40, height: 1, background: `linear-gradient(90deg,transparent,${GOLD})` }} />
            <span style={{
              fontSize: 10, letterSpacing: '0.3em',
              textTransform: 'uppercase', color: GOLD, fontWeight: 700,
            }}>
              Global Hotel Network
            </span>
            <div style={{ width: 40, height: 1, background: `linear-gradient(90deg,${GOLD},transparent)` }} />
          </div>

          {/* Heading */}
          <h2 style={{
            fontFamily: "Georgia, serif",
            fontSize: 'clamp(2.2rem,4.5vw,3.3rem)',
            fontWeight: 300,
            lineHeight: 1.2,
            color: '#1A1510',
            marginBottom: 20,
          }}>
            The world's finest <br />
            <em style={{ color: GOLD }}>at your fingertips.</em>
          </h2>

          {/* Description */}
          <p style={{
            fontSize: 'clamp(.9rem,1.2vw,1rem)',
            color: '#6F6253',
            lineHeight: 1.9,
            maxWidth: '55ch',
            margin: '0 auto 28px',
          }}>
            We collaborate with the world's leading international hotel groups
            across the UK, Europe, Asia, the Middle East, and beyond — giving
            our partners unrivalled access and highly competitive rates.
          </p>

          {/* Button */}
          <a
            href="#inquiry"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#fff',
              background: '#1A1510',
              padding: '14px 30px',
              textDecoration: 'none',
              border: `1px solid ${GOLD}40`,
              transition: 'all .3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = GOLD
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#1A1510'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Become a Partner →
          </a>
        </div>

        {/* ── MARQUEE ── */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid #CBBFA8',
          opacity: inView ? 1 : 0,
          transition: 'opacity .7s ease .15s',
        }}>

          {/* Left fade */}
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0,
            width: 100, zIndex: 10, pointerEvents: 'none',
            background: 'linear-gradient(90deg,#F7F3EE,transparent)',
          }} />

          {/* Right fade */}
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0,
            width: 100, zIndex: 10, pointerEvents: 'none',
            background: 'linear-gradient(270deg,#F7F3EE,transparent)',
          }} />

          {/* Scrolling track */}
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            style={{
              display: 'flex',
              width: 'max-content',
              animation: 'partners-marquee 32s linear infinite',
              animationPlayState: paused ? 'paused' : 'running',
            }}
          >
            {doubled.map(({ name, logo }, i) => (
              <HotelCell
                key={`${name}-${i}`}
                name={name}
                logo={logo}
              />
            ))}
          </div>
        </div>

        {/* ── Footer note ── */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 10, marginTop: 36,
          opacity: inView ? 1 : 0,
          transition: 'opacity .7s ease .3s',
        }}>
          <div style={{
            width: 1, height: 36,
            background: `linear-gradient(to bottom, transparent, ${GOLD}70, transparent)`,
          }} />
          <p style={{
            fontFamily: "Georgia,'Times New Roman',serif",
            fontStyle: 'italic',
            fontSize: 12.5,
            color: '#9A8B7A',
            margin: 0,
            letterSpacing: '0.04em',
          }}>
            Preferred rates & exclusive privileges across every brand
          </p>
        </div>

      </div>
    </section>
  )
}
/* ════════════════════════════════════════════
   7. WHY CHOOSE US
════════════════════════════════════════════ */
const WHY_ITEMS = [
  { id:'01', icon: Award,         accent: GOLD,  title: 'Competitive Global Rates',           body: 'Our consolidated purchasing power across 500+ global partners gives you world-class experiences at prices that simply cannot be matched.' },
  { id:'02', icon: ShieldCheck,   accent: RED,   title: '100% Transparent Pricing',           body: 'No hidden markups. Every cost is visible, itemised, and agreed before you pay a single rupee. Trusted by clients and partners alike.' },
  { id:'03', icon: Clock,         accent: GOLD2, title: 'Timely & Effective Solutions',       body: 'Today\'s fast-moving market demands fast answers — real-time solutions, rapid confirmations, and an operations team that treats every second as precious.' },
  { id:'04', icon: Globe,         accent: RED,   title: 'Wide Range of Travel Activities',    body: 'From family holidays and solo adventures to luxury VIP travel and late-night experiences — our portfolio covers every traveller type and aspiration.' },
  { id:'05', icon: HeartHandshake, accent: GOLD, title: 'Dedicated Partner Support',          body: 'We work alongside you — not just for you. A named consultant guides you from first enquiry through to your client\'s safe return, every time.' },
  { id:'06', icon: Handshake,     accent: GOLD2, title: 'Trusted International Partnerships', body: 'Official partnerships with Disneyland Paris, IHG, Marriott, Hilton, Four Seasons, and 500+ vetted global partners — unlocking inventory others cannot access.' },
]

function WhyChooseUs() {
  const [ref, inView] = useInView(0.06)

  return (
    <section ref={ref} className="w-full py-20 sm:py-28" style={{ background:'#fff' }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14"
          style={{ opacity:inView?1:0, transform:inView?'translateY(0)':'translateY(24px)', transition:'opacity .7s ease, transform .7s ease' }}>
          <div>
            <SectionLabel color={RED}>Why Choose Us</SectionLabel>
            <SectionHeading>Six reasons partners<br /><em style={{ color:GOLD }}>trust us — and grow.</em></SectionHeading>
          </div>
          <p style={{ color:STONE, fontSize:'.875rem', lineHeight:1.80, maxWidth:'38ch', fontFamily:'sans-serif' }}>
            Built on a foundation of reliability, innovation, and genuine care — for both our end travellers and our B2B trade partners.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_ITEMS.map((item, i) => {
            const Icon = item.icon
            const [hov, setHov] = useState(false)
            return (
              <article key={item.id}
                className="relative overflow-hidden cursor-default transition-all duration-500"
                style={{ background:'#fff', border:`1px solid ${hov?item.accent+'50':'#E8E5E1'}`, borderRadius:5, boxShadow:hov?`0 24px 56px -12px ${item.accent}20`:'0 2px 12px -4px rgba(28,25,23,.06)', transform:inView?(hov?'translateY(-6px)':'translateY(0)'):'translateY(32px)', opacity:inView?1:0, transition:`transform ${hov?'350ms':'600ms'} cubic-bezier(.4,0,.2,1),box-shadow 400ms,border-color 400ms,opacity 600ms ease ${i*80}ms` }}
                onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
                <div style={{ height:2, background:hov?`linear-gradient(90deg,${item.accent},${GOLD2})`:'transparent', transition:'background 400ms' }} />
                <div className="p-6 sm:p-7">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-300"
                      style={{ background:hov?`${item.accent}18`:'#F5F2EE', border:`1px solid ${hov?item.accent+'40':'#E8E5E1'}` }}>
                      <Icon size={18} style={{ color:hov?item.accent:'#94A3B8', transition:'color 300ms' }} />
                    </div>
                    <span className="font-black text-3xl" style={{ fontFamily:"Georgia,serif", color:hov?`${item.accent}28`:'#F1F5F9', transition:'color 300ms' }}>{item.id}</span>
                  </div>
                  <h3 className="font-bold mb-3" style={{ fontFamily:"Georgia,serif", fontSize:'1.05rem', color:DARK2 }}>{item.title}</h3>
                  <div style={{ height:1, background:hov?`linear-gradient(90deg,${item.accent}44,transparent)`:'#EBE8E4', marginBottom:12, transition:'background 400ms' }} />
                  <p className="text-[13px] leading-relaxed" style={{ color:STONE }}>{item.body}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════
   8. TIMELINE
════════════════════════════════════════════ */
const MILESTONES = [
  { year:'2016', title:'Founded',                 desc:'Chalo Holidays opens its doors with a team of passionate travel professionals and a bold vision for the industry.' },
  { year:'2017', title:'First 500 Travellers',    desc:'Word-of-mouth growth takes us to 500 satisfied travellers within 18 months — a milestone built purely on trust.' },
  { year:'2018', title:'Corporate Division',      desc:'Launch of our corporate travel vertical, partnering with 30+ companies across India for MICE and executive travel.' },
  { year:'2019', title:'IATA Accreditation',      desc:'Achieved global IATA certification — unlocking access to 200+ airlines and worldwide fare consolidation.' },
  { year:'2020', title:'Digital Transformation',  desc:'Launched our proprietary platform enabling fully digital, contactless itinerary management.' },
  { year:'2021', title:'2,000 Travellers',        desc:'Crossed 2,000 active travellers; recognised by Ministry of Tourism for service excellence.' },
  { year:'2022', title:'Global Network: 500+',    desc:'Expanded to 500+ ground partners across 90 countries — on-ground support at every destination.' },
  { year:'2023', title:'Disneyland Paris Partner',desc:'Became an official proud partner of Disneyland Paris, adding exclusive family packages to our portfolio.' },
  { year:'2024', title:'5,000+ Travellers',       desc:'Proud to serve over 5,000 travellers annually — each journey a testament to our unwavering commitment.' },
]

function OurJourney() {
  const [ref, inView] = useInView(0.06)

  return (
    <section ref={ref} className="w-full py-20 sm:py-28 overflow-hidden" style={{ background:DARK }}>
      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-16"
          style={{ opacity:inView?1:0, transform:inView?'translateY(0)':'translateY(24px)', transition:'opacity .7s ease, transform .7s ease' }}>
          <SectionLabel color={GOLD}>Our Journey</SectionLabel>
          <SectionHeading light>A decade of <em style={{ color:GOLD }}>milestones.</em></SectionHeading>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden lg:block"
            style={{ background:`linear-gradient(180deg,transparent,${GOLD}55 10%,${GOLD}55 90%,transparent)` }} />
          <div className="flex flex-col gap-0">
            {MILESTONES.map((m, i) => {
              const isLeft = i % 2 === 0
              const card = (
                <div className="lg:max-w-sm w-full p-5 rounded-sm group hover:bg-stone-900 transition-colors duration-300"
                  style={{ border:`1px solid ${GOLD}22`, background:'rgba(255,255,255,.05)' }}>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 mb-3"
                    style={{ color:GOLD, background:`${GOLD}18`, border:`1px solid ${GOLD}35`, borderRadius:2 }}>{m.year}</span>
                  <h3 className="font-semibold mb-2 text-white" style={{ fontFamily:"Georgia,serif", fontSize:'1.05rem' }}>{m.title}</h3>
                  <p className="text-[12.5px] leading-relaxed" style={{ color:'rgba(255,255,255,.45)' }}>{m.desc}</p>
                </div>
              )
              return (
                <div key={m.year}
                  className="relative grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12"
                  style={{ opacity:inView?1:0, transform:inView?'translateY(0)':'translateY(28px)', transition:`opacity .7s ease ${i*80}ms, transform .7s ease ${i*80}ms`, paddingBottom:'2.5rem' }}>
                  <div className={`flex ${isLeft?'lg:justify-end':'lg:invisible'}`}>{isLeft && card}</div>
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-5" style={{ zIndex:10 }}>
                    <div style={{ width:12, height:12, borderRadius:'50%', background:GOLD, border:`2px solid ${DARK}`, boxShadow:`0 0 0 4px ${GOLD}30` }} />
                  </div>
                  <div className={`flex ${!isLeft?'lg:justify-start':'lg:invisible'}`}>{!isLeft && card}</div>
                  <div className="lg:hidden col-span-1 p-5 rounded-sm"
                    style={{ border:`1px solid ${GOLD}22`, background:'rgba(255,255,255,.05)', gridColumn:'1/-1' }}>
                    <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 mb-3"
                      style={{ color:GOLD, background:`${GOLD}18`, border:`1px solid ${GOLD}35`, borderRadius:2 }}>{m.year}</span>
                    <h3 className="font-semibold mb-2 text-white" style={{ fontFamily:"Georgia,serif", fontSize:'1.05rem' }}>{m.title}</h3>
                    <p className="text-[12.5px] leading-relaxed" style={{ color:'rgba(255,255,255,.45)' }}>{m.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════
   9. CREDENTIALS
════════════════════════════════════════════ */
const CREDS = [
  { icon: BadgeCheck,   title: 'IATA Accredited Member',          desc: 'Full IATA accreditation giving access to 200+ airlines and global fare consolidation.' },
  { icon: Award,        title: 'Disneyland Paris Official Partner',desc: 'Proud official partner of Disneyland Paris — exclusive packages and priority access.' },
  { icon: Star,         title: 'ISO 9001 : 2015 Certified',       desc: 'Internationally certified quality management systems — every process is audited.' },
  { icon: CheckCircle2, title: 'Ministry of Tourism Recognised',  desc: 'Officially recognised by India\'s Ministry of Tourism for service excellence.' },
  { icon: ShieldCheck,  title: '5-Star Trustpilot & Google',      desc: 'Consistently rated five stars across 2,400+ independent verified reviews.' },
  { icon: Globe,        title: 'OTOAI Member',                    desc: 'Active member of the Outbound Tour Operators Association of India.' },
]

function Credentials() {
  const [ref, inView] = useInView(0.08)

  return (
    <section id="credentials" ref={ref} className="w-full py-20 sm:py-28" style={{ background:'#fff' }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-14"
          style={{ opacity:inView?1:0, transform:inView?'translateY(0)':'translateY(24px)', transition:'opacity .7s ease, transform .7s ease' }}>
          <SectionLabel color={GOLD}>Trust & Accreditation</SectionLabel>
          <SectionHeading style={{ textAlign:'center' }}>
            Globally trusted,<br /><em style={{ color:GOLD }}>independently verified.</em>
          </SectionHeading>
          <p className="leading-relaxed mt-4 mx-auto text-sm" style={{ color:STONE, maxWidth:'46ch' }}>
            Our credentials are not decorations — they represent the rigorous standards we hold ourselves to every single day.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CREDS.map(({ icon:I, title, desc }, i) => {
            const [hov, setHov] = useState(false)
            return (
              <div key={title}
                className="flex items-start gap-4 p-6 cursor-default transition-all duration-400 rounded-sm"
                style={{ border:`1px solid ${hov?`${GOLD}60`:'#E8E5E1'}`, background:hov?CREAM:'#fff', boxShadow:hov?`0 12px 36px -8px ${GOLD}18`:'0 2px 12px -4px rgba(28,25,23,.05)', opacity:inView?1:0, transform:inView?'translateY(0)':'translateY(28px)', transition:`border-color 400ms,background 400ms,box-shadow 400ms,opacity .7s ease ${i*80}ms,transform .7s ease ${i*80}ms` }}
                onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
                <div className="w-11 h-11 flex items-center justify-center rounded-xl shrink-0 transition-all duration-300"
                  style={{ background:hov?`${GOLD}18`:'#F5F0E8', border:`1px solid ${hov?`${GOLD}50`:'#E7E5E4'}` }}>
                  <I size={18} style={{ color:hov?GOLD:'#A8A29E', transition:'color 300ms' }} />
                </div>
                <div>
                  <p className="font-bold text-sm mb-1.5" style={{ color:DARK2 }}>{title}</p>
                  <p className="text-[12.5px] leading-relaxed" style={{ color:STONE }}>{desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════
   10. TESTIMONIALS
════════════════════════════════════════════ */



/* ════════════════════════════════════════════
   11. REGISTER CTA — new section
════════════════════════════════════════════ */
function RegisterCTA() {
  const [ref, inView] = useInView(0.10)

  return (
    <section id="register" ref={ref} className="relative w-full overflow-hidden py-20 sm:py-28"
      style={{ background: DARK2 }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage:`radial-gradient(${GOLD}10 1px,transparent 1px)`, backgroundSize:'36px 36px' }} />
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background:`linear-gradient(90deg,transparent,${GOLD},${RED},${GOLD2},transparent)` }} />

      <div className="relative max-w-[900px] mx-auto px-4 sm:px-6 lg:px-12 text-center"
        style={{ opacity:inView?1:0, transform:inView?'translateY(0)':'translateY(28px)', transition:'opacity .75s ease, transform .75s ease' }}>
        <SectionLabel color={GOLD}>Register Today</SectionLabel>
        <SectionHeading light style={{ marginBottom:'1.5rem' }}>
          Take full advantage of<br /><em style={{ color:GOLD }}>our online services.</em>
        </SectionHeading>
        <p style={{ color:'rgba(255,255,255,.55)', fontSize:'clamp(.9rem,1.4vw,1.08rem)', lineHeight:1.85, maxWidth:'56ch', fontFamily:'sans-serif', fontWeight:300, margin:'0 auto 2rem' }}>
          Register your company on our platform and gain access to hundreds of pages of up-to-date information, exclusive promotions, and attractive hotel deals worldwide. Join thousands of travel agents who trust Chalo Holiday as their B2B partner.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-left">
          {[
            { label:'Exclusive Deals',    desc:'Hundreds of exclusive hotel promotions, updated daily.' },
            { label:'Real-Time Inventory',desc:'Live availability across 1,200+ partner hotels worldwide.' },
            { label:'Dedicated Support',  desc:'A named account manager assigned to your company.' },
          ].map(({ label, desc }) => (
            <div key={label} className="flex items-start gap-3 p-4"
              style={{ border:`1px solid ${GOLD}28`, background:'rgba(255,255,255,.04)' }}>
              <CheckCircle2 size={14} style={{ color:GOLD, flexShrink:0, marginTop:2 }} />
              <div>
                <p className="text-[13px] font-bold mb-0.5 text-white">{label}</p>
                <p className="text-[11.5px]" style={{ color:'rgba(255,255,255,.40)', fontFamily:'sans-serif' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="#inquiry"
            className="inline-flex items-center gap-3 font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:brightness-110 hover:scale-[1.02]"
            style={{ background:`linear-gradient(135deg,${RED},#991B1B)`, color:'#fff', padding:'14px 34px', borderRadius:2, boxShadow:`0 8px 28px ${RED}50`, fontFamily:'sans-serif' }}>
            Register Your Company <ArrowRight size={14} />
          </a>
          <a href="#who-we-are"
            className="inline-flex items-center gap-2 font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:bg-white/10"
            style={{ color:'rgba(255,255,255,.60)', border:`1px solid ${GOLD}50`, padding:'13px 28px', borderRadius:2, fontFamily:'sans-serif' }}>
            Learn More
          </a>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════
   10. TESTIMONIALS
════════════════════════════════════════════ */
const TESTIMONIALS = [
  { id:1, name:'Priya Sharma',    role:'Honeymooner',             location:'Mumbai, India',    rating:5, service:'Holiday Package',   text:'Every single detail of our Maldives honeymoon was flawless. From the private transfer to the overwater villa, everything exceeded our expectations. We felt like royalty throughout.', avatar:'PS', accent:GOLD,  destination:'Maldives' },
  { id:2, name:'James Whitfield', role:'Corporate Travel Manager',location:'London, UK',       rating:5, service:'Corporate Bookings',text:'We have worked with dozens of agencies. None have matched the precision, communication, and genuine care that this team brings. Our board has been delighted every single trip.', avatar:'JW', accent:DARK,  destination:'Singapore' },
  { id:3, name:'Ananya Krishnan', role:'Family Traveller',        location:'Bangalore, India', rating:5, service:'Group Bookings',   text:'Coordinating 22 family members across three generations sounded like chaos — but our coordinator made it effortless. The Kerala itinerary was beautifully paced and unforgettable.', avatar:'AK', accent:GOLD2, destination:'Kerala, India' },
  { id:4, name:'Marco De Luca',   role:'Solo Explorer',           location:'Milan, Italy',     rating:5, service:'Sightseeing',       text:'The private after-hours access to Angkor Wat at sunrise — with just our guide and the silence of the ancient stone — is something I will carry for the rest of my life.', avatar:'MD', accent:GOLD,  destination:'Cambodia' },
  { id:5, name:'Ritu Mehta',      role:'Luxury Traveller',        location:'Delhi, India',     rating:5, service:'Hotels',            text:'The hotel curation is extraordinary. Each property felt like a personal discovery — not a booking. Our suite at Udaipur was upgraded before we even arrived.', avatar:'RM', accent:RED,   destination:'Rajasthan' },
  { id:6, name:'Chen Wei',        role:'Business Traveller',      location:'Shanghai, China',  rating:5, service:'Transfers',         text:'The meet-and-greet at Dubai Airport was waiting before my flight landed. Seamless bilingual driver, impeccable vehicle, and remarkable attention to every detail.', avatar:'CW', accent:GOLD2, destination:'Dubai, UAE' },
]

function TestimonialsSection() {
  const [ref, inView] = useInView(0.08)
  const [active, setActive] = useState(0)
  const [anim, setAnim] = useState(false)
  const intRef = useRef(null)
  const t = TESTIMONIALS[active]

  const goTo = (i) => { if(anim) return; setAnim(true); setTimeout(()=>{ setActive(i); setAnim(false) },280) }
  const prev = ()=>{ clearInterval(intRef.current); goTo((active-1+TESTIMONIALS.length)%TESTIMONIALS.length) }
  const next = ()=>{ clearInterval(intRef.current); goTo((active+1)%TESTIMONIALS.length) }

  useEffect(()=>{
    intRef.current = setInterval(()=>setActive(p=>(p+1)%TESTIMONIALS.length),5500)
    return ()=>clearInterval(intRef.current)
  },[])

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden" style={{ background:'#FAFAF8' }}>
      <div className="pointer-events-none absolute inset-0"
        style={{ backgroundImage:`radial-gradient(circle,#E2E8F0 1px,transparent 1px)`, backgroundSize:'40px 40px', opacity:.45 }} />

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
          style={{ opacity:inView?1:0, transform:inView?'translateY(0)':'translateY(24px)', transition:'opacity .7s ease, transform .7s ease' }}>
          <div>
            <SectionLabel color={RED}>Traveller Stories</SectionLabel>
            <SectionHeading>What our guests <em style={{ color:GOLD }}>say.</em></SectionHeading>
          </div>
          <div className="flex items-center gap-3">
            <StarRow count={5} accent={GOLD} />
            <span className="text-sm font-bold" style={{ color:DARK2 }}>4.9 / 5</span>
            <span className="text-sm" style={{ color:STONE }}>· 2,400+ reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          {/* Featured card */}
          <div className="relative overflow-hidden rounded-sm"
            style={{ background:DARK, minHeight:380, opacity:inView?1:0, transform:inView?'translateY(0)':'translateY(32px)', transition:'opacity .7s ease .15s, transform .7s ease .15s' }}>
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:`linear-gradient(${GOLD}08 1px,transparent 1px),linear-gradient(90deg,${GOLD}08 1px,transparent 1px)`, backgroundSize:'48px 48px' }} />
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background:`linear-gradient(90deg,${RED},${GOLD},${GOLD2})` }} />
            <div className="absolute bottom-5 right-7 pointer-events-none opacity-[0.05]">
              <Quote size={110} style={{ color:GOLD, fill:GOLD }} />
            </div>
            <div className="relative z-10 p-8 sm:p-12 flex flex-col" style={{ minHeight:380 }}>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[9px] font-bold uppercase tracking-[.2em] px-2.5 py-1"
                  style={{ background:`${RED}22`, color:'#fff', border:`1px solid ${RED}55`, borderRadius:2 }}>{t.service}</span>
                <StarRow count={t.rating} accent={GOLD} />
                <span className="text-[10px] ml-auto" style={{ color:GOLD }}>{t.destination}</span>
              </div>
              <p className="leading-relaxed flex-1 mb-8"
                style={{ fontFamily:"Georgia,'Times New Roman',serif", fontSize:'clamp(1rem,2vw,1.18rem)', color:'rgba(255,255,255,.80)', fontStyle:'italic', maxWidth:'56ch', opacity:anim?0:1, transform:anim?'translateY(8px)':'translateY(0)', transition:'opacity 280ms, transform 280ms' }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-end justify-between gap-6 flex-wrap"
                style={{ opacity:anim?0:1, transition:'opacity 280ms' }}>
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center font-black text-base flex-shrink-0"
                    style={{ width:50, height:50, borderRadius:'50%', background:`${t.accent}30`, border:`2px solid ${t.accent}60`, color:t.accent, fontFamily:"Georgia,serif" }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-white leading-none mb-1" style={{ fontFamily:"Georgia,serif", fontSize:'1rem' }}>{t.name}</p>
                    <p className="text-[11px]" style={{ color:'rgba(255,255,255,.40)' }}>{t.role} · {t.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={prev} className="flex items-center justify-center" style={{ width:36, height:36, borderRadius:3, background:'rgba(255,255,255,.08)', border:'1px solid rgba(255,255,255,.12)', color:'rgba(255,255,255,.60)', cursor:'pointer' }}>
                    <ChevronLeft size={16} />
                  </button>
                  <button onClick={next} className="flex items-center justify-center" style={{ width:36, height:36, borderRadius:3, background:`linear-gradient(135deg,${RED},#991B1B)`, color:'#fff', cursor:'pointer', border:'none' }}>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mini cards */}
          <div className="flex flex-col gap-4">
            {TESTIMONIALS.filter((_,i)=>i!==active).slice(0,3).map((tt,idx)=>(
              <button key={tt.id} onClick={()=>goTo(TESTIMONIALS.indexOf(tt))}
                className="relative text-left p-5 rounded-sm cursor-pointer transition-all duration-300 hover:shadow-md"
                style={{ background:'#fff', border:'1px solid #E8E5E1', flex:1, opacity:inView?1:0, transform:inView?'translateY(0)':'translateY(28px)', transition:`opacity .7s ease ${.2+idx*.1}s,transform .7s ease ${.2+idx*.1}s,box-shadow 300ms` }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full text-xs font-black flex-shrink-0"
                    style={{ background:`${tt.accent}25`, border:`1.5px solid ${tt.accent}50`, color:tt.accent, fontFamily:"Georgia,serif" }}>
                    {tt.avatar}
                  </div>
                  <div>
                    <p className="text-[12px] font-bold" style={{ color:DARK2 }}>{tt.name}</p>
                    <p className="text-[10px]" style={{ color:STONE }}>{tt.location}</p>
                  </div>
                  <StarRow count={5} accent={GOLD} />
                </div>
                <p className="text-[12px] leading-relaxed line-clamp-2" style={{ color:SLATE, fontStyle:'italic', fontFamily:"Georgia,serif" }}>
                  &ldquo;{tt.text.slice(0,100)}…&rdquo;
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_,i)=>(
            <button key={i} onClick={()=>goTo(i)}
              style={{ width:i===active?28:8, height:8, borderRadius:4, background:i===active?RED:'#E2E8F0', border:'none', cursor:'pointer', transition:'all 350ms' }} />
          ))}
        </div>
      </div>
    </section>
  )
}


/* ════════════════════════════════════════════
   12. CLOSING MARQUEE BAND
════════════════════════════════════════════ */
function TrustBand() {
  const items = ['IATA Accredited','Disneyland Paris Partner','ISO 9001 Certified','4.9★ Rated','Ministry Recognised','90+ Countries','500+ Partners','5,000+ Travellers','B2B Wholesale']
  const all = [...items,...items,...items]
  return (
    <div style={{ background:DARK, borderTop:`1px solid ${GOLD}18`, overflow:'hidden', padding:'18px 0' }}>
      <div style={{ display:'flex', gap:'3rem', whiteSpace:'nowrap', animation:'trustScroll 30s linear infinite', width:'max-content' }}>
        {all.map((label,i)=>(
          <span key={i} className="inline-flex items-center gap-2.5">
            <CheckCircle2 size={11} style={{ color:GOLD, flexShrink:0 }} />
            <span style={{ fontSize:11, fontWeight:600, letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(255,255,255,.32)', fontFamily:'sans-serif' }}>{label}</span>
            <span style={{ color:RED, fontSize:10, marginLeft:'1rem' }}>✦</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes trustScroll{from{transform:translateX(0)}to{transform:translateX(-33.333%)}}`}</style>
    </div>
  )
}

/* ════════════════════════════════════════════
   PAGE
════════════════════════════════════════════ */
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily:'sans-serif' }}>
      <Navbar />
      <AboutHero />
      <WhoWeAre />
      <VisionSection />
      <WhyChooseUs />
      <OurActivities />
      <GlobalNetwork />
      <TestimonialsSection />
      {/* <TrustBand /> */}
      <Footer />
    </div>
  )
}