import { useEffect, useMemo, useState } from 'react'
import { ClipboardCheck, MapPin, Palette, PartyPopper, Sparkles } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import SeoHead from '../components/SeoHead'
import { planAddons, planOccasions, planVenues, planVibes } from '../data/planWizard'
import { formatInr } from '../lib/format'
import { createReveal, getPlanPricing, loadPlan, savePlan, whatsappHref } from '../lib/plan'

export default function PlanWizard() {
  const navigate = useNavigate()
  const [plan, setPlan] = useState(() => loadPlan())
  const pricing = useMemo(() => getPlanPricing(plan), [plan])

  useEffect(() => {
    savePlan(plan)
  }, [plan])

  function patch(partial) {
    setPlan((current) => ({ ...current, ...partial }))
  }

  function toggleAddon(id) {
    const next = plan.addons.includes(id) ? plan.addons.filter((item) => item !== id) : [...plan.addons, id]
    patch({ addons: next })
  }

  const stepValid = {
    1: plan.occasion && plan.recipientName.trim() && plan.date && plan.time,
    2: Boolean(plan.vibe),
    3: Boolean(plan.venue),
    4: true,
    5: true,
  }

  function go(next) {
    patch({ step: next })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function makeReveal() {
    const reveal = createReveal(plan)
    navigate(`/reveal/${reveal.id}`)
  }

  return (
    <div className="min-h-svh bg-ink pb-36 text-snow">
      <SeoHead
        title="Build Your Surprise — Surprise"
        description="A 5-step planner for birthdays, proposals, date nights and anniversaries."
        path="/plan"
      />
      <header className="border-b border-line/80 bg-ink/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
          <Link to="/" className="font-display text-xl font-extrabold">
            Surprise 🎯
          </Link>
          <p className="font-ui text-sm text-fog">Build Your Surprise · Step {plan.step}/5</p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 py-6">
        <ol className="mb-4 flex justify-between gap-2">
          {[
            { n: 1, Icon: PartyPopper, label: 'Occasion' },
            { n: 2, Icon: Palette, label: 'Vibe' },
            { n: 3, Icon: MapPin, label: 'Venue' },
            { n: 4, Icon: Sparkles, label: 'Add-ons' },
            { n: 5, Icon: ClipboardCheck, label: 'Review' },
          ].map((item) => {
            const done = plan.step > item.n
            const active = plan.step === item.n
            return (
              <li key={item.n} className="flex flex-1 flex-col items-center gap-1">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full ${
                    active
                      ? 'bg-[#FF3366] text-white'
                      : done
                        ? 'bg-[#FF3366]/20 text-[#FF3366]'
                        : 'bg-raised text-fog'
                  }`}
                >
                  <item.Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className={`font-ui text-[10px] ${active ? 'text-snow' : 'text-fog'}`}>{item.label}</span>
              </li>
            )
          })}
        </ol>
        <div className="mb-2 h-1 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-[#FF3366] transition-all" style={{ width: `${(plan.step / 5) * 100}%` }} />
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-5">
        {plan.step === 1 ? (
          <StepShell title="Who is this for?" label="Step 01 · Occasion & Recipient">
            <div className="grid gap-3 sm:grid-cols-2">
              {planOccasions.map((item) => (
                <ChoiceCard
                  key={item.id}
                  selected={plan.occasion === item.id}
                  onClick={() => patch({ occasion: item.id })}
                  title={`${item.emoji} ${item.label}`}
                  sub={`From ${formatInr(item.base)}`}
                />
              ))}
            </div>
            <label className="mt-6 block font-ui text-sm font-semibold">
              Recipient name
              <input
                value={plan.recipientName}
                onChange={(event) => patch({ recipientName: event.target.value })}
                placeholder="e.g. Priya"
                className="mt-2 w-full rounded-2xl border border-line bg-raised px-4 py-3 text-sm outline-none focus:border-[#FF3366]"
              />
            </label>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="font-ui text-sm font-semibold">
                Date
                <input
                  type="date"
                  value={plan.date}
                  onChange={(event) => patch({ date: event.target.value })}
                  className="mt-2 w-full rounded-2xl border border-line bg-raised px-4 py-3 text-sm outline-none focus:border-[#FF3366]"
                />
              </label>
              <label className="font-ui text-sm font-semibold">
                Time
                <input
                  type="time"
                  value={plan.time}
                  onChange={(event) => patch({ time: event.target.value })}
                  className="mt-2 w-full rounded-2xl border border-line bg-raised px-4 py-3 text-sm outline-none focus:border-[#FF3366]"
                />
              </label>
            </div>
          </StepShell>
        ) : null}

        {plan.step === 2 ? (
          <StepShell title="Pick the vibe." label="Step 02 · Aesthetic">
            <div className="grid gap-4 sm:grid-cols-2">
              {planVibes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => patch({ vibe: item.id })}
                  className={`rounded-2xl border p-5 text-left transition ${
                    plan.vibe === item.id
                      ? 'border-[#FF3366] bg-[#FF3366]/10 ring-2 ring-[#FF3366]/30'
                      : 'border-line bg-panel hover:border-white/20'
                  }`}
                >
                  <div className="flex gap-2">
                    {item.swatches.map((color) => (
                      <span key={color} className="h-8 w-8 rounded-full border border-white/10" style={{ background: color }} />
                    ))}
                  </div>
                  <p className="mt-4 font-display text-lg font-bold">{item.label}</p>
                  <p className="mt-1 text-sm text-fog">{item.line}</p>
                </button>
              ))}
            </div>
          </StepShell>
        ) : null}

        {plan.step === 3 ? (
          <StepShell title="Where does it happen?" label="Step 03 · Venue">
            <div className="grid gap-3">
              {planVenues.map((item) => (
                <ChoiceCard
                  key={item.id}
                  selected={plan.venue === item.id}
                  onClick={() => patch({ venue: item.id })}
                  title={item.label}
                  sub={`${item.line} · ${item.price ? formatInr(item.price) : 'Included'}`}
                />
              ))}
            </div>
          </StepShell>
        ) : null}

        {plan.step === 4 ? (
          <StepShell title="Add the micro-experiences." label="Step 04 · Add-ons">
            <div className="space-y-3">
              {planAddons.map((item) => {
                const on = plan.addons.includes(item.id)
                return (
                  <div key={item.id} className={`rounded-2xl border p-4 ${on ? 'border-[#FF3366] bg-[#FF3366]/10' : 'border-line bg-panel'}`}>
                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={() => toggleAddon(item.id)}
                        className="mt-1 accent-[#FF3366]"
                      />
                      <span className="flex-1">
                        <span className="block font-semibold">{item.label}</span>
                        <span className="block text-sm text-fog">{item.line}</span>
                      </span>
                      <span className="text-sm font-semibold text-pink-hot">{formatInr(item.price)}</span>
                    </label>
                    {item.needsMessage && on ? (
                      <input
                        value={plan.cakeMessage}
                        onChange={(event) => patch({ cakeMessage: event.target.value })}
                        placeholder="Icing message — e.g. Happy 27th, Aanya"
                        className="mt-3 w-full rounded-xl border border-line bg-raised px-3 py-2 text-sm outline-none focus:border-[#FF3366]"
                      />
                    ) : null}
                  </div>
                )
              })}
            </div>
          </StepShell>
        ) : null}

        {plan.step === 5 ? (
          <StepShell title="Review & checkout." label="Step 05 · Lock it in">
            <div className="rounded-2xl border border-line bg-panel p-5">
              <p className="font-display text-2xl font-bold">{plan.recipientName || 'Your person'}</p>
              <p className="mt-2 text-sm text-fog">
                {pricing.occasion?.label} · {pricing.vibe?.label} · {pricing.venue?.label}
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {pricing.lines.map((line) => (
                  <li key={line.name} className="flex justify-between gap-3">
                    <span>{line.name}</span>
                    <span>{formatInr(line.price)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex justify-between border-t border-line pt-3 font-display text-xl">
                <span>Total</span>
                <span className="text-[#FF3366]">{formatInr(pricing.total)}</span>
              </p>
            </div>

            <fieldset className="mt-5 grid gap-3 sm:grid-cols-2">
              <legend className="sr-only">Payment option</legend>
              <ChoiceCard
                selected={plan.payMode === 'advance'}
                onClick={() => patch({ payMode: 'advance' })}
                title="Token advance 25%"
                sub={formatInr(pricing.advance)}
              />
              <ChoiceCard
                selected={plan.payMode === 'full'}
                onClick={() => patch({ payMode: 'full' })}
                title="Pay in full"
                sub={formatInr(pricing.total)}
              />
            </fieldset>

            <label className="mt-6 block text-sm font-semibold">
              Reveal text for them
              <textarea
                value={plan.revealText}
                onChange={(event) => patch({ revealText: event.target.value })}
                rows={3}
                placeholder="Pack your bags, date night at 8 PM!"
                className="mt-2 w-full rounded-2xl border border-line bg-raised px-4 py-3 text-sm outline-none focus:border-[#FF3366]"
              />
            </label>
            <label className="mt-4 block text-sm font-semibold">
              Lock reveal until (optional)
              <input
                type="datetime-local"
                value={plan.lockUntil}
                onChange={(event) => patch({ lockUntil: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-line bg-raised px-4 py-3 text-sm outline-none focus:border-[#FF3366]"
              />
            </label>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappHref(plan)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center rounded-full bg-[#25D366] px-5 py-3 font-ui text-sm font-semibold text-white"
              >
                Inquire via WhatsApp
              </a>
              <Button type="button" variant="secondary" className="flex-1" onClick={makeReveal}>
                Create scratch-card reveal
              </Button>
            </div>
            <Button to={`/track/${trackSlug(plan.recipientName)}`} variant="ghost" className="mt-2">
              Preview day-of tracker →
            </Button>
          </StepShell>
        ) : null}

        <div className="mt-8 flex justify-between pb-8">
          <Button type="button" variant="ghost" disabled={plan.step === 1} onClick={() => go(plan.step - 1)}>
            Back
          </Button>
          {plan.step < 5 ? (
            <Button type="button" disabled={!stepValid[plan.step]} onClick={() => go(plan.step + 1)}>
              Continue
            </Button>
          ) : null}
        </div>
      </main>

      <aside className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0d0d0d]/95 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <div>
            <p className="font-ui text-[11px] uppercase tracking-[0.12em] text-fog">
              {pricing.lines.length} line {pricing.lines.length === 1 ? 'item' : 'items'}
            </p>
            <p className="font-display text-xl font-bold text-[#FF3366]">{formatInr(pricing.total)}</p>
          </div>
          <details className="text-right">
            <summary className="cursor-pointer font-ui text-xs text-fog">Breakdown</summary>
            <ul className="mt-2 max-w-xs text-xs text-fog">
              {pricing.lines.map((line) => (
                <li key={line.name} className="flex justify-between gap-4">
                  <span>{line.name}</span>
                  <span>{formatInr(line.price)}</span>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </aside>
    </div>
  )
}

function trackSlug(name) {
  const slug = String(name || 'DEMO')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
  return `PLAN-${slug || 'DEMO'}`
}

function StepShell({ label, title, children }) {
  return (
    <section>
      <p className="font-ui text-xs font-semibold uppercase tracking-[0.16em] text-pink-hot">{label}</p>
      <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{title}</h1>
      <div className="mt-8">{children}</div>
    </section>
  )
}

function ChoiceCard({ selected, onClick, title, sub }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-2xl border p-4 text-left transition ${
        selected ? 'border-[#FF3366] bg-[#FF3366]/10 ring-2 ring-[#FF3366]/30' : 'border-line bg-panel hover:border-white/20'
      }`}
    >
      <p className="font-display text-lg font-bold">{title}</p>
      {sub ? <p className="mt-1 text-sm text-fog">{sub}</p> : null}
    </button>
  )
}
