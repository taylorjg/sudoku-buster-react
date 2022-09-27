import React, { useContext, useState } from "react"
import { Alert, Snackbar, SnackbarOrigin, Slide, AlertColor } from "@mui/material"

type ToastContextType = {
  showSuccess: (message: string) => void
  showInfo: (message: string) => void
  showWarning: (message: string) => void
  showError: (message: string) => void
}

const nullImpl = (_message: string): void => { }

const NullToastContext = {
  showSuccess: nullImpl,
  showInfo: nullImpl,
  showWarning: nullImpl,
  showError: nullImpl
}

const ToastContext = React.createContext<ToastContextType>(NullToastContext)

export const ToastProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {

  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [severity, setSeverity] = useState<AlertColor>("success")

  const showCommon = (message: string, severity: AlertColor) => {
    setOpen(true)
    setMessage(message)
    setSeverity(severity)
  }

  const showSuccess = (message: string) => showCommon(message, "success")
  const showInfo = (message: string) => showCommon(message, "info")
  const showWarning = (message: string) => showCommon(message, "warning")
  const showError = (message: string) => showCommon(message, "error")

  const handleClose = () => {
    setOpen(false)
    setMessage("")
  }

  const anchorOrigin: SnackbarOrigin = {
    horizontal: "center",
    vertical: "bottom"
  }

  return (
    <ToastContext.Provider value={{ showSuccess, showInfo, showWarning, showError }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        TransitionComponent={Slide}
      >
        <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
