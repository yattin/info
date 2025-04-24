import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import SkipLink from './accessibility/SkipLink'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setSidebarOpen } from '@/store/slices/uiSlice'

const Layout = () => {
  const dispatch = useAppDispatch()
  const { sidebarOpen } = useAppSelector((state) => state.ui)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      
      // Auto-close sidebar on mobile when resizing
      if (mobile && sidebarOpen) {
        dispatch(setSidebarOpen(false))
      } else if (!mobile && !sidebarOpen) {
        dispatch(setSidebarOpen(true))
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [dispatch, sidebarOpen])

  // Add meta tag for improved mobile display
  useEffect(() => {
    // Set appropriate viewport meta tag for mobile devices
    const viewportMeta = document.querySelector('meta[name="viewport"]')
    if (viewportMeta) {
      viewportMeta.setAttribute(
        'content',
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
      )
    }

    // Add touch detection class
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      document.body.classList.add('touch-device')
    }

    return () => {
      // Reset viewport on unmount
      if (viewportMeta) {
        viewportMeta.setAttribute(
          'content',
          'width=device-width, initial-scale=1.0'
        )
      }
      document.body.classList.remove('touch-device')
    }
  }, [])

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Accessibility skip link */}
      <SkipLink targetId="main-content" />
      
      {/* Mobile sidebar overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" 
          onClick={() => dispatch(setSidebarOpen(false))}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <Sidebar isMobile={isMobile} />

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main id="main-content" className="flex-1 overflow-y-auto p-4 md:p-6" tabIndex={-1}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout