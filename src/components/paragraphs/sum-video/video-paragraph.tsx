import { ParagraphSumVideo } from "@lib/gql/__generated__/drupal.d";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import Oembed from "@components/elements/ombed";
import YoutubeVideoPill from "@components/elements/youtube-video-pill";

type Props = HTMLAttributes<HTMLElement> & {
  paragraph: ParagraphSumVideo;
};

const SumVideoParagraph = ({ paragraph, ...props }: Props) => {
  if (!paragraph.sumVideoVideo?.mediaOembedVideo) return null;

  const youtubeVideoId =
    paragraph.sumVideoVideo.mediaOembedVideo.match(/v=(\w+)/)?.[1];

  return (
    <div {...props} className={twMerge("centered", props.className)}>
      {youtubeVideoId && <YoutubeVideoPill videoId={youtubeVideoId} />}
      {!paragraph.sumVideoVideo?.mediaOembedVideo.match(/you/) && (
        <Oembed url={paragraph.sumVideoVideo.mediaOembedVideo} />
      )}
    </div>
  );
};

export default SumVideoParagraph;
