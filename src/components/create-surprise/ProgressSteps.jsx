const STEPS = [
  { id: 1, number: '01', label: 'Recipient' },
  { id: 2, number: '02', label: 'Occasion' },
  { id: 3, number: '03', label: 'Experience' },
  { id: 4, number: '04', label: 'Personalize' },
  { id: 5, number: '05', label: 'When & Where' },
  { id: 6, number: '06', label: 'Review' },
]

export default function ProgressSteps({ current }) {
  return (
    <nav aria-label="Surprise creation progress" className="-mx-1 overflow-x-auto pb-1">
      <ol className="flex min-w-max items-center gap-1 px-1 sm:min-w-0 sm:flex-wrap sm:justify-center">
        {STEPS.map((step, index) => {
          const isCurrent = step.id === current
          const isDone = step.id < current

          return (
            <li key={step.id} className="flex items-center">
              {index > 0 ? (
                <span
                  className={`mx-1 hidden h-px w-6 sm:mx-2 sm:block sm:w-8 ${isDone || isCurrent ? 'bg-terracotta/40' : 'bg-sand'}`}
                  aria-hidden="true"
                />
              ) : null}
              <div
                className={`flex items-center gap-2 rounded-full px-2.5 py-1.5 text-xs sm:px-3 sm:text-sm ${
                  isCurrent
                    ? 'bg-terracotta/10 text-terracotta'
                    : isDone
                      ? 'text-charcoal'
                      : 'text-muted'
                }`}
              >
                <span className={`font-semibold ${isCurrent ? 'text-terracotta' : ''}`}>
                  {step.number}
                </span>
                <span className={isCurrent ? 'font-semibold' : 'font-medium'}>{step.label}</span>
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
