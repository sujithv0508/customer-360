import { motion } from 'framer-motion';

export default function CircularProgress({ value = 0, size = 44, strokeWidth = 5 }) {
  const clamped = Math.max(0, Math.min(100, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;
  const center = size / 2;

  return (
    <span className="circularProgress" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="circularProgressTrack"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {clamped > 0 && (
          <motion.circle
            className="circularProgressFill"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            transform={`rotate(-90 ${center} ${center})`}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          />
        )}
      </svg>
      <span className="circularProgressLabel">{clamped}%</span>
    </span>
  );
}
