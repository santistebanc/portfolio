const iconPaths = {
  research: 'M11 4a7 7 0 1 0 4.9 12l3.6 3.6 1.4-1.4-3.6-3.6A7 7 0 0 0 11 4Zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z',
  decide: 'M5 4h14v3H5V4Zm0 6h14v3H5v-3Zm0 6h9v3H5v-3Zm12.5-.5 1.4 1.4-3.6 3.6-2.2-2.2 1.4-1.4.8.8 2.2-2.2Z',
  prototype: 'M4 5h16v10H4V5Zm2 2v6h12V7H6Zm3 10h6v2H9v-2Zm-3 2h12v2H6v-2Z',
  build: 'M8 4h8l1.5 3H20v13H4V7h2.5L8 4Zm1.2 2-1 2H6v10h12V8h-2.2l-1-2H9.2Zm1.8 4 4 2-4 2v-4Z',
  review: 'M4 5h12v2H4V5Zm0 4h12v2H4V9Zm0 4h8v2H4v-2Zm13.2.2 1.4 1.4-4.4 4.4-2.4-2.4 1.4-1.4 1 1 3-3Z',
  ship: 'M12 3l7 4v5c0 4.3-2.9 7.4-7 9-4.1-1.6-7-4.7-7-9V7l7-4Zm0 2.3L7 8.1V12c0 3 1.8 5.3 5 6.7 3.2-1.4 5-3.7 5-6.7V8.1l-5-2.8Zm-1 3.7h2v4h3l-4 4-4-4h3V9Z',
}

const steps = [
  {
    icon: 'research',
    title: 'Research',
    body: 'Explore the problem space, tool choices, frameworks, and architecture risks before committing to a direction.',
  },
  {
    icon: 'decide',
    title: 'Decide',
    body: 'Use structured grilling sessions to clarify behavior, scope, architecture, and tradeoffs.',
  },
  {
    icon: 'prototype',
    title: 'Prototype',
    body: 'Generate small interactive prototypes to test direction and uncover missing product details.',
  },
  {
    icon: 'build',
    title: 'Build in slices',
    body: 'Implement vertical slices, often TDD-oriented, so each slice can be reviewed, tested, and steered.',
  },
  {
    icon: 'review',
    title: 'Review and verify',
    body: 'Inspect UX, architecture, code quality, correctness, types, edge cases, and product fit.',
  },
  {
    icon: 'ship',
    title: 'Ship and maintain',
    body: 'Use AI support for deployment, CI, hosting, monitoring, analytics, and maintenance.',
  },
] as const

function StepIcon({ name }: { name: keyof typeof iconPaths }) {
  return (
    <svg className="ai-step-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={iconPaths[name]} />
    </svg>
  )
}

export default function AIWorkflow() {
  return (
    <section className="ai-section" id="ai-workflow">
      <div className="ai-inner">
        <div className="section-header ai-header">
          <div>
            <p className="section-label">How I Build With AI</p>
            <h2 className="section-title">Practical assistance, deliberate review</h2>
          </div>
          <p className="ai-intro">
            I use coding agents, reusable skills, and AI SDKs to accelerate planning,
            implementation, debugging, and iteration while staying responsible for architecture,
            UX, and code quality.
          </p>
        </div>

        <div className="ai-grid">
          {steps.map((step) => (
            <article key={step.title} className="ai-step">
              <div className="ai-step-heading">
                <StepIcon name={step.icon} />
                <h3>{step.title}</h3>
              </div>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
