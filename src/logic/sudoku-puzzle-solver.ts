import { Digit, Digits } from "./types"
import { Dlx, Matrix, MatrixRow, Solution } from "dlxlib"
import { range } from "../utils"

const ROWS = range(9)
const COLS = range(9)
const DIGITS = range(9).map(n => n + 1)

type Coords = {
  row: number
  col: number
}

type InternalRow = {
  coords: Coords
  value: number
  isInitialValue: boolean
}

export const solve = (
  digits: Digits,
  numSolutions: number
): Digits[] => {
  const internalRows = buildInternalRows(digits)
  const matrix = buildMatrix(internalRows)
  const resolveSolution = (solution: Solution): Digits => {
    const values = solution.map(internalRowIndex => internalRows[internalRowIndex].value)
    const digits = values.map(value => value as Digit)
    return digits as Digits
  }
  const dlx = new Dlx()
  const options = { numSolutions }
  const solutions = dlx.solve(matrix, options)
  return solutions.map(resolveSolution)
}

const buildInternalRows = (digits: Digits) => {
  const cells = ROWS.flatMap(row => COLS.map(col => ({ row, col })))
  return cells.flatMap(buildInternalRowsForCell(digits))
}

const buildInternalRowsForCell = (digits: Digits) => (coords: Coords): InternalRow[] => {
  const value = lookupValue(digits, coords)
  return value
    ? [{ coords, value, isInitialValue: true }]
    : DIGITS.map(digit => ({ coords, value: digit, isInitialValue: false }))
}

const lookupValue = (digits: Digits, coords: Coords): number | undefined => {
  const { row, col } = coords
  const value = Number(digits[row * 9 + col])
  return Number.isInteger(value) && value > 0 ? value : undefined
}

const buildMatrix = (internalRows: InternalRow[]): Matrix => internalRows.map(buildMatrixRow)

const buildMatrixRow = (internalRow: InternalRow): MatrixRow => {
  const { coords, value } = internalRow
  const { row, col } = coords
  const box = rowColToBox(row, col)
  const posColumns = oneHot(row, col)
  const rowColumns = oneHot(row, value - 1)
  const colColumns = oneHot(col, value - 1)
  const boxColumns = oneHot(box, value - 1)
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
