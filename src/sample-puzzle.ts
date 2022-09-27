import { SudokuPuzzle, stringsToDigits, getInitialValueIndices } from "logic/sudoku-puzzle"

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

const initialValueIndices = getInitialValueIndices(digits)

const SamplePuzzle = new SudokuPuzzle(digits, initialValueIndices)
SamplePuzzle.solve()

export { SamplePuzzle }
