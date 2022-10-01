import React, { useState } from "react"
import { Tooltip } from "@mui/material"
import { DiagnosticsSettings } from "./types"
import { DiagnosticsSettingsPanel } from "./diagnostics-settings-panel"
import { StyledDiagnosticsButton } from "./diagnostics-button.styles"

// https://emojipedia.org/microscope/
const MICROSCOPE_EMOJI = "\u{1F52C}"

export type DiagnosticsButtonProps = {
  diagnosticsSettings: DiagnosticsSettings
  onChange: (diagnosticsSettings: DiagnosticsSettings) => void
}

export const DiagnosticsButton: React.FC<DiagnosticsButtonProps> = ({
  diagnosticsSettings,
  onChange
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const openDrawer = () => {
    setIsDrawerOpen(true)
  }

  const closeDrawer = () => {
    setIsDrawerOpen(false)
  }

  return (
    <>
      <Tooltip title="Diagnostics Settings">
        <StyledDiagnosticsButton onClick={openDrawer}>{MICROSCOPE_EMOJI}</StyledDiagnosticsButton>
      </Tooltip>
      <DiagnosticsSettingsPanel
        isDrawerOpen={isDrawerOpen}
        closeDrawer={closeDrawer}
        diagnosticsSettings={diagnosticsSettings}
        onChange={onChange}
      />
    </>
  )
}
