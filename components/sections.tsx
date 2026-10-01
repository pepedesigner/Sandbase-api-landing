'use client'

import { useState } from 'react'

import { TOTAL_ENDPOINTS, TOTAL_PLATFORMS, sb } from '@/lib/vendors'
import { SectionHeader } from './primitives'

/* ── Three ways to connect (Setup / API / Agent) ── */

const WAYS = [
  {
    title: 'Setup',
    tagline: 'Tools inside your AI app',
    body: 'Run Setup once, then use these capabilities in Codex, Claude, Cursor, or Kiro. SandBase injects the tools into the session — no keys to paste.',
    cmd: 'curl -fsSL https://sandbase.ai/install.sh | sh',
    href: sb('/setup'),
    cta: 'Install Setup',
  },
  {
    title: 'API',
    tagline: 'One capability, called directly',
    body: 'Copy a working request for any platform and call it from your product. OpenAI-compatible clients work unchanged against every upstream.',
    cmd: 'curl https://api.sandbase.ai/v1/apis/exa/search',
    href: '#quickstart',
    cta: 'See a request',
  },
  {
    title: 'Agent',
    tagline: 'Reusable multi-step work',
    body: 'Define the job, give it tools, test one run, then publish or schedule it. Every execution keeps its input, output, trace, and cost.',
    cmd: 'sb agents create --tool exa_search --tool firecrawl_scrape',
    href: sb('/console/agents'),
    cta: 'Build an Agent',
  },
] as const

