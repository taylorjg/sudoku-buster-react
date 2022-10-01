import React, { useState } from "react"
import { Tooltip } from "@mui/material"
import { DiagnosticsSettings } from "./types"
import { DiagnosticsSettingsPanel } from "./diagnostics-settings-panel"
import { StyledDiagnosticsSettingsButton } from "./diagnostics-settings-button.styles"

// https://emojipedia.org/microscope/
const MICROSCOPE_EMOJI = "\u{1F52C}"

export type DiagnosticsSettingsButtonProps = {
  diagnosticsSettings: DiagnosticsSettings
  onChange: (diagnosticsSettings: DiagnosticsSettings) => void
}

export const DiagnosticsSettingsButton: React.FC<DiagnosticsSettingsButtonProps> = ({
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
        <StyledDiagnosticsSettingsButton onClick={openDrawer}>
          {MICROSCOPE_EMOJI}
        </StyledDiagnosticsSettingsButton>
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
