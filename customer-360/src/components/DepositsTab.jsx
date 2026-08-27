import { PiggyBank, Plus } from 'lucide-react';
import StatusBadge, { statusTone } from './StatusBadge';
import EmptyPanel from './EmptyPanel';
import { formatCurrency } from '../utils/format';

export default function DepositsTab({ customer }) {
  return (
    <div className="tabContent">
      <div className="sectionCard">
        <div className="sectionHeader">
          <span className="sectionIcon"><PiggyBank aria-hidden="true" /></span>
          <div>
            <h2 className="sectionTitle">Term Deposits</h2>
            <p className="sectionSubtitle">{customer.deposits.length} term deposits on record</p>
          </div>
        </div>

        {customer.deposits.length === 0 ? (
          <EmptyPanel
            icon={PiggyBank}
            title="No Term Deposits"
            text="Customer currently has no active term deposits."
            actionLabel="Open Term Deposit"
            actionIcon={Plus}
          />
        ) : (
          <div className="tableWrap">
            <table className="dataTable">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Deposit No</th>
                  <th>Principal</th>
                  <th>Currency</th>
                  <th>Rate</th>
                  <th>Maturity Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {customer.deposits.map((d) => (
                  <tr key={d.number}>
                    <td className="cellStrong">{d.type}</td>
                    <td className="cellMono">{d.number}</td>
                    <td>{formatCurrency(d.principal)}</td>
                    <td>{d.currency}</td>
                    <td>{d.rate}%</td>
                    <td className="cellMuted">{d.maturityDate}</td>
                    <td><StatusBadge label={d.status} tone={statusTone(d.status)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
