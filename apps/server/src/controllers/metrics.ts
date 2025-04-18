import { Request, Response } from 'express'
import { getMetrics } from '../services/metrics'
import { ErrorResponse } from '../types'

export const getSystemMetrics = async (_req: Request, res: Response) => {
  try {
    const metrics = await getMetrics()
    res.json(metrics)
  } catch (error) {
    const errorResponse: ErrorResponse = {
      error: 'InternalServerError',
      message: 'Failed to fetch system metrics',
      timestamp: Date.now(),
    }
    res.status(500).json(errorResponse)
  }
}
