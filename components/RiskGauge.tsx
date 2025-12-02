'use client';

interface RiskGaugeProps {
  probability: number;
  prediction: number;
}

export default function RiskGauge({ probability, prediction }: RiskGaugeProps) {
  // Convert probability to percentage
  const percentage = probability * 100;

  // Calculate rotation for the needle
  // 0% (Low) = -90° (pointing left), 100% (High) = +90° (pointing right)
  // The needle spans 180° from left to right
  const rotation = -90 + (percentage / 100) * 180;

  // Determine color based on prediction
  const isHighRisk = prediction === 1;
  const gaugeColor = isHighRisk ? 'text-red-600' : 'text-green-600';

  return (
    <div className="relative w-full max-w-xs mx-auto">
      {/* Gauge Background */}
      <div className="relative w-full aspect-square">
        {/* Semicircle background with color gradient */}
        <svg viewBox="0 0 200 110" className="w-full">
          {/* Background arc - light gray */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="20"
            strokeLinecap="round"
          />

          {/* Low risk section (green) */}
          <path
            d="M 20 100 A 80 80 0 0 1 100 20"
            fill="none"
            stroke="#10b981"
            strokeWidth="20"
            strokeLinecap="round"
            opacity="0.3"
          />

          {/* High risk section (red) */}
          <path
            d="M 100 20 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#ef4444"
            strokeWidth="20"
            strokeLinecap="round"
            opacity="0.3"
          />

          {/* Needle */}
          <g transform={`rotate(${rotation} 100 100)`}>
            <line
              x1="100"
              y1="100"
              x2="100"
              y2="30"
              stroke={isHighRisk ? '#ef4444' : '#10b981'}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="100" cy="100" r="6" fill={isHighRisk ? '#ef4444' : '#10b981'} />
          </g>

          {/* Labels */}
          <text x="20" y="110" fontSize="12" fill="#6b7280" textAnchor="start">Low</text>
          <text x="180" y="110" fontSize="12" fill="#6b7280" textAnchor="end">High</text>
        </svg>

        {/* Center percentage display */}
        <div className="absolute inset-x-0 top-2/3 text-center">
          <div className={`text-4xl font-bold ${gaugeColor}`}>
            {percentage.toFixed(1)}%
          </div>
          <div className="text-sm text-gray-600 mt-1">Risk Probability</div>
        </div>
      </div>
    </div>
  );
}
