import { useState } from "react"
import { CssBaseline } from "@mui/material"
import { Global } from "@emotion/react"

import { BoundingBox, Corners, Contour } from "logic/types"
import { SudokuPuzzle } from "logic/sudoku-puzzle"

import { ToastProvider } from "components/toast-provider"
import { Version } from "components/version"
import { Frame } from "components/frame"
import { VideoCamera } from "components/video-camera"
import { CornersOverlay } from "components/corners-overlay"
import { DiagnosticsOverlay } from "components/diagnostics-overlay"
import { Sudoku } from "components/sudoku"
import { Message } from "components/message"
import { DiagnosticsButton } from "components/diagnostics-button"
import { NerdyStatsButton } from "components/nerdy-stats-button"

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

export const App = () => {
  const [mode, setMode] = useState(Mode.Initial)
  const [boundingBox, setBoundingBox] = useState<BoundingBox>({ x: 0, y: 0, width: 0, height: 0 })
  const [corners, setCorners] = useState<Corners>(Array(4).fill({ x: 0, y: 0 }) as Corners)
  const [contour, setContour] = useState<Contour>([])
  const [solvedSudokuPuzzle, setSolvedSudokuPuzzle] = useState<SudokuPuzzle | undefined>()
  const message = MessageMap.get(mode)
  const { processImage } = useProcessImage()

  const onFrameClick = () => {
    if (mode === Mode.Initial) {
      setMode(Mode.Scanning)
      performance.clearMeasures()
    } else {
      setMode(Mode.Initial)
    }
  }

  const onCameraNotAvailable = (): void => {
    setMode(Mode.Initial)
  }

  const onVideoFrame = (imageData: ImageData): void => {
    const result = processImage(imageData)
    if (result) {
      if (result.solvedSudokuPuzzle) {
        setSolvedSudokuPuzzle(result.solvedSudokuPuzzle)
        setMode(Mode.Scanned)
      } else {
        setBoundingBox(result.boundingBox)
        setCorners(result.corners)
        setContour(result.contour)
      }
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
              boundingBox={boundingBox}
              corners={corners}
              contour={contour}
            />
          </>
        )
      case Mode.Scanned:
        return (
          <Sudoku sudoku={solvedSudokuPuzzle!} />
        )
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
      </StyledContent>
      <DiagnosticsButton />
      <NerdyStatsButton />
    </ToastProvider>
  )
}
