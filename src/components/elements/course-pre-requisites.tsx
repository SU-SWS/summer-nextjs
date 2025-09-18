import Wysiwyg from "@components/elements/wysiwyg"

type Props = {
  preReqs?: string
}
const CoursePreRequisites = ({preReqs}: Props) => {
  if (!preReqs) return null
  const reqCodes = [...preReqs.matchAll(/\b([A-Z]+\d+(-\d+|[A-Z])?)\b/g)]
  for (let i = 0; i < reqCodes.length; i++) {
    preReqs = preReqs.replace(
      reqCodes[i][1],
      `<a href="/courses?prod_Summer[query]=${reqCodes[i][1]}#search-form">${reqCodes[i][1]}</a>`
    )
  }

  return <Wysiwyg html={preReqs} disableDefaultStyles />
}

export default CoursePreRequisites
