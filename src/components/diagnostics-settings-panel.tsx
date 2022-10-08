import { Drawer, FormControlLabel, FormGroup, Switch } from "@mui/material"
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

  const makeClickHandler = (field: keyof DiagnosticsSettings): () => void => {
    return (): void => {
      onChange({
        ...diagnosticsSettings,
        [field]: !diagnosticsSettings[field]
      })
    }
  }

  return (
    <Drawer anchor="bottom" open={isDrawerOpen} onClose={closeDrawer}>
      <StyledDiagnosticsSettingsPanel>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={diagnosticsSettings.showBoundingBox}
                onClick={makeClickHandler("showBoundingBox")}
              />
            }
            label="Show bounding Box"
          />
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={diagnosticsSettings.showCorners}
                onClick={makeClickHandler("showCorners")}
              />
            }
            label="Show corners"
          />
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={diagnosticsSettings.showContour}
                onClick={makeClickHandler("showContour")}
              />
            }
            label="Show contour"
          />
        </FormGroup>
      </StyledDiagnosticsSettingsPanel>
    </Drawer>
  )
}
