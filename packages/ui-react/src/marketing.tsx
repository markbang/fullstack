import type { WorkspaceApp } from '@repo/shared'
import { BookOpenText, LaptopMinimalCheck, MonitorSmartphone, ServerCog } from 'lucide-react'
import type { ReactNode } from 'react'
import { Panel, SurfaceCard } from './primitives'

const iconMap = {
  'monitor-smartphone': MonitorSmartphone,
  'book-open-text': BookOpenText,
  'laptop-minimal-check': LaptopMinimalCheck,
  'server-cog': ServerCog,
} as const

export function MarketingSplitHero(props: {
  eyebrow: ReactNode
  title: ReactNode
  description: ReactNode
  actions?: ReactNode
  badges?: ReactNode
  footer?: ReactNode
  aside?: ReactNode
  className?: string
  titleClassName?: string
  descriptionClassName?: string
}) {
  return (
    <Panel className={props.className ?? 'overflow-hidden p-6 sm:p-8'}>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(22rem,0.8fr)] lg:items-end">
        <div className="space-y-5">
          <div>{props.eyebrow}</div>
          <h1
            className={
              props.titleClassName ?? 'max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl'
            }
          >
            {props.title}
          </h1>
          <div className={props.descriptionClassName ?? 'max-w-2xl text-base leading-7 sm:text-lg'}>
            {props.description}
          </div>
          {props.badges ? <div className="flex flex-wrap gap-2">{props.badges}</div> : null}
          {props.actions ? <div className="flex flex-wrap gap-3">{props.actions}</div> : null}
          {props.footer ? <div className="flex flex-wrap gap-3">{props.footer}</div> : null}
        </div>

        {props.aside ? <div>{props.aside}</div> : null}
      </div>
    </Panel>
  )
}

export function WorkspaceAppGrid(props: {
  apps: WorkspaceApp[]
  variant: 'detailed' | 'compact' | 'bulleted'
}) {
  if (props.variant === 'compact') {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {props.apps.map((surface) => {
          const Icon = iconMap[surface.iconKey as keyof typeof iconMap]

          return (
            <SurfaceCard
              key={surface.slug}
              className="stack-surface-card p-4"
              description={
                <p className="text-sm leading-6 text-fd-muted-foreground">
                  {surface.shortDescription}
                </p>
              }
              icon={<Icon className="size-5 text-fd-primary" />}
              title={
                <span className="text-sm font-semibold text-fd-foreground">{surface.title}</span>
              }
            />
          )
        })}
      </div>
    )
  }

  if (props.variant === 'bulleted') {
    return (
      <section className="grid gap-4 md:grid-cols-2">
        {props.apps.map((section) => (
          <SurfaceCard
            key={section.slug}
            className="stack-panel min-w-0 p-6"
            description={
              <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-white/72">
                {section.points.map((point) => (
                  <li key={point} className="break-words">
                    {point}
                  </li>
                ))}
              </ul>
            }
            meta={<p className="text-sm text-white/50">{section.path}</p>}
            title={<span className="text-xl font-semibold text-white">{section.title}</span>}
          />
        ))}
      </section>
    )
  }

  return (
    <section className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-4">
      {props.apps.map((item) => {
        const Icon = iconMap[item.iconKey as keyof typeof iconMap]

        return (
          <SurfaceCard
            key={item.slug}
            className="stack-panel flex min-h-[220px] flex-col p-5"
            description={<p className="text-sm leading-6 text-white/72">{item.description}</p>}
            icon={<Icon className="mt-1 size-5 text-accent" />}
            meta={<p className="text-sm text-white/50">{item.path}</p>}
            title={<span className="text-lg font-semibold text-white">{item.title}</span>}
          />
        )
      })}
    </section>
  )
}

export function MarketingHighlights<
  T extends { title: string; description: string; icon: ReactNode },
>(props: { items: T[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {props.items.map((item) => (
        <SurfaceCard
          key={item.title}
          className="stack-surface-card p-5"
          description={
            <p className="text-sm leading-6 text-fd-muted-foreground">{item.description}</p>
          }
          icon={item.icon}
          title={<span className="text-lg font-semibold text-fd-foreground">{item.title}</span>}
        />
      ))}
    </div>
  )
}
