import { range } from "utils"
import { StyledBoard } from "./board.styles"

const GRID_LINE_COLOUR = "#888"
const GRID_LINE_THIN_WIDTH = .5
const GRID_LINE_THICK_WIDTH = GRID_LINE_THIN_WIDTH * 2
const GRID_SQUARE_SIZE = (100 - 2 * GRID_LINE_THIN_WIDTH) / 9

const Board = () => {

  const renderHorizontalGridLines = (): JSX.Element[] => {
    const ys = range(10)
    return ys.map(y => (
      <line
        key={y}
        x1="0"
        y1={y * GRID_SQUARE_SIZE + GRID_LINE_THIN_WIDTH}
        x2="100"
        y2={y * GRID_SQUARE_SIZE + GRID_LINE_THIN_WIDTH}
        strokeWidth={y % 3 ? GRID_LINE_THIN_WIDTH : GRID_LINE_THICK_WIDTH}
        stroke={GRID_LINE_COLOUR}
      />
    ))
  }

  const renderVerticalGridLines = (): JSX.Element[] => {
    const xs = range(10)
    return xs.map(x => (
      <line
        key={x}
        x1={x * GRID_SQUARE_SIZE + GRID_LINE_THIN_WIDTH}
        y1="0"
        x2={x * GRID_SQUARE_SIZE + GRID_LINE_THIN_WIDTH}
        y2="100"
        strokeWidth={x % 3 ? GRID_LINE_THIN_WIDTH : GRID_LINE_THICK_WIDTH}
        stroke={GRID_LINE_COLOUR}
      />
    ))
  }

  return (
    <StyledBoard viewBox="0 0 100 100">
      {renderHorizontalGridLines()}
      {renderVerticalGridLines()}
    </StyledBoard>
  )
}

export default Board
