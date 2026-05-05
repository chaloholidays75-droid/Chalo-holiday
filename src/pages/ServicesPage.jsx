'use client'
import React, { useState, useRef, useEffect } from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

import {
  ArrowRight, Phone, Hotel, Car, Binoculars, Palmtree,
  Briefcase, Users, MapPin, Star, Globe,
  BadgeCheck, Crown, Train, CalendarDays, Ticket, Building2,
  UserCheck, Sparkles, Zap, MoveRight, CheckCircle2,
  MessageSquare, PenLine, CheckSquare, Navigation, Headphones,
} from 'lucide-react'
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
import ServiceImg from '../assets/images/services/service-hero.png'

/* ══════════════════════════════════════════════════
   DESIGN TOKENS
══════════════════════════════════════════════════ */
const GOLD   = '#B8860B'
const GOLD2  = '#D4A017'
const GOLD3  = '#F0C040'
const RED    = '#B91C1C'
const DARK   = '#0F172A'
const DARK2  = '#1C1917'
const DARK3  = '#0A0A0F'
const SLATE  = '#475569'
const STONE  = '#78716C'
const CREAM  = '#FAFAF5'
const CREAM2 = '#F5F0E8'

/* ══════════════════════════════════════════════════
   HOOK
══════════════════════════════════════════════════ */
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

