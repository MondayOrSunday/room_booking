import { useTranslation } from 'react-i18next'
import { RoomList } from 'components/RoomList'

export function Sidebar() {
  const { t } = useTranslation()

  return (
    <aside className="hidden lg:flex flex-col gap-stack-md p-gutter w-72 shrink-0 border-r border-outline-variant bg-surface">
      <h2 className="text-headline-sm font-bold text-on-surface mb-stack-md px-stack-md">
        {t('sidebar.availableRooms')}
      </h2>
      <RoomList />
    </aside>
  )
}
