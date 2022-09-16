import styled from "@emotion/styled"
import { css } from "@emotion/react"

export const GlobalStyles = css`
  body, html, #root {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
  }
`

export const StyledBoardWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: .25rem;
`
