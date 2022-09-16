import { StyledMessagePanel } from "./message-panel.styles"

export const Messages = {
  SCAN_MESSAGE: "Tap the big square to scan a puzzle",
  CANCEL_MESSAGE: "Tap the big square to cancel",
  START_OVER_MESSAGE: "Tap the big square to start over"
}

export type MessagePanelProps = {
  message: string
}

export const MessagePanel: React.FC<MessagePanelProps> = ({ message }) => {
  return (
    <StyledMessagePanel>{message}</StyledMessagePanel>
  )
}
