import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { formatBalance } from '../utils/format';

function collateralStatusClass(status) {
  const s = String(status || '').toUpperCase();
  if (s === 'ACTIVE') return 'acctStatus-active';
  if (s === 'PENDING') return 'acctStatus-dormant';
  return 'acctStatus-released';
}

export default function CollateralDetails({ record, onClose }) {
  return (
    <motion.div
      className="clModal"
      role="dialog"
      aria-modal="true"
      aria-label="Collateral details"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onClick={(e) => e.stopPropagation()}
    >
      <button type="button" className="docModalClose" onClick={onClose} aria-label="Close">
        <X aria-hidden="true" />
      </button>
      <h3 className="clModalTitle">Collateral Details</h3>
      <div className="docModalInfo">
        <div className="docModalField">
          <span>Collateral ID</span>
          <strong>{record.collateralId}</strong>
        </div>
        <div className="docModalField">
          <span>Collateral Type</span>
          <strong>{record.collateralType}</strong>
        </div>
        <div className="docModalField">
          <span>Currency</span>
          <strong>{record.currency}</strong>
        </div>
        <div className="docModalField">
          <span>Lendable Value</span>
          <strong>{formatBalance(record.lendableValue, record.currency)}</strong>
        </div>
        <div className="docModalField">
          <span>Utilized</span>
          <strong>{formatBalance(record.utilized, record.currency)}</strong>
        </div>
        <div className="docModalField">
          <span>Market Value</span>
          <strong>{formatBalance(record.marketValue, record.currency)}</strong>
        </div>
        <div className="docModalField">
          <span>Created</span>
          <strong>{record.createdDate || '-'}</strong>
        </div>
        <div className="docModalField">
          <span>Status</span>
          <strong className={`acctStatusPill ${collateralStatusClass(record.status)}`}>
            <span className="acctStatusDot" />
            {record.status}
          </strong>
        </div>
      </div>
    </motion.div>
  );
}
