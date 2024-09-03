"use client"

import YouTube, {YouTubePlayer, YouTubeEvent} from "react-youtube"
import {useBoolean, useIntersectionObserver} from "usehooks-ts"
import {HTMLAttributes, useCallback, useEffect, useId, useRef} from "react"
import {ErrorBoundary} from "react-error-boundary"
import {PlayIcon} from "@heroicons/react/24/outline"
import {twMerge} from "tailwind-merge"

type Props = HTMLAttributes<HTMLDivElement> & {
  videoUrl: string
}

const YoutubeVideoPill = ({videoUrl, ...props}: Props) => {
  return (
    <ErrorBoundary
      fallback={
        <a href={videoUrl} className="block text-center">
          <PlayIcon className="mx-auto aspect-1 w-full max-w-100" />
          Play the video.
        </a>
      }
    >
      <YoutubeVideoPillBounded videoUrl={videoUrl} {...props} />
    </ErrorBoundary>
  )
}
const YoutubeVideoPillBounded = ({videoUrl, ...props}: Props) => {
  const id = useId()
  const {value: isInitialPlay, setFalse: endInitialPlay} = useBoolean(true)
  const videoRef = useRef<YouTubePlayer>(null)
  const {isIntersecting, ref} = useIntersectionObserver({
    freezeOnceVisible: true,
  })
  const {value: isPlaying, setValue: setIsPlaying} = useBoolean(false)
  const options = {
    height: 530,
    width: 300,
    playerVars: {
      controls: 0,
    },
  }

  const playVideoIntro = useCallback(
    (video: YouTubePlayer) => {
      video.mute()
      video.playVideo()

      setTimeout(() => {
        video.pauseVideo()

        // Tiny delay to avoid any noise between the above function and the actual pausing of the video.
        setTimeout(() => {
          video.unMute()
          videoRef.current = false
          endInitialPlay()
        }, 200)
      }, 5000)
    },
    [endInitialPlay]
  )

  useEffect(() => {
    if (!isIntersecting || !videoRef.current) return
    playVideoIntro(videoRef.current)
  }, [isIntersecting, playVideoIntro])

  const videoId = videoUrl.match(/v=(\w+)/)?.[1]
  const shortId = videoUrl.match(/shorts\/([\w-]+)/)?.[1]

  if (!videoId && !shortId) return null

  return (
    <div
      {...props}
      className={twMerge(
        "mx-auto sm:max-w-[392px] md:max-w-[507px] lg:max-w-[576px] xl:max-w-[980px]",
        props.className
      )}
      ref={ref}
    >
      <YouTube
        id={id}
        videoId={videoId || shortId}
        className={
          "overflow-hidden transition-all duration-300 ease-in-out " +
          (isPlaying && !isInitialPlay ? "" : "rounded-full outline outline-4 outline-offset-[-10px] outline-white")
        }
        opts={options}
        onReady={(e: YouTubeEvent) => {
          videoRef.current = e.target
          if (isIntersecting) playVideoIntro(e.target)
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnd={() => setIsPlaying(false)}
        iframeClassName="w-full aspect-[9/16] h-full"
      />
    </div>
  )
}
export default YoutubeVideoPill
