'use client'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  Star, Quote, MapPin, ChevronLeft, ChevronRight, ArrowRight,
  ArrowUpRight, Play, Users, BadgeCheck, Globe, Phone,
} from 'lucide-react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

/* ─── Design Tokens (matching Chalo Holidays) ─── */
const GOLD  = '#B8860B'
const GOLD2 = '#D4A017'
const RED   = '#B91C1C'
const DARK  = '#0F172A'
const DARK2 = '#1C1917'
const SLATE = '#475569'
const STONE = '#78716C'

/* ─── Hooks ─── */
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

/* ─── Shared Atoms ─── */
function Rule({ color = GOLD, w = 28 }) {
  return <div style={{ width: w, height: 1, background: color, flexShrink: 0 }} />
}
function SectionLabel({ color = GOLD, children }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <Rule color={color} w={28} />
      <span style={{ color, fontFamily: 'sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '.24em', textTransform: 'uppercase' }}>
        {children}
      </span>
    </div>
  )
}
function StarRow({ count = 5, accent = GOLD, size = 13 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={size} style={{ fill: accent, color: accent }} />
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════
   DATA
══════════════════════════════════════════════ */
const FEATURED = [
  {
    id: 1,
    name: 'Priya & Arjun Sharma',
    role: 'Honeymooners',
    location: 'Mumbai, India',
    destination: 'Maldives',
    service: 'Luxury Honeymoon',
    avatar: 'PS',
    accent: GOLD,
    rating: 5,
    text: 'Every single detail of our Maldives honeymoon was nothing short of flawless. From the private seaplane transfer at sunset to waking up in our overwater villa surrounded by silence and turquoise — it was the most perfect week of our lives. We felt like royalty from the very first phone call.',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=900&q=80',
    year: '2024',
    tag: 'Verified Stay',
  },
  {
    id: 2,
    name: 'James Whitfield',
    role: 'Corporate Travel Director',
    location: 'London, United Kingdom',
    destination: 'Singapore & Bali',
    service: 'Corporate Retreat',
    avatar: 'JW',
    accent: RED,
    rating: 5,
    text: "We have engaged dozens of travel agencies across my 15-year career. None have come close to the precision, proactive communication, and genuine warmth this team delivers. Our leadership offsite was seamless from start to finish. The board has asked us to repeat next year — same agency, same magic.",
    image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=900&q=80',
    year: '2024',
    tag: 'Corporate Client',
  },
  {
    id: 3,
    name: 'Ananya Krishnan',
    role: 'Family Organiser',
    location: 'Bangalore, India',
    destination: 'Kerala & Coorg',
    service: 'Family Group Tour',
    avatar: 'AK',
    accent: GOLD2,
    rating: 5,
    text: 'Coordinating 22 family members spanning three generations, four dietary restrictions, and two toddlers sounded like an impossible task. Our dedicated coordinator made it utterly effortless. The Kerala itinerary was paced beautifully — adventurous enough for the youngsters, serene enough for the grandparents.',
    image: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=900&q=80',
    year: '2023',
    tag: 'Group Booking',
  },
]

const GRID_TESTIMONIALS = [
  {
    id: 4, name: 'Marco De Luca', role: 'Solo Adventurer', location: 'Milan, Italy',
    destination: 'Angkor Wat, Cambodia', avatar: 'MD', accent: GOLD, rating: 5,
    text: 'Private after-hours access to Angkor Wat at sunrise — just our guide, ancient stone, and absolute silence. That single moment justified every rupee. I will carry it for the rest of my life.',
    tag: 'Sightseeing',
  },
  {
    id: 5, name: 'Ritu & Sameer Mehta', role: 'Luxury Travellers', location: 'Delhi, India',
    destination: 'Rajasthan, India', avatar: 'RM', accent: RED, rating: 5,
    text: 'The hotel curation is extraordinary. Each property felt like a personal discovery. Our Udaipur suite was upgraded before we even arrived, with a hand-written welcome note from the property manager.',
    tag: 'Luxury Hotels',
  },
  {
    id: 6, name: 'Chen Wei', role: 'Business Traveller', location: 'Shanghai, China',
    destination: 'Dubai, UAE', avatar: 'CW', accent: GOLD2, rating: 5,
    text: 'The bilingual meet-and-greet at Dubai Airport was waiting before my flight landed. Impeccable vehicle, remarkable attention to detail, and zero stress. Exactly what a business traveller needs.',
    tag: 'Transfers',
  },
  {
    id: 7, name: 'Fatima Al-Hassan', role: 'Leisure Traveller', location: 'Dubai, UAE',
    destination: 'Swiss Alps', avatar: 'FA', accent: GOLD, rating: 5,
    text: 'The Swiss itinerary felt tailor-made for my soul. Every train, every vista, every cheese fondue evening had been thought through with such care. Nothing felt like a tourist trap. It felt like home.',
    tag: 'Europe Tour',
  },
  {
    id: 8, name: 'Rajesh & Kavitha Nair', role: 'Anniversary Couple', location: 'Chennai, India',
    destination: 'Santorini, Greece', avatar: 'RN', accent: RED, rating: 5,
    text: 'Our 25th anniversary deserved something extraordinary — and Chalo Holidays delivered beyond our imagination. The caldera-view villa, the private catamaran sunset — every moment was orchestrated with love.',
    tag: 'Luxury Package',
  },
  {
    id: 9, name: 'Lena Müller', role: 'Cultural Explorer', location: 'Berlin, Germany',
    destination: 'Rajasthan & Goa', avatar: 'LM', accent: GOLD2, rating: 5,
    text: 'India had always intimidated me as a solo female traveller. Chalo made it feel completely safe and deeply enriching. The local guide introductions were extraordinary — real connections, not performances.',
    tag: 'Cultural Tour',
  },
]

const STATS = [
  { val: '4.9', label: 'Average Rating', sub: 'Across all platforms' },
  { val: '2,400+', label: 'Verified Reviews', sub: 'Google · Trustpilot · TripAdvisor' },
  { val: '98%', label: 'Recommend Us', sub: 'Net Promoter Score' },
  { val: '5,000+', label: 'Happy Travellers', sub: 'Since 2016' },
]

/* ══════════════════════════════════════════════
   1 ▸ HERO
══════════════════════════════════════════════ */
function TestimonialsHero() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setTimeout(() => setLoaded(true), 60) }, [])

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        minHeight: 'clamp(480px,72vh,780px)',
        background: '#07070e',
        fontFamily: "Georgia,'Times New Roman',serif",
      }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920&q=80')`,
          transform: loaded ? 'scale(1.02)' : 'scale(1.09)',
          transition: 'transform 1.6s cubic-bezier(.4,0,.2,1)',
        }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg,rgba(4,4,10,.96) 0%,rgba(4,4,10,.78) 40%,rgba(4,4,10,.28) 70%,rgba(4,4,10,.05) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg,rgba(4,4,10,.96) 0%,rgba(4,4,10,.32) 18%,transparent 45%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(4,4,10,.52) 0%,transparent 22%)' }} />

      {/* Left accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{ background: `linear-gradient(180deg,transparent,${GOLD} 35%,${GOLD2} 65%,transparent)` }} />

      {/* Floating quote mark */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block"
        style={{ opacity: 0.04 }}>
        <Quote size={280} style={{ color: GOLD, fill: GOLD }} />
      </div>

      <div
        className="relative z-10 max-w-[1440px] mx-auto flex flex-col justify-center"
        style={{
          minHeight: 'clamp(480px,72vh,780px)',
          padding: 'clamp(5rem,10vh,7rem) clamp(1.5rem,5vw,4rem) clamp(3rem,6vh,4.5rem)',
        }}
      >
        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(22px)',
          transition: 'opacity .9s ease .08s, transform .9s ease .08s',
        }}>
          <div className="flex items-center gap-3 mb-7" style={{ fontFamily: 'sans-serif' }}>
            <Rule color={GOLD} w={28} />
            <span style={{ color: GOLD, fontSize: 10, fontWeight: 700, letterSpacing: '.24em', textTransform: 'uppercase' }}>
              Stories from the Road
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5"
              style={{ color: GOLD2, border: `1px solid ${GOLD}45`, background: 'rgba(212,160,23,0.12)', fontSize: 9, fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', fontFamily: 'sans-serif', borderRadius: 2 }}>
              2,400+ Reviews
            </span>
          </div>

          <h1 className="text-white leading-[.92] mb-6"
            style={{ fontSize: 'clamp(3rem,8.5vw,6.8rem)', fontWeight: 400, letterSpacing: '-0.025em' }}>
            Voices of those<br />
            <em style={{ fontStyle: 'italic', color: GOLD }}>we've served.</em>
          </h1>

          <p style={{
            color: 'rgba(255,255,255,.50)',
            fontSize: 'clamp(.88rem,1.4vw,1.05rem)',
            lineHeight: 1.85,
            maxWidth: '48ch',
            fontFamily: 'sans-serif',
            fontWeight: 300,
            marginBottom: '2.5rem',
          }}>
            Every destination is a chapter. Every traveller, an author. These are the stories our guests share — unfiltered, authentic, and deeply personal.
          </p>
        </div>

        {/* Bottom platform strip */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            background: 'rgba(4,4,10,.80)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255,255,255,.07)',
          }}
        >
        </div>
      </div>
    </section>
  )
}


