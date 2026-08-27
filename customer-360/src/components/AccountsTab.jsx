import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Eye } from 'lucide-react';
import { formatBalance } from '../utils/format';
import { buttonTap } from '../utils/animations';

const FILTERS = [
  { key: 'all', label: 'All Accounts' },
  { key: 'current', label: 'Current' },
  { key: 'savings', label: 'Savings' },
  { key: 'other', label: 'Other' },
];

function classify(type) {
  const t = (type || '').toUpperCase();
  if (t === 'CURRENT') return 'current';
  if (t === 'SAVINGS') return 'savings';
  return 'other';
}

function balanceTone(amount) {
  if (amount > 0) return 'acctBalancePositive';
  if (amount < 0) return 'acctBalanceNegative';
  return 'acctBalanceZero';
}

export default function AccountsTab({ customer }) {
  const [filter, setFilter] = useState('all');

  const counts = customer.accounts.reduce(
    (acc, a) => {
      acc.all += 1;
      acc[classify(a.type)] += 1;
      return acc;
    },
    { all: 0, current: 0, savings: 0, other: 0 }
  );

  const visibleAccounts =
    filter === 'all' ? customer.accounts : customer.accounts.filter((a) => classify(a.type) === filter);

  return (
    <div className="tabContent">
      <div className="acctFilterRow">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            className={`acctFilterBtn${filter === f.key ? ' acctFilterBtnActive' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
            <span className="acctFilterCount">{counts[f.key]}</span>
          </button>
        ))}
      </div>

      <div className="acctCard">
        <div className="acctTableWrap">
          <table className="acctTable">
            <thead>
              <tr>
                <th>Account Number</th>
                <th>Description</th>
                <th>Currency</th>
                <th>Balance</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {visibleAccounts.map((acc) => (
                <tr key={acc.accountNumber}>
                  <td>
                    <span className="acctNumberCell">
                      <span className="acctNumberIcon"><CreditCard aria-hidden="true" /></span>
                      <span className="acctNumberBadge">{acc.accountNumber}</span>
                    </span>
                  </td>
                  <td className="acctDescription">{acc.description}</td>
                  <td><span className="acctCurrencyBadge">{acc.currency}</span></td>
                  <td>
                    <span className={`acctBalance ${balanceTone(acc.balance)}`}>
                      {formatBalance(acc.balance, acc.currency)}
                    </span>
                  </td>
                  <td>
                    <span className={`acctStatusPill acctStatus-${acc.status.toLowerCase()}`}>
                      <span className="acctStatusDot" />
                      {acc.status}
                    </span>
                  </td>
                  <td>
                    <motion.button type="button" className="acctViewBtn" {...buttonTap}>
                      <Eye aria-hidden="true" />
                      View Details
                    </motion.button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
