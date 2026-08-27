import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BadgeIndianRupee } from 'lucide-react';
import EmptyCreditLimitsState from './EmptyCreditLimitsState';
import CreditLimitTable from './CreditLimitTable';
import CreditLimitForm from './CreditLimitForm';
import CreditLimitDetails from './CreditLimitDetails';
import { computeAvailable } from '../utils/creditLimits';
import { formatBalance } from '../utils/format';

export default function LimitsTab({ customer, onCreditLimitsChange }) {
  const records = customer.creditLimits || [];
  const [formOpen, setFormOpen] = useState(false);
  const [viewRecord, setViewRecord] = useState(null);

  const hasModalOpen = Boolean(formOpen || viewRecord);

  useEffect(() => {
    if (!hasModalOpen) return undefined;
    function handleKeyDown(e) {
      if (e.key !== 'Escape') return;
      setFormOpen(false);
      setViewRecord(null);
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasModalOpen]);

  const totalSanctioned = records.reduce((sum, r) => sum + (Number(r.sanctioned) || 0), 0);
  const totalUtilized = records.reduce((sum, r) => sum + (Number(r.utilized) || 0), 0);
  const totalAvailable = records.reduce((sum, r) => sum + computeAvailable(r.sanctioned, r.utilized), 0);

  function handleSave(data) {
    const newRecord = { id: `cl-${Date.now()}-${Math.round(Math.random() * 1e6)}`, ...data };
    onCreditLimitsChange((prev) => [...prev, newRecord]);
    setFormOpen(false);
  }

  return (
    <div className="tabContent">
      <div className="sectionCard loanHeaderRow">
        <div className="loanHeaderLeft">
          <span className="sectionIcon"><BadgeIndianRupee aria-hidden="true" /></span>
          <div className="loanHeaderTitleGroup">
            <h2 className="sectionTitle">Credit Limits ({records.length})</h2>
            <p className="sectionSubtitle">{records.length > 0 ? 'Active' : 'No active credit limit'}</p>
          </div>
        </div>

        <span className="loanHeaderSpacer" aria-hidden="true" />

        {records.length > 0 && (
          <>
            <span className="loanHeaderDivider" aria-hidden="true" />
            <div className="loanSummaryItem">
              <span className="loanSummaryLabel">Total Credit Limits</span>
              <span className="loanSummaryValue">{records.length}</span>
            </div>

            <span className="loanHeaderDivider" aria-hidden="true" />
            <div className="loanSummaryItem">
              <span className="loanSummaryLabel">Total Sanctioned</span>
              <span className="loanSummaryValue">{formatBalance(totalSanctioned, 'EUR')}</span>
            </div>

            <span className="loanHeaderDivider" aria-hidden="true" />
            <div className="loanSummaryItem">
              <span className="loanSummaryLabel">Total Utilized</span>
              <span className="loanSummaryValue">{formatBalance(totalUtilized, 'EUR')}</span>
            </div>

            <span className="loanHeaderDivider" aria-hidden="true" />
            <div className="loanSummaryItem">
              <span className="loanSummaryLabel">Total Available</span>
              <span className="loanSummaryValue">{formatBalance(totalAvailable, 'EUR')}</span>
            </div>
          </>
        )}
      </div>

      {records.length === 0 ? (
        <EmptyCreditLimitsState onAdd={() => setFormOpen(true)} />
      ) : (
        <CreditLimitTable records={records} onView={setViewRecord} />
      )}

      <AnimatePresence>
        {formOpen && (
          <motion.div
            className="docModalBackdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setFormOpen(false)}
          >
            <CreditLimitForm mode="add" onCancel={() => setFormOpen(false)} onSave={handleSave} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {viewRecord && (
          <motion.div
            className="docModalBackdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setViewRecord(null)}
          >
            <CreditLimitDetails record={viewRecord} onClose={() => setViewRecord(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
