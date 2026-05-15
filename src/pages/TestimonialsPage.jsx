'use client'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  Star, Quote, MapPin, ChevronLeft, ChevronRight, ArrowRight,
  ArrowUpRight, Play, Users, BadgeCheck, Globe, Phone,
} from 'lucide-react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

/* ═══════════════════════════════════════════════════════════
   LUXURY TYPOGRAPHY SYSTEM
   (identical to HomePage & AboutPage — single source of truth)
   ─────────────────────────────────────────────────────────
   DISPLAY  : Cormorant Garamond — ultra-refined serif, hero & quotes
   HEADING  : Playfair Display   — classic editorial serif, section h2/h3
   BODY     : Jost               — geometric, airy, modern — all paragraphs
   LABEL    : Montserrat         — crisp uppercase micro-labels / badges

   SIZE SCALE
   --t-display : clamp(3rem, 8.5vw, 6.8rem)   → hero title
   --t-h1      : clamp(2.4rem, 5.5vw, 4.2rem) → section headlines
   --t-h2      : clamp(1.55rem, 2.8vw, 2.2rem) → sub-section titles
   --t-h3      : clamp(1.05rem, 1.8vw, 1.25rem) → card titles
   --t-body-lg : 1.0625rem (17px)             → lead paragraphs
   --t-body    : 0.9375rem (15px)             → standard body
   --t-body-sm : 0.8125rem (13px)             → secondary / captions
   --t-label   : 0.625rem  (10px)             → uppercase micro-labels
══════════════════════════════════════════════════════════════ */

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

      --t-display : clamp(3rem, 8.5vw, 6.8rem);
      --t-h1      : clamp(2.4rem, 5.5vw, 4.2rem);
      --t-h2      : clamp(1.55rem, 2.8vw, 2.2rem);
      --t-h3      : clamp(1.05rem, 1.8vw, 1.25rem);
      --t-body-lg : 1.0625rem;
      --t-body    : 0.9375rem;
      --t-body-sm : 0.8125rem;
      --t-label   : 0.625rem;
      --t-stat    : clamp(1.8rem, 3.5vw, 2.8rem);

      --ls-display : -0.025em;
      --ls-heading : -0.02em;
      --ls-label   : 0.22em;
      --ls-sublabel: 0.14em;

      --lh-display : 0.92;
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
const GOLD   = '#F5A800'
const GOLD2  = '#C8880A'
const DARK   = '#2D2D2D'
const DARK2  = '#2D2D2D'
const SLATE  = '#4A4A4A'
const STONE  = '#8A8A8A'
const CREAM  = '#FAFAF5'
const CREAM2 = '#F5F0E6'

/* ── Shared type style objects ── */
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
   HOOKS
══════════════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════════
   ATOMS
══════════════════════════════════════════════════════════════ */
function Rule({ color = GOLD, w = 28 }) {
  return <div style={{ width: w, height: 1.5, background: color, flexShrink: 0, borderRadius: 2 }} />
}

