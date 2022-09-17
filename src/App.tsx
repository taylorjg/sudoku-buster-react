import { useState } from "react"
import { CssBaseline } from "@mui/material"
import { Global } from "@emotion/react"
import { GlobalStyles, StyledContent } from "./App.styles"
import { Version } from "components/version"
import { Frame } from "components/frame"
import { VideoCamera } from "components/video-camera"
// import { CornersOverlay } from "components/corners-overlay"
// import { Board } from "components/board"
import { MessagePanel, Messages } from "components/message-panel"

export const App = () => {
  const [currentMessage] = useState(Messages.SCAN_MESSAGE)
  const [showVideoCamera, setShowVideoCamera] = useState(false)

  const onFrameClick = () => {
    console.log("[onFrameClick]")
    setShowVideoCamera(current => !current)
  }

  const onVideoFrame = (imageData: ImageData): void => {
    console.log("[onVideoFrame]", imageData)
  }

  return (
    <>
      <Global styles={GlobalStyles} />
      <CssBaseline />
      <Version />
      <StyledContent>
        <Frame onFrameClick={onFrameClick}>
          {/* <Board /> */}
          {showVideoCamera ? <VideoCamera onVideoFrame={onVideoFrame} /> : null}
        </Frame>
        <MessagePanel message={currentMessage} />
      </StyledContent>
    </>
  )
}
