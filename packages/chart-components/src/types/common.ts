export type ChartTheme = {
  colors: {
    primary: string
    warning: string
    critical: string
    background: string
    text: string
    grid: string
  }
}

export type Thresholds = {
  warning?: number
  critical?: number
}

export type TimeSeriesPoint = {
  timestamp: number
  value: number
}

export type BarDataPoint = {
  label: string
  value: number
}
