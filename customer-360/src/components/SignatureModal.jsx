import { motion } from 'framer-motion';
import { X, ShieldCheck } from 'lucide-react';

export default function SignatureModal({ onClose }) {
  return (
    <motion.div
      className="clModal sigModal"
      role="dialog"
      aria-modal="true"
      aria-label="Signature preview"
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onClick={(e) => e.stopPropagation()}
    >
      <button type="button" className="docModalClose" onClick={onClose} aria-label="Close">
        <X aria-hidden="true" />
      </button>

      <h3 className="clModalTitle">Signature</h3>

      <div className="sigImageFrame">
        <img className="sigImage" src="/documents/dummy-signature.svg" alt="Customer signature specimen" />
      </div>

      <div className="sigMeta">
        <span className="sigMetaTitle">Signature Specimen</span>
        <span className="sigMetaStatus">
          <ShieldCheck aria-hidden="true" />
          Status: Verified
        </span>
      </div>
    </motion.div>
  );
}
