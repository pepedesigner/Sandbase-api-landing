'use client'

import { useEffect, useRef, useState } from 'react'

import { TOTAL_ENDPOINTS, TOTAL_PLATFORMS } from '@/lib/vendors'

interface OutputLine {
  text: string
  /** Renders in the lime accent instead of body ink. */
  accent?: boolean
  /** Renders muted. */
  dim?: boolean
}

/**
 * The three-step call sequence mirrors Monid's discover()/run() narrative but
 * speaks SandBase's own surface: curl, then the JS SDK, then an agent tool call.
 */
const STEPS: readonly {
  key: string
  label: string
  caption: string
  lang: string
  code: string
  output: readonly OutputLine[]
}[] = [
  {
    key: 'discover',
    label: 'Discover',
    caption: 'Find the capability',
    lang: 'bash',
    code: `# every capability is listed with its live price
curl https://api.sandbase.ai/v1/apis?q=video

# → ${TOTAL_PLATFORMS} platforms · ${TOTAL_ENDPOINTS.toLocaleString('en-US')} endpoints`,
    output: [
      { text: 'platform  endpoints  price', dim: true },
      { text: 'douyin    262       metered' },
      { text: 'tiktok     145       metered' },
      { text: 'youtube     33       metered' },
      { text: 'exa          3       $0.007/call', accent: true },
    ],
  },
  {
    key: 'run',
    label: 'Run',
    caption: 'Call it from your code',
    lang: 'typescript',
    code: `import SandBase from '@sandbase/sdk'

const sb = new SandBase({ apiKey: process.env.SANDBASE_KEY })

const res = await sb.apis.exa.search({
  query: 'AI agent frameworks',
  numResults: 5,
})

console.log(res.results[0].title, res.results[0].url)`,
    output: [
      { text: '200 OK', accent: true },
      { text: '5 results · 812ms' },
      { text: '$0.0013 debited · balance $24.87', dim: true },
    ],
  },
  {
    key: 'agent',
    label: 'In an agent',
    caption: 'Hand it to your agent',
    lang: 'text',
    code: `Available tools:
  exa_search          web search + page contents
  firecrawl_scrape    page → clean markdown
  youtube_transcript  video → text

The agent picks the tool and calls it directly.
No SDK wiring, no vendor keys.`,
    output: [{ text: 'tool: exa_search · $0.007 · 200 OK', accent: true }],
  },
]

export function Quickstart() {
  const [active, setActive] = useState(0)
  const stepRef = useRef<HTMLDivElement>(null)
  const step = STEPS[active]

  useEffect(() => {
    stepRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [active])

  return (
    <section id='quickstart' className='divider'>
      <div className='container py-[var(--page-block)]'>
        <div className='mb-12 grid gap-6 lg:grid-cols-12 lg:items-end'>
          <div className='lg:col-span-7'>
            <p className='eyebrow mb-4'>One endpoint shape</p>
            <h2 className='text-[clamp(26px,3.2vw,40px)]'>
              List it, call it,{' '}
              <span className='text-[var(--text-muted)]'>or let your agent call it.</span>
            </h2>
            <p className='lede mt-5 max-w-2xl'>
              Every platform is exposed the same way. Whether you reach for curl,
              the SDK, or an agent tool loop, the price on the card is the price
              you are billed.
            </p>
          </div>
        </div>

        <div className='grid gap-6 lg:grid-cols-[320px_1fr]'>
          {/* Step selector */}
          <div className='flex flex-col gap-2'>
            {STEPS.map((s, i) => {
              const isActive = i === active
              return (
                <button
                  key={s.key}
                  type='button'
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className='group flex items-start gap-4 rounded-lg border p-4 text-left transition-colors'
                  style={{
                    borderColor: isActive
                      ? 'var(--border-accent)'
                      : 'var(--border-primary)',
                    background: isActive ? 'var(--hover-overlay)' : 'transparent',
                  }}
                >
                  <span
                    className='mono mt-0.5 text-[12px]'
                    style={{
                      color: isActive
                        ? 'var(--color-accent)'
                        : 'var(--text-muted)',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className='min-w-0'>
                    <span
                      className='block text-[15px] font-medium'
                      style={{
                        color: isActive
                          ? 'var(--text-primary)'
                          : 'var(--text-secondary)',
                      }}
                    >
                      {s.label}
                    </span>
                    <span className='block text-[13px] text-[var(--text-muted)]'>
                      {s.caption}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

          {/* Code + output */}
          <div
            ref={stepRef}
            className='code-surface overflow-hidden rounded-lg border'
          >
            <div
              className='flex items-center gap-2 border-b px-4 py-2.5'
              style={{ borderColor: 'var(--border-primary)' }}
            >
              {['#8b6fff', '#d9ff43', '#8a8698'].map((c) => (
                <span
                  key={c}
                  className='size-2.5 rounded-full'
                  style={{ background: c }}
                />
              ))}
              <span className='mono code-comment ml-2 text-[11px]'>
                {step.lang}
              </span>
            </div>

            <pre className='mono overflow-x-auto px-4 py-4 text-[12.5px] leading-[1.75]'>
              <code>{step.code}</code>
            </pre>

            <div
              className='border-t px-4 py-3'
              style={{
                borderColor: 'var(--border-primary)',
                background: 'rgba(0, 0, 0, 0.25)',
              }}
            >
              {step.output.map((line, i) => (
                <div
                  key={i}
                  className='mono text-[12px] leading-[1.9]'
                  style={{
                    color: line.accent
                      ? 'var(--code-accent)'
                      : line.dim
                        ? 'var(--code-muted)'
                        : 'var(--code-fg)',
                  }}
                >
                  {line.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
