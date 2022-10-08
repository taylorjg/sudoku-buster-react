import { Divider, Drawer, FormControlLabel, IconButton, Switch, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { StyledPanelContent, StyledPanelTitle } from "./common-settings-panel.styles"
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
      <StyledPanelTitle>
        <Typography variant="body1" fontWeight="500">
          Diagnostics Settings
        </Typography>
        <IconButton color="inherit" onClick={closeDrawer} edge="end">
          <CloseIcon color="primary" fontSize="small" />
        </IconButton>
      </StyledPanelTitle>
      <Divider />
      <StyledPanelContent>
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
      </StyledPanelContent>
    </Drawer>
  )
}
