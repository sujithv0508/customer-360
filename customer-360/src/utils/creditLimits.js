export const CURRENCY_OPTIONS = ['EUR', 'INR', 'USD', 'GBP'];
export const STATUS_OPTIONS = ['NORMAL', 'ACTIVE', 'SUSPENDED', 'EXPIRED'];

export function computeAvailable(sanctioned, utilized) {
  const s = Number(sanctioned) || 0;
  const u = Number(utilized) || 0;
  return Math.max(0, s - u);
}

export function computeUtilization(sanctioned, utilized) {
  const s = Number(sanctioned) || 0;
  const u = Number(utilized) || 0;
  if (s <= 0) return 0;
  return Math.min(100, (u / s) * 100);
}

export function creditLimitStatusClass(status) {
  if (status === 'SUSPENDED') return 'clStatus-suspended';
  if (status === 'EXPIRED') return 'clStatus-expired';
  return 'clStatus-normal';
}
