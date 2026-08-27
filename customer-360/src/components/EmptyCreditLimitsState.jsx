import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const illustrationVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

const textVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

const decoVariants = {
  hidden: { opacity: 0, scale: 0.4 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, delay: 0.3 + i * 0.07, ease: 'easeOut' },
  }),
};

const DECORATIONS = [
  { top: '4%', left: '10%', size: 8, kind: 'dot', float: 3.2, delay: 0.6 },
  { top: '14%', left: '84%', size: 10, kind: 'dot', float: 3.8, delay: 0.9 },
  { top: '76%', left: '8%', size: 7, kind: 'dot', float: 3.4, delay: 1.1 },
  { top: '82%', left: '80%', size: 9, kind: 'dot', float: 4, delay: 0.7 },
  { top: '8%', left: '48%', size: 15, kind: 'plus', float: 3.6, delay: 0.8 },
  { top: '70%', left: '54%', size: 13, kind: 'currency', float: 4.2, delay: 1 },
];

export default function EmptyCreditLimitsState({ onAdd }) {
  return (
    <div className="eclOuter">
      <motion.div className="eclPanel" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div className="eclIllustrationWrap" variants={illustrationVariants}>
          {DECORATIONS.map((d, i) => (
            <motion.span
              key={i}
              className="eclDeco"
              style={{ top: d.top, left: d.left, width: d.size, height: d.size }}
              custom={i}
              variants={decoVariants}
            >
              <motion.span
                className={`eclDecoInner eclDeco-${d.kind}`}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: d.float, repeat: Infinity, ease: 'easeInOut', delay: d.delay }}
              >
                {d.kind === 'plus' && '+'}
                {d.kind === 'currency' && '₹'}
              </motion.span>
            </motion.span>
          ))}

          <motion.div
            className="eclCard"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 0.45 }}
          >
            <svg width="132" height="86" viewBox="0 0 132 86" aria-hidden="true">
              <rect x="1" y="1" width="130" height="84" rx="14" fill="#FFFFFF" stroke="#49AB81" strokeWidth="1.5" />
              <rect x="14" y="16" width="24" height="18" rx="4" fill="#197A5A" />
              <rect x="14" y="46" width="46" height="5" rx="2.5" fill="#DDF3EC" />
              <rect x="14" y="57" width="30" height="5" rx="2.5" fill="#DDF3EC" />
              <text x="14" y="76" fontSize="9" fontWeight="700" fill="#197A5A" letterSpacing="0.5">LIMIT</text>
              <text x="60" y="76" fontSize="12" fontWeight="800" fill="#0F2B22">₹ 0</text>
            </svg>
            <span className="eclCardBadge">
              <Plus aria-hidden="true" />
            </span>
          </motion.div>
        </motion.div>

        <motion.h3 className="eclHeading" variants={textVariants}>
          No Credit Limits Yet
        </motion.h3>
        <motion.p className="eclText" variants={textVariants}>
          No credit limits have been set for this customer.
        </motion.p>
        <motion.p className="eclSubtext" variants={textVariants}>
          Create a credit limit to manage the customer&apos;s available borrowing capacity.
        </motion.p>

        <motion.button
          type="button"
          className="eclAddBtn"
          variants={buttonVariants}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={onAdd}
        >
          <Plus aria-hidden="true" />
          Add Credit Limit
        </motion.button>
      </motion.div>
    </div>
  );
}
