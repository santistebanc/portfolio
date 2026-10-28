import { useLayoutEffect, useRef, type RefObject } from 'react'
import {
  Spring,
  VelocityTracker,
  SPRING_SHEET,
  SPRING_SHEET_CALM,
  prefersReducedMotion,
  project,
  rubberband,
} from './physics'
import { cvPrimary, cvVariants } from './content'

export interface SheetHandle {
  open: (trigger: HTMLElement | null) => void
}

const FLICK = 400 // px/s: above this the velocity's sign decides, not the position

/**
 * Bottom sheet for CV downloads. Rides a spring, follows the finger, can be
 * flicked away or grabbed again while it is closing, and pushes the page back
 * while it is up. Native <dialog> supplies focus containment and inertness.
 */
export function CvSheet({ handle, pageId }: { handle: RefObject<SheetHandle | null>; pageId: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)
  const scrimRef = useRef<HTMLDivElement>(null)
  const grabRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useLayoutEffect(() => {
    const dialog = dialogRef.current
    const sheet = sheetRef.current
    const scrim = scrimRef.current
    const grab = grabRef.current
    const closeBtn = closeRef.current
    if (!dialog || !sheet || !scrim || !grab || !closeBtn) return

    let height = 1
    let trigger: HTMLElement | null = null
    let reducedTimer = 0

    const page = () => document.getElementById(pageId)

    const render = (y: number) => {
      sheet.style.transform = `translate3d(0, ${y}px, 0)`
      const p = Math.min(Math.max(1 - y / height, 0), 1)
      scrim.style.opacity = String(p)
      const el = page()
      if (el) {
        // Push the page back in proportion to how far the sheet is up.
        el.style.transform = p > 0.001 ? `scale(${1 - 0.045 * p})` : ''
        el.style.borderRadius = p > 0.001 ? `${18 * p}px` : ''
      }
    }

    const spring = new Spring(0, render, SPRING_SHEET)
    const offscreen = () => height + 32

    const finishClose = () => {
      const el = page()
      if (el) {
        el.style.transformOrigin = ''
        delete el.dataset.pushed
      }
      delete dialog.dataset.closing
      dialog.close()
      trigger?.focus({ preventScroll: true })
    }

    const open = (t: HTMLElement | null) => {
      trigger = t
      window.clearTimeout(reducedTimer)
      delete dialog.dataset.closing
      const wasOpen = dialog.open
      if (!wasOpen) dialog.showModal()
      height = sheet.offsetHeight || 1

      const el = page()
      if (el && !wasOpen) {
        el.style.transformOrigin = `50% ${window.scrollY + window.innerHeight / 2}px`
        el.dataset.pushed = ''
      }

      if (prefersReducedMotion()) {
        // Cross-fade only (see CSS); no slide, no page push.
        sheet.style.transform = ''
        scrim.style.opacity = '1'
        return
      }
      if (!wasOpen) spring.set(offscreen())
      spring.to(0, { config: SPRING_SHEET_CALM }) // no momentum behind it, so no bounce
    }

    const close = (velocity = 0) => {
      if (!dialog.open) return
      if (prefersReducedMotion()) {
        dialog.dataset.closing = ''
        reducedTimer = window.setTimeout(finishClose, 200)
        return
      }
      spring.to(offscreen(), { velocity, config: SPRING_SHEET_CALM, onRest: finishClose })
    }

    handle.current = { open }

    // ---- Drag from the grabber/header ----
    const tracker = new VelocityTracker()
    let pointerId = -1
    let startY = 0
    let startValue = 0

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 || prefersReducedMotion()) return
      if ((e.target as HTMLElement).closest('button')) return
      spring.stop() // grab it wherever it is, even mid-close
      pointerId = e.pointerId
      grab.setPointerCapture(e.pointerId)
      startY = e.clientY
      startValue = spring.value
      tracker.reset()
      tracker.add(startValue)
      sheet.dataset.dragging = ''
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerId !== pointerId) return
      const raw = startValue + (e.clientY - startY)
      tracker.add(raw)
      // Pulling up past fully-open resists progressively.
      spring.set(raw < 0 ? rubberband(raw, height) : raw)
    }

    const onUp = (e: PointerEvent) => {
      if (e.pointerId !== pointerId) return
      pointerId = -1
      delete sheet.dataset.dragging
      const v = e.type === 'pointercancel' ? 0 : tracker.velocity()
      const projected = spring.value + project(v)
      const dismiss = Math.abs(v) > FLICK ? v > 0 : projected > height * 0.5
      if (dismiss) close(v)
      else spring.to(0, { velocity: v, config: Math.abs(v) > FLICK ? SPRING_SHEET : SPRING_SHEET_CALM })
    }

    const onCancel = (e: Event) => {
      e.preventDefault() // Escape: animate out instead of vanishing
      close()
    }
    const onScrim = () => close()
    const onCloseBtn = () => close()

    grab.addEventListener('pointerdown', onDown)
    grab.addEventListener('pointermove', onMove)
    grab.addEventListener('pointerup', onUp)
    grab.addEventListener('pointercancel', onUp)
    dialog.addEventListener('cancel', onCancel)
    scrim.addEventListener('click', onScrim)
    closeBtn.addEventListener('click', onCloseBtn)

    return () => {
      spring.stop()
      window.clearTimeout(reducedTimer)
      grab.removeEventListener('pointerdown', onDown)
      grab.removeEventListener('pointermove', onMove)
      grab.removeEventListener('pointerup', onUp)
      grab.removeEventListener('pointercancel', onUp)
      dialog.removeEventListener('cancel', onCancel)
      scrim.removeEventListener('click', onScrim)
      closeBtn.removeEventListener('click', onCloseBtn)
      handle.current = null
    }
  }, [handle, pageId])

  return (
    <dialog className="cv-dialog" ref={dialogRef} aria-labelledby="cv-sheet-title">
      <div className="cv-scrim" ref={scrimRef} aria-hidden="true" />
      <div className="cv-sheet" ref={sheetRef}>
        <div className="cv-sheet-head" ref={grabRef}>
          <span className="cv-grabber" aria-hidden="true" />
          <div className="cv-sheet-titles">
            <h2 id="cv-sheet-title">Download CV</h2>
            <p>PDF, tailored by role. Same facts, different emphasis.</p>
          </div>
          <button type="button" className="round-btn cv-close" ref={closeRef} aria-label="Close">
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="cv-sheet-body">
          <a className="cv-primary" href={cvPrimary.href} target="_blank" rel="noopener noreferrer">
            <DocIcon />
            <span>
              <strong>{cvPrimary.label}</strong>
              <small>{cvPrimary.detail}</small>
            </span>
            <span className="cv-primary-action" aria-hidden="true">Open</span>
          </a>

          <p className="group-label" id="cv-variants-label">By role</p>
          <ul className="inset-list" aria-labelledby="cv-variants-label">
            {cvVariants.map((cv) => (
              <li key={cv.href}>
                <a href={cv.href} target="_blank" rel="noopener noreferrer" className="inset-row">
                  <span className="inset-row-main">
                    <span className="inset-row-title">{cv.label}</span>
                    <span className="inset-row-sub">{cv.detail}</span>
                  </span>
                  <span className="inset-row-chevron" aria-hidden="true">›</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </dialog>
  )
}

function DocIcon() {
  return (
    <svg className="cv-doc-icon" viewBox="0 0 32 40" aria-hidden="true" focusable="false">
      <path d="M4 2h16l8 8v26a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" fill="currentColor" opacity=".14" />
      <path d="M20 2v8h8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" opacity=".5" />
      <path d="M8 18h16M8 23h16M8 28h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
