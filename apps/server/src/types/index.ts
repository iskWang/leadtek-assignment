export interface SystemMetrics {
  cpu: {
    usage: number
    temperature: number
    cores: number
  }
  memory: {
    total: number
    used: number
    free: number
    usagePercentage: number
  }
  disk: {
    total: number
    used: number
    free: number
    usagePercentage: number
  }
  timestamp: number
}

export interface ErrorResponse {
  error: string
  message: string
  timestamp: number
}
