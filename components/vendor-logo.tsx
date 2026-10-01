import { VENDOR_ICONS } from '@/lib/vendor-icons'

/**
 * Renders a vendor's official brand mark, or a monogram tile when the live
 * bundle carries no mark for that platform (SandBase-native utilities, and the
 * long-tail search/data integrations).
 */
export function VendorLogo({
  slug,
  name,
  className = 'size-5',
}: {
  slug: string
  name: string
  className?: string
}) {
  const icon = VENDOR_ICONS[slug]

  if (icon) {
    return (
      <span
        aria-hidden='true'
        className='grid shrink-0 place-items-center'
        style={{ width: '1.375rem', height: '1.375rem' }}
      >
        <svg
          viewBox='0 0 24 24'
          className={className}
          fill='currentColor'
          role='img'
        >
          <title>{icon.title}</title>
          <path d={icon.path} />
        </svg>
      </span>
    )
  }

  return (
    <span
      aria-hidden='true'
      className='mono grid size-[22px] shrink-0 place-items-center text-[10px] font-bold'
      style={{
        background: 'var(--color-panel)',
        color: 'var(--color-panel-fg)',
      }}
    >
      {name.slice(0, 2).toUpperCase()}
    </span>
  )
}
