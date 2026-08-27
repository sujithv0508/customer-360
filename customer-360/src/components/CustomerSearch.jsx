import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  IdCard,
  UserRound,
  CreditCard,
  Phone,
  Mail,
  ShieldCheck,
  UserSearch,
  Lightbulb,
} from 'lucide-react';
import CustomerResult from './CustomerResult';
import { searchTypes, searchCustomers } from '../data/customers';

const ICONS = {
  IdCard,
  UserRound,
  CreditCard,
  Phone,
  Mail,
  ShieldCheck,
};

export default function CustomerSearch({ onSelectCustomer }) {
  const [type, setType] = useState('name');
  const [query, setQuery] = useState('');

  const activeType = searchTypes.find((t) => t.key === type) || searchTypes[0];
  const results = useMemo(() => searchCustomers(type, query), [type, query]);
  const hasQuery = query.trim().length > 0;

  return (
    <div className="searchPage">
      <div className="searchHero">
        <div className="searchHeroIcon">
          <UserSearch aria-hidden="true" />
        </div>
        <h1 className="searchTitle">Customer 360°</h1>
        <p className="searchSubtitle">Search for a customer to view their complete profile</p>
      </div>

      <div className="searchPanel">
        <div className="typeGrid" role="group" aria-label="Search by">
          {searchTypes.map((t) => {
            const Icon = ICONS[t.icon];
            const isActive = t.key === type;
            return (
              <button
                key={t.key}
                type="button"
                className={`typeChip${isActive ? ' typeChipActive' : ''}`}
                aria-pressed={isActive}
                onClick={() => setType(t.key)}
              >
                <Icon aria-hidden="true" />
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="searchInputWrap">
          <Search className="searchInputIcon" aria-hidden="true" />
          <input
            type="text"
            className="searchInput"
            placeholder={activeType.placeholder}
            aria-label={activeType.placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {hasQuery ? (
          results.length > 0 ? (
            <motion.div
              key="results"
              className="resultsWrap"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <span className="resultsCount">
                {results.length} customer{results.length > 1 ? 's' : ''} found
              </span>
              {results.map((c, i) => (
                <CustomerResult key={c.id} customer={c} onSelect={onSelectCustomer} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              className="emptyState"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <Search aria-hidden="true" />
              <span className="emptyStateTitle">No customer found</span>
              <span className="emptyStateText">Try a different search term or search type.</span>
            </motion.div>
          )
        ) : (
          <motion.div
            key="tips"
            className="quickTips"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            <span className="quickTipsTitle">
              <Lightbulb aria-hidden="true" />
              Quick Tips
            </span>
            <ul className="quickTipsList">
              <li>Search by customer number or customer name for general lookup</li>
              <li>Use account number for direct account access</li>
              <li>Customer name, phone, email and ID proof support general search</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
