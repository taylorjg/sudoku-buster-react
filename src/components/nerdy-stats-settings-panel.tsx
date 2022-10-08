import { Drawer, FormControlLabel, FormGroup, Switch } from "@mui/material"
import { StyledNerdyStatsSettingsPanel } from "./nerdy-stats-settings-panel.styles"
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
      <StyledNerdyStatsSettingsPanel>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={nerdyStatsSettings.showNerdyStats}
                onClick={() => onChange({ showNerdyStats: !nerdyStatsSettings.showNerdyStats})}
              />
            }
            label="Show nerdy stats"
          />
        </FormGroup>
      </StyledNerdyStatsSettingsPanel>
    </Drawer>
  )
}
