/**
 * Tiny physics kit: springs, velocity tracking, momentum projection, rubber-banding.
 *
 * Springs are described the way Apple describes them: a damping ratio (1 = no
 * overshoot) and a response in seconds (how quickly the value gets there). A
 * spring has no fixed duration, so it can be re-targeted at any instant and it
 * always continues from its current (presentation) value and velocity.
 */

export interface SpringConfig {
  /** 1 = critically damped (no bounce). Lower = bouncier. */
  damping: number
  /** Seconds. Lower = snappier. Not a duration. */
  response: number
}

/** House default: graceful, no overshoot. */
export const SPRING_SMOOTH: SpringConfig = { damping: 1, response: 0.4 }
/** Only after a gesture that carried momentum (a flick). */
export const SPRING_MOMENTUM: SpringConfig = { damping: 0.82, response: 0.4 }
/** Sheets and drawers (Apple ships 0.8 / 0.3). */
export const SPRING_SHEET: SpringConfig = { damping: 0.8, response: 0.3 }
/** Sheet settling home with no momentum. */
export const SPRING_SHEET_CALM: SpringConfig = { damping: 1, response: 0.3 }

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const STEP = 1 / 240

export class Spring {
  value: number
  velocity = 0
  target: number
  config: SpringConfig
  private frame = 0
  private last = 0
  private onRest?: () => void

  constructor(
    initial: number,
    private readonly onUpdate: (value: number) => void,
    config: SpringConfig = SPRING_SMOOTH,
  ) {
    this.value = initial
    this.target = initial
    this.config = config
  }

  get animating() {
    return this.frame !== 0
  }

  /** Track a value directly (1:1 with the finger). Stops any motion in flight. */
  set(value: number) {
    this.stop()
    this.velocity = 0
    this.value = value
    this.target = value
    this.onUpdate(value)
  }

  /**
   * Animate toward `target`, starting from wherever the value is right now.
   * `velocity` is in units per second (px/s for positions).
   */
  to(target: number, opts: { velocity?: number; config?: SpringConfig; onRest?: () => void } = {}) {
    this.target = target
    if (opts.velocity !== undefined) this.velocity = opts.velocity
    if (opts.config) this.config = opts.config
    this.onRest = opts.onRest

    if (prefersReducedMotion()) {
      this.set(target)
      opts.onRest?.()
      return
    }

    if (this.frame === 0) {
      this.last = performance.now()
      this.frame = requestAnimationFrame(this.tick)
    }
  }

  /** Freeze at the current presentation value (used when a gesture grabs it). */
  stop() {
    if (this.frame !== 0) cancelAnimationFrame(this.frame)
    this.frame = 0
    this.onRest = undefined
  }

  private tick = (now: number) => {
    let dt = Math.min(Math.max((now - this.last) / 1000, 0), 1 / 30)
    this.last = now

    const { damping, response } = this.config
    const omega = (2 * Math.PI) / response
    const stiffness = omega * omega
    const friction = 2 * damping * omega

    while (dt > 0) {
      const h = Math.min(STEP, dt)
      const accel = -stiffness * (this.value - this.target) - friction * this.velocity
      this.velocity += accel * h
      this.value += this.velocity * h
      dt -= h
    }

    if (Math.abs(this.velocity) < 2 && Math.abs(this.value - this.target) < 0.1) {
      this.value = this.target
      this.velocity = 0
      this.frame = 0
      this.onUpdate(this.value)
      const done = this.onRest
      this.onRest = undefined
      done?.()
      return
    }

    this.onUpdate(this.value)
    this.frame = requestAnimationFrame(this.tick)
  }
}

/** Keeps a short history of pointer positions so we know the velocity at release. */
export class VelocityTracker {
  private samples: { t: number; v: number }[] = []

  reset() {
    this.samples = []
  }

  add(value: number, t = performance.now()) {
    this.samples.push({ t, v: value })
    while (this.samples.length > 2 && t - this.samples[0].t > 100) this.samples.shift()
  }

  /** px/s. Zero if the pointer paused before release. */
  velocity(now = performance.now()): number {
    const s = this.samples
    if (s.length < 2) return 0
    const last = s[s.length - 1]
    if (now - last.t > 60) return 0
    const first = s[0]
    const dt = (last.t - first.t) / 1000
    return dt > 0 ? (last.v - first.v) / dt : 0
  }
}

/** Apple's momentum projection: where would a flick come to rest? */
export function project(velocity: number, decelerationRate = 0.998): number {
  return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate)
}

/** Progressive resistance past a boundary. */
export function rubberband(overshoot: number, dimension: number, constant = 0.55): number {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot))
}

/** Clamp `value` into [min, max], rubber-banding whatever spills over. */
export function rubberbandClamp(value: number, min: number, max: number, dimension: number): number {
  if (value < min) return min + rubberband(value - min, dimension)
  if (value > max) return max + rubberband(value - max, dimension)
  return value
}

export function nearest(values: number[], to: number): number {
  let best = 0
  for (let i = 1; i < values.length; i++) {
    if (Math.abs(values[i] - to) < Math.abs(values[best] - to)) best = i
  }
  return best
}
