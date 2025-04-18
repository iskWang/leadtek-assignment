import type { ChartTheme, Thresholds } from '../types/common'

export const formatters = {
  bytes: (bytes: number): string => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
  },

  percentage: (value: number): string => 
    `${value.toFixed(1)}%`,

  number: (value: number): string => 
    new Intl.NumberFormat().format(value),

  time: (timestamp: number): string => 
    new Intl.DateTimeFormat('zh-TW', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(timestamp)
}

export const getThresholdColor = (
  value: number, 
  colors: ChartTheme['colors'],
  thresholds?: Thresholds
): string => {
  if (!thresholds) return colors.primary
  
  if (thresholds.critical && value >= thresholds.critical) {
    return colors.critical
  }
  if (thresholds.warning && value >= thresholds.warning) {
    return colors.warning
  }
  return colors.primary
}
