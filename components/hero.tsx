'use client'

import { useState } from 'react'

import {
  TOTAL_ENDPOINTS,
  TOTAL_PLATFORMS,
  WALL,
  type WallItem,
} from '@/lib/vendors'
import { VendorLogo } from './vendor-logo'

/** Split the wall into columns, then round-robin so each column gets a mix. */
function buildColumns(count: number) {
  const cols: (typeof WALL)[] = Array.from({ length: count }, () => [])
  WALL.forEach((item, i) => cols[i % count].push(item))
  return cols
}

const COLUMN_COUNT = 3
const DURATIONS = ['46s', '58s', '52s']
const COLUMNS = buildColumns(COLUMN_COUNT)

function WallCard({ slug, name, capability }: WallItem) {
  return (
    <div className='card flex items-center gap-3 px-3 py-2.5'>
      <VendorLogo slug={slug} name={name} className='size-[18px]' />
      <span className='min-w-0'>
        <span className='block truncate text-[13px] font-medium leading-tight'>
          {name}
        </span>
        <span className='block truncate text-[11px] leading-tight text-[var(--text-muted)]'>
          {capability}
        </span>
      </span>
    </div>
  )
}

export function HeroWall() {
  return (
    <div
      className='marquee-viewport marquee-mask relative h-[420px] overflow-hidden'
      aria-label={`${WALL.length} live capabilities`}
    >
      <div
        className='grid h-full grid-cols-3 gap-3'
        style={{ maskImage: 'none' }}
      >
        {COLUMNS.map((col, i) => (
          <div key={i} className='flex flex-col gap-3 overflow-hidden'>
            <div
              className='marquee-track'
              style={
                {
                  '--marquee-duration': DURATIONS[i % DURATIONS.length],
                } as React.CSSProperties
              }
            >
              {/*
                Two identical halves. Each half owns its own internal gap and
                padding, so half the track height is exactly one full copy —
                the `-50%` wrap stays seamless. Putting the gap on the track
                instead would leave a trailing gap and shift the loop by 12px.
              */}
              {[0, 1].map((copy) => (
                <div key={copy} className='flex flex-col gap-3 pb-3'>
                  {col.map((item) => (
                    <WallCard key={`${copy}-${item.name}`} {...item} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const INSTALL_CMD = 'curl -fsSL https://sandbase.ai/install.sh | sh'

export function Hero() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_CMD)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      // Clipboard is unavailable in sandboxed contexts; leave the label alone.
    }
  }

  return (
    <section className='relative overflow-hidden'>
      {/* Ambient glows behind the grid. */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0'
        style={{
          background:
            'radial-gradient(60% 50% at 15% 0%, var(--glow-purple), transparent 70%), radial-gradient(45% 40% at 90% 10%, var(--glow-cyan), transparent 70%)',
        }}
      />

      <div className='container relative grid gap-14 pt-16 pb-20 md:pt-24 lg:grid-cols-2 lg:gap-16 lg:pt-28'>
        <div className='flex min-w-0 flex-col items-start'>
          <p className='mono flex items-center gap-2 text-[13px] text-[var(--text-muted)]'>
            <span
              className='inline-block size-1.5 rounded-full'
              style={{
                background: 'var(--color-accent)',
                boxShadow: '0 0 8px var(--color-accent)',
              }}
            />
            Live · {TOTAL_ENDPOINTS.toLocaleString('en-US')} APIs across{' '}
            {TOTAL_PLATFORMS} platforms
          </p>

          <h1 className='mt-6 text-[clamp(32px,4.6vw,56px)] leading-[1.08]'>
            Connect your agent
            <br />
            to the real world.
            <span className='block text-[var(--text-muted)]'>
              Every API, one key, no subscriptions.
            </span>
          </h1>

          <p className='lede mt-6 max-w-lg'>
            Social, video, search, scraping and SaaS endpoints behind a single
            OpenAI-compatible API. Copy a working request, see its price on the
            card, and pay only for the calls you make.
          </p>

          <div className='mt-9 w-full max-w-lg'>
            <div className='code-surface flex items-center gap-3 px-4 py-3'>
              <span className='code-prompt select-none'>$</span>
              <code className='mono truncate text-[13px]'>
                <span className='code-comment'>curl </span>
                <span className='code-command'>
                  -fsSL https://sandbase.ai/install.sh
                </span>
                <span className='code-comment'> | sh</span>
              </code>
              <button
                type='button'
                onClick={copy}
                aria-label='Copy install command'
                className='code-prompt ml-auto shrink-0 transition-colors hover:text-[var(--code-accent)]'
              >
                {copied ? (
                  <svg
                    viewBox='0 0 24 24'
                    className='size-4'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2.2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M20 6 9 17l-5-5' />
                  </svg>
                ) : (
                  <svg
                    viewBox='0 0 24 24'
                    className='size-4'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <rect width='14' height='14' x='8' y='8' rx='2' />
                    <path d='M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' />
                  </svg>
                )}
              </button>
            </div>

            <div className='mt-6 flex flex-wrap items-center gap-3'>
              <a href='#catalog' className='btn btn-primary btn-lg'>
                Browse the catalog
              </a>
              <a href='#quickstart' className='btn btn-outline btn-lg'>
                See a request
              </a>
            </div>
          </div>
        </div>

        <div className='min-w-0'>
          <HeroWall />
        </div>
      </div>
    </section>
  )
}
