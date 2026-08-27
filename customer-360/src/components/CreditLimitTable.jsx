import { CreditCard, Eye } from 'lucide-react';
import CircularProgress from './CircularProgress';
import { computeAvailable, computeUtilization, creditLimitStatusClass } from '../utils/creditLimits';
import { formatBalance } from '../utils/format';

export default function CreditLimitTable({ records, onView }) {
  return (
    <div className="acctCard">
      <div className="acctTableWrap">
        <table className="acctTable clTable">
          <thead>
            <tr>
              <th>Account Number</th>
              <th>Currency</th>
              <th>Sanctioned</th>
              <th>Utilized</th>
              <th>Available</th>
              <th>Utilization</th>
              <th>Start Date</th>
              <th>Expiry Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => {
              const available = computeAvailable(record.sanctioned, record.utilized);
              const utilization = computeUtilization(record.sanctioned, record.utilized);
              return (
                <tr key={record.id}>
                  <td>
                    <span className="acctNumberCell">
                      <span className="acctNumberIcon"><CreditCard aria-hidden="true" /></span>
                      <span className="acctNumberBadge">{record.accountNumber}</span>
                    </span>
                  </td>
                  <td><span className="acctCurrencyBadge">{record.currency}</span></td>
                  <td>{formatBalance(record.sanctioned, record.currency)}</td>
                  <td>{formatBalance(record.utilized, record.currency)}</td>
                  <td>{formatBalance(available, record.currency)}</td>
                  <td className="loanProgressCell">
                    <CircularProgress value={Math.round(utilization * 10) / 10} />
                  </td>
                  <td className="cellMuted">{record.startDate || '-'}</td>
                  <td className="cellMuted">{record.expiryDate || '-'}</td>
                  <td>
                    <span className={`acctStatusPill ${creditLimitStatusClass(record.status)}`}>
                      <span className="acctStatusDot" />
                      {record.status}
                    </span>
                  </td>
                  <td>
                    <button type="button" className="acctViewBtn" onClick={() => onView(record)}>
                      <Eye aria-hidden="true" />
                      View Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
