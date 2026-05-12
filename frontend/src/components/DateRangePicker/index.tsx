import { useState, useRef, useEffect } from 'react'
import { DayPicker, type DateRange } from 'react-day-picker'
import 'react-day-picker/style.css'
import { CalendarDays } from 'lucide-react'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { Popover } from './styled'

export type { DateRange }

interface Props {
  value: DateRange | undefined
  onChange: (range: DateRange | undefined) => void
  disabled?: boolean
  hasError?: boolean
}

export function DateRangePicker({ value, onChange, disabled, hasError }: Props) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [])

  const displayText = value?.from
    ? value.to
      ? `${dayjs(value.from).format('MMM D, YYYY')} – ${dayjs(value.to).format('MMM D, YYYY')}`
      : dayjs(value.from).format('MMM D, YYYY')
    : t('booking.dateRangePlaceholder')

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(prev => !prev)}
        className={[
          'w-full flex items-center text-left pl-10 pr-4 py-3 rounded-lg border text-body-md transition-all',
          hasError
            ? 'border-error'
            : open
              ? 'border-primary ring-1 ring-primary'
              : 'border-outline-variant',
          disabled
            ? 'bg-surface-container opacity-60 cursor-not-allowed'
            : 'bg-white hover:border-primary/50 cursor-pointer',
          value?.from ? 'text-on-surface' : 'text-outline',
        ].join(' ')}
      >
        {displayText}
      </button>
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none">
        <CalendarDays size={18} />
      </span>

      {open && (
        <Popover>
          <DayPicker
            mode="range"
            numberOfMonths={2}
            selected={value}
            onSelect={onChange}
            disabled={{ before: new Date() }}
          />
        </Popover>
      )}
    </div>
  )
}
