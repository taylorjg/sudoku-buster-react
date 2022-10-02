import { SolvedSudokuPuzzle, RowColValue } from "logic/types"
import { range } from "utils"
import { StyledSudoku } from "./sudoku.styles"
import * as C from "./constants"

const GRID_LINE_COLOUR = "#888888"
const GRID_LINE_THIN_WIDTH = .5
const GRID_LINE_THICK_WIDTH = GRID_LINE_THIN_WIDTH * 2
const GRID_SQUARE_SIZE = (C.VIEWPORT_SIZE - 2 * GRID_LINE_THIN_WIDTH) / 9
const DIGIT_FONT_SIZE = GRID_SQUARE_SIZE * 0.75
const DIGIT_INITIAL_VALUE_COLOUR = "#FF00FF"
const DIGIT_SOLVED_VALUE_COLOUR = "#000000"

export type SudokuProps = {
  solvedSudokuPuzzle: SolvedSudokuPuzzle
}

export const Sudoku: React.FC<SudokuProps> = ({ solvedSudokuPuzzle }) => {

  const renderHorizontalGridLines = (): JSX.Element[] => {
    const ys = range(10)
    return ys.map(y => (
      <line
        key={`horizontal-grid-line-${y}`}
        x1="0"
        y1={y * GRID_SQUARE_SIZE + GRID_LINE_THIN_WIDTH}
        x2={C.VIEWPORT_SIZE}
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
        key={`vertical-grid-line-${x}`}
        x1={x * GRID_SQUARE_SIZE + GRID_LINE_THIN_WIDTH}
        y1="0"
        x2={x * GRID_SQUARE_SIZE + GRID_LINE_THIN_WIDTH}
        y2={C.VIEWPORT_SIZE}
        strokeWidth={x % 3 ? GRID_LINE_THIN_WIDTH : GRID_LINE_THICK_WIDTH}
        stroke={GRID_LINE_COLOUR}
      />
    ))
  }

  const renderValue = (rowColValue: RowColValue): JSX.Element => {
    const { row, col, value: { digit, isInitialValue } } = rowColValue
    const x = (col + .5) * GRID_SQUARE_SIZE + GRID_LINE_THIN_WIDTH
    const y = (row + .5) * GRID_SQUARE_SIZE + GRID_LINE_THIN_WIDTH
    const digitColour = isInitialValue ? DIGIT_INITIAL_VALUE_COLOUR : DIGIT_SOLVED_VALUE_COLOUR
    return (
      <text
        key={`digit-${row}:${col}`}
        x={x}
        y={y}
        fontSize={DIGIT_FONT_SIZE}
        fill={digitColour}
        dominantBaseline="central"
        textAnchor="middle"
      >
        {digit}
      </text>
    )
  }

  const rowColValues = solvedSudokuPuzzle.map((value, index) => ({
    row: Math.floor(index / 9),
    col: index % 9,
    value
  }))

  return (
    <StyledSudoku viewBox={`0 0 ${C.VIEWPORT_SIZE} ${C.VIEWPORT_SIZE}`}>
      {renderHorizontalGridLines()}
      {renderVerticalGridLines()}
      {rowColValues.map(renderValue)}
    </StyledSudoku>
  )
}
