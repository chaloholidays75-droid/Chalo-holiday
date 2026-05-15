import { useState, useEffect, useRef } from "react"
import { NavLink, Link, useLocation } from "react-router-dom"
import {
  Menu, X, Phone, Mail, MapPin,
  ChevronDown, ArrowUpRight,
  Hotel, Car, Binoculars, Package, Briefcase, Users,
  Plane, HeartHandshake, Globe,
  Shield, Star, Headphones, ChevronRight, Clock, Train, CalendarDays, Crown,
} from "lucide-react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebook, faInstagram, faYoutube, faLinkedin, faWhatsapp,
} from '@fortawesome/free-brands-svg-icons'
import flagUK    from "../../assets/icons/london-flag.png"
import flagIndia from "../../assets/icons/india-flag.png"
import flagDubai from "../../assets/icons/dubai-flag.png"
import logo from "../../assets/icons/Chalo_logo.png"

import AustriaImg       from "../../assets/destination-icons/Austria-img.png"
import CroatiaImg       from "../../assets/destination-icons/Croatia-img.png"
import DenmarkImg       from "../../assets/destination-icons/Denmark-img.png"
import FinlandImg       from "../../assets/destination-icons/Finland-img.png"
import FranceImg        from "../../assets/destination-icons/France-img.png"
import GermanyImg       from "../../assets/destination-icons/Germany-img.png"
import GreeceImg        from "../../assets/destination-icons/Greece-img.png"
import HungaryImg       from "../../assets/destination-icons/Hungary-img.png"
import ItalyImg         from "../../assets/destination-icons/Italy-img.png"
import NetherlandsImg   from "../../assets/destination-icons/Netherlands-img.png"
import NorwayImg        from "../../assets/destination-icons/Norway-img.png"
import PolandImg        from "../../assets/destination-icons/Poland-img.png"
import PortugalImg      from "../../assets/destination-icons/Portugal-img.png"
import RomaniaImg       from "../../assets/destination-icons/Romania-img.png"
import SloveniaImg      from "../../assets/destination-icons/Slovenia-img.png"
import SpainImg         from "../../assets/destination-icons/Spain-img.png"
import CzechRepublicImg from "../../assets/destination-icons/CzechRepublic-img.png"
import SwedenImg        from "../../assets/destination-icons/Sweden-img.png"
import SwitzerlandImg   from "../../assets/destination-icons/Switzerland-img.png"
import UnitedKingdomImg from "../../assets/destination-icons/United Kingdom-img.png"

/* ═══════════════════════════════════════════════════════════
   LUXURY TYPOGRAPHY SYSTEM — injected once, shared site-wide
══════════════════════════════════════════════════════════════ */
if (typeof document !== 'undefined' && !document.getElementById('luxury-fonts')) {
  const l = document.createElement('link')
  l.id   = 'luxury-fonts'
  l.rel  = 'stylesheet'
  l.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=Jost:wght@300;400;500;600&family=Montserrat:wght@400;500;600;700&display=swap'
  document.head.appendChild(l)
}
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

/* ═══════════════════════════════════════════════════════════
   PALETTE
══════════════════════════════════════════════════════════════ */
const RED   = "#D91B1B"
const RED2  = "#B01515"
const GOLD  = "#F5A800"
const GOLD2 = "#C8880A"
const DARK  = "#2D2D2D"

/* ── Shared type style objects ── */
const T = {
  body    : { fontFamily:'var(--f-body)',  fontWeight:300 },
  bodySm  : { fontFamily:'var(--f-body)',  fontWeight:400 },
  label   : { fontFamily:'var(--f-label)', letterSpacing:'var(--ls-label)', textTransform:'uppercase', fontWeight:700 },
  sublabel: { fontFamily:'var(--f-label)', letterSpacing:'var(--ls-sublabel)', textTransform:'uppercase', fontWeight:600 },
  display : { fontFamily:'var(--f-display)', letterSpacing:'var(--ls-display)', fontWeight:700 },
  heading : { fontFamily:'var(--f-heading)', letterSpacing:'var(--ls-heading)', fontWeight:600 },
}

/* ═══════════════════════════════════════════════════════════
   BRAND
══════════════════════════════════════════════════════════════ */
const BRAND = {
  phone1: "+44 (0) 2030 049978",
  phone2: "+91 98765 43210",
  email1: "info@chaloholiday.com",
  email2: "support@chaloholiday.com",
  address: "40 South Park Crescent, Ilford, London IG1 1XU",
  whatsapp: "447575104081",
}

