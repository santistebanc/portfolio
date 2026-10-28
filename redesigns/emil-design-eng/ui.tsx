import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from 'react'
import { cvLinks, EMAIL } from './content'

/* ------------------------------------------------------------------ icons */

type IconProps = { className?: string }

export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ArrowDown({ className }: IconProps) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 3v10m-4-4 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Chevron({ className }: IconProps) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CopyIcon({ className }: IconProps) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="5.5" y="5.5" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10.5 3.5v-.25A1.25 1.25 0 0 0 9.25 2h-5A1.25 1.25 0 0 0 3 3.25v5c0 .69.56 1.25 1.25 1.25h.25" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function CheckIcon({ className }: IconProps) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function GitHubIcon({ className }: IconProps) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.3-.5-1.5.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
    </svg>
  )
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1.75" y="3.25" width="12.5" height="9.5" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="m2.5 4.5 5.5 4 5.5-4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  )
}

function DocIcon({ className }: IconProps) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 1.75h5L12.25 5v8A1.25 1.25 0 0 1 11 14.25H4A1.25 1.25 0 0 1 2.75 13V3A1.25 1.25 0 0 1 4 1.75Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M8.75 2v3.25H12M5.5 8.5h4M5.5 11h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

/* ---------------------------------------------------------------- tooltip */

/**
 * The first tooltip waits before appearing so passing the cursor over an icon
 * doesn't flash it. Once one has been shown, moving to a neighbour within the
 * grace window opens it instantly with no transition, which is what makes a
 * toolbar of tooltips feel fast.
 */
const TOOLTIP_DELAY = 500
const TOOLTIP_GRACE = 400
let lastTooltipClose = 0

export function Tooltip({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [instant, setInstant] = useState(false)
  const timer = useRef(0)

  const show = (immediate: boolean) => {
    window.clearTimeout(timer.current)
    if (immediate) {
      setInstant(true)
      setOpen(true)
      return
    }
    setInstant(false)
    timer.current = window.setTimeout(() => setOpen(true), TOOLTIP_DELAY)
  }

  const hide = () => {
    window.clearTimeout(timer.current)
    setOpen((wasOpen) => {
      if (wasOpen) lastTooltipClose = performance.now()
      return false
    })
  }

  useEffect(() => () => window.clearTimeout(timer.current), [])

  return (
    <span
      className="tooltip-anchor"
      onPointerEnter={(e) => {
        if (e.pointerType !== 'mouse') return
        show(performance.now() - lastTooltipClose < TOOLTIP_GRACE)
      }}
      onPointerLeave={hide}
      onPointerDown={hide}
      // Keyboard focus shows it at once: someone tabbing is reading, not skimming.
      onFocus={(e) => {
        if (e.target.matches(':focus-visible')) show(true)
      }}
      onBlur={hide}
    >
      {children}
      <span className="tooltip" data-open={open} data-instant={instant} aria-hidden="true">
        {label}
      </span>
    </span>
  )
}

/* ------------------------------------------------------- copy email button */

const COPIED_FOR = 1800

/**
 * Copies the address and morphs its icon and label into a confirmation. The two
 * states are stacked in one grid cell so the button keeps the width of the
 * longer label instead of jumping, and the crossfade uses a small blur so it
 * reads as one shape changing rather than two swapping.
 */
export function CopyEmailButton({ className = '' }: { className?: string }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
    } catch {
      window.location.href = `mailto:${EMAIL}`
      return
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), COPIED_FOR)
  }

  return (
    <button type="button" className={`btn btn-secondary copy-btn ${className}`} data-copied={copied} onClick={copy}>
      <span className="swap swap-icon">
        <CopyIcon className="swap-a" />
        <CheckIcon className="swap-b" />
      </span>
      <span className="swap swap-label">
        <span className="swap-a">Copy email</span>
        <span className="swap-b" aria-hidden="true">Copied</span>
      </span>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? 'Email address copied to clipboard' : ''}
      </span>
    </button>
  )
}

/* ---------------------------------------------------------------- CV menu */

const MENU_WIDTH = 272
const VIEWPORT_GUTTER = 12

/**
 * Download menu for the CV variants. It scales out of its trigger (the
 * transform-origin follows whichever edge it is aligned to), exits faster than
 * it enters, and opens with no animation at all when triggered from the
 * keyboard, where motion only gets in the way.
 */
