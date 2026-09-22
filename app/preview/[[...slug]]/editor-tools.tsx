"use client"

import useDrupalSync from "@lib/hooks/useDrupalSync"
import Editori11y from "@components/tools/editorially"

const EditorTools = () => {
  useDrupalSync()
  return <Editori11y />
}
export default EditorTools
