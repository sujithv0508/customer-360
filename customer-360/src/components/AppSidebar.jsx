import { Landmark, Users, CreditCard, Building2, ClipboardCheck } from 'lucide-react';

const NAV_ITEMS = [
  { key: 'customer360', label: 'Customer 360', icon: Users, active: true },
  { key: 'accounts', label: 'Accounts', icon: CreditCard },
  { key: 'branch', label: 'Branch', icon: Building2 },
  { key: 'tasks', label: 'Tasks', icon: ClipboardCheck },
];

export default function AppSidebar() {
  return (
    <aside className="sidebar" aria-label="Primary">
      <span className="sidebarBrand" aria-hidden="true">
        <Landmark />
      </span>
      <nav className="sidebarNav">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              type="button"
              className={`sidebarIconBtn${item.active ? ' sidebarIconActive' : ''}`}
              aria-current={item.active ? 'page' : undefined}
              title={item.label}
            >
              <Icon aria-hidden="true" />
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
