import { Link } from 'react-router-dom'

const stats = [
  { value: '₹500 min', label: 'per person' },
  { value: '10 min', label: 'to start a pool' },
  { value: '100%', label: 'friends can join' },
]

export default function GroupSurpriseBanner() {
  return (
    <section className="w-full bg-gradient-to-r from-[#FF6B00] to-[#FF3366] py-12">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-4xl" aria-hidden="true">
            👥
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-white sm:text-4xl">
            Surprising someone together?
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/90 sm:text-base">
            Split the cost with friends. Everyone chips in from ₹500, then we launch one squad-sized surprise.
          </p>
          <Link
            to="/create?type=group"
            className="mt-6 inline-flex rounded-2xl bg-white px-5 py-3 font-ui text-sm font-semibold text-[#FF4A33] shadow-lg"
          >
            Start a Group Surprise →
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {stats.map((item) => (
            <div
              key={item.value}
              className="rounded-2xl border border-white/25 bg-white/15 px-3 py-4 text-center backdrop-blur-sm"
            >
              <p className="font-display text-lg font-bold text-white sm:text-xl">{item.value}</p>
              <p className="mt-1 text-[11px] font-medium text-white/80">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
