import Editori11y from "@components/tools/editorially"
import UnpublishedBanner from "@components/elements/unpublished-banner"

const Layout = async ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <Editori11y />
      <UnpublishedBanner status={false} message="Preview Mode" />

      {children}
    </>
  )
}
export default Layout
