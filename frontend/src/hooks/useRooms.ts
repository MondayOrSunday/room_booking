import { useInfiniteScroll } from 'ahooks'
import { getRooms } from '../api/rooms.api'
import type { Room } from '../types/room.types'

interface RoomsResult {
  list: Room[]
  currentPage: number
  lastPage: number
}

export function useRooms() {
  const result = useInfiniteScroll<RoomsResult>(
    async (d) => {
      const page = d ? d.currentPage + 1 : 1
      const res = await getRooms(page, 10)
      return {
        list: res.data,
        currentPage: res.meta.current_page,
        lastPage: res.meta.last_page,
      }
    },
    {
      isNoMore: (d) => !!d && d.currentPage >= d.lastPage,
    }
  )

  const markBooked = (roomId: number, isBooked = true) => {
    result.mutate(prev => {
      if (!prev) return prev
      return { ...prev, list: prev.list.map(r => r.id === roomId ? { ...r, is_booked_now: isBooked } : r) }
    })
  }

  return { ...result, markBooked }
}
