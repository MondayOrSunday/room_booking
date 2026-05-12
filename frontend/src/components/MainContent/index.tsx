import { useTranslation } from 'react-i18next'
import { CalendarDays } from 'lucide-react'
import { useRoomContext } from 'context/RoomContext'
import { MobileRoomPicker } from 'components/MobileRoomPicker'
import { RoomHeader } from 'components/RoomHeader'
import { SelectRoomPrompt } from 'components/SelectRoomPrompt'
import { BookingList } from 'components/BookingList'
import { BookingForm } from 'components/BookingForm'

export function MainContent() {
  const { t } = useTranslation()
  const { state } = useRoomContext()

  const sectionTitle = (
    <h2 className="text-headline-sm font-bold text-on-surface mb-stack-lg flex items-center gap-stack-sm">
      <span className="text-primary"><CalendarDays size={20} /></span>
      {t('booking.currentBookings')}
    </h2>
  )

  const bookingsSection = (
    <div className="bg-white border border-outline-variant rounded-xl p-stack-lg">
      {sectionTitle}
      <BookingList />
    </div>
  )

  const roomContent = (
    <>
      <RoomHeader />
      <div className="space-y-stack-lg">
        {bookingsSection}
        <BookingForm />
      </div>
    </>
  )

  return (
    <>
      <MobileRoomPicker />
      {state.selectedRoomId === null ? <SelectRoomPrompt /> : roomContent}
    </>
  )
}
