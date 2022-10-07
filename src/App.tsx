import { useEffect, useState } from "react"
import { CssBaseline } from "@mui/material"
import { Global } from "@emotion/react"

import { FindBoundingBoxResult, SolvedSudokuPuzzle } from "logic/types"

import { ToastProvider } from "components/toast-provider"
import { Version } from "components/version"
import { Frame } from "components/frame"
import { VideoCamera } from "components/video-camera"
import { CornersOverlay } from "components/corners-overlay"
import { DiagnosticsOverlay } from "components/diagnostics-overlay"
import { Sudoku } from "components/sudoku"
import { Message } from "components/message"
import { StatsPanel } from "components/stats-panel"
import { DiagnosticsSettingsButton } from "components/diagnostics-settings-button"
import { NerdyStatsButton } from "components/nerdy-stats-button"

import { Stats } from "components/types"
import { useProcessImage } from "./use-process-image"
import { GlobalStyles, StyledContent } from "./App.styles"

enum Mode {
  Initial,
  Scanning,
  Scanned
}

const MessageMap = new Map([
  [Mode.Initial, "Tap the big square to scan a puzzle"],
  [Mode.Scanning, "Tap the big square to cancel"],
  [Mode.Scanned, "Tap the big square to start over"],
])

const ZeroStats = {
  frameCount: 0,
  startTime: 0,
  elapsedTime: 0
}

export const App = () => {
  const [mode, setMode] = useState(Mode.Initial)
  const [findBoundingBoxResult, setFindBoundingBoxResult] = useState<FindBoundingBoxResult | undefined>()
  const [solvedSudokuPuzzle, setSolvedSudokuPuzzle] = useState<SolvedSudokuPuzzle | undefined>()
  const [stats, setStats] = useState<Stats>(ZeroStats)
  const [diagnosticsSettings, setDiagnosticsSettings] = useState({
    showBoundingBox: false,
    showCorners: false,
    showContour: false
  })
  const message = MessageMap.get(mode)
  const { processImage } = useProcessImage()

  const onFrameClick = () => {
    if (mode === Mode.Initial) {
      setFindBoundingBoxResult(undefined)
      setSolvedSudokuPuzzle(undefined)
      setMode(Mode.Scanning)
      setStats({ ...ZeroStats, startTime: Math.floor(performance.now()) })
      performance.clearMeasures()
    } else {
      setMode(Mode.Initial)
    }
  }

  const onCameraNotAvailable = (): void => {
    setMode(Mode.Initial)
  }

  useEffect(() => {
    console.log(JSON.stringify(stats))
  }, [stats])

  const onVideoFrame = (imageData: ImageData): void => {
    const processImageResult = processImage(imageData)
    setStats(currentStats => {
      const now = performance.now()
      return {
        ...currentStats,
        frameCount: currentStats.frameCount + 1,
        elapsedTime: Math.floor(now - currentStats.startTime)
      }
    })
    if (processImageResult?.solvedSudokuPuzzle) {
      setSolvedSudokuPuzzle(processImageResult.solvedSudokuPuzzle)
      setMode(Mode.Scanned)
    } else {
      setFindBoundingBoxResult(processImageResult?.findBoundingBoxResult)
    }
  }

  const renderFrameContent = () => {
    switch (mode) {
      case Mode.Initial:
        return null
      case Mode.Scanning:
        return (
          <>
            <VideoCamera
              onCameraNotAvailable={onCameraNotAvailable}
              onVideoFrame={onVideoFrame}
            />
            <CornersOverlay />
            <DiagnosticsOverlay
              diagnosticsSettings={diagnosticsSettings}
              findBoundingBoxResult={findBoundingBoxResult}
            />
          </>
        )
      case Mode.Scanned:
        return solvedSudokuPuzzle
          ? <Sudoku solvedSudokuPuzzle={solvedSudokuPuzzle} />
          : null
      default:
        return null
    }
  }

  return (
    <ToastProvider>
      <Global styles={GlobalStyles} />
      <CssBaseline />
      <Version />
      <StyledContent>
        <Frame onFrameClick={onFrameClick}>
          {renderFrameContent()}
        </Frame>
        {message && <Message message={message} />}
        <StatsPanel stats={stats} />
      </StyledContent>
      <DiagnosticsSettingsButton
        diagnosticsSettings={diagnosticsSettings}
        onChange={setDiagnosticsSettings}
      />
      <NerdyStatsButton />
    </ToastProvider>
  )
}
