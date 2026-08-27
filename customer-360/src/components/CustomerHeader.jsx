import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, IdCard, Calendar, Building2, Tag, PenLine, FileText } from 'lucide-react';
import StatusBadge, { statusTone } from './StatusBadge';
import SignatureModal from './SignatureModal';
import {
  headerVariants,
  avatarVariants,
  headerStaggerContainer,
  headerItemVariants,
  buttonTap,
} from '../utils/animations';

export default function CustomerHeader({ customer, onViewDetails }) {
  const [signatureOpen, setSignatureOpen] = useState(false);

  const contactItems = [
    { icon: Building2, label: 'Branch', value: customer.branch },
    { icon: IdCard, label: 'Tax', value: customer.taxNumber },
    { icon: Tag, label: 'Customer Category', value: customer.customerType },
    { icon: Calendar, label: 'Customer Since', value: customer.customerSince },
    { icon: Phone, label: 'Phone', value: customer.phone },
    { icon: Mail, label: 'Email', value: customer.email },
  ];

  useEffect(() => {
    if (!signatureOpen) return undefined;

    function handleKeyDown(e) {
      if (e.key === 'Escape') setSignatureOpen(false);
    }
    window.addEventListener('keydown', handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [signatureOpen]);

  return (
    <>
    <motion.div
      className="customerHeader"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={headerStaggerContainer}
        initial="hidden"
        animate="visible"
        style={{ display: 'contents' }}
      >
        <div className="customerHeaderTop">
          <div className="customerIdentity">
            <motion.span
              className="avatarLg"
              aria-hidden="true"
              variants={avatarVariants}
              initial="hidden"
              animate="visible"
            >
              {customer.initials}
            </motion.span>
            <div className="customerIdentityText">
              <motion.div className="customerNameRow" variants={headerItemVariants}>
                <span className="customerName">
                  {customer.title} {customer.name}
                </span>
                <span className="customerNumberBox">#{customer.customerNumber}</span>
              </motion.div>
              <motion.div className="badgeRow" variants={headerItemVariants} style={{ marginTop: 4 }}>
                <StatusBadge label={customer.status} tone={statusTone(customer.status)} />
                <StatusBadge
                  label={`KYC ${customer.kyc}`}
                  tone={customer.kyc === 'VERIFIED' ? 'success' : 'warning'}
                />
                <StatusBadge label={`RISK: ${customer.risk}`} tone={statusTone(customer.risk)} showIcon={false} />
                <StatusBadge label={customer.customerCategory} tone="info" showIcon={false} />
              </motion.div>
            </div>
          </div>

          <div className="headerActions">
            <motion.button
              type="button"
              className="btn btnGhost"
              onClick={() => setSignatureOpen(true)}
              {...buttonTap}
            >
              <PenLine aria-hidden="true" />
              Signatures
            </motion.button>
            <motion.button type="button" className="btn btnPrimary" onClick={onViewDetails} {...buttonTap}>
              <FileText aria-hidden="true" />
              View Details
            </motion.button>
          </div>
        </div>

        <motion.div className="contactRow" variants={headerItemVariants}>
          {contactItems.map(({ icon: Icon, label, value }) => (
            <div className="contactItem" key={label}>
              <span className="contactIconWrap"><Icon aria-hidden="true" /></span>
              <span className="contactText">
                <span className="contactLabel">{label}</span>
                <span className="contactValue">{value}</span>
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>

    <AnimatePresence>
      {signatureOpen && (
        <motion.div
          className="docModalBackdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={() => setSignatureOpen(false)}
        >
          <SignatureModal onClose={() => setSignatureOpen(false)} />
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
