import { motion } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { STATUS_META, isExpired } from './DocumentCard';

export default function DocumentViewerModal({ doc, onClose }) {
  const meta = STATUS_META[doc.status] || STATUS_META.Verified;
  const StatusIcon = meta.icon;
  const isPdf = doc.fileType === 'pdf';
  const expired = isExpired(doc.expiryDate);

  return (
    <motion.div
      className="docViewerPanel"
      role="dialog"
      aria-modal="true"
      aria-label={`${doc.type} document preview`}
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="docViewerHeader">
        <span className="docViewerTitle">
          <FileTypeIcon isPdf={isPdf} />
          {doc.type}
        </span>
        <div className="docViewerHeaderActions">
          {isPdf && (
            <a
              className="docViewerOpenTab"
              href={doc.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink aria-hidden="true" />
              Open PDF
            </a>
          )}
          <button type="button" className="docViewerClose" onClick={onClose} aria-label="Close preview">
            <X aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="docViewerBody">
        {isPdf ? (
          <iframe className="docViewerFrame" src={doc.fileUrl} title={`${doc.type} PDF preview`} />
        ) : (
          <img className="docViewerImage" src={doc.fileUrl} alt={`${doc.type} document preview`} />
        )}
      </div>

      <div className="docViewerFooter">
        <div className="docViewerFooterItem">
          <span className="docViewerFooterLabel">Document Type</span>
          <span className="docViewerFooterValue">{doc.type}</span>
        </div>
        <div className="docViewerFooterItem">
          <span className="docViewerFooterLabel">Issue Date</span>
          <span className="docViewerFooterValue">{doc.issueDate}</span>
        </div>
        <div className="docViewerFooterItem">
          <span className="docViewerFooterLabel">Expiry Date</span>
          <span className={`docViewerFooterValue${expired ? ' docViewerExpired' : ''}`}>
            {doc.expiryDate || 'No Expiry'}
          </span>
        </div>
        <div className="docViewerFooterItem">
          <span className="docViewerFooterLabel">Status</span>
          <span className={`docViewerFooterValue docViewerStatus ${meta.className}`}>
            <StatusIcon aria-hidden="true" />
            {doc.status}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function FileTypeIcon({ isPdf }) {
  return isPdf ? <span className="docViewerTypeTag">PDF</span> : null;
}
