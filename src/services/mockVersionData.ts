import { DocumentVersion } from '@/components/version/VersionHistoryList'
import { mockDocuments } from './mockData'

// Generate mock version history data for each mock document
export const mockVersions: DocumentVersion[] = []

// For each document, create 3 versions
mockDocuments.forEach((doc) => {
  // Current version (matches the document)
  mockVersions.push({
    id: `${doc.id}-v3`,
    documentId: doc.id,
    versionNumber: 3,
    title: doc.title,
    content: doc.content,
    createdAt: doc.updatedAt,
    createdBy: 'Admin',
    changeDescription: '最终版本',
  })

  // Version 2 (slight differences)
  mockVersions.push({
    id: `${doc.id}-v2`,
    documentId: doc.id,
    versionNumber: 2,
    title: doc.title.includes('(') ? doc.title : `${doc.title} (草稿)`,
    content: doc.content
      .replace('# ', '## ')
      .replace('概述', '内容概要')
      .substring(0, Math.floor(doc.content.length * 0.9)),
    createdAt: new Date(
      new Date(doc.updatedAt).getTime() - 7 * 24 * 60 * 60 * 1000
    ).toISOString(),
    createdBy: 'Editor',
    changeDescription: '更新了内容和格式',
  })

  // Version 1 (initial version, very different)
  mockVersions.push({
    id: `${doc.id}-v1`,
    documentId: doc.id,
    versionNumber: 1,
    title: `${doc.title} - 初始版本`,
    content: doc.content
      .split('\n\n')
      .slice(0, 2)
      .join('\n\n')
      .substring(0, Math.floor(doc.content.length * 0.5)),
    createdAt: new Date(
      new Date(doc.updatedAt).getTime() - 14 * 24 * 60 * 60 * 1000
    ).toISOString(),
    createdBy: 'Creator',
    changeDescription: '初始创建',
  })
})
