import { useTranslation } from 'react-i18next'
import { DoorOpen } from 'lucide-react'
import type { Room } from 'types/room.types'
import { useRoomContext } from 'context/RoomContext'

interface Props {
  room: Room
  isSelected: boolean
}

export function MobileRoomCard({ room, isSelected }: Props) {
  const { t } = useTranslation()
  const { dispatch } = useRoomContext()

  const imageSlot = (
    <div className={['w-full h-24 flex items-center justify-center', isSelected ? 'bg-secondary-container' : 'bg-surface-container'].join(' ')}>
      <span className={isSelected ? 'text-primary' : 'text-outline'}><DoorOpen size={32} /></span>
    </div>
  )

  const textSlot = (
    <div className="p-3">
      <p className={['text-label-md font-bold truncate', isSelected ? 'text-primary' : 'text-on-surface'].join(' ')}>
        {room.name}
      </p>
      <p className="text-body-sm text-on-surface-variant mt-0.5">
        {t('room.capacity', { count: room.capacity })}
      </p>
      {room.is_booked_now && (
        <span className="inline-block mt-1 bg-error text-on-error text-[10px] px-1.5 py-0.5 rounded-full uppercase tracking-wider">
          {t('room.bookedBadge')}
        </span>
      )}
    </div>
  )

  return (
    <button
      type="button"
      onClick={() => dispatch({ type: 'SELECT_ROOM', payload: room.id })}
      className={[
        'min-w-[160px] text-left bg-surface-container-lowest rounded-xl overflow-hidden transition-all shrink-0 flex flex-col',
        isSelected ? 'border-2 border-primary shadow-sm' : 'border border-outline-variant hover:border-primary/50',
      ].join(' ')}
    >
      {imageSlot}
      {textSlot}
    </button>
  )
}
