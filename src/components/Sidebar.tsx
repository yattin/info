import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setSidebarOpen } from '@/store/slices/uiSlice'
import { fetchDocuments } from '@/store/slices/documentsSlice'

interface SidebarProps {
  isMobile: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile }) => {
  const dispatch = useAppDispatch()
  const { sidebarOpen } = useAppSelector((state) => state.ui)
  const { documents, loading } = useAppSelector((state) => state.documents)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Fetch documents when component mounts
  useEffect(() => {
    dispatch(fetchDocuments())
  }, [dispatch])

  // Handle clicks outside of sidebar on mobile to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobile &&
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        dispatch(setSidebarOpen(false))
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobile, sidebarOpen, dispatch])

  // Group documents by category
  const documentsByCategory = documents.reduce<Record<string, typeof documents>>(
    (acc, doc) => {
      if (!acc[doc.category]) {
        acc[doc.category] = []
      }
      acc[doc.category].push(doc)
      return acc
    },
    {}
  )

  return (
    <div
      ref={sidebarRef}
      className={`bg-white border-r border-gray-200 pt-5 pb-4 flex flex-col transition-all duration-300 ${isMobile
        ? sidebarOpen
          ? 'fixed inset-y-0 left-0 z-50 w-64 shadow-lg'
          : 'fixed inset-y-0 -left-64 z-50 w-64'
        : 'relative w-64 flex-shrink-0'
        }`}
    >
      {/* Sidebar header */}
      <div className="flex items-center justify-between px-4">
        <h2 className="text-lg font-medium text-gray-900">文档分类</h2>
        {isMobile && (
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => dispatch(setSidebarOpen(false))}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Sidebar content */}
      <div className="mt-5 flex-1 flex flex-col overflow-y-auto">
        <div className="px-4 mb-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block py-2 px-4 rounded-md transition-colors ${isActive
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'}`
            }
            onClick={() => isMobile && dispatch(setSidebarOpen(false))}
          >
            <div className="flex items-center">
              <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7m-7-7v7m0 0v7m0-7h7m-7 0H3"
                />
              </svg>
              首页
            </div>
          </NavLink>
        </div>

        <nav className="flex-1">
          {loading ? (
            <div className="px-8 py-4 text-gray-500">加载中...</div>
          ) : (
            <ul>
              {Object.entries(documentsByCategory).map(([category, docs]) => (
                <li key={category} className="mb-4">
                  <div className="px-5 font-medium text-sm text-gray-500 mb-2">{category}</div>
                  <ul>
                    {docs.map((doc) => (
                      <li key={doc.id}>
                        <NavLink
                          to={`/document/${doc.id}`}
                          className={({ isActive }) =>
                            `block py-2 px-4 mx-2 rounded-md transition-colors ${isActive
                              ? 'bg-blue-50 text-blue-700'
                              : 'text-gray-700 hover:bg-gray-100'}`
                          }
                          onClick={() => isMobile && dispatch(setSidebarOpen(false))}
                        >
                          {doc.title}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </div>
    </div>
  )
}

export default Sidebar