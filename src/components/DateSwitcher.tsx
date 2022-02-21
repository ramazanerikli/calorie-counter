import { FC, useEffect, useState } from "react";
import { MdChevronLeft } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";
import { CalendarDay } from "../types/Date";

export const DateSwitcher: FC<{
  selectedDay: CalendarDay;
  goToPreviousDay: () => void;
  goToNextDay: () => void;
}> = ({ selectedDay, goToPreviousDay, goToNextDay }) => {
  const dateObject = new Date();
  dateObject.setFullYear(selectedDay[0])
  dateObject.setMonth(selectedDay[1])
  dateObject.setDate(selectedDay[2])
  return (
    <div className="date-switcher">
      <div
        className="d-flex justify-content-between align-items-center py-1"
        style={{ borderRadius: 10 }}
      >
        <button className="btn btn-transparent" aria-label="Get previous day" title="Get previous day" onClick={() => goToPreviousDay()}>
          <MdChevronLeft size={"1.5em"} />
        </button>

        <div className="current-date">
        {dateObject.toDateString()}
        </div>

        <button className="btn btn-transparent" aria-label="Get next day" title="Get next day" onClick={() => goToNextDay()}>
          <MdChevronRight size={"1.5em"} />
        </button>
      </div>
    </div>
  );
};

export default DateSwitcher;
