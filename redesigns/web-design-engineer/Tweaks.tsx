import { useEffect, useId, useRef, useState } from 'react'

/** Storage key is shared with the inline pre-paint script in index.html. */
const STORAGE_KEY = 'wde-tweaks'

type Theme = 'system' | 'day' | 'night'
type Signal = 'yellow' | 'orange'
type Motion = 'on' | 'off'
interface TweakState {
  theme: Theme
  signal: Signal
  motion: Motion
}

const DEFAULTS: TweakState = { theme: 'system', signal: 'yellow', motion: 'on' }

function load(): TweakState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? { ...DEFAULTS, ...(JSON.parse(raw) as Partial<TweakState>) } : DEFAULTS
  } catch {
    return DEFAULTS
  }
}

function apply(state: TweakState) {
  const root = document.documentElement
  if (state.theme === 'system') delete root.dataset.theme
  else root.dataset.theme = state.theme
  root.dataset.signal = state.signal
  if (state.motion === 'off') root.dataset.motion = 'off'
  else delete root.dataset.motion
}

const groups = [
  {
    key: 'theme',
    legend: 'Service',
    options: [
      { value: 'system', label: 'System' },
      { value: 'day', label: 'Day' },
      { value: 'night', label: 'Night' },
    ],
  },
  {
    key: 'signal',
    legend: 'Signal color',
    options: [
      { value: 'yellow', label: 'Yellow' },
      { value: 'orange', label: 'Orange' },
    ],
  },
  {
    key: 'motion',
    legend: 'Motion',
    options: [
      { value: 'on', label: 'On' },
      { value: 'off', label: 'Off' },
    ],
  },
] as const

export function Tweaks() {
  const [open, setOpen] = useState(false)
  const [state, setState] = useState<TweakState>(load)
  const panelId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    apply(state)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* storage unavailable: tweaks still apply for this visit */
    }
  }, [state])

  useEffect(() => {
    if (!open) return
    panelRef.current?.querySelector<HTMLInputElement>('input:checked')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div className="tweaks">
      {open ? (
        <div className="tweaks-panel" id={panelId} ref={panelRef} role="dialog" aria-label="Tweaks">
          <p className="tweaks-title">Tweaks</p>
          {groups.map((g) => (
            <fieldset key={g.key} className="tweaks-group">
              <legend>{g.legend}</legend>
              <div className="tweaks-options">
                {g.options.map((o) => (
                  <label key={o.value} className="tweaks-option">
                    <input
                      type="radio"
                      name={`tweak-${g.key}`}
                      value={o.value}
                      checked={state[g.key] === o.value}
                      onChange={() => setState((s) => ({ ...s, [g.key]: o.value }))}
                    />
                    <span>{o.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </div>
      ) : null}
      <button
        ref={toggleRef}
        type="button"
        className="tweaks-toggle"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? 'Close' : 'Tweaks'}
      </button>
    </div>
  )
}
