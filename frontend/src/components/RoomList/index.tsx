import { Virtuoso } from 'react-virtuoso'
import { useRoomContext } from 'context/RoomContext'
import { RoomItem } from 'components/RoomItem'

export function RoomList() {
  const { rooms, loadMore, loadingRooms, noMoreRooms } = useRoomContext()

  if (rooms.length === 0 && loadingRooms) {
    return (
      <div className="flex flex-col gap-stack-sm">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-14 bg-surface-container-low rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }

  const footer = () =>
    loadingRooms
      ? <div className="h-5 w-5 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto my-4" />
      : null

  return (
    <div className="h-[calc(100vh-180px)]">
      <Virtuoso
        data={rooms}
        endReached={() => { if (!loadingRooms && !noMoreRooms) { loadMore() } }}
        overscan={200}
        itemContent={(_, room) => <RoomItem room={room} />}
        components={{ Footer: footer }}
      />
    </div>
  )
}
