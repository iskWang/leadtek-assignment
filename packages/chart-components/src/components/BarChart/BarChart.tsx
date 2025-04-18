import { Box } from '@mui/material'
import { BarChart as MuiBarChart } from '@mui/x-charts'
import { useChartTheme } from '../../hooks/useChartTheme'
import { formatters, getThresholdColor } from '../../utils/format'
import type { BarChartProps } from './types'

export const BarChart = ({
  data,
  title,
  yAxisLabel,
  thresholds,
  formatValue = formatters.percentage,
}: BarChartProps) => {
  const theme = useChartTheme()

  return (
    <Box sx={{ width: '100%', height: 300 }}>
      <MuiBarChart
        dataset={data.map(d => ({
          ...d,
          color: getThresholdColor(d.value, theme.colors, thresholds)
        }))}
        series={[
          {
            dataKey: 'value',
            label: title,
            valueFormatter: (value: number | null) => value !== null ? formatValue(value) : '',
          },
        ]}
        xAxis={[{
          dataKey: 'label',
          scaleType: 'band',
        }]}
        yAxis={[{
          label: yAxisLabel,
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
