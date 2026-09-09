import { liveCities } from '../data/cities'

export default function CityBanner() {
  return (
    <div className="border-b border-line/70 bg-void">
      <p className="mx-auto max-w-6xl px-5 py-2 text-center font-ui text-[11px] font-medium tracking-wide text-fog sm:text-xs">
        Now live in: {liveCities.join(' • ')}
      </p>
    </div>
  )
}
