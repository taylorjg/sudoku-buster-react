import { StyledFrame } from "./frame.styles"

export type FrameProps = {
  children: React.ReactNode
  onFrameClick: () => void
}

export const Frame: React.FC<FrameProps> = ({ children, onFrameClick }) => {
  return (
    <StyledFrame onClick={onFrameClick}>
      {children}
    </StyledFrame>
  )
}
