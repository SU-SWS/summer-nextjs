# AGENTS.md

## Project Overview

This is a Next.js application that serves as a frontend for a Drupal backend CMS. The application uses TailwindCSS for styling and communicates with Drupal via GraphQL to fetch content structured with Paragraph entities.

## Technology Stack

- **Frontend Framework**: Next.js (v16)
- **Styling**: TailwindCSS (v4)
- **Backend CMS**: Drupal (v11)
- **Data Layer**: GraphQL
- **Package Manager**: yarn

## Project Structure

```
[ROOT_DIRECTORY]/
├── src/
│   ├── components/        # React components
│   │    ├── nodes         # Drupal Nod displays: cards, list items, and page displays
│   │    ├── paragraphs    # Drupal Paragraph entity components
│   │    └── views         # Drupal View lists
│   ├── hooks              # Reusable React hooks
│   ├── lib                # Library
│   │    ├── gql           # Graphql queries and fetch functionality
│   │    └── utils         # General reusable functions like string manipulations
└── app                    # Next.js Pages and API routes
```

## Architecture

### Frontend (Next.js)

**Routing Strategy**: App Router

**Rendering Strategy**:
- Incremental Static Regeneration (ISR)
- Revalidation interval: INFINITE & on demand

### Backend (Drupal)

**GraphQL Endpoint**: `[NEXT_PUBLIC_DRUPAL_BASE_URL]/graphql`

**Authentication**: JWT / API Key

**Content Types**:
- stanford_course: A course includes information such as title, year, quarter, day(s) and time(s), etc.
- stanford_event: An event content type with integration with events-legacy.stanford.edu
- stanford_event_series: A collection of events. (Deprecated)
- stanford_media: A content type for podcasts or video episodes.
- stanford_news: General news content with a date field.
- stanford_opportunity: A content type for jobs, internships, fellowships, seminars, service opportunities, grants, funding options, and more.
- stanford_page: General use page with layout choices and a variety of paragraphs.
- stanford_person: Stanford Person type with bio and supporting information. Content-type for syncing with CAP data.
- stanford_policy: Provide an administrative policy structure with breadcrumbs.
- stanford_publication: Book/article/thesis/etc publication content type with author information.

**Paragraph Types**:
- stanford_banner: Wide image with overlay text of heading, superhead, wysiwyg, and link.
- stanford_card: General image card with a heading, superhead, wysiwyg and link.
- stanford_entity: List of teaser nodes, accompanied by a heading, wysiwyg and link.
- stanford_faq: List of Q&A style nested paragraphs, accompanied by a heading and wysiwyg.
- stanford_filtered_lists: List of nodes with taxonomy filter functionality, accompanied by a heading, wysiwyg and link.
- stanford_gallery: List of images with associated captions, accompanied by a heading, wysiwyg, and link.
- stanford_lists: List of nodes accompanied by a heading, wysiwyg and link.
- stanford_media_caption: A basic image or video with a caption wysiwyg.
- stanford_page_title_banner: Wide image used to display with the page h1 element.
- stanford_person_cta: Unused paragraph type, retained for BC.
- stanford_schedule: Unused paragraph type, retained for BC.
- stanford_spacer: Simple empty paragraph that adds space between paragraphs.
- stanford_stat_card: Statistical card that animates a number stat, accompanied by an image/icon, heading, superhead, wysiwyg, and link.
- stanford_wysiwyg: Simple WYSIWYG text area.

## Key Components

### Site Chrome

`src/components/global/site-chrome.tsx` renders the header, the `<main id="main-content">` region,
and the footer. **The root layout deliberately does not render it.** `app/layout.tsx` is only the
document shell (`<html>`/`<body>`, analytics, skip link, and the `@modal` slot); every other route
directory supplies the chrome from its own layout.

The chrome is per-segment because `PageHeader`/`PageFooter` need the current node's
`sumMinimalHeadFoot` flag (see `src/lib/drupal/chrome.ts`), and the root layout has no dynamic
segment to read `params` from.

