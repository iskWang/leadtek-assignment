import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import metricsRoutes from './routes/metrics'
import { getMetrics } from './services/metrics'

const app = express()
const httpServer = createServer(app)
const WS_PATH = process.env.WS_PATH || '/ws'
const io = new Server(httpServer, {
  path: WS_PATH,
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3002',
    methods: ['GET', 'POST'],
  },
})

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/metrics', metricsRoutes)

// WebSocket setup
const setupWebSocket = (socket: any) => {
  console.log('Client connected')
  
  const emitMetrics = async () => {
    try {
      const metrics = await getMetrics()
      socket.emit('metrics', metrics)
    } catch (error) {
      console.error('Error fetching metrics:', error)
    }
  }

  const interval = setInterval(emitMetrics, 1000)

  socket.on('disconnect', () => {
    console.log('Client disconnected')
    clearInterval(interval)
  })
}

io.on('connection', setupWebSocket)

const PORT = process.env.PORT || 3001

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
