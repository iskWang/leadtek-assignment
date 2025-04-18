import type { BarDataPoint, Thresholds } from '../../types/common'

export interface BarChartProps {
  /**
   * 條形圖數據
   */
  data: BarDataPoint[]
  
  /**
   * 圖表標題
   */
  title: string
  
  /**
   * Y 軸標籤
   */
  yAxisLabel?: string
  
  /**
   * 警告閾值
   */
  thresholds?: Thresholds
  
  /**
   * 數值格式化函數
   */
  formatValue?: (value: number) => string
}
