'use client'

import React, { useState, useEffect } from 'react'
import {
  MapPin, Phone, Mail, ChevronUp,
  Globe, Award, Shield, Star, ArrowRight,
  CreditCard, Menu, X,
} from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from "../../assets/icons/Chalo_logo.png"
import Londonimg from '../../assets/images/home/london.avif'
import Dubaiimg from '../../assets/images/home/dubai.webp'
import Delhiimg from '../../assets/images/home/delhi.webp'
import {
  faFacebookF, faTwitter, faInstagram,
  faLinkedinIn, faWhatsapp, faYoutube,
} from '@fortawesome/free-brands-svg-icons'

/* ─────────────────────────────────────────────────────────────
   PALETTE
───────────────────────────────────────────────────────────── */
const GOLD  = '#B8860B'
const GOLD2 = '#D4A017'
const RED   = '#B91C1C'
const DARK  = '#0F172A'
const SLATE = '#475569'
const STONE = '#78716C'
const CREAM  = '#FAFAF5'
const CREAM2 = '#F5F0E8'

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
  border:  `rgba(184,134,11,0.22)`,
  borderS: `rgba(15,23,42,0.08)`,
}

/* ─────────────────────────────────────────────────────────────
   DATA — all links now have href
───────────────────────────────────────────────────────────── */
const NAV_COLS = [
  {
    heading: 'Offerings',
    links: [
      { label: 'Hotel Booking',       href: '/services/hotel-booking'       },
      { label: 'Holiday Packages',    href: '/services/holiday-packages'    },
      { label: 'Group Bookings',      href: '/services/group-bookings'      },
      { label: 'Train Travel',        href: '/services/train-travel'        },
      { label: 'Transfers & Cabs',    href: '/services/transfers-cabs'      },
      { label: 'Sightseeing Tours',   href: '/services/sightseeing-tours'   },
      { label: 'Event & Conference',  href: '/services/event-conference'    },
      { label: 'Corporate Bookings',  href: '/services/corporate-bookings'  },
      { label: 'VIP Packages',        href: '/services/vip-packages'        },
    ],
  },
  {
    heading: 'Destinations',
    links: [
      { label: 'London, UK',            href: '/destinations/london'      },
      { label: 'Interlaken, Switzerland',href: '/destinations/interlaken' },
      { label: 'Barcelona, Spain',      href: '/destinations/barcelona'   },
      { label: 'Oslo, Norway',          href: '/destinations/oslo'        },
      { label: 'Paris, France',         href: '/destinations/paris'       },
      { label: 'Rome, Italy',           href: '/destinations/rome'        },
      { label: 'Berlin, Germany',       href: '/destinations/berlin'      },
      { label: 'Warsaw, Poland',        href: '/destinations/warsaw'      },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us',     href: '/about'       },
      { label: 'Services',     href: '/services'    },
      { label: 'Destinations', href: '/destinations'},
      { label: 'Testimonials', href: '/testimonials'},
      { label: 'Contact Us',   href: '/contact'     },
    ],
  },
]

const SOCIALS = [
  { icon: faFacebookF,  label: 'Facebook',  href: 'https://facebook.com'  },
  { icon: faTwitter,    label: 'Twitter',   href: 'https://twitter.com'   },
  { icon: faInstagram,  label: 'Instagram', href: 'https://instagram.com' },
  { icon: faLinkedinIn, label: 'LinkedIn',  href: 'https://linkedin.com'  },
  { icon: faYoutube,    label: 'YouTube',   href: 'https://youtube.com'   },
  { icon: faWhatsapp,   label: 'WhatsApp',  href: 'https://wa.me/442030049978' },
]

const LEGAL = [
  { label: 'Privacy Policy',    href: '/privacy-policy'    },
  { label: 'Terms of Service',  href: '/terms-of-service'  },
  { label: 'Cookie Policy',     href: '/cookie-policy'     },
  { label: 'Refund Policy',     href: '/refund-policy'     },
]

/* ─────────────────────────────────────────────────────────────
   RESPONSIVE HOOK
───────────────────────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────────────────────── */

