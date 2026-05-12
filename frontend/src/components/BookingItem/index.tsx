import { useTranslation } from 'react-i18next'
import { Trash2 } from 'lucide-react'
import type { Booking } from 'types/booking.types'
import { AvatarCircle } from 'components/BookingList/styled'

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function formatUtcDate(iso: string, includeYear: boolean): string {
  // Parse the date portion from the ISO string directly to avoid local-timezone shift
  const [year, month, day] = iso.slice(0, 10).split('-').map(Number)
  const label = `${MONTHS[month - 1]} ${day}`
  return includeYear ? `${label}, ${year}` : label
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() ?? '')
    .join('')
}

interface Props {
  booking: Booking
  onDelete: (id: number) => void
}

export function BookingItem({ booking, onDelete }: Props) {
  const { t } = useTranslation()

  const userInfo = (
    <div>
      <p className="text-body-md font-bold text-on-surface">{booking.user_name}</p>
      <p className="text-label-sm text-on-surface-variant">
        {formatUtcDate(booking.start_time, false)} – {formatUtcDate(booking.end_time, true)}
      </p>
    </div>
  )

  const leftSlot = (
    <div className="flex items-center gap-gutter">
      <AvatarCircle $name={booking.user_name}>
        {getInitials(booking.user_name)}
      </AvatarCircle>
      {userInfo}
    </div>
  )

  return (
    <div className="flex items-center justify-between p-stack-md border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors">
      {leftSlot}
      <button
        type="button"
        className="p-2 text-outline hover:text-error hover:bg-error-container rounded-full transition-all"
        onClick={() => onDelete(booking.id)}
        aria-label={t('booking.deleteButton')}
      >
        <Trash2 size={20} />
      </button>
    </div>
  )
}