/* ═══════════════════════════════════════════════════════════
   NAV DATA
══════════════════════════════════════════════════════════════ */
const navLinks = [
  { label: "Home",         to: "/"            },
  { label: "About Us",     to: "/about"       },
  { label: "Services",     dropdown: "services",     to: "/services"      },
  { label: "Destinations", dropdown: "destinations", to: "/destinations"  },
  { label: "Testimonials", to: "/testimonials" },
  { label: "Contact",      to: "/contact"     },
]

const servicesData = [
  { icon: Hotel,       name: "Hotel",                   to: "/services", tag: "Best Rates", desc: "Carefully selected hotel options across categories, ensuring comfort, convenience, and value for every stay.", hot: true  },
  { icon: Users,       name: "Group Bookings",          to: "/services", tag: "10+ Pax",   desc: "Tour packages suitable for adults, kids, and elderly travellers.", hot: false },
  { icon: Train,       name: "Train Travel",            to: "/services", tag: "Exclusive", desc: "Exclusive rail tour holiday packages. Check details and book for a memorable journey.", hot: false },
  { icon: Binoculars,  name: "Transfers & Sightseeing", to: "/services", tag: "Guided",    desc: "Grab the best deals on transfers, sightseeing tours, and airport transfers.", hot: false },
  { icon: CalendarDays,name: "Event & Conference",      to: "/services", tag: "MICE",      desc: "Make your event a memorable experience with our meeting planning team.", hot: false },
  { icon: Briefcase,   name: "Corporate Bookings",      to: "/services", tag: "B2B",       desc: "City tours for every age group with unbeatable deals and discounts.", hot: false },
  { icon: Crown,       name: "VIP Packages",            to: "/services", tag: "Luxury",    desc: "Enjoy our luxury collection designed especially for VIPs. Includes boutique hotels and resorts.", hot: true  },
]

const COUNTRY_COVERS = {
  "United Kingdom": UnitedKingdomImg, "Italy": ItalyImg, "Switzerland": SwitzerlandImg,
  "France": FranceImg, "Spain": SpainImg, "Netherlands": NetherlandsImg,
  "Poland": PolandImg, "Sweden": SwedenImg, "Denmark": DenmarkImg,
  "Norway": NorwayImg, "Finland": FinlandImg, "Hungary": HungaryImg,
  "Greece": GreeceImg, "Germany": GermanyImg, "Austria": AustriaImg,
  "Czech Republic": CzechRepublicImg, "Portugal": PortugalImg,
  "Croatia": CroatiaImg, "Romania": RomaniaImg, "Slovenia": SloveniaImg,
}

const destinationCategories = [
  { name: "Western Europe",          countries: ["United Kingdom","France","Spain","Portugal","Netherlands","Italy","Switzerland"].map(n => ({ name:n, img:COUNTRY_COVERS[n] })) },
  { name: "Northern Europe",         countries: ["Sweden","Denmark","Norway","Finland"].map(n => ({ name:n, img:COUNTRY_COVERS[n] })) },
  { name: "Central Europe",          countries: ["Germany","Austria","Czech Republic","Hungary","Poland"].map(n => ({ name:n, img:COUNTRY_COVERS[n] })) },
  { name: "Southern / Eastern Europe",countries: ["Greece","Croatia","Romania","Slovenia"].map(n => ({ name:n, img:COUNTRY_COVERS[n] })) },
]

/* ═══════════════════════════════════════════════════════════
   TIMEZONE WIDGET
══════════════════════════════════════════════════════════════ */
const TIMEZONES = [
  { city: "London", tz: "Europe/London", flag: flagUK    },
  { city: "Delhi",  tz: "Asia/Kolkata",  flag: flagIndia },
  { city: "Dubai",  tz: "Asia/Dubai",    flag: flagDubai },
]

