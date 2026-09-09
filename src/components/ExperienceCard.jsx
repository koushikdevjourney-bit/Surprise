export default function ExperienceCard({ emoji, title, description, price }) {
  return (
    <article className="group rounded-2xl border border-sand bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-terracotta/25 hover:shadow-md">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cream text-2xl">
        <span aria-hidden="true">{emoji}</span>
      </div>
      <h3 className="font-display text-xl font-medium text-charcoal">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
      <p className="mt-5 text-sm font-semibold text-terracotta">{price}</p>
    </article>
  )
}
