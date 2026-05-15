'use client'

import React, { useState, useEffect } from 'react'
import {
  MapPin, Phone, Mail, ChevronUp,
  Globe, Award, Shield, Star, ArrowRight,
  CreditCard, Menu, X,
} from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from "../../assets/icons/Chalo_logo.png"
import {
  faFacebookF, faTwitter, faInstagram,
  faLinkedinIn, faWhatsapp, faYoutube,
} from '@fortawesome/free-brands-svg-icons'

/* ═══════════════════════════════════════════════════════════
   LUXURY TYPOGRAPHY SYSTEM
   (identical to HomePage, AboutPage, TestimonialsPage)
   ─────────────────────────────────────────────────────────
   DISPLAY  : Cormorant Garamond — ultra-refined serif
   HEADING  : Playfair Display   — classic editorial serif
   BODY     : Jost               — geometric, airy, modern
   LABEL    : Montserrat         — crisp uppercase micro-labels
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

      --t-display : clamp(2.2rem, 4vw, 3.2rem);
      --t-h1      : clamp(2.4rem, 5.5vw, 4.2rem);
      --t-h2      : clamp(1.55rem, 2.8vw, 2.2rem);
      --t-h3      : clamp(1.05rem, 1.8vw, 1.25rem);
      --t-body-lg : 1.0625rem;
      --t-body    : 0.9375rem;
      --t-body-sm : 0.8125rem;
      --t-label   : 0.625rem;

      --ls-display : -0.025em;
      --ls-heading : -0.02em;
      --ls-label   : 0.22em;
      --ls-sublabel: 0.14em;

      --lh-body    : 1.85;
      --lh-body-tight: 1.55;
    }
  `
  document.head.appendChild(s)
}

/* ═══════════════════════════════════════════════════════════
   PALETTE
══════════════════════════════════════════════════════════════ */
const RED    = '#D91B1B'
const RED2   = '#B01515'
const GOLD   = '#F5A800'
const GOLD2  = '#C8880A'
const DARK   = '#2D2D2D'
const SLATE  = '#4A4A4A'
const STONE  = '#8A8A8A'
const CREAM  = '#FAFAF5'
const CREAM2 = '#F5F0E6'

/* ── Shared type style objects ── */
const T = {
  display : { fontFamily:'var(--f-display)', letterSpacing:'var(--ls-display)', fontWeight:700 },
  heading : { fontFamily:'var(--f-heading)', letterSpacing:'var(--ls-heading)', fontWeight:600 },
  body    : { fontFamily:'var(--f-body)',    lineHeight:'var(--lh-body)',       fontWeight:300 },
  bodySm  : { fontFamily:'var(--f-body)',    lineHeight:'var(--lh-body-tight)', fontWeight:400 },
  label   : { fontFamily:'var(--f-label)',   letterSpacing:'var(--ls-label)',   textTransform:'uppercase', fontWeight:700 },
  sublabel: { fontFamily:'var(--f-label)',   letterSpacing:'var(--ls-sublabel)',textTransform:'uppercase', fontWeight:600 },
}

const C = {
  bg:      CREAM,
  bg2:     CREAM2,
  bgCard:  '#FFFFFF',
  gold:    GOLD,
  gold2:   GOLD2,
  red:     RED,
  text:    DARK,
  text2:   SLATE,
  text3:   STONE,
  border:  `rgba(245,168,0,0.22)`,
  borderS: `rgba(45,45,45,0.08)`,
}

/* ═══════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════ */
const NAV_COLS = [
  {
    heading: 'Offerings',
    links: [
      { label: 'Hotel',                    href: '/services/hotel-booking'      },
      { label: 'Group Bookings',           href: '/services/group-bookings'     },
      { label: 'Train Travel',             href: '/services/train-travel'       },
      { label: 'Transfers & Sightseeing',  href: '/services/transfers-cabs'     },
      { label: 'Event & Conference',       href: '/services/event-conference'   },
      { label: 'Corporate Bookings',       href: '/services/corporate-bookings' },
      { label: 'VIP Packages',             href: '/services/vip-packages'       },
    ],
  },
  {
    heading: 'Destinations',
    links: [
      { label: 'London, UK',             href: '/destinations/london'      },
      { label: 'Interlaken, Switzerland',href: '/destinations/interlaken'  },
      { label: 'Barcelona, Spain',       href: '/destinations/barcelona'   },
      { label: 'Oslo, Norway',           href: '/destinations/oslo'        },
      { label: 'Paris, France',          href: '/destinations/paris'       },
      { label: 'Rome, Italy',            href: '/destinations/rome'        },
      { label: 'Berlin, Germany',        href: '/destinations/berlin'      },
      { label: 'Warsaw, Poland',         href: '/destinations/warsaw'      },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us',     href: '/about'        },
      { label: 'Services',     href: '/services'     },
      { label: 'Destinations', href: '/destinations' },
      { label: 'Testimonials', href: '/testimonials' },
      { label: 'Contact Us',   href: '/contact'      },
    ],
  },
]

