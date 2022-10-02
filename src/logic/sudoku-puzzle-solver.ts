import { NonZeroDigit, RowColValue, SolvedSudokuPuzzle, UnsolvedSudokuPuzzle, Value } from "./types"
import { Dlx, Matrix, MatrixRow, Solution } from "dlxlib"
import { range } from "../utils"

const ROWS = range(9)
const COLS = range(9)
const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as NonZeroDigit[]

type Coords = {
  row: number
  col: number
}

type InternalRow = RowColValue

export const solve = (
  unsolvedSudokuPuzzle: UnsolvedSudokuPuzzle
): SolvedSudokuPuzzle | undefined => {
  const internalRows = buildInternalRows(unsolvedSudokuPuzzle)
  const matrix = buildMatrix(internalRows)
  const resolveSolution = (solution: Solution) =>
    solution.map(internalRowIndex => internalRows[internalRowIndex].value)
  const dlx = new Dlx()
  const options = { numSolutions: 2 }
  const solutions = dlx.solve(matrix, options)
  if (solutions.length === 1) {
    return resolveSolution(solutions[0]) as SolvedSudokuPuzzle
  }
  return undefined
}

const buildInternalRows = (unsolvedSudokuPuzzle: UnsolvedSudokuPuzzle) => {
  const cells = ROWS.flatMap(row => COLS.map(col => ({ row, col })))
  return cells.flatMap(buildInternalRowsForCell(unsolvedSudokuPuzzle))
}

const buildInternalRowsForCell = (unsolvedSudokuPuzzle: UnsolvedSudokuPuzzle) => (coords: Coords): InternalRow[] => {
  const value = lookupValue(unsolvedSudokuPuzzle, coords)
  return value
    ? [{ row: coords.row, col: coords.col, value }]
    : DIGITS.map(digit => ({
      row: coords.row,
      col: coords.col,
      value: {
        digit,
        isInitialValue: false
      }
    }))
}

const lookupValue = (unsolvedSudokuPuzzle: UnsolvedSudokuPuzzle, coords: Coords): Value | undefined => {
  const { row, col } = coords
  return unsolvedSudokuPuzzle[row * 9 + col]
}

const buildMatrix = (internalRows: InternalRow[]): Matrix => internalRows.map(buildMatrixRow)

const buildMatrixRow = (internalRow: InternalRow): MatrixRow => {
  const { row, col, value } = internalRow
  const box = rowColToBox(row, col)
  const posColumns = oneHot(row, col)
  const rowColumns = oneHot(row, value.digit - 1)
  const colColumns = oneHot(col, value.digit - 1)
  const boxColumns = oneHot(box, value.digit - 1)
  const empty: number[] = []
  return empty.concat(posColumns, rowColumns, colColumns, boxColumns)
}

const rowColToBox = (row: number, col: number): number =>
  Math.floor(row - (row % 3) + (col / 3))

const oneHot = (row: number, col: number): number[] => {
  const columns = Array<number>(81).fill(0)
  columns[row * 9 + col] = 1
  return columns
}
