import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import DocumentView from '@/components/DocumentView'
import Loading from '@/components/common/Loading'
import Button from '@/components/common/Button'
import Alert from '@/components/common/Alert'
import FeedbackButton from '@/components/feedback/FeedbackButton'
import VersionHistoryList from '@/components/version/VersionHistoryList'
import VersionCompare from '@/components/version/VersionCompare'
import { DocumentVersion } from '@/components/version/VersionHistoryList'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { fetchDocumentById, clearCurrentDocument } from '@/store/slices/documentsSlice'
import { versionApi } from '@/services/versionApi'
import { startMeasurement, endMeasurement, captureError } from '@/services/monitoring'

const DocumentPage = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const { currentDocument, loading, error } = useAppSelector((state) => state.documents)
  const [documentVersions, setDocumentVersions] = useState<DocumentVersion[]>([])
  const [versionsLoading, setVersionsLoading] = useState(false)
  const [versionsError, setVersionsError] = useState<string | null>(null)
  const [showVersionHistory, setShowVersionHistory] = useState(false)
  const [selectedVersion, setSelectedVersion] = useState<DocumentVersion | null>(null)
  const [comparing, setComparing] = useState(false)

  // Fetch document data
  useEffect(() => {
    if (id) {
      // Start measuring load time
      startMeasurement('document-load')
      
      dispatch(fetchDocumentById(id))
        .then(() => {
          // End measurement on successful load
          endMeasurement('document-load')
        })
        .catch((err) => {
          // Capture error for monitoring
          captureError(err, { documentId: id })
        })
    }

    return () => {
      dispatch(clearCurrentDocument())
    }
  }, [dispatch, id])

  // Load document versions
  useEffect(() => {
    if (id && showVersionHistory) {
      setVersionsLoading(true)
      setVersionsError(null)
      
      versionApi.getDocumentVersions(id)
        .then(versions => {
          setDocumentVersions(versions)
          setVersionsLoading(false)
        })
        .catch(err => {
          console.error('Failed to load versions:', err)
          setVersionsError('加载版本历史失败')
          setVersionsLoading(false)
          captureError(err, { feature: 'version-history', documentId: id })
        })
    }
  }, [id, showVersionHistory])

  const handleViewVersion = (version: DocumentVersion) => {
    setSelectedVersion(version)
    setComparing(false)
  }

  const handleCompareVersions = (version1: DocumentVersion, version2: DocumentVersion) => {
    // Always show newer version as the main version
    const newerVersion = new Date(version1.createdAt) > new Date(version2.createdAt) 
      ? version1 
      : version2
    
    const olderVersion = version1 === newerVersion ? version2 : version1
    
    setSelectedVersion(olderVersion)
    setComparing(true)
  }

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

  return (
    <div className="container-responsive pb-16 md:pb-8">
      {selectedVersion && comparing && currentDocument ? (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">版本对比</h2>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setSelectedVersion(null)
                setComparing(false)
              }}
            >
              返回文档
            </Button>
          </div>
          
          <VersionCompare
            currentVersion={{
              id: currentDocument.id,
              content: currentDocument.content,
              updatedAt: currentDocument.updatedAt,
              updatedBy: 'Current User'
            }}
            previousVersions={[
              {
                id: selectedVersion.id,
                content: selectedVersion.content,
                updatedAt: selectedVersion.createdAt,
                updatedBy: selectedVersion.createdBy
              }
            ]}
          />
        </div>
      ) : selectedVersion ? (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              查看历史版本: v{selectedVersion.versionNumber}
            </h2>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setSelectedVersion(null)}
            >
              返回当前版本
            </Button>
          </div>
          
          <DocumentView
            document={{
              ...currentDocument,
              title: selectedVersion.title,
              content: selectedVersion.content,
              updatedAt: selectedVersion.createdAt
            }}
          />
        </div>
      ) : (
        <>
          <DocumentView document={currentDocument} />
          
          <div className="mt-8">
            <Button
              variant="secondary"
              onClick={() => setShowVersionHistory(!showVersionHistory)}
            >
              {showVersionHistory ? '隐藏版本历史' : '显示版本历史'}
            </Button>
            
            {showVersionHistory && (
              <div className="mt-4">
                {versionsLoading ? (
                  <Loading text="加载版本历史..." />
                ) : versionsError ? (
                  <Alert type="error" message={versionsError} />
                ) : (
                  <VersionHistoryList
                    versions={documentVersions}
                    currentVersionId="current"
                    onViewVersion={handleViewVersion}
                    onCompareVersions={handleCompareVersions}
                  />
                )}
              </div>
            )}
          </div>
        </>
      )}
      
      {/* Add the feedback button to the document page */}
      <FeedbackButton documentId={id} position="bottom-right" />
    </div>
  )
}

export default DocumentPage