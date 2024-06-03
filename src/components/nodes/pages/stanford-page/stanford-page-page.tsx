import Rows from "@components/paragraphs/rows/rows";
import InteriorPage from "@components/layouts/interior-page";
import { H1 } from "@components/elements/headers";
import { HtmlHTMLAttributes } from "react";
import { NodeStanfordPage } from "@lib/gql/__generated__/drupal.d";
import PageTitleBannerParagraph from "@components/paragraphs/stanford-page-title-banner/page-title-banner-paragraph";
import SumArcBannerParagraph from "@components/paragraphs/sum-arc-banner/sum-arc-banner-paragraph";
import SumTopBannerParagraph from "@components/paragraphs/sum-top-banner/sum-top-banner-paragraph";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: NodeStanfordPage;
  headingLevel?: "h2" | "h3";
};

const StanfordPagePage = ({ node, ...props }: Props) => {
  const fullWidth = node.layoutSelection?.id === "stanford_basic_page_full";

  return (
    <article {...props}>
      {node.suPageBanner && (
        <header aria-label="Page banner">
          {node.suPageBanner.__typename ===
            "ParagraphStanfordPageTitleBanner" && (
            <PageTitleBannerParagraph
              paragraph={node.suPageBanner}
              pageTitle={node.title}
            />
          )}
          {node.suPageBanner.__typename === "ParagraphSumArcBanner" && (
            <SumArcBannerParagraph
              paragraph={node.suPageBanner}
              pageTitle={node.title}
            />
          )}
          {node.suPageBanner?.__typename === "ParagraphSumTopBanner" && (
            <SumTopBannerParagraph paragraph={node.suPageBanner} />
          )}
        </header>
      )}

      {node.suPageBanner?.__typename !== "ParagraphStanfordPageTitleBanner" &&
        node.suPageBanner?.__typename !== "ParagraphSumArcBanner" && (
          <H1 className="centered mt-32">{node.title}</H1>
        )}

      {!fullWidth && (
        <InteriorPage currentPath={node.path}>
          <Rows components={node.suPageComponents} />
        </InteriorPage>
      )}

      {fullWidth && <Rows components={node.suPageComponents} />}
    </article>
  );
};
export default StanfordPagePage;
