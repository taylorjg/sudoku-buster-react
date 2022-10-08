import React from "react"
import { Stats } from "./types"
import { StyledStatsPanel } from "./stats-panel.styles"

export type StatsPanelProps = {
  stats: Stats
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
  if (stats.frameCount === 0) return null
  return (
    <StyledStatsPanel>
      <div>Frame count: {stats.frameCount}</div>
      <div>Elapsed time: {(stats.elapsedTime / 1000).toFixed(1)}s</div>
      <div>Frames per second: {stats.fps.toFixed(1)}</div>
    </StyledStatsPanel>
  )
}
