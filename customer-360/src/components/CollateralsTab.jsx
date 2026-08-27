import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ShieldCheck, Plus, ChevronRight } from 'lucide-react';
import EmptyPanel from './EmptyPanel';
import CollateralForm from './CollateralForm';
import CollateralDetails from './CollateralDetails';
import { formatBalance } from '../utils/format';
import { buttonTap } from '../utils/animations';

function collateralStatusClass(status) {
  const s = String(status || '').toUpperCase();
  if (s === 'ACTIVE') return 'acctStatus-active';
  if (s === 'PENDING') return 'acctStatus-dormant';
  return 'acctStatus-released';
}

export default function CollateralsTab({ customer, onCollateralsChange }) {
  const collaterals = customer.collaterals || [];
  const count = collaterals.length;
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

  const subtitle =
    count === 0 ? 'No collaterals on record' : `${count} collateral${count === 1 ? '' : 's'} on record`;

  function handleSave(data) {
    onCollateralsChange((prev) => [...prev, { id: `col-${Date.now()}`, ...data }]);
    setFormOpen(false);
  }

  return (
    <div className="tabContent">
      <div className="sectionCard">
        <div className="collSectionHeader">
          <div className="clHeaderIconTitle">
            <span className="sectionIcon"><ShieldCheck aria-hidden="true" /></span>
            <div>
              <h2 className="sectionTitle">Collaterals</h2>
              <p className="sectionSubtitle">{subtitle}</p>
            </div>
          </div>
          {count > 0 && (
            <motion.button
              type="button"
              className="btn btnPrimary btnSm"
              onClick={() => setFormOpen(true)}
              {...buttonTap}
            >
              <Plus aria-hidden="true" />
              Add Collateral
            </motion.button>
          )}
        </div>

        {count === 0 ? (
          <EmptyPanel
            icon={ShieldCheck}
            title="No Collaterals"
            text="No collateral information has been added for this customer."
            actionLabel="Add Collateral"
            actionIcon={Plus}
            onAction={() => setFormOpen(true)}
          />
        ) : (
          <div className="acctCard">
            <div className="acctTableWrap">
              <table className="acctTable collTable">
                <thead>
                  <tr>
                    <th>Collateral ID</th>
                    <th>Type</th>
                    <th>Currency</th>
                    <th>Lendable Value</th>
                    <th>Utilized</th>
                    <th>Market Value</th>
                    <th>Created</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {collaterals.map((c) => (
                    <tr key={c.id}>
                      <td className="collIdCell">{c.collateralId}</td>
                      <td><span className="collTypeBadge">{c.collateralType}</span></td>
                      <td><span className="acctCurrencyBadge">{c.currency}</span></td>
                      <td className="collStrong">{formatBalance(c.lendableValue, c.currency)}</td>
                      <td className="cellMuted">{formatBalance(c.utilized, c.currency)}</td>
                      <td className="collStrong">{formatBalance(c.marketValue, c.currency)}</td>
                      <td className="cellMuted">{c.createdDate || '-'}</td>
                      <td>
                        <span className={`acctStatusPill ${collateralStatusClass(c.status)}`}>
                          <span className="acctStatusDot" />
                          {c.status}
                        </span>
                      </td>
                      <td>
                        <button type="button" className="collViewLink" onClick={() => setViewRecord(c)}>
                          View
                          <ChevronRight aria-hidden="true" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

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
            <CollateralForm mode="add" onCancel={() => setFormOpen(false)} onSave={handleSave} />
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
            <CollateralDetails record={viewRecord} onClose={() => setViewRecord(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
