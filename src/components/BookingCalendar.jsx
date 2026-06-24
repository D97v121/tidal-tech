import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function BookingCalendar({
  value,
  onChange,
  selectedTime,
  onTimeChange,
  availableDates = [],
  availableTimes = [],
}) {
  const [view, setView] = useState(() => {
    const d = new Date()
    return new Date(d.getFullYear(), d.getMonth(), 1)
  })

  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  const days = useMemo(() => {
    const first = new Date(view.getFullYear(), view.getMonth(), 1)
    const startDow = first.getDay()
    const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate()
    const arr = []
    for (let i = 0; i < startDow; i++) arr.push(null)
    for (let d = 1; d <= daysInMonth; d++) arr.push(new Date(view.getFullYear(), view.getMonth(), d))
    return arr
  }, [view])

  const monthLabel = view.toLocaleString('en-US', { month: 'long', year: 'numeric' })

  return (
    <div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
          className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="font-serif text-lg">{monthLabel}</span>
        <button
          type="button"
          onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
          className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} className="py-2">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((d, idx) => {
          if (!d) return <div key={idx} />
          const isPast = d < today
          const dateStr = d.toISOString().split('T')[0]
          const isAvailable = availableDates.includes(dateStr)
          const isSelected = value && d.toDateString() === value.toDateString()
          const isToday = d.toDateString() === today.toDateString()
          const isDisabled = isPast || !isAvailable

          return (
            <button
              key={idx}
              type="button"
              disabled={isDisabled}
              onClick={() => onChange(d)}
              className={`aspect-square rounded-lg text-sm transition-all
                ${isSelected ? 'bg-gradient-tide text-primary-foreground shadow-tide' : ''}
                ${!isSelected && isAvailable && !isPast ? 'border border-primary/20 text-foreground hover:bg-mist' : ''}
                ${isDisabled ? 'cursor-not-allowed text-muted-foreground/30' : ''}
                ${!isSelected && isToday && !isPast ? 'border border-primary/40' : ''}
              `}
            >
              {d.getDate()}
            </button>
          )
        })}
      </div>

      {value && onTimeChange && (
        <div className="mt-8 reveal">
          <p className="text-sm font-medium text-foreground">
            Available times on {value.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          {availableTimes.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">
              No times available for this date. Try another day or request a time below.
            </p>
          ) : (
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {availableTimes.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => onTimeChange(t)}
                  className={`rounded-lg border px-3 py-2.5 text-sm transition-all ${
                    t === selectedTime
                      ? 'border-primary bg-gradient-tide text-primary-foreground shadow-tide'
                      : 'border-border bg-card hover:border-primary/40'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
          <p className="mt-4 text-xs text-muted-foreground">
            Davy will confirm your appointment within a few hours.
          </p>
        </div>
      )}
    </div>
  )
}