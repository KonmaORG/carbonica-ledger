
import React from 'react';

interface ComplianceScoreIndicatorProps {
  score: number;
}

export const ComplianceScoreIndicator = ({ score }: ComplianceScoreIndicatorProps) => {
  let colorClass = "bg-red-500";
  if (score >= 90) {
    colorClass = "bg-green-500";
  } else if (score >= 70) {
    colorClass = "bg-yellow-500";
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="relative w-14 h-14 flex items-center justify-center">
        <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className="stroke-gray-200"
            strokeWidth="2"
          />
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className={`stroke-current ${score >= 90 ? 'text-green-500' : score >= 70 ? 'text-yellow-500' : 'text-red-500'}`}
            strokeWidth="2"
            strokeDasharray="100"
            strokeDashoffset={100 - score}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold">{score}</span>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium">Compliance Score</p>
        <p className="text-xs text-gray-500">
          {score >= 90 ? 'Excellent' : score >= 70 ? 'Needs Improvement' : 'Critical Issues'}
        </p>
      </div>
    </div>
  );
};
