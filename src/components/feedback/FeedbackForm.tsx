import React, { useState } from 'react'
import Button from '@/components/common/Button'
import Alert from '@/components/common/Alert'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import createLogger from '@/utils/logger'

interface FeedbackFormProps {
  documentId?: string
  onSubmit?: (data: FeedbackData) => void
  onCancel?: () => void
  className?: string
}

export interface FeedbackData {
  type: 'bug' | 'suggestion' | 'question' | 'other'
  message: string
  email?: string
  documentId?: string
  browserInfo: string
  timestamp: number
}

const logger = createLogger('FeedbackForm')

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  documentId,
  onSubmit,
  onCancel,
  className = '',
}) => {
  const [userEmail, setUserEmail] = useLocalStorage<string>('userEmail', '')
  const [feedbackType, setFeedbackType] = useState<FeedbackData['type']>('suggestion')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState(userEmail)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean
    message?: string
  }>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!message.trim()) {
      setSubmitStatus({
        success: false,
        message: '请输入反馈内容',
      })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus({})

    try {
      // Get browser info
      const browserInfo = `${navigator.userAgent} - ${window.innerWidth}x${window.innerHeight}`
      
      // Create feedback data
      const feedbackData: FeedbackData = {
        type: feedbackType,
        message: message.trim(),
        email: email.trim() || undefined,
        documentId,
        browserInfo,
        timestamp: Date.now(),
      }

      // Save email for future use
      if (email.trim()) {
        setUserEmail(email.trim())
      }

      // Log the feedback (for development)
      logger.info('Feedback submitted:', feedbackData)

      // In a real app, we would send this to the server
      // For now, simulate a network request
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Call onSubmit if provided
      if (onSubmit) {
        onSubmit(feedbackData)
      }

      // Reset form and show success message
      setMessage('')
      setSubmitStatus({
        success: true,
        message: '感谢您的反馈！',
      })
    } catch (error) {
      logger.error('Error submitting feedback:', error)
      setSubmitStatus({
        success: false,
        message: '提交反馈时出错，请稍后再试',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 ${className}`}>
      <h3 className="text-lg font-medium text-gray-900 mb-3">提交反馈</h3>
      
      {submitStatus.message && (
        <Alert
          type={submitStatus.success ? 'success' : 'error'}
          message={submitStatus.message}
          className="mb-4"
          dismissible
        />
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            反馈类型
          </label>
          <select
            value={feedbackType}
            onChange={(e) => setFeedbackType(e.target.value as FeedbackData['type'])}
            className="input"
            disabled={isSubmitting}
          >
            <option value="suggestion">建议</option>
            <option value="bug">问题报告</option>
            <option value="question">咨询</option>
            <option value="other">其他</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            反馈内容
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="input min-h-[120px] resize-y"
            placeholder="请详细描述您的反馈或问题..."
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            电子邮箱（可选）
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="your.email@example.com"
            disabled={isSubmitting}
          />
          <p className="mt-1 text-xs text-gray-500">
            仅用于后续联系，不会用于其他用途
          </p>
        </div>

        <div className="flex justify-end space-x-3">
          {onCancel && (
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              取消
            </Button>
          )}
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            提交反馈
          </Button>
        </div>
      </form>
    </div>
  )
}

export default FeedbackForm