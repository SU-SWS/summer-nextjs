"use client";

import YouTube, { YouTubePlayer } from "react-youtube";
import { useBoolean, useIntersectionObserver } from "usehooks-ts";
import { HTMLAttributes, useCallback, useEffect, useRef } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  videoId: string;
};

const YoutubeVideoPill = ({ videoId, ...props }: Props) => {
  const videoRef = useRef<YouTubePlayer>(null);
  const { isIntersecting, ref } = useIntersectionObserver({
    freezeOnceVisible: true,
  });
  const { value: isPlaying, setValue: setIsPlaying } = useBoolean(false);
  const options = {
    height: 600,
    width: 300,
    playerVars: {
      controls: 0,
    },
  };

  const playVideoIntro = useCallback((video: YouTubePlayer) => {
    video.mute();
    video.playVideo();

    setTimeout(() => {
      video.pauseVideo();
      // Tiny delay to avoid any noise between the above function and the actual pausing of the video.
      setTimeout(() => {
        video.unMute();
        videoRef.current = false;
      }, 200);
    }, 5000);
  }, []);

  useEffect(() => {
    if (!isIntersecting || !videoRef.current) return;
    playVideoIntro(videoRef.current);
  }, [isIntersecting, playVideoIntro]);

  return (
    <div {...props} ref={ref}>
      <YouTube
        videoId={videoId}
        className={
          "mx-auto w-fit overflow-hidden transition-all duration-300 ease-in-out " +
          (isPlaying ? "" : "rounded-full")
        }
        opts={options}
        onReady={(e) => {
          videoRef.current = e.target;
          if (isIntersecting) playVideoIntro(e.target);
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnd={() => setIsPlaying(false)}
      />
    </div>
  );
};
export default YoutubeVideoPill;
