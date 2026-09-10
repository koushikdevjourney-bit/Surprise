import { motion } from 'framer-motion'
import {
  addonOptions,
  captureOptions,
  crewOptions,
  decorOptions,
  entertainmentOptions,
  messageOptions,
  sweetOptions,
  transportOptions,
} from '../../data/surpriseBuilder'
import { hasBuiltSurprise, normalizeBuilder, removeBuilderLine, toggleId } from '../../lib/builder'
import { formatInr } from '../../lib/format'
import Button from '../Button'
import BuilderAddRow from './BuilderAddRow'
import BuilderOrderSummary from './BuilderOrderSummary'

export default function StepSurpriseBuilder({ data, onChange, onBack, onContinue }) {
  const builder = normalizeBuilder(data.builder)
  const valid = hasBuiltSurprise(data)

  function patch(partial) {
    const next = { ...builder, ...partial }
    onChange({
      builder: next,
      experienceId: next.crewId ? 'custom-build' : data.experienceId,
    })
  }

  function handleContinue() {
    if (!valid) return
    onContinue()
  }

  return (
    <div>
      <p className="font-ui text-xs font-semibold uppercase tracking-[0.16em] text-pink-hot">
        STEP 03 · BUILD YOUR SURPRISE
      </p>
      <h2 className="mt-2 font-display text-3xl font-bold text-snow sm:text-4xl">Build the mission. 🎯</h2>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-fog">
        Pick your crew, add the magic, set the vibe.
      </p>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(260px,2fr)]">
        <div className="space-y-12 pb-28 lg:pb-0">
          <CrewSection selected={builder.crewId} onSelect={(crewId) => patch({ crewId })} />
          <TransportSection selected={builder.transportId} onSelect={(transportId) => patch({ transportId })} />
          <ToggleSection
            emoji="🎂"
            title="Sweet Stuff"
            sub="Add something delicious."
            items={sweetOptions}
            selectedIds={builder.sweets}
            onToggle={(id) => patch({ sweets: toggleId(builder.sweets, id) })}
          />
          <ToggleSection
            emoji="🌸"
            title="Flowers & Decor"
            sub="Make it look like a movie scene."
            items={decorOptions}
            selectedIds={builder.decor}
            onToggle={(id) => patch({ decor: toggleId(builder.decor, id) })}
          />

          <section>
            <SectionHeading emoji="🎤" title="Entertainment" sub="Add a performer to the mission." />
            <p className="mt-3 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-ui text-xs text-fog">
              One performer per surprise (they coordinate together)
            </p>
            <div className="mt-4 space-y-2">
              {entertainmentOptions.map((item) => (
                <BuilderAddRow
                  key={item.id}
                  item={item}
                  added={builder.entertainmentId === item.id}
                  onToggle={() =>
                    patch({ entertainmentId: builder.entertainmentId === item.id ? '' : item.id })
                  }
                />
              ))}
            </div>
          </section>

          <ToggleSection
            emoji="📸"
            title="Capture the Moment"
            sub="The reaction is the best part. Don't miss it."
            items={captureOptions}
            selectedIds={builder.capture}
            onToggle={(id) => patch({ capture: toggleId(builder.capture, id) })}
          />
          <ToggleSection
            emoji="💌"
            title="The Message"
            sub="Words that make the moment complete."
            items={messageOptions}
            selectedIds={builder.messages}
            onToggle={(id) => patch({ messages: toggleId(builder.messages, id) })}
          />
          <ToggleSection
            emoji="✨"
            title="Special Add-ons"
            sub="The details that make it unforgettable."
            items={addonOptions}
            selectedIds={builder.addons}
            onToggle={(id) => patch({ addons: toggleId(builder.addons, id) })}
          />

          <div className="hidden lg:block">
            <Button type="button" variant="ghost" onClick={onBack} className="px-2">
              Back
            </Button>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-6">
            <BuilderOrderSummary
              data={data}
              onRemove={(line) => patch(removeBuilderLine(builder, line))}
              onContinue={handleContinue}
            />
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0d0d0d]/95 px-4 py-3 backdrop-blur-md lg:hidden">
        <BuilderOrderSummary data={data} onContinue={handleContinue} variant="bar" />
        <button type="button" onClick={onBack} className="mt-2 w-full text-center font-ui text-xs text-fog">
          Back
        </button>
      </div>
    </div>
  )
}

