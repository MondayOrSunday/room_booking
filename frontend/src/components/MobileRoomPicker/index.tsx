import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useRoomContext } from 'context/RoomContext'
import { MobileRoomCard } from 'components/MobileRoomCard'

export function MobileRoomPicker() {
  const { t } = useTranslation()
  const { state, rooms, loadMore, loadingRooms, noMoreRooms } = useRoomContext()
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) { return undefined }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loadingRooms && !noMoreRooms) { loadMore() }
      },
      { root: el.parentElement, threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [loadMore, loadingRooms, noMoreRooms])

  if (rooms.length === 0 && !loadingRooms) { return null }

  const cards = (
    <div className="flex gap-stack-md overflow-x-auto pb-stack-sm -mx-gutter px-gutter scrollbar-hide">
      {rooms.map(room => (
        <MobileRoomCard key={room.id} room={room} isSelected={state.selectedRoomId === room.id} />
      ))}
      <div ref={sentinelRef} className="w-4 shrink-0" />
    </div>
  )

  return (
    <section className="lg:hidden mb-stack-lg">
      <h2 className="text-headline-sm font-bold text-on-surface mb-stack-md">
        {t('sidebar.availableRooms')}
      </h2>
      {cards}
    </section>
  )
}