/* ══════════════════════════════════════════════════
   SHARED ATOMS
══════════════════════════════════════════════════ */
function GoldRule({ w = 32 }) {
  return <div style={{ width: w, height: 1, background: `linear-gradient(90deg,${GOLD},${GOLD2})`, flexShrink: 0 }} />
}
function SectionEyebrow({ label, color = GOLD }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <GoldRule w={24} />
      <span style={{ color, fontSize: 10, fontWeight: 700, letterSpacing: '0.26em', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>
        {label}
      </span>
    </div>
  )
}

/* ══════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════ */
const SERVICES = [
  {
    id: '01',
    icon: Hotel,
    label: 'Hotel Booking',
    headline: 'Hotel Booking',
    tagline: 'Best rates with seamless booking.',
    description: 'Discover a wide range of carefully selected hotels across the globe, from budget-friendly stays to luxury resorts. We ensure comfort, convenience, and value with every booking, along with instant confirmations and trusted quality standards.',
    features: [
      'Luxury & budget accommodations',
      'Instant booking confirmation',
      'Prime locations worldwide'
    ],
    category: 'Accommodation',
  },
  {
    id: '02',
    icon: Palmtree,
    label: 'Holiday Packages',
    headline: 'Holiday Packages',
    tagline: 'Complete travel experiences.',
    description: 'Explore our all-inclusive holiday packages designed to offer a hassle-free travel experience. From flights and hotels to curated activities, every detail is thoughtfully planned to create unforgettable journeys.',
    features: [
      'All-inclusive travel plans',
      'Custom itineraries',
      'Family & couple packages'
    ],
    category: 'Holidays',
  },
  {
    id: '03',
    icon: Crown,
    label: 'VIP Packages',
    headline: 'VIP Luxury',
    tagline: 'Travel in ultimate style.',
    description: 'Experience luxury like never before with our VIP travel services. Enjoy private villas, premium resorts, personalized concierge support, and exclusive experiences tailored to your preferences.',
    features: [
      'Private villas & luxury resorts',
      'Personal concierge service',
      'Exclusive premium experiences'
    ],
    category: 'Luxury',
  },
  {
    id: '04',
    icon: Users,
    label: 'Group Bookings',
    headline: 'Group Tours',
    tagline: 'Perfect for every group.',
    description: 'Our group travel solutions are ideal for families, friends, schools, and corporate teams. We provide customized itineraries, coordinated travel plans, and dedicated support for a smooth group experience.',
    features: [
      'Customized group itineraries',
      'Flexible scheduling',
      'Dedicated tour support'
    ],
    category: 'Groups',
  },
  {
    id: '05',
    icon: Train,
    label: 'Rail Holidays',
    headline: 'Rail Journeys',
    tagline: 'Travel through scenic routes.',
    description: 'Enjoy unforgettable rail journeys across some of the world’s most scenic destinations. Our rail holiday packages combine comfort, breathtaking views, and unique travel experiences.',
    features: [
      'Scenic train routes',
      'Comfortable travel options',
      'Rail + hotel packages'
    ],
    category: 'Rail',
  },
  {
    id: '06',
    icon: Car,
    label: 'Transfers',
    headline: 'Transfers & Cabs',
    tagline: 'Reliable travel services.',
    description: 'We provide seamless transfer services including airport pickups, private cars, and intercity travel. Our focus is on punctuality, safety, and comfort for every journey.',
    features: [
      'Airport & city transfers',
      'Private & shared rides',
      '24/7 service availability'
    ],
    category: 'Transport',
  },
  {
    id: '07',
    icon: Binoculars,
    label: 'Sightseeing',
    headline: 'Guided Tours',
    tagline: 'Explore with experts.',
    description: 'Discover destinations through guided sightseeing tours led by experienced professionals. Enjoy well-planned itineraries with access to top attractions and hidden gems.',
    features: [
      'Expert local guides',
      'Popular tourist attractions',
      'Hassle-free planning'
    ],
    category: 'Experiences',
  },
  {
    id: '08',
    icon: CalendarDays,
    label: 'MICE Events',
    headline: 'Events & MICE',
    tagline: 'Professional event solutions.',
    description: 'We offer complete MICE (Meetings, Incentives, Conferences, and Exhibitions) solutions, managing every aspect from venue selection to execution for successful events.',
    features: [
      'Venue selection & planning',
      'Complete event management',
      'On-site coordination'
    ],
    category: 'Corporate',
  },
  {
    id: '09',
    icon: Briefcase,
    label: 'Corporate Travel',
    headline: 'Corporate Bookings',
    tagline: 'Smart business travel.',
    description: 'Our corporate travel services are designed to simplify business trips with efficient planning, cost-effective solutions, and dedicated support for organizations.',
    features: [
      'Corporate travel management',
      'Dedicated support team',
      'Flexible booking options'
    ],
    category: 'Corporate',
  },
];

const ADD_ONS = [
  { icon: Ticket,      label: 'Sports & Event Tickets',  desc: 'Premier League, F1, concerts & major events — secured in advance.' },
  { icon: Sparkles,    label: 'Disneyland Paris',         desc: 'Proud Disneyland Paris partner — packages, tickets & hotel stays.' },
  { icon: Zap,         label: 'Late Night Activities',    desc: 'Evening entertainment, dining experiences & nightlife tours.' },
  { icon: Briefcase,   label: 'Business Travel',          desc: 'Corporate rates, lounges, dedicated account management.' },
  { icon: UserCheck,   label: 'Single Travel',            desc: 'Solo traveller packages with safety, community & flexibility.' },
  { icon: Building2,   label: 'Serviced Apartments',      desc: 'Long-stay & short-stay serviced apartments across major cities.' },
  { icon: Car,         label: 'Ground Support',           desc: 'Car hire, chauffeur service, theatre tickets & local attractions.' },
  { icon: CalendarDays,label: 'Meetings & Conferences',   desc: 'Full venue sourcing, AV, catering & delegate travel.' },
  { icon: Globe,       label: 'Visa Assistance',          desc: 'Documentation, appointments & embassy liaison for 60+ visas.' },
]

const HOTEL_PARTNERS = [
  { name: 'InterContinental', tier: 'Luxury',       logo: IhgLogo,        rooms: '883,000+ rooms' },
  { name: 'Hyatt',            tier: 'Luxury',       logo: HyattLogo,      rooms: '300+ properties' },
  { name: 'Marriott',         tier: 'Luxury',       logo: StarwoodLogo,   rooms: '8,800+ hotels' }, // using Starwood as Marriott group
  { name: 'Hilton',           tier: 'Premium',      logo: HiltonLogo,     rooms: '7,600+ properties' },
  { name: 'Accor',            tier: 'Premium',      logo: AccorLogo,      rooms: '5,700+ hotels' },
  { name: 'Four Seasons',     tier: 'Ultra Luxury', logo: FourSeasonsLogo,rooms: '130+ resorts' },
  { name: 'Mandarin Oriental',tier: 'Ultra Luxury', logo: MandarinLogo,   rooms: '38 properties' },
  { name: 'Jumeirah',         tier: 'Ultra Luxury', logo: JumeirahLogo,   rooms: '25+ hotels' },
  { name: 'Kempinski',        tier: 'Ultra Luxury', logo: KempinskiLogo,  rooms: '80+ hotels' },
  { name: 'Radisson',         tier: 'Premium',      logo: RadissonLogo,   rooms: '1,700+ hotels' },
  { name: 'Wyndham',          tier: 'Select',       logo: WyndhamLogo,    rooms: '9,000+ properties' },
  { name: 'Rosewood',         tier: 'Ultra Luxury', logo: RosewoodLogo,   rooms: '30+ hotels' },
];
const TIER_COLORS = {
  'Ultra Luxury': { bg: `${GOLD}14`, border: `${GOLD}35`,   text: GOLD },
  'Luxury':       { bg: `${GOLD2}10`, border: `${GOLD2}30`, text: GOLD2 },
  'Premium':      { bg: '#1C191708', border: '#E8E5E1',      text: STONE },
  'Select':       { bg: '#1C191706', border: '#E8E5E1',      text: '#9CA3AF' },
}

const PROCESS = [
  { step: '01', title: 'Consultation',  desc: 'A dedicated consultant listens deeply to your vision, preferences, and budget.',            duration: '30–60 min',         Icon: MessageSquare },
  { step: '02', title: 'Crafting',      desc: 'We architect a bespoke itinerary, hand-selecting every hotel, transfer, and experience.',   duration: '48 hours',          Icon: PenLine },
  { step: '03', title: 'Refinement',    desc: 'You review, we refine. Every detail adjusted until it is precisely perfect.',               duration: 'Unlimited revisions',Icon: CheckSquare },
  { step: '04', title: 'Confirmation',  desc: 'All bookings locked, travel documents dispatched, and your concierge introduced.',          duration: '72 hours prior',    Icon: Navigation },
  { step: '05', title: 'On Journey',    desc: '24/7 on-ground support throughout your entire journey — one call away, always.',            duration: 'Always on',         Icon: Headphones },
]

const FAQ_ITEMS = [
  { q: 'How do B2B credit accounts work?', a: 'Approved corporate partners receive Net 30 or Net 60 payment terms with monthly consolidated invoicing. There are no upfront deposits for accounts with 90+ days of trading history. Credit limits are reviewed quarterly based on volume.' },
  { q: 'What is the minimum volume for a corporate account?', a: 'There is no formal minimum — we work with companies from 10-employee SMEs to 10,000-person enterprises. However, our dedicated account manager service, volume rebates, and custom reporting are unlocked from £50,000 annual travel spend.' },
  { q: 'How quickly can you turn around group bookings?', a: 'For groups under 20 passengers, we typically confirm within 4–6 hours. Groups of 20–100: within 24 hours. Over 100 delegates: 48–72 hours. Emergency bookings (same-day) are handled via our priority desk.' },
  { q: 'Are your prices IATA NET or retail?', a: 'We offer true IATA NET pricing to registered trade partners. For corporate clients, we work to negotiated corporate rates agreed at account setup — always benchmarked against public fares and GDS rates.' },
  { q: 'What happens if a flight is cancelled or a traveller needs emergency support?', a: 'Our 24/7 duty desk handles all disruptions in real time. We proactively rebook, manage hotel extensions, and coordinate ground transfers — your travellers are never left waiting. All incidents are logged and reported.' },
]

/* ══════════════════════════════════════════════════
   BLOB PATHS — 4 unique organic shapes
══════════════════════════════════════════════════ */
const BLOB_PATHS = [
  'M82,16C94,25,100,41,97,56c-3,15-14,29-27,35S39,91,27,83C15,75,8,60,9,46S18,18,31,11S70,7,82,16Z',
  'M80,14C93,22,101,38,100,54s-11,32-25,38S42,94,29,85C16,76,8,59,9,44S18,16,32,10S67,6,80,14Z',
  'M78,13C92,21,100,37,99,53S88,84,74,90S41,93,28,84S9,61,10,46S20,17,34,11S64,5,78,13Z',
  'M81,15C94,23,102,39,101,55S90,86,76,92S41,94,28,85S8,62,9,47S19,18,33,11S68,7,81,15Z',
]

/* blob icons */
function BlobIconPricing() {
  return <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 9.5C9 8.12 10.34 7 12 7s3 1.12 3 2.5c0 1.2-.8 2.2-2 2.7L12 14"/><circle cx="12" cy="17" r=".6" fill="#fff" stroke="none"/></svg>
}
function BlobIconTeam() {
  return <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M2 12h4m16 0h-4M12 2v4m0 16v-4m-5.7-12.3 2.8 2.8M16.9 16.9l-2.8-2.8M6.3 16.9l2.8-2.8M17.7 7.1l-2.8 2.8"/></svg>
}
function BlobIconBooking() {
  return <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="rgba(255,255,255,0.18)"/></svg>
}
function BlobIconSafe() {
  return <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
}

const WHY_ITEMS = [
  { BlobIcon: BlobIconPricing, title: 'Competitive Pricing', desc: 'We offer the most reasonable price throughout the market.' },
  { BlobIcon: BlobIconTeam,    title: 'Backup Team',         desc: 'We have staff to assist in all stages of your holiday.' },
  { BlobIcon: BlobIconBooking, title: 'Fast Booking',        desc: 'Booking is quick as a few clicks. We take care of all journeys.' },
  { BlobIcon: BlobIconSafe,    title: 'Stay Safe',           desc: 'We ensure the safety and security of all our customers.' },
]

/* ══════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════ */
function ServicesHero() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setTimeout(() => setMounted(true), 80) }, [])

  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: 'clamp(520px,72vh,780px)', background: DARK3, fontFamily: "Georgia,'Times New Roman',serif" }}>
     <div
  className="absolute inset-0 bg-cover bg-center"
  style={{
    backgroundImage: `url(${ServiceImg})`,
    transform: mounted ? 'scale(1.02)' : 'scale(1.09)',
    transition: 'transform 1.6s cubic-bezier(.4,0,.2,1)'
  }}
