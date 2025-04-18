import { Box } from '@mui/material'
import { LineChart as MuiLineChart } from '@mui/x-charts'
import { useChartTheme } from '../../hooks/useChartTheme'
import { formatters, getThresholdColor } from '../../utils/format'
import type { LineChartProps } from './types'

export const LineChart = ({
  data,
  title,
  yAxisLabel,
  maxItems = 60,
  thresholds,
  formatValue = formatters.percentage,
  formatTime = formatters.time,
}: LineChartProps) => {
  const theme = useChartTheme()
  
  // 只取最新的 N 筆數據
  const chartData = data.slice(-maxItems)
  
  // 取得最新數值的顏色
  const currentValue = chartData[chartData.length - 1]?.value ?? 0
  const lineColor = getThresholdColor(currentValue, theme.colors, thresholds)

  return (
    <Box sx={{ width: '100%', height: 300 }}>
      <MuiLineChart
        series={[
          {
            data: chartData.map(d => d.value),
            label: title,
            color: lineColor,
          },
        ]}
        xAxis={[{
          data: chartData.map(d => d.timestamp),
          scaleType: 'time',
          valueFormatter: formatTime,
        }]}
        yAxis={[{
          label: yAxisLabel,
          valueFormatter: formatValue,
        }]}
        sx={{
          '.MuiChartsAxis-line': {
            stroke: theme.colors.grid,
          },
          '.MuiChartsAxis-tick': {
            stroke: theme.colors.grid,
          },
          '.MuiChartsAxis-label': {
            fill: theme.colors.text,
          },
          '.MuiChartsLegend-label': {
            fill: theme.colors.text,
          },
        }}
      />
    </Box>
  )
}
