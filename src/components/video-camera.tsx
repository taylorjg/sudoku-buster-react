import React, { useEffect, useRef } from "react"
import { nextAnimationFrame } from "utils"
import { StyledVideoCamera } from "./video-camera.styles"
import { useToast } from "./toast-provider"

export type VideoCameraProps = {
  onCameraNotAvailable: () => void
  onVideoFrame: (imageData: ImageData) => void
}

export const VideoCamera: React.FC<VideoCameraProps> = ({
  onCameraNotAvailable,
  onVideoFrame
}) => {

  const { showError } = useToast()
  const mediaStreamRef = useRef<MediaStream | undefined>(undefined)
  const stopLoopRef = useRef(false)

  useEffect(() => {
    const cleanup = () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getVideoTracks().forEach(videoTrack => videoTrack.stop())
        mediaStreamRef.current = undefined
        stopLoopRef.current = true
      }
    }
    return cleanup
  }, [])

  const videoRef = async (videoElement: HTMLVideoElement) => {
    if (!videoElement) return
    if (mediaStreamRef.current) return
    try {
      const videoRect = videoElement.getBoundingClientRect()
      const constraints = {
        video: {
          crap: "toss",
          facingMode: "environment",
          width: videoRect.width,
          height: videoRect.height
        }
      }
      mediaStreamRef.current = await navigator.mediaDevices.getUserMedia(constraints)
      if (mediaStreamRef.current) {
        videoElement.srcObject = mediaStreamRef.current
        videoElement.play()
        const offscreenCanvas = document.createElement("canvas")
        const ctx = offscreenCanvas.getContext("2d")
        if (ctx) {
          const { width, height } = videoRect
          const bounds: [number, number, number, number] = [0, 0, width, height]
          while (!stopLoopRef.current) {
            ctx.drawImage(videoElement, ...bounds)
            const imageData = ctx.getImageData(...bounds)
            onVideoFrame(imageData)
            await nextAnimationFrame()
          }
        }
      }
    } catch (error) {
      try {
        if (mediaStreamRef.current) {
          mediaStreamRef.current.getVideoTracks().forEach(videoTrack => videoTrack.stop())
          mediaStreamRef.current = undefined
          stopLoopRef.current = true
        }
      } finally {
        showError("Camera not available")
        onCameraNotAvailable()
      }
    }
  }

  return (
    <StyledVideoCamera playsInline ref={videoRef} />
  )
}