const SOCIALS = [
  { icon: faFacebookF,  label: 'Facebook',  href: 'https://facebook.com'       },
  { icon: faTwitter,    label: 'Twitter',   href: 'https://twitter.com'        },
  { icon: faInstagram,  label: 'Instagram', href: 'https://instagram.com'      },
  { icon: faLinkedinIn, label: 'LinkedIn',  href: 'https://linkedin.com'       },
  { icon: faYoutube,    label: 'YouTube',   href: 'https://youtube.com'        },
  { icon: faWhatsapp,   label: 'WhatsApp',  href: 'https://wa.me/442030049978' },
]

const LEGAL = [
  { label: 'Privacy Policy',   href: '/privacy-policy'   },
  { label: 'Terms of Service', href: '/terms-of-service' },
  { label: 'Cookie Policy',    href: '/cookie-policy'    },
  { label: 'Refund Policy',    href: '/refund-policy'    },
]

/* ═══════════════════════════════════════════════════════════
   RESPONSIVE HOOK
══════════════════════════════════════════════════════════════ */
function useBreakpoint() {
  const [bp, setBp] = useState(() => {
    if (typeof window === 'undefined') return 'desktop'
    const w = window.innerWidth
    if (w < 640)  return 'mobile'
    if (w < 1024) return 'tablet'
    return 'desktop'
  })
  useEffect(() => {
    const fn = () => {
      const w = window.innerWidth
      if (w < 640)  setBp('mobile')
      else if (w < 1024) setBp('tablet')
      else setBp('desktop')
    }
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return bp
}

/* ═══════════════════════════════════════════════════════════
   SUB-COMPONENTS
══════════════════════════════════════════════════════════════ */

function ColHeading({ label, onClick, isOpen, collapsible }) {
  return (
    <div
      onClick={collapsible ? onClick : undefined}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: collapsible && !isOpen ? 0 : 18,
        cursor: collapsible ? 'pointer' : 'default',
        userSelect: 'none',
      }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* Red-amber rule — matches all section labels */}
        <span style={{ display:'block', width:20, height:1.5, background: RED }} />
        <span style={{ display:'block', width:8, height:1.5, background: GOLD, marginRight: 10 }} />
        {/* Column heading — Montserrat label */}
        <span style={{ ...T.label, fontSize: 'var(--t-label)', color: DARK }}>{label}</span>
      </div>
      {collapsible && (
        <ChevronUp size={13} style={{
          color: GOLD,
          transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)',
          transition: 'transform .25s',
        }} />
      )}
    </div>
  )
}

function NavLink({ label, href }) {
  const [hov, setHov] = useState(false)
  return (
    <li>
      <a href={href}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          /* Nav link — Jost body-sm */
          ...T.bodySm,
          fontSize: 'var(--t-body-sm)',
          color: hov ? RED : SLATE,
          textDecoration: 'none',
          display: 'flex', alignItems: 'center',
          gap: 7, transition: 'color .18s',
        }}>
        <ArrowRight size={9} style={{
          color: GOLD, flexShrink: 0,
          opacity: hov ? 1 : 0,
          transform: hov ? 'translateX(0)' : 'translateX(-5px)',
          transition: 'opacity .18s, transform .18s',
        }} />
        {label}
      </a>
    </li>
  )
}

function ContactRow({ Icon, text, href }) {
  const inner = (
    <div style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
      <div style={{
        width: 30, height: 30, flexShrink: 0, borderRadius: 4,
        border: `1px solid ${C.border}`,
        background: `rgba(245,168,0,0.08)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginTop: 1,
      }}>
        <Icon size={12} style={{ color: GOLD }} />
      </div>
      {/* Contact text — Jost body-sm */}
      <span style={{ ...T.bodySm, fontSize: 'var(--t-body-sm)', color: SLATE, lineHeight: 1.6 }}>{text}</span>
    </div>
  )
  return href
    ? <a href={href} style={{ textDecoration: 'none' }}>{inner}</a>
    : inner
}

function SocialBtn({ icon, label, href }) {
  const [hov, setHov] = useState(false)
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 34, height: 34, borderRadius: 4,
        border: `1px solid ${hov ? GOLD : C.border}`,
        background: hov ? GOLD : `rgba(245,168,0,0.08)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all .18s', textDecoration: 'none',
      }}>
      <FontAwesomeIcon icon={icon} style={{ fontSize: 12, color: hov ? '#fff' : GOLD, transition: 'color .18s' }} />
    </a>
  )
}

