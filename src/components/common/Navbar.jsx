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
import flagUK    from "../../assets/icons/flag.png"
import flagIndia  from "../../assets/icons/flag (1).png"
import flagDubai  from "../../assets/icons/flag (2).png"

import logo from "../../assets/icons/Chalo_logo.png"
import InquiryModal from "../common/inquiryModal"

/* ─── Palette ───────────────────────────────────────────────────────── */
const RED   = "#B91C1C"
const GOLD  = "#B8860B"
const GOLD2 = "#D4A017"
const DARK  = "#0F172A"

/* ─── Brand ─────────────────────────────────────────────────────────── */
const BRAND = {
  phone1   : "+44 (0) 2030 049978",
  phone2   : "+91 98765 43210",
  email1   : "info@chaloholiday.com",
  email2   : "support@chaloholiday.com",
  address  : "41 South Park Crescent, Ilford, London IG1 1XU",
  whatsapp : "447575104181",
}

/* ─── WhatsApp Icon ─────────────────────────────────────────────────── */
const WaIcon = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.112 1.523 5.84L0 24l6.33-1.496A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.651-.49-5.181-1.347l-.371-.215-3.757.887.942-3.648-.236-.385A9.957 9.957 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
  </svg>
)

/* ─── Nav data ──────────────────────────────────────────────────────── */
const navLinks = [
  { label: "Home",         to: "/" },
  { label: "About Us",     to: "/about" },
  { label: "Services",     dropdown: "services",      to: "/services" },
  { label: "Destinations", dropdown: "destinations",  to: "/destinations" },
  { label: "Testimonials", to: "/testimonials" },
  { label: "Contact",      to: "/contact" },
]

const servicesData = [
  { icon: Hotel,        name: "Hotel Booking",      to: "/services", tag: "Best Rates", desc: "Luxury & budget stays with comfort, convenience, and instant confirmation.", hot: true  },
  { icon: Package,      name: "Holiday Packages",   to: "/services", tag: "Popular",   desc: "All-inclusive travel packages crafted for unforgettable experiences.",        hot: true  },
  { icon: Users,        name: "Group Bookings",     to: "/services", tag: "10+ Pax",   desc: "Tour packages suitable for adults, kids, and elderly travellers.",            hot: false },
  { icon: Train,        name: "Train Travel",       to: "/services", tag: "Exclusive", desc: "Rail tour holiday packages across scenic routes for a memorable journey.",    hot: false },
  { icon: Car,          name: "Transfers & Cabs",   to: "/services", tag: "24/7",      desc: "Best deals on airport transfers, private cabs, and city travel.",             hot: false },
  { icon: Binoculars,   name: "Sightseeing Tours",  to: "/services", tag: "Guided",    desc: "Guided tours with seamless planning and top attraction access.",              hot: false },
  { icon: CalendarDays, name: "Event & Conference", to: "/services", tag: "MICE",      desc: "End-to-end event planning so you can focus on your vision.",                  hot: false },
  { icon: Briefcase,    name: "Corporate Bookings", to: "/services", tag: "B2B",       desc: "Efficient corporate travel solutions with exclusive deals.",                   hot: false },
  { icon: Crown,        name: "VIP Packages",       to: "/services", tag: "Luxury",    desc: "Boutique hotels, premium resorts, and exclusive VIP experiences.",            hot: true  },
]

const COUNTRY_COVERS = {
  "United Kingdom" : "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=120&q=75",
  "France"         : "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=120&q=75",
  "Spain"          : "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=120&q=75",
  "Portugal"       : "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=120&q=75",
  "Netherlands"    : "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=120&q=75",
  "Italy"          : "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=120&q=75",
  "Switzerland"    : "https://images.unsplash.com/photo-1620563092215-0fbc6b55cfc5?w=120&q=75",
  "Germany"        : "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=120&q=75",
  "Austria"        : "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=120&q=75",
  "Czech Republic" : "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=120&q=75",
  "Hungary"        : "https://images.unsplash.com/photo-1551867633-194f125bddfa?w=120&q=75",
  "Norway"         : "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=120&q=75",
  "Sweden"         : "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=120&q=75",
  "Denmark"        : "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=120&q=75",
  "Finland"        : "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?w=120&q=75",
  "Poland"         : "https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=120&q=75",
  "Romania"        : "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=120&q=75",
  "Slovenia"       : "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=120&q=75",
  "Croatia"        : "https://images.unsplash.com/photo-1575540291670-8d3b26f7d327?w=120&q=75",
  "Greece"         : "https://images.unsplash.com/photo-1555993539-1732b0258235?w=120&q=75",
}

