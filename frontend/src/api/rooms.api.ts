import { request } from './client'
import type { Room } from '../types/room.types'
import type { Booking } from '../types/booking.types'

export interface RoomPage {
  data: Room[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

export const getRooms = (page = 1, perPage = 10): Promise<RoomPage> =>
  request(`/rooms?page=${page}&perPage=${perPage}`)

export const getRoomBookings = (roomId: number): Promise<{ data: Booking[] }> =>
  request(`/rooms/${roomId}/bookings`)
