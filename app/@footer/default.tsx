import PageFooter from "@components/global/page-footer"

/**
 * Fallback for urls the footer slot can't match, so an unmatched slot never 404s the page.
 */
const Default = () => <PageFooter />

export default Default
