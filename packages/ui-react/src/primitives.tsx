import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

type PanelProps<T extends ElementType> = {
  as?: T
  className?: string
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>

export function Panel<T extends ElementType = 'section'>({
  as,
  className,
  children,
  ...props
}: PanelProps<T>) {
  const Component = (as ?? 'section') as ElementType

  return (
    <Component className={cx('stack-panel', className)} {...props}>
      {children}
    </Component>
  )
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx('stack-label', className)}>{children}</p>
}

export function SurfaceCard({
  className,
  icon,
  meta,
  title,
  description,
  children,
}: {
  className?: string
  icon?: ReactNode
  meta?: ReactNode
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
}) {
  return (
    <article className={className}>
      <div className={cx('flex items-start justify-between gap-4', !(meta || icon) && 'block')}>
        <div className="min-w-0">
          <h3>{title}</h3>
          {meta ? <div className="mt-1">{meta}</div> : null}
        </div>
        {icon ? <div aria-hidden>{icon}</div> : null}
      </div>
      {description ? <div className="mt-2">{description}</div> : null}
      {children ? <div className="mt-4">{children}</div> : null}
    </article>
  )
}
