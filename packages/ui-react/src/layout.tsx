import type { ReactNode } from 'react'

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export function SectionStack({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('flex flex-col gap-4', className)}>{children}</div>
}

export function ActionRow({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('flex flex-wrap gap-3', className)}>{children}</div>
}

export function FieldGrid({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('grid gap-4 md:grid-cols-3', className)}>{children}</div>
}
