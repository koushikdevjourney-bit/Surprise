import { applySteps } from '../../data/crew'

export default function CrewProgress({ current }) {
  const fill = Math.max(0, Math.min(1, (current - 1) / (applySteps.length - 1)))

  return (
    <nav aria-label="Application progress" className="-mx-1 overflow-x-auto pb-1">
      <p className="mb-2 font-ui text-xs font-semibold text-fog">
        Step {current}/{applySteps.length}
      </p>
      <div className="mb-3 h-1 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[#FF3366] transition-all duration-300"
          style={{ width: `${fill * 100}%` }}
        />
      </div>
      <ol className="flex min-w-max items-center gap-1 px-1">
        {applySteps.map((step, index) => {
          const isCurrent = step.id === current
          const isDone = step.id < current

          return (
            <li key={step.id} className="flex items-center">
              {index > 0 ? (
                <span
                  className={`mx-1 h-px w-6 sm:mx-1.5 sm:w-10 ${isDone || isCurrent ? 'bg-[#FF3366]' : 'bg-white/15'}`}
                  aria-hidden="true"
                />
              ) : null}
              <div
                className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] sm:px-3 sm:text-xs ${
                  isCurrent
                    ? 'bg-[#FF3366] font-semibold text-white shadow-[0_0_18px_rgba(255,51,102,0.45)]'
                    : isDone
                      ? 'text-[#FF3366]'
                      : 'text-gray-500'
                }`}
              >
                <span className="font-semibold">{isDone ? '✓' : step.number}</span>
                <span className={isCurrent ? 'font-semibold' : 'font-medium'}>{step.label}</span>
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
