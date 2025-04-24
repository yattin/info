import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const MobileNav: React.FC = () => {
  const location = useLocation()
  
  return (
    <nav className="nav-mobile safe-bottom">
      <div className="nav-mobile-menu">
        <NavLink to="/" className="nav-mobile-item touch-target" title="首页">
          <svg
            className={`h-6 w-6 ${location.pathname === '/' ? 'text-blue-600' : 'text-gray-400'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7m-7-7v7m0 0v7m0-7h7m-7 0H3"
            />
          </svg>
          <span className={location.pathname === '/' ? 'text-blue-600' : 'text-gray-500'}>
            首页
          </span>
        </NavLink>

        <NavLink to="/search" className="nav-mobile-item touch-target" title="搜索">
          <svg
            className={`h-6 w-6 ${location.pathname === '/search' ? 'text-blue-600' : 'text-gray-400'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span className={location.pathname === '/search' ? 'text-blue-600' : 'text-gray-500'}>
            搜索
          </span>
        </NavLink>

        <NavLink to="/categories" className="nav-mobile-item touch-target" title="分类">
          <svg
            className={`h-6 w-6 ${location.pathname === '/categories' ? 'text-blue-600' : 'text-gray-400'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <span className={location.pathname === '/categories' ? 'text-blue-600' : 'text-gray-500'}>
            分类
          </span>
        </NavLink>

        <NavLink to="/settings" className="nav-mobile-item touch-target" title="设置">
          <svg
            className={`h-6 w-6 ${location.pathname === '/settings' ? 'text-blue-600' : 'text-gray-400'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className={location.pathname === '/settings' ? 'text-blue-600' : 'text-gray-500'}>
            设置
          </span>
        </NavLink>
      </div>
    </nav>
  )
}

export default MobileNav