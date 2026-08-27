import { GraduationCap, ShoppingBag } from 'lucide-react';

function CarShape({ fg }) {
  return (
    <>
      <path
        d="M3 14.6c0-.8.5-1.5 1.3-1.8l1.7-.6 1.4-2.6c.3-.6.9-1 1.6-1h5.9c.7 0 1.3.4 1.6 1l1.4 2.6 1.7.6c.8.3 1.3 1 1.3 1.8V17c0 .6-.4 1-1 1h-1a2 2 0 1 1-4 0H9a2 2 0 1 1-4 0H4c-.6 0-1-.4-1-1v-2.4Z"
        fill={fg}
      />
      <path d="M8 9.2 9 7h6l1 2.2H8Z" fill="#fff" fillOpacity="0.55" />
      <circle cx="8" cy="17" r="1.8" fill="#1F2937" />
      <circle cx="16" cy="17" r="1.8" fill="#1F2937" />
    </>
  );
}

function HomeShape({ fg }) {
  return (
    <>
      <path
        d="M12 3 3 10.5h2V19a1 1 0 0 0 1 1h4v-5.2h4V20h4a1 1 0 0 0 1-1v-8.5h2L12 3Z"
        fill={fg}
      />
      <rect x="10.4" y="15.4" width="3.2" height="4.6" rx="0.4" fill="#fff" fillOpacity="0.55" />
    </>
  );
}

function BusinessShape({ fg }) {
  return (
    <>
      <path
        d="M9 9V7.5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2V9"
        stroke={fg}
        strokeWidth="1.7"
        fill="none"
        strokeLinecap="round"
      />
      <rect x="3" y="9" width="18" height="11" rx="2.2" fill={fg} />
      <rect x="3" y="9" width="18" height="3.2" fill="#fff" fillOpacity="0.3" />
      <rect x="10.3" y="13.2" width="3.4" height="2.1" rx="0.5" fill="#fff" fillOpacity="0.55" />
    </>
  );
}

function PersonalShape({ fg }) {
  return (
    <>
      <circle cx="9.5" cy="7.2" r="3.2" fill={fg} />
      <path d="M3.5 19.5c.3-3.6 3-6.1 6-6.1s5.5 2.3 5.9 5.6" fill={fg} />
      <rect x="13.6" y="12.6" width="8" height="6" rx="1.3" fill="#fff" stroke={fg} strokeWidth="1" />
      <rect x="14.8" y="14.5" width="5.6" height="1.1" rx="0.55" fill={fg} fillOpacity="0.5" />
    </>
  );
}

function GoldShape({ fg }) {
  return (
    <>
      <path d="M12 3 4 9l8 12 8-12-8-6Z" fill={fg} />
      <path d="M4 9h16M8 9 12 3M16 9 12 3M12 9v12" stroke="#fff" strokeOpacity="0.45" strokeWidth="1" fill="none" />
    </>
  );
}

function CreditShape({ fg }) {
  return (
    <>
      <rect x="3" y="6" width="18" height="13" rx="2.4" fill={fg} />
      <rect x="3" y="9.4" width="18" height="3" fill="#1F2937" fillOpacity="0.5" />
      <rect x="6" y="14.6" width="7" height="1.5" rx="0.75" fill="#fff" fillOpacity="0.7" />
      <rect x="6" y="16.8" width="4" height="1.2" rx="0.6" fill="#fff" fillOpacity="0.5" />
    </>
  );
}

const VISUALS = {
  'Car Loan': { bg: '#E8F2FF', fg: '#3B82F6', Shape: CarShape },
  'Home Loan': { bg: '#E8F7EF', fg: '#2F9E6F', Shape: HomeShape },
  'Business Loan': { bg: '#F0EAFE', fg: '#8B5CF6', Shape: BusinessShape },
  'Personal Loan': { bg: '#E6F7F4', fg: '#159A86', Shape: PersonalShape },
  'Gold Loan': { bg: '#FFF4D6', fg: '#D99A18', Shape: GoldShape },
  'Credit Outras': { bg: '#FFF0E8', fg: '#E8794F', Shape: CreditShape },
};

const ICON_FALLBACKS = {
  'Education Loan': { bg: '#EEF2FF', fg: '#6366F1', Icon: GraduationCap },
  'Consumer Loan': { bg: '#FDF0F3', fg: '#D6417A', Icon: ShoppingBag },
};

export default function LoanTypeVisual({ type }) {
  const visual = VISUALS[type];
  if (visual) {
    const { bg, fg, Shape } = visual;
    return (
      <span className="loanTypeVisual" style={{ background: bg }}>
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <Shape fg={fg} />
        </svg>
      </span>
    );
  }

  const fallback = ICON_FALLBACKS[type] || ICON_FALLBACKS['Consumer Loan'];
  const { bg, fg, Icon } = fallback;
  return (
    <span className="loanTypeVisual" style={{ background: bg }}>
      <Icon aria-hidden="true" style={{ width: 19, height: 19, color: fg }} strokeWidth={2.1} />
    </span>
  );
}
