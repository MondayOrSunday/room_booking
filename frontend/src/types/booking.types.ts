export interface Booking {
  id: number
  room_id: number
  user_name: string
  start_time: string
  end_time: string
}

export interface CreateBookingPayload {
  room_id: number
  user_name: string
  start_time: string
  end_time: string
}
