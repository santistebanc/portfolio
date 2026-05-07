const CUBE_COUNT = 150

export default function DecoPattern() {
  return (
    <div className="deco-pattern" aria-hidden="true">
      <div className="deco-inner">
        {Array.from({ length: CUBE_COUNT }).map((_, i) => (
          <div key={i} className="flat3d">
            <span />
          </div>
        ))}
      </div>
    </div>
  )
}
