import si from 'systeminformation'
import { SystemMetrics } from '../types'

const getCpuMetrics = async () => {
  const [load, temp] = await Promise.all([
    si.currentLoad(),
    si.cpuTemperature(),
  ])

  return {
    usage: Math.round(load.currentLoad),
    temperature: Math.round(temp.main || 0),
    cores: load.cpus.length,
  }
}

const getMemoryMetrics = async () => {
  const mem = await si.mem()
  const { total, used, free } = mem
  const usagePercentage = Math.round((used / total) * 100)

  return {
    total,
    used,
    free,
    usagePercentage,
  }
}

const getDiskMetrics = async () => {
  const filesystems = await si.fsSize()
  const [mainFs] = filesystems // 使用主要檔案系統

  const total = mainFs.size
  const used = mainFs.used
  const free = mainFs.size - mainFs.used
  const usagePercentage = Math.round((used / total) * 100)

  return {
    total,
    used,
    free,
    usagePercentage,
  }
}

export const getMetrics = async (): Promise<SystemMetrics> => {
  const [cpu, memory, disk] = await Promise.all([
    getCpuMetrics(),
    getMemoryMetrics(),
    getDiskMetrics(),
  ])

  return {
    cpu,
    memory,
    disk,
    timestamp: Date.now(),
  }
}
