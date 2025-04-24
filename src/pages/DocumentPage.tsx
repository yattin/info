import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import DocumentView from '@/components/DocumentView'
import Loading from '@/components/common/Loading'
import Button from '@/components/common/Button'
import Alert from '@/components/common/Alert'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { fetchDocumentById, clearCurrentDocument } from '@/store/slices/documentsSlice'

const DocumentPage = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const { currentDocument, loading, error } = useAppSelector((state) => state.documents)

  useEffect(() => {
    if (id) {
      dispatch(fetchDocumentById(id))
    }

    return () => {
      dispatch(clearCurrentDocument())
    }
  }, [dispatch, id])

  if (loading) {
    return <Loading text="加载文档中..." />
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto py-6">
        <Alert
          type="error"
          title="错误"
          message={`加载文档时出错: ${error}`}
        />
        <div className="mt-4 flex space-x-4">
          <Button onClick={() => dispatch(fetchDocumentById(id!))} variant="primary">
            重试
          </Button>
          <Link to="/">
            <Button variant="secondary">返回首页</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (!currentDocument) {
    return (
      <div className="max-w-3xl mx-auto py-6">
        <Alert
          type="warning"
          title="未找到文档"
          message="没有找到您请求的文档。"
        />
        <div className="mt-4">
          <Link to="/">
            <Button variant="primary">返回首页</Button>
          </Link>
        </div>
      </div>
    )
  }

  return <DocumentView document={currentDocument} />
}

export default DocumentPage