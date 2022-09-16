import { useState } from "react"
import { CssBaseline } from "@mui/material"
import { Global } from "@emotion/react"
import { GlobalStyles, StyledContent } from "./App.styles"
import { Frame } from "components/frame"
// import { VideoCamera } from "components/video-camera"
// import { CornersOverlay } from "components/corners-overlay"
import { Board } from "components/board"
import { MessagePanel, Messages } from "components/message-panel"

export const App = () => {
  const [currentMessage] = useState(Messages.SCAN_MESSAGE)

  const onFrameClick = () => {
    console.log("[onFrameClick]")
  }

  return (
    <>
      <Global styles={GlobalStyles} />
      <CssBaseline />
      <StyledContent>
        <Frame onFrameClick={onFrameClick}>
          <Board />
        </Frame>
        <MessagePanel message={currentMessage} />
      </StyledContent>
    </>
  )
}
