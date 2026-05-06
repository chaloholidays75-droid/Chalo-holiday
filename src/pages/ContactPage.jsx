'use client'
import React, { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import {
  ArrowRight, MapPin, Phone, Mail, Clock, Globe,
  Send, CheckCircle2, Star, ChevronRight,
  HeartHandshake, ShieldCheck, Zap, Users, Video, X, ExternalLink,
} from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebook, faInstagram, faYoutube, faLinkedin, faWhatsapp,
} from '@fortawesome/free-brands-svg-icons'

import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import ChaloLogo from '../assets/icons/Chalo_logo.png'
import ContactImg from '../assets/images/Contact-us.jpg'
import LondonFlag from '../assets/icons/london-flag.png'
import DubaiFlag from '../assets/icons/dubai-flag.png'
import IndiaFlag from '../assets/icons/india-flag.png'
import ParisFlag from '../assets/icons/france.png'
import QatarFlag from '../assets/icons/qatar.png'
import LocationPinIcon from '../assets/icons/location-pin.png'

/* ─── EmailJS Keys ─── */
const EMAILJS_SERVICE_ID = 'service_xf18u79'
const EMAILJS_TEMPLATE_ID = 'template_isha8tw'
const EMAILJS_PUBLIC_KEY = 'iUD0q1pg7sojX9HKP'

/* ─── Design Tokens — HomePage Brand Palette ─── */
const RED    = '#D91B1B'   // logo vivid red — primary CTA, accents
const RED2   = '#B01515'   // darker red for gradients / shadows
const AMBER  = '#F5A800'   // logo sun amber — warm highlights, gold role
const AMBER2 = '#C8880A'   // deeper amber — subheadings, rules
const CHAR   = '#2D2D2D'   // logo charcoal — headings, body text
const GRAY   = '#8A8A8A'   // logo airplane gray — muted text, borders
const CREAM  = '#FAFAF5'
const CREAM2 = '#F5F0E6'
const WHITE  = '#FFFFFF'

/* legacy aliases */
const GOLD  = AMBER
const GOLD2 = AMBER2
const DARK  = CHAR
const DARK2 = CHAR
const SLATE = '#4A4A4A'
const STONE = GRAY

/* Map section tokens */
const BG     = CREAM2
const BORDER = '#E8DFD0'
const TEXT1  = CHAR
const TEXT2  = GRAY
const GOLD_L = '#F5E6C8'

/* ─── Hooks ─── */
function useInView(threshold = 0.10) {
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
function Rule({ color = AMBER, w = 28 }) {
  return <div style={{ width: w, height: 1.5, background: color, flexShrink: 0, borderRadius: 2 }} />
}
function SectionLabel({ color = AMBER, center = false, children }) {
  return (
    <div className={`flex items-center gap-3 mb-5 ${center ? 'justify-center' : ''}`}>
      <Rule color={color} w={28} />
      <span style={{ color, fontFamily: 'sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '.24em', textTransform: 'uppercase' }}>
        {children}
      </span>
      {center && <Rule color={color} w={28} />}
    </div>
  )
}
function StarRow({ count = 5, accent = AMBER, size = 12 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={size} style={{ fill: accent, color: accent }} />
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════
   TOAST
══════════════════════════════════════════════ */
function Toast({ show, type, message, onClose }) {
  useEffect(() => {
    if (show) { const t = setTimeout(onClose, 5500); return () => clearTimeout(t) }
  }, [show, onClose])
  if (!show) return null
  const isSuccess = type === 'success'
  return (
    <div style={{
      position: 'fixed', top: 24, right: 24, zIndex: 99999,
      minWidth: 320, maxWidth: 440, background: CREAM,
      borderRadius: 6, boxShadow: '0 24px 64px -12px rgba(0,0,0,0.22)',
      border: `1px solid ${isSuccess ? AMBER : RED}33`,
      borderLeft: `4px solid ${isSuccess ? AMBER : RED}`,
      padding: '18px 20px', display: 'flex', alignItems: 'flex-start', gap: 14,
      animation: 'slideInToast 0.38s cubic-bezier(0.4,0,0.2,1)',
    }}>
      <div style={{ width: 38, height: 38, borderRadius: '50%', flexShrink: 0, background: isSuccess ? `${AMBER}18` : `${RED}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${isSuccess ? AMBER : RED}33` }}>
        {isSuccess ? <CheckCircle2 size={18} style={{ color: AMBER }} /> : <X size={16} style={{ color: RED }} />}
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontFamily: 'sans-serif', fontSize: 13, fontWeight: 700, color: CHAR, marginBottom: 4 }}>
          {isSuccess ? '✈️ Enquiry Sent Successfully!' : '⚠️ Something went wrong'}
        </p>
        <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: STONE, lineHeight: 1.65 }}>{message}</p>
      </div>
      <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: STONE, padding: '2px 4px', flexShrink: 0, fontSize: 18, lineHeight: 1 }}>×</button>
      <style>{`@keyframes slideInToast{from{opacity:0;transform:translateX(70px)}to{opacity:1;transform:translateX(0)}}`}</style>
    </div>
  )
}

