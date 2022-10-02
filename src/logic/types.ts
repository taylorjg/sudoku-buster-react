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

export type Digit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type Value = {
  digit: Digit
  isInitialValue: boolean
}

export type UnsolvedSudokuPuzzle = Tuple81<Digit | undefined>
export type SolvedSudokuPuzzle = Tuple81<Value>

export class Coords {

  private constructor(
    public row: number,
    public col: number
  ) {
  }

  public static fromIndex(index: number): Coords {
    const row = Math.floor(index / 9)
    const col = index % 9
    return new Coords(row, col)
  }
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
