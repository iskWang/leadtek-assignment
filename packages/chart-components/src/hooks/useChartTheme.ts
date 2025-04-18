import { useTheme } from '@mui/material'
import type { ChartTheme } from '../types/common'

export const useChartTheme = (): ChartTheme => {
  const muiTheme = useTheme()
  
  return {
    colors: {
      primary: muiTheme.palette.primary.main,
      warning: muiTheme.palette.warning.main,
      critical: muiTheme.palette.error.main,
      background: muiTheme.palette.background.paper,
      text: muiTheme.palette.text.primary,
      grid: muiTheme.palette.divider
    }
  }
}
