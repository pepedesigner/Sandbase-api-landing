'use client'

import { useMemo, useState } from 'react'

import {
  CATEGORIES,
  CATEGORY_LABELS,
  TOTAL_ENDPOINTS,
  TOTAL_PLATFORMS,
  VENDORS,
  sb,
  type Category,
} from '@/lib/vendors'
import { VendorLogo } from './vendor-logo'

type Sort = 'popular' | 'endpoints' | 'name'
type View = 'grid' | 'list'

export function Catalog() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category | 'all'>('all')
  const [sort, setSort] = useState<Sort>('popular')
  const [view, setView] = useState<View>('grid')

  const counts = useMemo(() => {
    const map = new Map<Category, number>()
    for (const v of VENDORS) map.set(v.category, (map.get(v.category) ?? 0) + 1)
    return map
  }, [])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = VENDORS.filter((v) => {
      if (category !== 'all' && v.category !== category) return false
      if (!q) return true
      return (
        v.name.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        v.tags.some((t) => t.includes(q))
      )
    })

    // "Most Popular" falls back to the curated order in vendors.ts.
    if (sort === 'endpoints') {
      list = [...list].sort((a, b) => b.endpoints - a.endpoints)
    } else if (sort === 'name') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    }
    return list
  }, [query, category, sort])

  return (
    <section id='catalog' className='divider'>
      <div className='container py-[var(--page-block)]'>
        <div className='mb-10 grid gap-6 lg:grid-cols-12 lg:items-end'>
          <div className='lg:col-span-7'>
            <p className='eyebrow mb-4'>The catalog</p>
            <h2 className='text-[clamp(26px,3.2vw,40px)]'>
              {TOTAL_ENDPOINTS.toLocaleString('en-US')} endpoints.{' '}
              <span className='text-[var(--text-muted)]'>Every one priced.</span>
            </h2>
            <p className='lede mt-5 max-w-2xl'>
              Search by platform or capability. Each card links to the endpoint
              list, with a working request and its cost.
            </p>
          </div>
          <div className='lg:col-span-5 lg:flex lg:justify-end'>
            <a href={sb('/console/agents')} className='btn btn-outline'>
              Need an agent instead? Build Agent
            </a>
          </div>
        </div>

        {/* Controls + sidebar, mirroring the live catalog: filters live in a
            sticky left rail, search/sort/view sit above the grid. */}
        <div className='grid gap-6 lg:grid-cols-[220px_1fr] lg:gap-8'>
          <aside className='lg:sticky lg:top-24 lg:self-start'>
            <div
              className='border p-4'
              style={{
                borderColor: 'var(--border-primary)',
                background: 'var(--color-plate)',
              }}
            >
              <div className='flex items-center justify-between'>
                <p className='eyebrow'>Filters</p>
                {category !== 'all' || query ? (
                  <button
                    type='button'
                    onClick={() => {
                      setCategory('all')
                      setQuery('')
                    }}
                    className='mono text-[10px] text-[var(--text-muted)] underline-offset-4 hover:text-[var(--color-accent)] hover:underline'
                  >
                    Reset
                  </button>
                ) : null}
              </div>

              <p className='mono mt-4 text-[11px] text-[var(--text-secondary)]'>
                {TOTAL_PLATFORMS} platforms
              </p>

              <p className='eyebrow mt-6 mb-3 text-[var(--text-muted)]'>
                Category
              </p>
              <ul className='flex flex-col gap-2.5'>
                <FilterRow
                  label='All'
                  count={TOTAL_PLATFORMS}
                  checked={category === 'all'}
                  onChange={() => setCategory('all')}
                />
                {CATEGORIES.filter((c) => counts.has(c)).map((c) => (
                  <FilterRow
                    key={c}
                    label={c}
                    count={counts.get(c) ?? 0}
                    checked={category === c}
                    onChange={() => setCategory(category === c ? 'all' : c)}
                  />
                ))}
              </ul>
            </div>
          </aside>

          <div className='min-w-0'>
            <div className='mb-6 flex flex-col gap-3 sm:flex-row'>
              <div className='relative flex-1'>
                <svg
                  viewBox='0 0 24 24'
                  className='pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-[var(--text-muted)]'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                >
                  <circle cx='11' cy='11' r='7' />
                  <path d='m20 20-3.5-3.5' />
                </svg>
                <input
                  type='search'
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder='Search vendors and API capabilities…'
                  aria-label='Search APIs'
                  className='h-12 w-full border pr-4 pl-11 text-[13px] outline-none transition-colors placeholder:text-[var(--text-placeholder)] focus:border-[var(--border-focus)]'
                  style={{
                    borderColor: 'var(--border-secondary)',
                    background: 'var(--bg-input)',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>

              <div className='flex items-center gap-3'>
                <label className='sr-only' htmlFor='sort'>
                  Sort
                </label>
                <select
                  id='sort'
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                  className='h-12 border px-4 text-[13px] outline-none transition-colors focus:border-[var(--border-focus)]'
                  style={{
                    borderColor: 'var(--border-secondary)',
                    background: 'var(--bg-input)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <option value='popular'>Most Popular</option>
                  <option value='endpoints'>Most endpoints</option>
                  <option value='name'>Name</option>
                </select>

                <div
                  className='flex overflow-hidden border'
                  style={{ borderColor: 'var(--border-secondary)' }}
                >
                  {(
                    [
                      { key: 'grid', label: 'Grid' },
                      { key: 'list', label: 'List' },
                    ] as const
                  ).map((v) => (
                    <button
                      key={v.key}
                      type='button'
                      onClick={() => setView(v.key)}
                      aria-pressed={view === v.key}
                      className='h-12 w-14 text-[12px] font-medium transition-colors'
                      style={{
                        background:
                          view === v.key ? 'var(--color-ink)' : 'transparent',
                        color:
                          view === v.key
                            ? 'var(--color-canvas)'
                            : 'var(--text-secondary)',
                      }}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            {results.length === 0 ? (
              <div className='border border-dashed py-16 text-center'>
                <p className='text-[15px] text-[var(--text-secondary)]'>
                  No platform matches “{query}”.
                </p>
                <button
                  type='button'
                  onClick={() => {
                    setQuery('')
                    setCategory('all')
                  }}
                  className='mt-3 text-[13px] text-[var(--color-accent)] underline-offset-4 hover:underline'
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                <p className='mono mb-4 text-[12px] text-[var(--text-muted)]'>
                  {results.length}{' '}
                  {results.length === 1 ? 'platform' : 'platforms'} ·{' '}
                  {results.reduce((s, v) => s + v.endpoints, 0)} endpoints
                </p>
                <div
                  className={
                    view === 'grid'
                      ? 'grid gap-4 sm:grid-cols-2 xl:grid-cols-3'
                      : 'flex flex-col gap-2'
                  }
                >
                  {results.map((v) =>
                    view === 'grid' ? (
                      <VendorCard key={v.slug} vendor={v} />
                    ) : (
                      <VendorRow key={v.slug} vendor={v} />
                    )
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * One category row in the filter rail. The live catalog uses square 12px
 * checkboxes with a mono label and a right-aligned count.
 */
function FilterRow({
  label,
  count,
  checked,
  onChange,
}: {
  label: string
  count: number
  checked: boolean
  onChange: () => void
}) {
  return (
    <li>
      <label className='flex cursor-pointer items-center gap-2.5'>
        <input
          type='checkbox'
          checked={checked}
          onChange={onChange}
          className='size-3 shrink-0 appearance-none border transition-colors'
          style={{
            borderColor: checked
              ? 'var(--color-accent)'
              : 'var(--color-ink)',
            background: checked ? 'var(--color-accent)' : 'transparent',
          }}
        />
        <span
          className='mono flex-1 text-[11px]'
          style={{
            color: checked
              ? 'var(--color-accent)'
              : 'var(--text-secondary)',
          }}
        >
          {label}
        </span>
        <span className='mono text-[11px] text-[var(--text-muted)]'>{count}</span>
      </label>
    </li>
  )
}

function VendorCard({ vendor: v }: { vendor: (typeof VENDORS)[number] }) {
  return (
    <a
      href={sb(`/apis/${v.slug}`)}
      className='card group flex min-w-0 flex-col p-5'
    >
      {/* Live card order: category eyebrow, then mark + name on one row. */}
      <p className='eyebrow mb-3'>{v.category}</p>

      <div className='flex items-center gap-3'>
        <VendorLogo slug={v.slug} name={v.name} />
        <h3 className='truncate text-[17px] font-medium'>{v.name}</h3>
        {v.price ? (
          <span className='mono ml-auto shrink-0 text-[11px] text-[var(--color-accent)]'>
            {v.price}
          </span>
        ) : null}
      </div>

      <p className='mt-4 line-clamp-3 text-[14px] leading-[1.6] text-[var(--text-secondary)]'>
        {v.description}
      </p>

      <div className='mt-4 flex flex-wrap gap-1.5'>
        {v.tags.map((tag) => (
          <span key={tag} className='tag'>
            {tag}
          </span>
        ))}
      </div>

      <p className='mono mt-4 text-[12px] text-[var(--text-muted)]'>
        {v.endpoints} {v.endpoints === 1 ? 'endpoint' : 'endpoints'}
      </p>
    </a>
  )
}

function VendorRow({ vendor: v }: { vendor: (typeof VENDORS)[number] }) {
  return (
    <a
      href={sb(`/apis/${v.slug}`)}
      className='card group flex flex-col gap-3 p-4 sm:flex-row sm:items-center'
    >
      <VendorLogo slug={v.slug} name={v.name} />
      <div className='min-w-0 flex-1'>
        <div className='flex items-center gap-2'>
          <h3 className='text-[15px] font-medium'>{v.name}</h3>
          <span className='tag'>{CATEGORY_LABELS[v.category]}</span>
        </div>
        <p className='mt-1 line-clamp-1 text-[13px] text-[var(--text-secondary)]'>
          {v.description}
        </p>
      </div>
      <div className='flex shrink-0 items-center gap-5'>
        {v.price ? (
          <span className='mono text-[12px] text-[var(--color-accent)]'>
            {v.price}
          </span>
        ) : null}
        <span className='mono w-24 text-right text-[12px] text-[var(--text-muted)]'>
          {v.endpoints} endpoints
        </span>
      </div>
    </a>
  )
}
