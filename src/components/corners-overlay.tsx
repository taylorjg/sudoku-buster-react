import { StyledCornersOverlay, StyledPath } from "./corners-overlay.styles"
import * as C from "./constants"

export const CornersOverlay = () => {
  return (
    <StyledCornersOverlay viewBox={`0 0 ${C.VIEWPORT_SIZE} ${C.VIEWPORT_SIZE}`}>
      <StyledPath d="M15,5 h-10 v10" />
      <StyledPath d="M85,5 h10 v10" />
      <StyledPath d="M85,95 h10 v-10" />
      <StyledPath d="M15,95 h-10 v-10" />
    </StyledCornersOverlay>
  )
}
