// Shared Framer Motion variants used across Customer 360 so entrance/hover
// motion stays consistent everywhere it appears.

export const headerVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.985 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: 'easeOut' } },
};

export const avatarVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut', delay: 0.15 } },
};

// Orchestrates the customer name -> status badges -> contact row reveal
// inside the main profile card. Carries no visual properties of its own.
export const headerStaggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

export const headerItemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

export const cardContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

export const cardHover = {
  y: -5,
  scale: 1.01,
  boxShadow: '0 10px 20px rgba(20, 40, 35, 0.14)',
  transition: { duration: 0.2, ease: 'easeOut' },
};

export const sectionVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

export const tabContentVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export const buttonTap = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.2 },
};
