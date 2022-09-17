import { SudokuPuzzle, stringsToDigits } from "logic/sudoku-puzzle"

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

const initialValueIndices = digits.flatMap((digit, index) => digit === " " ? [] : [index])

const SamplePuzzle = new SudokuPuzzle(digits, initialValueIndices)
SamplePuzzle.solve()
export { SamplePuzzle }
