import { BoundingBox, Corners, Contour } from "types"
import { StyledDiagnosticsOverlay } from "./diagnostics-overlay.styles"

const VIEWPORT_WIDTH = 100
const VIEWPORT_HEIGHT = 100

const WASM_INTERNAL_IMAGE_WIDTH = 224
const WASM_INTERNAL_IMAGE_HEIGHT = 224

const SCALE_X = VIEWPORT_WIDTH / WASM_INTERNAL_IMAGE_WIDTH
const SCALE_Y = VIEWPORT_HEIGHT / WASM_INTERNAL_IMAGE_HEIGHT

const BOUNDING_BOX_COLOUR = "#0000FF"
const CORNERS_COLOUR = "#FF00FF"
const CONTOUR_COLOUR = "#FF0000"

export type DiagnosticsOverlayProps = {
  boundingBox: BoundingBox
  corners: Corners
  contour: Contour
}

export const DiagnosticsOverlay: React.FC<DiagnosticsOverlayProps> = (props: DiagnosticsOverlayProps) => {

  const renderBoundingBox = (boundingBox: BoundingBox) => {
    const { x, y, width, height } = boundingBox
    if (width === 0 || height === 0) return null
    return (
      <rect
        x={x * SCALE_X}
        y={y * SCALE_Y}
        width={width * SCALE_X}
        height={height * SCALE_Y}
        stroke={BOUNDING_BOX_COLOUR}
        strokeWidth={SCALE_X}
        fill="none"
      />
    )
  }

  const renderCorners = (corners: Corners) => {
    if (corners.length === 0) return null
    const points = corners.map(({ x, y }) => `${x * SCALE_X},${y * SCALE_Y}`).join(" ")
    return (
      <polygon
        points={points}
        stroke={CORNERS_COLOUR}
        strokeWidth={SCALE_X}
        fill="none"
      />
    )
  }

  const renderContour = (contour: Contour) => {
    if (contour.length === 0) return null
    const points = contour.map(({ x, y }) => `${x * SCALE_X},${y * SCALE_Y}`).join(" ")
    return (
      <polygon
        points={points}
        stroke={CONTOUR_COLOUR}
        strokeWidth={SCALE_X}
        fill="none"
      />
    )
  }

  return (
    <StyledDiagnosticsOverlay viewBox="0 0 100 100">
      <>
        {renderBoundingBox(props.boundingBox)}
        {renderCorners(props.corners)}
        {renderContour(props.contour)}
      </>
    </StyledDiagnosticsOverlay>
  )
}
