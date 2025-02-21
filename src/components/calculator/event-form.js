export const EventForm = ({
  eventHours,
  setEventHours,
  avgNumDrinks,
  setAvgNumDrinks,
  numGuests,
  setNumGuests,
}) => {
  const handleEventHoursChange = (e) => {
    const value = e.target.value;
    if (value === "" || !isNaN(value)) {
      setEventHours(value);
    }
  };

  const handleNumGuestsChange = (e) => {
    const value = e.target.value;
    if (value === "" || !isNaN(value)) {
      setNumGuests(value);
    }
  };

  const handleAveNumDrinksChange = (e) => {
    const value = e.target.value;
    if (value === "" || !isNaN(value)) {
      setAvgNumDrinks(value);
    }
  };

  return (
    <div className="flex flex-col flex-space-between gap-2 text-xl">
      <label htmlFor="event-hours">
        Event length (hours):
        <input
          id="event-hours"
          type="number"
          step="any"
          value={eventHours || ""}
          onChange={handleEventHoursChange}
          className="ml-1 mt-1 border border-emerald-500 p-2 rounded size-[2rem] w-[4rem]"
        />
      </label>
      <label htmlFor="num-of-guests">
        Number of guests drinking:
        <input
          id="num-of-guests"
          type="number"
          step="any"
          value={numGuests || ""}
          onChange={handleNumGuestsChange}
          className="ml-1 mt-1 border border-emerald-500 p-2 rounded size-[2rem] w-[4rem]"
        />
      </label>
      <label htmlFor="avg-drinks">
        Average # of drinks per hour (1 guest):
        <input
          id="avg-drinks"
          type="number"
          step="any"
          value={avgNumDrinks || ""}
          onChange={handleAveNumDrinksChange}
          className="ml-1 mt-1 border border-emerald-500 p-2 rounded size-[2rem] w-[4rem]"
        />
      </label>
    </div>
  );
};
