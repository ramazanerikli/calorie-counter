import { FC, useEffect, useState } from "react";
import { MdChevronLeft } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";

export const DateSwitcher: FC<{
  selectedDay: number;
  getPrevDate: () => void;
  getNextDate: () => void;
}> = ({ selectedDay, getPrevDate, getNextDate }) => {
  return (
    <div className="date-switcher">
      <div
        className="d-flex justify-content-between align-items-center py-1"
        style={{ borderRadius: 10 }}
      >
        <button className="btn btn-transparent" aria-label="Get previous day" title="Get previous day" onClick={() => getPrevDate()}>
          <MdChevronLeft size={"1.5em"} />
        </button>

        <div className="current-date">
          {new Date(selectedDay).toDateString()}
        </div>

        <button className="btn btn-transparent" aria-label="Get next day" title="Get next day" onClick={() => getNextDate()}>
          <MdChevronRight size={"1.5em"} />
        </button>
      </div>
    </div>
  );
};

export default DateSwitcher;
