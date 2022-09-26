import { findBoundingBox } from "logic/findBoundingBox"

export const useProcessImage = () => {

  const processImage = (imageData: ImageData) => {
    const result = findBoundingBox(imageData)
    return result
  }

  return {
    processImage
  }
}
