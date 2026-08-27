import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Landmark, Minus, X, ArrowLeft } from 'lucide-react';
import AppSidebar from './components/AppSidebar';
import CustomerSearch from './components/CustomerSearch';
import CustomerHeader from './components/CustomerHeader';
import SummaryCards from './components/SummaryCards';
import CustomerTabs, { buildTabs } from './components/CustomerTabs';
import CustomerInfo from './components/CustomerInfo';
import AccountsTab from './components/AccountsTab';
import DepositsTab from './components/DepositsTab';
import LoansTab from './components/LoansTab';
import LockersTab from './components/LockersTab';
import LimitsTab from './components/LimitsTab';
import CollateralsTab from './components/CollateralsTab';
import AlertsTab from './components/AlertsTab';
import EventsTab from './components/EventsTab';
import DocumentsTab from './components/DocumentsTab';
import { tabContentVariants } from './utils/animations';
import './App.css';

const TAB_CONTENT = {
  info: CustomerInfo,
  accounts: AccountsTab,
  deposits: DepositsTab,
  loans: LoansTab,
  lockers: LockersTab,
  limits: LimitsTab,
  collaterals: CollateralsTab,
  alerts: AlertsTab,
  events: EventsTab,
  documents: DocumentsTab,
};

export default function App() {
  const [customer, setCustomer] = useState(null);
  const [activeTab, setActiveTab] = useState('info');
  const [minimized, setMinimized] = useState(false);

  function handleSelectCustomer(c) {
    setCustomer(c);
    setActiveTab('info');
    setMinimized(false);
  }

  function handleBackToSearch() {
    setCustomer(null);
  }

  function updateCreditLimits(updater) {
    setCustomer((prev) => {
      if (!prev) return prev;
      const nextCreditLimits =
        typeof updater === 'function' ? updater(prev.creditLimits || []) : updater;
      return { ...prev, creditLimits: nextCreditLimits };
    });
  }

  function updateCollaterals(updater) {
    setCustomer((prev) => {
      if (!prev) return prev;
      const nextCollaterals =
        typeof updater === 'function' ? updater(prev.collaterals || []) : updater;
      return { ...prev, collaterals: nextCollaterals };
    });
  }

  const TabContent = customer ? TAB_CONTENT[activeTab] : null;
  const tabs = customer ? buildTabs(customer) : [];

  const liveSummary = customer
    ? {
        ...customer.summary,
        limits: {
          count: (customer.creditLimits || []).length,
          amount: (customer.creditLimits || []).reduce((sum, r) => sum + (Number(r.sanctioned) || 0), 0),
        },
      }
    : null;

  return (
    <div className="shell">
      <AppSidebar />

      <div className="mainArea">
        <header className="topbar">
          <div className="brand">
            <span className="brandIcon" aria-hidden="true">
              <Landmark />
            </span>
            <span className="brandText">
              <span className="brandName">CAIXA Banking</span>
              <span className="brandSub">Customer 360°</span>
            </span>
          </div>
          <div className="topbarRight">
            <span className="userChip">
              <span className="userAvatar" aria-hidden="true">BO</span>
              <span className="userName">Branch Officer</span>
            </span>
          </div>
        </header>

        <main className="container">
          <AnimatePresence mode="wait">
            {!customer ? (
              <motion.div
                key="search"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <CustomerSearch onSelectCustomer={handleSelectCustomer} />
              </motion.div>
            ) : (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <motion.div
                  className="profileBar"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                  <span className="profileBarTitle">
                    Customer 360 - {customer.customerNumber}
                  </span>
                  <div className="profileBarActions">
                    <button
                      type="button"
                      className="profileBarBtn"
                      onClick={() => setMinimized((m) => !m)}
                      aria-label={minimized ? 'Restore' : 'Minimize'}
                      aria-pressed={minimized}
                    >
                      <Minus aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="profileBarBtn profileBarBtnClose"
                      onClick={handleBackToSearch}
                      aria-label="Close"
                    >
                      <X aria-hidden="true" />
                    </button>
                  </div>
                </motion.div>

                {!minimized && (
                  <>
                    <button type="button" className="backButton backButtonOutside" onClick={handleBackToSearch}>
                      <ArrowLeft aria-hidden="true" />
                      Back to Search
                    </button>

                    <div className="customerMainRow">
                      <CustomerHeader
                        customer={customer}
                        onViewDetails={() => setActiveTab('info')}
                      />
                      <SummaryCards summary={liveSummary} />
                    </div>

                    <CustomerTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        variants={tabContentVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                      >
                        {TabContent && (
                          <TabContent
                            customer={customer}
                            onCreditLimitsChange={updateCreditLimits}
                            onCollateralsChange={updateCollaterals}
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
