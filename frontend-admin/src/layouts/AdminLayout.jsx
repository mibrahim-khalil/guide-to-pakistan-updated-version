import { Outlet } from 'react-router-dom'
import Sidebar from '../shared/components/Sidebar'
import TopBar from '../shared/components/TopBar'
import { useUiStore } from '../store/uiStore'

export default function AdminLayout() {
  const sidebarOpen = useUiStore((s) => s.sidebarOpen)

  return (
    <div className="admin-shell">
      {sidebarOpen ? <Sidebar /> : null}
      <div className="admin-main">
        <TopBar />
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
