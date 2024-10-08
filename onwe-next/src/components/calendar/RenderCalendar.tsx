"use client";
import { addMonths, format, subMonths } from "date-fns";
import EventCalendar from "./Calendar";

import { Event } from "../../lib/types/event";

const current = new Date();
const prevMonth_2 = subMonths(current, 2);
const prevMonth = subMonths(current, 1);
const nextMonth = addMonths(current, 1);
const nextMonth_2 = addMonths(current, 2);

const monthArray = [current, nextMonth].map((date) =>
  format(date, "MMMM yyyy").toLocaleUpperCase()
);

function RenderCalendar({
  scrollToEvent,
  events
}: {
  events: Event[];
  scrollToEvent?: (eventId: number) => void;
}) {
  

  return (
    <div className="lg:px-10 flex flex-col gap-20 mt-3">
      {monthArray.map((month, index) => (
        <EventCalendar
          events={events}
          key={index}
          month={month}
          scrollToEvent={scrollToEvent!}
        />
      ))}
    </div>
  );
}

export default RenderCalendar;
