import { useState } from 'react'
import { getExperience, getOccasion, getPricing } from '../../lib/booking'
import { getBuilderLines, hasBuiltSurprise } from '../../lib/builder'
import { formatDate, formatInr, formatTime } from '../../lib/format'
import Button from '../Button'

const methods = [
  { id: 'upi', label: 'UPI', hint: 'GPay, PhonePe, Paytm' },
  { id: 'card', label: 'Card', hint: 'Debit or credit — India or abroad' },
  { id: 'later', label: 'Pay later', hint: 'Settle after the moment' },
]

export default function StepPayment({ data, onBack, onPaid }) {
  const [method, setMethod] = useState('upi')
  const [processing, setProcessing] = useState(false)
  const experience = getExperience(data)
  const occasion = getOccasion(data)
  const pricing = getPricing(data)
  const built = hasBuiltSurprise(data)
  const builderLines = getBuilderLines(data)

  function handlePay() {
    if (processing) return
    setProcessing(true)
    window.setTimeout(() => {
      onPaid()
    }, 900)
  }

  return (
    <div>
      <p className="font-ui text-xs font-semibold uppercase tracking-[0.16em] text-pink-hot">Step 08 · Launch</p>
      <h2 className="mt-2 font-display text-3xl font-bold text-snow sm:text-4xl">Almost there 🎯</h2>
      <p className="mt-3 text-base leading-relaxed text-fog">Confirm the brief, pick a method, launch the mission.</p>

      <section className="mt-8 rounded-2xl border border-line bg-panel p-5 sm:p-6">
        <h3 className="font-ui text-sm font-semibold uppercase tracking-[0.12em] text-pink-hot">Summary</h3>
        <dl className="mt-4 space-y-3 text-sm">
          <Row label="Target" value={data.recipientName} />
          <Row label="City" value={data.recipientCity} />
          <Row label="Occasion" value={occasion ? `${occasion.emoji} ${occasion.label}` : '—'} />
          <Row label={built ? 'Build' : 'Experience'} value={experience?.title ?? '—'} />
          <Row label="Date" value={formatDate(data.date)} />
          <Row label="Time" value={formatTime(data.time)} />
        </dl>
      </section>

      <section className="mt-4 rounded-2xl border border-line bg-panel p-5 sm:p-6">
        <h3 className="font-ui text-sm font-semibold uppercase tracking-[0.12em] text-pink-hot">Price</h3>
        <div className="mt-4 space-y-2 text-sm">
          {built
            ? builderLines.map((line) => (
                <div key={`${line.section}-${line.id}`} className="flex justify-between gap-4">
                  <span className="text-fog">
                    {line.emoji} {line.name}
                  </span>
                  <span>{line.included ? 'Included' : formatInr(line.price)}</span>
                </div>
              ))
            : (
                <div className="flex justify-between gap-4">
                  <span className="text-fog">Experience</span>
                  <span>{formatInr(pricing.experienceAmount)}</span>
                </div>
              )}
          <div className="flex justify-between gap-4">
            <span className="text-fog">Crew fee</span>
            <span>{formatInr(pricing.serviceFee)}</span>
          </div>
          <div className="flex justify-between gap-4 border-t border-line pt-3 font-semibold">
            <span>Total</span>
            <span className="text-pink-hot">{formatInr(pricing.total)}</span>
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-2xl border border-line bg-panel p-5 sm:p-6">
        <h3 className="font-ui text-sm font-semibold uppercase tracking-[0.12em] text-pink-hot">Pay method</h3>
        <div className="mt-4 grid gap-3">
          {methods.map((item) => {
            const selected = method === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setMethod(item.id)}
                aria-pressed={selected}
                className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                  selected ? 'border-pink bg-pink/10 ring-2 ring-pink/20' : 'border-line bg-raised hover:border-pink/30'
                }`}
              >
                <p className="font-semibold text-snow">{item.label}</p>
                <p className="text-xs text-fog">{item.hint}</p>
              </button>
            )
          })}
        </div>
      </section>

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="button" variant="ghost" onClick={onBack} className="px-2">
          Back
        </Button>
        <Button type="button" className="w-full px-7 py-3 sm:w-auto" disabled={processing} onClick={handlePay}>
          {processing ? 'Launching…' : `LAUNCH THE MISSION 🚀 · ${formatInr(pricing.total)}`}
        </Button>
      </div>
      <p className="mt-3 text-center text-xs text-fog">This is a prototype — no real payment is taken.</p>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-fog">{label}</dt>
      <dd className="text-right font-medium text-snow">{value}</dd>
    </div>
  )
}