function TimezoneWidget() {
  const [times, setTimes] = useState({})
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(0)
  const ref = useRef(null)

  const fmt = (tz) => {
    const s = new Date().toLocaleTimeString("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true })
    const [time, ap] = s.split(" ")
    return { time, ap: (ap || "").toUpperCase() }
  }

  useEffect(() => {
    const tick = () => {
      const t = {}
      TIMEZONES.forEach(z => { t[z.city] = fmt(z.tz) })
      setTimes(t)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener("mousedown", fn)
    return () => document.removeEventListener("mousedown", fn)
  }, [])

  const active = TIMEZONES[selected]
  const { time, ap } = times[active.city] || { time: "--:--:--", ap: "" }

  return (
    <div ref={ref} className="relative hidden sm:block">
      <button onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 transition-all duration-200"
        style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <img src={active.flag} alt={active.city} style={{ width: 22, height: 15, objectFit: "cover", borderRadius: 3, flexShrink: 0 }} />
        {/* Time — Jost tabular nums */}
        <span style={{ ...T.bodySm, fontSize: 13, color: '#1e293b' }} className="tabular-nums">
          {time}
          <span style={{ ...T.bodySm, fontSize: 10, color: '#94a3b8', marginLeft: 4 }}>{ap}</span>
        </span>
        <ChevronDown size={12} className={`text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 z-50 overflow-hidden"
          style={{ background: "#fff", border: "1px solid #e8e5e1", borderRadius: 14, boxShadow: "0 16px 48px rgba(0,0,0,0.13)", minWidth: 258 }}>
          {/* Dropdown header */}
          <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: RED2 }}>
            <Globe size={12} className="text-white opacity-70" />
            {/* Label — Montserrat */}
            <span style={{ ...T.label, fontSize: 9, color: 'rgba(255,255,255,0.85)' }}>World Clock</span>
          </div>
          {TIMEZONES.map((z, i) => {
            const { time: t, ap: a } = times[z.city] || { time: "--:--:--", ap: "" }
            const isSel = i === selected
            return (
              <button key={z.city} type="button"
                onClick={() => { setSelected(i); setOpen(false) }}
                className="w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors duration-150"
                style={{ background: isSel ? "#FEF9F0" : "#fff", borderBottom: i < TIMEZONES.length - 1 ? "1px solid #f5f3f0" : "none" }}>
                <div className="flex items-center gap-3">
                  <img src={z.flag} alt={z.city} style={{ width: 28, height: 19, objectFit: "cover", borderRadius: 4, flexShrink: 0 }} />
                  <div>
                    <div className="flex items-center gap-1.5">
                      {/* City name — Jost body-sm */}
                      <span style={{ ...T.bodySm, fontSize: 12, color: '#1e293b', fontWeight: 600 }}>{z.city}</span>
                      {isSel && <span style={{ width: 6, height: 6, borderRadius: "50%", background: GOLD, display: "inline-block" }} />}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {/* Time — Cormorant for elegance */}
                  <p style={{ fontFamily:'var(--f-display)', fontSize: 18, fontWeight: 600, color: '#1e293b', lineHeight: 1 }} className="tabular-nums">{t}</p>
                  <p style={{ ...T.bodySm, fontSize: 10, color: '#94a3b8', marginTop: 2 }}>{a}</p>
                </div>
              </button>
            )
          })}
          <div style={{ height: 3, background: GOLD }} />
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   SERVICES MEGA
══════════════════════════════════════════════════════════════ */
function ServicesMega({ onClose }) {
  const [hovered, setHovered] = useState(null)
  return (
    <div className="flex overflow-hidden" style={{ background: "#FAFAF8" }}>
      <div className="flex-1 px-4 sm:px-8 pt-6 sm:pt-8 pb-5 sm:pb-7">
        {/* Mega header — Montserrat label */}
        <div className="flex items-center gap-3 mb-5 sm:mb-6">
          <div className="h-px w-6" style={{ background: GOLD }} />
          <span style={{ ...T.label, fontSize: 'var(--t-label)', color: GOLD }}>Our Services</span>
          <div className="h-px flex-1" style={{ background: "#E8E5E1" }} />
          <Link to="/services" onClick={onClose}
            className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-60"
            style={{ ...T.label, fontSize: 9, color: GOLD }}>
            All Services <ArrowUpRight size={10} />
          </Link>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 sm:gap-2.5">
          {servicesData.map((s) => {
            const Icon = s.icon
            const isActive = hovered === s.name
            return (
              <Link key={s.name} to={s.to} onClick={onClose}
                onMouseEnter={() => setHovered(s.name)}
                onMouseLeave={() => setHovered(null)}
                className="relative flex flex-col gap-2 sm:gap-3 p-3 sm:p-4 overflow-hidden transition-all duration-300"
                style={{
                  borderRadius: 5,
                  background: isActive ? (s.hot ? "#FEF2F2" : "#FDFBF4") : "#FFFFFF",
                  border: `1px solid ${isActive ? (s.hot ? "rgba(217,27,27,.30)" : "rgba(245,168,0,.35)") : "#E8E5E1"}`,
                  transform: isActive ? "translateY(-3px)" : "none",
                  boxShadow: isActive ? (s.hot ? "0 12px 32px rgba(217,27,27,.12)" : "0 12px 32px rgba(245,168,0,.10)") : "0 1px 4px rgba(15,23,42,.05)",
                  textDecoration: 'none',
                }}>
                <div className="absolute top-0 left-0 h-[2px] transition-all duration-500"
                  style={{ width: isActive ? "100%" : "0%", background: s.hot ? `linear-gradient(90deg,${RED},${GOLD})` : `linear-gradient(90deg,${GOLD},${GOLD2})` }} />
                <div className="flex items-start justify-between">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded flex items-center justify-center transition-all duration-300"
                    style={{ background: s.hot ? (isActive ? "#FEE2E2" : "#FEF2F2") : (isActive ? "rgba(245,168,0,.14)" : "rgba(245,168,0,.08)"), border: `1px solid ${s.hot ? "rgba(217,27,27,.20)" : "rgba(245,168,0,.22)"}` }}>
                    <Icon size={14} color={s.hot ? RED : GOLD} />
                  </div>
                  {/* Service tag — Montserrat label */}
                  <span style={{ ...T.label, fontSize: 8, padding: '3px 6px', lineHeight: 1, borderRadius: 2, background: s.hot ? RED : "rgba(245,168,0,.10)", color: s.hot ? "#fff" : GOLD, border: s.hot ? "none" : `1px solid rgba(245,168,0,.28)`, alignSelf: "flex-start", marginTop: 2 }}>
                    {s.tag}
                  </span>
                </div>
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    {/* Service name — Playfair */}
                    <span style={{ ...T.heading, fontSize: 12, color: isActive ? (s.hot ? RED : GOLD) : "#1C1917", transition: 'color .2s' }}>
                      {s.name}
                    </span>
                    <ArrowUpRight size={12} className="flex-shrink-0 transition-all duration-300"
                      style={{ color: s.hot ? RED : GOLD, opacity: isActive ? 1 : 0, transform: isActive ? "translate(0,0)" : "translate(-3px,3px)" }} />
                  </div>
                  {/* Service description — Jost body-sm */}
                  <p style={{ ...T.bodySm, fontSize: 11, color: "#78716C", lineHeight: 1.55 }} className="hidden sm:block">{s.desc}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   DESTINATIONS MEGA
══════════════════════════════════════════════════════════════ */
function DestinationsMega({ onClose }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = destinationCategories[activeIndex]
  return (
    <div className="flex" style={{ minHeight: 300 }}>
      {/* Region sidebar */}
      <div className="w-44 sm:w-56 shrink-0 py-4 sm:py-5 flex flex-col" style={{ borderRight: "1px solid #f1f5f9" }}>
        <ul className="flex-1">
          {destinationCategories.map((region, i) => {
            const isActive = i === activeIndex
            return (
              <li key={region.name}>
                <button type="button"
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => setActiveIndex(i)}
                  className="w-full flex items-center justify-between px-4 sm:px-6 py-2 sm:py-2.5 text-left transition-colors"
                  style={{ ...T.bodySm, fontSize: 13, fontWeight: 600, color: isActive ? RED : '#475569' }}>
                  {region.name}
                  <ChevronRight size={12} className="shrink-0" style={{ color: isActive ? RED : '#94a3b8' }} />
                </button>
              </li>
            )
          })}
        </ul>
        <div className="px-4 sm:px-6 pt-3 border-t border-slate-100 mt-1">
          <Link to="/destinations" onClick={onClose}
            style={{ ...T.label, fontSize: 10, color: RED, textDecoration: 'underline', textUnderlineOffset: 2 }}>
            View All
          </Link>
        </div>
      </div>

      {/* Country grid */}
      <div className="flex-1 px-4 sm:px-8 py-4 sm:py-5">
        {/* Region label — Montserrat */}
        <p style={{ ...T.label, fontSize: 9, color: '#94a3b8', marginBottom: 16 }}>Countries in {active.name}</p>
        <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-3 sm:gap-y-4">
          {active.countries.map((country) => (
            <Link key={country.name} to="/destinations" onClick={onClose}
              className="flex items-center gap-2.5 sm:gap-3.5 group" style={{ textDecoration: 'none' }}>
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full overflow-hidden shrink-0 ring-2 ring-slate-100 group-hover:ring-[#D91B1B]/40 transition-all duration-200 shadow-sm">
                <img src={country.img} alt={country.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" loading="lazy" />
              </div>
              {/* Country name — Jost */}
              <span style={{ ...T.bodySm, fontSize: 13, fontWeight: 600, color: '#475569', transition: 'color .2s' }}
                className="group-hover:text-[#D91B1B]">{country.name}</span>
            </Link>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-slate-100">
          <Link to="/destinations" onClick={onClose}
            style={{ ...T.label, fontSize: 10, color: RED, textDecoration: 'underline', textUnderlineOffset: 2 }}>
            View all destinations
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   INFO SIDEBAR
══════════════════════════════════════════════════════════════ */
function InfoSidebar({ open, onClose }) {
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" aria-hidden="true" onClick={onClose} />}
      <div
        className="fixed top-0 right-0 bottom-0 z-50 flex flex-col bg-white transition-transform duration-300 ease-in-out overflow-y-auto"
        style={{ width: "min(340px,90vw)", transform: open ? "translateX(0)" : "translateX(100%)", boxShadow: open ? "-4px 0 40px rgba(0,0,0,0.15)" : "none" }}
        aria-label="Info sidebar">
        <div className="flex justify-end p-4">
          <button onClick={onClose} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="px-6 pb-8 flex flex-col gap-8">
          <div>
            <img src={logo} alt="Chalo Holidays" style={{ height: 70, width: "auto", objectFit: "contain" }} />
            {/* Brand tagline — Cormorant italic */}
            <p style={{ fontFamily:'var(--f-display)', fontStyle:'italic', fontSize: 'clamp(1rem,1.4vw,1.08rem)', fontWeight: 500, color: GOLD2, lineHeight: 1.6, marginTop: 8, marginBottom: 4 }}>
              Your trusted premium travel<br />consultants, based in London.
            </p>
            {/* Brand desc — Jost */}
            <p style={{ fontFamily:'var(--f-body)', fontSize: 'var(--t-body-sm)', color: '#64748b', lineHeight: 1.75, fontWeight: 300, marginBottom: 16 }}>
              Planning unforgettable journeys across 200+ destinations worldwide.
            </p>
            <div className="flex items-center gap-3">
              {[
                { href: "https://facebook.com/chaloholiday",    icon: faFacebook,  label: "Facebook"  },
                { href: "https://linkedin.com/chaloholiday",    icon: faLinkedin,  label: "LinkedIn"  },
                { href: `https://wa.me/${BRAND.whatsapp}`,      icon: faWhatsapp,  label: "WhatsApp"  },
              ].map(({ href, icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-105"
                  style={{ background: RED }}>
                  <FontAwesomeIcon icon={icon} style={{ width: 15, height: 15 }} />
                </a>
              ))}
            </div>
          </div>

          <div style={{ height: 1, background: "#f0f0f0" }} />

          <div>
            {/* Section title — Playfair */}
            <h3 style={{ fontFamily:'var(--f-heading)', fontSize: 'var(--t-h3)', fontWeight: 600, color: '#1e293b', marginBottom: 4 }}>Get In Touch</h3>
            <div style={{ width: 36, height: 2.5, background: RED, borderRadius: 2, marginBottom: 16 }} />
            <div className="flex flex-col gap-4">
              {[
                { Icon: Phone,  lines: [{ text: BRAND.phone1, href: `tel:${BRAND.phone1}` }, { text: BRAND.phone2, href: `tel:${BRAND.phone2}` }] },
                { Icon: Mail,   lines: [{ text: BRAND.email1, href: `mailto:${BRAND.email1}` }, { text: BRAND.email2, href: `mailto:${BRAND.email2}` }] },
                { Icon: MapPin, lines: [{ text: BRAND.address }] },
              ].map(({ Icon, lines }) => (
                <div key={lines[0].text} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center"
                    style={{ background: "#FEF2F2", border: "1px solid rgba(217,27,27,.15)" }}>
                    <Icon size={14} color={RED} />
                  </div>
                  <div>
                    {lines.map(l => l.href
                      ? <a key={l.text} href={l.href}
                          style={{ ...T.bodySm, display: 'block', fontSize: 13, fontWeight: 600, color: '#475569', transition: 'color .2s', marginBottom: 2, textDecoration: 'none' }}
                          className="hover:text-[#D91B1B]">{l.text}</a>
                      : <p key={l.text} style={{ ...T.bodySm, fontSize: 13, fontWeight: 600, color: '#475569', lineHeight: 1.55 }}>{l.text}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link to="/contact" onClick={onClose}
            className="flex items-center justify-center gap-2 text-white py-3.5 rounded-xl transition-all active:scale-95"
            style={{ ...T.label, fontSize: 'var(--t-label)', background: `linear-gradient(135deg,${RED},${RED2})`, textDecoration: 'none' }}>
            Enquire Now <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </>
  )
}

/* ═══════════════════════════════════════════════════════════
   MOBILE MENU
══════════════════════════════════════════════════════════════ */
function MobileMenu({ open, onClose }) {
  const [expandedItem, setExpandedItem] = useState(null)

  useEffect(() => { if (!open) setExpandedItem(null) }, [open])

  const toggleExpand = (key) => setExpandedItem(prev => prev === key ? null : key)

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm lg:hidden" aria-hidden="true" onClick={onClose} />}
      <div className="fixed top-0 left-0 bottom-0 z-50 flex flex-col bg-white lg:hidden overflow-y-auto"
        style={{ width: "min(320px, 85vw)", transform: open ? "translateX(0)" : "translateX(-100%)", transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)", boxShadow: open ? "4px 0 40px rgba(0,0,0,0.18)" : "none" }}
        aria-label="Mobile navigation">

        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #f1f5f9", background: "#fff" }}>
          <img src={logo} alt="Chalo Holidays" style={{ height: 52, width: "auto", objectFit: "contain" }} />
          <button onClick={onClose} className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors" aria-label="Close menu">
            <X size={17} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4">
          <ul className="flex flex-col gap-0.5">
            {navLinks.map((item) => {
              if (!item.dropdown) {
                return (
                  <li key={item.label}>
                    <NavLink to={item.to} end={item.to === "/"} onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center px-4 py-3 rounded-xl transition-all duration-150 ${isActive ? "text-[#D91B1B] bg-red-50" : "text-slate-700 hover:text-[#D91B1B] hover:bg-slate-50"}`
                      }
                      style={{ ...T.bodySm, fontSize: 14, fontWeight: 600 }}>
                      {item.label}
                    </NavLink>
                  </li>
                )
              }

              const isExpanded = expandedItem === item.dropdown
              const subLinks = item.dropdown === "services"
                ? servicesData.map(s => ({ label: s.name, to: s.to }))
                : destinationCategories.flatMap(cat => cat.countries.map(c => ({ label: c.name, to: "/destinations" })))

              return (
                <li key={item.label}>
                  <button type="button" onClick={() => toggleExpand(item.dropdown)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-50 transition-all duration-150"
                    style={{ ...T.bodySm, fontSize: 14, fontWeight: 600, color: isExpanded ? RED : undefined }}>
                    {item.label}
                    <ChevronDown size={15} className="transition-transform duration-250 shrink-0"
                      style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", color: isExpanded ? RED : "#94a3b8" }} />
                  </button>
                  <div style={{ maxHeight: isExpanded ? 1200 : 0, overflow: "hidden", transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)" }}>
                    <ul className="pl-4 pr-2 pb-2 flex flex-col gap-0.5">
                      <li>
                        <Link to={item.to} onClick={onClose}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                          style={{ ...T.label, fontSize: 'var(--t-label)', color: GOLD, textDecoration: 'none' }}>
                          <ArrowUpRight size={12} /> All {item.label}
                        </Link>
                      </li>
                      {subLinks.map((sub) => (
                        <li key={sub.label}>
                          <Link to={sub.to} onClick={onClose}
                            className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-slate-600 hover:text-[#D91B1B] hover:bg-red-50 transition-colors"
                            style={{ ...T.bodySm, fontSize: 13.5, textDecoration: 'none' }}>
                            <span className="w-1 h-1 rounded-full bg-slate-300 shrink-0" />
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </>
  )
}

/* ═══════════════════════════════════════════════════════════
   MAIN NAVBAR
══════════════════════════════════════════════════════════════ */
export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setSidebarOpen(false)
    setMobileMenuOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = (sidebarOpen || mobileMenuOpen) ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [sidebarOpen, mobileMenuOpen])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    fn()
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center"
        style={{ paddingTop: 10, paddingLeft: 12, paddingRight: 12 }}>
        <div className="w-full max-w-[1200px] rounded-2xl overflow-visible transition-all duration-500"
          style={{ background: "#ffffff", boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.15)" : "0 2px 16px rgba(0,0,0,0.08)" }}
          onMouseLeave={() => setOpenDropdown(null)}>

          {/* Main bar */}
          <nav className="flex items-center justify-between gap-2 sm:gap-4"
            style={{ height: 60, paddingLeft: "clamp(12px,3vw,32px)", paddingRight: "clamp(12px,3vw,32px)" }}
            aria-label="Main navigation">

            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0" onClick={() => setOpenDropdown(null)}>
              <img src={logo} alt="Chalo Holidays logo"
                style={{ height: "clamp(60px,10vw,90px)", width: "auto", objectFit: "contain", maxWidth: 180 }} />
            </Link>

            {/* Desktop nav links */}
            <ul className="hidden lg:flex items-center gap-0.5 flex-1 justify-center" role="menubar">
              {navLinks.map((item) => {
                if (!item.dropdown) {
                  return (
                    <li key={item.label} role="none">
                      <NavLink to={item.to} end={item.to === "/"} role="menuitem"
                        onMouseEnter={() => setOpenDropdown(null)}
                        className={({ isActive }) =>
                          `px-4 py-2 rounded-lg transition-all duration-200 block ${isActive ? "text-[#D91B1B] bg-red-50" : "text-slate-700 hover:text-[#D91B1B] hover:bg-slate-100"}`
                        }
                        style={{ ...T.bodySm, fontSize: 13, fontWeight: 700 }}>
                        {item.label}
                      </NavLink>
                    </li>
                  )
                }
                const isOpen = openDropdown === item.dropdown
                return (
                  <li key={item.label} role="none">
                    <button type="button" role="menuitem" aria-haspopup="true" aria-expanded={isOpen}
                      onMouseEnter={() => setOpenDropdown(item.dropdown)}
                      className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 ${isOpen ? "text-[#D91B1B] bg-red-50" : "text-slate-700 hover:text-[#D91B1B] hover:bg-slate-100"}`}
                      style={{ ...T.bodySm, fontSize: 13, fontWeight: 700 }}>
                      {item.label}
                      <ChevronDown size={12} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                  </li>
                )
              })}
            </ul>

            {/* Right cluster */}
            <div className="flex items-center gap-2 shrink-0">
              <TimezoneWidget />

              {/* Grid info sidebar toggle */}
              <button type="button" aria-label="Open info sidebar" aria-expanded={sidebarOpen}
                onClick={() => setSidebarOpen(o => !o)}
                className="hidden lg:flex w-9 h-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <circle cx="2.5"  cy="2.5"  r="1.5" />
                  <circle cx="8"    cy="2.5"  r="1.5" />
                  <circle cx="13.5" cy="2.5"  r="1.5" />
                  <circle cx="2.5"  cy="8"    r="1.5" />
                  <circle cx="8"    cy="8"    r="1.5" />
                  <circle cx="13.5" cy="8"    r="1.5" />
                  <circle cx="2.5"  cy="13.5" r="1.5" />
                  <circle cx="8"    cy="13.5" r="1.5" />
                  <circle cx="13.5" cy="13.5" r="1.5" />
                </svg>
              </button>

              {/* Hamburger — mobile */}
              <button type="button"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen(o => !o)}
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </nav>

          {/* Desktop Mega dropdown */}
          {openDropdown && (
            <div className="hidden lg:block rounded-b-2xl overflow-hidden"
              style={{ borderTop: "1px solid rgba(0,0,0,.06)" }}
              role="region" aria-label={`${openDropdown} submenu`}>
              {openDropdown === "services"     && <ServicesMega     onClose={() => setOpenDropdown(null)} />}
              {openDropdown === "destinations" && <DestinationsMega onClose={() => setOpenDropdown(null)} />}
            </div>
          )}
        </div>
      </header>

      <MobileMenu  open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <InfoSidebar open={sidebarOpen}    onClose={() => setSidebarOpen(false)} />
    </>
  )
}