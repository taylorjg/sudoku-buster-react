export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

type Tuple81<T> = [
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

export type Digits = Tuple81<Digit>

export type DigitDetails = {
  row: number
  col: number
  digit: Digit
  isInitialValue: boolean
}

export type Point = {
  x: number
  y: number
}

export type Rect = {
  x: number
  y: number
  width: number
  height: number
}

export type BoundingBox = Rect
export type Corners = Point[]
export type Contour = Point[]
