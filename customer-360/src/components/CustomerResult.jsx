import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import StatusBadge, { statusTone } from './StatusBadge';

export default function CustomerResult({ customer, onSelect, index = 0 }) {
  return (
    <motion.button
      type="button"
      className="resultCard"
      onClick={() => onSelect(customer)}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: index * 0.04, ease: 'easeOut' }}
    >
      <span className="resultAvatar" aria-hidden="true">{customer.initials}</span>
      <span className="resultInfo">
        <span className="resultName">{customer.name}</span>
        <span className="resultMeta">{customer.customerNumber}</span>
      </span>
      <span className="resultBadges">
        <span className="resultBadgeRow">
          <StatusBadge label={customer.status} tone={statusTone(customer.status)} showIcon={false} />
        </span>
        <span className="resultBadgeRow">
          <StatusBadge
            label={`KYC ${customer.kyc}`}
            tone={customer.kyc === 'VERIFIED' ? 'success' : 'warning'}
            showIcon={false}
          />
        </span>
      </span>
      <ChevronRight className="resultChevron" aria-hidden="true" />
    </motion.button>
  );
}
