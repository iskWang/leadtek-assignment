import { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Grid2,
  ThemeProvider,
  createTheme,
} from '@mui/material'
import { io } from 'socket.io-client'
import { LineChart, BarChart, GaugeChart } from '@leadtek/chart-components'
import type { TimeSeriesPoint } from '@leadtek/chart-components'

// 配置
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'
const WS_PATH = import.meta.env.VITE_WS_PATH || '/ws'

// 定義主題
const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})

// 定義警告閾值
const thresholds = {
  warning: 70,
  critical: 90,
}

export const App = () => {
  // 狀態管理
  const [cpuHistory, setCpuHistory] = useState<TimeSeriesPoint[]>([])
  const [memoryHistory, setMemoryHistory] = useState<TimeSeriesPoint[]>([])
  const [diskHistory, setDiskHistory] = useState<TimeSeriesPoint[]>([])
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // 創建 socket 連接
    const socket = io(API_URL, {
      path: WS_PATH,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    })

    // 連接狀態處理
    socket.on('connect', () => {
      console.log('Connected to WebSocket')
      setIsConnected(true)
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket')
      setIsConnected(false)
    })

    socket.on('connect_error', (error) => {
      console.error('Connection error:', error)
      setIsConnected(false)
    })

    // 監聽系統指標更新
    socket.on('metrics', (metrics) => {
      const timestamp = Date.now()

      setCpuHistory((prev) =>
        [...prev, { timestamp, value: metrics.cpu.usage }].slice(-60)
      )
      setMemoryHistory((prev) =>
        [...prev, { timestamp, value: metrics.memory.usagePercentage }].slice(
          -60
        )
      )
      setDiskHistory((prev) =>
        [...prev, { timestamp, value: metrics.disk.usagePercentage }].slice(-60)
      )
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  // 取得最新值
  const currentCpu = cpuHistory[cpuHistory.length - 1]?.value ?? 0
  const currentMemory = memoryHistory[memoryHistory.length - 1]?.value ?? 0
  const currentDisk = diskHistory[diskHistory.length - 1]?.value ?? 0

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* 連接狀態 */}
        <Box sx={{ mb: 2, color: isConnected ? 'success.main' : 'error.main' }}>
          Status: {isConnected ? 'Connected' : 'Disconnected'}
        </Box>
        <Grid2 container spacing={3}>
          {/* CPU 使用率 */}
          <Grid2 size={{ xs: 12, md: 4 }}>
            <GaugeChart
              value={currentCpu}
              title="CPU Usage"
              thresholds={thresholds}
            />
          </Grid2>

          {/* 記憶體使用率 */}
          <Grid2 size={{ xs: 12, md: 4 }}>
            <GaugeChart
              value={currentMemory}
              title="Memory Usage"
              thresholds={thresholds}
            />
          </Grid2>

          {/* 硬碟使用率 */}
          <Grid2 size={{ xs: 12, md: 4 }}>
            <GaugeChart
              value={currentDisk}
              title="Disk Usage"
              thresholds={thresholds}
            />
          </Grid2>

          {/* 資源使用比較 */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
              <BarChart
                data={[
                  { label: 'CPU', value: currentCpu },
                  { label: 'Memory', value: currentMemory },
                  { label: 'Disk', value: currentDisk },
                ]}
                title="Resource Usage Comparison"
                yAxisLabel="%"
                thresholds={thresholds}
              />
            </Box>
          </Grid2>

          {/* CPU 歷史趨勢 */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
              <LineChart
                data={cpuHistory}
                title="CPU Usage History"
                yAxisLabel="%"
                thresholds={thresholds}
              />
            </Box>
          </Grid2>
        </Grid2>
      </Container>
    </ThemeProvider>
  )
}
