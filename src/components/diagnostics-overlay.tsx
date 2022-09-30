import { BoundingBox, Contour, Corners, FindBoundingBoxResult } from "logic/types"
import { StyledDiagnosticsOverlay } from "./diagnostics-overlay.styles"
import { DiagnosticsSettings } from "./types"
import * as C from "./constants"

const BOUNDING_BOX_COLOUR = "#0000FF"
const CORNERS_COLOUR = "#FF00FF"
const CONTOUR_COLOUR = "#FF0000"

export type DiagnosticsOverlayProps = {
  diagnosticsSettings: DiagnosticsSettings
  findBoundingBoxResult: FindBoundingBoxResult | undefined
}

export const DiagnosticsOverlay: React.FC<DiagnosticsOverlayProps> = ({
  diagnosticsSettings,
  findBoundingBoxResult
}) => {

  const renderBoundingBox = (boundingBox: BoundingBox) => {
    if (!diagnosticsSettings.showBoundingBox) return
    const { x, y, width, height } = boundingBox
    return (
      <rect
        x={x * C.SCALING_FACTOR}
        y={y * C.SCALING_FACTOR}
        width={width * C.SCALING_FACTOR}
        height={height * C.SCALING_FACTOR}
        stroke={BOUNDING_BOX_COLOUR}
        strokeWidth={C.SCALING_FACTOR}
        fill="none"
      />
    )
  }

  const renderCorners = (corners: Corners) => {
    if (!diagnosticsSettings.showCorners) return
    const points = corners.map(({ x, y }) => `${x * C.SCALING_FACTOR},${y * C.SCALING_FACTOR}`).join(" ")
    return (
      <polygon
        points={points}
        stroke={CORNERS_COLOUR}
        strokeWidth={C.SCALING_FACTOR}
        fill="none"
      />
    )
  }

  const renderContour = (contour: Contour) => {
    if (!diagnosticsSettings.showContour) return
    const points = contour.map(({ x, y }) => `${x * C.SCALING_FACTOR},${y * C.SCALING_FACTOR}`).join(" ")
    return (
      <polygon
        points={points}
        stroke={CONTOUR_COLOUR}
        strokeWidth={C.SCALING_FACTOR}
        fill="none"
      />
    )
  }

  return findBoundingBoxResult
    ? (
      <StyledDiagnosticsOverlay viewBox={`0 0 ${C.VIEWPORT_SIZE} ${C.VIEWPORT_SIZE}`}>
        <>
          {renderBoundingBox(findBoundingBoxResult.boundingBox)}
          {renderCorners(findBoundingBoxResult.corners)}
          {renderContour(findBoundingBoxResult.contour)}
        </>
      </StyledDiagnosticsOverlay>
    )
    : null
}
