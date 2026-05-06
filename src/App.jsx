import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useState, useEffect } from 'react'
import MainLayout from '@/layouts/MainLayout'
import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
import ServicesPage from '@/pages/ServicesPage'
import DestinationsPage from '@/pages/DestinationsPage'
import TestimonialsPage from '@/pages/TestimonialsPage'
import ContactPage from '@/pages/ContactPage'
import { ROUTES } from '@/constants/routes'
import Loader from '@/components/common/Loader'

// LoaderWrapper component to handle loading on route changes
function LoaderWrapper({ children }) {
  const location = useLocation()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000) // Show loader for 1 second on route change, you can adjust timing

    return () => clearTimeout(timer)
  }, [location])

  if (loading) {
    return <Loader color="#B8860B" /> // Golden loader color, or use RED color if you want
  }

  return children
}

export default function App() {
  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            fontFamily: 'DM Sans, sans-serif',
            borderRadius: '10px',
          },
          success: { iconTheme: { primary: '#C9A84C', secondary: '#fff' } },
          error: { iconTheme: { primary: '#D32F2F', secondary: '#fff' } },
        }}
      />
      <LoaderWrapper>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path={ROUTES.ABOUT} element={<AboutPage />} />
            <Route path={ROUTES.SERVICES} element={<ServicesPage />} />
            <Route path={ROUTES.DESTINATIONS} element={<DestinationsPage />} />
            <Route path={ROUTES.TESTIMONIALS} element={<TestimonialsPage />} />
            <Route path={ROUTES.CONTACT} element={<ContactPage />} />
          </Route>
        </Routes>
      </LoaderWrapper>
    </Router>
  )
}