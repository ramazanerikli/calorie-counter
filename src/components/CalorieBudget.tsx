import { FC, useEffect, useState } from "react";
const bootstrap = require("bootstrap");

export const CalorieBudget: FC<{
  calorieBudget: number;
  onChange: (event: any) => void;
}> = ({ calorieBudget, onChange }) => {
  return (
    <div className="mt-3">
      <div className="d-flex justify-content-lg-end justify-content-center">
        <button
          type="button"
          aria-label="Set calorie budget"
          title="Set calorie budget"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          className="btn btn-transparent"
        >
          Set Calorie Budget
        </button>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Set Calorie Budget
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="my-3 d-flex align-items-center calorie-budget-form">
                <label htmlFor="calorieBudgetNumber" className="form-label">
                  Your daily calorie budget:{" "}
                </label>

                <input
                  type="number"
                  className="form-control"
                  id="calorieBudgetNumber"
                  value={calorieBudget}
                  step={100}
                  min={1000}
                  max={5000}
                  onChange={(event) => onChange(event)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalorieBudget;
