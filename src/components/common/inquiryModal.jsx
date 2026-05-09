// import React, { useState, useEffect, useRef } from 'react';
// import { FaTimes } from 'react-icons/fa';
// import { Check } from 'lucide-react';

// const InquiryModal = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
//   const dismissedRef = useRef(false);

//   useEffect(() => {
//     if (dismissedRef.current) return;
//     const timer = setTimeout(() => handleOpen(), 5000);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleOpen = () => {
//     setIsOpen(true);
//     setTimeout(() => setIsAnimating(true), 20);
//   };

//   const handleClose = () => {
//     dismissedRef.current = true;
//     // Reset form and submitted state when closing
//     setForm({ name: '', email: '', phone: '', message: '' });
//     setSubmitted(false);
//     setIsAnimating(false);
//     setTimeout(() => setIsOpen(false), 300);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!form.name || !form.email) return;
//     setSubmitted(true);
//   };

//   const resetForm = () => {
//     setForm({ name: '', email: '', phone: '', message: '' });
//     setSubmitted(false);
//   };

//   const stopPropagation = (e) => e.stopPropagation();

//   return (
//     <>
//       {/* Modal Overlay */}
//       {isOpen && (
//         <div
//           onClick={handleClose}
//           className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300 ${
//             isAnimating ? 'opacity-100' : 'opacity-0'
//           }`}
//         >
//           <div
//             onClick={stopPropagation}
//             className={`relative w-full max-w-md rounded-2xl overflow-hidden bg-white transform transition-all duration-300 ${
//               isAnimating ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
//             }`}
//             style={{ boxShadow: '0 32px 80px -16px rgba(0,0,0,0.3)' }}
//           >
//             {/* Gold top strip */}
//             <div style={{ height: '4px', background: '#C9A84C' }} />

//             {/* Header */}
//             <div style={{ background: '#9B1C1C' }} className="px-6 pt-6 pb-5 text-center relative">
//               {/* Close */}
//               <button
//                 onClick={handleClose}
//                 className="absolute top-3 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white transition-all hover:bg-white/20"
//                 style={{ background: 'rgba(255,255,255,0.15)' }}
//               >
//                 <FaTimes size={12} />
//               </button>

//               {/* Logo */}
//               <div className="flex items-center justify-center gap-2 mb-3">
//                 <span
//                   style={{ background: '#C9A84C', color: '#7F1D1D', fontSize: '10px', letterSpacing: '0.18em' }}
//                   className="font-bold px-2 py-1 rounded"
//                 >
//                   CH
//                 </span>
//                 <span
//                   style={{ fontFamily: 'Georgia, serif', fontSize: '15px', letterSpacing: '0.1em', color: '#fff' }}
//                 >
//                   CHALO <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>Holidays</span>
//                 </span>
//               </div>

//               <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '17px', letterSpacing: '0.06em' }} className="text-white font-semibold">
//                 Make an Enquiry
//               </h2>
//               <p style={{ fontSize: '11px', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.6)' }} className="mt-1">
//                 Premium Travel Assistance · London
//               </p>
//             </div>

//             {/* Body */}
//             {!submitted ? (
//               <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
//                 {['name', 'email', 'phone'].map((field) => (
//                   <input
//                     key={field}
//                     type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
//                     placeholder={field === 'name' ? 'Full Name' : field === 'email' ? 'Email Address' : 'Phone Number'}
//                     value={form[field]}
//                     onChange={(e) => setForm({ ...form, [field]: e.target.value })}
//                     style={{ fontFamily: 'Georgia, serif', fontSize: '13px' }}
//                     className="w-full border-0 border-b border-gray-200 focus:border-red-800 outline-none py-2.5 px-0.5 text-gray-800 placeholder-gray-300 bg-transparent transition-all"
//                   />
//                 ))}
//                 <textarea
//                   rows={3}
//                   placeholder="How can we help you plan your perfect trip?"
//                   value={form.message}
//                   onChange={(e) => setForm({ ...form, message: e.target.value })}
//                   style={{ fontFamily: 'Georgia, serif', fontSize: '13px' }}
//                   className="w-full border-0 border-b border-gray-200 focus:border-red-800 outline-none py-2.5 px-0.5 text-gray-800 placeholder-gray-300 bg-transparent resize-none transition-all"
//                 />
//                 <button
//                   type="submit"
//                   style={{ background: '#9B1C1C', fontFamily: 'Georgia, serif', letterSpacing: '0.2em', fontSize: '11px' }}
//                   className="w-full py-3 text-white font-bold uppercase tracking-widest rounded mt-2 hover:bg-red-900 transition-all"
//                 >
//                   Send Enquiry →
//                 </button>
//                 <div style={{ height: '3px', background: '#C9A84C', borderRadius: '0 0 2px 2px' }} />
//               </form>
//             ) : (
//               <div className="px-6 py-10 text-center">
//                 <div
//                   style={{ width: '56px', height: '56px', background: '#FEF3C7', border: '2px solid #C9A84C', borderRadius: '50%' }}
//                   className="mx-auto mb-5 flex items-center justify-center"
//                 >
//                   <Check size={22} color="#C9A84C" />
//                 </div>
//                 <h3
//                   style={{ fontFamily: 'Georgia, serif', fontSize: '20px', color: '#9B1C1C' }}
//                   className="font-semibold mb-2"
//                 >
//                   Thank You!
//                 </h3>
//                 <p style={{ fontSize: '13px', lineHeight: '1.8' }} className="text-gray-500 mb-1">
//                   Your enquiry has been received.<br />
//                   We will get back to you within <strong className="text-gray-700">2 hours</strong>.
//                 </p>
//                 <p style={{ fontSize: '13px', lineHeight: '1.8', color: '#999' }}>
//                   We wish you all the best and look forward<br />to planning your perfect journey.
//                 </p>
                
//                 {/* Added buttons for better UX */}
//                 <div className="flex gap-3 mt-8">
//                   <button
//                     onClick={resetForm}
//                     style={{ 
//                       background: 'transparent', 
//                       color: '#9B1C1C', 
//                       fontFamily: 'Georgia, serif', 
//                       fontSize: '12px',
//                       border: '1px solid #9B1C1C'
//                     }}
//                     className="flex-1 py-2.5 px-4 rounded-lg font-semibold hover:bg-red-50 transition-all"
//                   >
//                     Edit Enquiry
//                   </button>
//                   <button
//                     onClick={handleClose}
//                     style={{ 
//                       background: '#9B1C1C', 
//                       fontFamily: 'Georgia, serif', 
//                       fontSize: '12px' 
//                     }}
//                     className="flex-1 py-2.5 px-4 text-white rounded-lg font-semibold hover:bg-red-900 transition-all"
//                   >
//                     Close
//                   </button>
//                 </div>
                
//                 <p style={{ fontSize: '12px', color: '#C9A84C', letterSpacing: '0.1em', fontWeight: '700', marginTop: '16px' }}>
//                   — The Chalo Holidays Team
//                 </p>
//               </div>
//             )}

//             {/* Gold bottom strip */}
//             <div style={{ height: '4px', background: '#C9A84C' }} />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default InquiryModal;