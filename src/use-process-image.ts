import * as tf from "@tensorflow/tfjs"
import { BoundingBox, Corners, Contour } from "logic/types"
import { findBoundingBox } from "logic/findBoundingBox"
import { predictDigits } from "logic/cnn"
import { SudokuPuzzle, getInitialValueIndices } from "logic/sudoku-puzzle"
import { imageDataToImageTensor, cropGridSquares, inset } from "components/imageUtils"

type FindBoundingBoxResult = {
  boundingBox: BoundingBox,
  image1: ImageData,
  image2: ImageData,
  corners: Corners,
  contour: Contour,
}

type ProcessImageResult = FindBoundingBoxResult & {
  solvedSudokuPuzzle?: SudokuPuzzle
} | undefined

const perfWrapper = <T>(name: string, fn: () => T): T => {
  performance.mark(`${name}-start`)
  const result = fn()
  performance.measure(name, `${name}-start`)
  return result
}

export const useProcessImage = () => {

  const processImage = (imageData: ImageData): ProcessImageResult => {
    let result: ProcessImageResult

    const fn = (): void => {
      result = perfWrapper("findBoundingBox", () => findBoundingBox(imageData))

      if (result) {
        const imageData = result.image2
        const imageTensor = imageDataToImageTensor(imageData)
        const insetImageBoundingBox = inset([0, 0, imageData.width, imageData.height], 2, 2)
        const gridSquareImageTensors = cropGridSquares(imageTensor, insetImageBoundingBox)

        const digits = perfWrapper("predictDigits", () => predictDigits(gridSquareImageTensors))

        const initialValueIndices = getInitialValueIndices(digits)
        const sudokuPuzzle = new SudokuPuzzle(digits, initialValueIndices)

        if (perfWrapper("solve", () => sudokuPuzzle.solve())) {
          result.solvedSudokuPuzzle = sudokuPuzzle
        }
      }
    }

    tf.tidy(() => perfWrapper("processImage", fn))
    return result
  }

  return {
    processImage
  }
}
