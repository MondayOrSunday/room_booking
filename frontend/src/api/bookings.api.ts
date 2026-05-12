import { request } from './client'
import type { Booking, CreateBookingPayload } from '../types/booking.types'

export const createBooking = (data: CreateBookingPayload): Promise<{ data: Booking }> =>
  request('/bookings', {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const deleteBooking = (id: number): Promise<void> =>
  request(`/bookings/${id}`, { method: 'DELETE' })
