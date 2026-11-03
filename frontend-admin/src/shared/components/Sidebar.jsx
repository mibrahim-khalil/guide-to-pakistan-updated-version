import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  MapPin,
  Route,
  CalendarCheck,
  BookOpen,
  Home,
  Info,
  Users,
  Settings,
  Sparkles,
  Image,
  BarChart3,
  MessageSquare,
  Ticket,
  ShoppingBag,
  PackageCheck,
  ShieldAlert,
  TrafficCone,
} from 'lucide-react'

const nav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/destinations', label: 'Destinations', icon: MapPin },

  // NEW TISS management
  { to: '/advisories', label: 'Advisories', icon: ShieldAlert },
  { to: '/route-conditions', label: 'Route Conditions', icon: TrafficCone },

  { to: '/tours', label: 'Tours', icon: Route },
  { to: '/bookings', label: 'Tour Bookings', icon: CalendarCheck },
  { to: '/stories', label: 'Stories', icon: BookOpen },
  { to: '/shop', label: 'Shop Products', icon: ShoppingBag },
  { to: '/orders', label: 'Product Orders', icon: PackageCheck },
  { to: '/home-content', label: 'Home Content', icon: Home },
  { to: '/about-content', label: 'About Content', icon: Info },
  { to: '/history-content', label: 'History Content', icon: BookOpen },
  { to: '/users', label: 'Users', icon: Users },
  { to: '/media', label: 'Media Library', icon: Image },
  { to: '/tiss-ai', label: 'TISS AI', icon: Sparkles },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/coupons', label: 'Coupons', icon: Ticket },
  { to: '/inquiries', label: 'Inquiries', icon: MessageSquare },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="px-4 py-5 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-emerald-500 text-slate-900 font-bold flex items-center justify-center">
            G
          </div>
          <div>
            <div className="font-semibold text-white leading-tight">GTP Admin</div>
            <div className="text-xs text-slate-400">Guide to Pakistan</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {nav.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}
            >
              <Icon size={18} />
              <span className="text-sm">{item.label}</span>
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}