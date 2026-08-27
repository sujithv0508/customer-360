export function formatCurrency(amount, decimals = 2) {
  const value = Number(amount) || 0;
  return `₹${value.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

export function formatNumber(value) {
  return Number(value || 0).toLocaleString('en-IN');
}

export function formatBalance(amount, currency = 'INR') {
  const value = Number(amount) || 0;
  if (currency === 'EUR') {
    const formatted = new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
    return `${formatted} €`;
  }
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }
  if (currency === 'GBP') {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(value);
  }
  return formatCurrency(value);
}
