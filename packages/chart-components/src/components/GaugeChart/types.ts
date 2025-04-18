import type { Thresholds } from '../../types/common'

export interface GaugeChartProps {
  /**
   * 當前值（0-100）
   */
  value: number
  
  /**
   * 圖表標題
   */
  title: string
  
  /**
   * 警告閾值
   */
  thresholds?: Thresholds
  
  /**
   * 最小值
   * @default 0
   */
  min?: number
  
  /**
   * 最大值
   * @default 100
   */
  max?: number
  
  /**
   * 數值格式化函數
   */
  formatValue?: (value: number) => string
}
