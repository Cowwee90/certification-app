import { EventTable } from "../events/event-table.jsx";
import { AddEventButton } from "../events/show-add-event.jsx";

const EventsPast = () => {
  return (
    <>
    <AddEventButton />
    <EventTable type="past" />
    </>
  );
};

export default EventsPast;
