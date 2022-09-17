import { StyledMessage } from "./message.styles"

export type MessageProps = {
  message: string
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <StyledMessage>{message}</StyledMessage>
  )
}
