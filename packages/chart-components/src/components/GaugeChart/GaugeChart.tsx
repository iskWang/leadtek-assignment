import { Box, Typography } from '@mui/material'
import { PieChart } from '@mui/x-charts'
import { useChartTheme } from '../../hooks/useChartTheme'
import { formatters, getThresholdColor } from '../../utils/format'
import type { GaugeChartProps } from './types'

export const GaugeChart = ({
  value,
  title,
  thresholds,
  min = 0,
  max = 100,
  formatValue = formatters.percentage,
}: GaugeChartProps) => {
  const theme = useChartTheme()
  
  // 確保值在範圍內
  const normalizedValue = Math.min(Math.max(value, min), max)
  const remaining = max - normalizedValue
  
  // 取得當前值的顏色
  const valueColor = getThresholdColor(normalizedValue, theme.colors, thresholds)

  return (
    <Box 
      sx={{ 
        width: '100%',
        height: 300,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: theme.colors.text,
          mb: 2
        }}
      >
        {title}
      </Typography>
      
      <Box sx={{ flex: 1, width: '100%', position: 'relative' }}>
        <PieChart
          series={[
            {
              data: [
                { value: normalizedValue, color: valueColor },
                { value: remaining, color: theme.colors.grid }
              ],
              innerRadius: 0.7,
              startAngle: -90,
              endAngle: 90,
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { additionalRadius: -10 },
            },
          ]}
          slotProps={{
            legend: {
              hidden: true
            }
          }}
        />
        
        <Typography
          variant="h4"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: valueColor
          }}
        >
          {formatValue(normalizedValue)}
        </Typography>
      </Box>
    </Box>
  )
}
