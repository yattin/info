import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import DocumentCard from '@/components/DocumentCard'
import Loading from '@/components/common/Loading'
import Alert from '@/components/common/Alert'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setQuery, searchDocuments } from '@/store/slices/searchSlice'

const SearchPage = () => {
  const dispatch = useAppDispatch()
  const { query, results, loading, error } = useAppSelector((state) => state.search)
  const [searchParams, setSearchParams] = useSearchParams()
  const [localQuery, setLocalQuery] = useState(query || searchParams.get('q') || '')

  // Initialize search from URL query parameter
  useEffect(() => {
    const queryParam = searchParams.get('q')
    if (queryParam && queryParam !== query) {
      dispatch(setQuery(queryParam))
      dispatch(searchDocuments(queryParam))
    }
  }, [dispatch, query, searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (localQuery.trim()) {
      dispatch(setQuery(localQuery))
      dispatch(searchDocuments(localQuery))
      setSearchParams({ q: localQuery })
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-6">
        <form onSubmit={handleSearch}>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-grow">
              <input
                type="text"
                placeholder="搜索文档..."
                className="input"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
              />
            </div>
            <div>
              <Button type="submit" variant="primary" isLoading={loading}>
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
                搜索
              </Button>
            </div>
          </div>
        </form>
      </Card>

      {error && (
        <Alert type="error" title="搜索错误" message={error} className="mb-6" />
      )}

      {loading ? (
        <Loading text="搜索中..." />
      ) : query ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            搜索结果: <span className="text-blue-600">{query}</span> 
            <span className="text-sm text-gray-500 font-normal ml-2">
              找到 {results.length} 个结果
            </span>
          </h2>

          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map((doc) => (
                <DocumentCard key={doc.id} document={doc} />
              ))}
            </div>
          ) : (
            <Card>
              <p className="text-center py-4 text-gray-600">
                没有找到匹配 "{query}" 的文档。
              </p>
            </Card>
          )}
        </div>
      ) : (
        <Card>
          <p className="text-center py-4 text-gray-600">
            输入关键词开始搜索。
          </p>
        </Card>
      )}
    </div>
  )
}

export default SearchPage