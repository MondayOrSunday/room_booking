import { RoomProvider } from 'context/RoomContext'
import { AppHeader } from 'components/AppHeader'
import { Sidebar } from 'components/Sidebar'
import { MainContent } from 'components/MainContent'

export default function App() {
  const layout = (
    <div className="flex max-w-[1440px] mx-auto min-h-[calc(100vh-64px)]">
      <Sidebar />
      <main className="flex-grow p-gutter md:px-margin-desktop bg-surface-container-lowest overflow-y-auto">
        <MainContent />
      </main>
    </div>
  )

  return (
    <RoomProvider>
      <div className="bg-background text-on-background min-h-screen font-sans">
        <AppHeader />
        {layout}
      </div>
    </RoomProvider>
  )
}