Do **not** reintroduce `@header` / `@footer` parallel route slots to solve this. That was tried in
ba98f80 and reverted: on Vercel it produced

```
Couldn't find all resumable slots by key/index during replaying
```

on unpublished/preview urls. Each slot adds its own keyed replay slot to a partially prerendered
route's postponed state, and `notFound()` at resume time tears the slots out of the tree (Next
re-renders the root layout with only `children`), so the replay can no longer match them. It also
meant 404 pages rendered with no header or footer at all.

### Paragraph Components

Each Drupal paragraph type has a corresponding React component:

```
src/components/paragraphs/
├── [paragraph-type-1]
│   └─ [paragraph-type-1-paragraph].tsx
├── [paragraph-type-2]
│   └─ [paragraph-type-2-paragraph].tsx
└── paragraph.tsx  # Main paragraph dispatcher
```

**Paragraph Renderer Pattern**:
```typescript
// This component maps Drupal paragraph types to React components
src/components/paragraphs/paragraph.tsx
```

### GraphQL Queries

**Query Organization**:
- Location: `src/lib/gql/`
- Naming convention:
  - fragments-[type].drupal.gql
  - [type]-query.drupal.gql

**Common Queries**:
- `Route`: Fetches any Drupal node, redirect, or other entity for the provided path url.
- `Menu`: Fetches the menu links for the desired menu.

**GraphQL Client**: graphql-request

**GraphQL Compiler Command**: `yarn graphql` 

## Data Flow

1. **Page Request** → Next.js page component
2. **GraphQL Query** → Drupal GraphQL endpoint
3. **Data Processing** → Transform Drupal data structure
4. **Paragraph Rendering** → Map paragraph types to React components
5. **Component Render** → Display content with TailwindCSS styling

## Environment Variables

Required environment variables:

```bash
NEXT_PUBLIC_DRUPAL_BASE_URL=[Drupal site base URL]
DRUPAL_BASIC_AUTH=[Basic authentication credentials for authenticated user]
DRUPAL_BASIC_AUTH_ADMIN=[Basic authentication credentials for an content administrator for content previews]
```
Optional environment variables:
```bash
BUILD_PAGES=[Number of pages to build during `yarn build`]
NEXT_PUBLIC_GTM=[Google tag manager code]
NEXT_PUBLIC_DOMAIN=[Public domain for sitemap.xml urls]
DRUPAL_REVALIDATE_SECRET=[On demand revalidation token]
DRUPAL_PREVIEW_SECRET=[Drupal content preview token]
DRUPAL_REQUEST_HEADERS=[WAF bypass header json sting]
ALGOLIA_ID=[Algolia app ID]
ALGOLIA_INDEX=[Algolia index]
ALGOLIA_KEY=[Algolia search only key]
CACHE_CLEAR_USERNAME=[Admin cache management dashboard user name]
CACHE_CLEAR_PASSWORD=[Admin cache management dashboard password]
VAULT_ROLE_ID=[Vault role id for SAML credential storage]
VAULT_SECRET_ID=[Vault secret id for SAML credential storage]
VAULT_PATH=[Vault path to secret for SAML credential storage]
```

## Development Workflow

### Running Locally

```bash
# Install dependencies
yarn

# Run development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start

# Preview production build
yarn preview

# Compile GraphQL changes & generate typescript
yarn graphql

# Lint and typescript check
yarn lint
```

### Adding New Content Types

1. Create GraphQL query in `src/lib/gql`
2. Define any additional TypeScript types in `src/lib/@types/drupal`
3. Create page component in `src/components/nodes/pages`
4. Add paragraph components if needed in `src/components/paragraphs/`
5. Update Paragraph Renderer switch statement

### Adding New Paragraph Types

1. Define paragraph type in Drupal
2. Update GraphQL query fragments
3. Create corresponding React component in `src/components/paragraphs/`
4. Add type definition to `src/lib/@types/drupal`
5. Register in Paragraph Renderer

### Adding New Route Directories

Any new directory under `app/` that renders a user facing page needs its own `layout.tsx` wrapping
`children` in `SiteChrome`, otherwise the page renders with no header, footer, or `<main>` landmark.

