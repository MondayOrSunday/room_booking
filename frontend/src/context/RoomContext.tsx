import { createContext, useContext, useReducer } from 'react';
import type { ReactNode, Dispatch } from 'react';
import type { Room } from '../types/room.types'
import type { Booking } from '../types/booking.types'
import { useRooms } from '../hooks/useRooms'

interface State {
  selectedRoomId: number | null
  bookings: Booking[]
  loading: boolean
}

type Action =
  | { type: 'SELECT_ROOM'; payload: number }
  | { type: 'SET_BOOKINGS'; payload: Booking[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'ADD_BOOKING'; payload: Booking }
  | { type: 'DELETE_BOOKING'; payload: number }
  | { type: 'SET_ROOM_BOOKED'; payload: { roomId: number; isBooked: boolean } }

const initialState: State = {
  selectedRoomId: null,
  bookings: [],
  loading: false,
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SELECT_ROOM':
      return { ...state, selectedRoomId: action.payload, bookings: [], loading: true }
    case 'SET_BOOKINGS':
      return { ...state, bookings: action.payload, loading: false }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'ADD_BOOKING':
      return { ...state, bookings: [...state.bookings, action.payload] }
    case 'DELETE_BOOKING':
      return { ...state, bookings: state.bookings.filter(b => b.id !== action.payload) }
    case 'SET_ROOM_BOOKED':
      return state
    default:
      return state
  }
}

interface RoomContextValue {
  state: State
  dispatch: Dispatch<Action>
  rooms: Room[]
  loadMore: () => void
  loadingRooms: boolean
  noMoreRooms: boolean
  markRoomBooked: (roomId: number, isBooked?: boolean) => void
}

const RoomContext = createContext<RoomContextValue | null>(null)

export function RoomProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { data, loadMore, loading: loadingRooms, noMore: noMoreRooms, markBooked } = useRooms()

  return (
    <RoomContext.Provider
      value={{
        state,
        dispatch,
        rooms: data?.list ?? [],
        loadMore,
        loadingRooms,
        noMoreRooms,
        markRoomBooked: (roomId: number, isBooked = true) => markBooked(roomId, isBooked),
      }}
    >
      {children}
    </RoomContext.Provider>
  )
}

export function useRoomContext() {
  const ctx = useContext(RoomContext)
  if (!ctx) {throw new Error('useRoomContext must be used within RoomProvider')}
  return ctx
}
