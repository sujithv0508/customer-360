import { LockKeyhole, Plus } from 'lucide-react';
import StatusBadge, { statusTone } from './StatusBadge';
import EmptyPanel from './EmptyPanel';

export default function LockersTab({ customer }) {
  return (
    <div className="tabContent">
      <div className="sectionCard">
        <div className="sectionHeader">
          <span className="sectionIcon"><LockKeyhole aria-hidden="true" /></span>
          <div>
            <h2 className="sectionTitle">Safe Lockers</h2>
            <p className="sectionSubtitle">{customer.lockers.length} lockers assigned</p>
          </div>
        </div>

        {customer.lockers.length === 0 ? (
          <EmptyPanel
            icon={LockKeyhole}
            title="No active lockers"
            text="Customer does not have any safe deposit lockers assigned."
            actionLabel="Assign Locker"
            actionIcon={Plus}
          />
        ) : (
          <div className="tableWrap">
            <table className="dataTable">
              <thead>
                <tr>
                  <th>Locker ID</th>
                  <th>Size</th>
                  <th>Branch</th>
                  <th>Assigned Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {customer.lockers.map((l) => (
                  <tr key={l.id}>
                    <td className="cellMono">{l.id}</td>
                    <td>{l.size}</td>
                    <td className="cellMuted">{l.branch}</td>
                    <td className="cellMuted">{l.assignedDate}</td>
                    <td><StatusBadge label={l.status} tone={statusTone(l.status)} /></td>
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
