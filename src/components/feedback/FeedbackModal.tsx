import React, { Fragment } from 'react'
import FeedbackForm, { FeedbackData } from './FeedbackForm'

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
  documentId?: string
  onSubmit?: (data: FeedbackData) => void
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  documentId,
  onSubmit,
}) => {
  if (!isOpen) return null

  const handleSubmit = (data: FeedbackData) => {
    if (onSubmit) {
      onSubmit(data)
    }
    // Close the modal after a delay
    setTimeout(() => onClose(), 2000)
  }

  return (
    <Fragment>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <div
            className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-3 right-3">
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={onClose}
              >
                <span className="sr-only">关闭</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <FeedbackForm
              documentId={documentId}
              onSubmit={handleSubmit}
              onCancel={onClose}
            />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default FeedbackModal