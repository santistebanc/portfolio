import { aiIntro, aiSteps } from './content'
import { SectionHead } from './ui'

export function Method() {
  return (
    <section className="section section--ink" id="ai-workflow" aria-labelledby="ai-workflow-title">
      <div className="wrap">
        <SectionHead id="ai-workflow" line="2" title="How I build with AI">
          <p className="lede-strong">Practical assistance, deliberate review.</p>
          <p>{aiIntro}</p>
        </SectionHead>

        <ol className="route" data-reveal-item aria-label="AI-assisted workflow, in order">
          {aiSteps.map((step, i) => (
            <li key={step.title} className="stop" style={{ ['--i' as string]: i }}>
              <span className="stop-dot" aria-hidden="true" />
              <span className="stop-num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="stop-title">{step.title}</h3>
              <p className="stop-body">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
