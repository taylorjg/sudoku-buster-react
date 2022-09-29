import { useState } from "react"
import { CssBaseline } from "@mui/material"
import { Global } from "@emotion/react"

import { FindBoundingBoxResult } from "logic/types"
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
  const [findBoundingBoxResult, setFindBoundingBoxResult] = useState<FindBoundingBoxResult | undefined>()
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
    const processImageResult = processImage(imageData)
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
            <DiagnosticsOverlay findBoundingBoxResult={findBoundingBoxResult} />
          </>
        )
      case Mode.Scanned:
        return solvedSudokuPuzzle ? <Sudoku solvedSudokuPuzzle={solvedSudokuPuzzle} /> : null
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
