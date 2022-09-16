import { SudokuPuzzle, stringsToDigits } from "logic/sudoku-puzzle"
import { DigitDetails } from "logic/types"
import { range } from "utils"
import { StyledBoard } from "./board.styles"

const GRID_LINE_COLOUR = "#888888"
const GRID_LINE_THIN_WIDTH = .5
const GRID_LINE_THICK_WIDTH = GRID_LINE_THIN_WIDTH * 2
const GRID_SQUARE_SIZE = (100 - 2 * GRID_LINE_THIN_WIDTH) / 9
const DIGIT_FONT_SIZE = GRID_SQUARE_SIZE * 0.75
const DIGIT_INITIAL_VALUE_COLOUR = "#FF00FF"
const DIGIT_SOLVED_VALUE_COLOUR = "#000000"

const digits = stringsToDigits([
  "28  3  45",
  "5 4   6 2",
  " 1 5 4 9 ",
  "  28 34  ",
  "8   7   3",
  "  36 29  ",
  " 4 1 5 2 ",
  "1 5   7 4",
  "63  4  19"
])

const initialValueIndices = digits.flatMap((digit, index) => digit === ' ' ? [] : [index])

const SamplePuzzle = new SudokuPuzzle(digits, initialValueIndices)

const Board = () => {

  const renderHorizontalGridLines = (): JSX.Element[] => {
    const ys = range(10)
    return ys.map(y => (
      <line
        key={`horizontal-grid-line-${y}`}
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
        key={`vertical-grid-line-${x}`}
        x1={x * GRID_SQUARE_SIZE + GRID_LINE_THIN_WIDTH}
        y1="0"
        x2={x * GRID_SQUARE_SIZE + GRID_LINE_THIN_WIDTH}
        y2="100"
        strokeWidth={x % 3 ? GRID_LINE_THIN_WIDTH : GRID_LINE_THICK_WIDTH}
        stroke={GRID_LINE_COLOUR}
      />
    ))
  }

  const renderDigit = (digitDetails: DigitDetails): JSX.Element => {
    const { row, col, digit, isInitialValue } = digitDetails
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

  SamplePuzzle.solve()
  const allDigitDetails = Array.from(SamplePuzzle)

  return (
    <StyledBoard viewBox="0 0 100 100">
      {renderHorizontalGridLines()}
      {renderVerticalGridLines()}
      {allDigitDetails.map(renderDigit)}
    </StyledBoard>
  )
}

export default Board
