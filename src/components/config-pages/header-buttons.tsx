
import Button from "@components/elements/button";
import { StanfordBasicSiteSetting } from "@lib/gql/__generated__/drupal.d";

type Props =
  Omit<StanfordBasicSiteSetting, "__typename" | "id" | "metatag">


export const HeaderButtons = ({
  sumSiteHeaderPrim,
  sumSiteHeaderSec,
}: Props) => {
      return (
        <>
          {sumSiteHeaderPrim && <Button href={sumSiteHeaderPrim.url} secondary>{sumSiteHeaderPrim.title}</Button>}
          {sumSiteHeaderSec && <Button href={sumSiteHeaderSec.url}>{sumSiteHeaderSec.title}</Button>}
        </>
      )
}
export default HeaderButtons;