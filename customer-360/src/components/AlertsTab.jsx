import { AlertTriangle, Calendar, ClipboardCheck, Settings2 } from 'lucide-react';
import EmptyPanel from './EmptyPanel';

export default function AlertsTab({ customer }) {
  return (
    <div className="tabContent">
      <div className="sectionCard">
        <div className="sectionHeader">
          <span className="sectionIcon"><AlertTriangle aria-hidden="true" /></span>
          <div>
            <h2 className="sectionTitle">Active Alerts</h2>
            <p className="sectionSubtitle">{customer.alerts.length} active alerts</p>
          </div>
        </div>

        {customer.alerts.length === 0 ? (
          <EmptyPanel
            icon={AlertTriangle}
            title="No active alerts"
            text="There are no active alerts on this customer profile."
            actionLabel="Configure Alerts"
            actionIcon={Settings2}
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {customer.alerts.map((a, i) => (
              <div key={i} className="alertRow">
                <span
                  className="alertIcon"
                  style={{
                    background: a.severity === 'DANGER' ? 'var(--danger-bg)' : 'var(--warning-bg)',
                    color: a.severity === 'DANGER' ? 'var(--danger)' : 'var(--warning)',
                  }}
                >
                  <AlertTriangle aria-hidden="true" />
                </span>
                <span className="alertBody">
                  <span className="alertTitle">{a.title}</span>
                  <span className="alertDate">{a.date}</span>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="sectionCard">
        <div className="sectionHeader">
          <span className="sectionIcon"><ClipboardCheck aria-hidden="true" /></span>
          <div>
            <h2 className="sectionTitle">Memos</h2>
            <p className="sectionSubtitle">{customer.memos.length} memos on file</p>
          </div>
        </div>

        {customer.memos.length === 0 ? (
          <EmptyPanel icon={ClipboardCheck} title="No memos" text="No memos have been recorded for this customer." />
        ) : (
          <div className="memoList">
            {customer.memos.map((m, i) => (
              <div key={i} className="memoRow">
                <span className="memoText">{m.text}</span>
                <span className="memoDate">
                  <Calendar aria-hidden="true" />
                  {m.date}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
