import { Coords, Digit, SolvedSudokuPuzzle, UnsolvedSudokuPuzzle, Value } from "./types"
import { Dlx, Matrix, MatrixRow, Solution } from "dlxlib"

const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as Digit[]

type InternalRow = {
  coords: Coords
  value: Value
}

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

const buildInternalRows = (unsolvedSudokuPuzzle: UnsolvedSudokuPuzzle): InternalRow[] =>
  unsolvedSudokuPuzzle.flatMap((digit, index) => {
    const coords = Coords.fromIndex(index)
    return digit
      ? [buildInternalRowForInitialValue(coords, digit)]
      : buildInternalRowsForUnknownValue(coords)
  })

const buildInternalRowForInitialValue = (coords: Coords, digit: Digit): InternalRow => ({
  coords,
  value: {
    digit,
    isInitialValue: true
  }
})

const buildInternalRowsForUnknownValue = (coords: Coords): InternalRow[] =>
  DIGITS.map(digit => ({
    coords,
    value: {
      digit,
      isInitialValue: false
    }
  }))

const buildMatrix = (internalRows: InternalRow[]): Matrix => internalRows.map(buildMatrixRow)

const buildMatrixRow = (internalRow: InternalRow): MatrixRow => {
  const { coords, value } = internalRow
  const { row, col } = coords
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
