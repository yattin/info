import React, { useState } from 'react'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import { formatDate } from '@/utils/helpers'

export interface DocumentVersion {
  id: string
  documentId: string
  versionNumber: number
  title: string
  content: string
  createdAt: string
  createdBy?: string
  changeDescription?: string
}

interface VersionHistoryListProps {
  versions: DocumentVersion[]
  currentVersionId: string
  onViewVersion: (version: DocumentVersion) => void
  onCompareVersions: (version1: DocumentVersion, version2: DocumentVersion) => void
  className?: string
}

const VersionHistoryList: React.FC<VersionHistoryListProps> = ({
  versions,
  currentVersionId,
  onViewVersion,
  onCompareVersions,
  className = '',
}) => {
  const [selectedVersionIds, setSelectedVersionIds] = useState<string[]>([])

  const handleVersionSelect = (versionId: string) => {
    if (selectedVersionIds.includes(versionId)) {
      setSelectedVersionIds(selectedVersionIds.filter(id => id !== versionId))
    } else {
      // Limit to 2 selected versions
      if (selectedVersionIds.length < 2) {
        setSelectedVersionIds([...selectedVersionIds, versionId])
      } else {
        // Replace the oldest selection
        setSelectedVersionIds([selectedVersionIds[1], versionId])
      }
    }
  }

  const handleCompare = () => {
    if (selectedVersionIds.length === 2) {
      const version1 = versions.find(v => v.id === selectedVersionIds[0])
      const version2 = versions.find(v => v.id === selectedVersionIds[1])
      
      if (version1 && version2) {
        onCompareVersions(version1, version2)
      }
    }
  }

  if (versions.length === 0) {
    return (
      <Card className={className}>
        <p className="text-gray-500 text-center py-4">没有可用的历史版本</p>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">版本历史</h3>
        
        {selectedVersionIds.length === 2 && (
          <Button 
            variant="primary" 
            size="sm"
            onClick={handleCompare}
          >
            比较选中版本
          </Button>
        )}
      </div>

      <div className="overflow-hidden border rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                选择
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                版本
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                修改时间
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                修改人
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {versions.map((version) => {
              const isCurrent = version.id === currentVersionId
              const isSelected = selectedVersionIds.includes(version.id)
              
              return (
                <tr 
                  key={version.id} 
                  className={`${isCurrent ? 'bg-blue-50' : ''} ${isSelected ? 'bg-yellow-50' : ''}`}
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleVersionSelect(version.id)}
                      disabled={isCurrent}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      v{version.versionNumber}
                      {isCurrent && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          当前
                        </span>
                      )}
                    </span>
                    {version.changeDescription && (
                      <p className="text-xs text-gray-500 mt-1">{version.changeDescription}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(version.createdAt)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {version.createdBy || '-'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={() => onViewVersion(version)}
                    >
                      查看
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default VersionHistoryList