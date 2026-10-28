import { useEffect, useRef, useState } from 'react'

type Status = 'loading' | 'loaded' | 'error'

/**
 * Screenshot with the full state set: a skeleton shaped like a browser
 * window while loading, a fade in once decoded, and a composed fallback
 * card if the image fails.
 */
export function Shot({
  src,
  alt,
  title,
  className = '',
  eager = false,
}: {
  src: string
  alt: string
  title: string
  className?: string
  eager?: boolean
}) {
  const [status, setStatus] = useState<Status>('loading')
  const imgRef = useRef<HTMLImageElement>(null)

  // Cached images can finish before React attaches onLoad.
  useEffect(() => {
    const img = imgRef.current
    if (img?.complete) setStatus(img.naturalWidth > 0 ? 'loaded' : 'error')
  }, [])

  return (
    <div className={`shot ${className}`} data-status={status}>
      {status !== 'loaded' && (
        <div className="shot-skeleton" aria-hidden={status === 'loading'}>
          {status === 'loading' ? (
            <>
              <span className="sk sk-bar" />
              <span className="sk-grid">
                <span className="sk" />
                <span className="sk" />
                <span className="sk" />
                <span className="sk" />
              </span>
            </>
          ) : (
            <span className="shot-fallback" role="img" aria-label={alt}>
              <span className="ph ph-image-broken" aria-hidden="true" />
              <span>{title} screenshot is unavailable right now</span>
            </span>
          )}
        </div>
      )}
      {status !== 'error' && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
        />
      )}
    </div>
  )
}
