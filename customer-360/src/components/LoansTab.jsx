import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Banknote, Eye, X } from 'lucide-react';
import EmptyPanel from './EmptyPanel';
import Pagination from './Pagination';
import CircularProgress from './CircularProgress';
import LoanTypeVisual from './LoanTypeVisual';
import { generateLoans } from '../data/loans';
import { formatCurrency, formatBalance } from '../utils/format';

const PAGE_SIZE = 10;

const HEADER_LOAN_TYPES = [
  { key: 'car', label: 'Car', description: 'Car Loan' },
  { key: 'home', label: 'Home', description: 'Home Loan' },
  { key: 'business', label: 'Business', description: 'Business Loan' },
  { key: 'personal', label: 'Personal', description: 'Personal Loan' },
  { key: 'education', label: 'Education', description: 'Education Loan' },
  { key: 'gold', label: 'Gold', description: 'Gold Loan' },
];

const headerIconContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const headerIconVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

const summaryValueVariants = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.22, ease: 'easeOut' } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.15, ease: 'easeIn' } },
};

function statusClassName(status) {
  if (status === 'DORMANT') return 'acctStatus-dormant';
  if (status === 'OVERDUE') return 'acctStatus-overdue';
  return 'acctStatus-active';
}

export default function LoansTab({ customer }) {
  const { totalCount, totalOutstanding } = customer.loanPortfolio;
  const allLoans = useMemo(() => generateLoans(totalCount), [customer.id, totalCount]);
  const [page, setPage] = useState(1);
  const [selectedType, setSelectedType] = useState(null);

  const availableTypeKeys = useMemo(() => new Set(allLoans.map((loan) => loan.type)), [allLoans]);
  const headerLoanTypes = useMemo(
    () => HEADER_LOAN_TYPES.filter((t) => availableTypeKeys.has(t.key)),
    [availableTypeKeys]
  );
  const activeType = selectedType ? headerLoanTypes.find((t) => t.key === selectedType) : null;

  useEffect(() => {
    setPage(1);
  }, [selectedType]);

  const filteredLoans = useMemo(
    () => (selectedType ? allLoans.filter((loan) => loan.type === selectedType) : allLoans),
    [allLoans, selectedType]
  );

  const summaryCount = filteredLoans.length;
  const summaryOutstanding = useMemo(
    () => (selectedType ? filteredLoans.reduce((sum, loan) => sum + (loan.outstanding || 0), 0) : totalOutstanding),
    [filteredLoans, selectedType, totalOutstanding]
  );

  const totalPages = Math.max(1, Math.ceil(filteredLoans.length / PAGE_SIZE));
  const startIdx = (page - 1) * PAGE_SIZE;
  const pageLoans = filteredLoans.slice(startIdx, startIdx + PAGE_SIZE);
  const rangeStart = filteredLoans.length === 0 ? 0 : startIdx + 1;
  const rangeEnd = Math.min(startIdx + PAGE_SIZE, filteredLoans.length);

  function goToPage(p) {
    setPage(Math.min(totalPages, Math.max(1, p)));
  }

  function handleTypeClick(key) {
    setSelectedType((prev) => (prev === key ? null : key));
  }

  const titleText = activeType ? `${activeType.label} Loans` : 'Loans';
  const totalLoansLabel = activeType ? `Total ${activeType.label} Loans` : 'Total Loans';
  const totalOutstandingLabel = activeType ? `Total ${activeType.label} Loan Outstanding` : 'Total Outstanding';

  return (
    <div className="tabContent">
      <div className="sectionCard loanHeaderRow">
        <div className="loanHeaderLeft">
          <span className="sectionIcon"><Banknote aria-hidden="true" /></span>
          <div className="loanHeaderTitleGroup">
            <h2 className="sectionTitle">{titleText} ({summaryCount})</h2>
            <p className="sectionSubtitle">Loan portfolio summary</p>
          </div>
        </div>

        {headerLoanTypes.length > 0 && (
          <motion.div
            className="loanHeaderIcons"
            variants={headerIconContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {headerLoanTypes.map((t) => (
              <motion.button
                key={t.key}
                type="button"
                className={`loanHeaderIconChip${selectedType === t.key ? ' loanHeaderIconChipActive' : ''}`}
                variants={headerIconVariants}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => handleTypeClick(t.key)}
                title={`Filter ${t.label} Loans`}
                aria-label={`Filter ${t.label} Loans`}
                aria-pressed={selectedType === t.key}
              >
                <LoanTypeVisual type={t.description} />
              </motion.button>
            ))}

            <AnimatePresence>
              {selectedType && (
                <motion.button
                  type="button"
                  className="loanHeaderShowAll"
                  onClick={() => setSelectedType(null)}
                  aria-label="Show all loans"
                  title="Show all loans"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.16, ease: 'easeOut' }}
                >
                  <X aria-hidden="true" />
                  Show All
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        <span className="loanHeaderDivider" aria-hidden="true" />

        <div className="loanSummaryItem">
          <span className="loanSummaryLabel">{totalLoansLabel}</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={totalLoansLabel + summaryCount}
              className="loanSummaryValue"
              variants={summaryValueVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {summaryCount}
            </motion.span>
          </AnimatePresence>
        </div>

        <span className="loanHeaderDivider" aria-hidden="true" />

        <div className="loanSummaryItem">
          <span className="loanSummaryLabel">{totalOutstandingLabel}</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={totalOutstandingLabel + summaryOutstanding}
              className="loanSummaryValue"
              variants={summaryValueVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {formatCurrency(summaryOutstanding)}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {allLoans.length === 0 ? (
        <div className="sectionCard">
          <EmptyPanel icon={Banknote} title="No Loans" text="Customer currently has no active loans." />
        </div>
      ) : (
        <div className="acctCard">
          <div className="acctTableWrap">
            <table className="acctTable loanTable">
              <thead>
                <tr>
                  <th>Loan Number</th>
                  <th>Description</th>
                  <th>Principal</th>
                  <th>Outstanding</th>
                  <th>Progress</th>
                  <th>Interest Rate</th>
                  <th>EMI</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pageLoans.map((loan) => {
                  return (
                    <motion.tr
                      key={loan.loanNumber}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                    >
                      <td>
                        <span className="acctNumberCell">
                          <LoanTypeVisual type={loan.description} />
                          <span className="acctNumberBadge">{loan.loanNumber}</span>
                        </span>
                      </td>
                      <td className="acctDescription">{loan.description}</td>
                      <td>{formatBalance(loan.principal, 'EUR')}</td>
                      <td>
                        <span className={loan.outstanding > 0 ? 'loanOutstandingAmount' : 'cellMuted'}>
                          {formatBalance(loan.outstanding, 'EUR')}
                        </span>
                      </td>
                      <td className="loanProgressCell">
                        <CircularProgress value={loan.progress} />
                      </td>
                      <td className="cellMuted">{loan.interestRate ? `${loan.interestRate.toFixed(3)}%` : '-'}</td>
                      <td>{formatBalance(loan.emi, 'EUR')}</td>
                      <td>
                        <span className={`acctStatusPill ${statusClassName(loan.status)}`}>
                          <span className="acctStatusDot" />
                          {loan.status}
                        </span>
                      </td>
                      <td>
                        <motion.button
                          type="button"
                          className="acctViewBtn"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Eye aria-hidden="true" />
                          View Details
                        </motion.button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="paginationBar">
            <span className="paginationInfo">
              Showing {rangeStart}–{rangeEnd} of {filteredLoans.length} items
            </span>
            <Pagination page={page} totalPages={totalPages} onChange={goToPage} />
          </div>
        </div>
      )}
    </div>
  );
}
