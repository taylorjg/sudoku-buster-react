import { Drawer, FormControl, FormControlLabel, FormLabel, Switch } from "@mui/material"
import { StyledDiagnosticsSettingsPanel } from "./diagnostics-settings-panel.styles"
import { DiagnosticsSettings } from "./types"

export type DiagnosticsSettingsPanelProps = {
  isDrawerOpen: boolean
  closeDrawer: () => void
  diagnosticsSettings: DiagnosticsSettings
  onChange: (diagnosticsSettings: DiagnosticsSettings) => void
}

export const DiagnosticsSettingsPanel: React.FC<DiagnosticsSettingsPanelProps> = ({
  isDrawerOpen,
  closeDrawer,
  diagnosticsSettings,
  onChange
}) => {
  return (
    <Drawer anchor="bottom" open={isDrawerOpen} onClose={closeDrawer}>
      <StyledDiagnosticsSettingsPanel>
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
      </StyledDiagnosticsSettingsPanel>
    </Drawer>
  )
}