export function CvMenu({ placement = 'bottom', className = '' }: { placement?: 'bottom' | 'top'; className?: string }) {
  const [open, setOpen] = useState(false)
  const [instant, setInstant] = useState(false)
  const [align, setAlign] = useState<'start' | 'end'>('start')
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const pendingFocus = useRef<'first' | 'last' | 'menu' | null>(null)
  const menuId = useId()

  const items = () => Array.from(menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? [])

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false)
    if (returnFocus) triggerRef.current?.focus()
  }, [])

  const openMenu = (fromKeyboard: boolean, focus: 'first' | 'last' | 'menu') => {
    const rect = triggerRef.current?.getBoundingClientRect()
    if (rect) {
      setAlign(rect.left + MENU_WIDTH > window.innerWidth - VIEWPORT_GUTTER ? 'end' : 'start')
    }
    setInstant(fromKeyboard)
    pendingFocus.current = focus
    setOpen(true)
  }

  useLayoutEffect(() => {
    const target = pendingFocus.current
    if (!open || !target) return
    pendingFocus.current = null
    const list = items()
    if (target === 'first') list[0]?.focus()
    else if (target === 'last') list[list.length - 1]?.focus()
    else menuRef.current?.focus()
  }, [open])

  // Close on outside press and when focus leaves the component.
  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close(false)
    }
    const onFocusIn = (e: FocusEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('focusin', onFocusIn)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('focusin', onFocusIn)
    }
  }, [open, close])

  const onTriggerClick = (e: ReactMouseEvent) => {
    // detail === 0 means the click was synthesised from Enter or Space.
    const fromKeyboard = e.detail === 0
    if (open) close(false)
    else openMenu(fromKeyboard, fromKeyboard ? 'first' : 'menu')
  }

  const onTriggerKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      openMenu(true, e.key === 'ArrowDown' ? 'first' : 'last')
    }
  }

  const onMenuKeyDown = (e: ReactKeyboardEvent) => {
    const list = items()
    const index = list.indexOf(document.activeElement as HTMLElement)
    const move = (next: number) => {
      e.preventDefault()
      setInstant(true)
      list[(next + list.length) % list.length]?.focus()
    }
    switch (e.key) {
      case 'ArrowDown':
        return move(index + 1)
      case 'ArrowUp':
        return move(index < 0 ? list.length - 1 : index - 1)
      case 'Home':
        return move(0)
      case 'End':
        return move(list.length - 1)
      case 'Escape':
        e.preventDefault()
        setInstant(true)
        return close(true)
      case 'Tab':
        setInstant(true)
        return close(false)
    }
  }

  return (
    <div className={`menu-root ${className}`} ref={rootRef}>
      <button
        ref={triggerRef}
        type="button"
        className="btn btn-secondary"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={onTriggerClick}
        onKeyDown={onTriggerKeyDown}
      >
        <DocIcon />
        Download CV
        <Chevron className="menu-chevron" />
      </button>

      <div
        ref={menuRef}
        id={menuId}
        role="menu"
        aria-label="CV versions"
        tabIndex={-1}
        className="menu"
        data-open={open}
        data-instant={instant}
        data-placement={placement}
        data-align={align}
        inert={!open}
        onKeyDown={onMenuKeyDown}
      >
        <p className="menu-heading" aria-hidden="true">
          Choose a version
        </p>
        {cvLinks.map((link) => (
          <a
            key={link.href}
            role="menuitem"
            className="menu-item"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
            onClick={() => close(false)}
            onPointerMove={(e) => {
              // Pointer and keyboard share a single highlight: hovering moves focus.
              if (document.activeElement !== e.currentTarget) e.currentTarget.focus({ preventScroll: true })
            }}
          >
            <span>{link.label}</span>
            {link.note && <span className="menu-note">{link.note}</span>}
            <span className="menu-ext">PDF</span>
          </a>
        ))}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------- accordion */

export function Disclosure({
  id,
  open,
  onToggle,
  summary,
  children,
}: {
  id: string
  open: boolean
  onToggle: () => void
  summary: ReactNode
  children: ReactNode
}) {
  return (
    <div className="disclosure" data-open={open}>
      <button
        type="button"
        className="disclosure-trigger"
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        id={`${id}-trigger`}
        onClick={onToggle}
      >
        {summary}
        <span className="plus" aria-hidden="true" />
      </button>
      <div
        className="disclosure-panel"
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-trigger`}
        inert={!open}
      >
        <div className="disclosure-inner">{children}</div>
      </div>
    </div>
  )
}
