// Generates realistic dummy loan records for the Loans tab. Called once per
// customer (memoized in LoansTab) rather than hand-authoring hundreds of rows.

const LOAN_TYPES = [
  { code: 'C103', description: 'Home Loan', type: 'home', icon: 'House', principal: [80000, 250000], rate: null, zeroChance: 0.05, weight: 3 },
  { code: 'C104', description: 'Credit Outras', type: 'credit', icon: 'FileText', principal: [15000, 40000], rate: null, zeroChance: 0.6, weight: 3 },
  { code: 'CL001', description: 'Car Loan', type: 'car', icon: 'Car', principal: [60000, 150000], rate: null, zeroChance: 0.4, weight: 2 },
  { code: 'CL002', description: 'Personal Loan', type: 'personal', icon: 'CreditCard', principal: [10000, 60000], rate: [9.5, 14.5], zeroChance: 0.15, weight: 2 },
  { code: 'C105', description: 'Education Loan', type: 'education', icon: 'GraduationCap', principal: [20000, 90000], rate: [5.5, 8.5], zeroChance: 0.2, weight: 1 },
  { code: 'C106', description: 'Business Loan', type: 'business', icon: 'Briefcase', principal: [50000, 300000], rate: [8.5, 13.5], zeroChance: 0.1, weight: 1 },
  { code: 'C107', description: 'Gold Loan', type: 'gold', icon: 'Gem', principal: [5000, 30000], rate: [8.0, 11.0], zeroChance: 0.25, weight: 1 },
  { code: 'C108', description: 'Consumer Loan', type: 'consumer', icon: 'ShoppingBag', principal: [3000, 20000], rate: [11.0, 16.0], zeroChance: 0.2, weight: 1 },
];

const WEIGHTED_POOL = LOAN_TYPES.flatMap((type) => Array(type.weight).fill(type));

function randRange([min, max]) {
  return min + Math.random() * (max - min);
}

function round2(value) {
  return Math.round(value * 100) / 100;
}

export function generateLoans(count) {
  const counters = {};
  const loans = [];

  for (let i = 0; i < count; i++) {
    const type = WEIGHTED_POOL[Math.floor(Math.random() * WEIGHTED_POOL.length)];
    counters[type.code] = (counters[type.code] || 0) + 1;
    const loanNumber = `${type.code}${String(counters[type.code]).padStart(6, '0')}`;

    const principal = round2(randRange(type.principal));
    const paidRatio = Math.random() < type.zeroChance ? 0 : Math.min(0.97, Math.random() * 0.65);
    const outstanding = round2(principal * (1 - paidRatio));
    const progress = Math.round(paidRatio * 100);

    const rate = type.rate ? round2(randRange(type.rate)) : null;

    const termMonths = 60 + Math.floor(Math.random() * 180);
    const emi = round2((principal / termMonths) * (1 + (rate || 6) / 100 / 2));

    const statusRoll = Math.random();
    const status = statusRoll < 0.9 ? 'ACTIVE' : statusRoll < 0.96 ? 'DORMANT' : 'OVERDUE';

    loans.push({
      loanNumber,
      description: type.description,
      type: type.type,
      icon: type.icon,
      principal,
      outstanding,
      progress,
      interestRate: rate,
      emi,
      status,
    });
  }

  return loans;
}
