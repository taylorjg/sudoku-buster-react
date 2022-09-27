import { findBoundingBox } from "logic/findBoundingBox"
import { predictDigits } from "logic/cnn"
import { SudokuPuzzle, getInitialValueIndices } from "logic/sudoku-puzzle"
import { imageDataToImageTensor, cropGridSquares, inset } from "components/imageUtils"

export const useProcessImage = () => {

  const processImage = (imageData: ImageData) => {
    const result = findBoundingBox(imageData)
    if (result) {
      const imageData = result.image2
      const imageTensor = imageDataToImageTensor(imageData)
      const insetImageBoundingBox = inset([0, 0, imageData.width, imageData.height], 2, 2)
      const gridSquareImageTensors = cropGridSquares(imageTensor, insetImageBoundingBox)
      const digits = predictDigits(gridSquareImageTensors)
      const initialValueIndices = getInitialValueIndices(digits)
      const sudokuPuzzle = new SudokuPuzzle(digits, initialValueIndices)
      if (sudokuPuzzle.solve()) {
        return { result, solvedSudokuPuzzle: sudokuPuzzle }
      }
    }
    return { result }
  }

  return {
    processImage
  }
}
