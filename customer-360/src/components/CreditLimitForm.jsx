import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { CURRENCY_OPTIONS, STATUS_OPTIONS, computeAvailable, computeUtilization } from '../utils/creditLimits';
import { formatBalance } from '../utils/format';

const EMPTY_FORM = {
  accountNumber: '',
  currency: 'EUR',
  sanctioned: '',
  utilized: '',
  startDate: '',
  expiryDate: '',
  status: 'NORMAL',
};

export default function CreditLimitForm({ mode, initialRecord, onCancel, onSave }) {
  const [form, setForm] = useState(() =>
    initialRecord
      ? {
          accountNumber: initialRecord.accountNumber,
          currency: initialRecord.currency,
          sanctioned: String(initialRecord.sanctioned ?? ''),
          utilized: String(initialRecord.utilized ?? ''),
          startDate: initialRecord.startDate || '',
          expiryDate: initialRecord.expiryDate || '',
          status: initialRecord.status,
        }
      : EMPTY_FORM
  );
  const [error, setError] = useState('');

  const sanctionedNum = Number(form.sanctioned) || 0;
  const utilizedNum = Number(form.utilized) || 0;
  const available = computeAvailable(sanctionedNum, utilizedNum);
  const utilization = computeUtilization(sanctionedNum, utilizedNum);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.accountNumber.trim()) {
      setError('Account number is required.');
      return;
    }
    if (sanctionedNum <= 0) {
      setError('Sanctioned amount must be greater than 0.');
      return;
    }
    if (utilizedNum > sanctionedNum) {
      setError('Utilized amount cannot be greater than sanctioned amount.');
      return;
    }
    setError('');
    onSave({
      accountNumber: form.accountNumber.trim(),
      currency: form.currency,
      sanctioned: sanctionedNum,
      utilized: utilizedNum,
      startDate: form.startDate.trim(),
      expiryDate: form.expiryDate.trim(),
      status: form.status,
    });
  }

  return (
    <motion.div
      className="clModal"
      role="dialog"
      aria-modal="true"
      aria-label={mode === 'add' ? 'Add credit limit' : 'Edit credit limit'}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onClick={(e) => e.stopPropagation()}
    >
      <button type="button" className="docModalClose" onClick={onCancel} aria-label="Close">
        <X aria-hidden="true" />
      </button>
      <h3 className="clModalTitle">{mode === 'add' ? 'Add Credit Limit' : 'Edit Credit Limit'}</h3>

      <form className="clForm" onSubmit={handleSubmit}>
        <div className="clFormGrid">
          <label className="clFormField">
            <span>Account Number</span>
            <input
              className="clInput"
              value={form.accountNumber}
              onChange={(e) => update('accountNumber', e.target.value)}
              placeholder="e.g. 200CASA0181183"
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
            <span>Sanctioned Amount</span>
            <input
              className="clInput"
              type="number"
              min="0"
              step="0.01"
              value={form.sanctioned}
              onChange={(e) => update('sanctioned', e.target.value)}
              placeholder="0.00"
            />
          </label>
          <label className="clFormField">
            <span>Utilized Amount</span>
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
            <span>Start Date</span>
            <input
              className="clInput"
              type="text"
              value={form.startDate}
              onChange={(e) => update('startDate', e.target.value)}
              placeholder="DD/MM/YYYY"
            />
          </label>
          <label className="clFormField">
            <span>Expiry Date</span>
            <input
              className="clInput"
              type="text"
              value={form.expiryDate}
              onChange={(e) => update('expiryDate', e.target.value)}
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

        <div className="clFormCalc">
          <div className="clFormCalcItem">
            <span>Available</span>
            <strong>{formatBalance(available, form.currency)}</strong>
          </div>
          <div className="clFormCalcItem">
            <span>Utilization</span>
            <strong>{utilization.toFixed(1)}%</strong>
          </div>
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