function SectionLabel({ color = GOLD, children }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <Rule color={color} w={28} />
      <span style={{ ...T.label, color }}>{children}</span>
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

/* ═══════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════ */
const FEATURED = [
  {
    id: 1, name: 'Priya & Arjun Sharma', role: 'Honeymooners', location: 'Mumbai, India',
    destination: 'Maldives', service: 'Luxury Honeymoon', avatar: 'PS', accent: GOLD, rating: 5,
    text: 'Every single detail of our Maldives honeymoon was nothing short of flawless. From the private seaplane transfer at sunset to waking up in our overwater villa surrounded by silence and turquoise — it was the most perfect week of our lives. We felt like royalty from the very first phone call.',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=900&q=80', year: '2024', tag: 'Verified Stay',
  },
  {
    id: 2, name: 'James Whitfield', role: 'Corporate Travel Director', location: 'London, United Kingdom',
    destination: 'Singapore & Bali', service: 'Corporate Retreat', avatar: 'JW', accent: RED, rating: 5,
    text: "We have engaged dozens of travel agencies across my 15-year career. None have come close to the precision, proactive communication, and genuine warmth this team delivers. Our leadership offsite was seamless from start to finish. The board has asked us to repeat next year — same agency, same magic.",
    image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=900&q=80', year: '2024', tag: 'Corporate Client',
  },
  {
    id: 3, name: 'Ananya Krishnan', role: 'Family Organiser', location: 'Bangalore, India',
    destination: 'Kerala & Coorg', service: 'Family Group Tour', avatar: 'AK', accent: GOLD2, rating: 5,
    text: 'Coordinating 22 family members spanning three generations, four dietary restrictions, and two toddlers sounded like an impossible task. Our dedicated coordinator made it utterly effortless. The Kerala itinerary was paced beautifully — adventurous enough for the youngsters, serene enough for the grandparents.',
    image: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=900&q=80', year: '2023', tag: 'Group Booking',
  },
]

const GRID_TESTIMONIALS = [
  { id: 4, name: 'Marco De Luca',       role: 'Solo Adventurer',      location: 'Milan, Italy',    destination: 'Angkor Wat, Cambodia', avatar: 'MD', accent: GOLD,  rating: 5, text: 'Private after-hours access to Angkor Wat at sunrise — just our guide, ancient stone, and absolute silence. That single moment justified every rupee. I will carry it for the rest of my life.', tag: 'Sightseeing' },
  { id: 5, name: 'Ritu & Sameer Mehta', role: 'Luxury Travellers',    location: 'Delhi, India',    destination: 'Rajasthan, India',     avatar: 'RM', accent: RED,   rating: 5, text: 'The hotel curation is extraordinary. Each property felt like a personal discovery. Our Udaipur suite was upgraded before we even arrived, with a hand-written welcome note from the property manager.', tag: 'Luxury Hotels' },
  { id: 6, name: 'Chen Wei',            role: 'Business Traveller',   location: 'Shanghai, China', destination: 'Dubai, UAE',           avatar: 'CW', accent: GOLD2, rating: 5, text: 'The bilingual meet-and-greet at Dubai Airport was waiting before my flight landed. Impeccable vehicle, remarkable attention to detail, and zero stress. Exactly what a business traveller needs.', tag: 'Transfers' },
  { id: 7, name: 'Fatima Al-Hassan',    role: 'Leisure Traveller',    location: 'Dubai, UAE',      destination: 'Swiss Alps',           avatar: 'FA', accent: GOLD,  rating: 5, text: 'The Swiss itinerary felt tailor-made for my soul. Every train, every vista, every cheese fondue evening had been thought through with such care. Nothing felt like a tourist trap. It felt like home.', tag: 'Europe Tour' },
  { id: 8, name: 'Rajesh & Kavitha Nair',role: 'Anniversary Couple', location: 'Chennai, India',  destination: 'Santorini, Greece',    avatar: 'RN', accent: RED,   rating: 5, text: 'Our 25th anniversary deserved something extraordinary — and Chalo Holidays delivered beyond our imagination. The caldera-view villa, the private catamaran sunset — every moment was orchestrated with love.', tag: 'Luxury Package' },
  { id: 9, name: 'Lena Müller',         role: 'Cultural Explorer',    location: 'Berlin, Germany', destination: 'Rajasthan & Goa',      avatar: 'LM', accent: GOLD2, rating: 5, text: 'India had always intimidated me as a solo female traveller. Chalo made it feel completely safe and deeply enriching. The local guide introductions were extraordinary — real connections, not performances.', tag: 'Cultural Tour' },
]

const STATS = [
  { val: '4.9',   label: 'Average Rating',   sub: 'Across all platforms' },
  { val: '2,400+',label: 'Verified Reviews', sub: 'Google · Trustpilot · TripAdvisor' },
  { val: '98%',   label: 'Recommend Us',     sub: 'Net Promoter Score' },
  { val: '5,000+',label: 'Happy Travellers', sub: 'Since 2016' },
]

/* ═══════════════════════════════════════════════════════════
   1. HERO
══════════════════════════════════════════════════════════════ */
function TestimonialsHero() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setTimeout(() => setLoaded(true), 60) }, [])

  return (
    <section className="relative w-full overflow-hidden"
      style={{ minHeight: 'clamp(480px,72vh,780px)', background: '#07070e' }}>

      <div className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920&q=80')`, transform: loaded ? 'scale(1.02)' : 'scale(1.09)', transition: 'transform 1.6s cubic-bezier(.4,0,.2,1)' }} />

      <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg,rgba(4,4,10,.96) 0%,rgba(4,4,10,.78) 40%,rgba(4,4,10,.28) 70%,rgba(4,4,10,.05) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg,rgba(4,4,10,.96) 0%,rgba(4,4,10,.32) 18%,transparent 45%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(4,4,10,.52) 0%,transparent 22%)' }} />

      {/* Brand amber accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{ background: `linear-gradient(180deg,transparent,${GOLD} 35%,${GOLD2} 65%,transparent)` }} />

      {/* Floating quote mark */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block" style={{ opacity: 0.04 }}>
        <Quote size={280} style={{ color: GOLD, fill: GOLD }} />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto flex flex-col justify-center"
        style={{ minHeight: 'clamp(480px,72vh,780px)', padding: 'clamp(5rem,10vh,7rem) clamp(1.5rem,5vw,4rem) clamp(3rem,6vh,4.5rem)' }}>

        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(22px)', transition: 'opacity .9s ease .08s, transform .9s ease .08s' }}>

          {/* Eyebrow label */}
          <div className="flex items-center gap-3 mb-7">
            <div style={{ width: 28, height: 1.5, background: `linear-gradient(90deg,${RED},${GOLD})`, borderRadius: 2 }} />
            <span style={{ ...T.label, color: GOLD }}>Stories from the Road</span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5"
              style={{ ...T.label, color: GOLD2, border: `1px solid ${GOLD}45`, background: 'rgba(245,168,0,0.12)', borderRadius: 2 }}>
              2,400+ Reviews
            </span>
          </div>

          {/* Hero display title — Cormorant Garamond */}
          <h1 style={{ ...T.display, color: '#fff', marginBottom: 24 }}>
            Voices of those<br />
            <em style={{ fontStyle: 'italic', color: GOLD }}>we've served.</em>
          </h1>

          {/* Hero subline — Jost bodyLg */}
          <p style={{ ...T.bodyLg, color: 'rgba(255,255,255,.55)', maxWidth: '48ch', marginBottom: '2.5rem' }}>
            Every destination is a chapter. Every traveller, an author. These are the stories our guests share — unfiltered, authentic, and deeply personal.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   5. MASONRY GRID
══════════════════════════════════════════════════════════════ */
function TestimonialCard({ t, i, inView }) {
  const [hov, setHov] = useState(false)

  return (
    <article
      className="relative flex flex-col cursor-default"
      style={{
        background: '#fff',
        border: `1px solid ${hov ? t.accent + '55' : '#E8E8E4'}`,
        borderRadius: 6,
        padding: 'clamp(20px,3vw,28px)',
        boxShadow: hov ? `0 20px 52px -12px ${t.accent}22` : '0 2px 12px -4px rgba(45,45,45,.06)',
        transform: inView ? (hov ? 'translateY(-6px)' : 'translateY(0)') : 'translateY(30px)',
        opacity: inView ? 1 : 0,
        transition: `transform ${hov ? '320ms' : '600ms'} cubic-bezier(.4,0,.2,1),box-shadow 400ms,border-color 400ms,opacity .7s ease ${i * 80}ms`,
        breakInside: 'avoid',
        marginBottom: '1.25rem',
      }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>

      {/* Top accent stripe on hover */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2.5, background: `linear-gradient(90deg,${RED},${GOLD})`, transform: hov ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform .4s cubic-bezier(.4,0,.2,1)', borderRadius: '6px 6px 0 0' }} />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center flex-shrink-0"
            style={{ width: 42, height: 42, borderRadius: '50%', background: `${t.accent}22`, border: `1.5px solid ${t.accent}50`, color: t.accent, fontFamily:'var(--f-display)', fontSize: '0.9rem', fontWeight: 700 }}>
            {t.avatar}
          </div>
          <div>
            {/* Name — h3 Playfair */}
            <p style={{ ...T.h3, color: DARK2, marginBottom: 2 }}>{t.name}</p>
            {/* Role/location — bodySm Jost */}
            <p style={{ ...T.bodySm, color: STONE }}>{t.role} · {t.location}</p>
          </div>
        </div>
        <div className="hidden sm:block">
          <StarRow count={t.rating} accent={GOLD} size={11} />
        </div>
      </div>

      {/* Destination */}
      <div className="flex items-center gap-1.5 mb-4">
        <MapPin size={10} style={{ color: t.accent }} />
        <span style={{ ...T.label, color: t.accent }}>{t.destination}</span>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: hov ? `linear-gradient(90deg,${t.accent}44,transparent)` : '#EBE8E4', marginBottom: 16, transition: 'background 400ms' }} />

      {/* Quote text — Cormorant Garamond italic, body scale */}
      <div className="relative flex-1">
        <Quote size={20} style={{ color: hov ? `${t.accent}50` : '#E8E8E4', fill: hov ? `${t.accent}50` : '#E8E8E4', position: 'absolute', top: -4, left: -2, transition: 'color 400ms, fill 400ms' }} />
        <p style={{ fontFamily:'var(--f-display)', fontStyle: 'italic', fontSize:'var(--t-body)', color: '#44403C', lineHeight: 1.82, paddingLeft: 20 }}>
          {t.text}
        </p>
      </div>

      {/* Tag */}
      <div className="mt-5 pt-4" style={{ borderTop: '1px solid #F0EDE8' }}>
        <span style={{ ...T.label, padding: '4px 10px', borderRadius: 2, background: `${GOLD}18`, color: GOLD2, border: `1px solid ${GOLD}25` }}>
          {t.tag}
        </span>
      </div>
    </article>
  )
}

function TestimonialsGrid() {
  const [ref, inView] = useInView(0.06)
  const FILTERS = ['All', 'Honeymoon', 'Family', 'Corporate', 'Solo', 'Luxury']
  const [activeFilter, setActiveFilter] = useState(0)

  return (
    <section ref={ref} className="w-full py-20 sm:py-28" style={{ background: CREAM }}>
      <div className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: `radial-gradient(${GOLD}16 1px,transparent 1px)`, backgroundSize: '30px 30px' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity .7s ease, transform .7s ease' }}>
          <div>
            <SectionLabel color={GOLD}>All Reviews</SectionLabel>
            {/* Section headline — h1 Playfair */}
            <h2 style={{ ...T.h1, color: DARK2 }}>
              Thousands of stories,<br />
              <em style={{ fontFamily:'var(--f-display)', color: GOLD, fontStyle: 'italic', fontWeight: 500 }}>one promise kept.</em>
            </h2>
          </div>
          {/* Filter chips */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f, i) => (
              <button key={f}
                onClick={() => setActiveFilter(i)}
                style={{ ...T.label, padding: '8px 16px', borderRadius: 2, background: activeFilter === i ? RED : 'transparent', color: activeFilter === i ? '#fff' : STONE, border: `1px solid ${activeFilter === i ? RED : '#E2E8F0'}`, cursor: 'pointer', transition: 'all .2s' }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry grid */}
        <div style={{ columns: 'clamp(280px, 30vw, 360px) 3', columnGap: '1.25rem' }}>
          {GRID_TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.id} t={t} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}


/* ═══════════════════════════════════════════════════════════
   PAGE ASSEMBLY
══════════════════════════════════════════════════════════════ */
export default function TestimonialsPage() {
  return (
    <div className="min-h-screen" style={{ fontFamily:'var(--f-body)', background: CREAM }}>
      <Navbar />
      <TestimonialsHero />
      <TestimonialsGrid />
      <Footer />
    </div>
  )
}