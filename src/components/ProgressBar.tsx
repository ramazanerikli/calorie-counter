import { FC, useEffect, useState } from "react";

export const ProgressBar: FC<{
  nutrition: string;
  percentage: number;
  total: number;
  eaten: number;
  commonPercentage: number;
}> = ({ nutrition, percentage, total, eaten, commonPercentage }) => {
  return (
    <div className="d-flex flex-column">
      <h6 className="text-capitalize">{nutrition}</h6>
      <div className="progress">
        <div
          className={`progress-bar bg-${nutrition}`}
          role="progressbar"
          style={{ width: `${percentage}%` }}
          aria-valuenow={25}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
      <div className="d-flex mt-2">
        <span className="small">
          <span className="fw-bold">{Math.round(eaten)} </span>/ {total}g
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
