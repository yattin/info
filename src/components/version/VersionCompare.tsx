import React, { useState, useEffect } from 'react'
import { diffLines, Change } from 'diff'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'

interface Version {
  id: string
  content: string
  updatedAt: string
  updatedBy?: string
}

interface VersionCompareProps {
  currentVersion: Version
  previousVersions: Version[]
  className?: string
}

const VersionCompare: React.FC<VersionCompareProps> = ({
  currentVersion,
  previousVersions,
  className = '',
}) => {
  const [selectedVersionId, setSelectedVersionId] = useState<string | null>(
    previousVersions.length > 0 ? previousVersions[0].id : null
  )
  const [diff, setDiff] = useState<Change[]>([])

  const selectedVersion = previousVersions.find(v => v.id === selectedVersionId) || null

  // Calculate diff when selected version changes
  useEffect(() => {
    if (selectedVersion) {
      const differences = diffLines(selectedVersion.content, currentVersion.content)
      setDiff(differences)
    } else {
      setDiff([])
    }
  }, [selectedVersionId, selectedVersion, currentVersion])

  if (previousVersions.length === 0) {
    return (
      <Card className={className}>
        <p className="text-gray-500 text-center py-4">没有可用的历史版本</p>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 mb-3 sm:mb-0">版本对比</h3>
        
        <div className="flex items-center space-x-2">
          <label htmlFor="version-select" className="text-sm text-gray-700">
            选择历史版本：
          </label>
          <select
            id="version-select"
            className="input py-1 px-2"
            value={selectedVersionId || ''}
            onChange={(e) => setSelectedVersionId(e.target.value || null)}
          >
            {previousVersions.map((version) => (
              <option key={version.id} value={version.id}>
                {new Date(version.updatedAt).toLocaleString()} 
                {version.updatedBy ? `(由 ${version.updatedBy})` : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedVersion && (
        <div>
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <div>
              <span className="font-medium">历史版本：</span> {new Date(selectedVersion.updatedAt).toLocaleString()}
            </div>
            <div>
              <span className="font-medium">当前版本：</span> {new Date(currentVersion.updatedAt).toLocaleString()}
            </div>
          </div>

          <div className="border rounded-md overflow-hidden">
            <div className="overflow-auto max-h-96 p-4 font-mono text-sm whitespace-pre-wrap bg-gray-50">
              {diff.map((part, index) => (
                <span
                  key={index}
                  className={`${part.added ? 'bg-green-100 text-green-800' : ''} ${
                    part.removed ? 'bg-red-100 text-red-800' : ''
                  }`}
                >
                  {part.value}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 flex justify-end space-x-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => window.print()}
            >
              打印对比
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}

export default VersionCompare