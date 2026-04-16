import { createFileRoute, notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import browserCollections from 'collections/browser'
import { useFumadocsLoader } from 'fumadocs-core/source/client'
import type { TOCItemType } from 'fumadocs-core/toc'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page'
import { type ComponentType, Suspense } from 'react'
import { useMDXComponents } from '@/components/mdx'
import { baseOptions } from '@/lib/layout.shared'
import { gitConfig } from '@/lib/shared'
import { getPageMarkdownUrl, source } from '@/lib/source'

export const Route = createFileRoute('/docs/$')({
  component: Page,
  loader: async ({ params }) => {
    const slugs = params._splat?.split('/') ?? []
    const data = await serverLoader({ data: slugs })
    await clientLoader.preload(data.path)
    return data
  },
})

const serverLoader = createServerFn({
  method: 'GET',
})
  .inputValidator((slugs: string[]) => slugs)
  .handler(async ({ data: slugs }) => {
    const page = source.getPage(slugs)
    if (!page) throw notFound()

    return {
      path: page.path,
      markdownUrl: getPageMarkdownUrl(page).url,
      pageTree: await source.serializePageTree(source.getPageTree()),
    }
  })

type DocsContentProps = {
  toc: TOCItemType[]
  frontmatter: {
    title: string
    description?: string
  }
  default: ComponentType<{
    components: ReturnType<typeof useMDXComponents>
  }>
  markdownUrl: string
  path: string
}

function DocsContent({ toc, frontmatter, default: MDX, markdownUrl, path }: DocsContentProps) {
  const components = useMDXComponents()

  return (
    <DocsPage toc={toc}>
      <DocsTitle>{frontmatter.title}</DocsTitle>
      <DocsDescription>{frontmatter.description}</DocsDescription>
      <div className="-mt-4 flex items-center gap-2 border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover
          markdownUrl={markdownUrl}
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${path}`}
        />
      </div>
      <DocsBody>
        <MDX components={components} />
      </DocsBody>
    </DocsPage>
  )
}

const clientLoader = browserCollections.docs.createClientLoader({
  component(
    { toc, frontmatter, default: MDX },
    {
      markdownUrl,
      path,
    }: {
      markdownUrl: string
      path: string
    },
  ) {
    return (
      <DocsContent
        default={MDX}
        frontmatter={frontmatter}
        markdownUrl={markdownUrl}
        path={path}
        toc={toc}
      />
    )
  },
})

function Page() {
  const { path, pageTree, markdownUrl } = useFumadocsLoader(Route.useLoaderData())

  return (
    <DocsLayout {...baseOptions()} tree={pageTree}>
      <Suspense>{clientLoader.useContent(path, { markdownUrl, path })}</Suspense>
    </DocsLayout>
  )
}
