import { Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import DocumentPage from './pages/DocumentPage'
import SearchPage from './pages/SearchPage'
import NotFoundPage from './pages/NotFoundPage'
import MobileNav from './components/ui/MobileNav'
import ErrorBoundary from './components/ErrorBoundary'
import PerformanceIndicator from './components/performance/PerformanceIndicator'

function App() {
  const location = useLocation()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const isDev = import.meta.env.DEV

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="document/:id" element={<DocumentPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      {/* Mobile navigation for small screens */}
      {isMobile && <MobileNav />}
      
      {/* Performance indicator (only in development) */}
      {isDev && <PerformanceIndicator showDetails />}
    </ErrorBoundary>
  )
}

export default App