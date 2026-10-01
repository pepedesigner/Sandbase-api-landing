import type { ReactNode } from 'react'

import { TOTAL_ENDPOINTS, TOTAL_PLATFORMS, sb } from '@/lib/vendors'
import { ThemeToggle } from './theme-toggle'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src='/brand/sandbase-logo.png'
        alt=''
        aria-hidden='true'
        width={26}
        height={26}
        className='size-[26px] shrink-0'
      />
      <span className='text-[15px] font-semibold tracking-tight'>SandBase</span>
    </span>
  )
}

export function Announcement() {
  return (
    <div className='border-b border-[var(--border-primary)] bg-[var(--color-surface-alt)]'>
      <div className='container flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 text-center'>
        <span
          className='mono px-1.5 py-0.5 text-[11px] font-medium'
          style={{
            background: 'var(--color-accent)',
            color: 'var(--button-primary-fg)',
          }}
        >
          API Free Week
        </span>
        <span className='text-[13px] text-[var(--text-secondary)]'>
          Hundreds of APIs are free to call this week.
        </span>
        <a
          href='#catalog'
          className='text-[13px] font-medium text-[var(--color-accent)] underline-offset-4 hover:underline'
        >
          Browse free APIs
        </a>
      </div>
    </div>
  )
}

/** Nav labels mirror the live header: Explore, Agents, Solutions, Docs, Pricing. */
const NAV = [
  { href: sb('/models'), label: 'Explore' },
  { href: sb('/agents'), label: 'Agents' },
  { href: sb('/docs/'), label: 'Solutions' },
  { href: sb('/docs/'), label: 'Docs' },
  { href: sb('/pricing'), label: 'Pricing' },
]

export function Header() {
  return (
    <header
      className='sticky top-0 z-50 border-b border-[var(--border-primary)]'
      style={{ background: 'var(--bg-glass)', backdropFilter: 'blur(12px)' }}
    >
      <div className='container flex h-[72px] items-center gap-6'>
        <a href={sb('/')} aria-label='SandBase home' className='shrink-0'>
          <Logo />
        </a>

        <nav className='hidden items-center gap-1 md:flex'>
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className='px-3 py-2 text-[15px] text-[var(--text-secondary)] transition-colors hover:bg-[var(--hover-overlay)] hover:text-[var(--text-primary)]'
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className='ml-auto flex items-center gap-2'>
          <a
            href='https://github.com/sandbaseai'
            className='hidden size-9 place-items-center rounded-md text-[var(--text-secondary)] transition-colors hover:bg-[var(--hover-overlay)] hover:text-[var(--text-primary)] sm:grid'
            aria-label='GitHub'
          >
            <svg viewBox='0 0 24 24' className='size-[18px]' fill='currentColor'>
              <path d='M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.13-.3-.54-1.53.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.23 0 4.63-2.8 5.65-5.48 5.95.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z' />
            </svg>
          </a>
          <ThemeToggle />
          <a href={sb('/login')} className='btn btn-outline btn-sm'>
            Sign in
          </a>
          <a href={sb('/login?redirect=/apis')} className='btn btn-primary btn-sm'>
            Start building
          </a>
        </div>
      </div>
    </header>
  )
}

export function Footer() {
  const columns = [
    {
      title: 'Store',
      links: [
        { label: 'Models', href: sb('/models') },
        { label: 'APIs', href: sb('/apis') },
        { label: 'Agents', href: sb('/agents') },
        { label: 'Skills', href: sb('/skills') },
      ],
    },
    {
      title: 'Build',
      links: [
        { label: 'Setup', href: sb('/setup') },
        { label: 'Build Agent', href: sb('/console/agents') },
        { label: 'API keys', href: sb('/console/settings/api-keys') },
        { label: 'Usage', href: sb('/console/usage') },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'Docs', href: sb('/docs/') },
        { label: 'GitHub', href: 'https://github.com/sandbaseai' },
        { label: 'Pricing', href: sb('/pricing') },
        { label: 'Status', href: sb('/status') },
      ],
    },
  ]

  return (
    <footer className='divider mt-0'>
      <div className='container grid gap-10 py-14 md:grid-cols-[1.5fr_repeat(3,1fr)]'>
        <div className='max-w-xs'>
          <Logo />
          <p className='mt-4 text-[13px] leading-relaxed text-[var(--text-muted)]'>
            Capabilities to deliverable agent workflows. Find a capability, call
            it from your product, then wrap it in an agent.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className='eyebrow'>{col.title}</h3>
            <ul className='mt-4 flex flex-col gap-2.5'>
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className='text-[13px] text-[var(--text-secondary)] transition-colors hover:text-[var(--color-accent)]'
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className='divider'>
        <div className='container flex flex-wrap items-center justify-between gap-3 py-5'>
          <span className='text-[12px] text-[var(--text-muted)]'>
            © {new Date().getFullYear()} SandBase
          </span>
          <span className='mono text-[12px] text-[var(--text-muted)]'>
            {TOTAL_ENDPOINTS.toLocaleString('en-US')} APIs ·{' '}
            {TOTAL_PLATFORMS} platforms · one key
          </span>
        </div>
      </div>
    </footer>
  )
}

export function SectionHeader({
  eyebrow,
  title,
  lede,
  action,
}: {
  eyebrow?: string
  title: ReactNode
  lede?: ReactNode
  action?: ReactNode
}) {
  return (
    <div className='mb-10 grid gap-6 lg:grid-cols-12 lg:items-end'>
      <div className='lg:col-span-7'>
        {eyebrow ? <p className='eyebrow mb-4'>{eyebrow}</p> : null}
        <h2 className='text-[clamp(26px,3.2vw,40px)]'>{title}</h2>
        {lede ? <p className='lede mt-5 max-w-2xl'>{lede}</p> : null}
      </div>
      {action ? (
        <div className='lg:col-span-5 lg:flex lg:justify-end'>{action}</div>
      ) : null}
    </div>
  )
}
