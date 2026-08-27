// Mock Customer 360 data. No backend — everything the UI needs lives here.

export const searchTypes = [
  { key: 'customerNo', label: 'Customer No', icon: 'IdCard', placeholder: 'Search by customer number...' },
  { key: 'name', label: 'Name', icon: 'UserRound', placeholder: 'Search by name...' },
  { key: 'account', label: 'Account', icon: 'CreditCard', placeholder: 'Search by account...' },
  { key: 'phone', label: 'Phone', icon: 'Phone', placeholder: 'Search by phone...' },
  { key: 'email', label: 'Email', icon: 'Mail', placeholder: 'Search by email...' },
  { key: 'idProof', label: 'ID Proof', icon: 'ShieldCheck', placeholder: 'Search by ID proof...' },
];

export const customers = [
  {
    id: 'cust-0000000872',
    customerNumber: '0000000872',
    name: 'Jack Zidane',
    initials: 'JZ',
    title: 'Mr',
    gender: 'Male',
    dob: '01/01/2000',
    status: 'ACTIVE',
    kyc: 'VERIFIED',
    kycStatus: 'Pending',
    riskRating: '-',
    phone: '+91 98765 43210',
    alternatePhone: '-',
    email: 'jack@testemail.com',
    taxNumber: 'AXX98639',
    taxCountry: 'IN',
    customerSince: '15/06/2026',
    branch: 'Head Office',
    branchId: '200',
    branchName: 'Head Office',
    risk: 'LOW',
    customerType: 'S14',
    customerCategory: 'RETAIL',
    occupation: 'Consultant',
    employer: 'Employer',
    annualIncome: 100000.0,
    idProof: { type: 'Passport', number: 'M1234567' },
    addresses: [
      {
        label: 'Address 1',
        line1: 'Tower 2',
        line2: 'Mayflower Marvel',
        state: 'India',
        city: 'CBE',
        country: 'IN',
        postalCode: '9384-3839',
      },
      {
        label: 'Address 2',
        line1: 'Flat 14B',
        line2: 'Silver Oak Residency',
        state: 'Tamil Nadu',
        city: 'Coimbatore',
        country: 'IN',
        postalCode: '641045',
      },
    ],
    accounts: [
      { accountNumber: '200CAS00249947', description: 'CAS002', currency: 'EUR', balance: 166531.49, status: 'ACTIVE', type: 'CURRENT' },
      { accountNumber: '200CAS00234114', description: 'CAS002', currency: 'EUR', balance: 33252222.96, status: 'ACTIVE', type: 'CURRENT' },
      { accountNumber: '00000087285', description: 'CAS002', currency: 'EUR', balance: 20000.30, status: 'ACTIVE', type: 'CURRENT' },
      { accountNumber: '200CASA0181183', description: 'CAS001', currency: 'EUR', balance: 0, status: 'ACTIVE', type: 'CURRENT' },
      { accountNumber: '00000087284', description: 'CAS002', currency: 'EUR', balance: 343095.26, status: 'ACTIVE', type: 'CURRENT' },
      { accountNumber: '200CASA_0145915', description: 'CAS_01', currency: 'EUR', balance: -41.82, status: 'DORMANT', type: 'CURRENT' },
    ],
    deposits: [],
    loans: [
      { loanNo: 'LN-000485', type: 'HOME LOAN', principal: 4500000, outstanding: 3250000, rate: 8.5, emi: 38500, status: 'ACTIVE' },
      { loanNo: 'LN-000321', type: 'PERSONAL LOAN', principal: 1000000, outstanding: 675000, rate: 11.5, emi: 22500, status: 'ACTIVE' },
      { loanNo: 'LN-000198', type: 'AUTO LOAN', principal: 800000, outstanding: 512000, rate: 9.25, emi: 15800, status: 'ACTIVE' },
      { loanNo: 'LN-000097', type: 'EDUCATION LOAN', principal: 1200000, outstanding: 890000, rate: 7.75, emi: 12400, status: 'ACTIVE' },
      { loanNo: 'LN-000045', type: 'GOLD LOAN', principal: 300000, outstanding: 145000, rate: 10.0, emi: 9800, status: 'ACTIVE' },
    ],
    loanPortfolio: { totalCount: 485, totalOutstanding: 63224861.07 },
    lockers: [],
    limits: { creditLimit: 0, availableLimit: 0, utilized: 0, status: 'No active credit limit' },
    creditLimits: [
      { id: 'cl-seed-1', accountNumber: '200CASA0181183', currency: 'EUR', sanctioned: 0, utilized: 0, startDate: '16/06/2026', expiryDate: '16/07/2026', status: 'NORMAL' },
      { id: 'cl-seed-2', accountNumber: '200CAS_0145915', currency: 'EUR', sanctioned: 0, utilized: 0, startDate: '-', expiryDate: '-', status: 'NORMAL' },
      { id: 'cl-seed-3', accountNumber: '00000087284', currency: 'EUR', sanctioned: 0, utilized: 0, startDate: '-', expiryDate: '-', status: 'NORMAL' },
      { id: 'cl-seed-4', accountNumber: '200CASA00249947', currency: 'EUR', sanctioned: 0, utilized: 0, startDate: '-', expiryDate: '-', status: 'NORMAL' },
      { id: 'cl-seed-5', accountNumber: '200CASA00234114', currency: 'EUR', sanctioned: 0, utilized: 0, startDate: '-', expiryDate: '-', status: 'NORMAL' },
      { id: 'cl-seed-6', accountNumber: '00000087285', currency: 'EUR', sanctioned: 0, utilized: 0, startDate: '-', expiryDate: '-', status: 'NORMAL' },
    ],
    collaterals: [
      {
        id: 'COL-000001',
        collateralId: 'COL110000131',
        collateralType: 'Property',
        currency: 'EUR',
        lendableValue: 7566000,
        utilized: 0,
        marketValue: 7800000,
        createdDate: '23/07/2026',
        status: 'RELEASED',
      },
    ],
    alerts: [],
    memos: [
      { text: 'KYC review initiated', date: '15/06/2026' },
      { text: 'Customer profile verified', date: '20/06/2026' },
    ],
    events: [
      { date: '21 Aug 2026', title: 'Customer profile viewed', meta: 'User: Branch Officer', icon: 'Eye' },
      { date: '20 Aug 2026', title: 'Loan document updated', icon: 'FileText' },
      { date: '18 Aug 2026', title: 'KYC information submitted', icon: 'ShieldCheck' },
      { date: '15 Jun 2026', title: 'Customer onboarded', icon: 'UserRound' },
    ],
    documents: [
      { id: 'doc-1', type: 'ID', numberLabel: 'ID Number', number: '737390', issueDate: '01/01/2005', expiryDate: '01/01/2015', status: 'Verified', fileType: 'image', fileUrl: '/documents/dummy-id.svg' },
      { id: 'doc-2', type: 'Address Proof', numberLabel: 'Document Number', number: '-', issueDate: '15/06/2026', expiryDate: null, status: 'Verified', fileType: 'image', fileUrl: '/documents/dummy-address-proof.svg' },
      { id: 'doc-3', type: 'Income Proof', numberLabel: 'Document Number', number: '-', issueDate: '15/06/2026', expiryDate: null, status: 'Verified', fileType: 'image', fileUrl: '/documents/dummy-income-proof.svg' },
      { id: 'doc-4', type: 'Bank Statement', numberLabel: 'Document Number', number: '-', issueDate: '15/06/2026', expiryDate: null, status: 'Verified', fileType: 'pdf', fileUrl: '/documents/dummy-bank-statement.pdf' },
    ],
    summary: {
      currentAccounts: { count: 6, amount: 33781808.19 },
      termDeposits: { count: 0, amount: 0 },
      loans: { count: 485, amount: 63224861.07 },
      lockers: { count: 0, amount: 0 },
      limits: { count: 0, amount: 0 },
      alerts: { count: 0 },
    },
  },

  {
    id: 'cust-0000000873',
    customerNumber: '0000000873',
    name: 'Arjun Kumar',
    initials: 'AK',
    title: 'Mr',
    gender: 'Male',
    dob: '12/03/1990',
    status: 'ACTIVE',
    kyc: 'VERIFIED',
    kycStatus: 'Verified',
    riskRating: 'Low',
    phone: '+91 90123 45678',
    alternatePhone: '+91 90123 00000',
    email: 'arjun.kumar@testemail.com',
    taxNumber: 'BXX55214',
    taxCountry: 'IN',
    customerSince: '02/03/2021',
    branch: 'Coimbatore Branch',
    branchId: '214',
    branchName: 'Coimbatore Branch',
    risk: 'LOW',
    customerType: 'S12',
    customerCategory: 'RETAIL',
    occupation: 'Software Engineer',
    employer: 'Vantage Systems Pvt Ltd',
    annualIncome: 1450000.0,
    idProof: { type: 'Aadhaar', number: '4455-6677-8899' },
    addresses: [
      {
        label: 'Address 1',
        line1: 'Plot 7, 2nd Cross',
        line2: 'Race Course Road',
        state: 'Tamil Nadu',
        city: 'Coimbatore',
        country: 'IN',
        postalCode: '641018',
      },
    ],
    accounts: [
      { accountNumber: 'SAV00005521', description: 'Savings Account', currency: 'INR', balance: 452300.5, status: 'ACTIVE', type: 'SAVINGS' },
      { accountNumber: 'CUR00007743', description: 'Current Account', currency: 'INR', balance: 118900.0, status: 'ACTIVE', type: 'CURRENT' },
    ],
    deposits: [
      { type: 'FIXED DEPOSIT', number: 'FD-000221', principal: 300000, currency: 'INR', rate: 7.1, maturityDate: '02/03/2027', status: 'ACTIVE' },
    ],
    loans: [
      { loanNo: 'LN-000512', type: 'PERSONAL LOAN', principal: 500000, outstanding: 210000, rate: 12.0, emi: 12500, status: 'ACTIVE' },
    ],
    loanPortfolio: { totalCount: 1, totalOutstanding: 210000 },
    lockers: [
      { id: 'LKR-0231', size: 'MEDIUM', branch: 'Coimbatore Branch', status: 'ACTIVE', assignedDate: '10/05/2022' },
    ],
    limits: { creditLimit: 200000, availableLimit: 135000, utilized: 65000, status: 'Active' },
    creditLimits: [
      { id: 'cl-seed-1', accountNumber: 'CUR00007743', currency: 'INR', sanctioned: 200000, utilized: 65000, startDate: '01/04/2026', expiryDate: '01/04/2027', status: 'ACTIVE' },
    ],
    collaterals: [],
    alerts: [
      { title: 'Cheque book request pending approval', severity: 'WARNING', date: '19/08/2026' },
    ],
    memos: [
      { text: 'Address updated by customer', date: '02/07/2026' },
    ],
    events: [
      { date: '23 Aug 2026', title: 'Fund transfer processed', icon: 'Banknote' },
      { date: '19 Aug 2026', title: 'Cheque book requested', icon: 'FileText' },
      { date: '02 Jul 2026', title: 'Address updated', icon: 'MapPin' },
      { date: '02 Mar 2021', title: 'Customer onboarded', icon: 'UserRound' },
    ],
    documents: [
      { id: 'doc-1', type: 'ID', numberLabel: 'ID Number', number: '-', issueDate: '02/03/2021', expiryDate: '02/03/2031', status: 'Verified', fileType: 'image', fileUrl: '/documents/dummy-id.svg' },
      { id: 'doc-2', type: 'Address Proof', numberLabel: 'Document Number', number: '-', issueDate: '02/03/2021', expiryDate: null, status: 'Verified', fileType: 'image', fileUrl: '/documents/dummy-address-proof.svg' },
    ],
    summary: {
      currentAccounts: { count: 2, amount: 571200.5 },
      termDeposits: { count: 1, amount: 300000 },
      loans: { count: 1, amount: 210000 },
      lockers: { count: 1, amount: 0 },
      limits: { count: 1, amount: 200000 },
      alerts: { count: 1 },
    },
  },

  {
    id: 'cust-0000000874',
    customerNumber: '0000000874',
    name: 'Priya Sharma',
    initials: 'PS',
    title: 'Ms',
    gender: 'Female',
    dob: '28/09/1995',
    status: 'ACTIVE',
    kyc: 'PENDING',
    kycStatus: 'Pending',
    riskRating: '-',
    phone: '+91 98220 11234',
    alternatePhone: '-',
    email: 'priya.sharma@testemail.com',
    taxNumber: 'CXX10982',
    taxCountry: 'IN',
    customerSince: '11/01/2026',
    branch: 'Head Office',
    branchId: '200',
    branchName: 'Head Office',
    risk: 'MEDIUM',
    customerType: 'S14',
    customerCategory: 'RETAIL',
    occupation: 'Graphic Designer',
    employer: 'Freelance',
    annualIncome: 620000.0,
    idProof: { type: 'PAN Card', number: 'CXPPS1098J' },
    addresses: [
      {
        label: 'Address 1',
        line1: '22, Lotus Enclave',
        line2: 'Sector 15',
        state: 'Delhi',
        city: 'New Delhi',
        country: 'IN',
        postalCode: '110015',
      },
    ],
    accounts: [
      { accountNumber: 'SAV00009087', description: 'Savings Account', currency: 'INR', balance: 84250.75, status: 'ACTIVE', type: 'SAVINGS' },
    ],
    deposits: [],
    loans: [],
    loanPortfolio: { totalCount: 0, totalOutstanding: 0 },
    lockers: [],
    limits: { creditLimit: 0, availableLimit: 0, utilized: 0, status: 'No active credit limit' },
    creditLimits: [],
    collaterals: [],
    alerts: [],
    memos: [
      { text: 'KYC documents requested', date: '11/01/2026' },
    ],
    events: [
      { date: '17 Aug 2026', title: 'Debit card issued', icon: 'CreditCard' },
      { date: '11 Jan 2026', title: 'Customer onboarded', icon: 'UserRound' },
    ],
    documents: [
      { id: 'doc-1', type: 'ID', numberLabel: 'ID Number', number: '-', issueDate: '11/01/2026', expiryDate: '11/01/2036', status: 'Verified', fileType: 'image', fileUrl: '/documents/dummy-id.svg' },
      { id: 'doc-2', type: 'Address Proof', numberLabel: 'Document Number', number: '-', issueDate: '-', expiryDate: null, status: 'Pending', fileType: 'image', fileUrl: '/documents/dummy-address-proof.svg' },
      { id: 'doc-3', type: 'Income Proof', numberLabel: 'Document Number', number: '-', issueDate: '12/01/2026', expiryDate: null, status: 'Rejected', fileType: 'image', fileUrl: '/documents/dummy-income-proof.svg' },
    ],
    summary: {
      currentAccounts: { count: 1, amount: 84250.75 },
      termDeposits: { count: 0, amount: 0 },
      loans: { count: 0, amount: 0 },
      lockers: { count: 0, amount: 0 },
      limits: { count: 0, amount: 0 },
      alerts: { count: 0 },
    },
  },

  {
    id: 'cust-0000000875',
    customerNumber: '0000000875',
    name: 'Meera Nair',
    initials: 'MN',
    title: 'Ms',
    gender: 'Female',
    dob: '05/11/1988',
    status: 'DORMANT',
    kyc: 'VERIFIED',
    kycStatus: 'Verified',
    riskRating: 'Low',
    phone: '+91 97887 65432',
    alternatePhone: '-',
    email: 'meera.nair@testemail.com',
    taxNumber: 'DXX44120',
    taxCountry: 'IN',
    customerSince: '09/09/2018',
    branch: 'Kochi Branch',
    branchId: '341',
    branchName: 'Kochi Branch',
    risk: 'LOW',
    customerType: 'S12',
    customerCategory: 'RETAIL',
    occupation: 'Teacher',
    employer: 'St. Xavier School',
    annualIncome: 540000.0,
    idProof: { type: 'Voter ID', number: 'KL/09/2018/003321' },
    addresses: [
      {
        label: 'Address 1',
        line1: '9, Marine Drive Lane',
        line2: 'Ernakulam',
        state: 'Kerala',
        city: 'Kochi',
        country: 'IN',
        postalCode: '682031',
      },
    ],
    accounts: [
      { accountNumber: 'SAV00001187', description: 'Savings Account', currency: 'INR', balance: 12040.0, status: 'DORMANT', type: 'SAVINGS' },
    ],
    deposits: [],
    loans: [],
    loanPortfolio: { totalCount: 0, totalOutstanding: 0 },
    lockers: [],
    limits: { creditLimit: 0, availableLimit: 0, utilized: 0, status: 'No active credit limit' },
    creditLimits: [],
    collaterals: [],
    alerts: [
      { title: 'Account inactive for over 12 months', severity: 'DANGER', date: '01/03/2026' },
    ],
    memos: [],
    events: [
      { date: '01 Mar 2026', title: 'Account flagged dormant', icon: 'AlertTriangle' },
      { date: '09 Sep 2018', title: 'Customer onboarded', icon: 'UserRound' },
    ],
    documents: [
      { id: 'doc-1', type: 'ID', numberLabel: 'ID Number', number: '-', issueDate: '09/09/2018', expiryDate: '09/09/2028', status: 'Verified', fileType: 'image', fileUrl: '/documents/dummy-id.svg' },
    ],
    summary: {
      currentAccounts: { count: 1, amount: 12040.0 },
      termDeposits: { count: 0, amount: 0 },
      loans: { count: 0, amount: 0 },
      lockers: { count: 0, amount: 0 },
      limits: { count: 0, amount: 0 },
      alerts: { count: 1 },
    },
  },
];

export function searchCustomers(type, query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return customers.filter((c) => {
    switch (type) {
      case 'customerNo':
        return c.customerNumber.toLowerCase().includes(q);
      case 'name':
        return c.name.toLowerCase().includes(q);
      case 'account':
        return c.accounts.some((a) => a.accountNumber.toLowerCase().includes(q));
      case 'phone':
        return c.phone.toLowerCase().includes(q) || c.alternatePhone.toLowerCase().includes(q);
      case 'email':
        return c.email.toLowerCase().includes(q);
      case 'idProof':
        return (
          c.idProof.type.toLowerCase().includes(q) ||
          c.idProof.number.toLowerCase().includes(q)
        );
      default:
        return false;
    }
  });
}
