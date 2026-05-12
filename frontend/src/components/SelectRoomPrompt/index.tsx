import { useTranslation } from 'react-i18next'
import { DoorOpen } from 'lucide-react'

export function SelectRoomPrompt() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <span className="text-outline-variant mb-stack-md"><DoorOpen size={48} /></span>
      <p className="text-body-md text-on-surface-variant">{t('room.selectPrompt')}</p>
    </div>
  )
}
