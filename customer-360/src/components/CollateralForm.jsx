import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { CURRENCY_OPTIONS } from '../utils/creditLimits';

const STATUS_OPTIONS = ['ACTIVE', 'RELEASED', 'PENDING'];

const EMPTY_FORM = {
  collateralId: '',
  collateralType: '',
  currency: 'EUR',
  lendableValue: '',
  utilized: '',
  marketValue: '',
  createdDate: '',
  status: 'ACTIVE',
};

export default function CollateralForm({ mode, initialRecord, onCancel, onSave }) {
  const [form, setForm] = useState(() =>
    initialRecord
      ? {
          collateralId: initialRecord.collateralId,
          collateralType: initialRecord.collateralType,
          currency: initialRecord.currency,
          lendableValue: String(initialRecord.lendableValue ?? ''),
          utilized: String(initialRecord.utilized ?? ''),
          marketValue: String(initialRecord.marketValue ?? ''),
          createdDate: initialRecord.createdDate || '',
          status: initialRecord.status,
        }
      : EMPTY_FORM
  );
  const [error, setError] = useState('');

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.collateralId.trim()) {
      setError('Collateral ID is required.');
      return;
    }
    if (!form.collateralType.trim()) {
      setError('Collateral type is required.');
      return;
    }
    const lendableValue = Number(form.lendableValue) || 0;
    const utilized = Number(form.utilized) || 0;
    const marketValue = Number(form.marketValue) || 0;
    if (utilized > lendableValue) {
      setError('Utilized amount cannot be greater than lendable value.');
      return;
    }
    setError('');
    onSave({
      collateralId: form.collateralId.trim(),
      collateralType: form.collateralType.trim(),
      currency: form.currency,
      lendableValue,
      utilized,
      marketValue,
      createdDate: form.createdDate.trim(),
      status: form.status,
    });
  }

  return (
    <motion.div
      className="clModal"
      role="dialog"
      aria-modal="true"
      aria-label={mode === 'add' ? 'Add collateral' : 'Edit collateral'}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onClick={(e) => e.stopPropagation()}
    >
      <button type="button" className="docModalClose" onClick={onCancel} aria-label="Close">
        <X aria-hidden="true" />
      </button>
      <h3 className="clModalTitle">{mode === 'add' ? 'Add Collateral' : 'Edit Collateral'}</h3>

      <form className="clForm" onSubmit={handleSubmit}>
        <div className="clFormGrid">
          <label className="clFormField">
            <span>Collateral ID</span>
            <input
              className="clInput"
              value={form.collateralId}
              onChange={(e) => update('collateralId', e.target.value)}
              placeholder="e.g. COL110000131"
            />
          </label>
          <label className="clFormField">
            <span>Collateral Type</span>
            <input
              className="clInput"
              value={form.collateralType}
              onChange={(e) => update('collateralType', e.target.value)}
              placeholder="e.g. Property"
            />
          </label>
          <label className="clFormField">
            <span>Currency</span>
            <select className="clInput" value={form.currency} onChange={(e) => update('currency', e.target.value)}>
              {CURRENCY_OPTIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
          <label className="clFormField">
            <span>Lendable Value</span>
            <input
              className="clInput"
              type="number"
              min="0"
              step="0.01"
              value={form.lendableValue}
              onChange={(e) => update('lendableValue', e.target.value)}
              placeholder="0.00"
            />
          </label>
          <label className="clFormField">
            <span>Utilized</span>
            <input
              className="clInput"
              type="number"
              min="0"
              step="0.01"
              value={form.utilized}
              onChange={(e) => update('utilized', e.target.value)}
              placeholder="0.00"
            />
          </label>
          <label className="clFormField">
            <span>Market Value</span>
            <input
              className="clInput"
              type="number"
              min="0"
              step="0.01"
              value={form.marketValue}
              onChange={(e) => update('marketValue', e.target.value)}
              placeholder="0.00"
            />
          </label>
          <label className="clFormField">
            <span>Created Date</span>
            <input
              className="clInput"
              type="text"
              value={form.createdDate}
              onChange={(e) => update('createdDate', e.target.value)}
              placeholder="DD/MM/YYYY"
            />
          </label>
          <label className="clFormField">
            <span>Status</span>
            <select className="clInput" value={form.status} onChange={(e) => update('status', e.target.value)}>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
        </div>

        {error && <p className="clFormError">{error}</p>}

        <div className="clFormActions">
          <button type="button" className="btn btnGhost" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btnPrimary">
            Save
          </button>
        </div>
      </form>
    </motion.div>
  );
}
