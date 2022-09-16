import { useState } from "react"
import { CssBaseline } from "@mui/material"
import { Global } from "@emotion/react"
import { GlobalStyles, StyledBoardWrapper } from "./App.styles"
import { Board } from "components/board"
import { MessagePanel, Messages } from "components/message-panel"

const App = () => {
  const [currentMessage] = useState(Messages.SCAN_MESSAGE)
  return (
    <>
      <CssBaseline />
      <Global styles={GlobalStyles} />
      <StyledBoardWrapper>
        <Board />
        <MessagePanel message={currentMessage} />
      </StyledBoardWrapper>
    </>
  )
}

export default App
