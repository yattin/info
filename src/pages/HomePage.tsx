import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import DocumentCard from '@/components/DocumentCard'
import Loading from '@/components/common/Loading'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { fetchDocuments } from '@/store/slices/documentsSlice'

const HomePage = () => {
  const dispatch = useAppDispatch()
  const { documents, loading, error } = useAppSelector((state) => state.documents)

  useEffect(() => {
    dispatch(fetchDocuments())
  }, [dispatch])

  // Get recent documents (last 5)
  const recentDocuments = [...documents]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5)

  // Count documents by category
  const categoryCounts = documents.reduce<Record<string, number>>((acc, doc) => {
    acc[doc.category] = (acc[doc.category] || 0) + 1
    return acc
  }, {})

  // Get all unique tags
  const allTags = new Set<string>()
  documents.forEach((doc) => {
    doc.tags.forEach((tag) => allTags.add(tag))
  })

  if (loading) return <Loading text="加载文档中..." />

  if (error) {
    return (
      <div className="max-w-3xl mx-auto py-6">
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4">
          <p>加载文档时出错: {error}</p>
          <Button
            className="mt-3"
            onClick={() => dispatch(fetchDocuments())}
            variant="primary"
          >
            重试
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Welcome section */}
      <div className="mb-8">
        <Card>
          <h1 className="text-2xl font-bold text-gray-900">欢迎使用知识库</h1>
          <p className="mt-2 text-gray-600">
            这是一个简单的知识库系统，可以浏览、搜索和管理文档。使用左侧导航栏浏览按分类组织的文档，或者使用顶部的搜索栏搜索特定内容。
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content area */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">最近更新</h2>
          <div className="space-y-4">
            {recentDocuments.length > 0 ? (
              recentDocuments.map((doc) => (
                <DocumentCard key={doc.id} document={doc} />
              ))
            ) : (
              <Card>
                <p className="text-gray-500 text-center py-4">暂无文档</p>
              </Card>
            )}
          </div>
        </div>

        {/* Sidebar widgets */}
        <div className="space-y-6">
          {/* Categories widget */}
          <Card title="分类">
            <div className="space-y-2">
              {Object.entries(categoryCounts).map(([category, count]) => (
                <div key={category} className="flex justify-between items-center">
                  <span className="text-gray-700">{category}</span>
                  <span className="bg-gray-100 text-gray-700 rounded-full px-2 py-1 text-xs">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Tags cloud widget */}
          <Card title="标签">
            <div className="flex flex-wrap gap-2">
              {Array.from(allTags).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 rounded-md text-sm font-medium bg-blue-100 text-blue-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Card>

          {/* Quick links */}
          <Card title="快捷链接">
            <div className="space-y-2">
              <Link
                to="/search"
                className="flex items-center text-blue-600 hover:text-blue-800 hover:underline"
              >
                <svg
                  className="mr-2 h-4 w-4"
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
                高级搜索
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default HomePage