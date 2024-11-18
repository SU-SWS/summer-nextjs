"use client"

import ReactZendesk from "react-zendesk"

const Zendesk = () => {
  if (!process.env.NEXT_PUBLIC_ZENDESK) return
  return <ReactZendesk zendeskKey={process.env.NEXT_PUBLIC_ZENDESK} />
}
export default Zendesk
