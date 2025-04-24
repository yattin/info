import React, { Component, ErrorInfo, ReactNode } from 'react'
import { captureError } from '@/services/monitoring'
import Button from './common/Button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to monitoring service
    captureError(error, { componentStack: errorInfo.componentStack })
    
    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  resetError = (): void => {
    this.setState({
      hasError: false,
      error: null,
    })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default fallback UI
      return (
        <div className="p-4 rounded-md bg-red-50 border border-red-200 text-red-800 max-w-2xl mx-auto my-4">
          <h2 className="text-lg font-semibold mb-2">出错了</h2>
          <p className="mb-4">很抱歉，组件加载时出现错误。</p>
          <p className="text-xs text-red-600 mb-4 font-mono overflow-x-auto whitespace-pre-wrap">
            {this.state.error?.toString()}
          </p>
          <div className="flex space-x-3">
            <Button variant="primary" onClick={this.resetError}>
              重试
            </Button>
            <Button variant="secondary" onClick={() => window.location.href = '/'}>
              返回首页
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary