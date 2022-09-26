import { findBoundingBox } from "logic/findBoundingBox"
import { imageDataToImageTensor, cropGridSquares, inset } from "components/imageUtils"

export const useProcessImage = () => {

  const processImage = (imageData: ImageData) => {
    const result = findBoundingBox(imageData)
    if (result) {
      const imageData = result.image2
      const imageTensor = imageDataToImageTensor(imageData)
      const insetImageBoundingBox = inset([0, 0, imageData.width, imageData.height], 2, 2)
      const gridSquareImageTensors = cropGridSquares(imageTensor, insetImageBoundingBox)
      console.log("gridSquareImageTensors:", gridSquareImageTensors)
    }
    return result
  }

  return {
    processImage
  }
}