```tsx
// app/[new-route]/layout.tsx
import SiteChrome from "@components/global/site-chrome"
import {ReactNode} from "react"

const Layout = ({children}: {children: ReactNode}) => <SiteChrome>{children}</SiteChrome>

export default Layout
```

If the route resolves a Drupal node and should honour the reduced chrome, await the flag and pass
it down, the way `app/[[...slug]]/layout.tsx` and `app/preview/[[...slug]]/layout.tsx` do:

```tsx
const Layout = async ({children, params}: Props) => (
  <SiteChrome minimal={await hasMinimalChrome((await params).slug)}>{children}</SiteChrome>
)
```

Rules for these layouts:

- Await the flag in the layout body. Don't wrap `PageHeader`/`PageFooter` in `<Suspense>` or hand
  `SiteChrome` an unresolved promise: it leaves the footer boundary pending in the static shell and
  adds keyed replay slots to the route's postponed state.
- Don't add a parallel route slot for chrome. See **Site Chrome** above for why.
- Error and not-found boundaries replace the segment they sit above, layout included, so any
  `not-found.tsx` at the root of `app/` has to render its own `SiteChrome`.

Exceptions that should **not** get chrome: API route handlers under `app/api`, `app/sitemap.tsx`,
and anything rendered into the `@modal` slot.

After adding a route, run `yarn build` and check the route table. A node route should stay `◐`
(Partial Prerender) or `ƒ` (Dynamic); an unexpected change here usually means the chrome is
blocking or streaming differently than intended.

## Styling Guidelines

**TailwindCSS Configuration**: `src/styles/index.css` (CSS-first `@theme`; there is no `tailwind.config.ts`)

**Custom Theme Extensions**:
- Colors:
  - Colors provided by decanter library
- Typography:
  - stanford font for wordmark
- Spacing:
  - Responsive spacing provided by decanter library
- Tailwind merge:
  - Whenever merging styles, make sure to use the custom merge function `src/lib/utils/className`
  - Example: `className={cn("text-black", {"text-blue": blueText}, props.className)}`

**Component Styling Pattern**: Utility-first

## Common Patterns

### Fetching Data

```typescript
// Example pattern for fetching content
graphqlClient().request<TypescriptType>(QueryDocument, {variables})
```

### Rendering Paragraphs

```jsx
// Example pattern for rendering paragraph entities
<Paragraph paragraph={paragraph} />
```

### Image Handling

**Strategy**: Next.js Image component

**Image Source**: `[DRUPAL_URL]/[PATH_TO_IMAGES]`

## Performance Considerations

- **Caching Strategy**:
  - All pages are cached indefinitely until triggered by on demand revalidation.
  - Some related content components revalidate after a shorter time due to unknown reference changes.
- **Image Optimization**: Uses default Next.JS image optimization configuration.
- **Revalidation**: On demand revalidation. POST request to /api/revalidate path.

## Troubleshooting

### Common Issues

**GraphQL Query Failures**:
- Verify Drupal GraphQL module is enabled
- Check endpoint URL in environment variables
- Check authentication credentials match Drupal user credentials
- Ensure Drupal's `flood` table is not blocking requests

**Paragraph Rendering Issues**:
- Ensure paragraph type name matches exactly
- Check Paragraph Renderer has case for new type
- Verify paragraph component is exported correctly

**Styling Issues**:
- Run `yarn build` to rebuild TailwindCSS
- Check the `@source` directives in `src/styles/index.css`
- Verify class names are not dynamically constructed

## Testing

**Testing Framework**: None

## Deployment

**Platform**: Vercel (primarily)

**Build Command**: `yarn build focus --production`

---

## Questions for AI Agents

When working with this codebase, AI agents should ask:

1. Which content type or paragraph type is being modified?
2. Is this a new feature or modification to existing functionality?
3. Should changes maintain the existing pattern or introduce a new pattern?
4. Are there specific accessibility or performance requirements?
5. Should new components be server or client components?

---

**Last Updated**: 2026-06-08

**Maintained By**: pookmish

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
