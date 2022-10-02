export type Tuple81<T> = [
  T, T, T, T, T, T, T, T, T,
  T, T, T, T, T, T, T, T, T,
  T, T, T, T, T, T, T, T, T,
  T, T, T, T, T, T, T, T, T,
  T, T, T, T, T, T, T, T, T,
  T, T, T, T, T, T, T, T, T,
  T, T, T, T, T, T, T, T, T,
  T, T, T, T, T, T, T, T, T,
  T, T, T, T, T, T, T, T, T
]

// TODO: rename => Digit
export type NonZeroDigit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type Value = {
  digit: NonZeroDigit
  isInitialValue: boolean
}

export type UnsolvedSudokuPuzzle = Tuple81<Value | undefined>
export type SolvedSudokuPuzzle = Tuple81<Value>

// TODO: row, col => Coords
export type RowColValue = {
  row: number
  col: number
  value: Value
}

export type Point = {
  x: number
  y: number
}

export type BoundingBox = {
  x: number
  y: number
  width: number
  height: number
}

export type Corners = [Point, Point, Point, Point]
export type Contour = Point[]

export type FindBoundingBoxResult = {
  boundingBox: BoundingBox,
  image1: ImageData,
  image2: ImageData,
  corners: Corners,
  contour: Contour,
}
