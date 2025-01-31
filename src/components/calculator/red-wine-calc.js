import { useEffect } from "react";
import { calculateStillWine750ml } from "../utils/calculations";

export const RedWineCalculations = ({
  selectedDrinks,
  drinks,
  updateDrink,
  numGuests,
  eventHours,
}) => {
  useEffect(() => {
    const redWineNeeded = calculateStillWine750ml(
      drinks.redWine.percentage,
      numGuests,
      drinks.redWine.average,
      eventHours
    );
    updateDrink("redWine", "needed", redWineNeeded);
  }, [
    numGuests,
    eventHours,
    drinks.redWine.percentage,
    drinks.redWine.average,
  ]);

  const handleRedWinePercentageChange = (e) => {
    if (e.target.value >= 0) {
      updateDrink("redWine", "percentage", Number(e.target.value));
    }
  };
  const handleRedWineAverageChange = (e) => {
    if (e.target.value >= 0) {
      updateDrink("redWine", "average", Number(e.target.value));
    }
  };

  return (
    <section id="red-wine-details">
      {selectedDrinks.redWine && (
        <div
          id="red-wine-details-container"
          className=" flex flex-col bg-blue-100 p-5 mb-1"
        >
          <h6>Red Wine</h6>
          <label>
            <input
              id="red-wine-percentage"
              type="number"
              step="any"
              value={drinks.redWine.percentage}
              onChange={handleRedWinePercentageChange}
              className="ml-1 mt-1 border border-emerald-500 p-2 rounded size-[2rem] w-[4rem]"
            />
            % guests
          </label>
          <label>
            <input
              id="red-wine-average"
              type="number"
              step="any"
              value={drinks.redWine.average}
              onChange={handleRedWineAverageChange}
              className="ml-1 mt-1 border border-emerald-500 p-2 rounded size-[2rem] w-[4rem]"
            />
            drinks/hour
          </label>
        </div>
      )}
    </section>
  );
};
