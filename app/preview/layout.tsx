import {isPreviewMode} from "@lib/drupal/is-preview-mode"
import Editori11y from "@components/tools/editorially"
import UnpublishedBanner from "@components/elements/unpublished-banner"

const Layout = async ({children}: {children: React.ReactNode}) => {
  const inPreview = await isPreviewMode()
  return (
    <>
      {inPreview && (
        <>
          <Editori11y />
          <UnpublishedBanner status={false} message="Preview Mode" />
        </>
      )}
      {children}
    </>
  )
}
export default Layout
