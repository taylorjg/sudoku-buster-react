import { Tooltip } from "@mui/material"
import { StyledNerdyStatsButton } from "./nerdy-stats-button.styles"

// https://emojipedia.org/nerd-face/
const NERD_FACE_EMOJI = "\u{1F913}"

export const NerdyStatsButton = () => {
  return (
    <Tooltip title="Nerdy Stats (TODO)">
      <StyledNerdyStatsButton>{NERD_FACE_EMOJI}</StyledNerdyStatsButton>
    </Tooltip>
  )
}
