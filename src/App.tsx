import { Container, CssBaseline, Button } from "@mui/material"
import Board from "components/board"
import { StyledBoardWrapper, StyledButtons } from "./App.styles"

const App = () => {
  return (
    <>
      <CssBaseline />
      <Container>
        <StyledBoardWrapper>
          <Board />
          <StyledButtons>
            <Button size="small" variant="contained">Scan</Button>
            <Button size="small" variant="contained">Cancel</Button>
          </StyledButtons>
        </StyledBoardWrapper>
      </Container>
    </>
  )
}

export default App
