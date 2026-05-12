import { useTranslation } from 'react-i18next'
import { DoorOpen } from 'lucide-react'
import type { Room } from 'types/room.types'
import { useRoomContext } from 'context/RoomContext'
import { RoomItemButton } from 'components/RoomList/styled'

interface Props {
  room: Room
}

export function RoomItem({ room }: Props) {
  const { t } = useTranslation()
  const { state, dispatch } = useRoomContext()
  const isSelected = state.selectedRoomId === room.id

  const nameRow = (
    <div className="flex items-center justify-between gap-1">
      <span className={`text-label-md font-bold ${isSelected ? 'text-primary' : 'text-on-surface'}`}>{room.name}</span>
      {room.is_booked_now && (
        <span className="bg-error text-on-error text-[10px] px-1.5 py-0.5 rounded-full uppercase tracking-wider shrink-0">
          {t('room.bookedBadge')}
        </span>
      )}
    </div>
  )

  const roomInfo = (
    <div className="flex-1 min-w-0">
      {nameRow}
      <span className="text-label-sm text-on-surface-variant mt-2 block">
        {t('room.capacity', { count: room.capacity })}
      </span>
    </div>
  )

  const isLoading = isSelected && state.loading

  const icon = isLoading
    ? <span className="shrink-0 mt-0.5 h-6 w-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    : <span className={`shrink-0 mt-0.5 ${isSelected ? 'text-primary' : 'text-outline'}`}><DoorOpen size={24} /></span>

  const content = (
    <div className="flex items-start gap-3 w-full">
      {icon}
      {roomInfo}
    </div>
  )

  return (
    <div className="pb-stack-md">
      <RoomItemButton
        $active={isSelected}
        $booked={room.is_booked_now}
        disabled={isLoading}
        onClick={() => dispatch({ type: 'SELECT_ROOM', payload: room.id })}
      >
        {content}
      </RoomItemButton>
    </div>
  )
}
