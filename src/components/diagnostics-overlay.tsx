import { BoundingBox, Corners, Contour } from "logic/types"
import { StyledDiagnosticsOverlay } from "./diagnostics-overlay.styles"

const VIEWPORT_SIZE = 100
const WASM_INTERNAL_IMAGE_SIZE = 224
const SCALING_FACTOR = VIEWPORT_SIZE / WASM_INTERNAL_IMAGE_SIZE

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
    return (
      <rect
        x={x * SCALING_FACTOR}
        y={y * SCALING_FACTOR}
        width={width * SCALING_FACTOR}
        height={height * SCALING_FACTOR}
        stroke={BOUNDING_BOX_COLOUR}
        strokeWidth={SCALING_FACTOR}
        fill="none"
      />
    )
  }

  const renderCorners = (corners: Corners) => {
    const points = corners.map(({ x, y }) => `${x * SCALING_FACTOR},${y * SCALING_FACTOR}`).join(" ")
    return (
      <polygon
        points={points}
        stroke={CORNERS_COLOUR}
        strokeWidth={SCALING_FACTOR}
        fill="none"
      />
    )
  }

  const renderContour = (contour: Contour) => {
    const points = contour.map(({ x, y }) => `${x * SCALING_FACTOR},${y * SCALING_FACTOR}`).join(" ")
    return (
      <polygon
        points={points}
        stroke={CONTOUR_COLOUR}
        strokeWidth={SCALING_FACTOR}
        fill="none"
      />
    )
  }

  return (
    <StyledDiagnosticsOverlay viewBox={`0 0 ${VIEWPORT_SIZE} ${VIEWPORT_SIZE}`}>
      <>
        {renderBoundingBox(props.boundingBox)}
        {renderCorners(props.corners)}
        {renderContour(props.contour)}
      </>
    </StyledDiagnosticsOverlay>
  )
}
