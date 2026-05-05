'use client'
import React, { useState, useRef, useEffect } from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

import {
  ArrowRight, ArrowUpRight, MapPin, Phone, ShieldCheck, Clock, Award,
  Star, CheckCircle2, Users, HeartHandshake, Handshake, Globe,
  CheckCircle, BadgeCheck, Zap, TrendingDown, Quote, ChevronRight,
  ChevronLeft, Hotel, Car, Binoculars, Package, Briefcase, Building2,
  Ticket, Home, Crown, Gem
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

      {/* BG image */}
      <div className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=85')`, transform: loaded ? 'scale(1.02)' : 'scale(1.10)', transition: 'transform 1.6s cubic-bezier(.4,0,.2,1)' }} />

      {/* Layered overlays */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(108deg,rgba(4,4,10,.98) 0%,rgba(4,4,10,.84) 40%,rgba(4,4,10,.30) 66%,rgba(4,4,10,.06) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg,rgba(4,4,10,.95) 0%,rgba(4,4,10,.40) 22%,transparent 52%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(4,4,10,.52) 0%,transparent 25%)' }} />

      {/* Gold spine */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{ background: `linear-gradient(180deg,transparent,${GOLD} 30%,${GOLD2} 68%,transparent)` }} />

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: `radial-gradient(rgba(184,134,11,.06) 1px,transparent 1px)`, backgroundSize: '36px 36px' }} />

      <div className="relative z-10 max-w-[1440px] mx-auto flex flex-col justify-center"
        style={{ minHeight: 'clamp(580px,85vh,940px)', padding: 'clamp(5rem,11vh,8rem) clamp(1.5rem,5vw,4rem) clamp(3rem,7vh,5rem)' }}>

        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(22px)', transition: 'opacity .85s ease .1s, transform .85s ease .1s' }}>

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-7" style={{ fontFamily: 'sans-serif' }}>
            <Rule color={GOLD} w={28} />
            <span className="text-[10px] font-semibold tracking-[.26em] uppercase" style={{ color: GOLD }}>Our Story</span>
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 text-[9px] font-bold tracking-[.16em] uppercase border rounded-sm"
              style={{ color: GOLD2, borderColor: `${GOLD}45`, background: 'rgba(212,160,23,0.12)', fontFamily: 'sans-serif' }}>EST. 2016</span>
          </div>

          {/* Main headline */}
          <h1 className="text-white mb-6"
            style={{ fontSize: 'clamp(3rem,9vw,7.2rem)', fontWeight: 400, letterSpacing: '-0.026em', lineHeight: 0.90 }}>
            We are<br />
            <em style={{ fontStyle: 'italic', color: GOLD }}>Chalo Holidays.</em>
          </h1>

          {/* Sub */}
          <p style={{ color: 'rgba(255,255,255,.56)', fontSize: 'clamp(.92rem,1.5vw,1.1rem)', lineHeight: 1.82, maxWidth: '52ch', fontFamily: 'sans-serif', fontWeight: 300, marginBottom: '1.25rem' }}>
            A trusted travel consultant and B2B wholesale tour operator — built on expertise, reliability, and an uncompromising passion for delivering travel experiences that transcend the ordinary.
          </p>
          <p style={{ color: 'rgba(255,255,255,.38)', fontSize: 'clamp(.84rem,1.2vw,.96rem)', lineHeight: 1.78, maxWidth: '46ch', fontFamily: 'sans-serif', fontWeight: 300, marginBottom: '2.8rem' }}>
            From bespoke luxury escapes to large-scale B2B wholesale solutions — we exist to transform the way the world travels.
          </p>

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
   2. WHO WE ARE
════════════════════════════════════════════ */
const WHO_PILLARS = [
  { icon: HeartHandshake, title: 'Passion-First Culture',  desc: 'Every team member is a traveller first. We design journeys we would take ourselves.' },
  { icon: ShieldCheck,    title: 'Transparent by Default', desc: 'No hidden markups. Every rupee is visible, itemised, and justified before you confirm.' },
  { icon: Globe,          title: 'Truly Global Reach',     desc: '200+ destinations, 500+ vetted ground partners, local intelligence on every continent.' },
  { icon: Clock,          title: 'Always-On Support',      desc: 'Our concierge team responds in under 90 seconds — day or night, anywhere in the world.' },
]

