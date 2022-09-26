export const getImageDataFromVideoElement = (
  videoElement: HTMLVideoElement,
  context2D: CanvasRenderingContext2D
): ImageData => {
  const { width, height } = context2D.canvas
  const bounds: [number, number, number, number] = [0, 0, width, height]
  context2D.drawImage(videoElement, ...bounds)
  return context2D.getImageData(...bounds)
}
