import { motion } from 'framer-motion';
import {
  UserRound,
  WalletCards,
  PiggyBank,
  Banknote,
  LockKeyhole,
  BadgeIndianRupee,
  ShieldCheck,
  AlertTriangle,
  Clock,
  FileText,
} from 'lucide-react';

export function buildTabs(customer) {
  return [
    { key: 'info', label: 'Customer Info', icon: UserRound },
    { key: 'accounts', label: 'Accounts', icon: WalletCards, count: customer.accounts.length },
    { key: 'deposits', label: 'Deposits', icon: PiggyBank, count: customer.deposits.length },
    { key: 'loans', label: 'Loans', icon: Banknote, count: customer.loanPortfolio.totalCount },
    { key: 'lockers', label: 'Lockers', icon: LockKeyhole, count: customer.lockers.length },
    { key: 'limits', label: 'Limits', icon: BadgeIndianRupee, count: (customer.creditLimits || []).length },
    { key: 'collaterals', label: 'Collaterals', icon: ShieldCheck, count: customer.collaterals.length },
    { key: 'alerts', label: 'Alerts & Memos', icon: AlertTriangle },
    { key: 'events', label: 'Events', icon: Clock },
    { key: 'documents', label: 'Documents', icon: FileText, count: customer.documents.length },
  ];
}

export default function CustomerTabs({ tabs, activeTab, onChange }) {
  return (
    <div className="tabCard">
      <div className="tabList" role="tablist" aria-label="Customer 360 sections">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.key === activeTab;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`tabButton${isActive ? ' tabActive' : ''}`}
              onClick={() => onChange(tab.key)}
            >
              {isActive && (
                <motion.span
                  className="tabActiveBg"
                  layoutId="tabActiveBg"
                  transition={{ type: 'spring', stiffness: 500, damping: 34 }}
                />
              )}
              <span className="tabButtonContent">
                <Icon aria-hidden="true" />
                {tab.label}
                {typeof tab.count === 'number' && <span className="tabCount">{tab.count}</span>}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
