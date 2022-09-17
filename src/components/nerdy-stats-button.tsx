import { Tooltip } from "@mui/material"
import { StyledNerdyStatsButton } from "./nerdy-stats-button.styles"

export const NerdyStatsButton = () => {
  return (
    // https://emojipedia.org/nerd-face/
    <Tooltip title="Nerdy Stats (TODO)">
      <StyledNerdyStatsButton>{"\u{1F913}"}</StyledNerdyStatsButton>
    </Tooltip>
  )
}
