"use client"
import { HtmlHTMLAttributes, useState } from "react";
import Oembed from "@components/elements/ombed";
import clsx from "clsx";
import { ParagraphSumVideo } from "@lib/gql/__generated__/drupal";
import { PlayIcon } from "@heroicons/react/24/solid";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphSumVideo;
}

const SumVideoParagraph = ({ paragraph, ...props }: Props) => {
  const videoUrl = paragraph.sumVideoVideo?.__typename === "MediaVideo" && paragraph.sumVideoVideo.mediaOembedVideo;
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    console.log("Video clicked");
    setIsPlaying(!isPlaying);
  };

  return (
    <div  {...props} onClick={handlePlay} className={clsx("relative z-0 overflow-hidden w-full h-[700px] cursor-pointer border-4 border-white", { "rounded-none": isPlaying, "rounded-full": !isPlaying })}>
      {!isPlaying && <div className="w-full h-full absolute z-50 flex items-center justify-center"><PlayIcon width={95} className="text-white bg-digital-red rounded-full p-10" /></div>}
      {videoUrl && <Oembed url={videoUrl} className="z-10 absolute top-0 left-0 w-full h-full"/>}
    </div>
  )
}

export default SumVideoParagraph