function ColHeading({ label, onClick, isOpen, collapsible }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onClick={collapsible ? onClick : undefined}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: collapsible && !isOpen ? 0 : 18,
        cursor: collapsible ? 'pointer' : 'default',
        userSelect: 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ display:'block', width:22, height:2, background: C.red }} />
        <span style={{ display:'block', width:10, height:2, background: C.gold, marginRight: 12 }} />
        <span style={{
          fontSize: 11, letterSpacing: '0.26em', textTransform: 'uppercase',
          color: C.text, fontWeight: 600,
        }}>{label}</span>
      </div>
      {collapsible && (
        <ChevronUp size={14} style={{
          color: C.gold,
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
      <a
        href={href}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          fontSize: 13.5, color: hov ? C.red : C.text2,
          textDecoration: 'none', display: 'flex', alignItems: 'center',
          gap: 7, transition: 'color .18s', fontWeight: 400, lineHeight: 1,
        }}
      >
        <ArrowRight size={9} style={{
          color: C.gold, flexShrink: 0,
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
        background: `rgba(184,134,11,0.08)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginTop: 1,
      }}>
        <Icon size={12} style={{ color: C.gold }} />
      </div>
      <span style={{ fontSize: 12.5, color: C.text2, fontWeight: 400, lineHeight: 1.55 }}>{text}</span>
    </div>
  )
  return href
    ? <a href={href} style={{ textDecoration: 'none' }}>{inner}</a>
    : inner
}

function SocialBtn({ icon, label, href }) {
  const [hov, setHov] = useState(false)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 34, height: 34, borderRadius: 4,
        border: `1px solid ${hov ? C.gold : C.border}`,
        background: hov ? C.gold : `rgba(184,134,11,0.08)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all .18s', textDecoration: 'none',
      }}
    >
      <FontAwesomeIcon
        icon={icon}
        style={{ fontSize: 12, color: hov ? '#FFFFFF' : C.gold, transition: 'color .18s' }}
      />
    </a>
  )
}

function LegalLink({ label, href }) {
  const [hov, setHov] = useState(false)
  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontSize: 11, color: hov ? C.red : C.text3,
        textDecoration: 'none', transition: 'color .18s',
      }}
    >{label}</a>
  )
}

/* Collapsible nav column (mobile/tablet) */
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
          display:'flex', flexDirection:'column', gap: 11,
        }}>
          {col.links.map(l => <NavLink key={l.label} label={l.label} href={l.href} />)}
        </ul>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   MAIN FOOTER