function WhoWeAre() {
  const [ref, inView] = useInView(0.10)
  const [imgReady, setImgReady] = useState(false)

  return (
    <section id="who-we-are" ref={ref} className="w-full bg-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* Image */}
          <div className="relative order-2 lg:order-1"
            style={{ opacity: inView?1:0, transform: inView?'translateX(0)':'translateX(-40px)', transition: 'opacity .8s ease, transform .8s ease' }}>
            <div className="relative overflow-hidden shadow-2xl" style={{ borderRadius: 6 }}>
              <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=900&q=80"
                alt="Chalo Holidays team"
                className="w-full object-cover"
                style={{ height:'clamp(340px,50vh,560px)', transform: imgReady?'scale(1)':'scale(1.05)', transition:'transform .8s ease' }}
                onLoad={() => setImgReady(true)} loading="lazy" />
              <div className="absolute inset-0" style={{ background:'linear-gradient(180deg,transparent 50%,rgba(0,0,0,.50))' }} />
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                <div>
                  <p className="text-white/45 text-[10px] uppercase tracking-widest">Established</p>
                  <p className="text-white font-black leading-none" style={{ fontFamily:"Georgia,serif", fontSize:'2.4rem' }}>2016</p>
                </div>
                <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-sm"
                  style={{ background:'rgba(184,134,11,.18)', border:`1px solid ${GOLD}45`, backdropFilter:'blur(8px)' }}>
                  <Star size={10} fill={GOLD} color={GOLD} />
                  <span className="text-[11px] font-bold ml-1" style={{ color:GOLD, fontFamily:'sans-serif' }}>4.9 / 5 · 2,400+ reviews</span>
                </div>
              </div>
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-7 -right-4 sm:-right-6 w-54 bg-white shadow-2xl p-5 hidden sm:block"
              style={{ borderRadius:5, borderLeft:`3px solid ${GOLD}`, minWidth:200 }}>
              <p className="font-black leading-none mb-1" style={{ fontFamily:"Georgia,serif", fontSize:'2.1rem', color:GOLD }}>
                98<span className="text-base font-bold" style={{ color:STONE }}>%</span>
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color:DARK2 }}>Rebooking Rate</p>
              <p className="text-[11px]" style={{ color:STONE }}>Clients who return — every year.</p>
            </div>

            <div className="absolute -left-5 top-10 bottom-10 w-px hidden lg:block"
              style={{ background:`linear-gradient(180deg,transparent,${GOLD}88,transparent)` }} />
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2"
            style={{ opacity: inView?1:0, transform: inView?'translateX(0)':'translateX(40px)', transition:'opacity .8s ease .12s, transform .8s ease .12s' }}>
            <SectionLabel>Who We Are</SectionLabel>
            <SectionHeading style={{ marginBottom:'1.25rem' }}>
              Crafted by travellers,<br /><em style={{ color:GOLD }}>perfected for you.</em>
            </SectionHeading>

            <p className="leading-relaxed mb-4" style={{ fontSize:'clamp(.9rem,1.4vw,1rem)', color:STONE, maxWidth:'48ch', lineHeight:1.82 }}>
              Founded in 2016, Chalo Holidays is a trusted travel consultant and B2B wholesale tour operator. Our team of skilled professionals works closely with partners and clients to provide tailored solutions that go beyond expectations.
            </p>
            <p className="leading-relaxed mb-7" style={{ fontSize:'clamp(.9rem,1.4vw,1rem)', color:STONE, maxWidth:'48ch', lineHeight:1.82 }}>
              In today's fast-paced travel industry, we deliver real-time solutions, exclusive deals, and seamless booking experiences — helping travel agents and partners grow their business with confidence.
            </p>

            <blockquote className="border-l-2 pl-5 mb-9" style={{ borderColor:GOLD }}>
              <p className="italic leading-relaxed mb-2" style={{ fontFamily:"Georgia,serif", fontSize:'clamp(.95rem,1.4vw,1.1rem)', color:'#44403C' }}>
                &ldquo;Chalo Holiday is not just a travel service — it is a commitment to delivering journeys that inspire, connect, and create lasting memories.&rdquo;
              </p>
              <cite className="text-[11px] font-semibold uppercase tracking-widest not-italic" style={{ color:STONE }}>— Founder, Chalo Holidays</cite>
            </blockquote>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-9">
              {WHO_PILLARS.map(({ icon:I, title, desc }) => (
                <div key={title} className="flex items-start gap-3 p-4 rounded-sm group transition-colors duration-300 hover:bg-stone-50"
                  style={{ border:'1px solid #F0EDE8' }}>
                  <div className="w-9 h-9 flex items-center justify-center shrink-0 mt-0.5 rounded-xl"
                    style={{ background:'#F5F0E8', border:'1px solid #E7E5E4' }}>
                    <I size={15} style={{ color:GOLD }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold mb-0.5" style={{ color:DARK2 }}>{title}</p>
                    <p className="text-[12px] leading-relaxed" style={{ color:STONE }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a href="#inquiry"
                className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3 text-white transition-all duration-200 hover:brightness-110 hover:scale-[1.02]"
                style={{ background:`linear-gradient(135deg,${RED},#991B1B)`, borderRadius:3, boxShadow:`0 6px 20px -6px ${RED}66` }}>
                Plan My Journey <ArrowRight size={15} />
              </a>
              <a href="#credentials"
                className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3 border transition-all duration-200 hover:bg-stone-50"
                style={{ borderRadius:3, borderColor:GOLD, color:DARK2 }}>
                Our Credentials
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════
   3. VISION & PRIORITIES
════════════════════════════════════════════ */
const PRIORITIES = [
  'Deliver excellence in every client interaction',
  'Build strong and long-term relationships with partners',
  'Continuously innovate and improve our services',
  'Maintain high standards of reliability and efficiency',
  'Stay competitive and agile in the global travel market',
]

function VisionSection() {
  const [ref, inView] = useInView(0.08)

  return (
    <section id="vision" ref={ref} className="relative w-full overflow-hidden py-20 sm:py-28"
      style={{ background: `linear-gradient(135deg, ${CREAM}, ${CREAM2})` }}>

      {/* Grid texture */}
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
   5. SERVICES OVERVIEW (light)
════════════════════════════════════════════ */
const SERVICES_LIST = [
  { icon: Hotel,      label: 'Worldwide Hotel Booking',        desc: 'B2B & B2C — global inventory with exclusive negotiated rates.', tag:'B2B · B2C' },
  { icon: Package,    label: 'Holiday Packages & Custom Tours', desc: 'Fully tailored itineraries for leisure, luxury, and adventure.', tag:'Most Popular' },
  { icon: Crown,      label: 'Luxury & VIP Travel',            desc: 'Private jets, super-premium suites, and white-glove concierge.', tag:'Premium' },
  { icon: Users,      label: 'Family & Leisure Travel',        desc: 'Multigenerational trips designed for every age and preference.', tag:'Family' },
  { icon: Briefcase,  label: 'Business Travel Solutions',      desc: 'MICE, corporate bookings, policy management & consolidated billing.', tag:'Corporate' },
  { icon: Building2,  label: 'Events, Meetings & Conferences', desc: 'End-to-end MICE logistics from venue selection to on-site support.', tag:'MICE' },
  { icon: Ticket,     label: 'Sports & Event Ticketing',       desc: 'Exclusive access to global sports, concerts, and premium events.', tag:'Events' },
  { icon: Car,        label: 'Transfers & Ground Support',     desc: 'Airport pickups, sightseeing, chauffeur-driven luxury fleet.', tag:'24/7' },
  { icon: Binoculars, label: 'Sightseeing & Guided Tours',    desc: 'Skip-the-line private tours with expert multilingual guides.', tag:'Guided' },
  { icon: Globe,      label: 'Car Hire & Chauffeur Services',  desc: 'Luxury sedans, SUVs, and coaches — tracked, punctual, pristine.', tag:'Fleet' },
  { icon: Home,       label: 'Serviced Apartments',            desc: 'Extended-stay solutions across 90+ countries for long trips.', tag:'Extended' },
  { icon: Gem,        label: 'Visa Assistance',                desc: 'Documentation, embassy liaison, and guidance across 50+ countries.', tag:'50+ Visas' },
]

function ServicesOverview() {
  const [ref, inView] = useInView(0.06)

  return (
    <section ref={ref} className="relative w-full py-20 sm:py-28 overflow-hidden" style={{ background: CREAM }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage:`radial-gradient(rgba(184,134,11,.08) 1px,transparent 1px)`, backgroundSize:'32px 32px' }} />

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14"
          style={{ opacity:inView?1:0, transform:inView?'translateY(0)':'translateY(24px)', transition:'opacity .7s ease, transform .7s ease' }}>
          <div>
            <SectionLabel color={RED}>Our Services</SectionLabel>
            <SectionHeading>Everything you need<br /><em style={{ color:GOLD }}>under one roof.</em></SectionHeading>
          </div>
          <p style={{ color:STONE, fontSize:'1rem', lineHeight:1.80, maxWidth:'38ch', fontFamily:'sans-serif' }}>
            From a simple hotel night to a complex multi-country expedition — we manage every element with the same meticulous care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {SERVICES_LIST.map(({ icon:I, label, desc, tag }, i) => {
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
   6. GLOBAL NETWORK  ← UPDATED
════════════════════════════════════════════ */
const HOTEL_GROUPS = [
  { name:'IHG',              logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/IHG_Hotels_%26_Resorts_logo.svg/320px-IHG_Hotels_%26_Resorts_logo.svg.png' },
  { name:'Marriott',         logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Marriott_International.svg/320px-Marriott_International.svg.png' },
  { name:'Hyatt',            logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Hyatt_Logo.svg/320px-Hyatt_Logo.svg.png' },
  { name:'Hilton',           logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Hilton_Hotels_%26_Resorts_logo.svg/320px-Hilton_Hotels_%26_Resorts_logo.svg.png' },
  { name:'Accor',            logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Accor_Logo.svg/320px-Accor_Logo.svg.png' },
  { name:'Wyndham',          logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Wyndham_Hotels_and_Resorts_Logo.svg/320px-Wyndham_Hotels_and_Resorts_Logo.svg.png' },
  { name:'Radisson',         logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Radisson_Hotel_Group_logo.svg/320px-Radisson_Hotel_Group_logo.svg.png' },
  { name:'Shangri-La',       logo:'https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/Shangri-La_Hotels_and_Resorts_logo.svg/320px-Shangri-La_Hotels_and_Resorts_logo.svg.png' },
  { name:'Four Seasons',     logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Four_Seasons_Hotels_and_Resorts_logo.svg/320px-Four_Seasons_Hotels_and_Resorts_logo.svg.png' },
  { name:'Jumeirah',         logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Jumeirah_Group_Logo.svg/320px-Jumeirah_Group_Logo.svg.png' },
  { name:'Kempinski',        logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Kempinski_logo.svg/320px-Kempinski_logo.svg.png' },
  { name:'Mandarin Oriental',logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Mandarin_Oriental_Logo.svg/320px-Mandarin_Oriental_Logo.svg.png' },
  { name:'Rosewood',         logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Rosewood_Hotels_%26_Resorts_Logo.svg/320px-Rosewood_Hotels_%26_Resorts_Logo.svg.png' },
  { name:'Six Senses',       logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Six_Senses_logo.svg/320px-Six_Senses_logo.svg.png' },
]

const GN_METRICS = [
  ['90+','Countries'],
  ['500+','Partners'],
  ['1,200+','Hotels'],
  ['200+','Destinations'],
]

function HotelCard({ hotel, index, sectionInView }) {
  const [hov, setHov] = useState(false)
  const [imgErr, setImgErr] = useState(false)
  const initials = hotel.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase()

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        gap:7, padding:'14px 8px', textAlign:'center',
        border:`1px solid ${hov ? GOLD : '#E8E2D4'}`,
        background: hov ? '#FFFDF5' : '#fff',
        cursor:'default',
        transform: sectionInView ? (hov ? 'translateY(-2px)' : 'translateY(0)') : 'translateY(16px)',
        opacity: sectionInView ? 1 : 0,
        transition:`border-color .25s, background .25s, transform .28s ease ${index*40}ms, opacity .5s ease ${index*40}ms`,
      }}
    >
      <div style={{ width:44, height:26, display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        {imgErr ? (
          <svg width="44" height="26" viewBox="0 0 44 26" xmlns="http://www.w3.org/2000/svg">
            <rect width="44" height="26" rx="2" fill={CREAM2}/>
            <text x="22" y="18" fontFamily="Georgia,serif" fontSize="10" fontWeight="600" fill={GOLD} textAnchor="middle">{initials}</text>
          </svg>
        ) : (
          <img
            src={hotel.logo}
            alt={hotel.name}
            onError={() => setImgErr(true)}
            style={{
              maxWidth:44, maxHeight:26, objectFit:'contain',
              filter: hov ? 'grayscale(0) opacity(1)' : 'grayscale(1) opacity(0.5)',
              transition:'filter .25s',
            }}
          />
        )}
      </div>
      <span style={{
        fontFamily:"Georgia,'Times New Roman',serif",
        fontSize:10.5, fontWeight:400,
        color: hov ? GOLD : STONE,
        transition:'color .25s', letterSpacing:'.03em', lineHeight:1.2,
      }}>
        {hotel.name}
      </span>
    </div>
  )
}

function HotelMarquee() {
  const [paused, setPaused] = useState(false)
  const doubled = [...HOTEL_GROUPS, ...HOTEL_GROUPS]

  return (
    <div
      style={{ overflow:'hidden', borderTop:`1px solid rgba(184,134,11,.2)`, borderBottom:`1px solid rgba(184,134,11,.2)`, background:'#fff', padding:'10px 0', marginTop:28 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style>{`@keyframes gnMarquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
      <div style={{ display:'flex', width:'max-content', animation:`gnMarquee 30s linear infinite`, animationPlayState: paused ? 'paused' : 'running' }}>
        {doubled.map((h, i) => (
          <MarqueeLogoItem key={i} hotel={h} />
        ))}
      </div>
    </div>
  )
}

function MarqueeLogoItem({ hotel }) {
  const [hov, setHov] = useState(false)
  const [imgErr, setImgErr] = useState(false)
  const initials = hotel.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase()

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ display:'flex', alignItems:'center', padding:'0 28px', borderRight:`1px solid rgba(184,134,11,.15)`, cursor:'default' }}
    >
      {imgErr ? (
        <svg width="60" height="20" viewBox="0 0 60 20" xmlns="http://www.w3.org/2000/svg">
          <text x="30" y="15" fontFamily="Georgia,serif" fontSize="10" fontWeight="600" fill={GOLD} textAnchor="middle">{hotel.name}</text>
        </svg>
      ) : (
        <img
          src={hotel.logo}
          alt={hotel.name}
          onError={() => setImgErr(true)}
          style={{
            height:20, maxWidth:70, objectFit:'contain',
            filter: hov ? 'grayscale(0) opacity(1)' : 'grayscale(1) opacity(0.4)',
            transition:'filter .25s',
          }}
        />
      )}
    </div>
  )
}

function GlobalNetwork() {
  const [ref, inView] = useInView(0.08)

  return (
    <section ref={ref} className="relative w-full overflow-hidden" style={{ background: CREAM }}>

      {/* Gold top bar */}
      <div style={{ height:2, background:`linear-gradient(90deg,transparent 0%,${GOLD} 30%,${GOLD3} 50%,${GOLD} 70%,transparent 100%)` }} />

      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage:`linear-gradient(rgba(184,134,11,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(184,134,11,0.06) 1px,transparent 1px)`, backgroundSize:'52px 52px' }} />

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">

          {/* Left: copy */}
          <div style={{ opacity:inView?1:0, transform:inView?'translateX(0)':'translateX(-32px)', transition:'opacity .8s ease, transform .8s ease' }}>
            <SectionLabel color={GOLD}>Global Network</SectionLabel>
            <SectionHeading style={{ marginBottom:'1.25rem' }}>
              The world's finest<br /><em style={{ color:GOLD }}>at your fingertips.</em>
            </SectionHeading>

            <p style={{ color:STONE, fontSize:'clamp(.9rem,1.4vw,1rem)', lineHeight:1.88, maxWidth:'44ch', fontFamily:'sans-serif', fontWeight:400, marginBottom:10 }}>
              We collaborate with the world's leading international hotel groups across the UK, Europe, Asia, and the Middle East — giving our partners unrivalled access and competitive rates.
            </p>
            <p style={{ color:'#A8A29E', fontSize:'clamp(.84rem,1.2vw,.94rem)', lineHeight:1.8, maxWidth:'42ch', fontFamily:'sans-serif', fontWeight:300, marginBottom:26 }}>
              Our global partner network spans 90+ countries with 500+ vetted DMCs, ground operators, and hotel chains — all independently reviewed and held to our exacting quality standards.
            </p>

            {/* Metrics */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:28 }}>
              {GN_METRICS.map(([val, label]) => (
                <div key={label} style={{ padding:'12px 14px', background:'#fff', border:`1px solid rgba(184,134,11,.2)`, borderTop:`2px solid ${GOLD}` }}>
                  <div style={{ fontFamily:"Georgia,serif", fontSize:'1.6rem', fontWeight:600, color:GOLD, lineHeight:1, marginBottom:3 }}>{val}</div>
                  <div style={{ fontSize:8.5, fontWeight:700, letterSpacing:'.15em', textTransform:'uppercase', color:'#A8A29E' }}>{label}</div>
                </div>
              ))}
            </div>

            <a href="#inquiry"
              className="inline-flex items-center gap-2.5 font-bold text-[11px] uppercase tracking-[.16em] px-7 py-3.5 transition-all duration-300"
              style={{ color:CREAM, background:DARK2, textDecoration:'none', fontFamily:'sans-serif' }}
              onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = DARK2; e.currentTarget.style.transform = 'translateY(0)' }}>
              Become a Partner <ArrowUpRight size={13} />
            </a>
          </div>

          {/* Right: hotel logo grid */}
          <div style={{ opacity:inView?1:0, transform:inView?'translateX(0)':'translateX(32px)', transition:'opacity .8s ease .15s, transform .8s ease .15s' }}>
            <p style={{ fontSize:8.5, fontWeight:700, letterSpacing:'.2em', textTransform:'uppercase', color:'#A8A29E', marginBottom:14, fontFamily:'sans-serif' }}>
              Our Partner Hotels Include
            </p>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8 }}>
              {HOTEL_GROUPS.map((hotel, i) => (
                <HotelCard key={hotel.name} hotel={hotel} index={i} sectionInView={inView} />
              ))}
              {/* +More tile */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:'14px 8px', border:`1px solid rgba(184,134,11,.35)`, background:`linear-gradient(135deg,#FFF8E7,#FFFDF5)` }}>
                <span style={{ fontSize:9, fontWeight:700, letterSpacing:'.14em', color:GOLD, textTransform:'uppercase', fontFamily:'sans-serif' }}>+ Many More</span>
              </div>
            </div>
          </div>
        </div>

        {/* Logo Marquee */}
        <HotelMarquee />
      </div>

      {/* Gold bottom line */}
      <div style={{ height:1.5, background:`linear-gradient(90deg,transparent,rgba(184,134,11,.35),transparent)` }} />
    </section>
  )
}

/* ════════════════════════════════════════════
   7. WHY CHOOSE US
════════════════════════════════════════════ */
const WHY_ITEMS = [
  { id:'01', icon: Award,        accent: GOLD,  title: 'Competitive Global Rates',      body: 'Our consolidated purchasing power across 500+ global partners gives you world-class experiences at prices that simply cannot be matched.' },
  { id:'02', icon: ShieldCheck,  accent: RED,   title: '100% Transparent Pricing',      body: 'No hidden markups. Every cost is visible, itemised, and agreed before you pay a single rupee. Trusted by clients and partners alike.' },
  { id:'03', icon: Clock,        accent: GOLD2, title: 'Fast & Reliable Service',       body: 'Real-time solutions, rapid confirmations, and an operations team that treats every second of your time as precious.' },
  { id:'04', icon: Globe,        accent: RED,   title: 'Wide Range of Travel Products', body: 'From a weekend city break to an ultra-luxury world cruise — our portfolio covers every travel category, budget, and aspiration.' },
  { id:'05', icon: HeartHandshake,accent: GOLD, title: 'Dedicated Customer Support',   body: 'A named consultant guides you from first enquiry through to your safe return. Full accountability, zero handoffs, always.' },
  { id:'06', icon: Handshake,    accent: GOLD2, title: 'Trusted International Partnerships', body: 'Exclusive relationships with IHG, Marriott, Hilton, Four Seasons and 500+ partners — unlocking inventory others simply cannot access.' },
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
  { year:'2023', title:'Condé Nast Recognised',   desc:'Featured in Condé Nast Traveller\'s "Top Emerging Luxury Agencies of India" edition.' },
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
  { icon: Award,        title: 'Condé Nast Verified',             desc: 'Featured in Condé Nast Traveller\'s "Top Emerging Luxury Agencies of India."' },
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
   11. CLOSING MARQUEE BAND
════════════════════════════════════════════ */
function TrustBand() {
  const items = ['IATA Accredited','Condé Nast Verified','ISO 9001 Certified','4.9★ Rated','Ministry Recognised','90+ Countries','500+ Partners','5,000+ Travellers']
  const all = [...items,...items,...items]
  return (
    <div style={{ background:DARK2, borderTop:`1px solid ${GOLD}18`, overflow:'hidden', padding:'18px 0' }}>
      <div style={{ display:'flex', gap:'3rem', whiteSpace:'nowrap', animation:'trustScroll 28s linear infinite', width:'max-content' }}>
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
      <StatsStrip />
      <VisionSection />
      <ServicesOverview />
      <GlobalNetwork />
      <WhyChooseUs />
      <OurJourney />
      <Credentials />
      <TestimonialsSection />
      <TrustBand />
      <Footer />
    </div>
  )
}