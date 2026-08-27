import { motion } from 'framer-motion';
import { WalletCards, PiggyBank, Banknote, LockKeyhole, BadgeIndianRupee, AlertTriangle } from 'lucide-react';
import { formatCurrency } from '../utils/format';
import { cardContainerVariants, cardVariants, cardHover } from '../utils/animations';

export default function SummaryCards({ summary }) {
  const cards = [
    {
      key: 'current',
      label: 'Current Accounts',
      icon: WalletCards,
      tone: 'kpi-current',
      count: summary.currentAccounts.count,
      sub: formatCurrency(summary.currentAccounts.amount),
    },
    {
      key: 'deposits',
      label: 'Term Deposits',
      icon: PiggyBank,
      tone: 'kpi-deposits',
      count: summary.termDeposits.count,
      sub: formatCurrency(summary.termDeposits.amount),
    },
    {
      key: 'loans',
      label: 'Loans',
      icon: Banknote,
      tone: 'kpi-loans',
      count: summary.loans.count,
      sub: formatCurrency(summary.loans.amount),
    },
    {
      key: 'lockers',
      label: 'Safe Lockers',
      icon: LockKeyhole,
      tone: 'kpi-lockers',
      count: summary.lockers.count,
      sub: formatCurrency(summary.lockers.amount),
    },
    {
      key: 'limits',
      label: 'Credit Limits',
      icon: BadgeIndianRupee,
      tone: 'kpi-limits',
      count: summary.limits.count,
      sub: formatCurrency(summary.limits.amount),
    },
    {
      key: 'alerts',
      label: 'Active Alerts',
      icon: AlertTriangle,
      tone: 'kpi-alerts',
      alertActive: summary.alerts.count > 0,
      count: summary.alerts.count,
      sub: summary.alerts.count > 0 ? 'Requires attention' : 'No active alerts',
    },
  ];

  return (
    <motion.div className="kpiGrid" variants={cardContainerVariants} initial="hidden" animate="visible">
      {cards.map((card) => {
        const Icon = card.icon;
        const className = `kpiCard ${card.tone}${card.alertActive ? ' kpi-alerts-active' : ''}`;
        return (
          <motion.div key={card.key} className={className} variants={cardVariants} whileHover={cardHover}>
            <span className="kpiIconWrap">
              <Icon aria-hidden="true" />
            </span>
            <span className="kpiBody">
              <span className="kpiTopRow">
                <span className="kpiLabel">{card.label}</span>
                <span className="kpiValue">{card.count}</span>
              </span>
              <span className="kpiSub">{card.sub}</span>
            </span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