───────────────────────────────────────────────────────────── */
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

  /* Responsive inner padding */
  const innerPad = isMobile ? 20 : isTablet ? 32 : 48

  const inner = {
    maxWidth: 1400,
    margin: '0 auto',
    paddingLeft: innerPad,
    paddingRight: innerPad,
  }

  return (
    <>
      {/* ── Inject responsive styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Cormorant+Garamond:wght@600;700&display=swap');
        * { box-sizing: border-box; }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr 1.4fr;
          gap: 40px;
          align-items: start;
        }
        @media (max-width: 1023px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 32px 40px;
          }
          .footer-brand-col { grid-column: 1 / -1; }
          .footer-contact-col { grid-column: 1 / -1; }
        }
        @media (max-width: 639px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 0;
          }
          .footer-brand-col { grid-column: 1; padding-bottom: 24px; }
          .footer-contact-col { grid-column: 1; }
        }

        .footer-bottom-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
        }
        @media (max-width: 639px) {
          .footer-bottom-bar { flex-direction: column; align-items: flex-start; gap: 8px; }
        }

        .footer-legal-links {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0;
        }

        .footer-social-row {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }

        .footer-contact-grid {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 26px;
        }
      `}</style>

      <footer style={{
        background: C.bg,
        fontFamily: "'Outfit','Segoe UI',sans-serif",
        color: C.text,
        position: 'relative',
      }}>

        {/* Top accent bar */}
        <div style={{
          height: 3,
          background: `linear-gradient(90deg,${C.red},${C.gold},${C.red},${C.gold2},${C.red})`,
        }} />

        {/* ════════════════════════════════════════════════════════
            NAV SECTION
        ════════════════════════════════════════════════════════ */}
        <div style={{ borderBottom:`1px solid ${C.borderS}` }}>
          <div style={{
            ...inner,
            paddingTop: isMobile ? 32 : 52,
            paddingBottom: isMobile ? 28 : 48,
          }}>
            <div className="footer-grid">

              {/* ── Col 1: Brand ── */}
              <div className="footer-brand-col">
                <div style={{
                  width: 140, height: 80, overflow: 'hidden',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 8,
                }}>
                  <img
                    src={logo}
                    alt="Chalo Holidays Logo"
                    style={{ height: '140%', width: 'auto', transform: 'scale(1.2)', objectFit: 'contain' }}
                  />
                </div>
                <div style={{
                  width: 36, height: 1.5,
                  background: `linear-gradient(90deg,${C.gold},transparent)`,
                  marginBottom: 14,
                }} />
                <p style={{
                  fontSize: 13, lineHeight: 1.85, color: C.text2,
                  fontWeight: 400, margin: 0,
                  maxWidth: isMobile ? '100%' : 320,
                }}>
                  Crafting bespoke journeys for discerning travellers since 2016. Backed by 1,400+ curated itineraries and a presence across 3 continents, we deliver personalised, purpose-driven travel that sparks wonder and creates lasting memories.
                </p>
              </div>

              {/* ── Nav columns: desktop = separate cols, mobile/tablet = collapsible ── */}
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

              {/* ── Contact ── */}
              <div className="footer-contact-col">
                <div style={{
                  display: 'flex', alignItems: 'center', marginBottom: 22,
                  marginTop: !isDesktop ? 20 : 0,
                }}>
                  <span style={{ display:'block', width:22, height:2, background: C.red }} />
                  <span style={{ display:'block', width:10, height:2, background: C.gold, marginRight: 12 }} />
                  <span style={{
                    fontSize: 11, letterSpacing: '0.26em', textTransform: 'uppercase',
                    color: C.text, fontWeight: 600,
                  }}>Get in Touch</span>
                </div>

                <div className="footer-contact-grid">
                  <ContactRow
                    Icon={MapPin}
                    text="40, South Park Crescent, London, IG11XU, UK"
                    href="https://maps.google.com/?q=40+South+Park+Crescent+London+IG1+1XU"
                  />
                  <ContactRow
                    Icon={Phone}
                    text="+44 20 3004 9978"
                    href="tel:+442030049978"
                  />
                  <ContactRow
                    Icon={Mail}
                    text="Operations@chaloholidays.com"
                    href="mailto:Operations@chaloholidays.com"
                  />
                </div>

                {/* Social */}
                <div style={{
                  fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
                  color: C.gold, fontWeight: 600, marginBottom: 12,
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <span style={{
                    display: 'block', width: 18, height: 1.5,
                    background: `linear-gradient(90deg,${C.red},${C.gold})`,
                  }} />
                  Follow Us
                </div>
                <div className="footer-social-row">
                  {SOCIALS.map(s => (
                    <SocialBtn key={s.label} icon={s.icon} label={s.label} href={s.href} />
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════
            BOTTOM BAR
        ════════════════════════════════════════════════════════ */}
        <div style={{ background: CREAM2 }}>
          <div style={{
            ...inner,
            paddingTop: 17, paddingBottom: 17,
          }}>
            <div className="footer-bottom-bar">
             <p style={{ fontSize: 11, color: C.text3, margin: 0 }}>
    © {new Date().getFullYear()} All Rights Reserved. Design & Developed By{' '}
    
    <a
      href="https://www.chaloholiday.com"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: C.gold,
        fontWeight: 700,
        textDecoration: 'none',
        transition: '0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.target.style.textDecoration = 'underline'
      }}
      onMouseLeave={(e) => {
        e.target.style.textDecoration = 'none'
      }}
    >
      ChaloHoliday.com
    </a>

  </p>
              <div className="footer-legal-links">
                {LEGAL.map((l, i) => (
                  <React.Fragment key={l.label}>
                    {i > 0 && (
                      <span style={{ color:`${C.gold}88`, fontSize: 12, padding: '0 8px' }}>·</span>
                    )}
                    <LegalLink label={l.label} href={l.href} />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to top */}
        {showTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            style={{
              position: 'fixed', bottom: isMobile ? 20 : 32, right: isMobile ? 20 : 32,
              zIndex: 50, width: 44, height: 44, borderRadius: 4,
              background: `linear-gradient(135deg,${C.gold},${GOLD})`,
              boxShadow: `0 8px 24px -6px rgba(184,134,11,0.45)`,
              color: '#FFFFFF', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'transform .2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.10)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <ChevronUp size={19} />
          </button>
        )}

      </footer>
    </>
  )
}