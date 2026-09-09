const STEPS = [
  { id: 1, number: '01', label: 'Target' },
  { id: 2, number: '02', label: 'Occasion' },
  { id: 3, number: '03', label: 'Experience' },
  { id: 4, number: '04', label: 'Magic' },
  { id: 5, number: '05', label: 'When' },
  { id: 6, number: '06', label: 'Review' },
  { id: 7, number: '07', label: 'Briefing' },
  { id: 8, number: '08', label: 'Launch' },
  { id: 9, number: '09', label: 'Accepted' },
]

export default function ProgressSteps({ current }) {
  return (
    <nav aria-label="Mission progress" className="-mx-1 overflow-x-auto pb-1">
      <ol className="flex min-w-max items-center gap-1 px-1">
        {STEPS.map((step, index) => {
          const isCurrent = step.id === current
          const isDone = step.id < current

          return (
            <li key={step.id} className="flex items-center">
              {index > 0 ? (
                <span
                  className={`mx-1 h-px w-4 sm:mx-1.5 sm:w-6 ${isDone || isCurrent ? 'bg-pink/50' : 'bg-line'}`}
                  aria-hidden="true"
                />
              ) : null}
              <div
                className={`flex items-center gap-1.5 rounded-full px-2 py-1.5 text-[11px] sm:px-2.5 sm:text-xs ${
                  isCurrent ? 'bg-pink/15 text-pink-hot' : isDone ? 'text-snow' : 'text-fog'
                }`}
              >
                <span className={`font-semibold ${isCurrent ? 'text-pink-hot' : ''}`}>{step.number}</span>
                <span className={isCurrent ? 'font-semibold' : 'font-medium'}>{step.label}</span>
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
