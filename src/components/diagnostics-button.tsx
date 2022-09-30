import React, { useState } from "react"
import { Drawer, FormControl, FormControlLabel, FormLabel, Switch, Tooltip } from "@mui/material"
import { StyledDiagnosticsButton } from "./diagnostics-button.styles"
import { DiagnosticsSettings } from "./types"

// https://emojipedia.org/microscope/
const MICROSCOPE_EMOJI = "\u{1F52C}"

export type DiagnosticsButtonProps = {
  diagnosticsSettings: DiagnosticsSettings
  onChange: (diagnosticsSettings: DiagnosticsSettings) => void
}

export const DiagnosticsButton: React.FC<DiagnosticsButtonProps> = ({ diagnosticsSettings, onChange }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const openDrawer = () => {
    setIsDrawerOpen(true)
  }

  const closeDrawer = () => {
    setIsDrawerOpen(false)
  }

  return (
    <>
      <Tooltip title="Diagnostics (TODO)">
        <StyledDiagnosticsButton onClick={openDrawer}>{MICROSCOPE_EMOJI}</StyledDiagnosticsButton>
      </Tooltip>
      <Drawer anchor="bottom" open={isDrawerOpen} onClose={closeDrawer}>
        <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <FormControl>
            <FormLabel id="bounding-box-label">Bounding Box</FormLabel>
            <FormControlLabel
              sx={{ mt: ".25rem" }}
              control={
                <Switch
                  aria-labelledby="bounding-box-label"
                  size="small"
                  checked={diagnosticsSettings.showBoundingBox}
                  onClick={() => onChange({
                    ...diagnosticsSettings,
                    showBoundingBox: !diagnosticsSettings.showBoundingBox
                  })}
                />
              }
              label={"On"}
            />
          </FormControl>
          <FormControl>
            <FormLabel id="corners-label">Corners</FormLabel>
            <FormControlLabel
              sx={{ mt: ".25rem" }}
              control={
                <Switch
                  aria-labelledby="corners-label"
                  size="small"
                  checked={diagnosticsSettings.showCorners}
                  onClick={() => onChange({
                    ...diagnosticsSettings,
                    showCorners: !diagnosticsSettings.showCorners
                  })}
                />
              }
              label={"On"}
            />
          </FormControl>
          <FormControl>
            <FormLabel id="contour-label">Contour</FormLabel>
            <FormControlLabel
              sx={{ mt: ".25rem" }}
              control={
                <Switch
                  aria-labelledby="contour-label"
                  size="small"
                  checked={diagnosticsSettings.showContour}
                  onClick={() => onChange({
                    ...diagnosticsSettings,
                    showContour: !diagnosticsSettings.showContour
                  })}
                />
              }
              label={"On"}
            />
          </FormControl>
        </div>
      </Drawer>
    </>
  )
}
