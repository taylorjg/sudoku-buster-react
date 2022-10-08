import React, { useState } from "react"
import { Tooltip } from "@mui/material"
import { NerdyStatsSettings } from "./types"
import { NerdyStatsSettingsPanel } from "./nerdy-stats-settings-panel"
import { StyledNerdyStatsSettingsButton } from "./nerdy-stats-settings-button.styles"

// https://emojipedia.org/nerd-face/
const NERD_FACE_EMOJI = "\u{1F913}"

export type NerdyStatsSettingsButtonProps = {
  nerdyStatsSettings: NerdyStatsSettings
  onChange: (nerdyStatsSettings: NerdyStatsSettings) => void
}

export const NerdyStatsSettingsButton: React.FC<NerdyStatsSettingsButtonProps> = ({
  nerdyStatsSettings,
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
      <Tooltip title="Nerdy Stats">
        <StyledNerdyStatsSettingsButton onClick={openDrawer}>
          {NERD_FACE_EMOJI}
        </StyledNerdyStatsSettingsButton>
      </Tooltip>
      <NerdyStatsSettingsPanel
        isDrawerOpen={isDrawerOpen}
        closeDrawer={closeDrawer}
        nerdyStatsSettings={nerdyStatsSettings}
        onChange={onChange}
      />
    </>
  )
}
