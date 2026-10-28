const steps = [
  {
    title: 'Research',
    body: 'Map the problem, tool choices, framework fit, and architecture risk before choosing an implementation path.',
  },
  {
    title: 'Decide',
    body: 'Pressure-test behavior, scope, architecture, and tradeoffs before the build gets expensive.',
  },
  {
    title: 'Prototype',
    body: 'Use small interactive prototypes to test the direction and expose missing product details.',
  },
  {
    title: 'Build in slices',
    body: 'Implement vertical slices so each piece can be reviewed, tested, and steered.',
  },
  {
    title: 'Review and verify',
    body: 'Inspect UX, architecture, code quality, types, edge cases, and product fit.',
  },
  {
    title: 'Ship and maintain',
    body: 'Use AI support for CI, hosting, monitoring, analytics, and maintenance work after release.',
  },
] as const

export default function AIWorkflow() {
  const firstHalf = steps.slice(0, 3)
  const secondHalf = steps.slice(3)

  return (
    <section className="page-section workflow-section" id="ai-workflow" aria-labelledby="workflow-title">
      <div className="workflow-intro" data-reveal>
        <h2 id="workflow-title">Practical assistance, deliberate review</h2>
        <p>
          I use coding agents and AI SDKs to accelerate delivery while staying responsible for architecture, UX, and code quality.
        </p>
      </div>

      <div className="workflow-columns" data-reveal>
        {[firstHalf, secondHalf].map((group, groupIndex) => (
          <ol key={groupIndex} className="workflow-list" start={groupIndex * 3 + 1}>
            {group.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        ))}
      </div>
    </section>
  )
}