const destinationCategories = [
  { name: "Western Europe",  countries: ["United Kingdom","France","Spain","Portugal","Netherlands"].map(n=>({name:n,img:COUNTRY_COVERS[n]})) },
  { name: "Central Europe",  countries: ["Italy","Switzerland","Germany","Austria","Czech Republic","Hungary"].map(n=>({name:n,img:COUNTRY_COVERS[n]})) },
  { name: "Northern Europe", countries: ["Norway","Sweden","Denmark","Finland"].map(n=>({name:n,img:COUNTRY_COVERS[n]})) },
  { name: "Eastern Europe",  countries: ["Poland","Romania","Slovenia","Croatia","Greece"].map(n=>({name:n,img:COUNTRY_COVERS[n]})) },
]

/* ─── Timezone Widget ───────────────────────────────────────────────── */
const TIMEZONES = [
  { city: "London", tz: "Europe/London", flag: flagUK    },
  { city: "Delhi",  tz: "Asia/Kolkata",  flag: flagIndia },
  { city: "Dubai",  tz: "Asia/Dubai",    flag: flagDubai },
]

function TimezoneWidget() {
  const [times, setTimes]       = useState({})
  const [open, setOpen]         = useState(false)
  const [selected, setSelected] = useState(0)
  const ref                     = useRef(null)

  const fmt = (tz) => {
    const s = new Date().toLocaleTimeString("en-GB", {
      timeZone: tz, hour: "2-digit", minute: "2-digit",
      second: "2-digit", hour12: true,
    })
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

  const active       = TIMEZONES[selected]
  const { time, ap } = times[active.city] || { time: "--:--:--", ap: "" }

  return (
    <div ref={ref} className="relative hidden sm:block">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 transition-all duration-200"
        style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
      >
        <img src={active.flag} alt={active.city}
          style={{ width: 22, height: 15, objectFit: "cover", borderRadius: 3, flexShrink: 0 }} />
        <span className="text-[13px] font-semibold text-slate-800 tabular-nums">
          {time}
          <span className="text-[10px] text-slate-400 ml-1 font-medium">{ap}</span>
        </span>
        <ChevronDown size={12}
          className={`text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 z-50 overflow-hidden"
          style={{ background: "#fff", border: "1px solid #e8e5e1", borderRadius: 14,
                   boxShadow: "0 16px 48px rgba(0,0,0,0.13)", minWidth: 258 }}>
          <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: "#9B1C1C" }}>
            <Globe size={12} className="text-white opacity-70" />
            <span className="text-[9px] font-bold tracking-[0.22em] uppercase text-white opacity-80">World Clock</span>
          </div>
          {TIMEZONES.map((z, i) => {
            const { time: t, ap: a } = times[z.city] || { time: "--:--:--", ap: "" }
            const isSel = i === selected
            return (
              <button key={z.city} type="button"
                onClick={() => { setSelected(i); setOpen(false) }}
                className="w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors duration-150"
                style={{ background: isSel ? "#FEF9F0" : "#fff",
                         borderBottom: i < TIMEZONES.length - 1 ? "1px solid #f5f3f0" : "none" }}>
                <div className="flex items-center gap-3">
                  <img src={z.flag} alt={z.city}
                    style={{ width: 28, height: 19, objectFit: "cover", borderRadius: 4, flexShrink: 0 }} />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[12px] font-semibold text-slate-800 leading-none">{z.city}</span>
                      {isSel && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#B8860B", display: "inline-block" }} />}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[17px] font-semibold text-slate-800 tabular-nums leading-none">{t}</p>
                  <p className="text-[10px] text-slate-400 mt-1 leading-none">{a}</p>
                </div>
              </button>
            )
          })}
          <div style={{ height: 3, background: "#B8860B" }} />
        </div>
      )}
    </div>
  )
}

/* ─── Services Mega ─────────────────────────────────────────────────── */
function ServicesMega({ onClose }) {
  const [hovered, setHovered] = useState(null)
  return (
    <div className="flex overflow-hidden" style={{ background: "#FAFAF8", fontFamily: "Georgia,'Times New Roman',serif" }}>
      <div className="flex-1 px-4 sm:px-8 pt-6 sm:pt-8 pb-5 sm:pb-7">
        <div className="flex items-center gap-3 mb-5 sm:mb-6">
          <div className="h-px w-6" style={{ background: GOLD }} />
          <span className="text-[9px] font-bold tracking-[.22em] uppercase" style={{ color: GOLD, fontFamily: "sans-serif" }}>Our Services</span>
          <div className="h-px flex-1" style={{ background: "#E8E5E1" }} />
          <Link to="/services" onClick={onClose} className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[.16em] transition-opacity hover:opacity-60" style={{ color: GOLD, fontFamily: "sans-serif" }}>
            All Services <ArrowUpRight size={10} />
          </Link>
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 sm:gap-2.5">
          {servicesData.map((s) => {
            const Icon = s.icon
            const isActive = hovered === s.name
            return (
              <Link
                key={s.name} to={s.to} onClick={onClose}
                onMouseEnter={() => setHovered(s.name)}
                onMouseLeave={() => setHovered(null)}
                className="relative flex flex-col gap-2 sm:gap-3 p-3 sm:p-4 overflow-hidden transition-all duration-300"
                style={{
                  borderRadius: 5,
                  background  : isActive ? (s.hot ? "#FEF2F2" : "#FDFBF4") : "#FFFFFF",
                  border      : `1px solid ${isActive ? (s.hot ? "rgba(185,28,28,.30)" : "rgba(184,134,11,.35)") : "#E8E5E1"}`,
                  transform   : isActive ? "translateY(-3px)" : "none",
                  boxShadow   : isActive ? (s.hot ? "0 12px 32px rgba(185,28,28,.12)" : "0 12px 32px rgba(184,134,11,.10)") : "0 1px 4px rgba(15,23,42,.05)",
                }}
              >
                <div className="absolute top-0 left-0 h-[2px] transition-all duration-500"
                  style={{ width: isActive ? "100%" : "0%", background: s.hot ? `linear-gradient(90deg,${RED},${GOLD})` : `linear-gradient(90deg,${GOLD},${GOLD2})` }} />
                <div className="flex items-start justify-between">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded flex items-center justify-center transition-all duration-300"
                    style={{ background: s.hot ? (isActive ? "#FEE2E2" : "#FEF2F2") : (isActive ? "rgba(184,134,11,.14)" : "rgba(184,134,11,.08)"), border: `1px solid ${s.hot ? "rgba(185,28,28,.20)" : "rgba(184,134,11,.22)"}` }}>
                    <Icon size={14} color={s.hot ? RED : GOLD} />
                  </div>
                  <span className="text-[8px] font-bold tracking-widest px-1.5 py-0.5 leading-none"
                    style={{ fontFamily: "sans-serif", borderRadius: 2, background: s.hot ? RED : "rgba(184,134,11,.10)", color: s.hot ? "#fff" : GOLD, border: s.hot ? "none" : `1px solid rgba(184,134,11,.28)`, alignSelf: "flex-start", marginTop: 2 }}>
                    {s.tag}
                  </span>
                </div>
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[12px] font-semibold leading-tight transition-colors duration-200"
                      style={{ fontFamily: "Georgia,'Times New Roman',serif", color: isActive ? (s.hot ? RED : GOLD) : "#1C1917" }}>
                      {s.name}
                    </span>
                    <ArrowUpRight size={12} className="flex-shrink-0 transition-all duration-300"
                      style={{ color: s.hot ? RED : GOLD, opacity: isActive ? 1 : 0, transform: isActive ? "translate(0,0)" : "translate(-3px,3px)" }} />
                  </div>
                  <p className="text-[11px] leading-snug hidden sm:block" style={{ color: "#78716C", fontFamily: "sans-serif", fontWeight: 300 }}>{s.desc}</p>
                </div>
              </Link>
            )
          })}
        </div>
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-5 flex items-center gap-4 sm:gap-8 flex-wrap" style={{ borderTop: "1px solid #E8E5E1" }}>
          {[{ val: "200+", label: "Destinations" },{ val: "5,000+", label: "Happy Travellers" },{ val: "50+", label: "Expert Planners" },{ val: "98%", label: "Would Rebook" }].map(({ val, label }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="font-bold text-[14px] leading-none" style={{ fontFamily: "Georgia,serif", color: GOLD }}>{val}</span>
              <span className="text-[10px] uppercase tracking-[.14em]" style={{ color: "#94A3B8", fontFamily: "sans-serif" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Destinations Mega ─────────────────────────────────────────────── */
function DestinationsMega({ onClose }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = destinationCategories[activeIndex]
  return (
    <div className="flex" style={{ minHeight: 300 }}>
      <div className="w-44 sm:w-56 shrink-0 py-4 sm:py-5 flex flex-col" style={{ borderRight: "1px solid #f1f5f9" }}>
        <ul className="flex-1">
          {destinationCategories.map((region, i) => {
            const isActive = i === activeIndex
            return (
              <li key={region.name}>
                <button type="button" onMouseEnter={() => setActiveIndex(i)} onClick={() => setActiveIndex(i)}
                  className={`w-full flex items-center justify-between px-4 sm:px-6 py-2 sm:py-2.5 text-[12px] sm:text-[13.5px] font-semibold transition-colors text-left ${isActive ? "text-[#B91C1C]" : "text-slate-700 hover:text-[#B91C1C]"}`}>
                  {region.name}
                  <ChevronRight size={12} className={`shrink-0 transition-colors ${isActive ? "text-[#B91C1C]" : "text-slate-400"}`} />
                </button>
              </li>
            )
          })}
        </ul>
        <div className="px-4 sm:px-6 pt-3 border-t border-slate-100 mt-1">
          <Link to="/destinations" onClick={onClose} className="text-[12px] font-semibold transition-colors underline underline-offset-2" style={{ color: RED }}>View All</Link>
        </div>
      </div>
      <div className="flex-1 px-4 sm:px-8 py-4 sm:py-5">
        <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-slate-400 mb-4">Countries in {active.name}</p>
        <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-3 sm:gap-y-4">
          {active.countries.map((country) => (
            <Link key={country.name} to="/destinations" onClick={onClose} className="flex items-center gap-2.5 sm:gap-3.5 group">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full overflow-hidden shrink-0 ring-2 ring-slate-100 group-hover:ring-[#B91C1C]/40 transition-all duration-200 shadow-sm">
                <img src={country.img} alt={country.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" loading="lazy" />
              </div>
              <span className="text-[13px] font-semibold text-slate-700 group-hover:text-[#B91C1C] transition-colors">{country.name}</span>
            </Link>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-slate-100">
          <Link to="/destinations" onClick={onClose} className="text-[12.5px] font-semibold underline underline-offset-2 transition-colors" style={{ color: RED }}>View all</Link>
        </div>
      </div>
    </div>
  )
}

/* ─── Info Sidebar ───────────────────────────────────────────────────── */
function InfoSidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" aria-hidden="true" onClick={onClose} />
      )}
      <div
        className="fixed top-0 right-0 bottom-0 z-50 flex flex-col bg-white transition-transform duration-300 ease-in-out overflow-y-auto"
        style={{ width: "min(340px,90vw)", transform: open ? "translateX(0)" : "translateX(100%)", boxShadow: open ? "-4px 0 40px rgba(0,0,0,0.15)" : "none" }}
        aria-label="Info sidebar"
      >
        <div className="flex justify-end p-4">
          <button onClick={onClose} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="px-6 pb-8 flex flex-col gap-8">
          <div>
            <img src={logo} alt="Chalo Holidays" style={{ height: 70, width: "auto", objectFit: "contain" }} />
            <p className="text-[13px] text-slate-500 leading-relaxed mt-3">
              Your trusted premium travel consultants based in London — planning unforgettable journeys across 200+ destinations worldwide.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {[
                { href: "https://facebook.com/chaloholiday", icon: faFacebook, label: "Facebook" },
                { href: "https://linkedin.com/chaloholiday", icon: faLinkedin, label: "LinkedIn" },
                { href: `https://wa.me/${BRAND.whatsapp}`,   icon: faWhatsapp, label: "WhatsApp" },
              ].map(({ href, icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-105"
                  style={{ background: "#B91C1C" }}>
                  <FontAwesomeIcon icon={icon} style={{ width: 15, height: 15 }} />
                </a>
              ))}
            </div>
          </div>
          <div style={{ height: 1, background: "#f0f0f0" }} />
          <div>
            <h3 className="text-[15px] font-bold text-slate-800 mb-1">Get In Touch</h3>
            <div style={{ width: 36, height: 2.5, background: "#B91C1C", borderRadius: 2, marginBottom: 16 }} />
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center" style={{ background: "#FEF2F2", border: "1px solid rgba(185,28,28,.15)" }}>
                  <Phone size={14} color={RED} />
                </div>
                <div>
                  <a href={`tel:${BRAND.phone1}`} className="block text-[13px] font-semibold text-slate-700 hover:text-[#B91C1C] transition-colors">{BRAND.phone1}</a>
                  <a href={`tel:${BRAND.phone2}`} className="block text-[13px] font-semibold text-slate-700 hover:text-[#B91C1C] transition-colors mt-0.5">{BRAND.phone2}</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center" style={{ background: "#FEF2F2", border: "1px solid rgba(185,28,28,.15)" }}>
                  <Mail size={14} color={RED} />
                </div>
                <div>
                  <a href={`mailto:${BRAND.email1}`} className="block text-[13px] font-semibold text-slate-700 hover:text-[#B91C1C] transition-colors">{BRAND.email1}</a>
                  <a href={`mailto:${BRAND.email2}`} className="block text-[13px] font-semibold text-slate-700 hover:text-[#B91C1C] transition-colors mt-0.5">{BRAND.email2}</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center" style={{ background: "#FEF2F2", border: "1px solid rgba(185,28,28,.15)" }}>
                  <MapPin size={14} color={RED} />
                </div>
                <p className="text-[13px] font-semibold text-slate-700 leading-snug">{BRAND.address}</p>
              </div>
            </div>
          </div>
          <Link to="/contact" onClick={onClose}
            className="flex items-center justify-center gap-2 text-white text-[13px] font-bold py-3.5 rounded-xl transition-all active:scale-95"
            style={{ background: `linear-gradient(135deg, ${RED} 0%, #991B1B 100%)` }}>
            Enquire Now <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </>
  )
}

/* ─── Mobile Menu ───────────────────────────────────────────────────── */
function MobileMenu({ open, onClose }) {
  const [expandedItem, setExpandedItem] = useState(null)

  useEffect(() => {
    if (!open) setExpandedItem(null)
  }, [open])

  const toggleExpand = (key) => {
    setExpandedItem(prev => prev === key ? null : key)
  }

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm lg:hidden" aria-hidden="true" onClick={onClose} />
      )}
      <div
        className="fixed top-0 left-0 bottom-0 z-50 flex flex-col bg-white lg:hidden overflow-y-auto"
        style={{
          width: "min(320px, 85vw)",
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: open ? "4px 0 40px rgba(0,0,0,0.18)" : "none",
        }}
        aria-label="Mobile navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #f1f5f9", background: "#fff" }}>
          <img src={logo} alt="Chalo Holidays" style={{ height: 52, width: "auto", objectFit: "contain" }} />
          <button onClick={onClose}
            className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"
            aria-label="Close menu">
            <X size={17} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4">
          <ul className="flex flex-col gap-0.5">
            {navLinks.map((item) => {
              if (!item.dropdown) {
                return (
                  <li key={item.label}>
                    <NavLink to={item.to} end={item.to === "/"} onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center px-4 py-3 rounded-xl text-[14px] font-semibold transition-all duration-150 ${
                          isActive ? "text-[#B91C1C] bg-red-50" : "text-slate-700 hover:text-[#B91C1C] hover:bg-slate-50"
                        }`
                      }>
                      {item.label}
                    </NavLink>
                  </li>
                )
              }

              const isExpanded = expandedItem === item.dropdown
              const subLinks =
                item.dropdown === "services"
                  ? servicesData.map(s => ({ label: s.name, to: s.to }))
                  : destinationCategories.flatMap(cat =>
                      cat.countries.map(c => ({ label: c.name, to: "/destinations" }))
                    )

              return (
                <li key={item.label}>
                  <button type="button" onClick={() => toggleExpand(item.dropdown)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[14px] font-semibold text-slate-700 hover:text-[#B91C1C] hover:bg-slate-50 transition-all duration-150"
                    style={{ color: isExpanded ? RED : undefined }}>
                    {item.label}
                    <ChevronDown size={15} className="transition-transform duration-250 shrink-0"
                      style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", color: isExpanded ? RED : "#94a3b8" }} />
                  </button>
                  <div style={{ maxHeight: isExpanded ? 1200 : 0, overflow: "hidden", transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)" }}>
                    <ul className="pl-4 pr-2 pb-2 flex flex-col gap-0.5">
                      <li>
                        <Link to={item.to} onClick={onClose}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-bold uppercase tracking-wider transition-colors"
                          style={{ color: GOLD }}>
                          <ArrowUpRight size={12} /> All {item.label}
                        </Link>
                      </li>
                      {subLinks.map((sub) => (
                        <li key={sub.label}>
                          <Link to={sub.to} onClick={onClose}
                            className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-[13.5px] text-slate-600 hover:text-[#B91C1C] hover:bg-red-50 transition-colors">
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

/* ─── Main Navbar ───────────────────────────────────────────────────── */
export default function Navbar() {
  const [openDropdown, setOpenDropdown]     = useState(null)
  const [sidebarOpen, setSidebarOpen]       = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled]             = useState(false)
  const [openModal, setOpenModal]           = useState(false)
  const { pathname }                        = useLocation()

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
      {/* ── Fixed header shell ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex justify-center"
        style={{ paddingTop: 10, paddingLeft: 12, paddingRight: 12 }}
      >
        <div
          className="w-full max-w-[1200px] rounded-2xl overflow-visible transition-all duration-500"
          style={{
            background: "#ffffff",
            boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.15)" : "0 2px 16px rgba(0,0,0,0.08)",
          }}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          {/* ── Main bar ── */}
          <nav
            className="flex items-center justify-between gap-2 sm:gap-4"
            style={{ height: 60, paddingLeft: "clamp(12px,3vw,32px)", paddingRight: "clamp(12px,3vw,32px)" }}
            aria-label="Main navigation"
          >
            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0" onClick={() => setOpenDropdown(null)}>
              <img
                src={logo}
                alt="Chalo Holidays logo"
                style={{ height: "clamp(60px,10vw,90px)", width: "auto", objectFit: "contain", maxWidth: 180 }}
              />
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
                          `px-4 py-2 text-[13px] font-medium rounded-lg transition-all duration-200 block ${isActive ? "text-[#B91C1C] bg-red-50" : "text-slate-700 hover:text-[#B91C1C] hover:bg-slate-100"}`
                        }>
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
                      className={`flex items-center gap-1 px-4 py-2 text-[13px] font-medium rounded-lg transition-all duration-200 ${isOpen ? "text-[#B91C1C] bg-red-50" : "text-slate-700 hover:text-[#B91C1C] hover:bg-slate-100"}`}>
                      {item.label}
                      <ChevronDown size={12} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                  </li>
                )
              })}
            </ul>

            {/* Right cluster */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Timezone widget */}
              <TimezoneWidget />

              {/* Grid info sidebar toggle — desktop only */}
              <button type="button" aria-label="Open info sidebar" aria-expanded={sidebarOpen}
                onClick={() => setSidebarOpen(o => !o)}
                className="hidden lg:flex w-9 h-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <circle cx="2.5"  cy="2.5"  r="1.5"/>
                  <circle cx="8"    cy="2.5"  r="1.5"/>
                  <circle cx="13.5" cy="2.5"  r="1.5"/>
                  <circle cx="2.5"  cy="8"    r="1.5"/>
                  <circle cx="8"    cy="8"    r="1.5"/>
                  <circle cx="13.5" cy="8"    r="1.5"/>
                  <circle cx="2.5"  cy="13.5" r="1.5"/>
                  <circle cx="8"    cy="13.5" r="1.5"/>
                  <circle cx="13.5" cy="13.5" r="1.5"/>
                </svg>
              </button>

              {/* Hamburger — mobile only */}
              <button type="button"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen(o => !o)}
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </nav>

          {/* ── Desktop Mega dropdown ── */}
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

      {/* ── Mobile Menu Drawer ── */}
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* ── Info Sidebar ── */}
      <InfoSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* ── Inquiry Modal ── */}
      <InquiryModal isOpen={openModal} onClose={() => setOpenModal(false)} />
    </>
  )
}