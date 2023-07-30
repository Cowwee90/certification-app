import { EventTable } from "../events/event-table.jsx";
import { AddEventButton } from "../events/show-add-event.jsx";

const Events = () => {
  return (
    <>
    <AddEventButton />
    <EventTable />
    </>
  );
};

export default Events;