function LegalLink({ label, href }) {
  const [hov, setHov] = useState(false)
  return (
    <a href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        /* Legal link — Montserrat label */
        ...T.label,
        fontSize: 9,
        color: hov ? RED : STONE,
        textDecoration: 'none', transition: 'color .18s',
      }}>{label}</a>
  )
}

function NavColumn({ col, collapsible }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{
      borderBottom: collapsible ? `1px solid ${C.borderS}` : 'none',
      paddingBottom: collapsible ? 14 : 0,
      paddingTop: collapsible ? 14 : 0,
    }}>
      <ColHeading
        label={col.heading}
        onClick={() => setOpen(o => !o)}
        isOpen={collapsible ? open : true}
        collapsible={collapsible}
      />
      <div style={{
        overflow: 'hidden',
        maxHeight: (!collapsible || open) ? '600px' : '0px',
        transition: 'max-height .3s ease',
      }}>
        <ul style={{
          listStyle:'none', padding:0, margin: collapsible ? '4px 0 0' : 0,
          display:'flex', flexDirection:'column', gap: 12,
        }}>
          {col.links.map(l => <NavLink key={l.label} label={l.label} href={l.href} />)}
        </ul>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   MAIN FOOTER
══════════════════════════════════════════════════════════════ */
export default function FooterSection() {
  const [showTop, setShowTop] = useState(false)
  const bp = useBreakpoint()

  const isMobile  = bp === 'mobile'
  const isTablet  = bp === 'tablet'
  const isDesktop = bp === 'desktop'

  useEffect(() => {
    const fn = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const innerPad = isMobile ? 20 : isTablet ? 32 : 48
  const inner = { maxWidth: 1400, margin: '0 auto', paddingLeft: innerPad, paddingRight: innerPad }

  return (
    <>
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr 1.4fr;
          gap: 40px;
          align-items: start;
        }
        @media (max-width: 1023px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px 40px; }
          .footer-brand-col { grid-column: 1 / -1; }
          .footer-contact-col { grid-column: 1 / -1; }
        }
        @media (max-width: 639px) {
          .footer-grid { grid-template-columns: 1fr; gap: 0; }
          .footer-brand-col { grid-column: 1; padding-bottom: 24px; }
          .footer-contact-col { grid-column: 1; }
        }
        .footer-bottom-bar {
          display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap; gap: 10px;
        }
        @media (max-width: 639px) {
          .footer-bottom-bar { flex-direction: column; align-items: flex-start; gap: 8px; }
        }
        .footer-legal-links { display: flex; align-items: center; flex-wrap: wrap; gap: 0; }
        .footer-social-row  { display: flex; flex-wrap: wrap; gap: 7px; }
        .footer-contact-grid { display: flex; flex-direction: column; gap: 14px; margin-bottom: 26px; }
      `}</style>

      <footer style={{ background: C.bg, fontFamily:'var(--f-body)', color: C.text, position: 'relative' }}>

        {/* Top accent bar — red→amber→amber2, matches section headers */}
        <div style={{ height: 3, background: `linear-gradient(90deg,${RED},${GOLD},${RED},${GOLD2},${RED})` }} />

        {/* ── NAV SECTION ── */}
        <div style={{ borderBottom:`1px solid ${C.borderS}` }}>
          <div style={{ ...inner, paddingTop: isMobile ? 32 : 52, paddingBottom: isMobile ? 28 : 48 }}>
            <div className="footer-grid">

              {/* ── Brand column ── */}
              <div className="footer-brand-col">
                <div style={{ width: 140, height: 80, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                  <img src={logo} alt="Chalo Holidays Logo"
                    style={{ height: '140%', width: 'auto', transform: 'scale(1.2)', objectFit: 'contain' }} />
                </div>
                <div style={{ width: 36, height: 1.5, background: `linear-gradient(90deg,${GOLD},transparent)`, marginBottom: 16 }} />

                {/* Brand tagline — Cormorant Garamond italic */}
                <p style={{
                  fontFamily: 'var(--f-display)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(1rem, 1.4vw, 1.1rem)',
                  fontWeight: 500,
                  color: GOLD2,
                  lineHeight: 1.5,
                  marginBottom: 12,
                }}>
                  Crafting bespoke journeys<br />since 2016.
                </p>

                {/* Brand description — Jost body */}
                <p style={{
                  ...T.body,
                  fontSize: 'var(--t-body-sm)',
                  color: SLATE,
                  margin: 0,
                  maxWidth: isMobile ? '100%' : 320,
                  fontWeight: '500',
                }}>
                  Backed by 1,400+ curated itineraries and a presence across 3 continents, we deliver personalised, purpose-driven travel that sparks wonder and creates lasting memories.
                </p>
              </div>

              {/* ── Nav columns ── */}
              {isDesktop
                ? NAV_COLS.map(col => (
                    <div key={col.heading}>
                      <NavColumn col={col} collapsible={false} />
                    </div>
                  ))
                : (
                  <div style={{
                    gridColumn: isMobile ? '1' : '1 / -1',
                    display: 'grid',
                    gridTemplateColumns: isTablet ? '1fr 1fr 1fr' : '1fr',
                    gap: isTablet ? '0 40px' : 0,
                    borderTop: `1px solid ${C.borderS}`,
                    marginTop: isMobile ? 8 : 0,
                  }}>
                    {NAV_COLS.map(col => (
                      <NavColumn key={col.heading} col={col} collapsible={isMobile} />
                    ))}
                  </div>
                )
              }

              {/* ── Contact column ── */}
              <div className="footer-contact-col">
                {/* Contact heading — Montserrat label */}
                <div style={{ display:'flex', alignItems:'center', marginBottom: 22, marginTop: !isDesktop ? 20 : 0 }}>
                  <span style={{ display:'block', width:20, height:1.5, background: RED }} />
                  <span style={{ display:'block', width:8, height:1.5, background: GOLD, marginRight: 10 }} />
                  <span style={{ ...T.label, fontSize: 'var(--t-label)', color: DARK }}>Get in Touch</span>
                </div>

                <div className="footer-contact-grid">
                  <ContactRow Icon={MapPin} text="40, South Park Crescent, London, IG11XU, UK"
                    href="https://maps.google.com/?q=40+South+Park+Crescent+London+IG1+1XU" />
                  <ContactRow Icon={Phone} text="+44 20 3004 9978" href="tel:+442030049978" />
                  <ContactRow Icon={Mail} text="Operations@chaloholidays.com" href="mailto:Operations@chaloholidays.com" />
                </div>

                {/* Social label */}
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
                  <span style={{ display:'block', width:18, height:1.5, background:`linear-gradient(90deg,${RED},${GOLD})` }} />
                  <span style={{ ...T.label, fontSize: 9, color: GOLD }}>Follow Us</span>
                </div>
                <div className="footer-social-row">
                  {SOCIALS.map(s => <SocialBtn key={s.label} icon={s.icon} label={s.label} href={s.href} />)}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div style={{ background: CREAM2 }}>
          <div style={{ ...inner, paddingTop: 17, paddingBottom: 17 }}>
            <div className="footer-bottom-bar">
              {/* Copyright — Jost body-sm */}
              <p style={{ ...T.bodySm, fontSize: 'var(--t-body-sm)', color: STONE, margin: 0 }}>
                © {new Date().getFullYear()} All Rights Reserved. Design & Developed By{' '}
                <a href="https://www.chaloholiday.com" target="_blank" rel="noopener noreferrer"
                  style={{ ...T.label, fontSize: 9, color: GOLD, textDecoration:'none' }}
                  onMouseEnter={e => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={e => e.target.style.textDecoration = 'none'}>
                  ChaloHoliday.com
                </a>
              </p>

              {/* Legal links — Montserrat label */}
              <div className="footer-legal-links">
                {LEGAL.map((l, i) => (
                  <React.Fragment key={l.label}>
                    {i > 0 && <span style={{ color:`${GOLD}88`, fontSize:12, padding:'0 8px' }}>·</span>}
                    <LegalLink label={l.label} href={l.href} />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to top */}
        {showTop && (
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            style={{
              position: 'fixed', bottom: isMobile ? 20 : 32, right: isMobile ? 20 : 32,
              zIndex: 50, width: 44, height: 44, borderRadius: 4,
              background: `linear-gradient(135deg,${GOLD},${GOLD2})`,
              boxShadow: `0 8px 24px -6px rgba(245,168,0,0.45)`,
              color: '#fff', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'transform .2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.10)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
            <ChevronUp size={19} />
          </button>
        )}

      </footer>
    </>
  )
}