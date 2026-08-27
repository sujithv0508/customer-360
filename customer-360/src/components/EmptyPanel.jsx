import { motion } from 'framer-motion';
import { buttonTap } from '../utils/animations';

export default function EmptyPanel({ icon: Icon, title, text, actionLabel, actionIcon: ActionIcon, onAction }) {
  return (
    <motion.div
      className="emptyPanel"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <span className="emptyPanelIcon"><Icon aria-hidden="true" /></span>
      <span className="emptyPanelTitle">{title}</span>
      <span className="emptyPanelText">{text}</span>
      {actionLabel && (
        <span className="emptyPanelActions">
          <motion.button type="button" className="btn btnPrimary" onClick={onAction} {...buttonTap}>
            {ActionIcon && <ActionIcon aria-hidden="true" />}
            {actionLabel}
          </motion.button>
        </span>
      )}
    </motion.div>
  );
}
