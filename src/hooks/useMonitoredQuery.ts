import { useState, useEffect, useCallback } from 'react'
import { startMeasurement, endMeasurement, captureError, addBreadcrumb } from '@/services/monitoring'

interface UseMonitoredQueryOptions<T> {
  queryFn: () => Promise<T>
  queryKey: string
  enabled?: boolean
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
  retry?: number
  retryDelay?: number
}

interface UseMonitoredQueryResult<T> {
  data: T | null
  isLoading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

/**
 * Custom hook to perform monitored API queries with performance tracking
 */
export function useMonitoredQuery<T>(
  options: UseMonitoredQueryOptions<T>
): UseMonitoredQueryResult<T> {
  const {
    queryFn,
    queryKey,
    enabled = true,
    onSuccess,
    onError,
    retry = 1,
    retryDelay = 1000,
  } = options

  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const [retryCount, setRetryCount] = useState<number>(0)

  const executeQuery = useCallback(async (): Promise<void> => {
    // Skip if disabled
    if (!enabled) return

    // Reset states
    setIsLoading(true)
    setError(null)

    try {
      // Start monitoring the query
      startMeasurement(`query:${queryKey}`)
      addBreadcrumb(`Starting query: ${queryKey}`, 'query')

      // Execute the query
      const result = await queryFn()

      // End monitoring the query
      endMeasurement(`query:${queryKey}`)
      addBreadcrumb(`Query completed: ${queryKey}`, 'query')

      // Set data and invoke callbacks
      setData(result)
      if (onSuccess) onSuccess(result)
    } catch (err) {
      // End monitoring and capture error
      endMeasurement(`query:${queryKey}`, 0) // don't warn about errored queries
      const error = err instanceof Error ? err : new Error(String(err))
      captureError(error, { queryKey })

      // Handle retry logic
      if (retryCount < retry) {
        addBreadcrumb(`Retrying query: ${queryKey} (${retryCount + 1}/${retry})`, 'query')
        setRetryCount(prev => prev + 1)
        setTimeout(() => executeQuery(), retryDelay)
      } else {
        // No more retries, set error state
        setError(error)
        if (onError) onError(error)
      }
    } finally {
      if (retryCount === 0) {
        setIsLoading(false)
      }
    }
  }, [queryFn, queryKey, enabled, retry, retryCount, retryDelay, onSuccess, onError])

  // Execute query on mount and when dependencies change
  useEffect(() => {
    // Reset retry count when query key changes
    setRetryCount(0)
    
    if (enabled) {
      executeQuery()
    }
  }, [queryKey, enabled, executeQuery])

  // Provide a refetch function
  const refetch = useCallback(async (): Promise<void> => {
    setRetryCount(0) // Reset retry count
    return executeQuery()
  }, [executeQuery])

  return { data, isLoading, error, refetch }
}