export function Ways() {
  return (
    <section className='divider'>
      <div className='container py-[var(--page-block)]'>
        <SectionHeader
          eyebrow='Three ways in'
          title={
            <>
              Setup puts tools in your AI app. APIs serve your product.{' '}
              <span className='text-[var(--text-muted)]'>Agent does the work.</span>
            </>
          }
          lede='Same registry, same balance, whichever surface your agent or app speaks.'
        />

        <div className='grid gap-4 lg:grid-cols-3'>
          {WAYS.map((way, i) => (
            <article key={way.title} className='card flex min-w-0 flex-col p-6'>
              <span className='mono text-[12px] text-[var(--text-muted)]'>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className='mt-4 text-[19px]'>{way.title}</h3>
              <p className='mt-1 text-[13px] text-[var(--color-accent)]'>
                {way.tagline}
              </p>
              <p className='mt-3 flex-1 text-[14px] leading-relaxed text-[var(--text-secondary)]'>
                {way.body}
              </p>
              <div className='code-surface mono mt-5 flex items-center gap-2 overflow-hidden rounded-md px-3 py-2.5'>
                <span className='code-prompt shrink-0 select-none'>$</span>
                <code className='code-command truncate text-[11.5px]'>
                  {way.cmd}
                </code>
              </div>
              <a
                href={way.href}
                className='mt-4 text-[13px] font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--color-accent)]'
              >
                {way.cta} →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Pricing ── */

const TIERS = [
  {
    name: 'Start',
    price: '$0',
    unit: 'forever',
    body: 'Explore models, APIs and agent workflows with starter credits.',
    cta: 'Start free',
    href: sb('/login'),
    highlight: false,
  },
  {
    name: 'Build',
    price: 'Metered',
    unit: 'per call',
    body: 'Pay for the underlying model, API and runtime work your calls use. No minimum, no tiers to negotiate.',
    cta: 'Create an API key',
    href: sb('/login?redirect=/console/settings/api-keys'),
    highlight: true,
  },
  {
    name: 'Scale',
    price: 'Custom',
    unit: 'annual',
    body: 'Centralize workspaces, controls and support for production teams.',
    cta: 'Contact sales',
    href: sb('/contact'),
    highlight: false,
  },
] as const

export function Pricing() {
  return (
    <section className='divider'>
      <div className='container py-[var(--page-block)]'>
        <SectionHeader
          eyebrow='Pricing'
          title={
            <>
              Pay for what you run.{' '}
              <span className='text-[var(--text-muted)]'>
                Never for a seat you do not use.
              </span>
            </>
          }
          lede='One balance covers every API. The price shown on a card is the price you are billed.'
        />

        <div className='grid gap-4 lg:grid-cols-3'>
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className='card relative flex min-w-0 flex-col p-6'
              style={
                tier.highlight
                  ? {
                      borderColor: 'var(--border-accent)',
                      background: 'var(--color-surface-alt)',
                    }
                  : undefined
              }
            >
              {tier.highlight ? (
                <span
                  className='mono absolute -top-2.5 left-6 rounded-full px-2.5 py-0.5 text-[10px] font-bold'
                  style={{
                    background: 'var(--color-accent)',
                    color: 'var(--button-primary-fg)',
                  }}
                >
                  MOST POPULAR
                </span>
              ) : null}

              <h3 className='text-[15px] font-medium text-[var(--text-secondary)]'>
                {tier.name}
              </h3>
              <p className='mt-3 flex items-baseline gap-2'>
                <span className='text-[clamp(28px,3vw,36px)] font-semibold tracking-tight'>
                  {tier.price}
                </span>
                <span className='mono text-[12px] text-[var(--text-muted)]'>
                  / {tier.unit}
                </span>
              </p>
              <p className='mt-4 flex-1 text-[14px] leading-relaxed text-[var(--text-secondary)]'>
                {tier.body}
              </p>
              <a
                href={tier.href}
                className={`btn mt-6 ${tier.highlight ? 'btn-primary' : 'btn-outline'}`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── FAQ ── */

const FAQS = [
  {
    q: 'Do I need an API key for each platform?',
    a: 'No. SandBase holds the upstream credentials. You get one SandBase key, and every platform — Douyin, Exa, Firecrawl, LinkedIn — is reachable behind it.',
  },
  {
    q: 'How is pricing structured?',
    a: 'Per call, per endpoint. Metred platforms bill against your balance at their native rate; per-call platforms like Exa show a fixed price on the card. There is no subscription and no seat fee.',
  },
  {
    q: 'A provider failed. Do I get charged?',
    a: 'No. A failed call is not billed. Charges apply to the calls that returned usable results, and the response carries the exact amount debited.',
  },
  {
    q: 'What happens when I run out of balance?',
    a: 'Calls fail fast with a 402 rather than silently falling back. Top up from the wallet, or set an alert threshold on the workspace.',
  },
  {
    q: 'How do I call these from an agent?',
    a: 'Use Setup to inject the tools into Codex, Claude, Cursor, or Kiro, or expose them over MCP. The agent picks a tool and calls it directly — no SDK wiring on your side.',
  },
  {
    q: 'Are these public surfaces only?',
    a: 'Yes. Every endpoint reads publicly available data. Nothing here requires the platform owner’s private API or a scraped session token.',
  },
] as const

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className='divider'>
      <div className='container py-[var(--page-block)]'>
        <SectionHeader
          eyebrow='Common questions'
          title={
            <>
              What you usually ask{' '}
              <span className='text-[var(--text-muted)]'>before the first call.</span>
            </>
          }
        />

        <div className='border-t border-[var(--border-primary)]'>
          {FAQS.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q} className='border-b border-[var(--border-primary)]'>
                <button
                  type='button'
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className='flex w-full items-center justify-between gap-4 py-5 text-left'
                >
                  <span className='text-[15px] font-medium'>{item.q}</span>
                  <span
                    aria-hidden='true'
                    className='grid size-6 shrink-0 place-items-center rounded-md transition-transform duration-200'
                    style={{
                      background: isOpen
                        ? 'var(--active-overlay)'
                        : 'transparent',
                      color: isOpen
                        ? 'var(--color-accent)'
                        : 'var(--text-muted)',
                      transform: isOpen ? 'rotate(45deg)' : 'none',
                    }}
                  >
                    <svg
                      viewBox='0 0 24 24'
                      className='size-3.5'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2.2'
                      strokeLinecap='round'
                    >
                      <path d='M12 5v14M5 12h14' />
                    </svg>
                  </span>
                </button>
                <div
                  className='grid transition-[grid-template-rows] duration-200'
                  style={{
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                  }}
                >
                  <div className='overflow-hidden'>
                    <p className='max-w-[70ch] pb-5 text-[14px] leading-relaxed text-[var(--text-secondary)]'>
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ── Final CTA ── */

export function Cta() {
  return (
    <section className='divider'>
      <div className='container py-[var(--page-block)]'>
        <div
          className='relative overflow-hidden rounded-lg border px-6 py-14 text-center md:px-12'
          style={{
            borderColor: 'var(--border-primary)',
            background: 'var(--color-surface-alt)',
          }}
        >
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-0'
            style={{
              background:
                'radial-gradient(50% 60% at 50% 0%, var(--glow-purple), transparent 70%)',
            }}
          />
          <div className='relative'>
            <p className='eyebrow mb-5'>Get started</p>
            <h2 className='mx-auto max-w-2xl text-[clamp(26px,3.4vw,42px)]'>
              Start with one capability.{' '}
              <span className='text-[var(--text-muted)]'>
                Finish with work you can hand over.
              </span>
            </h2>
            <div className='mt-9 flex flex-wrap items-center justify-center gap-3'>
              <a href='#catalog' className='btn btn-primary btn-lg'>
                Browse the catalog
              </a>
              <a href={sb('/login')} className='btn btn-outline btn-lg'>
                Create a workspace
              </a>
            </div>
            <p className='mono mt-7 text-[12px] text-[var(--text-muted)]'>
              {TOTAL_ENDPOINTS.toLocaleString('en-US')} APIs ·{' '}
              {TOTAL_PLATFORMS} platforms · one key
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
