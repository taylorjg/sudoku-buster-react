import React from "react"
import { StyledFrame } from "./frame.styles"

export type FrameProps = {
  onFrameClick: () => void
}

export const Frame: React.FC<React.PropsWithChildren<FrameProps>> = ({ children, onFrameClick }) => {
  return (
    <StyledFrame onClick={onFrameClick}>
      {children}
    </StyledFrame>
  )
}
