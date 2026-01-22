import Rows from "@components/paragraphs/rows/rows"
import {H1, H2} from "@components/elements/headers"
import {HtmlHTMLAttributes} from "react"
import {NodeStanfordOpportunity, TermOpportunityTagFilter} from "@lib/gql/__generated__/drupal.d"
import Wysiwyg from "@components/elements/wysiwyg"
import Image from "next/image"
import NodePageMetadata from "@components/nodes/pages/node-page-metadata"
import {getCleanDescription, getFirstText} from "@lib/utils/text-tools"
import Link from "@components/elements/link"
import Telephone from "@components/elements/telephone"
import Button from "@components/elements/button"
import {getFilterTerms} from "@lib/gql/gql-queries"
import {FilterVocabs} from "@lib/gql/filter-vocabs"
import ArcBanner from "@components/patterns/arc-banner"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: NodeStanfordOpportunity
  headingLevel?: "h2" | "h3"
}

const StanfordOpportunityPage = async ({node, ...props}: Props) => {
  const image = node.suOppImage?.mediaImage

  return (
    <article {...props}>
      <NodePageMetadata
        pageTitle={node.title}
        metatags={node.metatag}
        backupDescription={
          getCleanDescription(node.suOppSummary?.processed, 2) ||
          getCleanDescription(node.body?.processed) ||
          getFirstText(node.suOppComponents)
        }
      />
      <ArcBanner {...props} imageUrl="/images/opportunity-bg.jpg" imageAlt="">
        <div className="mx-auto mb-10 flex w-6/12 grow flex-col items-center justify-between">
          <div>
            {node.suOppApplicationDeadline && (
              <div className="uppercase">
                {new Date(node.suOppApplicationDeadline.time).toLocaleString("en-us", {
                  month: "long",
                  year: "numeric",
                })}
              </div>
            )}
          </div>
          <H1 className="mb-0 text-center">{node.title}</H1>
          <Wysiwyg html={node.suOppSummary?.processed} className="mb-20 text-center" />
        </div>
      </ArcBanner>

      {image?.url && (
        <div className="centered relative mb-20 mt-20 aspect-[2/1] lg:w-10/12">
          <Image
            className="ed11y-ignore rounded-[2.5rem] object-cover"
            src={image.url}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 900px) 75vw, 1000px"
          />
        </div>
      )}
      <div className="mx-auto mb-20 flex flex-col gap-20 lg:w-10/12 lg:flex-row">
        <div className="px-10 lg:w-9/12 lg:px-0">
          {(node.suOppEligibility?.processed || node.suOppPrerequisites?.processed) && (
            <div className="mb-20 flex flex-col gap-20 rounded-[2.5rem] bg-black-10 bg-opacity-80 p-10">
              {node.suOppEligibility && (
                <div>
                  <H2 className="text-3xl">Eligibility</H2>
                  <Wysiwyg html={node.suOppEligibility.processed} />
                </div>
              )}

              {node.suOppPrerequisites && (
                <div>
                  <H2 className="text-3xl">Prerequisites</H2>
                  <Wysiwyg html={node.suOppPrerequisites.processed} />
                </div>
              )}
            </div>
          )}

          <Wysiwyg html={node.body?.processed} />
        </div>
        <div className="lg:px-0border-t border-black-30 px-10 lg:w-3/12">
          {(node.suOppType || node.suOppCourseCode || node.suOppUnits) && (
            <div className="flex flex-col gap-8 border-b border-black-30 px-5 py-11">
              {node.suOppType && (
                <div className="font-semibold">{node.suOppType.map(type => type.name).join(", ")}</div>
              )}

              {node.suOppCourseCode && <div className="font-semibold">{node.suOppCourseCode}</div>}
              {node.suOppUnits && (
                <div>
                  <div className="font-semibold">Units</div>
                  {node.suOppUnits.map(unit => (
                    <span key={unit.uuid}>{unit.name}</span>
                  ))}
                </div>
              )}
            </div>
          )}

          {node.suOppApplicationDeadline && (
            <div className="border-b border-black-30 px-5 py-8">
              <div className="mb-5 font-semibold">Application Deadline</div>
              {new Date(node.suOppApplicationDeadline.time)
                .toLocaleString("en-us", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })
                .replace(" at ", " ")}
            </div>
          )}

          {node.suOppTags && <FilterTerms terms={node.suOppTags} />}

          {(node.suOppContactEmail || node.suOppContactPhone || node.suOppContactName || node.suOppContactUrl) && (
            <div className="flex flex-col gap-2 px-5 py-8">
              {node.suOppContactEmail && <div>{node.suOppContactEmail}</div>}
              {node.suOppContactName && <div>{node.suOppContactName}</div>}
              {node.suOppContactPhone && <Telephone tel={node.suOppContactPhone}>{node.suOppContactPhone}</Telephone>}
              {node.suOppContactUrl && (
                <Link href={node.suOppContactUrl.url || "#"} prefetch={false}>
                  {node.suOppContactUrl.title}
                </Link>
              )}
            </div>
          )}
          {node.suOppCtaUrl?.url && (
            <div className="px-5 py-8">
              <Button href={node.suOppCtaUrl.url}>{node.suOppCtaUrl.title}</Button>
            </div>
          )}
        </div>
      </div>
      <Rows components={node.suOppComponents} />
    </article>
  )
}

const FilterTerms = async ({terms}: {terms: TermOpportunityTagFilter[]}) => {
  const filters = await getFilterTerms(FilterVocabs.Opportunities)
  const groups: TermOpportunityTagFilter[] = []
  terms.map(term => {
    const parent = filters.find(filter => filter.uuid === term.parent?.uuid)
    if (parent && !groups.find(group => group.uuid === parent.uuid)) {
      groups.push(parent)
    }
  })
  return (
    <div className="flex flex-col gap-8 border-b border-black-30 px-5 py-11">
      {groups.map(group => (
        <div key={group.uuid}>
          <H2 className="text-3xl font-semibold">{group.name}</H2>
          {terms
            .filter(term => term.parent?.uuid === group.uuid)
            .map(term => term.name)
            .join(", ")}
        </div>
      ))}
    </div>
  )
}

export default StanfordOpportunityPage
