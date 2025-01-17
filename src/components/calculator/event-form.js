export const EventForm = ({
  eventHours,
  setEventHours,
  avgNumDrinks,
  setAvgNumDrinks,
  numGuests,
  setNumGuests,
}) => {
  const handleEventHoursChange = (e) => {
    if (e.target.value >= 0) {
      setEventHours(Number(e.target.value));
    }
  };
  const handleNumGuestsChange = (e) => {
    if (e.target.value >= 0) {
      setNumGuests(Number(e.target.value));
    }
  };
  const handleAveNumDrinksChange = (e) => {
    if (e.target.value >= 0) {
      setAvgNumDrinks(Number(e.target.value));
    }
  };
  return (
    <div className="flex flex-col">
      <label htmlFor="event-hours">
        How long is your event? (hours)
        <input
          id="event-hours"
          type="number"
          step="any"
          value={eventHours}
          onChange={handleEventHoursChange}
          className="ml-1 mt-1 border border-emerald-500 p-2 rounded size-[2rem] w-[4rem]"
        />
      </label>
      <label htmlFor="num-of-guests">
        How many guests will be drinking?
        <input
          id="num-of-guests"
          type="number"
          step="any"
          value={numGuests}
          onChange={handleNumGuestsChange}
          className="ml-1 mt-1 border border-emerald-500 p-2 rounded size-[2rem] w-[4rem]"
        />
      </label>
      <label htmlFor="avg-drinks">
        On average, how many drinks will one guest have per hour?
        <input
          id="avg-drinks"
          type="number"
          step="any"
          value={avgNumDrinks}
          onChange={handleAveNumDrinksChange}
          className="ml-1 mt-1 border border-emerald-500 p-2 rounded size-[2rem] w-[4rem]"
        />
      </label>
    </div>
  );
};
