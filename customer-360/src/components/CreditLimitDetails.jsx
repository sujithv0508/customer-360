import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { computeAvailable, computeUtilization, creditLimitStatusClass } from '../utils/creditLimits';
import { formatBalance } from '../utils/format';

export default function CreditLimitDetails({ record, onClose }) {
  const available = computeAvailable(record.sanctioned, record.utilized);
  const utilization = computeUtilization(record.sanctioned, record.utilized);

  return (
    <motion.div
      className="clModal"
      role="dialog"
      aria-modal="true"
      aria-label="Credit limit details"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onClick={(e) => e.stopPropagation()}
    >
      <button type="button" className="docModalClose" onClick={onClose} aria-label="Close">
        <X aria-hidden="true" />
      </button>
      <h3 className="clModalTitle">Credit Limit Details</h3>
      <div className="docModalInfo">
        <div className="docModalField">
          <span>Account Number</span>
          <strong>{record.accountNumber}</strong>
        </div>
        <div className="docModalField">
          <span>Currency</span>
          <strong>{record.currency}</strong>
        </div>
        <div className="docModalField">
          <span>Sanctioned Amount</span>
          <strong>{formatBalance(record.sanctioned, record.currency)}</strong>
        </div>
        <div className="docModalField">
          <span>Utilized Amount</span>
          <strong>{formatBalance(record.utilized, record.currency)}</strong>
        </div>
        <div className="docModalField">
          <span>Available Amount</span>
          <strong>{formatBalance(available, record.currency)}</strong>
        </div>
        <div className="docModalField">
          <span>Utilization</span>
          <strong>{utilization.toFixed(1)}%</strong>
        </div>
        <div className="docModalField">
          <span>Start Date</span>
          <strong>{record.startDate || '-'}</strong>
        </div>
        <div className="docModalField">
          <span>Expiry Date</span>
          <strong>{record.expiryDate || '-'}</strong>
        </div>
        <div className="docModalField">
          <span>Status</span>
          <strong className={`acctStatusPill ${creditLimitStatusClass(record.status)}`}>
            <span className="acctStatusDot" />
            {record.status}
          </strong>
        </div>
      </div>
    </motion.div>
  );
}