/* ══════════════════════════════════════════════
   4 ▸ MASONRY GRID
══════════════════════════════════════════════ */
function TestimonialCard({ t, i, inView }) {
  const [hov, setHov] = useState(false)

  return (
    <article
      className="relative flex flex-col p-6 sm:p-7 cursor-default"
      style={{
        background: '#fff',
        border: `1px solid ${hov ? t.accent + '55' : '#E8E5E1'}`,
        borderRadius: 4,
        boxShadow: hov ? `0 20px 52px -12px ${t.accent}22` : '0 2px 12px -4px rgba(28,25,23,.06)',
        transform: inView ? (hov ? 'translateY(-6px)' : 'translateY(0)') : 'translateY(30px)',
        opacity: inView ? 1 : 0,
        transition: `transform ${hov ? '320ms' : '600ms'} cubic-bezier(.4,0,.2,1), box-shadow 400ms, border-color 400ms, opacity .7s ease ${i * 80}ms`,
        breakInside: 'avoid',
        marginBottom: '1.25rem',
      }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>

      {/* Top accent */}
      <div style={{ height: 2, background: hov ? `linear-gradient(90deg,${t.accent},${GOLD2})` : 'transparent', margin: '-1.75rem -1.75rem 1.25rem', transition: 'background 400ms', borderRadius: '4px 4px 0 0' }} />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center font-bold text-sm flex-shrink-0"
            style={{ width: 42, height: 42, borderRadius: '50%', background: `${t.accent}22`, border: `1.5px solid ${t.accent}50`, color: t.accent, fontFamily: "Georgia,serif" }}>
            {t.avatar}
          </div>
          <div>
            <p style={{ fontFamily: "Georgia,serif", fontSize: '0.95rem', fontWeight: 600, color: DARK2, lineHeight: 1 }}>{t.name}</p>
            <p style={{ fontFamily: 'sans-serif', fontSize: 10, color: STONE, marginTop: 3 }}>{t.role} · {t.location}</p>
          </div>
        </div>
        <div className="hidden sm:block">
          <StarRow count={t.rating} accent={GOLD} size={11} />
        </div>
      </div>

      {/* Destination */}
      <div className="flex items-center gap-1.5 mb-4">
        <MapPin size={10} style={{ color: t.accent }} />
        <span style={{ color: t.accent, fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>{t.destination}</span>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: hov ? `linear-gradient(90deg,${t.accent}44,transparent)` : '#EBE8E4', marginBottom: 16, transition: 'background 400ms' }} />

      {/* Quote */}
      <div className="relative flex-1">
        <Quote size={20} style={{ color: hov ? `${t.accent}50` : '#E8E5E1', fill: hov ? `${t.accent}50` : '#E8E5E1', position: 'absolute', top: -4, left: -2, transition: 'color 400ms, fill 400ms' }} />
        <p className="leading-relaxed pl-5"
          style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: '0.9rem', fontStyle: 'italic', color: '#44403C', lineHeight: 1.78 }}>
          {t.text}
        </p>
      </div>

      {/* Tag */}
      <div className="mt-5 pt-4" style={{ borderTop: '1px solid #F0EDE8' }}>
        <span style={{ background: '#F5F0E8', color: GOLD, fontSize: 9, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', fontFamily: 'sans-serif', padding: '4px 10px', borderRadius: 2 }}>
          {t.tag}
        </span>
      </div>
    </article>
  )
}

function TestimonialsGrid() {
  const [ref, inView] = useInView(0.06)

  return (
    <section ref={ref} className="w-full py-20 sm:py-28" style={{ background: '#FAFAF8' }}>
      <div className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: `radial-gradient(#D4A01716 1px,transparent 1px)`, backgroundSize: '30px 30px' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity .7s ease, transform .7s ease' }}>
          <div>
            <SectionLabel color={GOLD}>All Reviews</SectionLabel>
            <h2 style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(2.2rem,5vw,3.4rem)', fontWeight: 400, color: DARK2, letterSpacing: '-0.02em', lineHeight: 1.06 }}>
              Thousands of stories,<br /><em style={{ color: GOLD }}>one promise kept.</em>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2" style={{ fontFamily: 'sans-serif' }}>
            {['All', 'Honeymoon', 'Family', 'Corporate', 'Solo', 'Luxury'].map((f, i) => {
              const [active, setActive] = useState(i === 0)
              return (
                <button key={f}
                  onClick={() => setActive(p => !p)}
                  className="text-[11px] font-bold uppercase tracking-widest px-4 py-2 transition-all duration-200"
                  style={{
                    borderRadius: 2,
                    background: active ? RED : 'transparent',
                    color: active ? '#fff' : STONE,
                    border: `1px solid ${active ? RED : '#E2E8F0'}`,
                    cursor: 'pointer',
                  }}>
                  {f}
                </button>
              )
            })}
          </div>
        </div>

        {/* Masonry grid using CSS columns */}
        <div style={{ columns: 'clamp(280px, 30vw, 360px) 3', columnGap: '1.25rem' }}>
          {GRID_TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.id} t={t} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   5 ▸ MARQUEE STRIP
══════════════════════════════════════════════ */
const MARQUEE_ITEMS = [
  '"Truly life-changing"', '★★★★★', '"Beyond expectations"', '★★★★★',
  '"Flawless from start to finish"', '★★★★★', '"Our best trip ever"', '★★★★★',
  '"We felt like royalty"', '★★★★★', '"Simply extraordinary"', '★★★★★',
]

function MarqueeStrip() {
  return (
    <div style={{ background: GOLD, overflow: 'hidden', padding: '12px 0' }}>
      <div className="flex items-center gap-8 animate-marquee whitespace-nowrap"
        style={{ animation: 'marquee 28s linear infinite', display: 'flex', gap: 48 }}>
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((t, i) => (
          <span key={i} style={{ fontFamily: t.startsWith('★') ? 'serif' : "Georgia,'Times New Roman',serif", fontSize: 13, fontWeight: t.startsWith('★') ? 400 : 400, color: '#1C1917', fontStyle: t.startsWith('"') ? 'italic' : 'normal', whiteSpace: 'nowrap', letterSpacing: '0.01em' }}>
            {t}
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  )
}

/* ══════════════════════════════════════════════
   6 ▸ VIDEO TESTIMONIALS TEASER
══════════════════════════════════════════════ */
const VIDEO_CARDS = [
  { name: 'Sharma Family', dest: 'Bali, Indonesia', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=75', duration: '2:34' },
  { name: 'James & Sarah', dest: 'Santorini, Greece', img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=75', duration: '1:58' },
  { name: 'Krishnan Family', dest: 'Kerala, India', img: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=600&q=75', duration: '3:12' },
]

function VideoTestimonials() {
  const [ref, inView] = useInView(0.08)

  return (
    <section ref={ref} className="w-full py-20 sm:py-28 overflow-hidden" style={{ background: DARK }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: `linear-gradient(${GOLD}08 1px,transparent 1px),linear-gradient(90deg,${GOLD}08 1px,transparent 1px)`, backgroundSize: '60px 60px', opacity: 0.5 }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-14"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity .7s ease, transform .7s ease' }}>
          <SectionLabel color={GOLD}>Video Stories</SectionLabel>
          <h2 style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(2.2rem,5vw,3.4rem)', fontWeight: 400, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.06 }}>
            Watch their<br /><em style={{ color: GOLD }}>journeys unfold.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {VIDEO_CARDS.map((v, i) => {
            const [hov, setHov] = useState(false)
            return (
              <div key={v.name}
                className="relative overflow-hidden cursor-pointer"
                style={{
                  borderRadius: 4,
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(30px)',
                  transition: `opacity .7s ease ${i * 100}ms, transform .7s ease ${i * 100}ms`,
                }}
                onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
                <div className="relative overflow-hidden" style={{ paddingBottom: '140%' }}>
                  <img src={v.img} alt={v.dest} className="absolute inset-0 w-full h-full object-cover"
                    style={{ transform: hov ? 'scale(1.05)' : 'scale(1)', transition: 'transform .6s ease' }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,transparent 35%,rgba(4,4,10,.88))' }} />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center justify-center transition-all duration-300"
                      style={{ width: hov ? 60 : 52, height: hov ? 60 : 52, borderRadius: '50%', background: hov ? RED : 'rgba(255,255,255,.2)', backdropFilter: 'blur(10px)', border: '1.5px solid rgba(255,255,255,.4)' }}>
                      <Play size={18} style={{ color: '#fff', marginLeft: 3, fill: '#fff' }} />
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="absolute top-4 right-4 px-2 py-1"
                    style={{ background: 'rgba(4,4,10,.72)', backdropFilter: 'blur(8px)', borderRadius: 2 }}>
                    <span style={{ color: '#fff', fontSize: 10, fontWeight: 700, fontFamily: 'sans-serif' }}>{v.duration}</span>
                  </div>

                  {/* Info */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <p style={{ fontFamily: "Georgia,serif", fontSize: '1.05rem', fontWeight: 600, color: '#fff', lineHeight: 1 }}>{v.name}</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <MapPin size={10} style={{ color: GOLD }} />
                      <span style={{ color: GOLD, fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>{v.dest}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}



/* ══════════════════════════════════════════════
   PAGE ASSEMBLY
══════════════════════════════════════════════ */
export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'sans-serif' }}>
      <Navbar /> 
      <TestimonialsHero />
      <TestimonialsGrid />
       <Footer /> 
    </div>
  )
}