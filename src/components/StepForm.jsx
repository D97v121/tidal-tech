import { useState } from 'react'
import { Check, ChevronLeft, ChevronRight } from 'lucide-react'

export function StepForm({ steps, onSubmit, submitLabel = 'Submit' }) {
  const [i, setI] = useState(0)
  const [done, setDone] = useState(false)
  const total = steps.length
  const isLast = i === total - 1

  if (done) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-soft">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-tide">
          <Check className="h-7 w-7 text-primary-foreground" />
        </div>
        <h3 className="mt-6 text-2xl font-serif">You're all set.</h3>
        <p className="mt-3 text-muted-foreground">
          Davy will reach out personally within a few hours to confirm.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border bg-card shadow-soft">
      {/* Progress */}
      <div className="border-b border-border px-6 pt-6 pb-5 sm:px-8">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Step {i + 1} of {total}</span>
          <span>{Math.round(((i + 1) / total) * 100)}% complete</span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-tide transition-all duration-500"
            style={{ width: `${((i + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="px-6 py-8 sm:px-8">
        <h3 className="text-2xl sm:text-3xl font-serif">{steps[i].title}</h3>
        {steps[i].subtitle && (
          <p className="mt-2 text-muted-foreground">{steps[i].subtitle}</p>
        )}
        <div className="mt-6 space-y-5">{steps[i].content}</div>
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between gap-3 border-t border-border bg-mist/50 px-6 py-4 sm:px-8">
        <button
          type="button"
          onClick={() => setI((v) => Math.max(0, v - 1))}
          disabled={i === 0}
          className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>
        <button
          type="button"
          onClick={async () => {
            if (isLast) {
              try {
                await onSubmit()
                setDone(true)
              } catch {
                // onSubmit threw — stay on form, alert already shown
              }
            } else {
              setI((v) => v + 1)
            }
          }}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-tide px-6 py-3 text-sm font-medium text-primary-foreground shadow-tide transition-transform hover:scale-[1.02]"
        >
          {isLast ? submitLabel : 'Continue'}
          {!isLast && <ChevronRight className="h-4 w-4" />}
        </button>
      </div>
    </div>
  )
}

export function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-foreground">{label}</span>
      {hint && <span className="block text-xs text-muted-foreground mt-0.5">{hint}</span>}
      <div className="mt-2">{children}</div>
    </label>
  )
}

export function TextInput(props) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 ${props.className ?? ''}`}
    />
  )
}

export function TextArea(props) {
  return (
    <textarea
      {...props}
      rows={props.rows ?? 4}
      className={`w-full resize-y rounded-lg border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 ${props.className ?? ''}`}
    />
  )
}

export function Chips({ options, value, onChange, multi = false }) {
  const toggle = (o) => {
    if (multi) {
      onChange(value.includes(o) ? value.filter((v) => v !== o) : [...value, o])
    } else {
      onChange(value.includes(o) ? [] : [o])
    }
  }
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = value.includes(o)
        return (
          <button
            key={o}
            type="button"
            onClick={() => toggle(o)}
            className={`rounded-full border px-4 py-2 text-sm transition-all ${
              active
                ? 'border-primary bg-gradient-tide text-primary-foreground shadow-tide'
                : 'border-border bg-card text-foreground hover:border-primary/40'
            }`}
          >
            {o}
          </button>
        )
      })}
    </div>
  )
}