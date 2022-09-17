import { StyledMessagePanel } from "./message-panel.styles"

export type MessagePanelProps = {
  message: string
}

export const MessagePanel: React.FC<MessagePanelProps> = ({ message }) => {
  return (
    <StyledMessagePanel>{message}</StyledMessagePanel>
  )
}
