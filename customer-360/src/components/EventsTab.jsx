import { Clock, Eye, FileText, ShieldCheck, UserRound, Banknote, MapPin, CreditCard, AlertTriangle } from 'lucide-react';
import EmptyPanel from './EmptyPanel';

const ICONS = { Eye, FileText, ShieldCheck, UserRound, Banknote, MapPin, CreditCard, AlertTriangle };

export default function EventsTab({ customer }) {
  return (
    <div className="tabContent">
      <div className="sectionCard">
        <div className="sectionHeader">
          <span className="sectionIcon"><Clock aria-hidden="true" /></span>
          <div>
            <h2 className="sectionTitle">Events</h2>
            <p className="sectionSubtitle">Recent activity on this customer profile</p>
          </div>
        </div>

        {customer.events.length === 0 ? (
          <EmptyPanel icon={Clock} title="No events" text="No activity has been recorded for this customer yet." />
        ) : (
          <div className="timeline">
            {customer.events.map((ev, i) => {
              const Icon = ICONS[ev.icon] || Clock;
              const isLast = i === customer.events.length - 1;
              return (
                <div key={i} className="timelineItem">
                  <div className="timelineRail">
                    <span className="timelineDot"><Icon aria-hidden="true" /></span>
                    {!isLast && <span className="timelineLine" />}
                  </div>
                  <div className="timelineBody">
                    <span className="timelineDate">{ev.date}</span>
                    <span className="timelineTitle">{ev.title}</span>
                    {ev.meta && <span className="timelineMeta">{ev.meta}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
