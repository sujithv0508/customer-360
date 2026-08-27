import { CircleCheck, Clock, CircleAlert, CircleDot } from 'lucide-react';

const TONE_CLASS = {
  success: 'badge badgeSuccess',
  warning: 'badge badgeWarning',
  danger: 'badge badgeDanger',
  neutral: 'badge badgeNeutral',
  info: 'badge badgeInfo',
};

const TONE_ICON = {
  success: CircleCheck,
  warning: Clock,
  danger: CircleAlert,
  neutral: CircleDot,
  info: CircleDot,
};

export default function StatusBadge({ label, tone = 'neutral', showIcon = true }) {
  const Icon = TONE_ICON[tone] || CircleDot;
  return (
    <span className={TONE_CLASS[tone] || TONE_CLASS.neutral}>
      {showIcon && <Icon aria-hidden="true" />}
      {label}
    </span>
  );
}

export function statusTone(status) {
  const s = String(status || '').toUpperCase();
  if (['ACTIVE', 'VERIFIED', 'LOW'].includes(s)) return 'success';
  if (['PENDING', 'MEDIUM', 'WARNING'].includes(s)) return 'warning';
  if (['REJECTED', 'DANGER', 'HIGH', 'DORMANT'].includes(s)) return 'danger';
  return 'neutral';
}
