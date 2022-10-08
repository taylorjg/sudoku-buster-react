import { Divider, Drawer, FormControlLabel, IconButton, FormGroup, Switch, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { StyledPanelContent, StyledPanelTitle } from "./common-settings-panel.styles"
import { NerdyStatsSettings } from "./types"

export type NerdyStatsSettingsPanelProps = {
  isDrawerOpen: boolean
  closeDrawer: () => void
  nerdyStatsSettings: NerdyStatsSettings
  onChange: (nerdyStatsSettings: NerdyStatsSettings) => void
}

export const NerdyStatsSettingsPanel: React.FC<NerdyStatsSettingsPanelProps> = ({
  isDrawerOpen,
  closeDrawer,
  nerdyStatsSettings,
  onChange
}) => {
  return (
    <Drawer anchor="bottom" open={isDrawerOpen} onClose={closeDrawer}>
      <StyledPanelTitle>
        <Typography variant="body1" fontWeight="500">
          Nerdy Stats Settings
        </Typography>
        <IconButton color="inherit" onClick={closeDrawer} edge="end">
          <CloseIcon color="primary" fontSize="small" />
        </IconButton>
      </StyledPanelTitle>
      <Divider />
      <StyledPanelContent>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={nerdyStatsSettings.showNerdyStats}
                onClick={() => onChange({ showNerdyStats: !nerdyStatsSettings.showNerdyStats })}
              />
            }
            label="Show nerdy stats"
          />
        </FormGroup>
      </StyledPanelContent>
    </Drawer>
  )
}
