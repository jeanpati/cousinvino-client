import { useEffect } from "react";
import { calculateCannedBeverages } from "../utils/calculations";

export const SeltzerCalculations = ({
  selectedDrinks,
  drinks,
  updateDrink,
  numGuests,
  eventHours,
}) => {
  useEffect(() => {
    if (selectedDrinks.hardSeltzers) {
      const hardSeltzerNeeded = calculateCannedBeverages(
        drinks.hardSeltzers.percentage,
        numGuests,
        drinks.hardSeltzers.average,
        eventHours,
        drinks.hardSeltzers.packSize
      );
      updateDrink("hardSeltzers", "needed", hardSeltzerNeeded);
    }
  }, [
    numGuests,
    eventHours,
    drinks.hardSeltzers.percentage,
    drinks.hardSeltzers.average,
    drinks.hardSeltzers.packSize,
  ]);

  const handleSeltzerPercentageChange = (e) => {
    if (e.target.value >= 0) {
      updateDrink("hardSeltzers", "percentage", Number(e.target.value));
    }
  };
  const handleSeltzerAverageChange = (e) => {
    if (e.target.value >= 0) {
      updateDrink("hardSeltzers", "average", Number(e.target.value));
    }
  };
  const handleRadioChange = (e) => {
    updateDrink("hardSeltzers", "packSize", Number(e.target.value));
  };

  return (
    <section id="seltzer-details">
      {selectedDrinks.hardSeltzers && (
        <div
          id="seltzer-details-container"
          className=" flex flex-col bg-blue-100 p-5 mb-1 rounded-2xl"
        >
          {" "}
          <h6>Hard Seltzers</h6>
          <label>{Math.round(drinks.hardSeltzers.percentage, 2)}% guests</label>
          <label>
            <input
              id="seltzer-average"
              type="number"
              step="any"
              value={drinks.hardSeltzers.average}
              onChange={handleSeltzerAverageChange}
              className="ml-1 mt-1 border border-emerald-500 p-2 rounded size-[2rem] w-[3rem]"
            />
            drinks/hour
          </label>
        </div>
      )}
    </section>
  );
};
