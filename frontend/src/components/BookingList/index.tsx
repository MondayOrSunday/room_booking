import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TriangleAlert } from 'lucide-react'
import { useBookings } from 'hooks/useBookings'
import { useRoomContext } from 'context/RoomContext'
import { deleteBooking } from 'api/bookings.api'
import { BookingItem } from 'components/BookingItem'

interface DeleteModal {
  bookingId: number
  roomName: string
}

export function BookingList() {
  useBookings()
  const { t } = useTranslation()
  const { state, dispatch, rooms, markRoomBooked } = useRoomContext()
  const [deleteModal, setDeleteModal] = useState<DeleteModal | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const selectedRoom = rooms.find(r => r.id === state.selectedRoomId)

  const openDeleteModal = (bookingId: number) => {
    setDeleteModal({ bookingId, roomName: selectedRoom?.name ?? '' })
    setDeleteError(null)
  }

  const closeDeleteModal = () => {
    if (!isDeleting) { setDeleteModal(null) }
  }

  const confirmDelete = async () => {
    if (!deleteModal) { return }
    setIsDeleting(true)
    try {
      await deleteBooking(deleteModal.bookingId)
      dispatch({ type: 'DELETE_BOOKING', payload: deleteModal.bookingId })
      const remaining = state.bookings.filter(b => b.id !== deleteModal.bookingId)
      const stillBooked = remaining.some(b => new Date(b.end_time).getTime() > Date.now())
      if (state.selectedRoomId !== null) {
        markRoomBooked(state.selectedRoomId, stillBooked)
      }
      setDeleteModal(null)
    } catch {
      setDeleteError(t('booking.deleteError'))
    } finally {
      setIsDeleting(false)
    }
  }

  if (state.loading) {
    const skeletonBars = (
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-surface-container-low animate-pulse rounded w-1/3" />
        <div className="h-3 bg-surface-container-low animate-pulse rounded w-1/2" />
      </div>
    )
    return (
      <div className="space-y-stack-md">
        {[1, 2].map(i => (
          <div key={i} className="flex items-center gap-gutter p-stack-md border border-outline-variant rounded-lg">
            <div className="w-12 h-12 rounded-full bg-surface-container-low animate-pulse shrink-0" />
            {skeletonBars}
          </div>
        ))}
      </div>
    )
  }

  if (state.bookings.length === 0) {
    return (
      <div className="p-stack-md border border-dashed border-outline-variant rounded-lg flex items-center justify-center bg-surface-container-lowest">
        <p className="text-label-sm text-outline">{t('booking.noBookings')}</p>
      </div>
    )
  }

  const modalHeader = (
    <div className="flex items-center gap-stack-sm mb-stack-sm">
      <span className="text-error shrink-0"><TriangleAlert size={24} /></span>
      <h2 className="text-headline-sm font-headline-sm text-on-surface">{t('booking.deleteConfirmTitle')}</h2>
    </div>
  )

  const modalActions = (
    <div className="flex flex-col gap-stack-sm">
      <button
        type="button"
        className="bg-error text-on-error h-12 rounded font-label-md flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-60"
        onClick={confirmDelete}
        disabled={isDeleting}
      >
        {t('booking.deleteButton')}
      </button>
      <button
        type="button"
        className="bg-transparent border border-outline text-primary h-12 rounded font-label-md flex items-center justify-center hover:bg-surface-container-low transition-colors disabled:opacity-60"
        onClick={closeDeleteModal}
        disabled={isDeleting}
      >
        {t('booking.cancelButton')}
      </button>
    </div>
  )

  const modalBody = deleteModal ? (
    <>
      {modalHeader}
      <p className="text-body-md text-on-surface-variant mb-stack-lg">
        {t('booking.deleteConfirmMessage', { roomName: deleteModal.roomName })}
      </p>
      {deleteError && (
        <p className="text-label-sm text-error mb-stack-sm">{deleteError}</p>
      )}
      {modalActions}
    </>
  ) : null

  return (
    <>
      <div className="space-y-stack-md">
        {state.bookings.map(booking => (
          <BookingItem key={booking.id} booking={booking} onDelete={openDeleteModal} />
        ))}
      </div>
      {deleteModal && (
        <div
          role="presentation"
          className="fixed inset-0 bg-on-surface/40 backdrop-blur-[1px] z-50 flex items-center justify-center px-margin-mobile"
          onClick={closeDeleteModal}
          onKeyDown={e => { if (e.key === 'Escape') { closeDeleteModal() } }}
        >
          <dialog
            open
            aria-modal="true"
            aria-labelledby="delete-modal-title"
            className="bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.08)] w-full max-w-sm flex flex-col p-stack-lg border border-outline-variant relative m-0"
            onClick={e => e.stopPropagation()}
            onKeyDown={e => e.stopPropagation()}
          >
            {modalBody}
          </dialog>
        </div>
      )}
    </>
  )
}
