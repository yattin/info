import React, { useState } from 'react'
import FeedbackForm, { FeedbackData } from './FeedbackForm'

interface FeedbackButtonProps {
  documentId?: string
  className?: string
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
}

const FeedbackButton: React.FC<FeedbackButtonProps> = ({
  documentId,
  className = '',
  position = 'bottom-right',
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const positionClasses = {
    'bottom-right': 'bottom-5 right-5',
    'bottom-left': 'bottom-5 left-5',
    'top-right': 'top-5 right-5',
    'top-left': 'top-5 left-5',
  }

  const handleSubmit = (data: FeedbackData) => {
    // In a real app, we would send this to the server
    console.log('Feedback submitted:', data)
    // Close the feedback form after successful submission
    setTimeout(() => setIsOpen(false), 2000)
  }

  return (
    <div className={`fixed ${positionClasses[position]} z-40 ${className}`}>
      {isOpen ? (
        <div className="relative w-80 md:w-96 animate-fade-in">
          <FeedbackForm
            documentId={documentId}
            onSubmit={handleSubmit}
            onCancel={() => setIsOpen(false)}
          />
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          aria-label="提供反馈"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
        </button>
      )}
    </div>
  )
}

export default FeedbackButton