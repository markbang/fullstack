import type { InputHTMLAttributes, ReactNode } from 'react'

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export function FieldLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cx('text-xs font-semibold uppercase tracking-[0.18em] text-white/45', className)}
    >
      {children}
    </span>
  )
}

export function TextField({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cx(
        'w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-white/20 focus:bg-black/28',
        className,
      )}
      {...props}
    />
  )
}

export function FieldHint({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx('text-xs leading-5 text-white/45', className)}>{children}</p>
}

export function ReadOnlyField({
  label,
  value,
  hint,
  className,
}: {
  label: ReactNode
  value: string
  hint?: ReactNode
  className?: string
}) {
  return (
    <div className={cx('stack-panel min-w-0 p-4', className)}>
      <FieldLabel>{label}</FieldLabel>
      <TextField className="mt-3" readOnly value={value} />
      {hint ? <FieldHint className="mt-2">{hint}</FieldHint> : null}
    </div>
  )
}
