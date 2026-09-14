import PageHeader from "@components/global/page-header"

/**
 * Fallback for urls the header slot can't match, so an unmatched slot never 404s the page.
 */
const Default = () => <PageHeader />

export default Default
