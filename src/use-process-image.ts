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

export const useProcessImage = () => {

  const processImage = (imageData: ImageData): ProcessImageResult => {
    let result: ProcessImageResult

    const fn = (): void => {
      result = findBoundingBox(imageData)
      if (result) {
        const imageData = result.image2
        const imageTensor = imageDataToImageTensor(imageData)
        const insetImageBoundingBox = inset([0, 0, imageData.width, imageData.height], 2, 2)
        const gridSquareImageTensors = cropGridSquares(imageTensor, insetImageBoundingBox)
        const digits = predictDigits(gridSquareImageTensors)
        const initialValueIndices = getInitialValueIndices(digits)
        const sudokuPuzzle = new SudokuPuzzle(digits, initialValueIndices)
        if (sudokuPuzzle.solve()) {
          result.solvedSudokuPuzzle = sudokuPuzzle
        }
      }
    }

    tf.tidy(fn)
    return result
  }

  return {
    processImage
  }
}