/>

<div
  className="absolute inset-0"
  style={{
    background: 'linear-gradient(110deg,rgba(3,3,8,.97) 0%,rgba(3,3,8,.82) 42%,rgba(3,3,8,.35) 70%,rgba(3,3,8,.08) 100%)'
  }}
/>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(110deg,rgba(3,3,8,.97) 0%,rgba(3,3,8,.82) 42%,rgba(3,3,8,.35) 70%,rgba(3,3,8,.08) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg,rgba(3,3,8,.95) 0%,rgba(3,3,8,.28) 30%,transparent 56%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(3,3,8,.55) 0%,transparent 22%)' }} />
      <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: `linear-gradient(180deg,transparent,${GOLD} 30%,${GOLD2} 70%,transparent)` }} />

      <div className="relative z-10 max-w-[1440px] mx-auto flex flex-col justify-center" style={{ minHeight: 'clamp(520px,72vh,780px)', padding: 'clamp(5rem,10vh,7rem) clamp(1.5rem,5vw,4rem) clamp(4rem,7vh,5rem)', opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(22px)', transition: 'opacity .9s ease .08s, transform .9s ease .08s' }}>
        <div className="flex items-center gap-3 mb-6" style={{ fontFamily: 'sans-serif' }}>
          <div style={{ width: 28, height: 1, background: GOLD }} />
          <span style={{ color: GOLD, fontSize: 10, fontWeight: 700, letterSpacing: '.24em', textTransform: 'uppercase' }}>Our Services</span>
        </div>
        <h1 className="text-white leading-[.92] mb-5" style={{ fontSize: 'clamp(3rem,8.5vw,6.2rem)', fontWeight: 400, letterSpacing: '-0.025em' }}>
          Travel services<br /><em style={{ fontStyle: 'italic', color: GOLD }}>crafted for you.</em>
        </h1>
        <p style={{ color: 'rgba(255,255,255,.48)', fontSize: 'clamp(.88rem,1.4vw,1.05rem)', lineHeight: 1.85, maxWidth: '52ch', fontFamily: 'sans-serif', fontWeight: 300, marginBottom: '2.5rem' }}>
          From hotel bookings and holiday packages to corporate travel, group tours, VIP experiences and MICE events — everything your journey needs, handled by experts in one place.
        </p>
        <div className="flex flex-wrap gap-3" style={{ fontFamily: 'sans-serif' }}>
          <a href="#services-grid" className="inline-flex items-center gap-3 font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:brightness-110 hover:scale-[1.02]" style={{ background: `linear-gradient(135deg,${RED},#991B1B)`, color: '#fff', padding: '13px 28px', borderRadius: 2, boxShadow: `0 8px 28px ${RED}50`, textDecoration: 'none' }}>
            Explore Services <ArrowRight size={14} />
          </a>
          {/* <a href="tel:+4420300499780" className="inline-flex items-center gap-2 font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:bg-white/10" style={{ color: 'rgba(255,255,255,.65)', border: `1px solid ${GOLD}55`, padding: '12px 28px', borderRadius: 2, textDecoration: 'none' }}>
            <Phone size={13} /> Call Us
          </a> */}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════
   LUXURY SERVICE CARD  (new clean design)
══════════════════════════════════════════════════ */
function LuxuryServiceCard({ svc, index, inView }) {
  const [hov, setHov] = useState(false)
  const Icon = svc.icon
  const delay = `${(index % 3) * 90}ms`

  return (
    <article
      style={{
        background: '#fff',
        border: `1px solid ${hov ? GOLD + '55' : '#EDEAE5'}`,
        borderRadius: 4,
        padding: '28px 24px 22px',
        position: 'relative',
        overflow: 'hidden',
        opacity: inView ? 1 : 0,
        transform: inView ? (hov ? 'translateY(-5px)' : 'translateY(0)') : 'translateY(36px)',
        boxShadow: hov ? '0 14px 40px -8px rgba(0,0,0,.11)' : 'none',
        transition: `opacity .7s ease ${delay}, transform .45s cubic-bezier(.4,0,.2,1), border-color .3s, box-shadow .35s`,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >

      {/* Top gold line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg,${GOLD},${GOLD2})`,
        transform: hov ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform .4s ease',
      }} />

      {/* Watermark ID */}
      <span style={{
        position: 'absolute', top: 14, right: 18,
        fontFamily: "Georgia,serif",
        fontSize: 44,
        fontWeight: 700,
        color: hov ? '#ECD8A0' : '#F5F0E8',
        transition: 'color .35s',
        userSelect: 'none',
      }}>
        {svc.id}
      </span>

      {/* Icon */}
      <div style={{
        width: 48,
        height: 48,
        borderRadius: 12,
        background: hov ? GOLD : '#FDF8EE',
        border: `1px solid ${hov ? GOLD : '#ECD9A0'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 18,
        transition: 'all .3s',
      }}>
        <Icon size={20} style={{
          stroke: hov ? '#fff' : GOLD,
          strokeWidth: 1.6,
          transition: 'stroke .3s'
        }} />
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "Georgia,'Times New Roman',serif",
        fontSize: 18,
        fontWeight: 400,
        color: DARK2,
        marginBottom: 8,
        lineHeight: 1.2,
      }}>
        {svc.headline}
      </h3>

      {/* Tagline */}
      <p style={{
        fontSize: 12.5,
        color: STONE,
        lineHeight: 1.6,
        marginBottom: 14,
      }}>
        {svc.tagline}
      </p>

      {/* Description (NEW - since you expanded content) */}
      <p style={{
        fontSize: 12,
        color: '#8B8578',
        lineHeight: 1.7,
        marginBottom: 14,
      }}>
        {svc.description}
      </p>

      {/* Features */}
      <div style={{
        maxHeight: hov ? 100 : 0,
        overflow: 'hidden',
        transition: 'max-height .4s ease',
      }}>
        {svc.features.map((f, fi) => (
          <div key={fi} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            marginBottom: 5
          }}>
            <div style={{
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: GOLD
            }} />
            <span style={{ fontSize: 11, color: STONE }}>{f}</span>
          </div>
        ))}
      </div>

      {/* Bottom arrow only */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: 16
      }}>
        <a href="/services" style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: `1px solid ${hov ? GOLD : '#E8E4DD'}`,
          background: hov ? GOLD : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all .3s',
        }}>
          <MoveRight size={14} style={{
            stroke: hov ? '#fff' : '#B0A898',
            transform: hov ? 'translateX(2px)' : 'none',
            transition: 'all .3s'
          }} />
        </a>
      </div>

    </article>
  )
}
/* ══════════════════════════════════════════════════
   SERVICES GRID — new luxury card layout
══════════════════════════════════════════════════ */
function ServicesGrid() {
  const [ref, inView] = useInView(0.04)
  const [activeFilter, setActiveFilter] = useState('All')

  const categories = ['All', 'Accommodation', 'Holidays', 'Luxury', 'Groups', 'Rail', 'Transport', 'Experiences', 'Corporate']
  const filtered = activeFilter === 'All' ? SERVICES : SERVICES.filter(s => s.category === activeFilter)

  return (
    <section id="services-grid" ref={ref} className="relative w-full" style={{ background: CREAM, paddingTop: '5rem', paddingBottom: '5rem' }}>
      {/* top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg,transparent,${GOLD},${RED},${GOLD2},transparent)` }} />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* Section header */}
        <div
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity .7s ease, transform .7s ease' }}
        >
          <div>
            <SectionEyebrow label="Our Services" />
            <h2 style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(2.2rem,5.5vw,3.6rem)', fontWeight: 400, color: DARK2, letterSpacing: '-0.025em', lineHeight: 1.02 }}>
              Everything you need<br /><em style={{ color: GOLD }}>for any journey.</em>
            </h2>
          </div>
          <p style={{ color: STONE, fontSize: '.9rem', lineHeight: 1.80, fontFamily: 'sans-serif', maxWidth: '38ch' }}>
            Nine bespoke service lines, delivered with the same obsessive attention to detail — from budget breaks to ultra-luxury escapes.
          </p>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap gap-2 mb-10" style={{ opacity: inView ? 1 : 0, transition: 'opacity .7s ease .1s' }}>
          {categories.map(cat => {
            const active = activeFilter === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase',
                  padding: '7px 16px', borderRadius: 2, fontFamily: 'sans-serif', cursor: 'pointer',
                  transition: 'all .25s',
                  background: active ? GOLD : CREAM2,
                  color: active ? '#fff' : STONE,
                  border: `1px solid ${active ? GOLD : '#E8E5E1'}`,
                  boxShadow: active ? `0 4px 16px ${GOLD}44` : 'none',
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* 3-column luxury card grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((svc, i) => (
              <LuxuryServiceCard key={svc.id} svc={svc} index={i} inView={inView} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', color: STONE, fontFamily: 'sans-serif' }}>
            No services in this category.{' '}
            <button onClick={() => setActiveFilter('All')} style={{ color: GOLD, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}>
              View all
            </button>
          </div>
        )}

        {/* Bottom CTA strip */}
        <div
          className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 p-7"
          style={{ background: '#fff', border: `1px solid #EDEAE5`, borderRadius: 4, opacity: inView ? 1 : 0, transition: 'opacity .7s ease .4s' }}
        >
          <div>
            <p style={{ fontFamily: "Georgia,serif", fontSize: '1.1rem', color: DARK2, marginBottom: 4 }}>Don't see what you're looking for?</p>
            <p style={{ fontFamily: 'sans-serif', fontSize: 12.5, color: STONE }}>We specialise in bespoke arrangements — speak to our consultants for tailored solutions.</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a href="tel:+4420300499780" className="inline-flex items-center gap-2" style={{ background: CREAM2, color: STONE, border: `1px solid #E8E5E1`, padding: '11px 22px', borderRadius: 2, fontFamily: 'sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none' }}>
              <Phone size={12} /> Call Us
            </a>
            <a href="#inquiry" className="inline-flex items-center gap-2" style={{ background: `linear-gradient(135deg,${RED},#991B1B)`, color: '#fff', padding: '11px 22px', borderRadius: 2, fontFamily: 'sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', boxShadow: `0 6px 20px ${RED}44` }}>
              Make Enquiry <MoveRight size={12} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════
   HOTEL PARTNERS
══════════════════════════════════════════════════ */
function HotelPartners() {
  const [ref, inView] = useInView(0.06)
  const [activeFilter, setActiveFilter] = useState('All')
  const tiers = ['All', 'Ultra Luxury', 'Luxury', 'Premium', 'Select']
  const filtered = activeFilter === 'All' ? HOTEL_PARTNERS : HOTEL_PARTNERS.filter(h => h.tier === activeFilter)

  return (
    <section ref={ref} className="relative w-full py-20 sm:py-24" style={{ background: '#fff' }}>
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: `radial-gradient(rgba(184,134,11,0.05) 1px,transparent 1px)`, backgroundSize: '28px 28px' }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity .7s ease, transform .7s ease' }}>
          <div>
            <SectionEyebrow label="Hotel Partners" />
            <h2 style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 400, color: DARK, letterSpacing: '-0.02em' }}>
              Worldwide rates with <em style={{ color: GOLD }}>all major chains.</em>
            </h2>
            <p style={{ color: STONE, fontSize: '.9rem', lineHeight: 1.78, maxWidth: '54ch', fontFamily: 'sans-serif', marginTop: '0.75rem' }}>
              Chalo Holiday holds negotiated corporate rates with every major international hotel group.
            </p>
          </div>
        </div>
        {/* <div className="flex flex-wrap gap-2 mb-8">
          {tiers.map(t => {
            const active = activeFilter === t
            return (
              <button key={t} onClick={() => setActiveFilter(t)} style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '7px 16px', borderRadius: 3, fontFamily: 'sans-serif', cursor: 'pointer', transition: 'all .25s', background: active ? GOLD : '#fff', color: active ? '#fff' : STONE, border: `1px solid ${active ? GOLD : '#E8E5E1'}`, boxShadow: active ? `0 4px 14px -4px ${GOLD}55` : 'none' }}>
                {t}
              </button>
            )
          })}
        </div> */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {filtered.map((hotel, i) => {
            const [hov, setHov] = useState(false)
            const tierStyle = TIER_COLORS[hotel.tier] || TIER_COLORS['Select']
            return (
              <div key={hotel.name} className="relative flex flex-col items-center justify-center p-6 rounded-lg cursor-default transition-all duration-350" style={{ background: hov ? '#fff' : CREAM2, border: `1px solid ${hov ? GOLD + '55' : '#E8E5E1'}`, boxShadow: hov ? `0 12px 32px -8px rgba(184,134,11,.14)` : 'none', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: `background 300ms,border-color 300ms,box-shadow 300ms,opacity .6s ease ${i * 50}ms,transform .6s ease ${i * 50}ms`, minHeight: 120 }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
                {/* <div style={{ position: 'absolute', top: 10, right: 10 }}>
                  <span style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '2px 7px', borderRadius: 2, background: tierStyle.bg, border: `1px solid ${tierStyle.border}`, color: tierStyle.text, fontFamily: 'sans-serif' }}>{hotel.tier}</span>
                </div> */}
                <div
  style={{
    height: 60, // increase container height
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: '100%',
  }}
>
  <img
    src={hotel.logo}
    alt={hotel.name}
    style={{
      height: '100%',
      width: '100%',
      objectFit: 'contain', // keeps full image visible
      filter: hov ? 'none' : 'grayscale(40%) opacity(0.75)',
      transition: 'filter 300ms',
    }}
    onError={e => { e.currentTarget.style.display = 'none' }}
  />
</div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════
   ADD-ONS
══════════════════════════════════════════════════ */
function AddOnServices() {
  const [ref, inView] = useInView(0.08)
  return (
    <section ref={ref} className="w-full py-20 sm:py-24" style={{ background: CREAM }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity .7s ease, transform .7s ease' }}>
          <div>
            <SectionEyebrow label="Also Available" />
            <h2 style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(1.9rem,4vw,3rem)', fontWeight: 400, color: DARK2, letterSpacing: '-0.02em' }}>
              Activities &amp; <em style={{ color: GOLD }}>add-ons.</em>
            </h2>
          </div>
          <p style={{ color: STONE, fontSize: '.875rem', lineHeight: 1.78, maxWidth: '38ch', fontFamily: 'sans-serif' }}>
            From Disneyland Paris tickets to late-night activities, ground support, and serviced apartments.
          </p>
        </div>

{/*        
        <div className="mb-8 p-6 rounded-lg flex items-center gap-5" style={{ background: `linear-gradient(135deg,${GOLD}0D,${RED}08)`, border: `1px solid ${GOLD}30` }}>
          <div className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: `${GOLD}18`, border: `1px solid ${GOLD}40` }}>
            <Sparkles size={20} style={{ color: GOLD }} />
          </div>
          <div>
            <p style={{ fontFamily: "Georgia,serif", fontSize: '1rem', fontWeight: 600, color: DARK, marginBottom: 3 }}>Proud Partner of Disneyland Paris</p>
            <p style={{ fontSize: 13, color: STONE, fontFamily: 'sans-serif', lineHeight: 1.6 }}>Official Disneyland Paris partner — exclusive packages combining park tickets, on-site hotel stays, and travel arrangements at specially negotiated rates.</p>
          </div>
          <a href="#inquiry" className="ml-auto flex-shrink-0 inline-flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest px-4 py-2.5" style={{ background: `linear-gradient(135deg,${RED},#991B1B)`, color: '#fff', borderRadius: 3, fontFamily: 'sans-serif', whiteSpace: 'nowrap', textDecoration: 'none' }}>
            Book Now <ArrowRight size={11} />
          </a>
        </div> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ADD_ONS.map(({ icon: I, label, desc }, i) => {
            const [hov, setHov] = useState(false)
            return (
              <div key={label} className="flex items-start gap-4 p-6 rounded-lg cursor-default" style={{ border: `1px solid ${hov ? GOLD + '55' : '#E8E5E1'}`, background: hov ? '#fff' : CREAM2, boxShadow: hov ? `0 12px 32px -8px rgba(0,0,0,.08)` : 'none', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(28px)', transition: `border-color 400ms,background 400ms,box-shadow 400ms,opacity .7s ease ${i * 60}ms,transform .7s ease ${i * 60}ms` }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
                <div className="w-11 h-11 flex items-center justify-center rounded-xl shrink-0" style={{ background: hov ? `${GOLD}18` : '#F5F0E8', border: `1px solid ${hov ? GOLD + '45' : '#E7E5E4'}`, transition: 'all 300ms' }}>
                  <I size={18} style={{ color: hov ? GOLD : '#A8A29E', strokeWidth: 1.5, transition: 'color 300ms' }} />
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 13.5, color: DARK2, fontFamily: "Georgia,serif", marginBottom: 5 }}>{label}</p>
                  <p style={{ fontSize: 12, color: STONE, lineHeight: 1.65, fontFamily: 'sans-serif' }}>{desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════
   WHY CHOOSE US — blob icons with curved dashed connector
   (replaces the old HowWeWork zigzag layout)
══════════════════════════════════════════════════ */
function WhyChooseUs() {
  const [ref, inView] = useInView(0.08)

  return (
    <section ref={ref} className="relative w-full overflow-hidden" style={{ background: '#ffffff', paddingTop: 'clamp(4rem,8vh,5.5rem)', paddingBottom: 'clamp(4rem,8vh,6rem)', fontFamily: 'sans-serif' }}>
      {/* Faint background city photo */}
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=30')", backgroundSize: 'cover', backgroundPosition: 'center right', opacity: 0.06 }} />

      {/* Section header */}
      <div
        className="relative z-10 text-center mx-auto"
        style={{ maxWidth: 680, paddingLeft: '1.5rem', paddingRight: '1.5rem', marginBottom: '3.5rem', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity .7s ease, transform .7s ease' }}
      >
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD, marginBottom: 12 }}>
          Modern &amp; Beautiful
        </p>
        <h2 style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(1.9rem,4.5vw,2.8rem)', fontWeight: 700, color: '#1a2744', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          Why Choose <em style={{ fontStyle: 'italic' }}>Us Travels!</em>
        </h2>
      </div>

      {/* Items + SVG connector */}
      <div className="relative mx-auto" style={{ maxWidth: 860, paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
        <div style={{ position: 'relative' }}>

          {/* Curved dashed SVG path connecting blobs */}
          <svg
            viewBox="0 0 780 115"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 115, pointerEvents: 'none', zIndex: 0, overflow: 'visible' }}
          >
            <defs>
              <marker id="wcu-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M2 2L8 5L2 8" fill="none" stroke="#B8A98A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </marker>
              <marker id="wcu-dot" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="4" markerHeight="4">
                <circle cx="4" cy="4" r="3" fill="#B8A98A" />
              </marker>
            </defs>
            {/* 1→2 curves down */}
            <path d="M 100,55 C 148,98 228,98 278,55" fill="none" stroke="#C0B490" strokeWidth="2" strokeDasharray="6 4" markerStart="url(#wcu-dot)" markerEnd="url(#wcu-arrow)" />
            {/* 2→3 curves up */}
            <path d="M 302,55 C 352,12 432,12 482,55" fill="none" stroke="#C0B490" strokeWidth="2" strokeDasharray="6 4" markerStart="url(#wcu-dot)" markerEnd="url(#wcu-arrow)" />
            {/* 3→4 curves down */}
            <path d="M 506,55 C 554,98 634,98 684,55" fill="none" stroke="#C0B490" strokeWidth="2" strokeDasharray="6 4" markerStart="url(#wcu-dot)" markerEnd="url(#wcu-arrow)" />
          </svg>

          {/* 4-column grid of blob items */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, position: 'relative', zIndex: 1, paddingTop: 10 }}>
            {WHY_ITEMS.map((item, i) => {
              const [hov, setHov] = useState(false)
              const { BlobIcon } = item
              const delay = `${i * 120}ms`
              return (
                <div
                  key={item.title}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 10px', position: 'relative', zIndex: 1, cursor: 'default', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)', transition: `opacity .7s ease ${delay}, transform .7s ease ${delay}` }}
                  onMouseEnter={() => setHov(true)}
                  onMouseLeave={() => setHov(false)}
                >
                  {/* Blob */}
                  <div style={{
                    width: 110, height: 110, position: 'relative', marginBottom: 22,
                    transform: hov ? 'scale(1.22) translateY(-8px)' : 'scale(1) translateY(0)',
                    filter: hov ? 'drop-shadow(0 10px 22px rgba(240,160,0,.50))' : 'drop-shadow(0 2px 6px rgba(0,0,0,.10))',
                    transition: 'transform .45s cubic-bezier(.34,1.56,.64,1), filter .3s',
                  }}>
                    <svg viewBox="0 0 110 110" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
                      <path d={BLOB_PATHS[i]} fill="#F5A623" />
                    </svg>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: hov ? 'scale(1.12)' : 'scale(1)', transition: 'transform .45s cubic-bezier(.34,1.56,.64,1)' }}>
                      <BlobIcon />
                    </div>
                    {/* Pulse rings */}
                    <div style={{ position: 'absolute', inset: -6, borderRadius: '50%', border: `2px solid rgba(245,166,35,${hov ? '.40' : '0'})`, transform: hov ? 'scale(1)' : 'scale(0.8)', transition: 'all .4s ease', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', inset: -14, borderRadius: '50%', border: `1.5px solid rgba(245,166,35,${hov ? '.18' : '0'})`, transform: hov ? 'scale(1)' : 'scale(0.75)', transition: 'all .5s ease .05s', pointerEvents: 'none' }} />
                  </div>
                  <p style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 15, fontWeight: 700, color: '#1a2744', marginBottom: 8, textAlign: 'center', letterSpacing: '-0.01em' }}>
                    {item.title}
                  </p>
                  <p style={{ fontSize: 12.5, color: STONE, lineHeight: 1.65, maxWidth: 140, textAlign: 'center', fontFamily: 'sans-serif', fontWeight: 300 }}>
                    {item.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════
   HOW WE WORK — Process cards with timeline
   Uses the PROCESS data array (5 steps)
══════════════════════════════════════════════════ */
function HowWeWork() {
  const [ref, inView] = useInView(0.06)

  return (
    <section ref={ref} className="relative w-full overflow-hidden" style={{ background: CREAM, paddingTop: 'clamp(4.5rem,9vh,6rem)', paddingBottom: 'clamp(4.5rem,9vh,6rem)' }}>
      {/* Faint watermark */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none" style={{ fontFamily: "Georgia,serif", fontSize: 'clamp(8rem,18vw,14rem)', fontWeight: 700, color: `${GOLD}07`, lineHeight: 1, whiteSpace: 'nowrap' }}>
        PROCESS
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* Header */}
        <div
          className="text-center mb-14"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity .7s ease, transform .7s ease' }}
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <GoldRule w={24} />
            <span style={{ color: RED, fontSize: 10, fontWeight: 700, letterSpacing: '0.26em', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>How It Works</span>
            <GoldRule w={24} />
          </div>
          <h2 style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(2rem,4.5vw,3.2rem)', fontWeight: 400, color: DARK2, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            Your journey to <em style={{ color: GOLD }}>extraordinary</em> begins here.
          </h2>
          <p style={{ color: STONE, fontSize: '.95rem', lineHeight: 1.78, maxWidth: '44ch', margin: '0 auto', fontFamily: 'sans-serif' }}>
            Five steps. One promise. A journey crafted exactly as you imagined it.
          </p>
        </div>

        {/* Process cards — horizontal scroll on mobile, wrap on desktop */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
          style={{ opacity: inView ? 1 : 0, transition: 'opacity .7s ease .1s' }}
        >
          {PROCESS.map((p, i) => {
            const [hov, setHov] = useState(false)
            const StepIcon = p.Icon
            const delay = `${i * 80}ms`
            const isLast = i === PROCESS.length - 1

            return (
              <div
                key={p.step}
                style={{
                  position: 'relative',
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(32px)',
                  transition: `opacity .7s ease ${delay}, transform .7s ease ${delay}`,
                }}
              >
                {/* Connector arrow between cards (desktop only) */}
                {!isLast && (
                  <div
                    className="hidden lg:flex"
                    style={{
                      position: 'absolute', top: 28, right: -18, zIndex: 2,
                      width: 36, height: 20,
                      alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <svg viewBox="0 0 36 20" width="36" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 10 C8 4, 28 4, 34 10" stroke={GOLD} strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
                      <path d="M29 6L34 10L29 14" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  </div>
                )}

                {/* Card */}
                <div
                  style={{
                    background: hov ? '#fff' : CREAM2,
                    border: `1px solid ${hov ? GOLD + '55' : '#E8E5E1'}`,
                    borderRadius: 6,
                    padding: '22px 20px 20px',
                    height: '100%',
                    boxShadow: hov ? `0 14px 36px -8px rgba(0,0,0,.10)` : 'none',
                    transform: hov ? 'translateY(-4px)' : 'translateY(0)',
                    transition: 'background .3s, border-color .3s, box-shadow .35s, transform .35s',
                    cursor: 'default',
                  }}
                  onMouseEnter={() => setHov(true)}
                  onMouseLeave={() => setHov(false)}
                >
                  {/* Step badge + icon row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                    <span style={{
                      fontSize: 9, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase',
                      padding: '4px 10px', borderRadius: 2,
                      background: hov ? GOLD : `${GOLD}14`,
                      border: `1px solid ${hov ? GOLD : GOLD + '30'}`,
                      color: hov ? '#fff' : GOLD,
                      fontFamily: 'sans-serif',
                      transition: 'all .3s',
                    }}>
                      Step {p.step}
                    </span>
                    <div style={{
                      width: 36, height: 36, borderRadius: 9,
                      background: hov ? `${GOLD}18` : '#F5F0E8',
                      border: `1px solid ${hov ? GOLD + '45' : '#E7E5E4'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all .3s',
                    }}>
                      <StepIcon size={16} style={{ color: hov ? GOLD : '#A8A29E', strokeWidth: 1.6, transition: 'color .3s' }} />
                    </div>
                  </div>

                  {/* Duration chip */}
                  <p style={{
                    fontSize: 9.5, fontWeight: 600, letterSpacing: '0.12em',
                    color: STONE, fontFamily: 'sans-serif',
                    marginBottom: 8, textTransform: 'uppercase',
                  }}>
                    {p.duration}
                  </p>

                  {/* Title */}
                  <h3 style={{
                    fontFamily: "Georgia,'Times New Roman',serif",
                    fontSize: 17, fontWeight: 400,
                    color: DARK2, marginBottom: 8, lineHeight: 1.15,
                  }}>
                    {p.title}
                  </h3>

                  {/* Description */}
                  <p style={{
                    fontSize: 12, color: STONE,
                    lineHeight: 1.70, fontFamily: 'sans-serif', fontWeight: 300,
                  }}>
                    {p.desc}
                  </p>

                  {/* Gold bottom line on hover */}
                  <div style={{
                    height: 2, background: `linear-gradient(90deg,${GOLD},${GOLD2})`,
                    borderRadius: 1, marginTop: 16,
                    transform: hov ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform .4s ease',
                  }} />
                </div>
              </div>
            )
          })}
        </div>

     
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════
   FAQ
══════════════════════════════════════════════════ */
function FAQ() {
  const [ref, inView] = useInView(0.06)
  const [open, setOpen] = useState(0)

  return (
    <section ref={ref} className="w-full py-20 sm:py-28 overflow-hidden relative" style={{ background: 'linear-gradient(135deg,#1a1200 0%,#2a1e00 40%,#1a1200 100%)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 20% 50%,${GOLD}12 0%,transparent 60%),radial-gradient(circle at 80% 20%,${GOLD2}09 0%,transparent 50%)` }} />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 79px,${GOLD}07 80px),repeating-linear-gradient(90deg,transparent,transparent 79px,${GOLD}07 80px)` }} />
      <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: `linear-gradient(180deg,transparent,${GOLD} 35%,${GOLD2} 65%,transparent)` }} />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-16" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(28px)', transition: 'opacity .8s ease, transform .8s ease' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: '1rem' }}>
            <div style={{ height: 1, width: 60, background: `linear-gradient(90deg,transparent,${GOLD})` }} />
            <Star size={16} style={{ fill: GOLD, color: GOLD }} />
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.28em', textTransform: 'uppercase', color: GOLD, fontFamily: 'sans-serif' }}>Frequently Asked</span>
            <Star size={16} style={{ fill: GOLD, color: GOLD }} />
            <div style={{ height: 1, width: 60, background: `linear-gradient(90deg,${GOLD},transparent)` }} />
          </div>
          <h2 style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 400, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.06, margin: '0 0 .8rem' }}>
            Questions &amp; <em style={{ fontStyle: 'italic', color: GOLD2 }}>Answers</em>
          </h2>
        </div>

        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          {FAQ_ITEMS.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={i} onClick={() => setOpen(isOpen ? -1 : i)} style={{ background: isOpen ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)', border: `1px solid ${isOpen ? GOLD + '65' : GOLD + '25'}`, borderRadius: 6, overflow: 'hidden', transition: 'all 0.3s cubic-bezier(.4,0,.2,1)', cursor: 'pointer', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.4rem 1.8rem', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', flexShrink: 0, background: isOpen ? `${GOLD}22` : `${GOLD}10`, border: `1px solid ${isOpen ? GOLD + '55' : GOLD + '28'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>
                      <ArrowRight size={13} style={{ color: isOpen ? GOLD : `${GOLD}AA`, transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.3s, color 0.3s' }} />
                    </div>
                    <span style={{ fontFamily: "Georgia,serif", fontSize: '1rem', fontWeight: 500, color: isOpen ? '#fff' : 'rgba(255,255,255,0.8)', lineHeight: 1.3, transition: 'color 0.25s' }}>{f.q}</span>
                  </div>
                </div>
                <div style={{ maxHeight: isOpen ? 200 : 0, overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(.4,0,.2,1)' }}>
                  <div style={{ padding: '0 1.8rem 1.5rem', paddingLeft: 'calc(1.8rem + 14px + 34px)' }}>
                    <div style={{ height: 1, background: `linear-gradient(90deg,${GOLD}44,transparent)`, marginBottom: '1rem' }} />
                    <p style={{ fontFamily: 'sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, margin: 0 }}>{f.a}</p>
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

/* ══════════════════════════════════════════════════
   PAGE ASSEMBLY
══════════════════════════════════════════════════ */
export default function ServicesPage() {
  return (
    <div className="min-h-screen" style={{ background: CREAM }}>
      <Navbar />
      <ServicesHero />
      <ServicesGrid />
        <HowWeWork />
      <HotelPartners />
      <AddOnServices />
      {/* <WhyChooseUs /> */}
      <FAQ />
      <Footer />
    </div>
  )
}