import { FC, useEffect, useState } from "react";

export const CircularProgress: FC<{
  size: number;
  strokeWidth: number;
  percentage: number;
  eatenCalories: number;
  budget: number;
}> = ({ size, strokeWidth, percentage, eatenCalories, budget }) => {
  const [progress, setProgress] = useState<number>(percentage);
  useEffect(() => {
    setProgress(percentage);
  }, [percentage]);
  const viewBox = `0 0 ${size} ${size}`;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI * 2;
  const dash = (progress * circumference) / 100;
  return (
    <>
      <svg width={size} height={size} viewBox={viewBox}>
        <circle
          fill="none"
          stroke="#e9ecef"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
        />
        <circle
          fill="none"
          stroke={eatenCalories > budget ? "#dc3545" : "#0d9b0d"}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          strokeDasharray={`${dash} , ${circumference - dash}`}
          strokeLinecap="round"
          style={{ transition: "all 0.5s" }}
        />
        <text
          fill={eatenCalories > budget ? "#dc3545" : "#0d9b0d"}
          fontSize="40px"
          x="50%"
          y="55%"
          fy="20px"
          textAnchor="middle"
        >
          {eatenCalories}
        </text>
      </svg>
    </>
  );
};

export default CircularProgress;
