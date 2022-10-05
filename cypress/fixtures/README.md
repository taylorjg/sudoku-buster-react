# Description

Chrome has a `--use-file-for-fake-video-capture` flag which allows us to use a video file as a fake webcam.
I captured a video file from the browser using [this](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API/Recording_a_media_element) example that I found on MDN (I slightly modified it to change the size of the video element).
I then converted it from `.webm` to `.y4m` using [FFmpeg](https://ffmpeg.org/):

```
ffmpeg -i scanning.webm -pix_fmt yuv420p scanning.y4m
```

# Links

* [Use fake video for webcam testing](https://docs.cypress.io/api/plugins/browser-launch-api#Use-fake-video-for-webcam-testing)
* [Recording a media element](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API/Recording_a_media_element)
* [Download FFmpeg](https://ffmpeg.org/download.html)
