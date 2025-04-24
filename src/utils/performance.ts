/**
 * Tracks and logs component render times for performance monitoring
 */
export const trackRenderTime = (componentName: string): (() => void) => {
  // Only run in development or if explicitly enabled in production
  if (!import.meta.env.DEV && !import.meta.env.VITE_ENABLE_PERFORMANCE_TRACKING) {
    return () => {}
  }

  const startTime = performance.now()
  return () => {
    const endTime = performance.now()
    const renderTime = endTime - startTime
    if (renderTime > 50) { // Only log slow renders (>50ms)
      console.warn(`[Performance] ${componentName} took ${renderTime.toFixed(2)}ms to render.`)
    } else {
      console.info(`[Performance] ${componentName} rendered in ${renderTime.toFixed(2)}ms.`)
    }
  }
}

/**
 * Measures page load time from navigation start to fully loaded
 */
export const measurePageLoadTime = (): void => {
  window.addEventListener('load', () => {
    if (window.performance) {
      const perfData = window.performance.timing
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart
      const domLoadTime = perfData.domComplete - perfData.domLoading

      console.info(`[Performance] Total page load time: ${pageLoadTime}ms`)
      console.info(`[Performance] DOM load time: ${domLoadTime}ms`)
      
      if (pageLoadTime > 500) {
        console.warn('[Performance] Page load time exceeded 500ms threshold')
      }
    }
  })
}

/**
 * Memoizes expensive calculations to improve performance
 */
export function memoize<T, R>(fn: (arg: T) => R): (arg: T) => R {
  const cache = new Map<T, R>()
  
  return (arg: T): R => {
    if (cache.has(arg)) {
      return cache.get(arg)!
    }
    
    const result = fn(arg)
    cache.set(arg, result)
    return result
  }
}