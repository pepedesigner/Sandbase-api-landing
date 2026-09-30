import { Catalog } from '@/components/catalog'
import { Hero } from '@/components/hero'
import { Quickstart } from '@/components/quickstart'
import { Announcement, Footer, Header } from '@/components/primitives'
import { Cta, Faq, Pricing, Ways } from '@/components/sections'
import { TOTAL_ENDPOINTS, TOTAL_PLATFORMS } from '@/lib/vendors'

const MODELS = 1195

const nf = new Intl.NumberFormat('en-US')

const STATS = [
  { value: nf.format(TOTAL_ENDPOINTS), label: 'APIs' },
  { value: nf.format(TOTAL_PLATFORMS), label: 'Platforms' },
  { value: nf.format(MODELS), label: 'Models' },
  { value: '$0', label: 'To start' },
]

export default function Page() {
  return (
    <>
      <Announcement />
      <Header />
      <main>
        <Hero />
        <StatsStrip />
        <Catalog />
        <Quickstart />
        <Ways />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  )
}

function StatsStrip() {
  return (
    <section className='divider'>
      <div className='container'>
        <dl className='grid grid-cols-2 divide-x divide-[var(--border-primary)] md:grid-cols-4'>
          {STATS.map((stat) => (
            <div key={stat.label} className='px-4 py-8 text-center'>
              <dt className='eyebrow'>{stat.label}</dt>
              <dd className='mt-2 text-[clamp(26px,3vw,34px)] font-semibold tracking-tight'>
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
