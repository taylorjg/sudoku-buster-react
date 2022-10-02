import { solve } from "./sudoku-puzzle-solver"
import { Digit, SolvedSudokuPuzzle, UnsolvedSudokuPuzzle } from "logic/types"
import { range } from "../utils"

const charToMaybeDigit = (ch: string): Digit | undefined => {
  const n = Number(ch)
  return (Number.isInteger(n) && n >= 1 && n <= 9) ? n as Digit : undefined
}

const stringsToUnsolvedSudokuPuzzle = (ss: string[]): UnsolvedSudokuPuzzle =>
  ss.flatMap(s => Array.from(s).map(charToMaybeDigit)) as UnsolvedSudokuPuzzle

const setsOfRowIndices = range(9).map(row => range(9).map(col => row * 9 + col))

const setsOfColIndices = range(9).map(col => range(9).map(row => row * 9 + col))

const makeSetOfBoxIndices = (boxRow: number, boxCol: number) => {
  const baseIndex = boxRow * 27 + boxCol * 3
  return range(3).flatMap(rowWithinBox =>
    range(3).map(colWithinBox =>
      baseIndex + rowWithinBox * 9 + colWithinBox))
}

const setsOfBoxIndices =
  range(3).flatMap(boxRow =>
    range(3).map(boxCol => makeSetOfBoxIndices(boxRow, boxCol)))

const validateSetsOfIndices = (
  solvedSudokuPuzzle: SolvedSudokuPuzzle,
  setsOfIndices: number[][]
): void => {
  for (const setOfIndices of setsOfIndices) {
    const digits = setOfIndices.map(index => solvedSudokuPuzzle[index].digit)
    const setOfDigits = new Set(digits)
    expect(setOfDigits.size).toBe(9)
  }
}

test("should find the solution to a valid Sudoku puzzle", () => {
  const unsolvedSudokuPuzzle = stringsToUnsolvedSudokuPuzzle([
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
  const solvedSudokuPuzzle = solve(unsolvedSudokuPuzzle)
  expect(solvedSudokuPuzzle).toBeDefined()
  validateSetsOfIndices(solvedSudokuPuzzle!, setsOfRowIndices)
  validateSetsOfIndices(solvedSudokuPuzzle!, setsOfColIndices)
  validateSetsOfIndices(solvedSudokuPuzzle!, setsOfBoxIndices)
})
