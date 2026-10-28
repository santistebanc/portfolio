import { useState, type ReactNode } from 'react'
import { TechIcon } from '../../src/components/TechIcon'

/** Square line marker used in navigation and section headings, like a transit line badge. */
export function LineBadge({ line, size = 'md' }: { line: string; size?: 'sm' | 'md' }) {
  return (
    <span className={`line-badge line-badge--${size}`} aria-hidden="true">
      {line}
    </span>
  )
}

export function SectionHead({
  id,
  line,
  title,
  children,
}: {
  id: string
  line: string
  title: string
  children?: ReactNode
}) {
  return (
    <header className="section-head" data-reveal-item>
      <h2 id={`${id}-title`} className="section-title">
        <LineBadge line={line} />
        <span>{title}</span>
      </h2>
      {children ? <div className="section-lede">{children}</div> : null}
    </header>
  )
}

export function TechList({ items, label }: { items: readonly string[]; label: string }) {
  return (
    <ul className="tech-list" aria-label={label}>
      {items.map((t) => (
        <li key={t}>
          <TechIcon name={t} size={13} />
          {t}
        </li>
      ))}
    </ul>
  )
}

/** Screenshot with an honest fallback panel if the remote image fails. */
export function Shot({
  src,
  alt,
  className = '',
  eager = false,
}: {
  src?: string
  alt: string
  className?: string
  eager?: boolean
}) {
  const [failed, setFailed] = useState(false)
  return (
    <div className={`shot ${className}`}>
      {!src || failed ? (
        <div className="shot-fallback" role="img" aria-label={`${alt} (screenshot unavailable)`}>
          <span>{alt}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}

export function ExternalLink({
  href,
  children,
  className = 'text-link',
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  const external = /^https?:/.test(href) || href.endsWith('.pdf')
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  )
}

export function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">
      <path d="M3 8h9M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  )
}
