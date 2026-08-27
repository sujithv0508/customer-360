import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText } from 'lucide-react';
import EmptyPanel from './EmptyPanel';
import DocumentCard from './DocumentCard';
import DocumentViewerModal from './DocumentViewerModal';

export default function DocumentsTab({ customer }) {
  const [activeDoc, setActiveDoc] = useState(null);

  useEffect(() => {
    if (!activeDoc) return undefined;

    function handleKeyDown(e) {
      if (e.key === 'Escape') setActiveDoc(null);
    }
    window.addEventListener('keydown', handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeDoc]);

  return (
    <div className="tabContent">
      <div className="sectionCard">
        <div className="sectionHeader">
          <span className="sectionIcon"><FileText aria-hidden="true" /></span>
          <div>
            <h2 className="sectionTitle">Documents ({customer.documents.length})</h2>
            <p className="sectionSubtitle">{customer.documents.length} documents on file</p>
          </div>
        </div>

        {customer.documents.length === 0 ? (
          <EmptyPanel icon={FileText} title="No documents" text="No documents have been uploaded for this customer." />
        ) : (
          <div className="docGrid">
            {customer.documents.map((doc) => (
              <DocumentCard key={doc.id} doc={doc} onOpen={setActiveDoc} />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {activeDoc && (
          <motion.div
            className="docModalBackdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setActiveDoc(null)}
          >
            <DocumentViewerModal doc={activeDoc} onClose={() => setActiveDoc(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