/* ══════════════════════════════════════════════
   WEBSITE PREVIEW MODAL
══════════════════════════════════════════════ */
function WebsitePreviewModal({ url, onClose }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  if (!url) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 999999,
        background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
        animation: 'fadeInModal 0.25s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 1100,
          height: 'min(80vh, 720px)',
          background: WHITE,
          borderRadius: 8,
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
          border: `1px solid ${AMBER}44`,
        }}
      >
        {/* Modal toolbar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '10px 16px',
          background: CREAM,
          borderBottom: `1px solid ${BORDER}`,
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FEBC2E' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28C840' }} />
          </div>
          <div style={{
            flex: 1, background: WHITE, border: `1px solid ${BORDER}`,
            borderRadius: 6, padding: '5px 12px', display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <Globe size={12} style={{ color: STONE, flexShrink: 0 }} />
            <span style={{ fontFamily: 'sans-serif', fontSize: 12, color: SLATE, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{url}</span>
          </div>
          <a href={url} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 5, textDecoration: 'none', padding: '5px 12px', borderRadius: 5, background: `${AMBER}15`, border: `1px solid ${AMBER}44`, color: AMBER, fontFamily: 'sans-serif', fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap' }}>
            <ExternalLink size={11} /> Open tab
          </a>
          <button onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: STONE, padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={18} />
          </button>
        </div>

        {/* iFrame */}
        <div style={{ flex: 1, position: 'relative', background: CREAM }}>
          {loading && !error && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, background: CREAM }}>
              <div style={{ width: 36, height: 36, border: `3px solid ${AMBER}33`, borderTopColor: AMBER, borderRadius: '50%', animation: 'spin .8s linear infinite' }} />
              <p style={{ fontFamily: 'sans-serif', fontSize: 13, color: STONE }}>Loading website…</p>
            </div>
          )}
          {error && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, background: CREAM, padding: 32, textAlign: 'center' }}>
              <Globe size={40} style={{ color: `${AMBER}66` }} />
              <p style={{ fontFamily: "Georgia,serif", fontSize: '1.1rem', color: CHAR }}>Website Preview Unavailable</p>
              <p style={{ fontFamily: 'sans-serif', fontSize: 13, color: STONE, maxWidth: '36ch', lineHeight: 1.7 }}>
                This website restricts embedding. Click "Open tab" above to visit it directly.
              </p>
              <a href={url} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 22px', background: `linear-gradient(135deg,${RED},${RED2})`, color: WHITE, textDecoration: 'none', borderRadius: 4, fontFamily: 'sans-serif', fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' }}>
                <ExternalLink size={12} /> Open in New Tab
              </a>
            </div>
          )}
          <iframe
            src={url}
            title="Website Preview"
            style={{ width: '100%', height: '100%', border: 'none', display: error ? 'none' : 'block' }}
            onLoad={() => setLoading(false)}
            onError={() => { setLoading(false); setError(true) }}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      </div>
      <style>{`
        @keyframes fadeInModal{from{opacity:0}to{opacity:1}}
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>
    </div>
  )
}

/* ══════════════════════════════════════════════
   1 ▸ HERO
══════════════════════════════════════════════ */
function ContactHero() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setTimeout(() => setLoaded(true), 60) }, [])
  return (
    <section className="relative w-full overflow-hidden"
      style={{ minHeight: 'clamp(480px,65vh,720px)', background: '#07070e', fontFamily: "Georgia,'Times New Roman',serif" }}>
      <div className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${ContactImg})`, transform: loaded ? 'scale(1.02)' : 'scale(1.09)', transition: 'transform 1.6s cubic-bezier(.4,0,.2,1)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg,rgba(4,4,10,.97) 0%,rgba(4,4,10,.80) 42%,rgba(4,4,10,.28) 70%,rgba(4,4,10,.05) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg,rgba(4,4,10,.98) 0%,rgba(4,4,10,.36) 18%,transparent 46%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(4,4,10,.55) 0%,transparent 24%)' }} />
      {/* Brand accent line — amber from logo */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{ background: `linear-gradient(180deg,transparent,${AMBER} 35%,${AMBER2} 65%,transparent)` }} />
      <div className="relative z-10 max-w-[1440px] mx-auto flex flex-col justify-center"
        style={{ minHeight: 'clamp(480px,65vh,720px)', padding: 'clamp(5rem,10vh,7rem) clamp(1.5rem,5vw,4rem) clamp(4rem,7vh,5rem)' }}>
        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(22px)', transition: 'opacity .9s ease .08s, transform .9s ease .08s' }}>
          <div className="flex items-center gap-3 mb-7" style={{ fontFamily: 'sans-serif' }}>
            <Rule color={AMBER} w={28} />
            <span style={{ color: AMBER, fontSize: 10, fontWeight: 700, letterSpacing: '.24em', textTransform: 'uppercase' }}>Get in Touch</span>
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5"
              style={{ color: AMBER2, border: `1px solid ${AMBER}45`, background: 'rgba(245,168,0,0.12)', fontSize: 9, fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', fontFamily: 'sans-serif', borderRadius: 2 }}>
              IATA Accredited
            </span>
          </div>
          <h1 className="text-white leading-[.92] mb-6"
            style={{ fontSize: 'clamp(3rem,8.5vw,6.8rem)', fontWeight: 400, letterSpacing: '-0.025em' }}>
            Let's plan your<br /><em style={{ fontStyle: 'italic', color: AMBER }}>perfect journey.</em>
          </h1>
          <p style={{ color: 'rgba(255,255,255,.50)', fontSize: 'clamp(.88rem,1.4vw,1.05rem)', lineHeight: 1.85, maxWidth: '50ch', fontFamily: 'sans-serif', fontWeight: 300, marginBottom: '2.5rem' }}>
            Whether you're dreaming of a honeymoon in the Maldives, a family adventure in Europe, or a corporate retreat — our London-based experts are ready to craft your perfect itinerary.
          </p>
          <div className="flex flex-wrap gap-3" style={{ fontFamily: 'sans-serif' }}>
            <a href="#contact-form"
              className="inline-flex items-center gap-3 font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:brightness-110 hover:scale-[1.02]"
              style={{ background: `linear-gradient(135deg,${RED},${RED2})`, color: WHITE, padding: '13px 28px', borderRadius: 2, boxShadow: `0 8px 28px ${RED}50`, textDecoration: 'none' }}>
              Send an Enquiry <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   FORM FIELDS
══════════════════════════════════════════════ */
function InputField({ label, type = 'text', placeholder, value, onChange, required, icon: Icon }) {
  const [focus, setFocus] = useState(false)
  return (
    <div>
      <label style={{ display: 'block', fontFamily: 'sans-serif', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.18em', color: STONE, marginBottom: 8 }}>
        {label}{required && <span style={{ color: RED, marginLeft: 3 }}>*</span>}
      </label>
      <div className="relative">
        {Icon && <Icon size={14} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: focus ? AMBER : '#CBD5E1', transition: 'color 250ms', pointerEvents: 'none' }} />}
        <input type={type} placeholder={placeholder} value={value} onChange={onChange}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} required={required}
          style={{ width: '100%', padding: Icon ? '12px 16px 12px 40px' : '12px 16px', fontFamily: 'sans-serif', fontSize: 14, color: CHAR, background: CREAM, border: `1px solid ${focus ? AMBER : '#E2DED8'}`, borderRadius: 3, outline: 'none', transition: 'border-color 250ms, box-shadow 250ms', boxShadow: focus ? `0 0 0 3px ${AMBER}18` : 'none' }} />
      </div>
    </div>
  )
}

function TextareaField({ label, value, onChange, placeholder, rows = 4 }) {
  const [focus, setFocus] = useState(false)
  return (
    <div>
      <label style={{ display: 'block', fontFamily: 'sans-serif', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.18em', color: STONE, marginBottom: 8 }}>{label}</label>
      <textarea value={value} onChange={onChange} rows={rows} placeholder={placeholder}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{ width: '100%', padding: '12px 16px', fontFamily: 'sans-serif', fontSize: 14, color: CHAR, background: CREAM, border: `1px solid ${focus ? AMBER : '#E2DED8'}`, borderRadius: 3, outline: 'none', resize: 'vertical', transition: 'border-color 250ms, box-shadow 250ms', boxShadow: focus ? `0 0 0 3px ${AMBER}18` : 'none' }} />
    </div>
  )
}

/* ── Website URL Field with Preview ── */
function WebsiteField({ value, onChange, onPreview }) {
  const [focus, setFocus] = useState(false)

  const normaliseUrl = (raw) => {
    const trimmed = raw.trim()
    if (!trimmed) return ''
    if (/^https?:\/\//i.test(trimmed)) return trimmed
    return `https://${trimmed}`
  }

  const handlePreview = () => {
    const url = normaliseUrl(value)
    if (url) onPreview(url)
  }

  return (
    <div>
      <label style={{ display: 'block', fontFamily: 'sans-serif', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.18em', color: STONE, marginBottom: 8 }}>
        Website URL <span style={{ color: STONE, fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
      </label>
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Globe size={14} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: focus ? AMBER : '#CBD5E1', transition: 'color 250ms', pointerEvents: 'none' }} />
          <input
            type="url"
            placeholder="https://yourwebsite.com"
            value={value}
            onChange={onChange}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            style={{ width: '100%', padding: '12px 16px 12px 40px', fontFamily: 'sans-serif', fontSize: 14, color: CHAR, background: CREAM, border: `1px solid ${focus ? AMBER : '#E2DED8'}`, borderRadius: 3, outline: 'none', transition: 'border-color 250ms, box-shadow 250ms', boxShadow: focus ? `0 0 0 3px ${AMBER}18` : 'none' }}
          />
        </div>
        {value && (
          <button
            type="button"
            onClick={handlePreview}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '0 16px',
              background: `${AMBER}15`, border: `1px solid ${AMBER}55`, borderRadius: 3,
              color: AMBER, fontFamily: 'sans-serif', fontSize: 11, fontWeight: 700,
              letterSpacing: '.1em', textTransform: 'uppercase', cursor: 'pointer',
              whiteSpace: 'nowrap', transition: 'all 0.2s',
            }}
          >
            <ExternalLink size={12} /> Preview
          </button>
        )}
      </div>
      <p style={{ fontFamily: 'sans-serif', fontSize: 10.5, color: STONE, marginTop: 5, lineHeight: 1.6 }}>
        Share your website — click <strong>Preview</strong> to open it in a frame within this page, or it will open in a new tab.
      </p>
    </div>
  )
}

/* ══════════════════════════════════════════════
   2 ▸ CONTACT FORM
══════════════════════════════════════════════ */
function ContactForm() {
  const [ref, inView] = useInView(0.05)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({ show: false, type: 'success', message: '' })
  const [previewUrl, setPreviewUrl] = useState(null)
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', website: '', subject: '', message: '', consent: false })

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))
  const showToast = (type, message) => setToast({ show: true, type, message })
  const hideToast = () => setToast(t => ({ ...t, show: false }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.consent) { showToast('error', 'Please accept the consent checkbox to continue.'); return }
    setLoading(true)
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        name: form.fullName, email: form.email, phone: form.phone,
        website: form.website || 'N/A',
        title: form.subject, message: form.message, reply_to: form.email,
        time: new Date().toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short' }),
      }, EMAILJS_PUBLIC_KEY)
      setSubmitted(true)
      showToast('success', `Thank you ${form.fullName}! Your enquiry has been received. We'll be in touch within 2 hours.`)
      setForm({ fullName: '', email: '', phone: '', website: '', subject: '', message: '', consent: false })
    } catch (err) {
      console.error('EmailJS error:', err)
      showToast('error', 'Failed to send. Please call us directly on +44 (0) 2030 049978.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact-form" ref={ref} className="w-full py-20 sm:py-28 overflow-hidden" style={{ background: WHITE }}>
      <Toast show={toast.show} type={toast.type} message={toast.message} onClose={hideToast} />
      {previewUrl && <WebsitePreviewModal url={previewUrl} onClose={() => setPreviewUrl(null)} />}

      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 xl:gap-24">
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(-32px)', transition: 'opacity .8s ease, transform .8s ease' }}>
            <SectionLabel color={AMBER}>Plan Your Journey</SectionLabel>
            <h2 style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(2rem,4.5vw,3.2rem)', fontWeight: 400, color: CHAR, letterSpacing: '-0.02em', lineHeight: 1.06, marginBottom: '1rem' }}>
              Tell us about your<br /><em style={{ color: AMBER }}>dream trip.</em>
            </h2>
            <p style={{ fontFamily: 'sans-serif', fontSize: 14, color: STONE, lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: '46ch' }}>
              Fill in the details below and a dedicated travel consultant at our London office will craft a bespoke itinerary just for you — at no obligation whatsoever.
            </p>
            {submitted ? (
              <div className="flex flex-col items-center text-center py-16 px-8"
                style={{ border: `1px solid ${AMBER}44`, borderRadius: 4, background: CREAM }}>
                <div className="w-16 h-16 flex items-center justify-center rounded-full mb-5"
                  style={{ background: `${AMBER}18`, border: `2px solid ${AMBER}50` }}>
                  <CheckCircle2 size={30} style={{ color: AMBER }} />
                </div>
                <h3 style={{ fontFamily: "Georgia,serif", fontSize: '1.6rem', fontWeight: 400, color: CHAR, marginBottom: 12 }}>Enquiry Received!</h3>
                <p style={{ fontFamily: 'sans-serif', fontSize: 14, color: STONE, lineHeight: 1.8, maxWidth: '36ch' }}>
                  Thank you for reaching out. A member of our London team will be in touch within 2 hours.
                </p>
                <div className="flex items-center gap-2 mt-6">
                  <StarRow count={5} accent={AMBER} size={13} />
                  <span style={{ fontFamily: 'sans-serif', fontSize: 12, color: STONE }}>You're in good hands.</span>
                </div>
                <button onClick={() => setSubmitted(false)}
                  style={{ marginTop: 20, fontFamily: 'sans-serif', fontSize: 12, color: RED, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                  Submit another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <InputField label="Full Name" placeholder="Your full name" value={form.fullName} onChange={set('fullName')} required icon={Users} />
                    <InputField label="Phone / WhatsApp" type="tel" placeholder="+44 7700 900000" value={form.phone} onChange={set('phone')} required icon={Phone} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <InputField label="Email Address" type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} required icon={Mail} />
                    <InputField label="Subject" placeholder="e.g. Honeymoon Package" value={form.subject} onChange={set('subject')} required />
                  </div>

                  <div className="mb-4">
                    <WebsiteField
                      value={form.website}
                      onChange={set('website')}
                      onPreview={(url) => setPreviewUrl(url)}
                    />
                  </div>

                  <div style={{ height: 1, background: '#F0EDE8', margin: '1.5rem 0' }} />
                  <TextareaField label="Message" value={form.message} onChange={set('message')} rows={5}
                    placeholder="Share any special occasions, preferences, dietary needs, or anything that will help us craft the perfect itinerary…" />
                </div>
                <div className="flex items-start gap-3 mb-7 mt-4">
                  <input type="checkbox" id="consent" checked={form.consent} onChange={set('consent')}
                    style={{ marginTop: 3, accentColor: AMBER, width: 16, height: 16, cursor: 'pointer' }} />
                  <label htmlFor="consent" style={{ fontFamily: 'sans-serif', fontSize: 12, color: STONE, lineHeight: 1.7, cursor: 'pointer' }}>
                    I agree to be contacted by a Chalo Holidays consultant regarding my travel enquiry. Your details are never shared with third parties. We are registered under Company No. 07303708 (England & Wales).
                  </label>
                </div>
                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-3 font-bold text-sm tracking-widest uppercase"
                  style={{ background: loading ? '#C9B99A' : `linear-gradient(135deg,${RED},${RED2})`, color: WHITE, padding: '16px 32px', borderRadius: 3, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'sans-serif', boxShadow: loading ? 'none' : `0 8px 32px ${RED}44`, transition: 'all 0.3s' }}>
                  {loading ? (
                    <><div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,.4)', borderTopColor: WHITE, borderRadius: '50%', animation: 'spin .7s linear infinite' }} /> Sending your enquiry…</>
                  ) : (
                    <><Send size={15} /> Submit Enquiry</>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: Info Panel */}
          <div className="flex flex-col gap-5"
            style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(32px)', transition: 'opacity .8s ease .12s, transform .8s ease .12s' }}>
            <div className="p-6" style={{ background: CREAM, borderRadius: 4, border: `1px solid ${BORDER}` }}>
              <p style={{ fontFamily: 'sans-serif', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.18em', color: STONE, marginBottom: 14 }}>Why Choose Us</p>
              {[
                { icon: Zap,          text: 'IATA / TIDS Accredited Agency — No. 96-016351.' },
                { icon: HeartHandshake,text: 'Dedicated consultant from first call to safe return.' },
                { icon: ShieldCheck,  text: '100% transparent pricing — no hidden fees, ever.' },
                { icon: Globe,        text: '200+ destinations · 500+ vetted global partners.' },
              ].map(({ icon: I, text }, i) => (
                <div key={i} className="flex items-start gap-3 mb-3 last:mb-0">
                  <div className="w-7 h-7 flex items-center justify-center rounded-lg flex-shrink-0 mt-0.5"
                    style={{ background: `${AMBER}12`, border: `1px solid ${AMBER}24` }}>
                    <I size={12} style={{ color: AMBER }} />
                  </div>
                  <p style={{ fontFamily: 'sans-serif', fontSize: 13, color: SLATE, lineHeight: 1.65 }}>{text}</p>
                </div>
              ))}
            </div>
            <div className="p-6" style={{ background: CREAM, borderRadius: 4, border: `1px solid ${BORDER}` }}>
              <div className="flex items-center gap-2 mb-4">
                <Clock size={13} style={{ color: AMBER }} />
                <span style={{ fontFamily: 'sans-serif', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.18em', color: STONE }}>Office Hours (GMT)</span>
              </div>
              {[
                { day: 'Monday – Friday', time: '9:00 AM – 6:00 PM' },
                { day: 'Saturday',        time: '10:00 AM – 4:00 PM' },
                { day: 'Emergency',       time: '24/7 · +44 7575 104181' },
              ].map((h, i) => (
                <div key={i} className="flex items-center justify-between py-2.5"
                  style={{ borderBottom: i < 2 ? `1px solid ${BORDER}` : 'none' }}>
                  <span style={{ fontFamily: 'sans-serif', fontSize: 13, color: STONE }}>{h.day}</span>
                  <span style={{ fontFamily: 'sans-serif', fontSize: 13, fontWeight: 600, color: CHAR }}>{h.time}</span>
                </div>
              ))}
            </div>
            <div className="p-6" style={{ background: CREAM, borderRadius: 4, border: `1px solid ${BORDER}` }}>
              <p style={{ fontFamily: 'sans-serif', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.18em', color: STONE, marginBottom: 14 }}>Follow Our Journeys</p>
              <div className="flex items-center gap-2 flex-wrap">
                {[
                  { icon: faInstagram, label: '@chaloholiday', href: '#', accent: '#E1306C' },
                  { icon: faFacebook,  label: 'Facebook',     href: '#', accent: '#1877F2' },
                  { icon: faWhatsapp,  label: 'WhatsApp',     href: '#', accent: '#25D366' },
                  { icon: faYoutube,   label: 'YouTube',      href: '#', accent: '#FF0000' },
                  { icon: faLinkedin,  label: 'LinkedIn',     href: '#', accent: '#0A66C2' },
                ].map(({ icon: I, label, href, accent }, i) => {
                  const [hov, setHov] = useState(false)
                  return (
                    <a key={i} href={href}
                      className="flex items-center gap-2 px-3 py-2 transition-all duration-250"
                      style={{ border: `1px solid ${hov ? accent + '55' : BORDER}`, borderRadius: 3, background: hov ? `${accent}10` : 'transparent', textDecoration: 'none' }}
                      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
                      <FontAwesomeIcon icon={I} style={{ fontSize: 14, color: hov ? accent : STONE, transition: 'color 250ms' }} />
                      <span style={{ fontFamily: 'sans-serif', fontSize: 12, color: hov ? accent : STONE, transition: 'color 250ms' }}>{label}</span>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </section>
  )
}

/* ─── Flag Components ─── */
function FlagUK()     { return <img src={LondonFlag} alt="United Kingdom Flag" width="36" height="24" style={{ display: 'block', borderRadius: 2, objectFit: 'cover' }} /> }
function FlagIndia()  { return <img src={IndiaFlag}  alt="India Flag"          width="36" height="24" style={{ display: 'block', borderRadius: 2, objectFit: 'cover' }} /> }
function FlagUAE()    { return <img src={DubaiFlag}  alt="UAE Flag"            width="36" height="24" style={{ display: 'block', borderRadius: 2, objectFit: 'cover' }} /> }
function FlagFrance() { return <img src={ParisFlag}  alt="France Flag"         width="36" height="24" style={{ display: 'block', borderRadius: 2, objectFit: 'cover' }} /> }
function FlagQatar()  { return <img src={QatarFlag}  alt="Qatar Flag"          width="36" height="24" style={{ display: 'block', borderRadius: 2, objectFit: 'cover' }} /> }

/* ─── Live Clock ─── */
function LiveClock({ timezone }) {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () => {
      try {
        setTime(new Date().toLocaleTimeString('en-GB', { timeZone: timezone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }))
      } catch { setTime('--:--:--') }
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [timezone])
  return <span style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 700, color: AMBER, letterSpacing: '.08em' }}>{time}</span>
}

/* ─── Office data ─── */
const OFFICES = [
  { city: 'London', country: 'United Kingdom',      badge: 'Headquarters',   isHQ: true,  Flag: FlagUK,     address: '41 South Park Crescent, Ilford, London IG1 1XU',        timezone: 'Europe/London', tzLabel: 'GMT / BST',      lat: 51.558,  lng: 0.0708,  accentColor: RED },
  { city: 'Mumbai', country: 'India',               badge: 'Regional Office',isHQ: false, Flag: FlagIndia,  address: 'Bandra Kurla Complex, Mumbai 400051, India',             timezone: 'Asia/Kolkata',  tzLabel: 'IST (UTC+5:30)', lat: 19.0590, lng: 72.8656, accentColor: AMBER },
  { city: 'Dubai',  country: 'United Arab Emirates',badge: 'Regional Office',isHQ: false, Flag: FlagUAE,    address: 'DIFC Gate Avenue, Dubai, UAE',                           timezone: 'Asia/Dubai',    tzLabel: 'GST (UTC+4)',    lat: 25.2048, lng: 55.2708, accentColor: AMBER2 },
  { city: 'Paris',  country: 'France',              badge: 'Regional Office',isHQ: false, Flag: FlagFrance, address: 'Avenue des Champs-Élysées, 75008 Paris, France',          timezone: 'Europe/Paris',  tzLabel: 'CET / CEST',     lat: 48.8698, lng: 2.3079,  accentColor: '#1E40AF' },
  { city: 'Doha',   country: 'Qatar',               badge: 'Regional Office',isHQ: false, Flag: FlagQatar,  address: 'West Bay, Diplomatic Area, Doha, Qatar',                  timezone: 'Asia/Qatar',    tzLabel: 'AST (UTC+3)',    lat: 25.3209, lng: 51.5395, accentColor: '#7C2D52' },
]

/* ══════════════════════════════════════════════
   LEAFLET MAP
══════════════════════════════════════════════ */
function LeafletMap({ offices, activePin, setActivePin }) {
  const mapContainerRef = useRef(null)
  const mapInstanceRef  = useRef(null)
  const markersRef      = useRef([])

  useEffect(() => {
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link')
      link.id = 'leaflet-css'; link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }

    const buildMap = () => {
      if (mapInstanceRef.current || !mapContainerRef.current || !window.L) return
      const L = window.L
      const map = L.map(mapContainerRef.current, { center: [30, 40], zoom: 3, zoomControl: true, scrollWheelZoom: false })
      mapInstanceRef.current = map

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd', maxZoom: 20,
      }).addTo(map)

      const makePinIcon = () => L.divIcon({
        className: '', iconSize: [48, 64], iconAnchor: [24, 64], popupAnchor: [0, -68],
        html: `<div style="position:relative;width:48px;height:64px;display:flex;flex-direction:column;align-items:center;">
          <div style="width:32px;height:40px;background-image:url(${LocationPinIcon});background-size:contain;background-repeat:no-repeat;background-position:center;filter:drop-shadow(0 2px 6px rgba(0,0,0,0.2));margin-bottom:2px;"></div>
        </div>`,
      })

      offices.forEach((o, i) => {
        const marker = L.marker([o.lat, o.lng], { icon: makePinIcon() }).addTo(map)
        marker.bindPopup(
          `<div style="font-family:sans-serif;min-width:175px;padding:2px 0;">
            <p style="font-size:14px;font-weight:700;color:${CHAR};margin:0 0 2px;">${o.city}</p>
            <p style="font-size:9px;color:${GRAY};margin:0 0 8px;letter-spacing:.12em;text-transform:uppercase;">${o.country}</p>
            <p style="font-size:11.5px;color:#475569;margin:0 0 6px;line-height:1.65;">${o.address}</p>
            <p style="font-size:10px;color:${AMBER};margin:0;font-weight:600;">🕐 ${o.tzLabel}</p>
          </div>`,
          { maxWidth: 240, className: 'chalo-popup' }
        )
        marker.on('click', () => { setActivePin(i); marker.openPopup() })
        markersRef.current[i] = marker
      })

      const bounds = L.latLngBounds(offices.map(o => [o.lat, o.lng]))
      map.fitBounds(bounds, { padding: [70, 70] })
    }

    if (window.L) { buildMap() } else {
      const script = document.createElement('script')
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      script.async = true; script.onload = buildMap
      document.head.appendChild(script)
    }

    return () => {
      if (mapInstanceRef.current) { mapInstanceRef.current.remove(); mapInstanceRef.current = null; markersRef.current = [] }
    }
  }, [])

  useEffect(() => {
    if (activePin !== null && markersRef.current[activePin] && mapInstanceRef.current) {
      const { lat, lng } = offices[activePin]
      mapInstanceRef.current.flyTo([lat, lng], 6, { animate: true, duration: 0.9 })
      setTimeout(() => markersRef.current[activePin].openPopup(), 700)
    }
  }, [activePin])

  return (
    <>
      <div ref={mapContainerRef} style={{ width: '100%', height: '440px' }} />
      <style>{`
        .chalo-popup .leaflet-popup-content-wrapper { border-radius:6px!important;border:1px solid ${BORDER}!important;box-shadow:0 8px 32px rgba(0,0,0,0.12)!important;background:${CREAM}!important; }
        .chalo-popup .leaflet-popup-content { margin:14px 16px!important; }
        .chalo-popup .leaflet-popup-tip-container .leaflet-popup-tip { background:${CREAM}!important; }
        .leaflet-control-zoom { border:1px solid ${BORDER}!important;border-radius:5px!important;overflow:hidden; }
        .leaflet-control-zoom a { background:rgba(250,250,245,0.97)!important;color:${CHAR}!important;border-color:${BORDER}!important;font-weight:400!important; }
        .leaflet-control-zoom a:hover { background:${CREAM2}!important; }
        .leaflet-control-attribution { background:rgba(250,250,245,0.85)!important;font-size:9px!important; }
        .leaflet-attribution-flag { display:none!important; }
      `}</style>
    </>
  )
}

/* ══════════════════════════════════════════════
   MAP SECTION
══════════════════════════════════════════════ */
function MapSection() {
  const [ref, inView] = useInView(0.05)
  const [activePin, setActivePin] = useState(null)

  return (
    <section id="map" ref={ref} style={{ background: BG, padding: '5rem 0 4rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: `radial-gradient(circle,${AMBER}18 1px,transparent 1px)`, backgroundSize: '32px 32px' }} />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-16"
        style={{ position: 'relative', zIndex: 1, opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(28px)', transition: 'opacity .8s ease, transform .8s ease' }}>

        <div style={{ textAlign: 'center', marginBottom: '2.8rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: '1rem' }}>
            <div style={{ height: 1, width: 40, background: `linear-gradient(90deg,transparent,${AMBER})` }} />
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.28em', textTransform: 'uppercase', color: AMBER, fontFamily: 'sans-serif' }}>Our Offices</span>
            <div style={{ height: 1, width: 40, background: `linear-gradient(90deg,${AMBER},transparent)` }} />
          </div>
          <h2 style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(1.9rem,4vw,3rem)', fontWeight: 400, color: TEXT1, lineHeight: 1.08 }}>
            Find us around <em style={{ fontStyle: 'italic', color: AMBER }}>the world.</em>
          </h2>
        </div>

        {/* Map */}
        <div style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', border: `1px solid ${BORDER}`, boxShadow: `0 4px 32px rgba(245,168,0,0.12)`, marginBottom: '2.5rem', background: '#EDE8DF' }}>
          <LeafletMap offices={OFFICES} activePin={activePin} setActivePin={setActivePin} />

          {/* Map badge */}
          <div style={{ position: 'absolute', top: 14, right: 14, zIndex: 999, background: `rgba(250,250,245,0.97)`, border: `1px solid ${BORDER}`, borderRadius: 5, padding: '10px 16px', backdropFilter: 'blur(10px)', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', flexShrink: 0, background: WHITE, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={ChaloLogo} alt="Chalo Holidays Logo" style={{ width: 28, height: 28, objectFit: 'contain' }} />
            </div>
            <div>
              <p style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 13, fontWeight: 400, color: TEXT1, margin: 0 }}>Chalo Holidays</p>
              <p style={{ fontFamily: 'sans-serif', fontSize: 9, color: TEXT2, letterSpacing: '.14em', textTransform: 'uppercase', marginTop: 2, marginBottom: 0 }}>5 Global Offices</p>
            </div>
          </div>
        </div>

        {/* Office Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.5rem', maxWidth: '1320px', margin: '0 auto', justifyContent: 'center' }}>
          {OFFICES.map((office, i) => {
            const [hov, setHov] = useState(false)
            const { Flag } = office
            const isActive = activePin === i
            return (
              <div key={office.city}
                onClick={() => setActivePin(isActive ? null : i)}
                onMouseEnter={() => setHov(true)}
                onMouseLeave={() => setHov(false)}
                style={{ background: WHITE, borderRadius: 6, border: `1px solid ${(hov || isActive) ? office.accentColor + '60' : BORDER}`, boxShadow: (hov || isActive) ? `0 8px 32px ${office.accentColor}20` : '0 2px 12px rgba(245,168,0,0.07)', padding: '1.8rem 1.6rem', position: 'relative', overflow: 'hidden', transition: 'all 0.3s cubic-bezier(.4,0,.2,1)', cursor: 'pointer' }}>
                {/* Accent top stripe */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: (hov || isActive) ? `linear-gradient(90deg,${office.accentColor},${office.accentColor}88)` : `linear-gradient(90deg,${GOLD_L},transparent)`, transition: 'background 0.3s' }} />

                {/* Flag + City */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.1rem' }}>
                  <div style={{ borderRadius: 3, overflow: 'hidden', flexShrink: 0, border: `1px solid ${BORDER}`, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                    <Flag />
                  </div>
                  <div>
                    <p style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: '1.2rem', fontWeight: 400, color: TEXT1, letterSpacing: '-0.01em', lineHeight: 1 }}>{office.city}</p>
                    <p style={{ fontFamily: 'sans-serif', fontSize: 9.5, color: TEXT2, letterSpacing: '.16em', textTransform: 'uppercase', marginTop: 4 }}>{office.country}</p>
                  </div>
                </div>

                <div style={{ height: 1, background: `linear-gradient(90deg,${BORDER},transparent)`, marginBottom: '1.1rem' }} />

                {/* Badge */}
                <div style={{ marginBottom: '1rem' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 9, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', fontFamily: 'sans-serif', padding: '4px 10px', borderRadius: 2, background: office.isHQ ? `${RED}10` : `${AMBER}10`, border: `1px solid ${office.isHQ ? RED + '40' : AMBER + '40'}`, color: office.isHQ ? RED : AMBER }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: office.isHQ ? RED : AMBER, display: 'inline-block' }} />
                    {office.badge}
                  </span>
                </div>

                {/* Address */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: '0.9rem' }}>
                  <MapPin size={13} style={{ color: office.accentColor, flexShrink: 0, marginTop: 2 }} />
                  <p style={{ fontFamily: 'sans-serif', fontSize: 12.5, color: TEXT2, lineHeight: 1.7 }}>{office.address}</p>
                </div>

                {/* Live Clock */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: `${office.accentColor}09`, border: `1px solid ${office.accentColor}28`, borderRadius: 4, padding: '8px 12px', marginTop: 4 }}>
                  <Clock size={11} style={{ color: office.accentColor, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: 'sans-serif', fontSize: 9, color: TEXT2, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 2 }}>{office.tzLabel}</p>
                    <LiveClock timezone={office.timezone} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', animation: 'pulse 2s infinite' }} />
                    <span style={{ fontFamily: 'sans-serif', fontSize: 8, color: '#22C55E', fontWeight: 600, letterSpacing: '.08em' }}>LIVE</span>
                  </div>
                </div>

                <p style={{ fontFamily: 'sans-serif', fontSize: 10, color: office.accentColor, marginTop: 12, fontWeight: 600, letterSpacing: '.08em', opacity: hov || isActive ? 1 : 0, transition: 'opacity 0.2s' }}>
                  {isActive ? '✓ Showing on map' : 'Click to show on map →'}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(0.85)}}`}</style>
    </section>
  )
}

/* ══════════════════════════════════════════════
   FAQ
══════════════════════════════════════════════ */
const FAQS = [
  { icon: <Clock size={13} style={{ color: AMBER }} />, q: 'How quickly will I hear back?', a: <>Our London team typically responds within <span style={{ color: AMBER2, fontWeight: 600 }}>2 hours</span> during business hours via email or phone. For urgent matters, use our 24/7 emergency line: <span style={{ color: AMBER2 }}>+44 7575 104181</span>.</> },
  { icon: <span style={{ fontSize: 12, color: AMBER }}>£</span>, q: 'Is there a consultation fee?', a: <>Absolutely <span style={{ color: AMBER2, fontWeight: 600 }}>none</span>. Every consultation, itinerary draft, and expert call is completely free of charge — always. No obligation, no pressure.</> },
  { icon: <Globe size={13} style={{ color: AMBER }} />, q: 'Can I customise a package I see online?', a: <>Yes — every package is a <span style={{ color: AMBER2, fontWeight: 600 }}>starting point</span>, not a fixed product. We personalise everything to your preferences, budget, travel dates and party size.</> },
  { icon: <ShieldCheck size={13} style={{ color: AMBER }} />, q: 'Do you handle visa assistance?', a: <>Yes. Our team provides <span style={{ color: AMBER2, fontWeight: 600 }}>end-to-end visa guidance</span>, documentation checklists, and application support for all major destinations worldwide.</> },
  { icon: <CheckCircle2 size={13} style={{ color: AMBER }} />, q: 'Are you IATA accredited?', a: <>Yes — Chalo Holidays holds full <span style={{ color: AMBER2, fontWeight: 600 }}>IATA/TIDS accreditation</span> (No. 96-016351) and is registered in England &amp; Wales under Company No. 07303708. VAT: GB 132842918.</> },
]

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div onClick={onToggle}
      style={{ background: isOpen ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)', border: `1px solid ${isOpen ? AMBER + '65' : AMBER + '25'}`, borderRadius: 6, overflow: 'hidden', transition: 'all 0.3s cubic-bezier(.4,0,.2,1)', cursor: 'pointer', marginBottom: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.4rem 1.8rem', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', flexShrink: 0, background: isOpen ? `${AMBER}22` : `${AMBER}10`, border: `1px solid ${isOpen ? AMBER + '55' : AMBER + '28'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>
            {faq.icon}
          </div>
          <span style={{ fontFamily: "Georgia,serif", fontSize: '1rem', fontWeight: 500, color: isOpen ? WHITE : 'rgba(255,255,255,0.8)', lineHeight: 1.3, transition: 'color 0.25s' }}>
            {faq.q}
          </span>
        </div>
        <div style={{ width: 30, height: 30, borderRadius: '50%', flexShrink: 0, background: isOpen ? `${AMBER}22` : `${AMBER}10`, border: `1px solid ${isOpen ? AMBER + '55' : AMBER + '28'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'all 0.3s' }}>
          <ChevronRight size={13} style={{ color: isOpen ? AMBER : `${AMBER}AA` }} />
        </div>
      </div>
      <div style={{ maxHeight: isOpen ? 200 : 0, overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(.4,0,.2,1)' }}>
        <div style={{ padding: '0 1.8rem 1.5rem', paddingLeft: 'calc(1.8rem + 14px + 34px)' }}>
          <div style={{ height: 1, background: `linear-gradient(90deg,${AMBER}44,transparent)`, marginBottom: '1rem' }} />
          <p style={{ fontFamily: 'sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, margin: 0 }}>{faq.a}</p>
        </div>
      </div>
    </div>
  )
}

function FAQSection() {
  const [ref, inView] = useInView(0.06)
  const [open, setOpen] = useState(0)

  return (
    <section ref={ref} className="w-full py-20 sm:py-28 overflow-hidden relative"
      style={{ background: `linear-gradient(135deg,#1a0f00 0%,#2a1e00 40%,#1a0f00 100%)` }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 20% 50%,${AMBER}12 0%,transparent 60%),radial-gradient(circle at 80% 20%,${AMBER2}09 0%,transparent 50%)` }} />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 79px,${AMBER}07 80px),repeating-linear-gradient(90deg,transparent,transparent 79px,${AMBER}07 80px)` }} />
      {/* Brand accent line: red → amber */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: `linear-gradient(180deg,transparent,${RED} 35%,${AMBER} 65%,transparent)` }} />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-16"
        style={{ zIndex: 1, opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(28px)', transition: 'opacity .8s ease, transform .8s ease' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: '1rem' }}>
            <div style={{ height: 1, width: 60, background: `linear-gradient(90deg,transparent,${AMBER})` }} />
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.28em', textTransform: 'uppercase', color: AMBER, fontFamily: 'sans-serif' }}>Frequently Asked</span>
            <div style={{ height: 1, width: 60, background: `linear-gradient(90deg,${AMBER},transparent)` }} />
          </div>
          <h2 style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 400, color: WHITE, letterSpacing: '-0.02em', lineHeight: 1.06, margin: '0 0 .8rem' }}>
            Questions &amp; <em style={{ fontStyle: 'italic', color: AMBER2 }}>Answers</em>
          </h2>
          <p style={{ fontFamily: 'sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.38)', letterSpacing: '.06em' }}>
            Everything you need to know before your journey begins
          </p>
        </div>

        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          {FAQS.map((f, i) => (
            <FAQItem key={i} faq={f} isOpen={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   PAGE ASSEMBLY
══════════════════════════════════════════════ */
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'sans-serif' }}>
      <Navbar />
      <ContactHero />
      <ContactForm />
      <MapSection />
      <FAQSection />
      <Footer />
    </div>
  )
}