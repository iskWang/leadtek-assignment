import type { TimeSeriesPoint, Thresholds } from '../../types/common'

export interface LineChartProps {
  /**
   * 時間序列數據
   */
  data: TimeSeriesPoint[]
  
  /**
   * 圖表標題
   */
  title: string
  
  /**
   * Y 軸標籤
   */
  yAxisLabel?: string
  
  /**
   * 最大顯示數據點數量
   */
  maxItems?: number
  
  /**
   * 警告閾值
   */
  thresholds?: Thresholds
  
  /**
   * 數值格式化函數
   */
  formatValue?: (value: number) => string
  
  /**
   * 時間格式化函數
   */
  formatTime?: (timestamp: number) => string
}
