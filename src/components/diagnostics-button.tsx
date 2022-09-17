import { Tooltip } from "@mui/material"
import { StyledDiagnosticsButton } from "./diagnostics-button.styles"

export const DiagnosticsButton = () => {
  return (
    // https://emojipedia.org/microscope/
    <Tooltip title="Diagnostics (TODO)">
      <StyledDiagnosticsButton>{"\u{1F52C}"}</StyledDiagnosticsButton>
    </Tooltip>
  )
}
