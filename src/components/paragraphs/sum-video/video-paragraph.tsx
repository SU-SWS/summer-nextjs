"use client"
import { HtmlHTMLAttributes, useState } from "react";
import Oembed from "@components/elements/ombed";
import clsx from "clsx";
import { ParagraphSumVideo } from "@lib/gql/__generated__/drupal";

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
    <div onClick={handlePlay} className={clsx("relative overflow-hidden w-full h-[700px] cursor-pointer border-3 outline-3", { "rounded-none": isPlaying, "rounded-full": !isPlaying })}  {...props}>
      {videoUrl && <Oembed url={videoUrl} className="absolute top-0 left-0 w-full h-full"/>}
    </div>
  )
}

export default SumVideoParagraph
