import { useTranslation } from 'react-i18next'
import { DoorOpen, UserCircle } from 'lucide-react'

export function AppHeader() {
  const { t } = useTranslation()

  const brand = (
    <div className="flex items-center gap-stack-sm">
      <span className="text-primary"><DoorOpen size={24} /></span>
      <span className="text-headline-md font-bold text-primary">{t('app.name')}</span>
    </div>
  )

  const actions = (
    <div className="flex items-center gap-gutter">
      <span className="text-on-surface-variant"><UserCircle size={24} /></span>
    </div>
  )

  return (
    <header className="bg-surface border-b border-outline-variant flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop h-16 sticky top-0 z-50">
      {brand}
      {actions}
    </header>
  )
}
