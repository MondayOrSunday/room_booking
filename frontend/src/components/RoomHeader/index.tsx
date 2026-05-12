import { useTranslation } from 'react-i18next'
import { Users } from 'lucide-react'
import { useRoomContext } from 'context/RoomContext'

export function RoomHeader() {
  const { t } = useTranslation()
  const { state, rooms } = useRoomContext()
  const room = rooms.find(r => r.id === state.selectedRoomId)

  if (!room) { return null }

  const capacityRow = (
    <div className="flex items-center gap-stack-sm mt-stack-sm text-body-md text-on-surface-variant">
      <span className="text-primary"><Users size={18} /></span>
      <span>{t('room.capacity', { count: room.capacity })}</span>
    </div>
  )

  return (
    <div className="mb-stack-lg flex flex-col md:flex-row md:items-end justify-between gap-stack-md">
      <div>
        <h1 className="text-headline-lg font-bold text-on-surface">{room.name}</h1>
        {capacityRow}
      </div>
    </div>
  )
}
