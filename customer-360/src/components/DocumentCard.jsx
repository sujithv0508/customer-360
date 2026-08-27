import { motion } from 'framer-motion';
import { Check, Clock, X, FileText } from 'lucide-react';

export const STATUS_META = {
  Verified: { icon: Check, className: 'docCardStatus-verified' },
  Pending: { icon: Clock, className: 'docCardStatus-pending' },
  Rejected: { icon: X, className: 'docCardStatus-rejected' },
};

export function isExpired(expiryDate) {
  if (!expiryDate) return false;
  const [day, month, year] = expiryDate.split('/').map(Number);
  return new Date(year, month - 1, day) < new Date();
}

const CARD_TONE_BY_TYPE = {
  ID: 'docCard-blue',
  'Address Proof': 'docCard-green',
  'Income Proof': 'docCard-lavender',
  'Bank Statement': 'docCard-amber',
};

export default function DocumentCard({ doc, onOpen }) {
  const meta = STATUS_META[doc.status] || STATUS_META.Verified;
  const StatusIcon = meta.icon;
  const isPdf = doc.fileType === 'pdf';
  const expired = isExpired(doc.expiryDate);
  const toneClass = CARD_TONE_BY_TYPE[doc.type] || 'docCard-neutral';

  return (
    <motion.div
      className={`docCard ${toneClass}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <button
        type="button"
        className="docThumbBtn"
        onClick={() => onOpen(doc)}
        aria-label={`Open ${doc.type} document preview`}
      >
        {isPdf ? (
          <span className="docThumbPdf">
            <FileText aria-hidden="true" />
          </span>
        ) : (
          <img className="docThumbImg" src={doc.fileUrl} alt="" />
        )}
        {isPdf && <span className="docPdfBadge">PDF</span>}
        <span className="docThumbHint">Click to preview</span>
      </button>

      <div className="docCardBody">
        <div className="docCardTopRow">
          {expired ? (
            <span className="docCardExpiryPill docCardExpiryPill-expired">Expired</span>
          ) : (
            !doc.expiryDate && <span className="docCardExpiry">NO EXPIRY</span>
          )}
        </div>

        <div className="docCardRow">
          <span className="docCardLabel">Document Type</span>
          <span className="docCardValue">{doc.type}</span>
        </div>
        <div className="docCardRow">
          <span className="docCardLabel">{doc.numberLabel}</span>
          <span className="docCardValue">{doc.number}</span>
        </div>

        <div className="docCardDateBox">
          <div className="docCardDateCol">
            <span className="docCardLabel">Issue Date</span>
            <span className="docCardDateValue">{doc.issueDate}</span>
          </div>
          <div className="docCardDateCol">
            <span className="docCardLabel">Expiry Date</span>
            <span className={`docCardDateValue${expired ? ' docCardDateValue-expired' : ''}`}>
              {doc.expiryDate || 'No Expiry'}
            </span>
          </div>
        </div>

        <span className={`docCardStatus ${meta.className}`}>
          <StatusIcon aria-hidden="true" />
          {doc.status}
        </span>
      </div>
    </motion.div>
  );
}