function SectionHeading({ emoji, title, sub }) {
  return (
    <div>
      <h3 className="font-display text-2xl font-bold text-snow">
        {emoji} {title}
      </h3>
      <p className="mt-1 text-sm text-fog">{sub}</p>
    </div>
  )
}

function ToggleSection({ emoji, title, sub, items, selectedIds, onToggle }) {
  return (
    <section>
      <SectionHeading emoji={emoji} title={title} sub={sub} />
      <div className="mt-4 space-y-2">
        {items.map((item) => (
          <BuilderAddRow
            key={item.id}
            item={item}
            added={selectedIds.includes(item.id)}
            onToggle={() => onToggle(item.id)}
          />
        ))}
      </div>
    </section>
  )
}

function CrewSection({ selected, onSelect }) {
  return (
    <section>
      <SectionHeading emoji="👥" title="The Crew" sub="Who shows up at the door?" />
      <div className="-mx-5 mt-5 flex gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:thin]">
        {crewOptions.map((item) => {
          const isSelected = selected === item.id
          return (
            <motion.button
              key={item.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelect(item.id)}
              whileHover={{ y: -4 }}
              className={`relative w-[220px] shrink-0 rounded-2xl border p-5 text-left transition-colors sm:w-[240px] ${
                isSelected
                  ? 'border-pink-500 bg-[#FF3366]/10 shadow-[0_0_24px_rgba(255,51,102,0.35)]'
                  : 'border-[rgba(255,255,255,0.08)] bg-[#1a1a2e] hover:border-white/20'
              }`}
            >
              {item.badge ? (
                <span className="absolute top-3 right-3 rounded-full bg-[#FF3366] px-2 py-0.5 font-ui text-[10px] font-bold tracking-wide text-white">
                  {item.badge}
                </span>
              ) : null}
              <p className="text-2xl tracking-wide" aria-hidden="true">
                {item.emoji}
              </p>
              <p className="mt-3 font-display text-lg font-bold text-snow">{item.name}</p>
              <p className="mt-0.5 text-xs font-medium text-fog">{item.people}</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">{item.description}</p>
              <p className="mt-4 font-ui text-sm font-semibold text-[#FF3366]">{formatInr(item.price)}</p>
            </motion.button>
          )
        })}
      </div>
    </section>
  )
}

function TransportSection({ selected, onSelect }) {
  return (
    <section>
      <SectionHeading
        emoji="🚗"
        title="Transport"
        sub="How does the crew get there? (We handle booking — just pick the vibe)"
      />
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {transportOptions.map((item) => {
          const isSelected = selected === item.id
          return (
            <motion.button
              key={item.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelect(item.id)}
              whileHover={{ y: -3 }}
              className={`relative rounded-2xl border p-5 text-left transition-colors ${
                isSelected
                  ? 'border-pink-500 bg-[#FF3366]/10 shadow-[0_0_24px_rgba(255,51,102,0.35)]'
                  : 'border-[rgba(255,255,255,0.08)] bg-[#1a1a2e] hover:border-white/20'
              }`}
            >
              {item.badge ? (
                <span className="absolute top-3 right-3 rounded-full bg-[#FF3366] px-2 py-0.5 font-ui text-[10px] font-bold tracking-wide text-white">
                  {item.badge}
                </span>
              ) : null}
              <p className="font-display text-lg font-bold text-snow">
                <span aria-hidden="true">{item.emoji} </span>
                {item.name}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">{item.description}</p>
              <p className="mt-3 font-ui text-sm font-semibold text-[#FF3366]">
                {item.included ? '₹0 (included)' : formatInr(item.price)}
              </p>
            </motion.button>
          )
        })}
      </div>
      <p className="mt-4 inline-flex max-w-xl items-start gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs leading-relaxed text-fog">
        <span aria-hidden="true">ℹ️</span>
        Transport cost covers crew travel within 15km of city center. Extra ₹50/km beyond that.
      </p>
    </section>
  )
}
