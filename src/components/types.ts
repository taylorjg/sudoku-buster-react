export type DiagnosticsSettings = {
  showBoundingBox: boolean
  showCorners: boolean
  showContour: boolean
}

export type NerdyStatsSettings = {
  showNerdyStats: boolean
}

export type Stats = {
  startTime: number
  elapsedTime: number
  frameCount: number
  frameCountThisSecond: number
  fpsTime: number
  fps: number
}
