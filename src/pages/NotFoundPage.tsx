import { Link } from 'react-router-dom'
import Button from '@/components/common/Button'

const NotFoundPage = () => {
  return (
    <div className="max-w-md mx-auto py-12 px-4 text-center">
      <div className="mb-8">
        <svg
          className="w-24 h-24 mx-auto text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">404 - 页面未找到</h1>
      <p className="text-lg text-gray-600 mb-8">
        抱歉，您请求的页面不存在。可能是该页面已被移除、名称已更改或者临时不可用。
      </p>
      <Link to="/">
        <Button variant="primary" size="lg">
          返回首页
        </Button>
      </Link>
    </div>
  )
}

export default NotFoundPage