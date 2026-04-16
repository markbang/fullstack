import { Chip } from '@heroui/react'
import { brand, heroTags, workspaceApps } from '@repo/shared'
import { Eyebrow, MarketingSplitHero } from '@repo/ui-react'

export function LandingHero(props: { onOpenDocs: () => void; onExploreStack: () => void }) {
  return (
    <MarketingSplitHero
      actions={
        <>
          <button
            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-white/92"
            onClick={props.onExploreStack}
            type="button"
          >
            查看应用栈
          </button>
          <button
            className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/22 hover:bg-white/12"
            onClick={props.onOpenDocs}
            type="button"
          >
            打开文档
          </button>
        </>
      }
      badges={heroTags.map((tag) => (
        <Chip key={tag} className="rounded-full" color="accent" size="sm" variant="soft">
          {tag}
        </Chip>
      ))}
      className="relative overflow-hidden px-6 py-10 sm:px-10 sm:py-12"
      description={<p>{brand.heroDescription}</p>}
      descriptionClassName="max-w-2xl text-base leading-7 text-white/72 sm:text-lg"
      eyebrow={<Eyebrow>{brand.name}</Eyebrow>}
      footer={workspaceApps.map((app) => (
        <code
          key={app.slug}
          className="rounded-full border border-white/12 bg-black/20 px-3 py-1 text-sm text-white/72"
        >
          {app.path}
        </code>
      ))}
      title={brand.heroTitle}
      titleClassName="max-w-[14ch] text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
    />
  )
}
