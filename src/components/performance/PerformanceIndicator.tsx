import React, { useState, useEffect } from 'react'
import { startMeasurement, endMeasurement } from '@/services/monitoring'

interface PerformanceIndicatorProps {
  showDetails?: boolean
  className?: string
}

interface PerformanceMetric {
  name: string
  value: number
  timestamp: number
  isWarning: boolean
}

const PerformanceIndicator: React.FC<PerformanceIndicatorProps> = ({
  showDetails = false,
  className = '',
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([])
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [status, setStatus] = useState<'good' | 'warning' | 'bad'>('good')

  // Collect performance metrics
  useEffect(() => {
    if (!showDetails) return

    const collectMetrics = () => {
      if (!performance || !performance.getEntriesByType) return

      // Gather navigation timing metrics
      const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (navEntry) {
        const loadTime = navEntry.loadEventEnd - navEntry.startTime
        const dnsTime = navEntry.domainLookupEnd - navEntry.domainLookupStart
        const tcpTime = navEntry.connectEnd - navEntry.connectStart
        const ttfb = navEntry.responseStart - navEntry.requestStart
        const domLoadTime = navEntry.domComplete - navEntry.domInteractive

        const newMetrics = [
          {
            name: '页面加载时间',
            value: loadTime,
            timestamp: Date.now(),
            isWarning: loadTime > 1000,
          },
          {
            name: 'DNS解析时间',
            value: dnsTime,
            timestamp: Date.now(),
            isWarning: dnsTime > 100,
          },
          {
            name: 'TCP连接时间',
            value: tcpTime,
            timestamp: Date.now(),
            isWarning: tcpTime > 100,
          },
          {
            name: '首字节时间',
            value: ttfb,
            timestamp: Date.now(),
            isWarning: ttfb > 200,
          },
          {
            name: 'DOM加载时间',
            value: domLoadTime,
            timestamp: Date.now(),
            isWarning: domLoadTime > 500,
          },
        ]

        setMetrics(prev => [...prev, ...newMetrics])

        // Determine overall status
        const hasWarnings = newMetrics.some(m => m.isWarning)
        const hasBadMetrics = newMetrics.some(m => m.value > 2000)
        setStatus(hasBadMetrics ? 'bad' : hasWarnings ? 'warning' : 'good')
      }
    }

    // Collect metrics after page load
    if (document.readyState === 'complete') {
      collectMetrics()
    } else {
      window.addEventListener('load', collectMetrics)
      return () => window.removeEventListener('load', collectMetrics)
    }
  }, [showDetails])

  // Monitor rendering performance
  useEffect(() => {
    if (!showDetails) return

    // Start monitoring on component mount
    startMeasurement('component-lifetime')

    return () => {
      // End monitoring on component unmount
      const measure = endMeasurement('component-lifetime')
      if (measure) {
        const renderTime = measure.duration
        setMetrics(prev => [
          ...prev,
          {
            name: '组件运行时间',
            value: renderTime,
            timestamp: Date.now(),
            isWarning: renderTime > 5000,
          },
        ])
      }
    }
  }, [showDetails])

  if (!showDetails) return null

  const statusColors = {
    good: 'bg-green-500',
    warning: 'bg-yellow-500',
    bad: 'bg-red-500',
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      <div className="bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden">
        <div
          className="p-2 flex items-center justify-between cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full ${statusColors[status]} mr-2`}></div>
            <span className="text-sm font-medium text-gray-700">性能监控</span>
          </div>
          <svg
            className={`h-4 w-4 text-gray-400 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {isExpanded && (
          <div className="border-t border-gray-200 p-3 max-h-60 overflow-y-auto">
            <table className="w-full text-xs">
              <thead>
                <tr>
                  <th className="text-left text-gray-500 pb-2">指标</th>
                  <th className="text-right text-gray-500 pb-2">值</th>
                </tr>
              </thead>
              <tbody>
                {metrics.length > 0 ? (
                  metrics.map((metric, index) => (
                    <tr key={index} className="border-t border-gray-100 first:border-0">
                      <td className="py-1">{metric.name}</td>
                      <td className={`text-right py-1 ${metric.isWarning ? 'text-red-600' : 'text-gray-800'}`}>
                        {metric.value.toFixed(2)}ms
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="text-center py-2 text-gray-500">
                      正在收集指标...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default PerformanceIndicator