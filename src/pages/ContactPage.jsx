'use client'
import React, { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import {
  ArrowRight, MapPin, Phone, Mail, Clock, Globe,
  Send, CheckCircle2, Star, ChevronRight,
  HeartHandshake, ShieldCheck, Zap, Users, Video, X,
} from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebook, faInstagram, faYoutube, faLinkedin, faWhatsapp,
} from '@fortawesome/free-brands-svg-icons'
import Londonimg from '../assets/images/home/london.avif'
import Dubaiimg  from '../assets/images/home/dubai.webp'
import Delhiimg  from '../assets/images/home/delhi.webp'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import ContactImg from '../assets/images/Contact-us.jpg';

/* ─── EmailJS Keys ─── */
const EMAILJS_SERVICE_ID  = 'service_xf18u79'
const EMAILJS_TEMPLATE_ID = 'template_isha8tw'
const EMAILJS_PUBLIC_KEY  = 'iUD0q1pg7sojX9HKP'

/* ─── Design Tokens ─── */
const GOLD  = '#B8860B'
const GOLD2 = '#D4A017'
const RED   = '#B91C1C'
const DARK  = '#0F172A'
const DARK2 = '#1C1917'
const SLATE = '#475569'
const STONE = '#78716C'

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
function Rule({ color = GOLD, w = 28 }) {
  return <div style={{ width: w, height: 1, background: color, flexShrink: 0 }} />
}
function SectionLabel({ color = GOLD, center = false, children }) {
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
function StarRow({ count = 5, accent = GOLD, size = 12 }) {
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
      minWidth: 320, maxWidth: 440, background: '#FFFDF8',
      borderRadius: 6, boxShadow: '0 24px 64px -12px rgba(0,0,0,0.22)',
      border: `1px solid ${isSuccess ? GOLD : RED}33`,
      borderLeft: `4px solid ${isSuccess ? GOLD : RED}`,
      padding: '18px 20px', display: 'flex', alignItems: 'flex-start', gap: 14,
      animation: 'slideInToast 0.38s cubic-bezier(0.4,0,0.2,1)',
    }}>
      <div style={{ width: 38, height: 38, borderRadius: '50%', flexShrink: 0, background: isSuccess ? `${GOLD}18` : `${RED}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${isSuccess ? GOLD : RED}33` }}>
        {isSuccess ? <CheckCircle2 size={18} style={{ color: GOLD }} /> : <X size={16} style={{ color: RED }} />}
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontFamily: 'sans-serif', fontSize: 13, fontWeight: 700, color: DARK2, marginBottom: 4 }}>
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
      <div className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{ background: `linear-gradient(180deg,transparent,${GOLD} 35%,${GOLD2} 65%,transparent)` }} />
      <div className="relative z-10 max-w-[1440px] mx-auto flex flex-col justify-center"
        style={{ minHeight: 'clamp(480px,65vh,720px)', padding: 'clamp(5rem,10vh,7rem) clamp(1.5rem,5vw,4rem) clamp(4rem,7vh,5rem)' }}>
        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(22px)', transition: 'opacity .9s ease .08s, transform .9s ease .08s' }}>
          <div className="flex items-center gap-3 mb-7" style={{ fontFamily: 'sans-serif' }}>
            <Rule color={GOLD} w={28} />
            <span style={{ color: GOLD, fontSize: 10, fontWeight: 700, letterSpacing: '.24em', textTransform: 'uppercase' }}>Get in Touch</span>
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5"
              style={{ color: GOLD2, border: `1px solid ${GOLD}45`, background: 'rgba(212,160,23,0.12)', fontSize: 9, fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', fontFamily: 'sans-serif', borderRadius: 2 }}>
              IATA Accredited
            </span>
          </div>
          <h1 className="text-white leading-[.92] mb-6"
            style={{ fontSize: 'clamp(3rem,8.5vw,6.8rem)', fontWeight: 400, letterSpacing: '-0.025em' }}>
            Let's plan your<br /><em style={{ fontStyle: 'italic', color: GOLD }}>perfect journey.</em>
          </h1>
          <p style={{ color: 'rgba(255,255,255,.50)', fontSize: 'clamp(.88rem,1.4vw,1.05rem)', lineHeight: 1.85, maxWidth: '50ch', fontFamily: 'sans-serif', fontWeight: 300, marginBottom: '2.5rem' }}>
            Whether you're dreaming of a honeymoon in the Maldives, a family adventure in Europe, or a corporate retreat — our London-based experts are ready to craft your perfect itinerary.
          </p>
          <div className="flex flex-wrap gap-3" style={{ fontFamily: 'sans-serif' }}>
            <a href="#contact-form"
              className="inline-flex items-center gap-3 font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:brightness-110 hover:scale-[1.02]"
              style={{ background: `linear-gradient(135deg,${RED},#991B1B)`, color: '#fff', padding: '13px 28px', borderRadius: 2, boxShadow: `0 8px 28px ${RED}50`, textDecoration: 'none' }}>
              Send an Enquiry <ArrowRight size={14} />
            </a>
            {/* <a href="tel:+4420300499780"
              className="inline-flex items-center gap-2 font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:bg-white/10"
              style={{ color: 'rgba(255,255,255,.7)', border: `1px solid ${GOLD}55`, padding: '12px 28px', borderRadius: 2, textDecoration: 'none' }}>
              <Phone size={13} /> Call Us Now
            </a> */}
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
        {Icon && <Icon size={14} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: focus ? GOLD : '#CBD5E1', transition: 'color 250ms', pointerEvents: 'none' }} />}
        <input type={type} placeholder={placeholder} value={value} onChange={onChange}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} required={required}
          style={{ width: '100%', padding: Icon ? '12px 16px 12px 40px' : '12px 16px', fontFamily: 'sans-serif', fontSize: 14, color: DARK2, background: '#FAFAF8', border: `1px solid ${focus ? GOLD : '#E2DED8'}`, borderRadius: 3, outline: 'none', transition: 'border-color 250ms, box-shadow 250ms', boxShadow: focus ? `0 0 0 3px ${GOLD}18` : 'none' }} />
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
        style={{ width: '100%', padding: '12px 16px', fontFamily: 'sans-serif', fontSize: 14, color: DARK2, background: '#FAFAF8', border: `1px solid ${focus ? GOLD : '#E2DED8'}`, borderRadius: 3, outline: 'none', resize: 'vertical', transition: 'border-color 250ms, box-shadow 250ms', boxShadow: focus ? `0 0 0 3px ${GOLD}18` : 'none' }} />
    </div>
  )
}

/* ══════════════════════════════════════════════
   2 ▸ CONTACT FORM
══════════════════════════════════════════════ */
function ContactForm() {
  const [ref, inView] = useInView(0.05)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [toast, setToast]         = useState({ show: false, type: 'success', message: '' })
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', subject: '', message: '', consent: false })

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
        title: form.subject, message: form.message, reply_to: form.email,
        time: new Date().toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short' }),
      }, EMAILJS_PUBLIC_KEY)
      setSubmitted(true)
      showToast('success', `Thank you ${form.fullName}! Your enquiry has been received. We'll be in touch within 2 hours.`)
      setForm({ fullName: '', email: '', phone: '', subject: '', message: '', consent: false })
    } catch (err) {
      console.error('EmailJS error:', err)
      showToast('error', 'Failed to send. Please call us directly on +44 (0) 2030 049978.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact-form" ref={ref} className="w-full py-20 sm:py-28 overflow-hidden" style={{ background: '#fff' }}>
      <Toast show={toast.show} type={toast.type} message={toast.message} onClose={hideToast} />
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 xl:gap-24">
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(-32px)', transition: 'opacity .8s ease, transform .8s ease' }}>
            <SectionLabel color={GOLD}>Plan Your Journey</SectionLabel>
            <h2 style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(2rem,4.5vw,3.2rem)', fontWeight: 400, color: DARK2, letterSpacing: '-0.02em', lineHeight: 1.06, marginBottom: '1rem' }}>
              Tell us about your<br /><em style={{ color: GOLD }}>dream trip.</em>
            </h2>
            <p style={{ fontFamily: 'sans-serif', fontSize: 14, color: STONE, lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: '46ch' }}>
              Fill in the details below and a dedicated travel consultant at our London office will craft a bespoke itinerary just for you — at no obligation whatsoever.
            </p>
            {submitted ? (
              <div className="flex flex-col items-center text-center py-16 px-8"
                style={{ border: `1px solid ${GOLD}44`, borderRadius: 4, background: '#FAFAF5' }}>
                <div className="w-16 h-16 flex items-center justify-center rounded-full mb-5"
                  style={{ background: `${GOLD}18`, border: `2px solid ${GOLD}50` }}>
                  <CheckCircle2 size={30} style={{ color: GOLD }} />
                </div>
                <h3 style={{ fontFamily: "Georgia,serif", fontSize: '1.6rem', fontWeight: 400, color: DARK2, marginBottom: 12 }}>Enquiry Received!</h3>
                <p style={{ fontFamily: 'sans-serif', fontSize: 14, color: STONE, lineHeight: 1.8, maxWidth: '36ch' }}>
                  Thank you for reaching out. A member of our London team will be in touch within 2 hours.
                </p>
                <div className="flex items-center gap-2 mt-6">
                  <StarRow count={5} accent={GOLD} size={13} />
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
                  <div style={{ height: 1, background: '#F0EDE8', margin: '1.5rem 0' }} />
                  <TextareaField label="Message" value={form.message} onChange={set('message')} rows={5}
                    placeholder="Share any special occasions, preferences, dietary needs, or anything that will help us craft the perfect itinerary…" />
                </div>
                <div className="flex items-start gap-3 mb-7 mt-4">
                  <input type="checkbox" id="consent" checked={form.consent} onChange={set('consent')}
                    style={{ marginTop: 3, accentColor: GOLD, width: 16, height: 16, cursor: 'pointer' }} />
                  <label htmlFor="consent" style={{ fontFamily: 'sans-serif', fontSize: 12, color: STONE, lineHeight: 1.7, cursor: 'pointer' }}>
                    I agree to be contacted by a Chalo Holidays consultant regarding my travel enquiry. Your details are never shared with third parties. We are registered under Company No. 07303708 (England & Wales).
                  </label>
                </div>
                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-3 font-bold text-sm tracking-widest uppercase"
                  style={{ background: loading ? '#C9B99A' : `linear-gradient(135deg,${RED},#991B1B)`, color: '#fff', padding: '16px 32px', borderRadius: 3, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'sans-serif', boxShadow: loading ? 'none' : `0 8px 32px ${RED}44`, transition: 'all 0.3s' }}>
                  {loading ? (
                    <><div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin .7s linear infinite' }} /> Sending your enquiry…</>
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
            <div className="p-6" style={{ background: '#FAFAF8', borderRadius: 4, border: '1px solid #E8E5E1' }}>
              <p style={{ fontFamily: 'sans-serif', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.18em', color: STONE, marginBottom: 14 }}>Why Choose Us</p>
              {[
                { icon: Zap,            text: 'IATA / TIDS Accredited Agency — No. 96-016351.' },
                { icon: HeartHandshake, text: 'Dedicated consultant from first call to safe return.' },
                { icon: ShieldCheck,    text: '100% transparent pricing — no hidden fees, ever.' },
                { icon: Globe,          text: '200+ destinations · 500+ vetted global partners.' },
              ].map(({ icon: I, text }, i) => (
                <div key={i} className="flex items-start gap-3 mb-3 last:mb-0">
                  <div className="w-7 h-7 flex items-center justify-center rounded-lg flex-shrink-0 mt-0.5"
                    style={{ background: `${GOLD}12`, border: `1px solid ${GOLD}24` }}>
                    <I size={12} style={{ color: GOLD }} />
                  </div>
                  <p style={{ fontFamily: 'sans-serif', fontSize: 13, color: SLATE, lineHeight: 1.65 }}>{text}</p>
                </div>
              ))}
            </div>
            <div className="p-6" style={{ background: '#FAFAF8', borderRadius: 4, border: '1px solid #E8E5E1' }}>
              <div className="flex items-center gap-2 mb-4">
                <Clock size={13} style={{ color: GOLD }} />
                <span style={{ fontFamily: 'sans-serif', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.18em', color: STONE }}>Office Hours (GMT)</span>
              </div>
              {[
                { day: 'Monday – Friday', time: '9:00 AM – 6:00 PM' },
                { day: 'Saturday',        time: '10:00 AM – 4:00 PM' },
                { day: 'Emergency',       time: '24/7 · +44 7575 104181' },
              ].map((h, i) => (
                <div key={i} className="flex items-center justify-between py-2.5"
                  style={{ borderBottom: i < 2 ? '1px solid #F0EDE8' : 'none' }}>
                  <span style={{ fontFamily: 'sans-serif', fontSize: 13, color: STONE }}>{h.day}</span>
                  <span style={{ fontFamily: 'sans-serif', fontSize: 13, fontWeight: 600, color: DARK2 }}>{h.time}</span>
                </div>
              ))}
            </div>
            <div className="p-6" style={{ background: '#FAFAF8', borderRadius: 4, border: '1px solid #E8E5E1' }}>
              <p style={{ fontFamily: 'sans-serif', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.18em', color: STONE, marginBottom: 14 }}>Follow Our Journeys</p>
              <div className="flex items-center gap-2 flex-wrap">
                {[
                  { icon: faInstagram, label: '@chaloholiday', href: '#', accent: '#E1306C' },
                  { icon: faFacebook,  label: 'Facebook',      href: '#', accent: '#1877F2' },
                  { icon: faWhatsapp,  label: 'WhatsApp',      href: '#', accent: '#25D366' },
                  { icon: faYoutube,   label: 'YouTube',       href: '#', accent: '#FF0000' },
                  { icon: faLinkedin,  label: 'LinkedIn',      href: '#', accent: '#0A66C2' },
                ].map(({ icon: I, label, href, accent }, i) => {
                  const [hov, setHov] = useState(false)
                  return (
                    <a key={i} href={href}
                      className="flex items-center gap-2 px-3 py-2 transition-all duration-250"
                      style={{ border: `1px solid ${hov ? accent + '55' : '#E2DED8'}`, borderRadius: 3, background: hov ? `${accent}10` : 'transparent', textDecoration: 'none' }}
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


/* ─── Design Tokens ─── */

const BG     = '#FBF7F0'
const BORDER = '#E8DFD0'
const TEXT1  = '#2C1A06'
const TEXT2  = '#7A6245'
const GOLD_L = '#F5E6C8'
/* ─── Flag SVGs ─── */
function FlagUK() {
  return (
    <svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" width="36" height="24" style={{ display: 'block', borderRadius: 2 }}>
      <rect width="60" height="40" fill="#012169"/>
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="8"/>
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="5"/>
      <path d="M30,0 V40 M0,20 H60" stroke="#fff" strokeWidth="13"/>
      <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="9"/>
    </svg>
  )
}
function FlagIndia() {
  return (
    <svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" width="36" height="24" style={{ display: 'block', borderRadius: 2 }}>
      <rect width="60" height="40" fill="#fff"/>
      <rect width="60" height="13.3" fill="#FF9933"/>
      <rect y="26.7" width="60" height="13.3" fill="#138808"/>
      <circle cx="30" cy="20" r="6" fill="none" stroke="#000080" strokeWidth="1.2"/>
      <circle cx="30" cy="20" r="1" fill="#000080"/>
      <g stroke="#000080" strokeWidth="0.6">
        <line x1="30" y1="14" x2="30" y2="26"/><line x1="24" y1="20" x2="36" y2="20"/>
        <line x1="25.75" y1="15.75" x2="34.25" y2="24.25"/><line x1="34.25" y1="15.75" x2="25.75" y2="24.25"/>
        <line x1="24" y1="17" x2="36" y2="23"/><line x1="24" y1="23" x2="36" y2="17"/>
        <line x1="27" y1="14.5" x2="33" y2="25.5"/><line x1="33" y1="14.5" x2="27" y2="25.5"/>
      </g>
    </svg>
  )
}
function FlagUAE() {
  return (
    <svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" width="36" height="24" style={{ display: 'block', borderRadius: 2 }}>
      <rect width="60" height="40" fill="#fff"/>
      <rect width="60" height="13.3" fill="#00732F"/>
      <rect y="26.7" width="60" height="13.3" fill="#000"/>
      <rect width="16" height="40" fill="#FF0000"/>
    </svg>
  )
}
 
/* ─── Office data ─── */
const OFFICES = [
  {
    city: 'London', country: 'United Kingdom', badge: 'Headquarters', isHQ: true,
    Flag: FlagUK,
    address: '41 South Park Crescent, Ilford, London IG1 1XU',
    lat: 51.558, lng: 0.0708,
    accentColor: '#B91C1C',
  },
  {
    city: 'New Delhi', country: 'India', badge: 'Regional Office', isHQ: false,
    Flag: FlagIndia,
    address: 'Connaught Place, New Delhi 110001, India',
    lat: 28.6315, lng: 77.2195,
    accentColor: '#B8860B',
  },
  {
    city: 'Dubai', country: 'United Arab Emirates', badge: 'Regional Office', isHQ: false,
    Flag: FlagUAE,
    address: 'DIFC Gate Avenue, Dubai, UAE',
    lat: 25.2048, lng: 55.2708,
    accentColor: '#D4A017',
  },
]
 
/* ══════════════════════════════════════════════
   LEAFLET MAP — loads Leaflet via CDN
══════════════════════════════════════════════ */
function LeafletMap({ offices, activePin, setActivePin }) {
  const mapContainerRef = useRef(null)
  const mapInstanceRef  = useRef(null)
  const markersRef      = useRef([])
 
  useEffect(() => {
    /* 1. Inject Leaflet CSS */
    if (!document.getElementById('leaflet-css')) {
      const link  = document.createElement('link')
      link.id     = 'leaflet-css'
      link.rel    = 'stylesheet'
      link.href   = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }
 
    const buildMap = () => {
      if (mapInstanceRef.current || !mapContainerRef.current || !window.L) return
      const L = window.L
 
      /* Init map */
      const map = L.map(mapContainerRef.current, {
        center: [30, 40],
        zoom: 3,
        zoomControl: true,
        scrollWheelZoom: false,
      })
      mapInstanceRef.current = map
 
      /* Warm Voyager tile layer (cream-toned, no black) */
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 20,
        }
      ).addTo(map)
 
      /* Custom SVG pin factory */
      const makePinIcon = (color, cityName) => L.divIcon({
        className  : '',
        iconSize   : [48, 58],
        iconAnchor : [24, 58],
        popupAnchor: [0, -62],
        html: `
          <div style="position:relative;width:48px;height:58px;">
            <svg viewBox="0 0 48 58" xmlns="http://www.w3.org/2000/svg" width="48" height="58" style="filter:drop-shadow(0 3px 6px rgba(0,0,0,0.22));">
              <!-- Pin shape -->
              <path d="M24 3 C13 3 4 12 4 23 C4 37 24 53 24 53 C24 53 44 37 44 23 C44 12 35 3 24 3 Z"
                    fill="${color}" stroke="white" stroke-width="2.5"/>
              <!-- White inner ring -->
              <circle cx="24" cy="23" r="10" fill="white"/>
              <!-- Colored center dot -->
              <circle cx="24" cy="23" r="5" fill="${color}"/>
              <!-- Shine -->
              <ellipse cx="20" cy="17" rx="4" ry="2.5" fill="white" opacity="0.3" transform="rotate(-20 20 17)"/>
              <!-- Shadow -->
              <ellipse cx="24" cy="55" rx="8" ry="2.5" fill="rgba(0,0,0,0.15)"/>
            </svg>
            <!-- City label above -->
            <div style="
              position:absolute;
              bottom:calc(100% - 4px);
              left:50%;
              transform:translateX(-50%);
              background:white;
              color:${color};
              border:1.5px solid ${color};
              font-size:9px;
              font-weight:700;
              letter-spacing:.1em;
              text-transform:uppercase;
              white-space:nowrap;
              padding:3px 9px;
              border-radius:3px;
              font-family:sans-serif;
              box-shadow:0 2px 8px rgba(0,0,0,0.14);
              pointer-events:none;
            ">${cityName}</div>
          </div>
        `,
      })
 
      /* Place markers */
      offices.forEach((o, i) => {
        const marker = L.marker([o.lat, o.lng], { icon: makePinIcon(o.accentColor, o.city) })
          .addTo(map)
 
        /* Popup */
        marker.bindPopup(
          `<div style="font-family:sans-serif;min-width:175px;padding:2px 0;">
            <p style="font-size:14px;font-weight:700;color:#2C1A06;margin:0 0 2px;">${o.city}</p>
            <p style="font-size:9px;color:#7A6245;margin:0 0 8px;letter-spacing:.12em;text-transform:uppercase;">${o.country}</p>
            <p style="font-size:11.5px;color:#475569;margin:0;line-height:1.65;">${o.address}</p>
          </div>`,
          { maxWidth: 240, className: 'chalo-popup' }
        )
 
        marker.on('click', () => {
          setActivePin(i)
          marker.openPopup()
        })
 
        markersRef.current[i] = marker
      })
 
      /* Fit bounds to show all 3 pins */
      const bounds = L.latLngBounds(offices.map(o => [o.lat, o.lng]))
      map.fitBounds(bounds, { padding: [70, 70] })
    }
 
    /* Load Leaflet JS if not already present */
    if (window.L) {
      buildMap()
    } else {
      const script   = document.createElement('script')
      script.src     = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      script.async   = true
      script.onload  = buildMap
      document.head.appendChild(script)
    }
 
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
        markersRef.current = []
      }
    }
  }, [])
 
  /* When user clicks a card — fly to that pin & open popup */
  useEffect(() => {
    if (
      activePin !== null &&
      markersRef.current[activePin] &&
      mapInstanceRef.current
    ) {
      const { lat, lng } = offices[activePin]
      mapInstanceRef.current.flyTo([lat, lng], 6, { animate: true, duration: 0.9 })
      setTimeout(() => markersRef.current[activePin].openPopup(), 700)
    }
  }, [activePin])
 
  return (
    <>
      <div ref={mapContainerRef} style={{ width: '100%', height: '440px' }} />
      <style>{`
        /* Custom popup skin */
        .chalo-popup .leaflet-popup-content-wrapper {
          border-radius: 6px !important;
          border: 1px solid #E8DFD0 !important;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12) !important;
          background: #FFFDF9 !important;
        }
        .chalo-popup .leaflet-popup-content { margin: 14px 16px !important; }
        .chalo-popup .leaflet-popup-tip-container .leaflet-popup-tip { background: #FFFDF9 !important; }
        /* Zoom control */
        .leaflet-control-zoom { border: 1px solid #E8DFD0 !important; border-radius: 5px !important; overflow: hidden; }
        .leaflet-control-zoom a {
          background: rgba(251,247,240,0.97) !important;
          color: #2C1A06 !important;
          border-color: #E8DFD0 !important;
          font-weight: 400 !important;
        }
        .leaflet-control-zoom a:hover { background: #F5E6C8 !important; }
        /* Attribution */
        .leaflet-control-attribution { background: rgba(251,247,240,0.85) !important; font-size: 9px !important; }
        .leaflet-attribution-flag { display: none !important; }
      `}</style>
    </>
  )
}
 

/* ══════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════ */
 function MapSection() {
  const [ref, inView] = useInView(0.05)
  const [activePin, setActivePin] = useState(null)
 
  return (
    <section
      id="map"
      ref={ref}
      style={{ background: BG, padding: '5rem 0 4rem', position: 'relative', overflow: 'hidden' }}
    >
      {/* Warm dot texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `radial-gradient(circle, ${GOLD}18 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
      }} />
 
      <div
        className="max-w-[1440px] mx-auto px-6 lg:px-16"
        style={{
          position: 'relative', zIndex: 1,
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(28px)',
          transition: 'opacity .8s ease, transform .8s ease',
        }}
      >
        {/* ── Section heading ── */}
        <div style={{ textAlign: 'center', marginBottom: '2.8rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: '1rem' }}>
            <div style={{ height: 1, width: 40, background: `linear-gradient(90deg,transparent,${GOLD})` }} />
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.28em', textTransform: 'uppercase', color: GOLD, fontFamily: 'sans-serif' }}>Our Offices</span>
            <div style={{ height: 1, width: 40, background: `linear-gradient(90deg,${GOLD},transparent)` }} />
          </div>
          <h2 style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(1.9rem,4vw,3rem)', fontWeight: 400, color: TEXT1, lineHeight: 1.08 }}>
            Find us around{' '}
            <em style={{ fontStyle: 'italic', color: GOLD }}>the world.</em>
          </h2>
          <p style={{ fontFamily: 'sans-serif', fontSize: 13, color: TEXT2, marginTop: '.6rem', letterSpacing: '.04em' }}>
            London &nbsp;·&nbsp; New Delhi &nbsp;·&nbsp; Dubai
          </p>
        </div>
 
        {/* ── LEAFLET MAP (landscape, full width) ── */}
        <div style={{
          position: 'relative',
          borderRadius: 8,
          overflow: 'hidden',
          border: `1px solid ${BORDER}`,
          boxShadow: `0 4px 32px rgba(184,134,11,0.12)`,
          marginBottom: '2.5rem',
          background: '#EDE8DF',
        }}>
          <LeafletMap
            offices={OFFICES}
            activePin={activePin}
            setActivePin={setActivePin}
          />
 
          {/* Brand badge — top right overlay */}
          <div style={{
            position: 'absolute', top: 14, right: 14, zIndex: 999,
            background: 'rgba(251,247,240,0.97)',
            border: `1px solid ${BORDER}`,
            borderRadius: 5, padding: '10px 16px',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          }}>
            <p style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 13, fontWeight: 400, color: TEXT1 }}>Chalo Holidays</p>
            <p style={{ fontFamily: 'sans-serif', fontSize: 9, color: TEXT2, letterSpacing: '.14em', textTransform: 'uppercase', marginTop: 2 }}>3 Global Offices</p>
          </div>
        </div>
 
        {/* ── 3 LOCATION CARDS ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}>
          {OFFICES.map((office, i) => {
            const [hov, setHov] = useState(false)
            const { Flag } = office
            const isActive = activePin === i
 
            return (
              <div
                key={office.city}
                onClick={() => setActivePin(isActive ? null : i)}
                onMouseEnter={() => setHov(true)}
                onMouseLeave={() => setHov(false)}
                style={{
                  background: '#fff',
                  borderRadius: 6,
                  border: `1px solid ${(hov || isActive) ? office.accentColor + '60' : BORDER}`,
                  boxShadow: (hov || isActive)
                    ? `0 8px 32px ${office.accentColor}20`
                    : '0 2px 12px rgba(184,134,11,0.07)',
                  padding: '1.8rem 1.6rem',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(.4,0,.2,1)',
                  cursor: 'pointer',
                }}
              >
                {/* Accent top stripe */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                  background: (hov || isActive)
                    ? `linear-gradient(90deg,${office.accentColor},${office.accentColor}88)`
                    : `linear-gradient(90deg,${GOLD_L},transparent)`,
                  transition: 'background 0.3s',
                }} />
 
                {/* Watermark number */}
                <div style={{
                  position: 'absolute', top: 10, right: 16,
                  fontFamily: "Georgia,'Times New Roman',serif",
                  fontSize: 52, fontWeight: 300, color: `${GOLD}0E`,
                  lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
                }}>0{i + 1}</div>
 
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
 
                {/* Divider */}
                <div style={{ height: 1, background: `linear-gradient(90deg,${BORDER},transparent)`, marginBottom: '1.1rem' }} />
 
                {/* Badge */}
                <div style={{ marginBottom: '1rem' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    fontSize: 9, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase',
                    fontFamily: 'sans-serif', padding: '4px 10px', borderRadius: 2,
                    background: office.isHQ ? `${RED}10` : `${GOLD}10`,
                    border: `1px solid ${office.isHQ ? RED + '40' : GOLD + '40'}`,
                    color: office.isHQ ? RED : GOLD,
                  }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: office.isHQ ? RED : GOLD, display: 'inline-block' }} />
                    {office.badge}
                  </span>
                </div>
 
                {/* Address */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <MapPin size={13} style={{ color: office.accentColor, flexShrink: 0, marginTop: 2 }} />
                  <p style={{ fontFamily: 'sans-serif', fontSize: 12.5, color: TEXT2, lineHeight: 1.7 }}>{office.address}</p>
                </div>
 
                {/* Interaction hint */}
                <p style={{
                  fontFamily: 'sans-serif', fontSize: 10, color: office.accentColor,
                  marginTop: 12, fontWeight: 600, letterSpacing: '.08em',
                  opacity: hov || isActive ? 1 : 0,
                  transition: 'opacity 0.2s',
                }}>
                  {isActive ? '✓ Showing on map' : 'Click to show on map →'}
                </p>
              </div>
            )
          })}
        </div>
 
     
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   5 ▸ FAQ
══════════════════════════════════════════════ */
/* ══════════════════════════════════════════════
   5 ▸ FAQ — Luxury Golden Edition
══════════════════════════════════════════════ */
const FAQS = [
  {
    icon: <Clock size={13} style={{ color: GOLD }} />,
    q: 'How quickly will I hear back?',
    a: <>Our London team typically responds within <span style={{ color: GOLD2, fontWeight: 600 }}>2 hours</span> during business hours via email or phone. For urgent matters, use our 24/7 emergency line: <span style={{ color: GOLD2 }}>+44 7575 104181</span>.</>,
  },
  {
    icon: <span style={{ fontSize: 12, color: GOLD }}>£</span>,
    q: 'Is there a consultation fee?',
    a: <>Absolutely <span style={{ color: GOLD2, fontWeight: 600 }}>none</span>. Every consultation, itinerary draft, and expert call is completely free of charge — always. No obligation, no pressure.</>,
  },
  {
    icon: <Globe size={13} style={{ color: GOLD }} />,
    q: 'Can I customise a package I see online?',
    a: <>Yes — every package is a <span style={{ color: GOLD2, fontWeight: 600 }}>starting point</span>, not a fixed product. We personalise everything to your preferences, budget, travel dates and party size.</>,
  },
  {
    icon: <ShieldCheck size={13} style={{ color: GOLD }} />,
    q: 'Do you handle visa assistance?',
    a: <>Yes. Our team provides <span style={{ color: GOLD2, fontWeight: 600 }}>end-to-end visa guidance</span>, documentation checklists, and application support for all major destinations worldwide.</>,
  },
  {
    icon: <CheckCircle2 size={13} style={{ color: GOLD }} />,
    q: 'Are you IATA accredited?',
    a: <>Yes — Chalo Holidays holds full <span style={{ color: GOLD2, fontWeight: 600 }}>IATA/TIDS accreditation</span> (No. 96-016351) and is registered in England &amp; Wales under Company No. 07303708. VAT: GB 132842918.</>,
  },
]

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div
      onClick={onToggle}
      style={{
        background: isOpen ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${isOpen ? GOLD + '65' : GOLD + '25'}`,
        borderRadius: 6,
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(.4,0,.2,1)',
        cursor: 'pointer',
        marginBottom: 10,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.4rem 1.8rem', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
            background: isOpen ? `${GOLD}22` : `${GOLD}10`,
            border: `1px solid ${isOpen ? GOLD + '55' : GOLD + '28'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.3s',
          }}>
            {faq.icon}
          </div>
          <span style={{
            fontFamily: "Georgia,serif", fontSize: '1rem', fontWeight: 500,
            color: isOpen ? '#fff' : 'rgba(255,255,255,0.8)', lineHeight: 1.3,
            transition: 'color 0.25s',
          }}>
            {faq.q}
          </span>
        </div>
        <div style={{
          width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
          background: isOpen ? `${GOLD}22` : `${GOLD}10`,
          border: `1px solid ${isOpen ? GOLD + '55' : GOLD + '28'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: isOpen ? 'rotate(90deg)' : 'none',
          transition: 'all 0.3s',
        }}>
          <ChevronRight size={13} style={{ color: isOpen ? GOLD : `${GOLD}AA` }} />
        </div>
      </div>

      {/* Body */}
      <div style={{ maxHeight: isOpen ? 200 : 0, overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(.4,0,.2,1)' }}>
        <div style={{ padding: '0 1.8rem 1.5rem', paddingLeft: 'calc(1.8rem + 14px + 34px)' }}>
          <div style={{ height: 1, background: `linear-gradient(90deg,${GOLD}44,transparent)`, marginBottom: '1rem' }} />
          <p style={{ fontFamily: 'sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, margin: 0 }}>
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  )
}

function FAQSection() {
  const [ref, inView] = useInView(0.06)
  const [open, setOpen] = useState(0)

  return (
    <section
      ref={ref}
      className="w-full py-20 sm:py-28 overflow-hidden relative"
      style={{
        background: 'linear-gradient(135deg,#1a1200 0%,#2a1e00 40%,#1a1200 100%)',
      }}
    >
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, ${GOLD}12 0%, transparent 60%),
                          radial-gradient(circle at 80% 20%, ${GOLD2}09 0%, transparent 50%)`,
      }} />

      {/* Fine grid texture */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 79px,${GOLD}07 80px),
                          repeating-linear-gradient(90deg,transparent,transparent 79px,${GOLD}07 80px)`,
      }} />

      {/* Left gold accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{
        background: `linear-gradient(180deg,transparent,${GOLD} 35%,${GOLD2} 65%,transparent)`,
      }} />

      <div
        className="relative max-w-[1440px] mx-auto px-6 lg:px-16"
        style={{
          zIndex: 1,
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(28px)',
          transition: 'opacity .8s ease, transform .8s ease',
        }}
      >
        {/* Section heading — centered */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: '1rem' }}>
            <div style={{ height: 1, width: 60, background: `linear-gradient(90deg,transparent,${GOLD})` }} />
            {/* <Star size={16} style={{ fill: GOLD, color: GOLD }} /> */}
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.28em', textTransform: 'uppercase', color: GOLD, fontFamily: 'sans-serif' }}>
              Frequently Asked
            </span>
            {/* <Star size={16} style={{ fill: GOLD, color: GOLD }} /> */}
            <div style={{ height: 1, width: 60, background: `linear-gradient(90deg,${GOLD},transparent)` }} />
          </div>
          <h2 style={{
            fontFamily: "Georgia,'Times New Roman',serif",
            fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 400, color: '#fff',
            letterSpacing: '-0.02em', lineHeight: 1.06, margin: '0 0 .8rem',
          }}>
            Questions &amp; <em style={{ fontStyle: 'italic', color: GOLD2 }}>Answers</em>
          </h2>
          <p style={{ fontFamily: 'sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.38)', letterSpacing: '.06em' }}>
            Everything you need to know before your journey begins
          </p>
        </div>

        {/* FAQ accordion — single column, centered */}
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          {FAQS.map((f, i) => (
            <FAQItem
              key={i}
              faq={f}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
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