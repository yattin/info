/**
 * Performance and error monitoring service
 * Integrates with Sentry or can fallback to console logging
 */

// Check if Sentry DSN is provided in env
const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN
const ENABLE_MONITORING = import.meta.env.VITE_ENABLE_MONITORING === 'true'

// Flag to prevent double initialization
let initialized = false

// Initialize monitoring service
export const initMonitoring = async (): Promise<void> => {
  if (initialized || !ENABLE_MONITORING) return

  try {
    if (SENTRY_DSN) {
      // Dynamically import Sentry to avoid loading it if not used
      const Sentry = await import('@sentry/browser')
      Sentry.init({
        dsn: SENTRY_DSN,
        integrations: [
          new Sentry.BrowserTracing(),
          new Sentry.Replay({
            maskAllText: true,
            blockAllMedia: true,
          }),
        ],
        tracesSampleRate: 0.5,
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
        environment: import.meta.env.MODE,
        release: import.meta.env.VITE_APP_VERSION || 'development',
      })
      
      console.info('[Monitoring] Sentry initialized')
    } else {
      console.info('[Monitoring] Using fallback monitoring (console)')
      setupPerformanceMonitoring()
    }
    
    initialized = true
  } catch (error) {
    console.error('[Monitoring] Failed to initialize monitoring:', error)
    // Fallback to basic console monitoring
    setupPerformanceMonitoring()
  }
}

// Capture error
export const captureError = (error: Error, context?: Record<string, any>): void => {
  if (!ENABLE_MONITORING) return

  try {
    if (SENTRY_DSN) {
      // If Sentry is loaded, use it
      import('@sentry/browser').then(Sentry => {
        if (context) {
          Sentry.withScope(scope => {
            Object.entries(context).forEach(([key, value]) => {
              scope.setExtra(key, value)
            })
            Sentry.captureException(error)
          })
        } else {
          Sentry.captureException(error)
        }
      })
    } else {
      // Otherwise use console
      console.error('[Error]', error, context)
    }
  } catch (e) {
    console.error('[Monitoring] Failed to capture error:', e)
  }
}

// Start performance measurement
export const startMeasurement = (name: string): PerformanceMark | null => {
  if (!ENABLE_MONITORING) return null
  
  try {
    if (performance && performance.mark) {
      performance.mark(`${name}:start`)
      return performance.mark(`${name}:start`)
    }
  } catch (e) {
    console.error('[Monitoring] Error starting measurement:', e)
  }
  
  return null
}

// End performance measurement and log
export const endMeasurement = (name: string, threshold = 500): PerformanceMeasure | null => {
  if (!ENABLE_MONITORING) return null
  
  try {
    if (performance && performance.mark && performance.measure) {
      performance.mark(`${name}:end`)
      const measure = performance.measure(
        name,
        `${name}:start`,
        `${name}:end`
      )
      
      const duration = measure.duration
      
      // Log slow operations
      if (duration > threshold) {
        console.warn(`[Performance] Slow operation: ${name} took ${duration.toFixed(2)}ms`)
        logPerformanceMetric(name, duration, true)
      } else {
        console.debug(`[Performance] ${name}: ${duration.toFixed(2)}ms`)
        logPerformanceMetric(name, duration, false)
      }
      
      return measure
    }
  } catch (e) {
    console.error('[Monitoring] Error ending measurement:', e)
  }
  
  return null
}

// Setup performance monitoring
const setupPerformanceMonitoring = (): void => {
  if (!ENABLE_MONITORING) return
  
  try {
    if ('PerformanceObserver' in window) {
      // Monitor long tasks
      const longTaskObserver = new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach((entry) => {
          console.warn(`[Performance] Long task detected: ${entry.duration.toFixed(2)}ms`)
          logPerformanceMetric('long-task', entry.duration, true)
        })
      })
      
      longTaskObserver.observe({ entryTypes: ['longtask'] })
      
      // Monitor page load metrics
      const pageLoadObserver = new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach((entry) => {
          console.info(`[Performance] ${entry.name}: ${entry.startTime.toFixed(2)}ms`)
          logPerformanceMetric(entry.name, entry.startTime, false)
        })
      })
      
      pageLoadObserver.observe({ entryTypes: ['navigation', 'largest-contentful-paint'] })
      
      // Monitor resource loading
      const resourceObserver = new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach((entry: any) => {
          if (entry.duration > 1000) { // Only log slow resources
            console.warn(`[Performance] Slow resource load: ${entry.name} (${entry.duration.toFixed(2)}ms)`)
            logPerformanceMetric('resource-load', entry.duration, true, { url: entry.name })
          }
        })
      })
      
      resourceObserver.observe({ entryTypes: ['resource'] })
    }
    
    // Log memory usage periodically if available
    if (performance && (performance as any).memory) {
      setInterval(() => {
        const memory = (performance as any).memory
        logPerformanceMetric('memory-usage', memory.usedJSHeapSize / (1024 * 1024), false)
      }, 60000) // Every minute
    }
  } catch (e) {
    console.error('[Monitoring] Error setting up performance monitoring:', e)
  }
}

// Helper to log performance metric to monitoring service
const logPerformanceMetric = (
  name: string,
  value: number,
  isWarning: boolean,
  context?: Record<string, any>
): void => {
  if (!ENABLE_MONITORING) return
  
  try {
    if (SENTRY_DSN) {
      import('@sentry/browser').then(Sentry => {
        Sentry.captureMessage(
          `Performance: ${name} - ${value.toFixed(2)}ms`,
          {
            level: isWarning ? 'warning' : 'info',
            tags: {
              metric: name,
              value: value.toFixed(2),
              ...context,
            },
          }
        )
      })
    }
  } catch (e) {
    console.error('[Monitoring] Error logging performance metric:', e)
  }
}

// Capture custom event
export const captureEvent = (name: string, data?: Record<string, any>): void => {
  if (!ENABLE_MONITORING) return
  
  try {
    if (SENTRY_DSN) {
      import('@sentry/browser').then(Sentry => {
        Sentry.captureMessage(`Event: ${name}`, {
          level: 'info',
          tags: { eventName: name },
          extra: data,
        })
      })
    } else {
      console.info(`[Event] ${name}`, data)
    }
  } catch (e) {
    console.error('[Monitoring] Error capturing event:', e)
  }
}

// Set user information for error tracking
export const setUserInfo = (userId?: string, email?: string, username?: string): void => {
  if (!ENABLE_MONITORING || !SENTRY_DSN) return
  
  try {
    import('@sentry/browser').then(Sentry => {
      Sentry.setUser({
        id: userId || 'anonymous',
        email,
        username,
      })
    })
  } catch (e) {
    console.error('[Monitoring] Error setting user info:', e)
  }
}

// Add breadcrumb for debugging
export const addBreadcrumb = (message: string, category: string, data?: Record<string, any>): void => {
  if (!ENABLE_MONITORING || !SENTRY_DSN) return
  
  try {
    import('@sentry/browser').then(Sentry => {
      Sentry.addBreadcrumb({
        message,
        category,
        data,
        level: 'info',
      })
    })
  } catch (e) {
    console.error('[Monitoring] Error adding breadcrumb:', e)
  }
}