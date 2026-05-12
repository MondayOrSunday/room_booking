import { useEffect } from 'react'
import { getRoomBookings } from '../api/rooms.api'
import { useRoomContext } from '../context/RoomContext'

export function useBookings() {
  const { state, dispatch } = useRoomContext()

  useEffect(() => {
    if (state.selectedRoomId === null) {return}

    getRoomBookings(state.selectedRoomId)
      .then(res => dispatch({ type: 'SET_BOOKINGS', payload: res.data }))
      .catch(() => dispatch({ type: 'SET_BOOKINGS', payload: [] }))
  }, [state.selectedRoomId, dispatch])
}
