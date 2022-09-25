import { useRef, useState } from "react"
import { CssBaseline } from "@mui/material"
import { Global } from "@emotion/react"

import { BoundingBox, Corners, Contour } from "./types"
import { findBoundingBox } from "logic/findBoundingBox"
import { GlobalStyles, StyledContent } from "./App.styles"
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
import { SamplePuzzle } from "sample-puzzle"

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
  const frameCountRef = useRef(0)
  const [mode, setMode] = useState(Mode.Initial)
  const [boundingBox, setBoundingBox] = useState<BoundingBox>({ x: 0, y: 0, width: 0, height: 0 })
  const [corners, setCorners] = useState<Corners>([])
  const [contour, setContour] = useState<Contour>([])
  const message = MessageMap.get(mode)

  const onFrameClick = () => {
    if (mode === Mode.Initial) {
      setMode(Mode.Scanning)
    } else {
      setMode(Mode.Initial)
      frameCountRef.current = 0
    }
  }

  const onCameraNotAvailable = (): void => {
    setMode(Mode.Initial)
  }

  const onVideoFrame = (imageData: ImageData): void => {
    const result = findBoundingBox(imageData)
    if (result) {
      const [x, y, width, height] = result.boundingBox
      setBoundingBox({ x, y, width, height })
      setCorners(result.corners as Corners)
      setContour(result.contour as Contour)
    }
    // if (frameCountRef.current === 300) {
    //   setMode(Mode.Scanned)
    // } else {
    //   frameCountRef.current++
    // }
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
          <Sudoku sudoku={SamplePuzzle} />
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
