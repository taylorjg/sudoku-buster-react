import styled from "@emotion/styled"

const FRAME_SIZE = 400

export const StyledFrame = styled.div`
  position: relative;
  width: ${FRAME_SIZE}px;
  height: ${FRAME_SIZE}px;
  max-width: min(90vw, 90vh);
  max-height: min(90vw, 90vh);
  border: 1px solid darkblue;
  cursor: pointer;
`
